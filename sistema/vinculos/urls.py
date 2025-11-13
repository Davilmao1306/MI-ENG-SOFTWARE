from django.urls import path
from . import views

urlpatterns = [
    # path("vinculo_familiar", views.vincular_paciente_familiar, name="vincular-familiares"),
    path('pacientes/vincular-familiar/', views.vincular_paciente_familiar, name='vincular-familiar'),
]