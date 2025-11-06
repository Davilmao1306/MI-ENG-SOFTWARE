# Backend de Login e Cadastro (Django)


## Docker (PostgreSQL)
1. Copie o arquivo de ambiente:
   ```bash
   cp .env.example .env
   ```
2. Suba os serviços:
   ```bash
   docker compose up --build
   ```
3. Crie um superusuário:
   ```bash
   docker compose exec web python manage.py createsuperuser
   ```
4. Acesse o sistema em: http://127.0.0.1:8000
