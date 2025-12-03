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
    path("lista-usuarios", views.lista_usuarios, name="usuarios-listar"),
    path("lista-planos", views.lista_planos, name="vinculos-listar_pt"),
    path("editar-terapeuta/<int:id_terapeuta>/",views.atualizar_terapeuta, name="terapeutas-atualizar"),
    path("editar-familiar/<int:id_familiar>/",views.atualizar_familiar, name="familiar-atualizar"),
    path("editar-paciente/<int:id_paciente>/",views.atualizar_paciente, name="paciente-atualizar"),
    path("usuarios/<int:id_usuario>/consentimento",views.registrar_consentimento, name="usuarios-consentimento"),
    path("vinculos/familiar/<int:id_familiar>",views.listar_vinculos_por_familiar, name="listar-vinculos-familiar"),
    path("familiar/excluir/<int:id_familiar>", views.excluir_familiar, name="excluir-familiar"),
    path("terapeuta/excluir/<int:id_terapeuta>", views.excluir_terapeuta, name="excluir-terapeuta"),
    path("paciente/excluir/<int:id_paciente>", views.excluir_paciente, name="excluir-paciente"),
]
