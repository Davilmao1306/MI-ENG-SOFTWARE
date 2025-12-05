#!/usr/bin/env bash
# Sair se der erro
set -o errexit

# Instalar as dependências
pip install -r requirements.txt

# Coletar arquivos estáticos (CSS/JS do admin)
python manage.py collectstatic --no-input

# Criar as tabelas no banco de dados
python manage.py migrate
