from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginAPISerializer
from django.db import connection
import jwt
from datetime import datetime, timedelta, timezone
from django.conf import settings


@api_view(["POST"])
def login_api(request):
    s = LoginAPISerializer(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data

    email = d['email']
    password = d['password']

    with connection.cursor() as cur:
        cur.execute("SELECT * FROM validar_login(%s, %s)", [email, password])
        row = cur.fetchone()

    if not row:
        return Response(
            {"success": False, "detail": "Credenciais inválidas."},
            status=status.HTTP_401_UNAUTHORIZED
        )
    id_usuario, email, consentimento, tipo = row

    payload = {
        "id": id_usuario,
        "email": email,
        "tipo": tipo,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=1),
        "iat": datetime.now(timezone.utc),
    }

    access_token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

    return Response({
        "success": True,
        "id": id_usuario,
        "email": email,
        "consentimento": consentimento,
        "tipo": tipo,
        "access": access_token,
    })
