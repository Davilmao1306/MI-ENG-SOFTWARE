from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from psycopg.errors import UniqueViolation, ForeignKeyViolation, UndefinedFunction
from db import get_conn
from .serializers import FamiliarIn, TerapeutaIn, PacienteIn, ClinicaIn


SCHEMA = ""
# -> id_familiar
SQL_CADASTRAR_FAMILIAR = f"SELECT {SCHEMA}cadastrar_familiar(%s, %s, %s, %s, %s, %s, %s)"
# -> id_terapeuta
SQL_CADASTRAR_TERAPEUTA = f"SELECT {SCHEMA}cadastrar_terapeuta(%s, %s, %s, %s, %s, %s, %s, %s)"
# -> id_paciente
SQL_CADASTRAR_PACIENTE = f"SELECT {SCHEMA}cadastrar_paciente(%s, %s, %s, %s, %s)"
# -> id_clinica
SQL_CADASTRAR_CLINICA = f"SELECT {SCHEMA}cadastrar_clinica(%s, %s, %s, %s)"
# -> void
SQL_REGISTRAR_CONSENT = f"SELECT {SCHEMA}registrar_consentimento(%s)"
# -> editar terapeuta
SQL_ATUALIZAR_TERAPEUTA = f"SELECT {SCHEMA}atualizar_terapeuta(%s, %s, %s, %s, %s, %s,%s)"
# -> editar paciente
SQL_ATUALIZAR_PACIENTE = f"SELECT {SCHEMA}atualizar_paciente(%s, %s, %s, %s, %s, %s)"
# -> editar familiar
SQL_ATUALIZAR_FAMILIAR = f"SELECT {SCHEMA}atualizar_familiar(%s, %s, %s, %s, %s, %s)"


@api_view(["POST"])
def criar_familiar(request):
    """
    POST /api/familiares
    """
    s = FamiliarIn(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data

    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_CADASTRAR_FAMILIAR, (
                d["email"], d["senha"], d["nome"], str(d["data_nascimento"]),
                d["telefone"], d["cpf"], d["tipo"]
            ))
            new_id = cur.fetchone()[0]
            return Response({"id_familiar": new_id}, status=status.HTTP_201_CREATED)
    except UniqueViolation:
        return Response({"detail": "Registro já existe (violação de unicidade)."}, status=409)
    except UndefinedFunction:
        return Response({"detail": "Função cadastrar_familiar não encontrada."}, status=500)


@api_view(["POST"])
def criar_terapeuta(request):
    """
    POST /cadastro/terapeutas 
    """
    s = TerapeutaIn(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_CADASTRAR_TERAPEUTA, (
                d["email"], d["senha"], d["nome"], str(d["data_nascimento"]),
                d["telefone"], d["crp"], d["especialidade"], d["tipo"]
            ))
            new_id = cur.fetchone()[0]
            return Response({"id_terapeuta": new_id}, status=status.HTTP_201_CREATED)
    except UniqueViolation:
        return Response({"detail": "Registro já existe (violação de unicidade)."}, status=409)
    except UndefinedFunction:
        return Response({"detail": "Função cadastrar_terapeuta não encontrada."}, status=500)


@api_view(["POST"])
def criar_paciente(request):
    """
    POST /api/pacientes
    """
    s = PacienteIn(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_CADASTRAR_PACIENTE, (
                d["nome"], str(d["data_nascimento"]
                               ), d["cpf"], d["genero"], d["telefone"]
            ))
            new_id = cur.fetchone()[0]
            return Response({"id_paciente": new_id}, status=status.HTTP_201_CREATED)
    except UniqueViolation:
        return Response({"detail": "Registro já existe (violação de unicidade)."}, status=409)
    except UndefinedFunction:
        return Response({"detail": "Função cadastrar_paciente não encontrada."}, status=500)


@api_view(["POST"])
def criar_clinica(request):
    """
    POST /api/clinicas
    OBS: sua função no banco deve usar os mesmos nomes de parâmetros que você espera.
         Se no SQL estiver 'p_senha' em vez de 'p_senha_usuario', corrija no banco.
    """
    s = ClinicaIn(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_CADASTRAR_CLINICA, (
                d["email"], d["senha_usuario"], d["cnpj"], d["senha_clinica"]
            ))
            new_id = cur.fetchone()[0]
            return Response({"id_clinica": new_id}, status=status.HTTP_201_CREATED)
    except UniqueViolation:
        return Response({"detail": "Registro já existe (violação de unicidade)."}, status=409)
    except UndefinedFunction:
        return Response({"detail": "Função cadastrar_clinica não encontrada."}, status=500)


@api_view(["POST"])
def registrar_consentimento(request, id_usuario: int):
    """
    POST /api/usuarios/<id_usuario>/consentimento
    """
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_REGISTRAR_CONSENT, (int(id_usuario),))
            # se a função tratar inexistente/duplicado, confie nela
            cur.close()
            return Response({"ok": True}, status=status.HTTP_200_OK)
    except UndefinedFunction:
        return Response({"detail": "Função registrar_consentimento não encontrada."}, status=500)


@api_view(["PUT", "PATCH"])
def atualizar_terapeuta(request, id_terapeuta: int):
    d = request.data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ATUALIZAR_TERAPEUTA, (
                id_terapeuta,               # p_id_terapeuta
                d.get("nome"),              # p_nome
                d.get("data_nascimento"),   # p_data_nascimento (Date)
                d.get("telefone"),          # p_telefone
                d.get("crp"),               # p_crp
                d.get("especialidade"),     # p_especialidade
                d.get("email")              # p_email (Vai para tabela Usuario)
            ))
            cur.close()
            return Response({"ok": True}, status=200)

    except Exception as e:
        print(f"Erro no update: {e}")  # Log para ajudar a debugar
        return Response({"detail": str(e)}, status=500)


@api_view(["PUT", "PATCH"])
def atualizar_paciente(request, id_paciente: int):
    d = request.data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ATUALIZAR_PACIENTE, (
                id_paciente,
                d.get("nome"),
                d.get("data_nascimento"),
                d.get("telefone"),
                d.get("cpf"),
                d.get("genero"),
            ))
            conn.commit()
            return Response({"ok": True}, status=200)
    except Exception as e:
        print(f"Erro ao atualizar paciente: {e}")
        return Response({"detail": str(e)}, status=500)


@api_view(["PUT", "PATCH"])
def atualizar_familiar(request, id_familiar: int):
    d = request.data

    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_ATUALIZAR_FAMILIAR, (
                id_familiar,              # p_id_familiar
                d.get("nome"),            # p_nome
                d.get("data_nascimento"),
                d.get("telefone"),        # p_telefone
                d.get("cpf"),             # p_cpf
                d.get("email")            # p_email (Vai para tabela Usuario)
            ))
            conn.commit()
            return Response({"ok": True}, status=200)

    except Exception as e:
        print(f"Erro ao atualizar familiar: {e}")
        return Response({"detail": str(e)}, status=500)


def gera_listagem(nome_entidade):
    @api_view(["GET"])
    def lista_entidade(request):
        try:
            with get_conn() as conn:
                cur = conn.cursor()
                cur.execute(f"SELECT * FROM {nome_entidade}")
                clinicas = cur.fetchall()
                colunas = [desc[0]
                           for desc in cur.description]  # nomes das colunas

                # converte cada linha em um dicionário {coluna: valor}
                lista_clinicas = [dict(zip(colunas, linha))
                                  for linha in clinicas]
                cur.close()

            return Response(lista_clinicas, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"erro": f"Erro ao listar {nome_entidade}: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    return lista_entidade


lista_clinicas = gera_listagem('clinica')
lista_pacientes = gera_listagem('paciente')
lista_familiares = gera_listagem('familiar')
lista_terapeutas = gera_listagem('terapeuta')
lista_vinculos_pf = gera_listagem('pacientefamiliar')
lista_vinculos_pt = gera_listagem('pacienteterapeuta')
lista_planos = gera_listagem('planoterapeutico')
lista_usuarios = gera_listagem('usuario')
