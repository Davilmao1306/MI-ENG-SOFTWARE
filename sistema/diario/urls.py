from django.urls import path
from . import views

urlpatterns = [
    # DIÁRIO COMPARTILHADO - ADICIONE OS NAME
    path("diario/listar", views.listar_diarios, name="listar-diarios"),
    path("diario/terapeuta/<int:id_terapeuta>",views.listar_diarios_por_terapeuta, name="listar-diarios-por-terapeuta"),
    path("diario/paciente/<int:id_paciente>",views.listar_diarios_por_paciente, name="listar-diarios-por-paciente"),
    path("diario/<int:id_diario>", views.buscar_diario_por_id,name="buscar-diario-por-id"),
    path("diario/atualizar", views.atualizar_diario, name="atualizar-diario"),
    path("diario/excluir", views.excluir_diario, name="excluir-diario"),

    # CHECKLIST - JÁ TEM NAME
    path("checklist/criar", views.criar_checklist, name="criar-checklist"),
    path("checklist/observacao", views.adicionar_observacao_checklist,name="adicionar-observacao"),
    path("checklist/item/adicionar", views.adicionar_item_checklist),

    # MENSAGEM - JÁ TEM NAME
    path("mensagem/enviar", views.enviar_mensagem, name="enviar-mensagem"),

    # MÍDIA - JÁ TEM NAME
    path("midia/adicionar", views.adicionar_midia, name="adicionar-midia"),
    path("midia/excluir", views.excluir_midia, name="excluir-midia"),
    path("diario/<int:id_diario>/midias",views.listar_midias_por_diario, name="listar-midias-diario"),
    path("observacao/<int:id_observacao>/midias",views.listar_midias_por_observacao, name="listar-midias-observacao"),
    path("feed/<int:id_paciente>", views.listar_feed_completo,name="listar-feed-completo"),
    path("mensagem/<int:id_mensagem>/midias",views.listar_midias_por_mensagem, name="listar-midias-mensagem"),
    path("checklist/item/atualizar", views.atualizar_status_item,name="atualizar-item-checklist"),

    # VINCULAÇÃO DIÁRIO
    path("diario/vincular/terapeuta", views.vincular_diario_terapeuta,name="vincular-diario-terapeuta"),
    path("diario/vincular/familiar", views.vincular_diario_familiar,name="vincular-diario-familiar"),
]
