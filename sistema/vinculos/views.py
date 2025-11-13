from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from psycopg.errors import ForeignKeyViolation, UndefinedFunction
from db import get_conn
from .serializers import (
    VincularPacienteFamiliarIn, VincularPacienteTerapeutaIn,
    DesvincularPacienteFamiliarIn, DesvincularPacienteTerapeutaIn,
)

SCHEMA = ""

SQL_VINC_PAC_FAM   = f"SELECT {SCHEMA}vincular_paciente_familiar(%s, %s)"
SQL_VINC_PAC_TER   = f"SELECT {SCHEMA}vincular_paciente_terapeuta(%s, %s)"
SQL_DESV_PAC_FAM   = f"SELECT {SCHEMA}desvincular_paciente_familiar(%s, %s)"
SQL_DESV_PAC_TER   = f"SELECT {SCHEMA}desvincular_paciente_terapeuta(%s, %s)"

def _map_db_error(e):
    if isinstance(e, ForeignKeyViolation):
        return (status.HTTP_404_NOT_FOUND, "Entidade relacionada não encontrada.")
    if isinstance(e, UndefinedFunction):
        return (status.HTTP_500_INTERNAL_SERVER_ERROR, "Função SQL não encontrada.")
    return (status.HTTP_500_INTERNAL_SERVER_ERROR, "Erro interno.")

@api_view(["POST"])
def vincular_paciente_familiar(request):
    s = VincularPacienteFamiliarIn(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_VINC_PAC_FAM, (d["id_paciente"], d["id_familiar"]))
            msg = cur.fetchone()[0]
            return Response({"detail": msg}, status=status.HTTP_201_CREATED)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)

@api_view(["POST"])
def vincular_paciente_terapeuta(request):
    s = VincularPacienteTerapeutaIn(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_VINC_PAC_TER, (d["id_paciente"], d["id_terapeuta"]))
            msg = cur.fetchone()[0]
            return Response({"detail": msg}, status=status.HTTP_201_CREATED)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)

@api_view(["POST"])
def desvincular_paciente_familiar(request):
    s = DesvincularPacienteFamiliarIn(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_DESV_PAC_FAM, (d["id_paciente"], d["id_familiar"]))
            msg = cur.fetchone()[0]
            return Response({"detail": msg}, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)

@api_view(["POST"])
def desvincular_paciente_terapeuta(request):
    s = DesvincularPacienteTerapeutaIn(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data
    try:
        with get_conn() as conn, conn.cursor() as cur:
            cur.execute(SQL_DESV_PAC_TER, (d["id_paciente"], d["id_terapeuta"]))
            msg = cur.fetchone()[0]
            return Response({"detail": msg}, status=status.HTTP_200_OK)
    except Exception as e:
        code, msg = _map_db_error(e)
        return Response({"detail": msg}, status=code)
