# First Valley Bank - Backend Documentation

## Overview

This documentation package provides comprehensive guidance for developing the Django REST Framework backend for the First Valley Bank web application. The backend serves a React frontend (currently deployed) and implements features for banking products, customer engagement, and content management.

---

## 📚 Documentation Files

### 1. [BACKEND_API_DOCUMENTATION.md](./BACKEND_API_DOCUMENTATION.md) ⭐ **START HERE**

**Complete API Reference & Technical Specifications**

This is the primary technical documentation covering:

- ✅ All data models with detailed field specifications
- ✅ Complete API endpoint definitions with request/response examples
- ✅ Authentication & authorization implementation
- ✅ File upload specifications and image processing
- ✅ External API integrations (Mapbox, OpenAI, Email)
- ✅ Security best practices
- ✅ Deployment considerations
- ✅ Performance optimization guidelines

**Use this document for:**

- Understanding the complete system architecture
- Implementing each API endpoint
- Database schema design
- Integration requirements

---

### 2. [BACKEND_SETUP_GUIDE.md](./BACKEND_SETUP_GUIDE.md)

**Step-by-Step Installation & Configuration Guide**

Practical setup instructions including:

- ✅ Development environment setup
- ✅ Django project structure
- ✅ Database configuration (PostgreSQL)
- ✅ Redis setup for caching and Celery
- ✅ Environment variables configuration
- ✅ Running the development server
- ✅ Docker deployment setup
- ✅ Troubleshooting common issues

**Use this document for:**

- Initial project setup
- Local development environment
- Understanding project structure
- Deployment preparation

---

### 3. [DATABASE_SCHEMA_AND_TESTING.md](./DATABASE_SCHEMA_AND_TESTING.md)

**Database Schema, Testing Scenarios & Postman Collection**

Testing and validation resources:

- ✅ Visual database schema (ERD)
- ✅ Database index recommendations
- ✅ Sample data SQL scripts
- ✅ Complete Postman collection structure
- ✅ Testing scenarios and workflows
- ✅ Performance benchmarks
- ✅ Error handling examples
- ✅ Database backup/restore procedures

**Use this document for:**

- Database design and optimization
- API testing with Postman
- Sample data population
- Performance testing

---

## 🎯 Key Features to Implement

### 1. AI Chatbot

- OpenAI GPT integration
- Session-based conversation management
- Context-aware responses about bank products
- Rate limiting and cost optimization

### 2. Newsletter Management

- CRUD operations with admin authentication
- PDF file uploads and storage
- Email subscription system
- View tracking and analytics
- Pagination and search

### 3. Responsive Landing Page Content

- Dynamic hero carousel management
- Testimonials system
- FAQ management with categories
- Bank statistics/metrics display

### 4. Admin Panel

- Django Admin customization
- Role-based access control (Admin, Editor, Viewer)
- Dashboard with analytics
- Audit logging for all admin actions

### 5. Content Management System

- Deposit products (Savings, Checking, Time Deposit)
- Loan products (7 types: Agriculture, SME, Microfinance, etc.)
- Properties for sale (Vehicles, Real Estate)
- Branch and ATM location management
- Advisory gallery with image optimization

### 6. Contact Information Submission

- Form validation and storage
- Mapbox geocoding integration
- Email notifications (admin & user)
- Spam prevention
- Admin dashboard for managing submissions

---

## 🚀 Quick Start

### For First-Time Setup:

1. **Read the Setup Guide**

   ```bash
   # Open BACKEND_SETUP_GUIDE.md
   ```

2. **Install Prerequisites**
   - Python 3.10+
   - PostgreSQL 14+
   - Redis 6+

3. **Set Up Development Environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in required values (database, API keys, etc.)

5. **Initialize Database**

   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py seed_data  # Optional: load sample data
   ```

6. **Run Development Server**
   ```bash
   python manage.py runserver
   ```

### For API Development:

1. **Review API Documentation**

   ```bash
   # Open BACKEND_API_DOCUMENTATION.md
   ```

2. **Understand the Models**
   - Refer to "Data Models & Database Schema" section
   - Review relationships and field types

3. **Implement Endpoints**
   - Start with public endpoints (newsletters, branches, etc.)
   - Then implement admin endpoints with authentication
   - Test each endpoint as you build

4. **Test with Postman**
   - Use collection structure from `DATABASE_SCHEMA_AND_TESTING.md`
   - Test authentication flow first
   - Test CRUD operations for each resource

---

## 📋 Implementation Checklist

### Phase 1: Foundation (Week 1)

- [ ] Set up Django project structure
- [ ] Configure database (PostgreSQL)
- [ ] Set up Redis for caching
- [ ] Implement User model with roles
- [ ] Set up JWT authentication
- [ ] Configure CORS for frontend
- [ ] Set up file storage (AWS S3 or local)

### Phase 2: Core Models (Week 2)

- [ ] Implement Newsletter model & API
- [ ] Implement Contact Submission model & API
- [ ] Implement Deposit Products model & API
- [ ] Implement Loan Products model & API
- [ ] Implement Properties for Sale model & API
- [ ] Implement Branch & ATM models & API

### Phase 3: Homepage Content (Week 3)

- [ ] Implement Hero Slides model & API
- [ ] Implement Testimonials model & API
- [ ] Implement FAQ model & API
- [ ] Implement Bank Statistics model & API
- [ ] Implement Advisory Images model & API

### Phase 4: Advanced Features (Week 4)

- [ ] Integrate Mapbox geocoding for contact form
- [ ] Set up Celery for async tasks
- [ ] Implement email notifications
- [ ] Integrate OpenAI for chatbot
- [ ] Implement chat session management
- [ ] Set up image optimization

### Phase 5: Admin & Analytics (Week 5)

- [ ] Customize Django Admin interface
- [ ] Implement role-based permissions
- [ ] Create analytics dashboard
- [ ] Implement audit logging
- [ ] Add search functionality
- [ ] Implement rate limiting

### Phase 6: Testing & Optimization (Week 6)

- [ ] Write unit tests for models
- [ ] Write integration tests for APIs
- [ ] Performance testing and optimization
- [ ] Add database indexes
- [ ] Implement caching strategy
- [ ] Security audit

### Phase 7: Deployment (Week 7)

- [ ] Set up production database
- [ ] Configure production settings
- [ ] Set up AWS S3 for media files
- [ ] Deploy to server (AWS, DigitalOcean, etc.)
- [ ] Set up SSL/HTTPS
- [ ] Configure monitoring (Sentry, etc.)
- [ ] Set up automated backups

---

## 🔧 Technology Stack

### Backend Framework

- **Django 4.2+** - Web framework
- **Django REST Framework** - API development
- **djangorestframework-simplejwt** - JWT authentication

### Database

- **PostgreSQL 14+** - Primary database
- **Redis 6+** - Caching and Celery broker

### File Storage

- **AWS S3** - Media file storage (production)
- **Pillow** - Image processing

### Async Tasks

- **Celery** - Distributed task queue
- **Redis** - Message broker

### External APIs

- **OpenAI API** - AI chatbot functionality
- **Mapbox API** - Geocoding and maps
- **SMTP** - Email notifications

### Development Tools

- **drf-yasg** - Swagger/OpenAPI documentation
- **django-cors-headers** - CORS handling
- **python-decouple** - Environment variable management

---

## 📊 Database Summary

### Total Tables: 17

**User Management:**

- users (admin users with roles)
- audit_logs (action tracking)

**Content:**

- newsletters (27+ articles with PDFs)
- newsletter_subscribers (email list)
- hero_slides (homepage carousel)
- testimonials (customer reviews)
- faqs (Q&A)
- bank_statistics (homepage metrics)
- advisory_images (gallery)

**Products:**

- deposit_products (savings, checking, time deposits)
- loan_products (7 loan types)
- properties_for_sale (vehicles, real estate)

**Locations:**

- branches (82+ bank branches)
- atm_locations (ATM network)

**Customer Engagement:**

- contact_submissions (contact form data)
- chat_sessions (chatbot sessions)
- chat_messages (chat history)

---

## 🔐 Security Considerations

### Authentication

- JWT tokens with 60-minute expiration
- Refresh tokens with 7-day expiration
- Token blacklisting on logout

### Authorization

- Role-based access control (RBAC)
- Admin, Editor, and Viewer roles
- Permission classes for each endpoint

### Data Protection

- HTTPS/SSL in production
- CORS configuration for frontend
- CSRF protection enabled
- SQL injection prevention (Django ORM)
- XSS prevention (template escaping)

### File Upload Security

- File type validation
- File size limits (5MB images, 10MB PDFs)
- Virus scanning recommended
- Secure file storage

### Rate Limiting

- Contact form: 5 submissions/minute
- Chatbot: 30 messages/minute
- API endpoints: 100 requests/hour

---

## 🧪 Testing Strategy

### Unit Tests

- Test all model methods
- Test serializer validation
- Test custom validators

### Integration Tests

- Test all API endpoints
- Test authentication flow
- Test file uploads
- Mock external APIs

### Performance Tests

- Load testing with Apache Bench
- Database query optimization
- Response time benchmarks

### Security Tests

- Penetration testing
- Vulnerability scanning
- Authentication bypass tests

---

## 📞 Frontend Integration

### CORS Configuration

The backend must allow requests from:

- `https://www.1stvalleybank.com` (production)
- `https://1stvalleybank.com`
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (React dev server)

### Response Format

All API responses use JSON format with consistent structure:

**Success:**

```json
{
  "id": 1,
  "title": "Newsletter Title",
  "data": {...}
}
```

**Error:**

```json
{
	"error": "Error message",
	"details": {
		"field": ["Validation error"]
	}
}
```

### Pagination

Standard DRF pagination format:

```json
{
  "count": 100,
  "next": "http://api.example.com/api/resource/?page=2",
  "previous": null,
  "results": [...]
}
```

---

## 🚀 Deployment Options

### Option 1: Traditional VPS (DigitalOcean, Linode)

- Django with Gunicorn
- Nginx as reverse proxy
- PostgreSQL on same server or managed database
- Redis for caching
- Supervisor for process management

### Option 2: AWS

- EC2 for Django application
- RDS for PostgreSQL
- ElastiCache for Redis
- S3 for media files
- CloudFront for CDN

### Option 3: Docker + Container Orchestration

- Docker containers for all services
- Docker Compose for development
- Kubernetes or ECS for production
- Managed database services

### Option 4: Platform as a Service

- Heroku
- Railway
- Render
- Easy deployment but less control

---

## 📈 Monitoring & Maintenance

### Logging

- Django logs to file and console
- Celery task logs
- Audit logs in database
- Error tracking with Sentry

### Monitoring Tools

- **Sentry** - Error tracking
- **New Relic** - Performance monitoring
- **Prometheus + Grafana** - Metrics visualization
- **UptimeRobot** - Uptime monitoring

### Backups

- Daily database backups
- Weekly media file backups
- Offsite backup storage
- Automated backup testing

---

## 📝 Next Steps After Reading This

1. **For Project Setup:**
   → Go to `BACKEND_SETUP_GUIDE.md`

2. **For API Development:**
   → Go to `BACKEND_API_DOCUMENTATION.md`

3. **For Testing:**
   → Go to `DATABASE_SCHEMA_AND_TESTING.md`

4. **Questions or Issues:**
   - Review the troubleshooting sections
   - Check Django/DRF documentation
   - Contact: dev@1stvalleybank.com

---

## 🤝 Contributing Guidelines

### Code Style

- Follow PEP 8 for Python code
- Use meaningful variable names
- Add docstrings to all functions
- Keep functions small and focused

### Git Workflow

- Create feature branches from `main`
- Use descriptive commit messages
- Submit pull requests for review
- Squash commits before merging

### Documentation

- Update API docs when adding endpoints
- Document all environment variables
- Add comments for complex logic
- Keep README files updated

---

## 📄 License

This project is proprietary software for First Valley Bank Inc.

---

## 📞 Support

For technical support or questions:

- **Email**: dev@1stvalleybank.com
- **Documentation**: This repository
- **Issue Tracker**: GitHub Issues (if applicable)

---

## 🎉 Final Notes

This documentation package provides everything needed to build a production-ready Django backend for the First Valley Bank web application. The implementation is designed to be:

- **Scalable**: Handles growth in users and data
- **Secure**: Follows industry best practices
- **Maintainable**: Clean code with comprehensive documentation
- **Performant**: Optimized queries and caching
- **Feature-rich**: Supports all frontend requirements

**Good luck with the implementation!** 🚀

---

**Version**: 1.0.0  
**Last Updated**: October 14, 2025  
**Documentation Author**: Development Team
