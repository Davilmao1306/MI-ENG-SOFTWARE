from django.urls import path
from . import views

urlpatterns = [
    path("familiares", views.criar_familiar, name="familiares-criar"),
    path("terapeutas", views.criar_terapeuta, name="terapeutas-criar"),
    path("pacientes", views.criar_paciente, name="pacientes-criar"),
    path("clinicas", views.criar_clinica, name="clinicas-criar"),
    path("lista-clinicas", views.lista_clinicas, name="clinicas-listar"),
    path("lista-terapeutas", views.lista_terapeutas, name="terapeutas-listar"),
    path("lista-pacientes", views.lista_pacientes, name="pacientes-listar"),
    path("lista-familiares", views.lista_familiares, name="familiares-listar"),
    path("usuarios/<int:id_usuario>/consentimento", views.registrar_consentimento, name="usuarios-consentimento"),
]

 