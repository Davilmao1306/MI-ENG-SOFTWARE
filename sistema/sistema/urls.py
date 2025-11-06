from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("OK - Backend de Login e Cadastro ativo.")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('', include('autenticacao.urls')),
    path('cadastro/', include('cadastro.urls')),
]
