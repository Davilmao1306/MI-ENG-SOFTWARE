from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

Usuario = get_user_model()

class RegistroForm(UserCreationForm):
    email = forms.EmailField(required=True, help_text="Use um e-mail válido (será seu login).")

    class Meta:
        model = Usuario
        fields = ('email','first_name','last_name','tipo')

    def clean_email(self):
        email = self.cleaned_data['email'].lower()
        if Usuario.objects.filter(email__iexact=email).exists():
            raise forms.ValidationError('Este e-mail já está cadastrado.')
        return email

class LoginEmailForm(AuthenticationForm):
    username = forms.EmailField(label="E-mail")
