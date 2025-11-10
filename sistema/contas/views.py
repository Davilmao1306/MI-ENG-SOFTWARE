from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .forms import LoginForm
from .serializers import LoginAPISerializer
from django.db import connection





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

    if row:
        id_usuario, email, consentimento, tipo = row
        return Response({
            "success": True,
            "id": id_usuario,
            "email": email,
            "consentimento": consentimento,
            "tipo": tipo
        })
    else:
        return Response({"success": False, "detail": "Credenciais inválidas."},
                        status=status.HTTP_401_UNAUTHORIZED)
