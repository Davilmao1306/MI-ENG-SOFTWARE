from rest_framework import serializers

class VincularPacienteFamiliarIn(serializers.Serializer):
    id_paciente = serializers.IntegerField(min_value=1)
    id_familiar = serializers.IntegerField(min_value=1)

class VincularPacienteTerapeutaIn(serializers.Serializer):
    id_paciente = serializers.IntegerField(min_value=1)
    id_terapeuta = serializers.IntegerField(min_value=1)

# Espaço reservado para implementação posterir
class DesvincularPacienteFamiliarIn(VincularPacienteFamiliarIn):
    pass

class DesvincularPacienteTerapeutaIn(VincularPacienteTerapeutaIn):
    pass
 