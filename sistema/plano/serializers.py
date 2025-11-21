from rest_framework import serializers

# criação do plano


class CriarPlanoIn(serializers.Serializer):
    id_paciente = serializers.IntegerField(min_value=1)
    id_terapeuta = serializers.IntegerField(min_value=1)
    id_familiar = serializers.IntegerField(
        min_value=1, required=False, allow_null=True)
    grau_neurodivergencia = serializers.CharField(max_length=500)
    objetivos_tratamento = serializers.CharField(max_length=500)
    abordagem_familia = serializers.CharField(max_length=500)
    cronograma_atividades = serializers.CharField(max_length=500)
    mensagem_plano = serializers.CharField(
        max_length=500, required=False, allow_blank=True, allow_null=True)

# vínculos e adições


class VincularFamiliarIn(serializers.Serializer):
    id_plano = serializers.IntegerField(min_value=1)
    id_familiar = serializers.IntegerField(min_value=1)


class AdicionarNeuroIn(serializers.Serializer):
    id_plano = serializers.IntegerField(min_value=1)
    id_neuro = serializers.IntegerField(min_value=1)


class AdicionarMetodoIn(serializers.Serializer):
    id_plano = serializers.IntegerField(min_value=1)
    id_metodo = serializers.IntegerField(min_value=1)

# assinaturas


class AssinarPlanoTerapeutaIn(serializers.Serializer):
    id_plano = serializers.IntegerField(min_value=1)


class AssinarPlanoFamiliarIn(serializers.Serializer):
    id_plano = serializers.IntegerField(min_value=1)

# remoções


class DesvincularFamiliarIn(serializers.Serializer):
    id_plano = serializers.IntegerField(min_value=1)
    id_familiar = serializers.IntegerField(min_value=1)


class RemoverNeuroIn(serializers.Serializer):
    id_plano = serializers.IntegerField(min_value=1)
    id_neuro = serializers.IntegerField(min_value=1)


class RemoverMetodoIn(serializers.Serializer):
    id_plano = serializers.IntegerField(min_value=1)
    id_metodo = serializers.IntegerField(min_value=1)

# updates granulares


class AtualizarMensagemIn(serializers.Serializer):
    id_plano = serializers.IntegerField(min_value=1)
    mensagem_plano = serializers.CharField(
        max_length=2000, allow_blank=True, allow_null=True)


class AtualizarCronogramaIn(serializers.Serializer):
    id_plano = serializers.IntegerField(min_value=1)
    cronograma_atividades = serializers.CharField(max_length=2000)


class AtualizarAbordagemIn(serializers.Serializer):
    id_plano = serializers.IntegerField(min_value=1)
    abordagem_familia = serializers.CharField(max_length=2000)


class AtualizarObjetivosIn(serializers.Serializer):
    id_plano = serializers.IntegerField(min_value=1)
    objetivos_tratamento = serializers.CharField(max_length=2000)


class AtualizarGrauNeuroIn(serializers.Serializer):
    id_plano = serializers.IntegerField(min_value=1)
    grau_neurodivergencia = serializers.CharField(max_length=500)

# anexos


class AnexarArquivoPlanoIn(serializers.Serializer):
    id_plano = serializers.IntegerField(min_value=1)
    nome_arquivo = serializers.CharField(max_length=255)
    tipo_mime = serializers.CharField(max_length=100)
    arquivo = serializers.FileField()


class ExcluirArquivoPlanoIn(serializers.Serializer):
    id_plano = serializers.IntegerField(min_value=1)
    id_arquivo = serializers.IntegerField(min_value=1)
