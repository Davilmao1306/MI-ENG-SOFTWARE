from rest_framework import permissions

class IsTerapeutaOwnerOrAdmin(permissions.BasePermission):
    """
    Permite acesso total se for Admin ou o Terapeuta Criador do Plano.
    Permite leitura se for o Familiar vinculado.
    """
    def has_object_permission(self, request, view, obj):
        user = request.user

        # 1. Permissão de Admin
        if user.is_staff or user.is_superuser:
            return True

        # 2. Permissão do Terapeuta Criador (RWX)
        # Requer que o objeto 'user' tenha um objeto 'terapeuta' associado
        if hasattr(user, 'terapeuta') and user.terapeuta == obj.terapeuta:
            return True

        # 3. Permissão do Familiar (Read-Only)
        if request.method in permissions.SAFE_METHODS: # GET, HEAD, OPTIONS
            # Requer que o objeto 'user' tenha um objeto 'familiar' associado
            if hasattr(user, 'familiar') and user.familiar == obj.familiar:
                return True
        
        # Nega todas as outras requisições
        return False

class IsFamiliarLinkedToPlano(permissions.BasePermission):
    """
    Permissão específica para ações do Familiar (ex: assinar plano)
    """
    def has_object_permission(self, request, view, obj):
        user = request.user
        
        # Permite a ação APENAS se o usuário for o familiar vinculado ao plano
        if hasattr(user, 'familiar') and user.familiar == obj.familiar:
            return True
            
        return False