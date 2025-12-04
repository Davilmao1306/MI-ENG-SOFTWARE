from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'changeme-in-production')
DEBUG = os.getenv('DEBUG', '1') == '1'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '*').split(',')

import os
from dotenv import load_dotenv
from urllib.parse import urlparse, parse_qsl

load_dotenv()


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'contas',
    'autenticacao',
    'cadastro',
    'corsheaders',
    "rest_framework",
    "rest_framework_simplejwt",
    "vinculos",
    "plano",
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",  # dev
        "rest_framework_simplejwt.authentication.JWTAuthentication",  # produção
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        # troque para IsAuthenticated em produção
        "rest_framework.permissions.AllowAny",
    ],
}

ROOT_URLCONF = 'sistema.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'sistema.wsgi.application'

tmpPostgres = urlparse(os.getenv("DATABASE_URL"))
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': tmpPostgres.path.replace('/', ''),
        'USER': tmpPostgres.username,
        'PASSWORD': tmpPostgres.password,
        'HOST': tmpPostgres.hostname,
        'PORT': 5432,
        'OPTIONS': dict(parse_qsl(tmpPostgres.query)),
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'America/Bahia'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'contas.Usuario'

LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'
LOGIN_URL = '/entrar/'

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'neurolinkadm@gmail.com'
EMAIL_HOST_PASSWORD = 'ehsm jkkw xrqc dacr' # Não é a senha normal, é a App Password


CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Ex: se seu front é React/Vue
    "http://localhost:5174",
    "http://localhost:5175",
    "http://127.0.0.1:3000",
]