from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'your-secret-key'

DEBUG = True
ALLOWED_HOSTS = []

PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0ZTgxMDY1OS1hMDJjLTQ0N2YtODY1OC1iMTliMTA5ZWE5NzciLCJlbWFpbCI6ImNzMjRtdDAwNkBpaXRkaC5hYy5pbiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiNmEwOWU0MmE4MzlkZjg3OWNhNSIsInNjb3BlZEtleVNlY3JldCI6IjQyMjdlZjUwM2I1ODlhOWQyYWQ1NDA5MmFjODFhYjc0NjJhNzI5MGQ4YzNkODYxOTViM2EyNTE5NDA5ZmI2NDkiLCJleHAiOjE3NzYyMzkxMjN9.VOTsMBECFrMunonM8Q7Qfl0X7FJmtbpeqt2kaJuF_RY"
CONTRACT_ADDRESS = "0x0805c6248Cd28d29b327A401cA3b8e4Da53f0C0A"
ABI_PATH = (r"E:\blockchain_project\greenhash_blockchain\frontend\src\contracts\GreenHashABI.json")
BLOCKCHAIN_PROVIDER = "http://127.0.0.1:7545"  # or Infura



# Application Definition
INSTALLED_APPS = [
    'blockchain', 
    'rest_framework',
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # <-- MUST be at the top
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'greenhash.urls'

CORS_ALLOW_ALL_ORIGINS = True  # Allow frontend requests

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

WSGI_APPLICATION = 'greenhash.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = []

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
