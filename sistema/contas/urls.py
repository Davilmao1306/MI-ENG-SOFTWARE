from django.urls import path
from . import views

urlpatterns = [
    path('api/login/', views.login_api, name='api_login'),
    # path('menu/clinica/', views.menu_clinica, name='menu_clinica'),
    # path('menu/terapeuta/', views.menu_terapeuta, name='menu_terapeuta'),
    # path('menu/familiar/', views.menu_familiar, name='menu_familiar'),
]
