from django.urls import path
from . import views

urlpatterns = [
    path('api/login/', views.login_api, name='api_login'),
    path('api/aceitar-termo/', views.aceitar_termo_api, name='api_aceitar_termo'),
    path('auth/esqueci-senha', views.solicitar_reset_senha),
    path('auth/redefinir-senha', views.confirmar_reset_senha),
]
