from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from psycopg.errors import UndefinedFunction, ForeignKeyViolation
from db import get_conn
from .serializers import (
    CriarPlanoIn, VincularFamiliarIn, AdicionarNeuroIn, AdicionarMetodoIn,
    AssinarPlanoTerapeutaIn, AnexarArquivoPlanoIn,
    AssinarPlanoFamiliarIn, DesvincularFamiliarIn, RemoverNeuroIn, RemoverMetodoIn,
    AtualizarMensagemIn, AtualizarCronogramaIn, AtualizarAbordagemIn,
    AtualizarObjetivosIn, AtualizarGrauNeuroIn, ExcluirArquivoPlanoIn
)

SCHEMA = ""

# funções principais (criação, vínculos, adições, assinaturas, anexos, leitura)
SQL_CRIAR         = f"SELECT {SCHEMA}criar_plano_terapeutico(%s,%s,%s,%s,%s,%s,%s,%s)"
SQL_VINC_FAM      = f"SELECT {SCHEMA}vincular_familiar_plano(%s,%s)"
SQL_ADD_NEURO     = f"SELECT {SCHEMA}adicionar_neurodivergencia_plano(%s,%s)"
SQL_ADD_METODO    = f"SELECT {SCHEMA}adicionar_metodo_plano(%s,%s)"
SQL_ASSINAR_TER   = f"SELECT {SCHEMA}assinar_plano_terapeuta(%s)"
SQL_ANEXAR        = f"SELECT {SCHEMA}anexar_arquivo_plano(%s,%s,%s,%s)"
SQL_BUSCAR        = f"SELECT * FROM {SCHEMA}buscar_plano_completo(%s)"

# complementares
SQL_ASSINAR_FAM   = f"SELECT {SCHEMA}assinar_plano_familiar(%s)"
SQL_DESV_FAM      = f"SELECT {SCHEMA}desvincular_familiar_plano(%s,%s)"
SQL_REMOVER_NEURO = f"SELECT {SCHEMA}remover_neurodivergencia_plano(%s,%s)"
SQL_REMOVER_MET   = f"SELECT {SCHEMA}remover_metodo_plano(%s,%s)"
SQL_ATU_MSG       = f"SELECT {SCHEMA}atualizar_mensagem_plano(%s,%s)"
SQL_ATU_CRONO     = f"SELECT {SCHEMA}atualizar_cronograma_plano(%s,%s)"
SQL_ATU_ABORD     = f"SELECT {SCHEMA}atualizar_abordagem_familia(%s,%s)"
SQL_ATU_OBJ       = f"SELECT {SCHEMA}atualizar_objetivos_tratamento(%s,%s)"
SQL_ATU_GRAU      = f"SELECT {SCHEMA}atualizar_grau_neurodivergencia(%s,%s)"
SQL_EXCLUIR_ARQ   = f"SELECT {SCHEMA}excluir_arquivo_plano(%s,%s)"

def _map_db_error(e):
    if isinstance(e, ForeignKeyViolation):
        return (status.HTTP_404_NOT_FOUND, "Dependência não encontrada.")
    if isinstance(e, UndefinedFunction):
        return (status.HTTP_500_INTERNAL_SERVER_ERROR, "Função SQL não encontrada.")
    return (status.HTTP_500_INTERNAL_SERVER_ERROR, "Erro interno.")

@api_view(["POST"])
def criar_plano(request):
    s = CriarPlanoIn(data=request.data); s.is_valid(raise_exception=True); d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_CRIAR, (
                d["id_paciente"], d["id_terapeuta"], d.get("id_familiar"),
                d["grau_neurodivergencia"], d["objetivos_tratamento"],
                d["abordagem_familia"], d["cronograma_atividades"], d.get("mensagem_plano"),
            ))
            id_plano = cur.fetchone()[0]
            return Response({"id_plano": id_plano}, status=status.HTTP_201_CREATED)
    except Exception as e:
        code, msg = _map_db_error(e); return Response({"detail": msg}, status=code)

@api_view(["POST"])
def vincular_familiar(request):
    s = VincularFamiliarIn(data=request.data); s.is_valid(raise_exception=True); d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_VINC_FAM, (d["id_plano"], d["id_familiar"]))
            return Response({"detail": "Familiar vinculado"}, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e); return Response({"detail": msg}, status=code)

@api_view(["POST"])
def adicionar_neurodivergencia(request):
    s = AdicionarNeuroIn(data=request.data); s.is_valid(raise_exception=True); d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ADD_NEURO, (d["id_plano"], d["id_neuro"]))
            return Response({"detail": "Neurodivergência adicionada"}, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e); return Response({"detail": msg}, status=code)

@api_view(["POST"])
def adicionar_metodo(request):
    s = AdicionarMetodoIn(data=request.data); s.is_valid(raise_exception=True); d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ADD_METODO, (d["id_plano"], d["id_metodo"]))
            return Response({"detail": "Método adicionado"}, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e); return Response({"detail": msg}, status=code)

@api_view(["POST"])
def assinar_plano_terapeuta(request):
    s = AssinarPlanoTerapeutaIn(data=request.data); s.is_valid(raise_exception=True); d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ASSINAR_TER, (d["id_plano"],))
            return Response({"detail": "Assinado pelo terapeuta"}, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e); return Response({"detail": msg}, status=code)

@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def anexar_arquivo(request):
    s = AnexarArquivoPlanoIn(data=request.data); s.is_valid(raise_exception=True); d = s.validated_data
    f = d["arquivo"]
    try:
        blob = f.read()
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ANEXAR, (d["id_plano"], d["nome_arquivo"], d["tipo_mime"], blob))
            return Response({"detail": "Arquivo anexado"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        code, msg = _map_db_error(e); return Response({"detail": msg}, status=code)

@api_view(["GET"])
def buscar_plano_completo(request, id_plano: int):
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_BUSCAR, (id_plano,))
            row = cur.fetchone()
            if not row:
                return Response({"detail": "Plano não encontrado"}, status=status.HTTP_404_NOT_FOUND)
            (idp, paciente, terapeuta, familiar, grau, objetivos, abordagem,
             cronograma, mensagem, data_criacao, ass_ter, ass_fam) = row
            return Response({
                "id_plano": idp,
                "paciente_nome": paciente,
                "terapeuta_nome": terapeuta,
                "familiar_nome": familiar,
                "grau_neurodivergencia": grau,
                "objetivos_tratamento": objetivos,
                "abordagem_familia": abordagem,
                "cronograma_atividades": cronograma,
                "mensagem_plano": mensagem,
                "data_criacao": data_criacao,
                "assinatura_terapeuta": ass_ter,
                "assinatura_familia": ass_fam
            }, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e); return Response({"detail": msg}, status=code)

# complementares

@api_view(["POST"])
def assinar_plano_familiar(request):
    s = AssinarPlanoFamiliarIn(data=request.data); s.is_valid(raise_exception=True); d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ASSINAR_FAM, (d["id_plano"],))
            return Response({"detail": "Assinado pelo familiar"}, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e); return Response({"detail": msg}, status=code)

@api_view(["POST"])
def desvincular_familiar(request):
    s = DesvincularFamiliarIn(data=request.data); s.is_valid(raise_exception=True); d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_DESV_FAM, (d["id_plano"], d["id_familiar"]))
            return Response({"detail": "Familiar desvinculado"}, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e); return Response({"detail": msg}, status=code)

@api_view(["POST"])
def remover_neurodivergencia(request):
    s = RemoverNeuroIn(data=request.data); s.is_valid(raise_exception=True); d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_REMOVER_NEURO, (d["id_plano"], d["id_neuro"]))
            return Response({"detail": "Neurodivergência removida"}, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e); return Response({"detail": msg}, status=code)

@api_view(["POST"])
def remover_metodo(request):
    s = RemoverMetodoIn(data=request.data); s.is_valid(raise_exception=True); d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_REMOVER_MET, (d["id_plano"], d["id_metodo"]))
            return Response({"detail": "Método removido"}, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e); return Response({"detail": msg}, status=code)

@api_view(["POST"])
def atualizar_mensagem(request):
    s = AtualizarMensagemIn(data=request.data); s.is_valid(raise_exception=True); d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ATU_MSG, (d["id_plano"], d["mensagem_plano"]))
            return Response({"detail": "Mensagem atualizada"}, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e); return Response({"detail": msg}, status=code)

@api_view(["POST"])
def atualizar_cronograma(request):
    s = AtualizarCronogramaIn(data=request.data); s.is_valid(raise_exception=True); d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ATU_CRONO, (d["id_plano"], d["cronograma_atividades"]))
            return Response({"detail": "Cronograma atualizado"}, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e); return Response({"detail": msg}, status=code)

@api_view(["POST"])
def atualizar_abordagem(request):
    s = AtualizarAbordagemIn(data=request.data); s.is_valid(raise_exception=True); d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ATU_ABORD, (d["id_plano"], d["abordagem_familia"]))
            return Response({"detail": "Abordagem atualizada"}, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e); return Response({"detail": msg}, status=code)

@api_view(["POST"])
def atualizar_objetivos(request):
    s = AtualizarObjetivosIn(data=request.data); s.is_valid(raise_exception=True); d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ATU_OBJ, (d["id_plano"], d["objetivos_tratamento"]))
            return Response({"detail": "Objetivos atualizados"}, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e); return Response({"detail": msg}, status=code)

@api_view(["POST"])
def atualizar_grau_neurodivergencia(request):
    s = AtualizarGrauNeuroIn(data=request.data); s.is_valid(raise_exception=True); d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ATU_GRAU, (d["id_plano"], d["grau_neurodivergencia"]))
            return Response({"detail": "Grau de neurodivergência atualizado"}, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e); return Response({"detail": msg}, status=code)

@api_view(["POST"])
def excluir_arquivo_plano(request):
    s = ExcluirArquivoPlanoIn(data=request.data); s.is_valid(raise_exception=True); d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_EXCLUIR_ARQ, (d["id_plano"], d["id_arquivo"]))
            return Response({"detail": "Arquivo excluído"}, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e); return Response({"detail": msg}, status=code)
