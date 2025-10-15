# First Valley Bank - Backend Setup Guide

## Quick Start Guide for Django Backend Development

This guide will help you set up and run the Django backend for the First Valley Bank application.

---

## Prerequisites

- Python 3.10 or higher
- PostgreSQL 14+ (or MySQL 8+)
- Redis 6+ (for caching and Celery)
- AWS Account (for S3 storage)
- OpenAI API Key (for chatbot)
- Mapbox API Key (for geocoding)

---

## Project Structure

```
first-valley-bank-backend/
├── config/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── apps/
│   ├── authentication/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── newsletters/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── admin.py
│   │   └── urls.py
│   ├── contact/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── tasks.py
│   │   └── urls.py
│   ├── deposits/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── loans/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── properties/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── locations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── homepage/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── advisory/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── chatbot/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── services.py
│   │   └── urls.py
│   └── analytics/
│       ├── views.py
│       └── urls.py
├── services/
│   ├── email.py
│   ├── geocoding.py
│   ├── image_processing.py
│   └── chatbot.py
├── templates/
│   └── emails/
│       ├── contact_admin_notification.html
│       └── contact_confirmation.html
├── static/
├── media/
├── logs/
├── requirements.txt
├── manage.py
├── .env.example
├── celery.py
└── README.md
```

---

## Installation Steps

### 1. Clone the Repository (or create new project)

```bash
# If starting fresh
mkdir first-valley-bank-backend
cd first-valley-bank-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate
```

### 2. Install Dependencies

```bash
# Install Django and create project
pip install django djangorestframework

# Install all required packages
pip install -r requirements.txt
```

**requirements.txt:**

```txt
Django==4.2.7
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.0
django-cors-headers==4.3.0
django-filter==23.3
psycopg2-binary==2.9.9
pillow==10.1.0
boto3==1.29.7
django-storages==1.14.2
celery==5.3.4
redis==5.0.1
django-redis==5.4.0
python-decouple==3.8
requests==2.31.0
openai==1.3.5
gunicorn==21.2.0
drf-yasg==1.21.7
django-ratelimit==4.1.0
```

### 3. Database Setup

#### PostgreSQL Setup

```bash
# Install PostgreSQL (macOS with Homebrew)
brew install postgresql@14

# Start PostgreSQL
brew services start postgresql@14

# Create database
createdb first_valley_bank

# Create user
psql postgres
CREATE USER fvb_user WITH PASSWORD 'secure_password_here';
ALTER ROLE fvb_user SET client_encoding TO 'utf8';
ALTER ROLE fvb_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE fvb_user SET timezone TO 'Asia/Manila';
GRANT ALL PRIVILEGES ON DATABASE first_valley_bank TO fvb_user;
\q
```

### 4. Redis Setup

```bash
# Install Redis (macOS with Homebrew)
brew install redis

# Start Redis
brew services start redis

# Test Redis
redis-cli ping
# Should return: PONG
```

### 5. Environment Configuration

Create a `.env` file in the project root:

```env
# Django Settings
SECRET_KEY=django-insecure-your-secret-key-here-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Database
DB_NAME=first_valley_bank
DB_USER=fvb_user
DB_PASSWORD=secure_password_here
DB_HOST=localhost
DB_PORT=5432

# AWS S3 (Development - can use local storage initially)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_STORAGE_BUCKET_NAME=1vb-media-dev
AWS_S3_REGION_NAME=ap-southeast-1

# Email (Development - use console backend)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=dev@1stvalleybank.com
EMAIL_HOST_PASSWORD=your-email-app-password
ADMIN_EMAIL=admin@1stvalleybank.com

# External APIs
MAPBOX_ACCESS_TOKEN=pk.your-mapbox-token-here
OPENAI_API_KEY=sk-your-openai-key-here

# Redis
REDIS_URL=redis://localhost:6379/0

# Admin
ADMIN_URL=http://localhost:8000/admin
```

### 6. Django Project Setup

```bash
# Create Django project
django-admin startproject config .

# Create apps
python manage.py startapp authentication apps/authentication
python manage.py startapp newsletters apps/newsletters
python manage.py startapp contact apps/contact
python manage.py startapp deposits apps/deposits
python manage.py startapp loans apps/loans
python manage.py startapp properties apps/properties
python manage.py startapp locations apps/locations
python manage.py startapp homepage apps/homepage
python manage.py startapp advisory apps/advisory
python manage.py startapp chatbot apps/chatbot
python manage.py startapp analytics apps/analytics
```

### 7. Update settings.py

Add to `config/settings.py`:

```python
import os
from pathlib import Path
from decouple import config, Csv

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv())

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party apps
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'django_filters',
    'storages',
    'drf_yasg',

    # Local apps
    'apps.authentication',
    'apps.newsletters',
    'apps.contact',
    'apps.deposits',
    'apps.loans',
    'apps.properties',
    'apps.locations',
    'apps.homepage',
    'apps.advisory',
    'apps.chatbot',
    'apps.analytics',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # CORS - must be before CommonMiddleware
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Custom User Model
AUTH_USER_MODEL = 'authentication.User'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='5432'),
        'CONN_MAX_AGE': 600,
    }
}

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ),
}

# JWT Settings
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': True,
}

# CORS Settings
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', cast=Csv())
CORS_ALLOW_CREDENTIALS = True

# Static and Media Files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# AWS S3 Configuration (optional for development)
if not DEBUG:
    AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME')
    AWS_S3_REGION_NAME = config('AWS_S3_REGION_NAME', default='ap-southeast-1')
    AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
    AWS_DEFAULT_ACL = 'public-read'

    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

# Email Configuration
EMAIL_BACKEND = config('EMAIL_BACKEND', default='django.core.mail.backends.console.EmailBackend')
EMAIL_HOST = config('EMAIL_HOST', default='smtp.gmail.com')
EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL', default='1st Valley Bank <noreply@1stvalleybank.com>')
ADMIN_EMAIL = config('ADMIN_EMAIL', default='admin@1stvalleybank.com')

# Celery Configuration
CELERY_BROKER_URL = config('REDIS_URL', default='redis://localhost:6379/0')
CELERY_RESULT_BACKEND = config('REDIS_URL', default='redis://localhost:6379/0')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'

# Cache Configuration
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': config('REDIS_URL', default='redis://127.0.0.1:6379/1'),
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# External API Keys
MAPBOX_ACCESS_TOKEN = config('MAPBOX_ACCESS_TOKEN', default='')
OPENAI_API_KEY = config('OPENAI_API_KEY', default='')

# Timezone
TIME_ZONE = 'Asia/Manila'
USE_TZ = True
```

### 8. Create Models

Copy the models from the `BACKEND_API_DOCUMENTATION.md` into their respective `models.py` files.

### 9. Run Migrations

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

### 10. Create Superuser

```bash
python manage.py createsuperuser
# Follow prompts to create admin user
```

### 11. Run Development Server

```bash
python manage.py runserver
```

Visit `http://localhost:8000/admin` to access the admin panel.

---

## Testing the API

### Using Django Admin

1. Go to `http://localhost:8000/admin`
2. Login with superuser credentials
3. Add test data for:
   - Newsletters
   - Deposit Products
   - Loan Products
   - Branches
   - Properties for Sale

### Using Swagger/Redoc

1. Visit `http://localhost:8000/swagger/` for Swagger UI
2. Visit `http://localhost:8000/redoc/` for Redoc documentation

### Using curl or Postman

**Example: Get all newsletters**

```bash
curl http://localhost:8000/api/newsletters/
```

**Example: Login**

```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "your_password"}'
```

---

## Running Celery (for async tasks)

In a separate terminal:

```bash
# Activate virtual environment
source venv/bin/activate

# Run Celery worker
celery -A config worker -l info

# Run Celery beat (for scheduled tasks)
celery -A config beat -l info
```

---

## Database Schema Overview

### Core Tables

1. **users** - Admin users with role-based access
2. **newsletters** - Newsletter articles with PDF attachments
3. **newsletter_subscribers** - Email subscribers
4. **contact_submissions** - Contact form submissions with geocoding
5. **deposit_products** - Savings/Checking/Time Deposit products
6. **loan_products** - Various loan products
7. **properties_for_sale** - Vehicles and real estate listings
8. **branches** - Bank branch locations
9. **atm_locations** - ATM locations
10. **hero_slides** - Homepage carousel slides
11. **testimonials** - Customer testimonials
12. **faqs** - Frequently asked questions
13. **bank_statistics** - Statistics for homepage
14. **advisory_images** - Advisory gallery images
15. **chat_sessions** - AI chatbot sessions
16. **chat_messages** - Individual chat messages
17. **audit_logs** - Admin action audit trail

### Relationships

```
User (1) ───< (many) Newsletter
User (1) ───< (many) AuditLog

Branch (1) ───< (many) ATMLocation

ChatSession (1) ───< (many) ChatMessage
```

---

## API Testing Examples

### 1. Newsletter Management

**List newsletters:**

```bash
curl http://localhost:8000/api/newsletters/
```

**Get newsletter detail:**

```bash
curl http://localhost:8000/api/newsletters/1/
```

**Create newsletter (requires auth):**

```bash
# First, get JWT token
TOKEN=$(curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password"}' \
  | jq -r '.access')

# Create newsletter
curl -X POST http://localhost:8000/api/newsletters/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Newsletter",
    "subtitle": "Test Subtitle",
    "description": "This is a test newsletter",
    "status": "draft",
    "read_time": "5 min"
  }'
```

### 2. Contact Form Submission

```bash
curl -X POST http://localhost:8000/api/contact/submit/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Dela Cruz",
    "email": "juan@example.com",
    "subject": "loans_agriculture",
    "contact_number": "+639171234567",
    "barangay": "Poblacion",
    "municipality": "Cagayan de Oro",
    "province": "Misamis Oriental",
    "message": "I would like to inquire about agricultural loans."
  }'
```

### 3. Chatbot Interaction

**Start session:**

```bash
curl -X POST http://localhost:8000/api/chatbot/session/start/ \
  -H "Content-Type: application/json" \
  -d '{"user_ip": "192.168.1.1"}'
```

**Send message:**

```bash
curl -X POST http://localhost:8000/api/chatbot/message/ \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "ses_1234567890abcdef",
    "message": "What loan products do you offer?"
  }'
```

---

## Common Development Tasks

### Adding a New Model

1. Define model in `apps/<app_name>/models.py`
2. Create serializer in `apps/<app_name>/serializers.py`
3. Create views in `apps/<app_name>/views.py`
4. Add URLs in `apps/<app_name>/urls.py`
5. Register in admin: `apps/<app_name>/admin.py`
6. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

### Creating a Management Command

Create `apps/<app_name>/management/commands/command_name.py`:

```python
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Description of what this command does'

    def handle(self, *args, **kwargs):
        # Your logic here
        self.stdout.write(self.style.SUCCESS('Successfully completed!'))
```

Run with:

```bash
python manage.py command_name
```

### Seeding Sample Data

Create a management command for seeding:

```bash
python manage.py seed_data
```

---

## Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
brew services list | grep postgresql

# Test connection
psql -h localhost -U fvb_user -d first_valley_bank
```

### Redis Connection Issues

```bash
# Check Redis is running
brew services list | grep redis

# Test connection
redis-cli ping
```

### Migration Conflicts

```bash
# Reset migrations (CAUTION: Only in development)
python manage.py migrate <app_name> zero
rm apps/<app_name>/migrations/000*.py
python manage.py makemigrations
python manage.py migrate
```

### Static Files Not Loading

```bash
# Collect static files
python manage.py collectstatic --noinput
```

---

## Production Deployment

### Using Gunicorn

```bash
# Install
pip install gunicorn

# Run
gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 4
```

### Using Docker

Create `Dockerfile`:

```dockerfile
FROM python:3.10-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  db:
    image: postgres:14
    environment:
      POSTGRES_DB: first_valley_bank
      POSTGRES_USER: fvb_user
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7

  web:
    build: .
    command: gunicorn config.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - .:/app
    ports:
      - '8000:8000'
    depends_on:
      - db
      - redis
    env_file:
      - .env

  celery:
    build: .
    command: celery -A config worker -l info
    depends_on:
      - db
      - redis
    env_file:
      - .env

volumes:
  postgres_data:
```

Run with:

```bash
docker-compose up -d
```

---

## Performance Optimization Tips

1. **Database Indexing**: Add indexes to frequently queried fields
2. **Query Optimization**: Use `select_related()` and `prefetch_related()`
3. **Caching**: Cache expensive queries using Redis
4. **Pagination**: Always paginate list endpoints
5. **Image Optimization**: Compress images on upload
6. **Database Connection Pooling**: Use connection pooling for production
7. **CDN**: Use CDN for static files and media

---

## Security Checklist

- [ ] Set `DEBUG=False` in production
- [ ] Use strong `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS` properly
- [ ] Enable HTTPS/SSL
- [ ] Use environment variables for sensitive data
- [ ] Implement rate limiting
- [ ] Sanitize user input
- [ ] Enable CSRF protection
- [ ] Set proper CORS policies
- [ ] Keep dependencies updated
- [ ] Regular security audits
- [ ] Implement proper logging
- [ ] Set up monitoring (Sentry, etc.)

---

## Next Steps

1. **Review the main API documentation**: `BACKEND_API_DOCUMENTATION.md`
2. **Set up the database and models**
3. **Create serializers and views**
4. **Test endpoints with Postman or Swagger**
5. **Implement authentication**
6. **Set up Celery for async tasks**
7. **Configure file uploads**
8. **Integrate external APIs** (Mapbox, OpenAI)
9. **Write tests**
10. **Deploy to production**

---

## Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Celery Documentation](https://docs.celeryproject.org/)
- [Redis Documentation](https://redis.io/docs/)

---

## Support

For questions or issues:

- Check the main API documentation
- Review Django logs: `logs/django.log`
- Use Django debug toolbar for development
- Contact: dev@1stvalleybank.com

---

**Good luck with your Django backend development!** 🚀
