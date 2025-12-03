from django.urls import path
from . import views

urlpatterns = [
    # principais
    path("plano/criar", views.criar_plano),
    path("plano/vincular-familiar", views.vincular_familiar),
    path("plano/adicionar-neuro", views.adicionar_neurodivergencia),
    path("plano/adicionar-metodo", views.adicionar_metodo),
    path("plano/assinar-terapeuta", views.assinar_plano_terapeuta),
    path("plano/anexar-arquivo", views.anexar_arquivo),
    path("plano/<int:id_plano>", views.buscar_plano_completo),

    # complementares
    path("plano/assinar-familiar", views.assinar_plano_familiar),
    path("plano/desvincular-familiar", views.desvincular_familiar),
    path("plano/remover-neuro", views.remover_neurodivergencia),
    path("plano/remover-metodo", views.remover_metodo),
    path("plano/atualizar-mensagem", views.atualizar_mensagem),
    path("plano/atualizar-cronograma", views.atualizar_cronograma),
    path("plano/atualizar-abordagem", views.atualizar_abordagem),
    path("plano/atualizar-objetivos", views.atualizar_objetivos),
    path("plano/atualizar-grau-neuro", views.atualizar_grau_neurodivergencia),
    path("plano/excluir-arquivo", views.excluir_arquivo_plano),
    path("plano/feedback/adicionar", views.adicionar_feedback),
    path("plano/<int:id_plano>/feedbacks", views.listar_feedbacks),
    path("plano/link/adicionar", views.adicionar_link_plano),
    path("plano/editar/<int:id_plano>", views.editar_plano),
]
