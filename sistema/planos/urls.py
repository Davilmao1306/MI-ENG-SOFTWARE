# Em 'planos/urls.py'
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlanoTerapeuticoViewSet

router = DefaultRouter()
router.register(r'planos-terapeuticos', PlanoTerapeuticoViewSet, basename='plano')

urlpatterns = [
    path('', include(router.urls)),
]