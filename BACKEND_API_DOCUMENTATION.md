# First Valley Bank - Backend API Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Core Features](#core-features)
4. [Data Models & Database Schema](#data-models--database-schema)
5. [API Endpoints](#api-endpoints)
6. [Authentication & Authorization](#authentication--authorization)
7. [File Upload & Management](#file-upload--management)
8. [Integration Requirements](#integration-requirements)
9. [Deployment Considerations](#deployment-considerations)

---

## Project Overview

First Valley Bank is a comprehensive banking web application built with React frontend and requires a Django REST Framework backend. The application serves as a digital presence for the bank, providing information about products, services, and customer engagement features.

**Live Frontend URL**: Currently deployed on Vercel  
**Target Users**: Bank customers, potential clients, and administrators  
**Primary Goal**: Provide a responsive, content-rich banking platform with admin management capabilities

---

## Technology Stack

### Required Backend Technologies

- **Framework**: Django 4.2+ with Django REST Framework
- **Database**: PostgreSQL 14+ (recommended) or MySQL 8+
- **Authentication**: JWT (djangorestframework-simplejwt)
- **File Storage**: AWS S3 or similar cloud storage
- **Cache**: Redis (for chat sessions and performance)
- **AI/ML**: OpenAI API or similar for chatbot functionality
- **Email**: Django email backend with SMTP
- **Maps**: Integration with Mapbox API for geocoding

### Python Packages Required

```txt
Django>=4.2.0
djangorestframework>=3.14.0
djangorestframework-simplejwt>=5.2.0
django-cors-headers>=4.0.0
psycopg2-binary>=2.9.0  # For PostgreSQL
pillow>=10.0.0
boto3>=1.26.0  # For AWS S3
django-storages>=1.13.0
celery>=5.3.0  # For async tasks
redis>=4.5.0
openai>=1.0.0  # For AI chatbot
python-decouple>=3.8
django-filter>=23.0
```

---

## Core Features

### 1. AI Chatbot

- **Purpose**: Provide real-time customer support and answer banking queries
- **Requirements**:
  - Integration with OpenAI GPT or similar AI service
  - Context-aware responses about bank products/services
  - Session management for conversation history
  - Fallback to human support for complex queries
  - Rate limiting to prevent abuse

### 2. Newsletter Management

- **Purpose**: Manage and display bank newsletters and articles
- **Requirements**:
  - CRUD operations for newsletter articles
  - PDF file upload and storage
  - Pagination support
  - Search and filtering capabilities
  - Publishing/draft status management
  - View count tracking

### 3. Responsive Landing Page Content

- **Purpose**: Dynamic content management for homepage and sections
- **Requirements**:
  - Hero carousel slides management
  - Featured services configuration
  - Testimonials management
  - FAQ management
  - Statistics/metrics management

### 4. Admin Panel

- **Purpose**: Backend management interface for content and data
- **Requirements**:
  - Django Admin customization
  - Role-based access control (Admin, Editor, Viewer)
  - Dashboard with analytics
  - Bulk operations support
  - Audit logs for tracking changes

### 5. Content Management System

- **Purpose**: Manage all dynamic content across the site
- **Requirements**:
  - Products management (Deposits, Loans)
  - Properties for sale (Vehicles, Real Estate)
  - Branch locations management
  - ATM locations management
  - Advisory gallery management
  - Image optimization and compression

### 6. Contact Information Submission with Maps

- **Purpose**: Handle contact form submissions with location data
- **Requirements**:
  - Form data validation and storage
  - Email notification to admin
  - Geocoding integration with Mapbox API
  - Spam prevention (reCAPTCHA or similar)
  - Auto-responder email to submitter

---

## Data Models & Database Schema

### 1. User & Authentication

```python
# models/user.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """Extended user model for admin users"""
    ROLE_CHOICES = [
        ('admin', 'Administrator'),
        ('editor', 'Content Editor'),
        ('viewer', 'Viewer'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='viewer')
    phone_number = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users'
```

### 2. Newsletter Management

```python
# models/newsletter.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Newsletter(models.Model):
    """Newsletter/Article model"""
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    image = models.ImageField(upload_to='newsletters/images/')
    pdf_file = models.FileField(upload_to='newsletters/pdfs/', null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    views = models.IntegerField(default=0)
    read_time = models.CharField(max_length=20, default='5 min')  # e.g., "5 min"
    published_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='newsletters')

    class Meta:
        db_table = 'newsletters'
        ordering = ['-published_date']

    def __str__(self):
        return self.title


class NewsletterSubscriber(models.Model):
    """Email subscribers for newsletter"""
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    unsubscribed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'newsletter_subscribers'

    def __str__(self):
        return self.email
```

### 3. Contact Submissions

```python
# models/contact.py
from django.db import models

class ContactSubmission(models.Model):
    """Contact form submissions"""
    SUBJECT_CHOICES = [
        ('deposits_regular', 'Deposits - Regular'),
        ('deposits_special', 'Deposits - Special'),
        ('loans_agriculture', 'Loans - Agriculture'),
        ('loans_sme', 'Loans - Small and Medium Enterprises (SME)'),
        ('loans_microfinance', 'Loans - Microfinance'),
        ('loans_sucre', 'Loans - Supervised Credit (SUCRE)'),
        ('loans_gold_gems', 'Loans - Gold & Gems'),
        ('loans_sbl', 'Loans - Small Business Loan (SBL)'),
        ('loans_salary', 'Loans - Salary'),
    ]

    STATUS_CHOICES = [
        ('new', 'New'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=100, choices=SUBJECT_CHOICES)
    contact_number = models.CharField(max_length=20)

    # Address fields
    barangay = models.CharField(max_length=255)
    municipality = models.CharField(max_length=255)
    province = models.CharField(max_length=255)

    # Geocoding data
    latitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
    longitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
    full_address = models.TextField(blank=True)  # Geocoded full address

    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    admin_notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'contact_submissions'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.subject}"
```

### 4. Deposit Products

```python
# models/deposits.py
from django.db import models

class DepositProduct(models.Model):
    """Deposit products (Savings, Checking, Time Deposit)"""
    PRODUCT_TYPE_CHOICES = [
        ('savings', 'Savings Account'),
        ('checking', 'Checking Account'),
        ('time_deposit', 'Time Deposit'),
    ]

    id = models.AutoField(primary_key=True)
    product_type = models.CharField(max_length=50, choices=PRODUCT_TYPE_CHOICES)
    name = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    image = models.ImageField(upload_to='deposits/images/')

    # Product details
    required_initial_deposit = models.DecimalField(max_digits=12, decimal_places=2)
    required_monthly_adb = models.CharField(max_length=100)  # Can be "NONE" or amount
    required_monthly_adb_to_earn_interest = models.DecimalField(max_digits=12, decimal_places=2)
    interest_rate_below = models.DecimalField(max_digits=5, decimal_places=2)  # Percentage
    interest_rate_above = models.DecimalField(max_digits=5, decimal_places=2)  # Percentage

    # Additional metadata
    features = models.JSONField(default=list)  # List of features
    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'deposit_products'
        ordering = ['display_order', 'name']

    def __str__(self):
        return f"{self.get_product_type_display()} - {self.name}"
```

### 5. Loan Products

```python
# models/loans.py
from django.db import models

class LoanProduct(models.Model):
    """Loan products"""
    LOAN_TYPE_CHOICES = [
        ('agriculture', 'Agricultural Loans'),
        ('sme', 'Small and Medium Enterprises'),
        ('microfinance', 'Microfinance'),
        ('sucre', 'Supervised Credit'),
        ('gold_gems', 'Gold and Gems'),
        ('sbl', 'Small Business Loan'),
        ('salary', 'Salary Loan'),
    ]

    id = models.AutoField(primary_key=True)
    loan_type = models.CharField(max_length=50, choices=LOAN_TYPE_CHOICES)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    full_description = models.TextField(blank=True)  # Detailed description
    image = models.ImageField(upload_to='loans/images/')

    # Loan details
    min_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    max_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    interest_rate = models.CharField(max_length=100)  # Can vary, stored as text
    term_options = models.JSONField(default=list)  # List of term options
    requirements = models.JSONField(default=list)  # List of requirements
    features = models.JSONField(default=list)  # List of features/benefits

    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'loan_products'
        ordering = ['display_order', 'title']

    def __str__(self):
        return f"{self.get_loan_type_display()} - {self.title}"
```

### 6. Properties for Sale

```python
# models/properties.py
from django.db import models

class PropertyForSale(models.Model):
    """Real estate and vehicles for sale"""
    PROPERTY_TYPE_CHOICES = [
        ('vehicle', 'Vehicle'),
        ('real_estate', 'Real Estate'),
    ]

    STATUS_CHOICES = [
        ('available', 'Available'),
        ('reserved', 'Reserved'),
        ('sold', 'Sold'),
    ]

    id = models.AutoField(primary_key=True)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPE_CHOICES)

    # Common fields
    title = models.CharField(max_length=255, blank=True)
    location = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField(blank=True)

    # Images
    main_image = models.ImageField(upload_to='properties/images/')
    additional_images = models.JSONField(default=list)  # List of image URLs

    # Vehicle-specific fields
    year = models.IntegerField(null=True, blank=True)
    plate_number = models.CharField(max_length=50, blank=True)
    make = models.CharField(max_length=100, blank=True)
    model = models.CharField(max_length=100, blank=True)

    # Real estate-specific fields
    property_code = models.CharField(max_length=50, blank=True)
    area = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # in sqm
    tct_number = models.CharField(max_length=255, blank=True)  # Title certificate number
    date_acquired = models.DateField(null=True, blank=True)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    is_featured = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'properties_for_sale'
        ordering = ['-is_featured', '-created_at']

    def __str__(self):
        return f"{self.get_property_type_display()} - {self.location}"
```

### 7. Branch & ATM Locations

```python
# models/locations.py
from django.db import models

class Branch(models.Model):
    """Bank branch locations"""
    REGION_CHOICES = [
        ('mindanao', 'Mindanao'),
        ('visayas', 'Visayas'),
        ('luzon', 'Luzon'),
        ('ncr', 'National Capital Region'),
    ]

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    region = models.CharField(max_length=50, choices=REGION_CHOICES)
    address = models.TextField()

    # Contact information
    phone_number = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)

    # Geolocation
    latitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
    longitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)

    # Services
    has_atm = models.BooleanField(default=False)
    is_main_office = models.BooleanField(default=False)

    # Operating hours
    operating_hours = models.JSONField(default=dict)  # {"monday": "9:00-17:00", ...}

    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'branches'
        ordering = ['display_order', 'name']

    def __str__(self):
        return f"{self.name} - {self.get_region_display()}"


class ATMLocation(models.Model):
    """ATM locations (may or may not be at a branch)"""
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    address = models.TextField()

    # Geolocation
    latitude = models.DecimalField(max_digits=10, decimal_places=7)
    longitude = models.DecimalField(max_digits=10, decimal_places=7)

    # Relationship to branch (optional)
    branch = models.ForeignKey(Branch, on_delete=models.SET_NULL, null=True, blank=True, related_name='atms')

    # Availability
    is_24_hours = models.BooleanField(default=True)
    operating_hours = models.CharField(max_length=100, blank=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'atm_locations'
        ordering = ['name']

    def __str__(self):
        return self.name
```

### 8. Homepage Content Management

```python
# models/homepage.py
from django.db import models

class HeroSlide(models.Model):
    """Hero carousel slides for homepage"""
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    image = models.ImageField(upload_to='hero_slides/')
    image_alt = models.CharField(max_length=255)

    # CTA button
    button_text = models.CharField(max_length=100, blank=True)
    button_route = models.CharField(max_length=255, blank=True)

    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'hero_slides'
        ordering = ['display_order']

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    """Customer testimonials"""
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)  # e.g., "Small Business Owner"
    content = models.TextField()
    rating = models.IntegerField(default=5)  # 1-5 stars
    image = models.ImageField(upload_to='testimonials/', null=True, blank=True)

    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'testimonials'
        ordering = ['display_order']

    def __str__(self):
        return f"{self.name} - {self.role}"


class FAQ(models.Model):
    """Frequently Asked Questions"""
    CATEGORY_CHOICES = [
        ('accounts', 'Accounts'),
        ('online_banking', 'Online Banking'),
        ('loans', 'Loans'),
        ('deposits', 'Deposits'),
        ('general', 'General'),
    ]

    id = models.AutoField(primary_key=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='general')
    question = models.TextField()
    answer = models.TextField()

    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'faqs'
        ordering = ['category', 'display_order']

    def __str__(self):
        return self.question[:100]


class BankStatistic(models.Model):
    """Bank statistics for homepage (e.g., "82+ Branches")"""
    id = models.AutoField(primary_key=True)
    label = models.CharField(max_length=255)  # e.g., "Branches Nationwide"
    value = models.CharField(max_length=50)  # e.g., "82+"

    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'bank_statistics'
        ordering = ['display_order']

    def __str__(self):
        return f"{self.value} - {self.label}"
```

### 9. Advisory Gallery

```python
# models/advisory.py
from django.db import models

class AdvisoryImage(models.Model):
    """Images for 1VB Advisory gallery"""
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to='advisory/')
    alt_text = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'advisory_images'
        ordering = ['display_order']

    def __str__(self):
        return self.title or f"Advisory Image {self.id}"
```

### 10. AI Chatbot

```python
# models/chatbot.py
from django.db import models

class ChatSession(models.Model):
    """Chat sessions for tracking conversations"""
    session_id = models.CharField(max_length=255, unique=True, primary_key=True)
    user_ip = models.GenericIPAddressField(null=True, blank=True)
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'chat_sessions'

    def __str__(self):
        return f"Session {self.session_id}"


class ChatMessage(models.Model):
    """Individual chat messages"""
    SENDER_CHOICES = [
        ('user', 'User'),
        ('ai', 'AI'),
    ]

    id = models.AutoField(primary_key=True)
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    sender = models.CharField(max_length=10, choices=SENDER_CHOICES)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    # AI metadata
    ai_model = models.CharField(max_length=100, blank=True)  # e.g., "gpt-4"
    tokens_used = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = 'chat_messages'
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.sender}: {self.message[:50]}"
```

### 11. Audit Log

```python
# models/audit.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class AuditLog(models.Model):
    """Audit log for tracking admin actions"""
    ACTION_CHOICES = [
        ('create', 'Create'),
        ('update', 'Update'),
        ('delete', 'Delete'),
        ('login', 'Login'),
        ('logout', 'Logout'),
    ]

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    model_name = models.CharField(max_length=100)  # e.g., "Newsletter"
    object_id = models.CharField(max_length=100, blank=True)
    changes = models.JSONField(default=dict)  # Store what changed
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'audit_logs'
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.user} - {self.action} - {self.model_name}"
```

---

## API Endpoints

### Authentication Endpoints

#### 1. Login

```
POST /api/auth/login/
Content-Type: application/json

Request:
{
    "username": "admin@1stvalleybank.com",
    "password": "securepassword"
}

Response (200):
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "user": {
        "id": 1,
        "username": "admin",
        "email": "admin@1stvalleybank.com",
        "role": "admin",
        "first_name": "John",
        "last_name": "Doe"
    }
}
```

#### 2. Refresh Token

```
POST /api/auth/refresh/
Content-Type: application/json

Request:
{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}

Response (200):
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### 3. Logout

```
POST /api/auth/logout/
Authorization: Bearer {access_token}

Response (200):
{
    "message": "Successfully logged out"
}
```

### Newsletter Endpoints

#### 1. List Newsletters (Public)

```
GET /api/newsletters/
Query Parameters:
    - page: integer (default: 1)
    - page_size: integer (default: 9)
    - status: string (published, draft, archived)
    - search: string (search in title/description)

Response (200):
{
    "count": 27,
    "next": "http://api.example.com/api/newsletters/?page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "title": "Grow Your Business with 1VB SME Loans",
            "subtitle": "Unlock Growth Potential with Flexible Financing",
            "description": "At 1st Valley Bank, we understand...",
            "image": "https://cdn.example.com/newsletters/images/1.jpg",
            "pdf_file": "https://cdn.example.com/newsletters/pdfs/document.pdf",
            "views": 3200,
            "read_time": "5 min",
            "published_date": "2025-06-19T10:00:00Z",
            "created_at": "2025-06-01T08:00:00Z"
        },
        // ... more newsletters
    ]
}
```

#### 2. Get Newsletter Detail

```
GET /api/newsletters/{id}/

Response (200):
{
    "id": 1,
    "title": "Grow Your Business with 1VB SME Loans",
    "subtitle": "Unlock Growth Potential with Flexible Financing",
    "description": "At 1st Valley Bank, we understand...",
    "image": "https://cdn.example.com/newsletters/images/1.jpg",
    "pdf_file": "https://cdn.example.com/newsletters/pdfs/document.pdf",
    "status": "published",
    "views": 3200,
    "read_time": "5 min",
    "published_date": "2025-06-19T10:00:00Z",
    "created_at": "2025-06-01T08:00:00Z",
    "updated_at": "2025-06-10T14:30:00Z"
}

Side Effect: Increments view count
```

#### 3. Create Newsletter (Admin Only)

```
POST /api/newsletters/
Authorization: Bearer {access_token}
Content-Type: multipart/form-data

Request:
{
    "title": "New Newsletter Title",
    "subtitle": "Subtitle here",
    "description": "Full description...",
    "image": <file>,
    "pdf_file": <file>,
    "status": "draft",
    "read_time": "5 min"
}

Response (201):
{
    "id": 28,
    "title": "New Newsletter Title",
    ...
}
```

#### 4. Update Newsletter (Admin Only)

```
PUT /api/newsletters/{id}/
PATCH /api/newsletters/{id}/  # For partial updates
Authorization: Bearer {access_token}

Response (200): Updated newsletter object
```

#### 5. Delete Newsletter (Admin Only)

```
DELETE /api/newsletters/{id}/
Authorization: Bearer {access_token}

Response (204): No Content
```

#### 6. Subscribe to Newsletter

```
POST /api/newsletters/subscribe/
Content-Type: application/json

Request:
{
    "email": "user@example.com"
}

Response (201):
{
    "message": "Successfully subscribed to newsletter",
    "email": "user@example.com"
}

Response (400) - Already subscribed:
{
    "error": "This email is already subscribed"
}
```

### Contact Endpoints

#### 1. Submit Contact Form

```
POST /api/contact/submit/
Content-Type: application/json

Request:
{
    "name": "Juan Dela Cruz",
    "email": "juan@example.com",
    "subject": "loans_agriculture",
    "contact_number": "+639171234567",
    "barangay": "Poblacion",
    "municipality": "Cagayan de Oro",
    "province": "Misamis Oriental",
    "message": "I would like to inquire about agricultural loans..."
}

Response (201):
{
    "id": 123,
    "message": "Thank you for contacting us. We will get back to you soon.",
    "reference_number": "CNT-2025-123"
}

Side Effect:
- Sends confirmation email to submitter
- Sends notification email to admin
- Geocodes the address using Mapbox API
```

#### 2. List Contact Submissions (Admin Only)

```
GET /api/contact/submissions/
Authorization: Bearer {access_token}
Query Parameters:
    - page: integer
    - status: string (new, in_progress, resolved, closed)
    - subject: string
    - search: string

Response (200):
{
    "count": 150,
    "results": [
        {
            "id": 123,
            "name": "Juan Dela Cruz",
            "email": "juan@example.com",
            "subject": "loans_agriculture",
            "contact_number": "+639171234567",
            "barangay": "Poblacion",
            "municipality": "Cagayan de Oro",
            "province": "Misamis Oriental",
            "latitude": "8.4542",
            "longitude": "124.6319",
            "full_address": "Poblacion, Cagayan de Oro, Misamis Oriental, Philippines",
            "message": "I would like to inquire...",
            "status": "new",
            "created_at": "2025-10-14T10:30:00Z"
        }
    ]
}
```

#### 3. Update Contact Submission Status (Admin Only)

```
PATCH /api/contact/submissions/{id}/
Authorization: Bearer {access_token}
Content-Type: application/json

Request:
{
    "status": "resolved",
    "admin_notes": "Customer was called and issue was resolved."
}

Response (200): Updated submission object
```

### Deposit Products Endpoints

#### 1. List All Deposit Products

```
GET /api/deposits/
Query Parameters:
    - product_type: string (savings, checking, time_deposit)
    - is_active: boolean

Response (200):
{
    "count": 15,
    "results": [
        {
            "id": 1,
            "product_type": "savings",
            "name": "Regular Savings",
            "subtitle": "Building your financial future",
            "description": "This account is for individuals...",
            "image": "https://cdn.example.com/deposits/savings.jpg",
            "required_initial_deposit": "1000.00",
            "required_monthly_adb": "1000.00",
            "required_monthly_adb_to_earn_interest": "1000.00",
            "interest_rate_below": "0.10",
            "interest_rate_above": "0.15",
            "features": [
                "Easy access to funds",
                "ATM card included",
                "Online banking"
            ],
            "is_active": true,
            "display_order": 1
        }
    ]
}
```

#### 2. Get Deposit Product by Type

```
GET /api/deposits/{product_type}/
Example: GET /api/deposits/savings/

Response (200):
{
    "product_type": "savings",
    "products": [
        // Array of savings products
    ]
}
```

#### 3. Create/Update/Delete Deposit Product (Admin Only)

```
POST /api/deposits/
PUT /api/deposits/{id}/
DELETE /api/deposits/{id}/
Authorization: Bearer {access_token}
```

### Loan Products Endpoints

#### 1. List All Loan Products

```
GET /api/loans/
Query Parameters:
    - loan_type: string (agriculture, sme, microfinance, etc.)
    - is_active: boolean

Response (200):
{
    "count": 7,
    "results": [
        {
            "id": 1,
            "loan_type": "agriculture",
            "title": "Agricultural Loans",
            "subtitle": "Sow success with smart financing",
            "description": "Fast funds to help your farm grow.",
            "full_description": "Detailed description...",
            "image": "https://cdn.example.com/loans/agriculture.jpg",
            "min_amount": "50000.00",
            "max_amount": "5000000.00",
            "interest_rate": "6.5% - 8.5% per annum",
            "term_options": ["6 months", "12 months", "24 months", "36 months"],
            "requirements": [
                "Valid government ID",
                "Proof of land ownership",
                "Farm business plan"
            ],
            "features": [
                "Flexible payment terms",
                "Quick approval",
                "Expert guidance"
            ],
            "is_active": true,
            "display_order": 1
        }
    ]
}
```

#### 2. Get Loan Product by Type

```
GET /api/loans/{loan_type}/
Example: GET /api/loans/agriculture/
```

#### 3. Create/Update/Delete Loan Product (Admin Only)

```
POST /api/loans/
PUT /api/loans/{id}/
DELETE /api/loans/{id}/
Authorization: Bearer {access_token}
```

### Properties for Sale Endpoints

#### 1. List Properties

```
GET /api/properties/
Query Parameters:
    - property_type: string (vehicle, real_estate)
    - status: string (available, reserved, sold)
    - min_price: decimal
    - max_price: decimal
    - page: integer

Response (200):
{
    "count": 50,
    "results": [
        {
            "id": 1,
            "property_type": "vehicle",
            "title": "2017 Toyota Fortuner",
            "location": "Bacolod, Lanao Del Norte",
            "price": "180000.00",
            "description": "Well-maintained vehicle...",
            "main_image": "https://cdn.example.com/properties/vehicle1.jpg",
            "additional_images": [
                "https://cdn.example.com/properties/vehicle1_2.jpg",
                "https://cdn.example.com/properties/vehicle1_3.jpg"
            ],
            "year": 2017,
            "plate_number": "JDO5067",
            "make": "Toyota",
            "model": "Fortuner",
            "status": "available",
            "is_featured": true,
            "created_at": "2025-01-15T08:00:00Z"
        },
        {
            "id": 2,
            "property_type": "real_estate",
            "title": "Residential Land in Pagadian",
            "location": "Napoloan Pagadian City, Zamboanga del Sur",
            "price": "1950000.00",
            "description": "Prime residential lot...",
            "main_image": "https://cdn.example.com/properties/land1.jpg",
            "additional_images": [],
            "property_code": "K05-03",
            "area": "1262.00",
            "tct_number": "TCT#1372020004737 / TCT#1372020004738",
            "date_acquired": "2018-12-04",
            "status": "available",
            "is_featured": false
        }
    ]
}
```

#### 2. Get Property Details

```
GET /api/properties/{id}/

Response (200): Full property details
```

#### 3. Create/Update/Delete Property (Admin Only)

```
POST /api/properties/
PUT /api/properties/{id}/
DELETE /api/properties/{id}/
Authorization: Bearer {access_token}
```

### Branch & ATM Location Endpoints

#### 1. List All Branches

```
GET /api/branches/
Query Parameters:
    - region: string (mindanao, visayas, luzon, ncr)
    - has_atm: boolean
    - is_active: boolean

Response (200):
{
    "count": 82,
    "mindanao": [
        {
            "id": 1,
            "name": "Davao Branch",
            "region": "mindanao",
            "address": "123 J.P. Laurel Ave, Davao City",
            "phone_number": "+63 82 123 4567",
            "email": "davao@1stvalleybank.com",
            "latitude": "7.0731",
            "longitude": "125.6128",
            "has_atm": true,
            "is_main_office": false,
            "operating_hours": {
                "monday": "09:00-17:00",
                "tuesday": "09:00-17:00",
                "wednesday": "09:00-17:00",
                "thursday": "09:00-17:00",
                "friday": "09:00-17:00",
                "saturday": "09:00-12:00",
                "sunday": "Closed"
            },
            "is_active": true
        }
    ],
    "visayas": [...],
    "luzon": [...],
    "ncr": [...]
}
```

#### 2. List ATM Locations

```
GET /api/atms/
Query Parameters:
    - is_24_hours: boolean
    - branch_id: integer (filter by branch)

Response (200):
{
    "count": 150,
    "results": [
        {
            "id": 1,
            "name": "SM City CDO ATM",
            "address": "SM City Cagayan de Oro, Masterson Ave",
            "latitude": "8.4829",
            "longitude": "124.6508",
            "branch": {
                "id": 5,
                "name": "Cagayan de Oro Branch"
            },
            "is_24_hours": true,
            "operating_hours": "",
            "is_active": true
        }
    ]
}
```

### Homepage Content Endpoints

#### 1. Get Hero Slides

```
GET /api/homepage/hero-slides/

Response (200):
{
    "slides": [
        {
            "id": 1,
            "title": "Bank with ease, Bank with 1VB ATM",
            "subtitle": "",
            "description": "Access your money anytime, anywhere...",
            "image": "https://cdn.example.com/hero/atm.jpg",
            "image_alt": "ATM Services",
            "button_text": "Find an ATM",
            "button_route": "/atm-locator",
            "display_order": 1
        }
    ]
}
```

#### 2. Get Testimonials

```
GET /api/homepage/testimonials/

Response (200):
{
    "testimonials": [
        {
            "id": 1,
            "name": "Maria Santos",
            "role": "Small Business Owner",
            "content": "1st Valley Bank helped me grow my business...",
            "rating": 5,
            "image": "https://cdn.example.com/testimonials/maria.jpg"
        }
    ]
}
```

#### 3. Get FAQs

```
GET /api/homepage/faqs/
Query Parameters:
    - category: string (accounts, online_banking, loans, etc.)

Response (200):
{
    "faqs": [
        {
            "id": 1,
            "category": "accounts",
            "question": "How do I open a new account at 1st Valley Bank?",
            "answer": "Opening a new account is easy! Visit your nearest..."
        }
    ]
}
```

#### 4. Get Bank Statistics

```
GET /api/homepage/statistics/

Response (200):
{
    "statistics": [
        {
            "id": 1,
            "label": "Branches Nationwide",
            "value": "82+",
            "display_order": 1
        },
        {
            "id": 2,
            "label": "Years of Service",
            "value": "25+",
            "display_order": 2
        }
    ]
}
```

### Advisory Gallery Endpoints

#### 1. List Advisory Images

```
GET /api/advisory/gallery/

Response (200):
{
    "images": [
        {
            "id": 1,
            "title": "Advisory event 1",
            "image": "https://cdn.example.com/advisory/img1.jpg",
            "alt_text": "Advisory event showing...",
            "description": "Annual advisory meeting...",
            "display_order": 1
        }
    ]
}
```

#### 2. Create/Update/Delete Advisory Images (Admin Only)

```
POST /api/advisory/gallery/
PUT /api/advisory/gallery/{id}/
DELETE /api/advisory/gallery/{id}/
Authorization: Bearer {access_token}
```

### AI Chatbot Endpoints

#### 1. Start Chat Session

```
POST /api/chatbot/session/start/
Content-Type: application/json

Request:
{
    "user_ip": "192.168.1.1"  // Optional
}

Response (201):
{
    "session_id": "ses_1234567890abcdef",
    "message": "Hello! I'm your AI assistant. How can I help you today?"
}
```

#### 2. Send Message

```
POST /api/chatbot/message/
Content-Type: application/json

Request:
{
    "session_id": "ses_1234567890abcdef",
    "message": "What are your loan products?"
}

Response (200):
{
    "session_id": "ses_1234567890abcdef",
    "user_message": {
        "id": 123,
        "sender": "user",
        "message": "What are your loan products?",
        "timestamp": "2025-10-14T10:30:00Z"
    },
    "ai_response": {
        "id": 124,
        "sender": "ai",
        "message": "We offer several loan products including Agricultural Loans, SME Loans, Microfinance, Salary Loans, and more. Which type are you interested in?",
        "timestamp": "2025-10-14T10:30:02Z"
    }
}
```

#### 3. Get Chat History

```
GET /api/chatbot/session/{session_id}/history/

Response (200):
{
    "session_id": "ses_1234567890abcdef",
    "messages": [
        {
            "id": 1,
            "sender": "ai",
            "message": "Hello! I'm your AI assistant...",
            "timestamp": "2025-10-14T10:25:00Z"
        },
        {
            "id": 123,
            "sender": "user",
            "message": "What are your loan products?",
            "timestamp": "2025-10-14T10:30:00Z"
        },
        {
            "id": 124,
            "sender": "ai",
            "message": "We offer several loan products...",
            "timestamp": "2025-10-14T10:30:02Z"
        }
    ]
}
```

#### 4. End Chat Session

```
POST /api/chatbot/session/{session_id}/end/

Response (200):
{
    "message": "Chat session ended successfully"
}
```

### Search Endpoint

#### 1. Global Search

```
GET /api/search/
Query Parameters:
    - q: string (search query)
    - category: string (newsletters, loans, deposits, properties, faqs)

Response (200):
{
    "query": "agriculture loan",
    "results": {
        "loans": [
            {
                "type": "loan",
                "id": 1,
                "title": "Agricultural Loans",
                "description": "Fast funds to help your farm grow.",
                "url": "/loans/agriculture"
            }
        ],
        "newsletters": [
            {
                "type": "newsletter",
                "id": 5,
                "title": "How 1VB's Agriculture Loans Empower Farmers",
                "description": "Funding Growth for Filipino Farmers",
                "url": "/newsletter"
            }
        ],
        "faqs": []
    },
    "total_results": 2
}
```

### Analytics Endpoints (Admin Only)

#### 1. Dashboard Analytics

```
GET /api/analytics/dashboard/
Authorization: Bearer {access_token}

Response (200):
{
    "overview": {
        "total_newsletters": 27,
        "total_contacts": 350,
        "total_properties": 50,
        "new_contacts_this_month": 45,
        "newsletter_subscribers": 1250
    },
    "contact_by_subject": [
        {"subject": "loans_agriculture", "count": 85},
        {"subject": "deposits_regular", "count": 120}
    ],
    "recent_activities": [
        {
            "action": "create",
            "model": "Newsletter",
            "user": "admin",
            "timestamp": "2025-10-14T10:00:00Z"
        }
    ],
    "popular_newsletters": [
        {
            "id": 1,
            "title": "Grow Your Business with 1VB SME Loans",
            "views": 3200
        }
    ]
}
```

---

## Authentication & Authorization

### JWT Authentication

- Use `djangorestframework-simplejwt` for token-based authentication
- Access tokens expire after 60 minutes
- Refresh tokens expire after 7 days
- Implement token blacklisting for logout functionality

### Permission Levels

1. **Public** (No authentication required):
   - GET endpoints for newsletters, deposits, loans, properties, branches, ATMs
   - Contact form submission
   - Newsletter subscription
   - Chatbot interaction
   - Search

2. **Admin Only** (Requires authentication + admin role):
   - All POST, PUT, PATCH, DELETE operations
   - Contact submission management
   - Analytics dashboard
   - Audit logs

3. **Editor** (Requires authentication + editor role):
   - Create/Update newsletters, products, properties
   - View contact submissions
   - Cannot delete

4. **Viewer** (Requires authentication + viewer role):
   - Read-only access to admin endpoints
   - Cannot create, update, or delete

### Implementation Example

```python
# permissions.py
from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'admin'

class IsEditorOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role in ['admin', 'editor']

class IsAuthenticatedOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated
```

---

## File Upload & Management

### Storage Configuration

#### AWS S3 Setup (Recommended)

```python
# settings.py
AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME')
AWS_S3_REGION_NAME = 'ap-southeast-1'  # Singapore
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
AWS_DEFAULT_ACL = 'public-read'
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}

# Static and Media files
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
```

### File Upload Specifications

#### Image Files

- **Formats**: JPEG, PNG, WebP
- **Max Size**: 5 MB per image
- **Optimization**: Auto-resize and compress on upload
- **Thumbnails**: Generate multiple sizes (thumbnail, medium, large)

#### PDF Files (Newsletters)

- **Max Size**: 10 MB
- **Validation**: Ensure file is valid PDF

#### Multiple Image Upload (Properties)

- **Max Images**: 10 per property
- **Organization**: Store in folders by property ID

### Image Processing

```python
# utils/image_processing.py
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile

def optimize_image(image_file, max_width=1920, quality=85):
    """Optimize uploaded images"""
    img = Image.open(image_file)

    # Convert RGBA to RGB if necessary
    if img.mode in ('RGBA', 'LA'):
        background = Image.new('RGB', img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[-1])
        img = background

    # Resize if necessary
    if img.width > max_width:
        ratio = max_width / img.width
        new_height = int(img.height * ratio)
        img = img.resize((max_width, new_height), Image.LANCZOS)

    # Save to BytesIO
    output = BytesIO()
    img.save(output, format='JPEG', quality=quality, optimize=True)
    output.seek(0)

    return InMemoryUploadedFile(
        output, 'ImageField',
        f"{image_file.name.split('.')[0]}.jpg",
        'image/jpeg',
        output.getbuffer().nbytes,
        None
    )
```

---

## Integration Requirements

### 1. Mapbox Geocoding API

Used for converting addresses to coordinates in the contact form.

#### API Configuration

```python
# settings.py
MAPBOX_ACCESS_TOKEN = env('MAPBOX_ACCESS_TOKEN')
MAPBOX_GEOCODING_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
```

#### Implementation

```python
# services/geocoding.py
import requests
from django.conf import settings

def geocode_address(barangay, municipality, province):
    """
    Geocode Philippine address using Mapbox API
    Returns: {latitude, longitude, full_address} or None
    """
    full_address = f"{barangay}, {municipality}, {province}, Philippines"

    url = f"{settings.MAPBOX_GEOCODING_URL}{full_address}.json"
    params = {
        'access_token': settings.MAPBOX_ACCESS_TOKEN,
        'limit': 1,
        'country': 'PH'  # Limit to Philippines
    }

    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()

        if data.get('features'):
            feature = data['features'][0]
            coordinates = feature['geometry']['coordinates']

            return {
                'longitude': coordinates[0],
                'latitude': coordinates[1],
                'full_address': feature['place_name']
            }
    except Exception as e:
        print(f"Geocoding error: {e}")

    return None
```

### 2. OpenAI API (Chatbot)

#### Configuration

```python
# settings.py
OPENAI_API_KEY = env('OPENAI_API_KEY')
OPENAI_MODEL = 'gpt-4'  # or 'gpt-3.5-turbo' for cost savings
```

#### Implementation

```python
# services/chatbot.py
import openai
from django.conf import settings

openai.api_key = settings.OPENAI_API_KEY

# System prompt with bank context
SYSTEM_PROMPT = """
You are a helpful AI assistant for 1st Valley Bank, a rural bank in the Philippines.
Your role is to provide information about our banking products and services.

Key Information:
- We offer Savings Accounts, Checking Accounts, and Time Deposits
- Loan products: Agricultural, SME, Microfinance, Salary, Gold & Gems loans
- We have 82+ branches across Mindanao and Visayas
- Contact: (+63) 917-820-8542
- Email: info@1stvalleybank.com

Guidelines:
- Be professional, friendly, and concise
- If you don't know something, suggest contacting the bank directly
- For account-specific questions, redirect to customer service
- Promote our products when relevant
"""

def get_ai_response(user_message, conversation_history=[]):
    """
    Get AI response for chatbot
    Args:
        user_message: str - Current user message
        conversation_history: list - Previous messages in format [{"role": "user/assistant", "content": "..."}]
    Returns:
        str - AI response
    """
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages.extend(conversation_history[-10:])  # Last 10 messages for context
    messages.append({"role": "user", "content": user_message})

    try:
        response = openai.ChatCompletion.create(
            model=settings.OPENAI_MODEL,
            messages=messages,
            max_tokens=300,
            temperature=0.7,
        )

        return response.choices[0].message['content']
    except Exception as e:
        print(f"OpenAI API error: {e}")
        return "I apologize, but I'm having trouble processing your request. Please try again or contact our customer service at (+63) 917-820-8542."
```

### 3. Email Service

#### Configuration

```python
# settings.py
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = env('EMAIL_HOST', default='smtp.gmail.com')
EMAIL_PORT = env('EMAIL_PORT', default=587)
EMAIL_USE_TLS = True
EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = '1st Valley Bank <noreply@1stvalleybank.com>'
ADMIN_EMAIL = env('ADMIN_EMAIL', default='admin@1stvalleybank.com')
```

#### Email Templates

**Contact Form Submission - Admin Notification**

```python
# services/email.py
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings

def send_contact_admin_notification(contact_submission):
    """Send email to admin when new contact form is submitted"""
    subject = f"New Contact Form Submission - {contact_submission.subject}"

    context = {
        'submission': contact_submission,
        'admin_url': f"{settings.ADMIN_URL}/contact/submissions/{contact_submission.id}/"
    }

    html_message = render_to_string('emails/contact_admin_notification.html', context)

    send_mail(
        subject=subject,
        message='',  # Plain text fallback
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.ADMIN_EMAIL],
        html_message=html_message,
        fail_silently=False,
    )

def send_contact_confirmation(contact_submission):
    """Send confirmation email to user"""
    subject = "Thank you for contacting 1st Valley Bank"

    context = {
        'name': contact_submission.name,
        'reference_number': f"CNT-2025-{contact_submission.id}"
    }

    html_message = render_to_string('emails/contact_confirmation.html', context)

    send_mail(
        subject=subject,
        message='',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[contact_submission.email],
        html_message=html_message,
        fail_silently=True,  # Don't fail if user email is invalid
    )
```

### 4. Celery for Async Tasks

Use Celery for tasks that should run asynchronously:

- Email sending
- Image optimization
- Geocoding
- AI chatbot responses (if needed)

#### Configuration

```python
# celery.py
from celery import Celery
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('first_valley_bank')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# settings.py
CELERY_BROKER_URL = env('REDIS_URL', default='redis://localhost:6379/0')
CELERY_RESULT_BACKEND = env('REDIS_URL', default='redis://localhost:6379/0')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
```

#### Example Task

```python
# tasks.py
from celery import shared_task
from .services.email import send_contact_admin_notification

@shared_task
def send_contact_emails(contact_id):
    """Async task to send contact form emails"""
    from .models import ContactSubmission

    try:
        contact = ContactSubmission.objects.get(id=contact_id)
        send_contact_admin_notification(contact)
        send_contact_confirmation(contact)
    except ContactSubmission.DoesNotExist:
        pass
```

---

## Deployment Considerations

### Environment Variables

Create a `.env` file with these variables:

```env
# Django
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=api.1stvalleybank.com,localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=https://www.1stvalleybank.com,https://1stvalleybank.com

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/first_valley_bank
# Or use individual settings:
DB_NAME=first_valley_bank
DB_USER=postgres
DB_PASSWORD=your-db-password
DB_HOST=localhost
DB_PORT=5432

# AWS S3
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_STORAGE_BUCKET_NAME=1vb-media
AWS_S3_REGION_NAME=ap-southeast-1

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=noreply@1stvalleybank.com
EMAIL_HOST_PASSWORD=your-email-password
ADMIN_EMAIL=admin@1stvalleybank.com

# External APIs
MAPBOX_ACCESS_TOKEN=your-mapbox-token
OPENAI_API_KEY=your-openai-api-key

# Redis
REDIS_URL=redis://localhost:6379/0

# Admin
ADMIN_URL=https://admin.1stvalleybank.com
```

### CORS Configuration

```python
# settings.py
CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS', default=[
    'http://localhost:5173',  # Vite dev server
    'http://localhost:3000',
])

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
```

### Database Optimization

#### Indexing

```python
# Add indexes to frequently queried fields
class Newsletter(models.Model):
    # ...
    class Meta:
        indexes = [
            models.Index(fields=['status', '-published_date']),
            models.Index(fields=['created_at']),
        ]

class ContactSubmission(models.Model):
    # ...
    class Meta:
        indexes = [
            models.Index(fields=['status', '-created_at']),
            models.Index(fields=['email']),
        ]
```

#### Query Optimization

- Use `select_related()` for foreign keys
- Use `prefetch_related()` for many-to-many and reverse foreign keys
- Add pagination to all list endpoints
- Implement caching for frequently accessed data

### Caching Strategy

```python
# settings.py
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': env('REDIS_URL', default='redis://127.0.0.1:6379/1'),
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# Cache public endpoints
CACHE_TTL = 60 * 15  # 15 minutes

# views.py example
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator

class NewsletterListView(generics.ListAPIView):
    @method_decorator(cache_page(CACHE_TTL))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
```

### Security Best Practices

1. **Rate Limiting**

```python
# Install: pip install django-ratelimit
from django_ratelimit.decorators import ratelimit

@ratelimit(key='ip', rate='5/m', method='POST')
def contact_submit(request):
    # Limit contact form to 5 submissions per minute per IP
    pass
```

2. **SQL Injection Prevention**

- Always use Django ORM
- Never use raw SQL with user input

3. **XSS Prevention**

- Django templates auto-escape by default
- Validate and sanitize all user input

4. **CSRF Protection**

- Enable CSRF middleware
- Use CSRF tokens in forms

5. **File Upload Security**

- Validate file types and sizes
- Scan uploaded files for malware (consider using ClamAV)
- Store files outside web root

### Monitoring & Logging

```python
# settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'logs/django.log',
            'maxBytes': 1024 * 1024 * 15,  # 15MB
            'backupCount': 10,
            'formatter': 'verbose',
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console', 'file'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}
```

### Performance Considerations

1. **Database Connection Pooling**

```python
# For PostgreSQL
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'),
        'CONN_MAX_AGE': 600,  # Connection pooling
    }
}
```

2. **Static File Compression**

- Enable Gzip compression
- Use CDN for static assets

3. **Database Query Optimization**

- Use `only()` and `defer()` to limit fields
- Implement pagination everywhere
- Add database query logging in development

### Deployment Checklist

- [ ] Set `DEBUG=False` in production
- [ ] Configure proper `ALLOWED_HOSTS`
- [ ] Set up HTTPS with SSL certificate
- [ ] Configure production database (PostgreSQL recommended)
- [ ] Set up AWS S3 for media files
- [ ] Configure email service
- [ ] Set up Redis for caching and Celery
- [ ] Configure Celery workers
- [ ] Set up monitoring (Sentry, New Relic, etc.)
- [ ] Configure backups (database, media files)
- [ ] Set up CI/CD pipeline
- [ ] Load test the API
- [ ] Create admin superuser
- [ ] Populate initial data (branches, products)

---

## API Documentation Tools

### Swagger/OpenAPI Integration

```python
# Install: pip install drf-yasg

# urls.py
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="1st Valley Bank API",
        default_version='v1',
        description="Backend API for 1st Valley Bank web application",
        contact=openapi.Contact(email="dev@1stvalleybank.com"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
```

---

## Testing Requirements

### Unit Tests

- Test all model methods
- Test all serializers
- Test all custom validators

### Integration Tests

- Test all API endpoints
- Test authentication flow
- Test file uploads
- Test email sending (use mock)
- Test external API integrations (use mock)

### Example Test

```python
# tests/test_newsletters.py
from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

User = get_user_model()

class NewsletterAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_user(
            username='admin',
            password='testpass',
            role='admin'
        )

    def test_list_newsletters_public(self):
        """Public users can list published newsletters"""
        response = self.client.get('/api/newsletters/')
        self.assertEqual(response.status_code, 200)

    def test_create_newsletter_requires_auth(self):
        """Creating newsletter requires authentication"""
        response = self.client.post('/api/newsletters/', {})
        self.assertEqual(response.status_code, 401)

    def test_create_newsletter_as_admin(self):
        """Admin can create newsletter"""
        self.client.force_authenticate(user=self.admin_user)
        data = {
            'title': 'Test Newsletter',
            'description': 'Test description',
            'status': 'draft'
        }
        response = self.client.post('/api/newsletters/', data)
        self.assertEqual(response.status_code, 201)
```

---

## Sample Data Seeds

Create management commands to seed initial data:

```python
# management/commands/seed_data.py
from django.core.management.base import BaseCommand
from apps.locations.models import Branch

class Command(BaseCommand):
    help = 'Seed initial data for branches, products, etc.'

    def handle(self, *args, **kwargs):
        # Seed branches
        branches = [
            {
                'name': 'Davao Branch',
                'region': 'mindanao',
                'address': '123 J.P. Laurel Ave, Davao City',
                'has_atm': True,
            },
            # Add more branches...
        ]

        for branch_data in branches:
            Branch.objects.get_or_create(**branch_data)

        self.stdout.write(self.style.SUCCESS('Successfully seeded data'))
```

---

## Additional Notes

### Frontend Integration Points

The React frontend expects the following:

1. **CORS**: Ensure CORS is properly configured to allow requests from the frontend domain
2. **Response Format**: All responses should be in JSON format
3. **Error Handling**: Consistent error response format:
   ```json
   {
   	"error": "Error message here",
   	"details": {
   		"field_name": ["Error detail"]
   	}
   }
   ```
4. **Pagination**: Use DRF's PageNumberPagination with customizable page size
5. **Filtering**: Support query parameters for filtering, sorting, and searching

### API Versioning

Consider implementing API versioning:

```python
# urls.py
urlpatterns = [
    path('api/v1/', include('apps.api.v1.urls')),
]
```

### Documentation Maintenance

Keep this documentation updated as the API evolves:

- Document all new endpoints
- Update model schemas when fields change
- Document breaking changes
- Maintain changelog

---

## Contact & Support

For questions or clarifications about this API:

- **Email**: dev@1stvalleybank.com
- **Slack**: #backend-dev channel
- **Documentation**: https://docs.1stvalleybank.com/api

---

**Last Updated**: October 14, 2025  
**Version**: 1.0.0  
**Author**: Development Team
