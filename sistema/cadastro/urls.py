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
    path("lista-vinculos-pf", views.lista_vinculos_pf, name="vinculos-listar_pf"),
    path("lista-vinculos-pt", views.lista_vinculos_pt, name="vinculos-listar_pt"),
    path("usuarios/<int:id_usuario>/consentimento",
         views.registrar_consentimento, name="usuarios-consentimento"),
]
