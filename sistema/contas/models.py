from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone

# ------------------------
# CLASSE BASE - USUÁRIO
# ------------------------
class UsuarioManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("O e-mail é obrigatório")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('tipo', 'C')
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser precisa is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser precisa is_superuser=True')
        return self.create_user(email, password, **extra_fields)

class Usuario(AbstractBaseUser, PermissionsMixin):
    TIPOS = (
        ('C', 'Clínica'),
        ('T', 'Terapeuta'),
        ('F', 'Familiar'),
    )
    email = models.EmailField('e-mail', unique=True)
    first_name = models.CharField('nome', max_length=150, blank=True)
    last_name = models.CharField('sobrenome', max_length=150, blank=True)
    tipo = models.CharField(max_length=1, choices=TIPOS, default='F')
    cpf = models.CharField(max_length=14, blank=True, null=True, unique=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UsuarioManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'usuário'
        verbose_name_plural = 'usuários'

    def __str__(self):
        return f"{self.email} ({self.get_tipo_display()})"

# ------------------------
# SUBCLASSES ESPECÍFICAS
# ------------------------
# Declaramos explicitamente o parent link para:
# - evitar reverse accessor padrão (que colidia com a app cadastro)
# - usar nomes reversos únicos (contas_*)

class Clinica(Usuario):
    usuario_ptr = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,
        parent_link=True,
        related_name="contas_clinica",
        primary_key=True,
    )
    cnpj = models.CharField(max_length=18, unique=True, null=True, blank=True)
    nome_fantasia = models.CharField(max_length=150, blank=True)

    class Meta:
        verbose_name = "clínica"
        verbose_name_plural = "clínicas"

class Terapeuta(Usuario):
    usuario_ptr = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,
        parent_link=True,
        related_name="contas_terapeuta",
        primary_key=True,
    )
    crp = models.CharField(max_length=20, unique=True, null=True, blank=True)
    especialidade = models.CharField(max_length=100, blank=True)

    class Meta:
        verbose_name = "terapeuta"
        verbose_name_plural = "terapeutas"

class Familiar(Usuario):
    usuario_ptr = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,
        parent_link=True,
        related_name="contas_familiar",
        primary_key=True,
    )
    parentesco = models.CharField(max_length=50, blank=True)
    telefone = models.CharField(max_length=15, blank=True)

    class Meta:
        verbose_name = "familiar"
        verbose_name_plural = "familiares"
