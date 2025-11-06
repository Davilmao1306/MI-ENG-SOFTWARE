# Backend de Login e Cadastro (Django)

## Passos
1. Criar e ativar um virtualenv.
2. Instalar dependências: `pip install -r requirements.txt`
3. Aplicar migrações: `python manage.py migrate`
4. Criar superusuário: `python manage.py createsuperuser`
5. Rodar o servidor: `python manage.py runserver`
6. Acesso:
   - `/entrar/` (login)
   - `/registrar/` (cadastro)
   - `/cadastro/pacientes/` (endpoint de teste em JSON)
   - `/admin/` (admin)

## Observações
- Usuário customizado em `contas.Usuario` (AUTH_USER_MODEL).
- Idioma e timezone configurados para pt-BR / America/Bahia.
- Banco padrão: SQLite. Altere `DATABASES` em `sistema/settings.py` para PostgreSQL quando necessário.
