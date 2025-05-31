from pathlib import Path
import os
import json

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'your-secret-key'

DEBUG = os.getenv('DJANGO_DEBUG', 'True') == 'True'
ALLOWED_HOSTS = os.getenv('DJANGO_ALLOWED_HOSTS', '*').split(',')

PINATA_JWT = os.getenv('PINATA_JWT', 'YOUR_DEFAULT_PINATA_JWT')

# Load contract address and ABI from shared JSON file
CONTRACT_INFO_PATH = '/app/shared_config/deployed_contract_info.json'
CONTRACT_ADDRESS = None
ABI_PATH = None  # This will store the path to the JSON file itself, or a fallback path

try:
    with open(CONTRACT_INFO_PATH, 'r') as f:
        contract_info = json.load(f)
    CONTRACT_ADDRESS = contract_info.get('address')
    # The ABI is within this file, so ABI_PATH points to the file.
    # Code using ABI_PATH (e.g., views.py) will need to be aware of this
    # and extract the 'abi' key from the loaded JSON.
    if CONTRACT_ADDRESS and 'abi' in contract_info:
        ABI_PATH = CONTRACT_INFO_PATH
    
    if not CONTRACT_ADDRESS:
        print(f"Warning: Could not load CONTRACT_ADDRESS from {CONTRACT_INFO_PATH}")
    if ABI_PATH is None: # If ABI was not found in JSON or CONTRACT_ADDRESS was missing
        print(f"Warning: ABI information not found or incomplete in {CONTRACT_INFO_PATH}")

except FileNotFoundError:
    print(f"Warning: {CONTRACT_INFO_PATH} not found. Contract address and ABI may not be loaded.")
except json.JSONDecodeError:
    print(f"Warning: Could not decode JSON from {CONTRACT_INFO_PATH}.")
except Exception as e:
    print(f"Warning: An error occurred while loading contract info: {e}")

# Fallback values if loading from JSON fails
if not CONTRACT_ADDRESS:
    print("Warning: CONTRACT_ADDRESS is not set from JSON. Using fallback placeholder.")
    CONTRACT_ADDRESS = 'YOUR_FALLBACK_CONTRACT_ADDRESS' 
if ABI_PATH is None:
    fallback_abi_file = 'GreenHashABI.json' # Name of the old ABI file
    print(f"Warning: ABI_PATH is not set from JSON. Using fallback path: blockchain/contracts/{fallback_abi_file}")
    # Attempt to use the old ABI file located in blockchain/contracts/
    # This assumes the frontend/src/contracts/GreenHashABI.json was copied to blockchain/contracts/GreenHashABI.json
    # as per the backend Dockerfile.
    ABI_PATH = BASE_DIR / 'blockchain' / 'contracts' / fallback_abi_file

BLOCKCHAIN_PROVIDER = os.getenv('BLOCKCHAIN_PROVIDER', 'http://127.0.0.1:7545')  # or Infura



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
