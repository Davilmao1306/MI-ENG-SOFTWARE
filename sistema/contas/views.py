# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginAPISerializer
from django.db import connection
import jwt
from datetime import datetime, timedelta, timezone




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
    id_usuario, email, consentimentolgdp, tipo = row

    payload = {
        "id": id_usuario,
        "email": email,
        "tipo": tipo,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=30),
        "iat": datetime.now(timezone.utc),
    }

    access_token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

    return Response({
        "success": True,
        "id": id_usuario,
        "email": email,
        "consentimento": consentimentolgdp,
        "tipo": tipo,
        "access": access_token,
    })

@api_view(["POST"])
def aceitar_termo_api(request):
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return Response(
            {"success": False, "detail": "Token de autenticação não fornecido."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    try:
        token_type, access_token = auth_header.split()
        if token_type.lower() != "bearer":
            raise ValueError("Tipo de token inválido.")
    except ValueError:
        return Response(
            {"success": False, "detail": "Cabeçalho de autorização inválido."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    try:
        payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id = payload["id"]
    except jwt.ExpiredSignatureError:
        return Response(
            {"success": False, "detail": "Token expirado."},
            status=status.HTTP_401_UNAUTHORIZED
        )
    except jwt.InvalidTokenError:
        return Response(
            {"success": False, "detail": "Token inválido."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    with connection.cursor() as cur:
        cur.execute("UPDATE contas_usuario SET consentimentolgdp = TRUE WHERE id = %s", [user_id])

    return Response({"success": True, "detail": "Termo de consentimento aceito com sucesso."})

# ROTA PARA SOLICITAR O LINK
@api_view(['POST'])
def solicitar_reset_senha(request):
    email = request.data.get('email')
    User = get_user_model()
    
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"detail": "Se este e-mail estiver cadastrado, você receberá um link."}, status=status.HTTP_200_OK)
    
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))

    link_reset = f"http://localhost:5173/login/recuperar-senha/nova-senha/{uid}/{token}"
    nome_exibicao = user.first_name if user.first_name else user.email
    # Envia o e-mail
    assunto = "Redefinição de Senha - NeuroLink"
    mensagem = f"Olá {nome_exibicao},\n\nClique no link abaixo para redefinir sua senha:\n\n{link_reset}\n\nSe não foi você, ignore este e-mail."
    
    send_mail(assunto, mensagem, settings.EMAIL_HOST_USER, [email], fail_silently=False)

    return Response({"detail": "E-mail de redefinição enviado."}, status=status.HTTP_200_OK)


# ROTA PARA SALVAR A NOVA SENHA
@api_view(['POST'])
def confirmar_reset_senha(request):
    uid_b64 = request.data.get('uid')
    token = request.data.get('token')
    nova_senha = request.data.get('nova_senha')
    
    if not uid_b64 or not token or not nova_senha:
        return Response({"detail": "Dados incompletos."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        User = get_user_model()
        uid = force_str(urlsafe_base64_decode(uid_b64))
        user = User.objects.get(pk=uid)
    except Exception:
        return Response({"detail": "Link inválido."}, status=status.HTTP_400_BAD_REQUEST)

    if not default_token_generator.check_token(user, token):
        return Response({"detail": "Link inválido ou expirado."}, status=status.HTTP_400_BAD_REQUEST)

    # ----------------------------------------------------
    # Atualiza A SENHA NA SUA TABELA REAL: public.usuario
    # ----------------------------------------------------
    try:
        with connection.cursor() as cur:
            cur.execute("""
                UPDATE usuario
                SET senha = crypt(%s, gen_salt('bf'))
                WHERE email = %s
            """, [nova_senha, user.email])
    except Exception as e:
        return Response({"detail": f"Erro ao salvar a senha: {str(e)}"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"detail": "Senha alterada com sucesso!"}, status=status.HTTP_200_OK)
