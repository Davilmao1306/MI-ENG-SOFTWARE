from rest_framework import serializers

# Diário Compartilhado
class CriarDiarioIn(serializers.Serializer):
    id_paciente = serializers.IntegerField(min_value=1)
    id_terapeuta = serializers.IntegerField(min_value=1)
    titulo = serializers.CharField(max_length=255)
    conteudo = serializers.CharField()


class AtualizarDiarioIn(serializers.Serializer):
    id_diario = serializers.IntegerField(min_value=1)
    titulo = serializers.CharField(max_length=255, required=False, allow_null=True)
    conteudo = serializers.CharField(required=False, allow_null=True)

class ExcluirDiarioIn(serializers.Serializer):
    id_diario = serializers.IntegerField(min_value=1)

class ListarDiariosPorTerapeutaIn(serializers.Serializer):
    id_terapeuta = serializers.IntegerField(min_value=1)

class ListarDiariosPorPacienteIn(serializers.Serializer):
    id_paciente = serializers.IntegerField(min_value=1)

class BuscarDiarioPorIdIn(serializers.Serializer):
    id_diario = serializers.IntegerField(min_value=1)

# CHECKLIST
class CriarChecklistIn(serializers.Serializer):
    id_terapeuta = serializers.IntegerField(min_value=1)
    id_diario = serializers.IntegerField(min_value=1)

class AdicionarObservacaoChecklistIn(serializers.Serializer):
    id_checklist = serializers.IntegerField(min_value=1)
    id_familiar = serializers.IntegerField(min_value=1)
    descricao_observacao = serializers.CharField(max_length=255)


# MENSAGEM
class EnviarMensagemIn(serializers.Serializer):
    descricao_mensagem = serializers.CharField(max_length=500)
    id_diario = serializers.IntegerField(min_value=1, required=False, allow_null=True)
    id_familiar = serializers.IntegerField(min_value=1, required=False, allow_null=True)
    id_terapeuta = serializers.IntegerField(min_value=1, required=False, allow_null=True)

# MÍDIA
class AdicionarMidiaIn(serializers.Serializer):
    tipo = serializers.CharField() 
    arquivo = serializers.FileField()
    nomearquivo = serializers.CharField(required=False)
    mimetype = serializers.CharField(required=False)
    
    # ESTES CAMPOS PRECISAM ESTAR AQUI:
    id_diario = serializers.IntegerField(required=False)
    id_observacao = serializers.IntegerField(required=False)
    id_mensagem = serializers.IntegerField(required=False)

    
    TAMANHO_MAXIMO = 5 * 1024 * 1024
    def validate_tipo(self, value):
        if value not in ['foto', 'video', 'documento']:
            raise serializers.ValidationError(f'Tipo de mídia inválido: {value}')
        return value

    def validate_arquivo(self, value):
        if value.size > self.TAMANHO_MAXIMO:
            raise serializers.ValidationError('Arquivo excede o tamanho máximo permitido de 5MB.')
        return value

    def validate(self, data):
        arquivo = data.get('arquivo')
        tipo = data.get('tipo')
        
        if arquivo and tipo:
    
            if tipo == 'foto' and not arquivo.content_type.startswith('image/'):
                raise serializers.ValidationError({
                    'arquivo': 'O arquivo não parece ser uma imagem válida para o tipo "foto"'
                })
            elif tipo == 'video' and not arquivo.content_type.startswith('video/'):
                raise serializers.ValidationError({
                    'arquivo': 'O arquivo não parece ser um vídeo válido para o tipo "video"'
                })
        
        return data

class ExcluirMidiaIn(serializers.Serializer):
    id_midia = serializers.IntegerField(min_value=1)


# DIÁRIO TERAPEUTA/FAMILIAR
class VincularDiarioTerapeutaIn(serializers.Serializer):
    id_diario = serializers.IntegerField(min_value=1)
    id_terapeuta = serializers.IntegerField(min_value=1)

class VincularDiarioFamiliarIn(serializers.Serializer):
    id_diario = serializers.IntegerField(min_value=1)
    id_familiar = serializers.IntegerField(min_value=1)