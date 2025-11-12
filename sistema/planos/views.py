# Em 'planos/views.py'
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import PlanoTerapeutico, AnexoPlano 

from .serializers import (
    PlanoTerapeuticoReadSerializer, 
    PlanoTerapeuticoWriteSerializer,
    AnexoPlanoSerializer
)

from .permissions import IsTerapeutaOwnerOrAdmin, IsFamiliarLinkedToPlano

class PlanoTerapeuticoViewSet(viewsets.ModelViewSet):
   
    queryset = PlanoTerapeutico.objects.all().prefetch_related(
        'neurodivergencias', 'metodos', 'anexos'
    )
    
    permission_classes = [permissions.IsAuthenticated, IsTerapeutaOwnerOrAdmin] 

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return PlanoTerapeuticoReadSerializer
        return PlanoTerapeuticoWriteSerializer

    @action(detail=True, methods=['post'], parser_classes=[MultiPartParser, FormParser])
    def anexar_arquivo(self, request, pk=None):
        plano = self.get_object()
        arquivo = request.data.get('arquivo')

        if not arquivo:
            return Response(
                {"error": "Nenhum arquivo enviado."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        if not arquivo.name.lower().endswith('.pdf'): 
             return Response(
                {"error": "Apenas arquivos PDF são permitidos."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        anexo = AnexoPlano.objects.create(
            plano=plano,
            arquivo=arquivo,
            nome_arquivo=arquivo.name,
            tipo_mime=arquivo.content_type
        )
        serializer = AnexoPlanoSerializer(anexo)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    def historico(self, request, pk=None):
        plano = self.get_object()
        historico = plano.history.all()
        
        data = [
            {
                "data_mudanca": h.history_date, 
                "usuario": str(h.history_user) if h.history_user else "N/A", 
                "tipo": h.get_history_type_display(),
                "diferencas": h.diff_against(historico.earliest()).changes 
            } 
            for h in historico
        ]
        return Response(data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated, IsTerapeutaOwnerOrAdmin])
    def assinar_terapeuta(self, request, pk=None):
        plano = self.get_object()
        
        if plano.data_assinatura_terapeuta:
             return Response({"status": "Plano já assinado pelo terapeuta."}, status=status.HTTP_200_OK)

        plano.assinar_plano_terapeuta()
        plano.save()
        return Response({"status": "Plano assinado pelo terapeuta."}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated, IsFamiliarLinkedToPlano])
    def assinar_familiar(self, request, pk=None):
        plano = self.get_object()
        
        if plano.data_assinatura_familia:
             return Response({"status": "Plano já assinado pelo familiar."}, status=status.HTTP_200_OK)

        plano.assinar_plano_familiar()
        plano.save()
        return Response({"status": "Plano assinado pelo familiar."}, status=status.HTTP_200_OK)