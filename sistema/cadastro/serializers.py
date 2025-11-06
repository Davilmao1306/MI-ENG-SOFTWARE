from rest_framework import serializers
import re

# Esta linha "from .models import ..." FOI REMOVIDA.
# É isso que estava causando o erro.

CPF_RE = re.compile(r"^\d{11}$")
CNPJ_RE = re.compile(r"^\d{14}$")  # simples: só dígitos; ajuste se quiser validar DV
FONE_RE = re.compile(r"^[0-9()+\-\s]{8,20}$")  # bem permissivo

class FamiliarIn(serializers.Serializer):
    email = serializers.EmailField()
    senha = serializers.CharField(min_length=3, max_length=100, write_only=True)
    nome  = serializers.CharField(min_length=2, max_length=120)
    data_nascimento = serializers.DateField()  # "YYYY-MM-DD"
    telefone = serializers.CharField(max_length=20)
    cpf = serializers.CharField()

    def validate_cpf(self, v):
        if not CPF_RE.match(v):
            raise serializers.ValidationError("CPF deve ter 11 dígitos (apenas números).")
        return v

    def validate_telefone(self, v):
        if not FONE_RE.match(v):
            raise serializers.ValidationError("Telefone inválido.")
        return v


class TerapeutaIn(serializers.Serializer):
    email = serializers.EmailField()
    senha = serializers.CharField(min_length=3, max_length=100, write_only=True)
    nome  = serializers.CharField(min_length=2, max_length=120)
    data_nascimento = serializers.DateField()
    telefone = serializers.CharField(max_length=20)
    crp = serializers.CharField(min_length=3, max_length=30)
    especialidade = serializers.CharField(min_length=2, max_length=100)

    def validate_telefone(self, v):
        if not FONE_RE.match(v):
            raise serializers.ValidationError("Telefone inválido.")
        return v


class PacienteIn(serializers.Serializer):
    nome  = serializers.CharField(min_length=2, max_length=120)
    data_nascimento = serializers.DateField()
    cpf = serializers.CharField()

    def validate_cpf(self, v):
        if not CPF_RE.match(v):
            raise serializers.ValidationError("CPF deve ter 11 dígitos (apenas números).")
        return v


class ClinicaIn(serializers.Serializer):
    email = serializers.EmailField()
    senha_usuario = serializers.CharField(min_length=3, max_length=100, write_only=True)
    cnpj = serializers.CharField()
    senha_clinica = serializers.CharField(min_length=3, max_length=100, write_only=True)

    def validate_cnpj(self, v):
        if not CNPJ_RE.match(v):
            raise serializers.ValidationError("CNPJ deve ter 14 dígitos (apenas números).")
        return v