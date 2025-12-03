from .serializers import (
    AtualizarDiarioIn, ExcluirDiarioIn,
    CriarChecklistIn, AdicionarObservacaoChecklistIn,
    EnviarMensagemIn, AdicionarMidiaIn, ExcluirMidiaIn,
    VincularDiarioTerapeutaIn, VincularDiarioFamiliarIn
)
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from psycopg.errors import UndefinedFunction, ForeignKeyViolation, CheckViolation, NotNullViolation
from db import get_conn
import logging
logger = logging.getLogger(__name__)

SCHEMA = ""
# SQL Diário Compartilhado
# SQL_CRIAR_DIARIO = f"SELECT * FROM {SCHEMA}criar_diario_compartilhado(%s,%s,%s,%s)"
SQL_LISTAR_DIARIOS = f"SELECT * FROM {SCHEMA}listar_diarios_compartilhados()"
SQL_LISTAR_POR_TERAPEUTA = f"SELECT * FROM {SCHEMA}listar_diarios_por_terapeuta(%s)"
SQL_LISTAR_POR_PACIENTE = f"SELECT * FROM {SCHEMA}listar_diarios_por_paciente(%s)"
SQL_BUSCAR_POR_ID = f"SELECT * FROM {SCHEMA}buscar_diario_por_id(%s)"
SQL_ATUALIZAR_DIARIO = f"SELECT * FROM {SCHEMA}atualizar_diario_compartilhado(%s,%s,%s)"
SQL_EXCLUIR_DIARIO = f"SELECT * FROM {SCHEMA}excluir_diario_compartilhado(%s)"
SQL_LISTAR_MENSAGENS_FEED = f"SELECT * FROM {SCHEMA}listar_mensagens_feed(%s)"
# SQL CHECKLIST E OBSERVAÇÃO
SQL_ATUALIZAR_ITEM = f"SELECT {SCHEMA}atualizar_status_item_checklist(%s, %s)"
SQL_ADICIONAR_OBSERVACAO = "INSERT INTO observacao (Descricao_Observacao, Data_Envio, Id_Checklist, Id_Familiar) VALUES (%s, CURRENT_TIMESTAMP, %s, %s) RETURNING Id_Observacao"
SQL_CRIAR_CHECKLIST = f"SELECT {SCHEMA}criar_checklist_com_titulo(%s, %s, %s)"
SQL_ADD_ITEM = f"SELECT {SCHEMA}adicionar_item_checklist(%s, %s)"
# SQL MENSAGEM
SQL_ENVIAR_MENSAGEM = "INSERT INTO mensagem (Descricao_Mensagem, Data_Envio, Id_Diario, Id_Familiar, Id_Terapeuta) VALUES (%s, CURRENT_TIMESTAMP, %s, %s, %s) RETURNING Id_Mensagem"

# SQL MÍDIA
SQL_ADICIONAR_MIDIA = f"SELECT * FROM {SCHEMA}adicionar_midia(%s,%s,%s,%s,%s,%s,%s)"
SQL_LISTAR_MIDIAS_DIARIO = f"SELECT * FROM {SCHEMA}listar_midias_por_diario(%s)"
SQL_LISTAR_MIDIAS_OBSERVACAO = f"SELECT * FROM {SCHEMA}listar_midias_por_observacao(%s)"
SQL_LISTAR_MIDIAS_MENSAGEM = f"SELECT * FROM {SCHEMA}listar_midias_por_mensagem(%s)"
SQL_LISTAR_CHECKLISTS_PACIENTE = f"SELECT * FROM {SCHEMA}listar_checklists_por_paciente(%s)"
SQL_EXCLUIR_MIDIA = f"SELECT * FROM {SCHEMA}excluir_midia(%s)"
SQL_ADD_LINK_MENSAGEM = f"SELECT {SCHEMA}adicionar_link_mensagem(%s, %s, %s)"
SQL_LISTAR_LINKS_MENSAGEM = f"SELECT * FROM {SCHEMA}listar_links_mensagem(%s)"

# SQL DIÁRIO TERAPEUTA/FAMILIAR
SQL_VINCULAR_TERAPEUTA = "INSERT INTO diarioterapeuta (Id_Diario, Id_Terapeuta) VALUES (%s, %s)"
SQL_VINCULAR_FAMILIAR = "INSERT INTO diariofamiliar (Id_Diario, Id_Familiar) VALUES (%s, %s)"


def _map_db_error(e):
    if isinstance(e, ForeignKeyViolation):
        return (status.HTTP_404_NOT_FOUND, "Recurso não encontrado.")
    if isinstance(e, NotNullViolation):
        return (status.HTTP_400_BAD_REQUEST, "Campo obrigatório não informado.")
    if isinstance(e, CheckViolation):
        return (status.HTTP_400_BAD_REQUEST, "Valor inválido para o campo.")
    if isinstance(e, UndefinedFunction):
        return (status.HTTP_500_INTERNAL_SERVER_ERROR, "Função SQL não encontrada.")
    return (status.HTTP_500_INTERNAL_SERVER_ERROR, "Erro interno do servidor.")


@api_view(["GET"])
def listar_diarios(request):
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_LISTAR_DIARIOS)
            rows = cur.fetchall()
            diarios = []
            for row in rows:
                diarios.append({
                    "id_diario": row[0],
                    "id_paciente": row[1],
                    "id_terapeuta": row[2],
                    "titulo": row[3],
                    "conteudo": row[4],
                    "dataregistro": row[5]
                })
            return Response(diarios, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)


@api_view(["GET"])
def listar_diarios_por_terapeuta(request, id_terapeuta):
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_LISTAR_POR_TERAPEUTA, (id_terapeuta,))
            rows = cur.fetchall()
            diarios = []
            for row in rows:
                diarios.append({
                    "id_diario": row[0],
                    "id_paciente": row[1],
                    "titulo": row[2],
                    "conteudo": row[3],
                    "dataregistro": row[4]
                })
            return Response(diarios, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)


@api_view(["GET"])
def listar_diarios_por_paciente(request, id_paciente):
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_LISTAR_POR_PACIENTE, (id_paciente,))
            rows = cur.fetchall()
            diarios = []
            for row in rows:
                diarios.append({
                    "id_diario": row[0],
                    "titulo": row[1],
                    "conteudo": row[2],
                    "datacriacao": row[3]  # nome correto
                })
            return Response(diarios, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)


@api_view(["GET"])
def buscar_diario_por_id(request, id_diario):
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_BUSCAR_POR_ID, (id_diario,))
            row = cur.fetchone()
            if not row:
                return Response({"detail": "Diário não encontrado"}, status=status.HTTP_404_NOT_FOUND)
            return Response({
                "id_diario": row[0],
                "id_paciente": row[1],
                "id_terapeuta": row[2],
                "titulo": row[3],
                "conteudo": row[4],
                "dataregistro": row[5]
            }, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)


@api_view(["PUT"])
def atualizar_diario(request):
    s = AtualizarDiarioIn(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data

    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ATUALIZAR_DIARIO, (
                d["id_diario"], d.get("titulo"), d.get("conteudo")
            ))
            row = cur.fetchone()
            if not row:
                return Response({"detail": "Diário não encontrado"}, status=status.HTTP_404_NOT_FOUND)
            return Response({
                "id_diario": row[0],
                "titulo": row[1],
                "conteudo": row[2],
                "dataregistro": row[3]
            }, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)


@api_view(["DELETE"])
def excluir_diario(request):
    s = ExcluirDiarioIn(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data

    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_EXCLUIR_DIARIO, (d["id_diario"],))
            row = cur.fetchone()
            if not row:
                return Response({"detail": "Diário não encontrado"}, status=status.HTTP_404_NOT_FOUND)
            return Response({
                "id_diario": row[0],
                "id_paciente": row[1],
                "id_terapeuta": row[2],
                "titulo": row[3],
                "conteudo": row[4],
                "dataregistro": row[5]
            }, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)

# VIEWS CHECKLIST


@api_view(["POST"])
def criar_checklist(request):
    s = CriarChecklistIn(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data

    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_CRIAR_CHECKLIST,
                        (d["id_terapeuta"], d["id_diario"]))
            id_checklist = cur.fetchone()[0]
            return Response({
                "id_checklist": id_checklist,
                "data_criacao": "CURRENT_DATE",
                "id_terapeuta": d["id_terapeuta"],
                "id_diario": d["id_diario"]
            }, status=status.HTTP_201_CREATED)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)


@api_view(["POST"])
def adicionar_observacao_checklist(request):
    s = AdicionarObservacaoChecklistIn(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data

    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ADICIONAR_OBSERVACAO, (
                d["descricao_observacao"], d["id_checklist"], d["id_familiar"]
            ))
            id_observacao = cur.fetchone()[0]
            return Response({
                "id_observacao": id_observacao,
                "descricao_observacao": d["descricao_observacao"],
                "data_envio": "CURRENT_DATE",
                "id_checklist": d["id_checklist"],
                "id_familiar": d["id_familiar"]
            }, status=status.HTTP_201_CREATED)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)


# VIEWS MENSAGEM
@api_view(["POST"])
def enviar_mensagem(request):
    s = EnviarMensagemIn(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data

    if not d.get("id_familiar") and not d.get("id_terapeuta"):
        return Response(
            {"detail": "Deve informar id_familiar ou id_terapeuta"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ENVIAR_MENSAGEM, (
                d["descricao_mensagem"], d.get("id_diario"),
                d.get("id_familiar"), d.get("id_terapeuta")
            ))
            id_mensagem = cur.fetchone()[0]
            return Response({
                "id_mensagem": id_mensagem,
                "descricao_mensagem": d["descricao_mensagem"],
                "data_envio": "CURRENT_DATE",
                "id_diario": d.get("id_diario"),
                "id_familiar": d.get("id_familiar"),
                "id_terapeuta": d.get("id_terapeuta")
            }, status=status.HTTP_201_CREATED)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)

# VIEWS MÍDIA


@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def adicionar_midia(request):
    logger.info("=== INICIANDO UPLOAD DE MÍDIA ===")
    try:

        print("=== DEBUG: Verificando qual função será executada ===")

        # Adicione esta linha para ver o SQL que será executado
        print(f"SQL que será executado: {SQL_ADICIONAR_MIDIA}")
        # Log dos dados recebidos
        logger.info(f"Request data: {dict(request.data)}")
        logger.info(f"Request FILES: {list(request.FILES.keys())}")

        if 'arquivo' in request.FILES:
            arquivo = request.FILES['arquivo']
            logger.info(
                f"Arquivo recebido: {arquivo.name}, tamanho: {arquivo.size}, tipo: {arquivo.content_type}")

        s = AdicionarMidiaIn(data=request.data)
        if not s.is_valid():
            logger.error(f"Erros de validação: {s.errors}")
            return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)

        d = s.validated_data
        logger.info(f"Dados validados: {d}")

        # Resto do código original...
        if not d.get("id_diario") and not d.get("id_observacao") and not d.get("id_mensagem"):
            logger.error("Nenhum vínculo especificado")
            return Response(
                {"detail": "Deve informar id_diario, id_observacao ou id_mensagem"},
                status=status.HTTP_400_BAD_REQUEST
            )

        arquivo = d['arquivo']
        arquivo_bytes = arquivo.read()
        logger.info(f"Arquivo lido: {len(arquivo_bytes)} bytes")

        nome_arquivo = d.get('nomearquivo') or arquivo.name
        mime_type = d.get('mimetype') or getattr(
            arquivo, 'content_type', 'application/octet-stream')

        logger.info(
            f"Executando SQL: tipo={d['tipo']}, id_diario={d.get('id_diario')}")

        with get_conn() as conn, conn.cursor() as cur:
            logger.info("Conectado ao banco, executando query...")
            cur.execute(SQL_ADICIONAR_MIDIA, (
                d["tipo"], arquivo_bytes, nome_arquivo, mime_type,
                d.get("id_diario"), d.get(
                    "id_observacao"), d.get("id_mensagem")
            ))
            row = cur.fetchone()
            logger.info(f"Resposta do banco: {row}")

            return Response({
                "id_midia": row[0],
                "tipo": row[1],
                "nomearquivo": row[2],
                "mimetype": row[3],
                "dataupload": row[4],
                "id_diario": row[5],
                "id_observacao": row[6],
                "id_mensagem": row[7]
            }, status=status.HTTP_201_CREATED)

    except Exception as e:
        logger.error(f"ERRO NO UPLOAD: {str(e)}", exc_info=True)

        if settings.DEBUG:
            return Response({
                "detail": "Erro interno do servidor",
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"detail": "Erro interno do servidor."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def listar_midias_por_diario(request, id_diario):
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_LISTAR_MIDIAS_DIARIO, (id_diario,))
            rows = cur.fetchall()
            midias = []
            for row in rows:
                midias.append({
                    "id_midia": row[0],
                    "tipo": row[1],
                    "arquivo_base64": row[2],
                    "nomearquivo": row[3],
                    "mimetype": row[4],
                    "dataupload": row[5]
                })
            return Response(midias, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)


@api_view(["GET"])
def listar_midias_por_observacao(request, id_observacao):
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_LISTAR_MIDIAS_OBSERVACAO, (id_observacao,))
            rows = cur.fetchall()
            midias = []
            for row in rows:
                midias.append({
                    "id_midia": row[0],
                    "tipo": row[1],
                    "arquivo_base64": row[2],
                    "nomearquivo": row[3],
                    "mimetype": row[4],
                    "dataupload": row[5]
                })
            return Response(midias, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)


@api_view(["GET"])
def listar_midias_por_mensagem(request, id_mensagem):
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_LISTAR_MIDIAS_MENSAGEM, (id_mensagem,))
            rows = cur.fetchall()
            midias = []
            for row in rows:
                midias.append({
                    "id_midia": row[0],
                    "tipo": row[1],
                    "arquivo_base64": row[2],
                    "nomearquivo": row[3],
                    "mimetype": row[4],
                    "dataupload": row[5]
                })
            return Response(midias, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)


@api_view(["DELETE"])
def excluir_midia(request):
    s = ExcluirMidiaIn(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data

    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_EXCLUIR_MIDIA, (d["id_midia"],))
            row = cur.fetchone()
            if not row:
                return Response({"detail": "Mídia não encontrada"}, status=status.HTTP_404_NOT_FOUND)
            return Response({
                "id_midia": row[0],
                "tipo": row[1],
                "nomearquivo": row[2],
                "mimetype": row[3],
                "dataupload": row[4]
            }, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)


# VIEWS VINCULAÇÃO DIÁRIO
@api_view(["POST"])
def vincular_diario_terapeuta(request):
    s = VincularDiarioTerapeutaIn(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data

    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_VINCULAR_TERAPEUTA,
                        (d["id_diario"], d["id_terapeuta"]))
            return Response({
                "detail": "Diário vinculado ao terapeuta",
                "id_diario": d["id_diario"],
                "id_terapeuta": d["id_terapeuta"]
            }, status=status.HTTP_201_CREATED)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)


@api_view(["POST"])
def vincular_diario_familiar(request):
    s = VincularDiarioFamiliarIn(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data

    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_VINCULAR_FAMILIAR,
                        (d["id_diario"], d["id_familiar"]))
            return Response({
                "detail": "Diário vinculado ao familiar",
                "id_diario": d["id_diario"],
                "id_familiar": d["id_familiar"]
            }, status=status.HTTP_201_CREATED)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)


@api_view(["GET"])
def listar_feed_completo(request, id_paciente):
    """
    Versão Corrigida: Busca MENSAGENS (tabela mensagem) e CHECKLISTS.
    """
    feed = []

    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_LISTAR_MENSAGENS_FEED, (id_paciente,))
            msg_rows = cur.fetchall()

            for row in msg_rows:
                id_mensagem = row[0]

                
                cur.execute(SQL_LISTAR_MIDIAS_MENSAGEM, (id_mensagem,))
                midias_rows = cur.fetchall()
                attachments = []
                for m in midias_rows:
                    base64_string = m[2]
                    mime_type = m[4]
                    if base64_string:
                        url_imagem = f"data:{mime_type};base64,{base64_string}"
                    else:
                        url_imagem = ""
                    attachments.append({
                        "type": m[1],
                        "url": url_imagem,  
                        "name": m[3]
                    })
                cur.execute(SQL_LISTAR_LINKS_MENSAGEM, (id_mensagem,))
                links_rows = cur.fetchall()
                for l in links_rows:
                    
                    attachments.append({
                        "type": "link",
                        "url": l[1],
                        "name": l[2]
                    })
                feed.append({
                    "id": f"m_{row[0]}",
                    "db_id": row[0],
                    "type": "entrada",
                    "autor": row[2], # <--- Pega o nome vindo do banco
                    "data": row[3],  
                    "texto": row[4],
                    "attachments": attachments # (sua lógica de anexo continua aqui)
                })

            # --- PARTE 2: Buscar Checklists (Mantém igual) ---
            cur.execute(SQL_LISTAR_CHECKLISTS_PACIENTE, (id_paciente,))
            check_rows = cur.fetchall()

            for row in check_rows:
                feed.append({
                    "id": f"c_{row[0]}",
                    "db_id": row[0],
                    "type": "checklist",
                    "autor": row[3], 
                    "titulo": row[1],
                    "data": row[2],  
                    "itens": row[4]  
                })

        # Ordenar tudo por data (mais recente primeiro)
        # Proteção extra caso data seja None
        feed.sort(key=lambda x: str(x['data'])
                  if x['data'] else '', reverse=True)

        return Response(feed, status=status.HTTP_200_OK)

    except Exception as e:
        # Dica: O print ajuda a ver o erro real no terminal do Python
        print(f"ERRO FEED: {e}")
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)


@api_view(["POST"])
def criar_checklist(request):
    # Recebe: id_terapeuta, id_diario e TITULO
    d = request.data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_CRIAR_CHECKLIST, (
                d["id_terapeuta"],
                d["id_diario"],
                d.get("titulo", "Sem Título")  # Padrão caso não venha
            ))
            id_checklist = cur.fetchone()[0]

            return Response({
                "id_checklist": id_checklist,
                "titulo": d.get("titulo"),
                "id_diario": d["id_diario"]
            }, status=status.HTTP_201_CREATED)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)


@api_view(["POST"])
def adicionar_item_checklist(request):
    d = request.data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ADD_ITEM, (d["descricao"], d["id_checklist"]))
            id_item = cur.fetchone()[0]
            return Response({"id_item": id_item}, status=status.HTTP_201_CREATED)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)


@api_view(["PUT"])  # Usamos PUT pois é uma atualização
def atualizar_status_item(request):
    # O React vai mandar: { "id": 1, "checked": true }
    d = request.data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            # Mapeamos 'id' do JSON para p_id_item e 'checked' para p_is_feito
            cur.execute(SQL_ATUALIZAR_ITEM, (d["id"], d["checked"]))

            return Response({"detail": "Status atualizado"}, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)

@api_view(["POST"])
def adicionar_link_mensagem(request):
    d = request.data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ADD_LINK_MENSAGEM, (d["id_mensagem"], d["url"], d.get("nome")))
            new_id = cur.fetchone()[0]
            return Response({"id_link": new_id}, status=201)
    except Exception as e:
        return Response({"detail": str(e)}, status=500)