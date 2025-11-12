from rest_framework import serializers
from .models import (
    PlanoTerapeutico, 
    Neurodivergencia, 
    MetodoAcompanhamento, 
    AnexoPlano
)


class AnexoPlanoSerializer(serializers.ModelSerializer):
    arquivo_url = serializers.FileField(source='arquivo', read_only=True)
    
    class Meta:
        model = AnexoPlano
        fields = ['id', 'nome_arquivo', 'tipo_mime', 'data_upload', 'arquivo_url']



class NeurodivergenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Neurodivergencia
        fields = ['id', 'sigla', 'nome_completo']

class MetodoAcompanhamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetodoAcompanhamento
        fields = ['id', 'nome']



class PlanoTerapeuticoReadSerializer(serializers.ModelSerializer):

    neurodivergencias = NeurodivergenciaSerializer(many=True, read_only=True)
    metodos = MetodoAcompanhamentoSerializer(many=True, read_only=True)
    anexos = AnexoPlanoSerializer(many=True, read_only=True)
    
    paciente_nome = serializers.CharField(source='paciente.nome', read_only=True)
    terapeuta_nome = serializers.CharField(source='terapeuta.nome', read_only=True)
    familiar_nome = serializers.CharField(source='familiar.nome', read_only=True, allow_null=True)

    class Meta:
        model = PlanoTerapeutico
        fields = '__all__'

class PlanoTerapeuticoWriteSerializer(serializers.ModelSerializer):
   
    paciente_id = serializers.IntegerField(write_only=True)
    terapeuta_id = serializers.IntegerField(write_only=True)
    familiar_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    
    neurodivergencias = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Neurodivergencia.objects.all(), required=False
    )
    metodos = serializers.PrimaryKeyRelatedField(
        many=True, queryset=MetodoAcompanhamento.objects.all(), required=False
    )
    
    class Meta:
        model = PlanoTerapeutico
        fields = [
            'id', 'paciente_id', 'terapeuta_id', 'familiar_id', 
            'grau_neurodivergencia', 'objetivos_tratamento', 'abordagem_familia', 
            'cronograma_atividades', 'mensagem_plano', 
            'neurodivergencias', 'metodos'
        ]
        read_only_fields = ['id']

    def create(self, validated_data):
        neurodivergencias_data = validated_data.pop('neurodivergencias', [])
        metodos_data = validated_data.pop('metodos', [])
        
        plano = PlanoTerapeutico.objects.create(
            paciente_id=validated_data.pop('paciente_id'),
            terapeuta_id=validated_data.pop('terapeuta_id'),
            familiar_id=validated_data.pop('familiar_id', None),
            **validated_data
        )
        
        plano.neurodivergencias.set(neurodivergencias_data)
        plano.metodos.set(metodos_data)
        
        return plano 
   
    def update(self, instance, validated_data):
       
        neurodivergencias_data = validated_data.pop('neurodivergencias', instance.neurodivergencias.all())
        metodos_data = validated_data.pop('metodos', instance.metodos.all())

        instance.paciente_id = validated_data.get('paciente_id', instance.paciente_id)
        instance.terapeuta_id = validated_data.get('terapeuta_id', instance.terapeuta_id)
        instance.familiar_id = validated_data.get('familiar_id', instance.familiar_id)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()

        instance.neurodivergencias.set(neurodivergencias_data)
        instance.metodos.set(metodos_data)

        return instance