from rest_framework import serializers

class LoginAPISerializer(serializers.Serializer):
    """
    Serializer simples para validar a entrada de login da API.
    Não gera tokens, apenas valida que os campos existem.
    """
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)