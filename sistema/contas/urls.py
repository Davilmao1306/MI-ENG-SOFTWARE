from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('menu/clinica/', views.menu_clinica, name='menu_clinica'),
    path('menu/terapeuta/', views.menu_terapeuta, name='menu_terapeuta'),
    path('menu/familiar/', views.menu_familiar, name='menu_familiar'),
]
