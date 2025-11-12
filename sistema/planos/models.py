from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords


from contas.models import Terapeuta, Familiar 


class MetodoAcompanhamento(models.Model):

    nome = models.CharField(max_length=255, unique=True, verbose_name="Nome do Método")

    class Meta:
        verbose_name = "Método de Acompanhamento"
        verbose_name_plural = "Métodos de Acompanhamento"

    def __str__(self):
        return self.nome

class Neurodivergencia(models.Model):
   
    sigla = models.CharField(max_length=10, unique=True, verbose_name="Sigla")
    nome_completo = models.CharField(max_length=100, null=True, blank=True, verbose_name="Nome Completo")

    class Meta:
        verbose_name = "Neurodivergência"
        verbose_name_plural = "Neurodivergências"

    def __str__(self):
        return self.sigla


class PlanoTerapeutico(models.Model):
    
    #paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name="planos")
    terapeuta = models.ForeignKey(Terapeuta, on_delete=models.PROTECT, related_name="planos_criados")
    familiar = models.ForeignKey(Familiar, on_delete=models.SET_NULL, null=True, blank=True, related_name="planos_associados")
    
    
    neurodivergencias = models.ManyToManyField(Neurodivergencia, through='PlanoNeurodivergencia', related_name='planos_relacionados')
    metodos = models.ManyToManyField(MetodoAcompanhamento, through='PlanoMetodo', related_name='planos_aplicados')

    grau_neurodivergencia = models.CharField(max_length=500, verbose_name="Grau da Neurodivergência")
    objetivos_tratamento = models.TextField(max_length=2000, verbose_name="Objetivos do Tratamento")
    abordagem_familia = models.TextField(max_length=2000, verbose_name="Abordagem à Família")
    cronograma_atividades = models.TextField(max_length=2000, verbose_name="Cronograma de Atividades")
    mensagem_plano = models.TextField(max_length=2000, null=True, blank=True, verbose_name="Mensagem Adicional")
    
    data_criacao = models.DateTimeField(auto_now_add=True, verbose_name="Data de Criação")
    data_assinatura_terapeuta = models.DateTimeField(null=True, blank=True, verbose_name="Data Assinatura Terapeuta")
    data_assinatura_familia = models.DateTimeField(null=True, blank=True, verbose_name="Data Assinatura Família")
    
    
    history = HistoricalRecords()

    class Meta:
        verbose_name = "Plano Terapêutico"
        verbose_name_plural = "Planos Terapêuticos"

    def __str__(self):
        return f"Plano de {self.paciente.nome} - {self.data_criacao.strftime('%d/%m/%Y')}"

    
    def assinar_plano_terapeuta(self):
        if not self.data_assinatura_terapeuta:
            self.data_assinatura_terapeuta = timezone.now()



class PlanoNeurodivergencia(models.Model):
    
    plano = models.ForeignKey('PlanoTerapeutico', on_delete=models.CASCADE) 
    neurodivergencia = models.ForeignKey(Neurodivergencia, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('plano', 'neurodivergencia')

class PlanoMetodo(models.Model):

    plano = models.ForeignKey('PlanoTerapeutico', on_delete=models.CASCADE)
    metodo = models.ForeignKey(MetodoAcompanhamento, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('plano', 'metodo')

class AnexoPlano(models.Model):
    
    plano = models.ForeignKey('PlanoTerapeutico', on_delete=models.CASCADE, related_name="anexos")
    
   
    arquivo = models.FileField(upload_to='planos/anexos/') 
    
    nome_arquivo = models.CharField(max_length=255, verbose_name="Nome do Arquivo")
    tipo_mime = models.CharField(max_length=100, verbose_name="Tipo MIME")
    data_upload = models.DateTimeField(auto_now_add=True, verbose_name="Data de Upload")

    def __str__(self):
        return f"{self.nome_arquivo} ({self.plano.id})"