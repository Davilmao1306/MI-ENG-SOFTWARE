from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario

@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    model = Usuario
    list_display = ('email','first_name','last_name','tipo','is_staff','is_superuser')
    list_filter = ('tipo','is_staff','is_superuser','is_active')
    ordering = ('email',)
    search_fields = ('email','first_name','last_name','cpf')

    fieldsets = (
        (None, {'fields': ('email','password')}),
        ('Informações pessoais', {'fields': ('first_name','last_name','cpf','tipo')}),
        ('Permissões', {'fields': ('is_active','is_staff','is_superuser','groups','user_permissions')}),
        ('Datas importantes', {'fields': ('last_login','date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email','password1','password2','tipo','is_staff','is_superuser'),
        }),
    )
