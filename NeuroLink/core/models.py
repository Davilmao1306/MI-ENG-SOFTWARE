
from django.db import models

class Usuario(models.Model):
    email = models.CharField(max_length=255, unique=True)
    senha = models.CharField(max_length=255)
    consentimento_lgpd = models.BooleanField()

    def __str__(self):
        return self.email


class Clinica(models.Model):
    cnpj = models.CharField(max_length=14, unique=True)
    senha = models.CharField(max_length=255)
    consentimento_lgpd = models.BooleanField()
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)


class Paciente(models.Model):
    nome = models.CharField(max_length=255)
    data_nascimento = models.DateField()
    cpf = models.CharField(max_length=11, unique=True)

    def __str__(self):
        return self.nome


class Familiar(models.Model):
    nome = models.CharField(max_length=255)
    data_nascimento = models.DateField()
    telefone = models.CharField(max_length=12)
    cpf = models.CharField(max_length=11, unique=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome


class Terapeuta(models.Model):
    nome = models.CharField(max_length=255)
    data_nascimento = models.DateField()
    telefone = models.CharField(max_length=12)
    crp = models.CharField(max_length=7, unique=True)
    especialidade = models.CharField(max_length=255)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome


class DiarioCompartilhado(models.Model):
    data_criacao = models.DateField()
    imagens = models.BinaryField(null=True, blank=True)
    link = models.CharField(max_length=255, null=True, blank=True)
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)


class Checklist(models.Model):
    data_criacao = models.DateField()
    terapeuta = models.ForeignKey(Terapeuta, on_delete=models.CASCADE)
    diario = models.ForeignKey(DiarioCompartilhado, on_delete=models.CASCADE)


class Observacao(models.Model):
    descricao_observacao = models.CharField(max_length=255)
    data_envio = models.DateField()
    data_edicao = models.DateField(null=True, blank=True)
    checklist = models.ForeignKey(Checklist, on_delete=models.CASCADE)
    familiar = models.ForeignKey(Familiar, on_delete=models.CASCADE)


class Mensagem(models.Model):
    descricao_mensagem = models.CharField(max_length=500)
    data_envio = models.DateField()
    data_edicao = models.DateField(null=True, blank=True)
    diario = models.ForeignKey(DiarioCompartilhado, on_delete=models.CASCADE, null=True)
    familiar = models.ForeignKey(Familiar, on_delete=models.CASCADE, null=True)
    terapeuta = models.ForeignKey(Terapeuta, on_delete=models.CASCADE, null=True)


class Neurodivergencia(models.Model):
    tipo = models.CharField(max_length=255)
    grau = models.IntegerField()
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)


class Relatorio(models.Model):
    arquivo = models.BinaryField()
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    terapeuta = models.ForeignKey(Terapeuta, on_delete=models.CASCADE, null=True)
    familiar = models.ForeignKey(Familiar, on_delete=models.CASCADE, null=True)


class PlanoTerapeuta(models.Model):
    data_criacao = models.DateField()
    link = models.CharField(max_length=255, null=True, blank=True)
    arquivo = models.BinaryField(null=True, blank=True)
    data_modificacao = models.DateField(null=True, blank=True)
    descricao_plano = models.CharField(max_length=255, null=True, blank=True)
    status = models.BooleanField()
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    terapeuta = models.ForeignKey(Terapeuta, on_delete=models.CASCADE)
    familiares = models.ManyToManyField(Familiar, through='FamiliarPlanoTerapeuta')


class Consulta(models.Model):
    data_sessao = models.DateField()
    descricao_sessao = models.CharField(max_length=255)
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    terapeuta = models.ForeignKey(Terapeuta, on_delete=models.CASCADE)
    plano = models.ForeignKey(PlanoTerapeuta, on_delete=models.CASCADE)


class Feedback(models.Model):
    descricao_feedback = models.CharField(max_length=255)
    resposta_terapeuta = models.CharField(max_length=255, null=True, blank=True)
    data_envio = models.DateField()
    plano = models.ForeignKey(PlanoTerapeuta, on_delete=models.CASCADE)
    familiar = models.ForeignKey(Familiar, on_delete=models.CASCADE)


class HistoricoPlanoTerapeuta(models.Model):
    data_fim = models.DateField()
    plano = models.ForeignKey(PlanoTerapeuta, on_delete=models.CASCADE)


class FamiliarPlanoTerapeuta(models.Model):
    plano = models.ForeignKey(PlanoTerapeuta, on_delete=models.CASCADE)
    familiar = models.ForeignKey(Familiar, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('plano', 'familiar')


class DiarioTerapeuta(models.Model):
    diario = models.ForeignKey(DiarioCompartilhado, on_delete=models.CASCADE)
    terapeuta = models.ForeignKey(Terapeuta, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('diario', 'terapeuta')


class DiarioFamiliar(models.Model):
    diario = models.ForeignKey(DiarioCompartilhado, on_delete=models.CASCADE)
    familiar = models.ForeignKey(Familiar, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('diario', 'familiar')


class PacienteFamiliar(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    familiar = models.ForeignKey(Familiar, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('paciente', 'familiar')


class PacienteTerapeuta(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    terapeuta = models.ForeignKey(Terapeuta, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('paciente', 'terapeuta')
