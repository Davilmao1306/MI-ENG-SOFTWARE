from django.urls import path
from django.contrib.auth import views as auth_views
from .views import registro
from .forms import LoginEmailForm

urlpatterns = [
    path('entrar/', auth_views.LoginView.as_view(authentication_form=LoginEmailForm,
                                                 template_name='autenticacao/login.html'), name='login'),
    path('sair/', auth_views.LogoutView.as_view(), name='logout'),
    path('registrar/', registro, name='registrar'),
]
