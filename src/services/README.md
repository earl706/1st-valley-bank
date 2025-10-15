# API Services Documentation

## Overview

This directory contains all API service modules for communicating with the Django backend. Each service is organized by feature area and provides a clean interface for making API calls.

## Services

### 1. **authService.js**

Handles user authentication and authorization.

**Methods:**

- `login(username, password)` - Login user
- `logout()` - Logout user
- `refreshToken()` - Refresh access token
- `getCurrentUser()` - Get current logged-in user
- `isAuthenticated()` - Check if user is logged in
- `hasRole(role)` - Check if user has specific role
- `isAdmin()` - Check if user is admin

**Example:**

```javascript
import { authService } from '@/services';

// Login
const result = await authService.login('admin', 'password123');
if (result.success) {
	console.log('Logged in:', result.user);
} else {
	console.error('Login failed:', result.message);
}

// Check if authenticated
const isLoggedIn = authService.isAuthenticated();
```

---

### 2. **newsletterService.js**

Manages newsletter articles and subscriptions.

**Methods:**

- `getNewsletters(params)` - Get all newsletters with pagination
- `getNewsletter(id)` - Get single newsletter
- `createNewsletter(formData)` - Create newsletter (Admin)
- `updateNewsletter(id, data)` - Update newsletter (Admin)
- `patchNewsletter(id, data)` - Partial update (Admin)
- `deleteNewsletter(id)` - Delete newsletter (Admin)
- `subscribe(email)` - Subscribe to newsletter

**Example:**

```javascript
import { newsletterService } from '@/services';

// Get newsletters with pagination
const result = await newsletterService.getNewsletters({
	page: 1,
	page_size: 9,
	status: 'published'
});

if (result.success) {
	const { count, results } = result.data;
	console.log(`Found ${count} newsletters:`, results);
}

// Subscribe to newsletter
const subscribeResult = await newsletterService.subscribe('user@example.com');
```

---

### 3. **contactService.js**

Handles contact form submissions.

**Methods:**

- `submitContact(formData)` - Submit contact form
- `getSubmissions(params)` - Get all submissions (Admin)
- `getSubmission(id)` - Get single submission (Admin)
- `updateSubmission(id, data)` - Update submission status (Admin)

**Example:**

```javascript
import { contactService } from '@/services';

// Submit contact form
const result = await contactService.submitContact({
	name: 'Juan Dela Cruz',
	email: 'juan@example.com',
	subject: 'loans_agriculture',
	contact_number: '+639171234567',
	barangay: 'Poblacion',
	municipality: 'Cagayan de Oro',
	province: 'Misamis Oriental',
	message: 'I would like to inquire about agricultural loans.'
});

if (result.success) {
	console.log('Contact form submitted:', result.data);
}
```

---

### 4. **productService.js**

Manages deposit and loan products.

**Methods:**

- `getDepositProducts(params)` - Get all deposit products
- `getDepositProductsByType(type)` - Get deposits by type
- `getDepositProduct(id)` - Get single deposit product
- `getLoanProducts(params)` - Get all loan products
- `getLoanProductsByType(type)` - Get loans by type
- `getLoanProduct(id)` - Get single loan product

**Example:**

```javascript
import { productService } from '@/services';

// Get all savings accounts
const result = await productService.getDepositProductsByType('savings');

// Get agriculture loans
const loans = await productService.getLoanProductsByType('agriculture');
```

---

### 5. **propertyService.js**

Manages properties for sale (vehicles and real estate).

**Methods:**

- `getProperties(params)` - Get all properties
- `getProperty(id)` - Get single property
- `getVehicles(params)` - Get vehicles only
- `getRealEstate(params)` - Get real estate only
- `getFeaturedProperties()` - Get featured properties

**Example:**

```javascript
import { propertyService } from '@/services';

// Get available vehicles
const result = await propertyService.getVehicles({
	status: 'available',
	page: 1
});

// Get featured properties
const featured = await propertyService.getFeaturedProperties();
```

---

### 6. **locationService.js**

Handles branch and ATM locations.

**Methods:**

- `getBranches(params)` - Get all branches
- `getBranch(id)` - Get single branch
- `getBranchesByRegion(region)` - Get branches by region
- `getATMs(params)` - Get all ATM locations
- `getATM(id)` - Get single ATM
- `findNearest(lat, lng, type)` - Find nearest location

**Example:**

```javascript
import { locationService } from '@/services';

// Get branches in Mindanao
const result = await locationService.getBranchesByRegion('mindanao');

// Find nearest branch
const nearest = await locationService.findNearest(8.4829, 124.6508, 'branch');
```

---

### 7. **homepageService.js**

Manages homepage content (hero, testimonials, FAQs, stats).

**Methods:**

- `getHeroSlides()` - Get carousel slides
- `getTestimonials()` - Get testimonials
- `getFAQs(params)` - Get FAQs
- `getStatistics()` - Get bank statistics
- `getAllContent()` - Get all homepage content at once

**Example:**

```javascript
import { homepageService } from '@/services';

// Get all homepage content
const result = await homepageService.getAllContent();
if (result.success) {
	const { heroSlides, testimonials, faqs, statistics } = result.data;
}

// Get FAQs by category
const loanFaqs = await homepageService.getFAQs({ category: 'loans' });
```

---

### 8. **chatbotService.js**

Handles AI chatbot interactions.

**Methods:**

- `startSession(userIp)` - Start chat session
- `sendMessage(sessionId, message)` - Send message
- `getHistory(sessionId)` - Get chat history
- `endSession(sessionId)` - End session
- `getSessionId()` - Get session ID from storage
- `saveSessionId(sessionId)` - Save session ID
- `clearSessionId()` - Clear session ID

**Example:**

```javascript
import { chatbotService } from '@/services';

// Start chat session
const session = await chatbotService.startSession();
if (session.success) {
	chatbotService.saveSessionId(session.data.session_id);

	// Send message
	const response = await chatbotService.sendMessage(
		session.data.session_id,
		'What loan products do you offer?'
	);

	if (response.success) {
		console.log('AI:', response.data.ai_response.message);
	}
}
```

---

### 9. **advisoryService.js**

Manages advisory gallery images.

**Methods:**

- `getGallery()` - Get all gallery images
- `getImage(id)` - Get single image

**Example:**

```javascript
import { advisoryService } from '@/services';

const result = await advisoryService.getGallery();
if (result.success) {
	console.log('Gallery images:', result.data.images);
}
```

---

### 10. **searchService.js**

Handles global search.

**Methods:**

- `search(query, category)` - Search across all content

**Example:**

```javascript
import { searchService } from '@/services';

const result = await searchService.search('agriculture loan');
if (result.success) {
	console.log('Search results:', result.data);
}
```

---

## API Configuration

### Base Configuration (`api.js`)

The base API configuration includes:

- Axios instance with timeout
- Request interceptor (adds auth token)
- Response interceptor (handles token refresh)
- Error handling utility

### Environment Variables

Create a `.env` file in your project root:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_MAPBOX_ACCESS_TOKEN=your_token_here
```

---

## Error Handling

All services return a consistent response format:

**Success:**

```javascript
{
  success: true,
  data: { ... }
}
```

**Error:**

```javascript
{
  success: false,
  error: 'Error Type',
  message: 'Error description',
  details: { ... } // Validation errors
}
```

**Example:**

```javascript
const result = await newsletterService.getNewsletters();

if (result.success) {
	// Handle success
	console.log(result.data);
} else {
	// Handle error
	console.error(result.message);
	if (result.details) {
		console.error('Validation errors:', result.details);
	}
}
```

---

## Authentication Flow

1. **Login:** Call `authService.login()` - stores tokens in localStorage
2. **API Calls:** Token automatically added to request headers
3. **Token Expiration:** Automatically refreshes token when expired
4. **Logout:** Call `authService.logout()` - clears localStorage

---

## Usage in Components

**React Hook Example:**

```javascript
import { useState, useEffect } from 'react';
import { newsletterService } from '@/services';

function NewsletterList() {
	const [newsletters, setNewsletters] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchNewsletters() {
			setLoading(true);
			const result = await newsletterService.getNewsletters({
				page: 1,
				page_size: 9
			});

			if (result.success) {
				setNewsletters(result.data.results);
			} else {
				setError(result.message);
			}
			setLoading(false);
		}

		fetchNewsletters();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			{newsletters.map((newsletter) => (
				<div key={newsletter.id}>{newsletter.title}</div>
			))}
		</div>
	);
}
```

---

## Best Practices

1. **Always check `success` flag** before using data
2. **Handle errors gracefully** - show user-friendly messages
3. **Use loading states** - show spinners during API calls
4. **Cache data when appropriate** - avoid unnecessary API calls
5. **Validate data** before sending to API
6. **Use TypeScript** (optional) for better type safety

---

## Testing

**Example test with Jest:**

```javascript
import { newsletterService } from '@/services';

// Mock axios
jest.mock('./api');

describe('Newsletter Service', () => {
	it('should fetch newsletters successfully', async () => {
		const result = await newsletterService.getNewsletters();
		expect(result.success).toBe(true);
		expect(result.data).toHaveProperty('results');
	});
});
```

---

## Support

For issues or questions:

- Check the main API documentation: `BACKEND_API_DOCUMENTATION.md`
- Review service-specific code in this directory
- Contact: dev@1stvalleybank.com
