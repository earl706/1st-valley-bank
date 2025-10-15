# First Valley Bank - Database Schema & Testing Guide

## Database Schema (ERD)

### Entity Relationship Diagram (Text Format)

```
┌─────────────────────────┐
│       users             │
├─────────────────────────┤
│ PK id                   │
│    username             │
│    email                │
│    password             │
│    first_name           │
│    last_name            │
│    role                 │ ◄── ENUM: admin, editor, viewer
│    phone_number         │
│    created_at           │
│    updated_at           │
└─────────────────────────┘
         │
         │ 1:N
         ├────────────────────────┐
         │                        │
         ▼                        ▼
┌─────────────────────────┐  ┌─────────────────────────┐
│    newsletters          │  │    audit_logs           │
├─────────────────────────┤  ├─────────────────────────┤
│ PK id                   │  │ PK id                   │
│    title                │  │ FK user_id              │
│    subtitle             │  │    action               │
│    description          │  │    model_name           │
│    image                │  │    object_id            │
│    pdf_file             │  │    changes (JSON)       │
│    status               │  │    ip_address           │
│    views                │  │    user_agent           │
│    read_time            │  │    timestamp            │
│    published_date       │  └─────────────────────────┘
│    created_at           │
│    updated_at           │
│ FK created_by           │
└─────────────────────────┘

┌─────────────────────────┐
│ newsletter_subscribers  │
├─────────────────────────┤
│ PK id                   │
│    email (UNIQUE)       │
│    is_active            │
│    subscribed_at        │
│    unsubscribed_at      │
└─────────────────────────┘

┌─────────────────────────┐
│  contact_submissions    │
├─────────────────────────┤
│ PK id                   │
│    name                 │
│    email                │
│    subject              │
│    contact_number       │
│    barangay             │
│    municipality         │
│    province             │
│    latitude             │
│    longitude            │
│    full_address         │
│    message              │
│    status               │ ◄── ENUM: new, in_progress, resolved, closed
│    admin_notes          │
│    created_at           │
│    updated_at           │
└─────────────────────────┘

┌─────────────────────────┐
│   deposit_products      │
├─────────────────────────┤
│ PK id                   │
│    product_type         │ ◄── ENUM: savings, checking, time_deposit
│    name                 │
│    subtitle             │
│    description          │
│    image                │
│    required_initial_    │
│      deposit            │
│    required_monthly_adb │
│    required_monthly_adb_│
│      to_earn_interest   │
│    interest_rate_below  │
│    interest_rate_above  │
│    features (JSON)      │
│    is_active            │
│    display_order        │
│    created_at           │
│    updated_at           │
└─────────────────────────┘

┌─────────────────────────┐
│     loan_products       │
├─────────────────────────┤
│ PK id                   │
│    loan_type            │ ◄── ENUM: agriculture, sme, microfinance, etc.
│    title                │
│    subtitle             │
│    description          │
│    full_description     │
│    image                │
│    min_amount           │
│    max_amount           │
│    interest_rate        │
│    term_options (JSON)  │
│    requirements (JSON)  │
│    features (JSON)      │
│    is_active            │
│    display_order        │
│    created_at           │
│    updated_at           │
└─────────────────────────┘

┌─────────────────────────┐
│  properties_for_sale    │
├─────────────────────────┤
│ PK id                   │
│    property_type        │ ◄── ENUM: vehicle, real_estate
│    title                │
│    location             │
│    price                │
│    description          │
│    main_image           │
│    additional_images    │
│      (JSON)             │
│                         │
│ -- Vehicle fields --    │
│    year                 │
│    plate_number         │
│    make                 │
│    model                │
│                         │
│ -- Real Estate fields --│
│    property_code        │
│    area                 │
│    tct_number           │
│    date_acquired        │
│                         │
│    status               │ ◄── ENUM: available, reserved, sold
│    is_featured          │
│    created_at           │
│    updated_at           │
└─────────────────────────┘

┌─────────────────────────┐
│       branches          │
├─────────────────────────┤
│ PK id                   │
│    name                 │
│    region               │ ◄── ENUM: mindanao, visayas, luzon, ncr
│    address              │
│    phone_number         │
│    email                │
│    latitude             │
│    longitude            │
│    has_atm              │
│    is_main_office       │
│    operating_hours      │
│      (JSON)             │
│    is_active            │
│    display_order        │
│    created_at           │
│    updated_at           │
└─────────────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────────────┐
│    atm_locations        │
├─────────────────────────┤
│ PK id                   │
│    name                 │
│    address              │
│    latitude             │
│    longitude            │
│ FK branch_id (nullable) │
│    is_24_hours          │
│    operating_hours      │
│    is_active            │
│    created_at           │
│    updated_at           │
└─────────────────────────┘

┌─────────────────────────┐
│      hero_slides        │
├─────────────────────────┤
│ PK id                   │
│    title                │
│    subtitle             │
│    description          │
│    image                │
│    image_alt            │
│    button_text          │
│    button_route         │
│    is_active            │
│    display_order        │
│    created_at           │
│    updated_at           │
└─────────────────────────┘

┌─────────────────────────┐
│     testimonials        │
├─────────────────────────┤
│ PK id                   │
│    name                 │
│    role                 │
│    content              │
│    rating               │ ◄── 1-5 stars
│    image                │
│    is_active            │
│    display_order        │
│    created_at           │
└─────────────────────────┘

┌─────────────────────────┐
│         faqs            │
├─────────────────────────┤
│ PK id                   │
│    category             │ ◄── ENUM: accounts, loans, etc.
│    question             │
│    answer               │
│    is_active            │
│    display_order        │
│    created_at           │
│    updated_at           │
└─────────────────────────┘

┌─────────────────────────┐
│   bank_statistics       │
├─────────────────────────┤
│ PK id                   │
│    label                │
│    value                │
│    is_active            │
│    display_order        │
│    created_at           │
│    updated_at           │
└─────────────────────────┘

┌─────────────────────────┐
│   advisory_images       │
├─────────────────────────┤
│ PK id                   │
│    title                │
│    image                │
│    alt_text             │
│    description          │
│    is_active            │
│    display_order        │
│    created_at           │
│    updated_at           │
└─────────────────────────┘

┌─────────────────────────┐
│    chat_sessions        │
├─────────────────────────┤
│ PK session_id (UUID)    │
│    user_ip              │
│    started_at           │
│    ended_at             │
│    is_active            │
└─────────────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────────────┐
│    chat_messages        │
├─────────────────────────┤
│ PK id                   │
│ FK session_id           │
│    sender               │ ◄── ENUM: user, ai
│    message              │
│    timestamp            │
│    ai_model             │
│    tokens_used          │
└─────────────────────────┘
```

---

## Database Indexes

### Critical Indexes for Performance

```sql
-- newsletters
CREATE INDEX idx_newsletters_status_published ON newsletters(status, published_date DESC);
CREATE INDEX idx_newsletters_created_at ON newsletters(created_at DESC);

-- contact_submissions
CREATE INDEX idx_contact_status_created ON contact_submissions(status, created_at DESC);
CREATE INDEX idx_contact_email ON contact_submissions(email);

-- deposit_products
CREATE INDEX idx_deposit_type_active ON deposit_products(product_type, is_active);
CREATE INDEX idx_deposit_order ON deposit_products(display_order);

-- loan_products
CREATE INDEX idx_loan_type_active ON loan_products(loan_type, is_active);
CREATE INDEX idx_loan_order ON loan_products(display_order);

-- properties_for_sale
CREATE INDEX idx_property_type_status ON properties_for_sale(property_type, status);
CREATE INDEX idx_property_featured ON properties_for_sale(is_featured, created_at DESC);

-- branches
CREATE INDEX idx_branches_region_active ON branches(region, is_active);

-- atm_locations
CREATE INDEX idx_atm_branch ON atm_locations(branch_id);

-- chat_messages
CREATE INDEX idx_chat_session ON chat_messages(session_id, timestamp);

-- audit_logs
CREATE INDEX idx_audit_user_timestamp ON audit_logs(user_id, timestamp DESC);
CREATE INDEX idx_audit_model ON audit_logs(model_name, timestamp DESC);
```

---

## Sample Data SQL

### Insert Sample Users

```sql
-- Insert admin user (password: admin123)
INSERT INTO users (username, email, password, first_name, last_name, role, created_at, updated_at)
VALUES ('admin', 'admin@1stvalleybank.com', 'pbkdf2_sha256$...', 'Admin', 'User', 'admin', NOW(), NOW());

-- Insert editor user
INSERT INTO users (username, email, password, first_name, last_name, role, created_at, updated_at)
VALUES ('editor', 'editor@1stvalleybank.com', 'pbkdf2_sha256$...', 'Editor', 'User', 'editor', NOW(), NOW());
```

### Insert Sample Branches

```sql
INSERT INTO branches (name, region, address, phone_number, email, latitude, longitude, has_atm, is_main_office, operating_hours, is_active, display_order, created_at, updated_at)
VALUES
('Head Office', 'mindanao', 'Main Ave, Cagayan de Oro City', '+63 88 123 4567', 'headoffice@1stvalleybank.com', 8.4829, 124.6508, true, true, '{"monday": "09:00-17:00", "tuesday": "09:00-17:00", "wednesday": "09:00-17:00", "thursday": "09:00-17:00", "friday": "09:00-17:00", "saturday": "09:00-12:00", "sunday": "Closed"}', true, 1, NOW(), NOW()),
('Davao Branch', 'mindanao', '123 J.P. Laurel Ave, Davao City', '+63 82 123 4567', 'davao@1stvalleybank.com', 7.0731, 125.6128, true, false, '{"monday": "09:00-17:00", "tuesday": "09:00-17:00", "wednesday": "09:00-17:00", "thursday": "09:00-17:00", "friday": "09:00-17:00", "saturday": "09:00-12:00", "sunday": "Closed"}', true, 2, NOW(), NOW()),
('Cebu Branch', 'visayas', '101 Ayala Center, Cebu City', '+63 32 123 4567', 'cebu@1stvalleybank.com', 10.3157, 123.8854, false, false, '{"monday": "09:00-17:00", "tuesday": "09:00-17:00", "wednesday": "09:00-17:00", "thursday": "09:00-17:00", "friday": "09:00-17:00", "saturday": "09:00-12:00", "sunday": "Closed"}', true, 3, NOW(), NOW());
```

### Insert Sample FAQs

```sql
INSERT INTO faqs (category, question, answer, is_active, display_order, created_at, updated_at)
VALUES
('accounts', 'How do I open a new account at 1st Valley Bank?', 'Opening a new account is easy! Visit your nearest 1st Valley Bank branch with a valid ID and proof of address. Our friendly staff will guide you through the application process.', true, 1, NOW(), NOW()),
('loans', 'What types of loans does 1st Valley Bank offer?', 'We offer a range of loans including personal, business, agricultural, and property loans. Check our Loans page to learn more.', true, 2, NOW(), NOW()),
('general', 'What are your banking hours?', 'Our branches are open Monday to Friday from 9:00 AM to 5:00 PM, and Saturday from 9:00 AM to 12:00 PM. ATMs are available 24/7.', true, 3, NOW(), NOW());
```

---

## Postman Collection Structure

### Collection: First Valley Bank API

```json
{
	"info": {
		"name": "1st Valley Bank API",
		"description": "API endpoints for First Valley Bank web application",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"variable": [
		{
			"key": "base_url",
			"value": "http://localhost:8000"
		},
		{
			"key": "access_token",
			"value": ""
		}
	],
	"item": [
		{
			"name": "Authentication",
			"item": [
				{
					"name": "Login",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"username\": \"admin\",\n  \"password\": \"admin123\"\n}"
						},
						"url": {
							"raw": "{{base_url}}/api/auth/login/",
							"host": ["{{base_url}}"],
							"path": ["api", "auth", "login", ""]
						}
					},
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									"var jsonData = pm.response.json();",
									"pm.environment.set(\"access_token\", jsonData.access);"
								]
							}
						}
					]
				},
				{
					"name": "Refresh Token",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"refresh\": \"{{refresh_token}}\"\n}"
						},
						"url": {
							"raw": "{{base_url}}/api/auth/refresh/",
							"host": ["{{base_url}}"],
							"path": ["api", "auth", "refresh", ""]
						}
					}
				},
				{
					"name": "Logout",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer {{access_token}}"
							}
						],
						"url": {
							"raw": "{{base_url}}/api/auth/logout/",
							"host": ["{{base_url}}"],
							"path": ["api", "auth", "logout", ""]
						}
					}
				}
			]
		},
		{
			"name": "Newsletters",
			"item": [
				{
					"name": "List Newsletters",
					"request": {
						"method": "GET",
						"url": {
							"raw": "{{base_url}}/api/newsletters/?page=1&page_size=9",
							"host": ["{{base_url}}"],
							"path": ["api", "newsletters", ""],
							"query": [
								{
									"key": "page",
									"value": "1"
								},
								{
									"key": "page_size",
									"value": "9"
								}
							]
						}
					}
				},
				{
					"name": "Get Newsletter Detail",
					"request": {
						"method": "GET",
						"url": {
							"raw": "{{base_url}}/api/newsletters/1/",
							"host": ["{{base_url}}"],
							"path": ["api", "newsletters", "1", ""]
						}
					}
				},
				{
					"name": "Create Newsletter",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer {{access_token}}"
							},
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"title\": \"New Newsletter\",\n  \"subtitle\": \"Subtitle here\",\n  \"description\": \"Description...\",\n  \"status\": \"draft\",\n  \"read_time\": \"5 min\"\n}"
						},
						"url": {
							"raw": "{{base_url}}/api/newsletters/",
							"host": ["{{base_url}}"],
							"path": ["api", "newsletters", ""]
						}
					}
				},
				{
					"name": "Subscribe to Newsletter",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"email\": \"user@example.com\"\n}"
						},
						"url": {
							"raw": "{{base_url}}/api/newsletters/subscribe/",
							"host": ["{{base_url}}"],
							"path": ["api", "newsletters", "subscribe", ""]
						}
					}
				}
			]
		},
		{
			"name": "Contact",
			"item": [
				{
					"name": "Submit Contact Form",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"name\": \"Juan Dela Cruz\",\n  \"email\": \"juan@example.com\",\n  \"subject\": \"loans_agriculture\",\n  \"contact_number\": \"+639171234567\",\n  \"barangay\": \"Poblacion\",\n  \"municipality\": \"Cagayan de Oro\",\n  \"province\": \"Misamis Oriental\",\n  \"message\": \"I would like to inquire about agricultural loans.\"\n}"
						},
						"url": {
							"raw": "{{base_url}}/api/contact/submit/",
							"host": ["{{base_url}}"],
							"path": ["api", "contact", "submit", ""]
						}
					}
				},
				{
					"name": "List Contact Submissions (Admin)",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer {{access_token}}"
							}
						],
						"url": {
							"raw": "{{base_url}}/api/contact/submissions/?status=new",
							"host": ["{{base_url}}"],
							"path": ["api", "contact", "submissions", ""],
							"query": [
								{
									"key": "status",
									"value": "new"
								}
							]
						}
					}
				}
			]
		},
		{
			"name": "Deposits",
			"item": [
				{
					"name": "List Deposit Products",
					"request": {
						"method": "GET",
						"url": {
							"raw": "{{base_url}}/api/deposits/",
							"host": ["{{base_url}}"],
							"path": ["api", "deposits", ""]
						}
					}
				},
				{
					"name": "Get Savings Products",
					"request": {
						"method": "GET",
						"url": {
							"raw": "{{base_url}}/api/deposits/savings/",
							"host": ["{{base_url}}"],
							"path": ["api", "deposits", "savings", ""]
						}
					}
				}
			]
		},
		{
			"name": "Loans",
			"item": [
				{
					"name": "List Loan Products",
					"request": {
						"method": "GET",
						"url": {
							"raw": "{{base_url}}/api/loans/",
							"host": ["{{base_url}}"],
							"path": ["api", "loans", ""]
						}
					}
				},
				{
					"name": "Get Agriculture Loans",
					"request": {
						"method": "GET",
						"url": {
							"raw": "{{base_url}}/api/loans/agriculture/",
							"host": ["{{base_url}}"],
							"path": ["api", "loans", "agriculture", ""]
						}
					}
				}
			]
		},
		{
			"name": "Properties",
			"item": [
				{
					"name": "List Properties",
					"request": {
						"method": "GET",
						"url": {
							"raw": "{{base_url}}/api/properties/?property_type=vehicle&status=available",
							"host": ["{{base_url}}"],
							"path": ["api", "properties", ""],
							"query": [
								{
									"key": "property_type",
									"value": "vehicle"
								},
								{
									"key": "status",
									"value": "available"
								}
							]
						}
					}
				}
			]
		},
		{
			"name": "Branches & ATMs",
			"item": [
				{
					"name": "List Branches",
					"request": {
						"method": "GET",
						"url": {
							"raw": "{{base_url}}/api/branches/",
							"host": ["{{base_url}}"],
							"path": ["api", "branches", ""]
						}
					}
				},
				{
					"name": "List ATM Locations",
					"request": {
						"method": "GET",
						"url": {
							"raw": "{{base_url}}/api/atms/",
							"host": ["{{base_url}}"],
							"path": ["api", "atms", ""]
						}
					}
				}
			]
		},
		{
			"name": "Homepage Content",
			"item": [
				{
					"name": "Get Hero Slides",
					"request": {
						"method": "GET",
						"url": {
							"raw": "{{base_url}}/api/homepage/hero-slides/",
							"host": ["{{base_url}}"],
							"path": ["api", "homepage", "hero-slides", ""]
						}
					}
				},
				{
					"name": "Get Testimonials",
					"request": {
						"method": "GET",
						"url": {
							"raw": "{{base_url}}/api/homepage/testimonials/",
							"host": ["{{base_url}}"],
							"path": ["api", "homepage", "testimonials", ""]
						}
					}
				},
				{
					"name": "Get FAQs",
					"request": {
						"method": "GET",
						"url": {
							"raw": "{{base_url}}/api/homepage/faqs/",
							"host": ["{{base_url}}"],
							"path": ["api", "homepage", "faqs", ""]
						}
					}
				}
			]
		},
		{
			"name": "Chatbot",
			"item": [
				{
					"name": "Start Chat Session",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"user_ip\": \"192.168.1.1\"\n}"
						},
						"url": {
							"raw": "{{base_url}}/api/chatbot/session/start/",
							"host": ["{{base_url}}"],
							"path": ["api", "chatbot", "session", "start", ""]
						}
					},
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									"var jsonData = pm.response.json();",
									"pm.environment.set(\"session_id\", jsonData.session_id);"
								]
							}
						}
					]
				},
				{
					"name": "Send Message",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"session_id\": \"{{session_id}}\",\n  \"message\": \"What loan products do you offer?\"\n}"
						},
						"url": {
							"raw": "{{base_url}}/api/chatbot/message/",
							"host": ["{{base_url}}"],
							"path": ["api", "chatbot", "message", ""]
						}
					}
				}
			]
		}
	]
}
```

---

## Testing Scenarios

### 1. Newsletter Management Flow

```bash
# Step 1: Admin logs in
POST /api/auth/login/
{
  "username": "admin",
  "password": "admin123"
}
# Save access_token from response

# Step 2: Create newsletter (draft)
POST /api/newsletters/
Authorization: Bearer {access_token}
{
  "title": "Q4 2025 Financial Tips",
  "subtitle": "Plan Your Year-End Savings",
  "description": "Learn how to maximize your savings...",
  "status": "draft",
  "read_time": "7 min"
}
# Save newsletter ID

# Step 3: Update newsletter (publish)
PATCH /api/newsletters/{id}/
Authorization: Bearer {access_token}
{
  "status": "published",
  "published_date": "2025-10-15T10:00:00Z"
}

# Step 4: Public user views newsletter
GET /api/newsletters/
# Should see published newsletter

# Step 5: Public user views detail (increments view count)
GET /api/newsletters/{id}/
```

### 2. Contact Form Submission Flow

```bash
# Step 1: User submits contact form
POST /api/contact/submit/
{
  "name": "Maria Santos",
  "email": "maria@example.com",
  "subject": "loans_sme",
  "contact_number": "+639171234567",
  "barangay": "Poblacion",
  "municipality": "Cagayan de Oro",
  "province": "Misamis Oriental",
  "message": "I'm interested in SME loans for my sari-sari store."
}
# Backend: Geocodes address, sends emails, stores in DB

# Step 2: Admin reviews submission
GET /api/contact/submissions/?status=new
Authorization: Bearer {access_token}

# Step 3: Admin updates status
PATCH /api/contact/submissions/{id}/
Authorization: Bearer {access_token}
{
  "status": "in_progress",
  "admin_notes": "Called customer, scheduled meeting for Oct 16"
}
```

### 3. Chatbot Interaction Flow

```bash
# Step 1: Start chat session
POST /api/chatbot/session/start/
{
  "user_ip": "203.177.123.45"
}
# Save session_id

# Step 2: User asks question
POST /api/chatbot/message/
{
  "session_id": "{session_id}",
  "message": "What are the requirements for a salary loan?"
}

# Step 3: Follow-up question
POST /api/chatbot/message/
{
  "session_id": "{session_id}",
  "message": "How much can I borrow?"
}

# Step 4: Get chat history
GET /api/chatbot/session/{session_id}/history/

# Step 5: End session
POST /api/chatbot/session/{session_id}/end/
```

---

## Performance Testing

### Load Testing with Apache Bench

```bash
# Test newsletter list endpoint
ab -n 1000 -c 10 http://localhost:8000/api/newsletters/

# Test with authentication
ab -n 100 -c 5 -H "Authorization: Bearer {token}" \
   http://localhost:8000/api/contact/submissions/
```

### Expected Performance Metrics

| Endpoint                   | Expected Response Time | Max Concurrent Users |
| -------------------------- | ---------------------- | -------------------- |
| GET /api/newsletters/      | < 200ms                | 100+                 |
| POST /api/contact/submit/  | < 500ms                | 50+                  |
| POST /api/chatbot/message/ | < 2000ms               | 20+                  |
| GET /api/branches/         | < 100ms                | 200+                 |

---

## Error Handling Examples

### Validation Error Response

```json
{
	"error": "Validation failed",
	"details": {
		"email": ["Enter a valid email address."],
		"contact_number": ["This field is required."]
	}
}
```

### Authentication Error

```json
{
	"error": "Authentication failed",
	"detail": "Invalid credentials"
}
```

### Permission Error

```json
{
	"error": "Permission denied",
	"detail": "You do not have permission to perform this action."
}
```

### Rate Limit Error

```json
{
	"error": "Rate limit exceeded",
	"detail": "Too many requests. Please try again in 60 seconds."
}
```

---

## Database Backup & Restore

### Backup PostgreSQL Database

```bash
# Create backup
pg_dump -U fvb_user -h localhost first_valley_bank > backup_$(date +%Y%m%d).sql

# Create backup with compression
pg_dump -U fvb_user -h localhost first_valley_bank | gzip > backup_$(date +%Y%m%d).sql.gz
```

### Restore Database

```bash
# Restore from backup
psql -U fvb_user -h localhost first_valley_bank < backup_20251014.sql

# Restore from compressed backup
gunzip -c backup_20251014.sql.gz | psql -U fvb_user -h localhost first_valley_bank
```

---

## Monitoring Queries

### Check Active Connections

```sql
SELECT
    datname,
    count(*) as connections
FROM pg_stat_activity
GROUP BY datname;
```

### Find Slow Queries

```sql
SELECT
    query,
    calls,
    total_time,
    mean_time,
    max_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

### Check Table Sizes

```sql
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
LIMIT 20;
```

---

## API Rate Limiting Configuration

```python
# settings.py
RATELIMIT_ENABLE = True

# Rate limits per endpoint
RATELIMIT_CONFIG = {
    'contact_submit': '5/m',  # 5 requests per minute
    'newsletter_create': '10/h',  # 10 requests per hour
    'chatbot_message': '30/m',  # 30 messages per minute
    'default': '100/h',  # Default rate limit
}
```

---

## Summary

This document provides:

- ✅ Complete database schema with relationships
- ✅ Index recommendations for performance
- ✅ Sample data SQL scripts
- ✅ Postman collection structure
- ✅ Testing scenarios and flows
- ✅ Performance benchmarks
- ✅ Error handling examples
- ✅ Database backup/restore procedures
- ✅ Monitoring queries

Use this in conjunction with:

- `BACKEND_API_DOCUMENTATION.md` - Complete API reference
- `BACKEND_SETUP_GUIDE.md` - Setup and installation guide

---

**Happy Testing!** 🧪
