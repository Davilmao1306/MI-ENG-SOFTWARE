from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import get_user_model
from django.http import HttpResponse

# --- FUNÇÃO TEMPORÁRIA PARA CRIAR ADMIN (CORRIGIDA) ---
def criar_superusuario_view(request):
    User = get_user_model()
    email = "admin@neurolink.com"
    senha = "AdminNeuro123!" # Senha forte
    
    if not User.objects.filter(email=email).exists():
        try:
            # Tenta criar APENAS com email e senha (padrão mais seguro)
            User.objects.create_superuser(
                email=email,
                password=senha
            )
            return HttpResponse(f"Sucesso! Admin criado.<br>Email: {email}<br>Senha: {senha}")
        except Exception as e:
            return HttpResponse(f"Erro ao criar admin: {str(e)}")
    else:
        return HttpResponse("O Admin já existe!")
# ------------------------------------------

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('autenticacao/', include('autenticacao.urls')),
    path('cadastro/', include('cadastro.urls')),
    path('login/', include('contas.urls')), 
    path('vinculos/', include('vinculos.urls')),
    path('plano/', include('plano.urls')),
    path('diario/', include('diario.urls')),
    
    # Rota secreta temporária
    path('criar-admin-secreto/', criar_superusuario_view),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
