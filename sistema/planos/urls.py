# Em 'planos/urls.py'
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlanoTerapeuticoViewSet

router = DefaultRouter()
router.register(r'planos-terapeuticos', PlanoTerapeuticoViewSet, basename='plano')

urlpatterns = [
    path('', include(router.urls)),
]

# --- ISSO GERA AUTOMATICAMENTE AS SEGUINTES ROTAS ---
# POST   /planos-terapeuticos/             (Criar Plano - UC19, RF008)
# GET    /planos-terapeuticos/             (Listar Planos)
# GET    /planos-terapeuticos/{id}/        (Ver Plano - RF008, RF011)
# PUT    /planos-terapeuticos/{id}/        (Editar Plano - UC20, RF012)
# PATCH  /planos-terapeuticos/{id}/        (Editar Plano - UC20, RF012)
# DELETE /planos-terapeuticos/{id}/        (Remover Plano)
#
# --- E AS ROTAS CUSTOMIZADAS ---
# POST   /planos-terapeuticos/{id}/anexar_arquivo/ (RF010, RF014)
# GET    /planos-terapeuticos/{id}/historico/      (RF013)
# POST   /planos-terapeuticos/{id}/assinar_terapeuta/