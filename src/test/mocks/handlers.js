import { http, HttpResponse } from 'msw';

const API_URL = 'http://127.0.0.1:8000/api';

export const handlers = [
	// Auth endpoints
	http.post(`${API_URL}/token/`, async ({ request }) => {
		const { email, password } = await request.json();

		if (email === 'test@example.com' && password === 'password123') {
			return HttpResponse.json({
				access: 'mock-access-token',
				refresh: 'mock-refresh-token'
			});
		}

		return new HttpResponse(null, { status: 401 });
	}),

	// Contact endpoints
	http.post(`${API_URL}/contact/submissions/create/`, async ({ request }) => {
		const body = await request.json();
		return HttpResponse.json(
			{
				id: 1,
				...body,
				created_at: new Date().toISOString()
			},
			{ status: 201 }
		);
	}),

	http.post(`${API_URL}/contact/`, async ({ request }) => {
		const body = await request.json();
		return HttpResponse.json(
			{
				message: 'Contact form submitted successfully',
				data: body
			},
			{ status: 201 }
		);
	}),

	// Loans endpoints
	http.get(`${API_URL}/loans/`, ({ request }) => {
		const url = new URL(request.url);
		const loanType = url.searchParams.get('loan_type');
		
		return HttpResponse.json({
			count: 2,
			results: [
				{
					id: 1,
					title: 'Personal Loan',
					loan_type: loanType || 'personal',
					interest_rate: 5.5,
					min_amount: 10000,
					max_amount: 500000,
					is_active: true
				},
				{
					id: 2,
					title: 'Business Loan',
					loan_type: loanType || 'business',
					interest_rate: 6.5,
					min_amount: 50000,
					max_amount: 2000000,
					is_active: true
				}
			]
		});
	}),

	http.get(`${API_URL}/loans/:id/`, ({ params }) => {
		return HttpResponse.json({
			id: params.id,
			title: 'Personal Loan',
			description: 'Flexible personal loan for your needs',
			loan_type: 'personal',
			interest_rate: 5.5,
			min_amount: 10000,
			max_amount: 500000,
			is_active: true
		});
	}),

	// Deposits endpoints
	http.get(`${API_URL}/deposits/`, ({ request }) => {
		const url = new URL(request.url);
		const productType = url.searchParams.get('product_type');
		
		return HttpResponse.json({
			count: 2,
			results: [
				{
					id: 1,
					name: 'Regular Savings Account',
					product_type: productType || 'savings',
					interest_rate: 2.5,
					minimum_balance: 500,
					is_active: true
				},
				{
					id: 2,
					name: 'Time Deposit',
					product_type: productType || 'time_deposit',
					interest_rate: 4.5,
					minimum_balance: 10000,
					is_active: true
				}
			]
		});
	}),

	http.get(`${API_URL}/deposits/requirements/:productType/`, ({ params }) => {
		return HttpResponse.json({
			product_type: params.productType,
			requirements: [
				'Valid ID',
				'Proof of Address',
				'Initial Deposit'
			]
		});
	}),

	// Locations - Branches
	http.get(`${API_URL}/locations/branches/`, ({ request }) => {
		const url = new URL(request.url);
		const region = url.searchParams.get('region');
		
		return HttpResponse.json({
			count: 2,
			results: [
				{
					id: 1,
					name: 'Main Branch',
					region: region || 'ncr',
					address: '123 Main St, Manila',
					phone_number: '02-1234-5678',
					email: 'main@firstvalleybank.com',
					latitude: 14.5995,
					longitude: 120.9842,
					has_atm: true,
					is_active: true
				},
				{
					id: 2,
					name: 'Quezon City Branch',
					region: region || 'ncr',
					address: '456 QC Ave, Quezon City',
					phone_number: '02-8765-4321',
					email: 'qc@firstvalleybank.com',
					latitude: 14.6760,
					longitude: 121.0437,
					has_atm: true,
					is_active: true
				}
			]
		});
	}),

	http.get(`${API_URL}/branches/:id/`, ({ params }) => {
		return HttpResponse.json({
			id: params.id,
			name: 'Main Branch',
			region: 'ncr',
			address: '123 Main St, Manila',
			phone_number: '02-1234-5678',
			email: 'main@firstvalleybank.com',
			latitude: 14.5995,
			longitude: 120.9842,
			has_atm: true,
			is_active: true
		});
	}),

	// Locations - ATMs
	http.get(`${API_URL}/locations/atm-locations/`, () => {
		return HttpResponse.json({
			count: 2,
			results: [
				{
					id: 1,
					name: 'Mall ATM',
					address: 'SM Mall, Manila',
					latitude: 14.5995,
					longitude: 120.9842,
					is_24_hours: true,
					is_active: true
				},
				{
					id: 2,
					name: 'Branch ATM',
					address: 'Main Branch',
					latitude: 14.6760,
					longitude: 121.0437,
					is_24_hours: false,
					is_active: true
				}
			]
		});
	}),

	http.get(`${API_URL}/locations/nearest/`, ({ request }) => {
		const url = new URL(request.url);
		const locationType = url.searchParams.get('type');
		
		return HttpResponse.json({
			count: 1,
			results: [
				{
					id: 1,
					name: 'Nearest Location',
					address: '123 Main St',
					distance: 1.5,
					latitude: 14.5995,
					longitude: 120.9842
				}
			]
		});
	}),

	// Properties endpoints
	http.get(`${API_URL}/properties/`, () => {
		return HttpResponse.json({
			count: 2,
			results: [
				{
					id: 1,
					title: 'Beautiful House',
					price: 250000,
					bedrooms: 3,
					bathrooms: 2,
					status: 'AVAILABLE',
					property_type: 'RESIDENTIAL',
					image: '/images/property1.jpg'
				},
				{
					id: 2,
					title: 'Modern Condo',
					price: 180000,
					bedrooms: 2,
					bathrooms: 1,
					status: 'AVAILABLE',
					property_type: 'RESIDENTIAL',
					image: '/images/property2.jpg'
				}
			]
		});
	}),

	http.get(`${API_URL}/properties/:id/`, ({ params }) => {
		return HttpResponse.json({
			id: params.id,
			title: 'Beautiful House',
			description: 'A lovely property',
			price: 250000,
			bedrooms: 3,
			bathrooms: 2,
			square_feet: 1500,
			status: 'AVAILABLE',
			property_type: 'RESIDENTIAL',
			image: '/images/property.jpg'
		});
	}),

	// Newsletter endpoints
	http.get(`${API_URL}/newsletters/`, () => {
		return HttpResponse.json({
			count: 2,
			results: [
				{
					id: 1,
					title: 'Monthly Newsletter - January',
					content: 'Welcome to our newsletter',
					published_date: '2024-01-01',
					status: 'published',
					category: 'general'
				},
				{
					id: 2,
					title: 'Special Update',
					content: 'Important updates',
					published_date: '2024-01-15',
					status: 'published',
					category: 'updates'
				}
			]
		});
	}),

	http.get(`${API_URL}/newsletters/:id/`, ({ params }) => {
		return HttpResponse.json({
			id: params.id,
			title: 'Monthly Newsletter',
			content: 'Newsletter content here',
			published_date: '2024-01-01',
			status: 'published',
			category: 'general'
		});
	}),

	http.post(`${API_URL}/newsletter/subscribe/`, async ({ request }) => {
		const body = await request.json();
		return HttpResponse.json(
			{
				message: 'Successfully subscribed',
				email: body.email
			},
			{ status: 201 }
		);
	}),

	// Landing page endpoints
	http.get(`${API_URL}/landing/`, () => {
		return HttpResponse.json({
			hero_sections: [
				{
					id: 1,
					title: 'Welcome to First Valley Bank',
					subtitle: 'Your trusted financial partner',
					image: '/images/hero.jpg'
				}
			],
			services: [
				{
					id: 1,
					title: 'Savings Account',
					description: 'Save with confidence',
					icon: 'savings'
				},
				{
					id: 2,
					title: 'Loans',
					description: 'Flexible loan options',
					icon: 'loan'
				}
			],
			testimonials: [
				{
					id: 1,
					name: 'Juan Dela Cruz',
					role: 'Business Owner',
					content: 'Excellent service!',
					rating: 5
				}
			],
			team_members: [
				{
					id: 1,
					name: 'Maria Santos',
					role: 'Branch Manager',
					image: '/images/team1.jpg'
				}
			]
		});
	}),

	http.get(`${API_URL}/landing/services/`, () => {
		return HttpResponse.json([
			{
				id: 1,
				title: 'Savings Account',
				description: 'Save with confidence',
				icon: 'savings',
				is_active: true
			},
			{
				id: 2,
				title: 'Loans',
				description: 'Flexible loan options',
				icon: 'loan',
				is_active: true
			}
		]);
	}),

	http.get(`${API_URL}/landing/testimonials/`, () => {
		return HttpResponse.json([
			{
				id: 1,
				name: 'Juan Dela Cruz',
				role: 'Business Owner',
				content: 'Excellent service!',
				rating: 5,
				is_active: true
			}
		]);
	}),

	http.get(`${API_URL}/landing/team-members/`, () => {
		return HttpResponse.json([
			{
				id: 1,
				name: 'Maria Santos',
				role: 'Branch Manager',
				image: '/images/team1.jpg',
				is_active: true
			}
		]);
	}),

	http.get(`${API_URL}/landing/faqs/`, () => {
		return HttpResponse.json([
			{
				id: 1,
				question: 'How do I open an account?',
				answer: 'Visit any branch with valid ID',
				category: 'accounts'
			}
		]);
	}),

	// Footer endpoint
	http.get(`${API_URL}/landing/footer/`, () => {
		return HttpResponse.json({
			id: 1,
			about_text: 'First Valley Bank - Serving since 1978',
			contact_email: 'info@firstvalleybank.com',
			contact_phone: '02-1234-5678',
			social_links: [
				{ platform: 'facebook', url: 'https://facebook.com/fvb' },
				{ platform: 'twitter', url: 'https://twitter.com/fvb' }
			],
			quick_links: [
				{ title: 'About Us', url: '/about' },
				{ title: 'Contact', url: '/contact' }
			]
		});
	}),

	// Advisory endpoints
	http.get(`${API_URL}/advisory/`, () => {
		return HttpResponse.json({
			count: 1,
			results: [
				{
					id: 1,
					title: 'Important Advisory',
					content: 'Please be aware of...',
					published_date: '2024-01-01',
					is_active: true
				}
			]
		});
	}),

	// Annual reports
	http.get(`${API_URL}/annual-reports/`, () => {
		return HttpResponse.json({
			count: 1,
			results: [
				{
					id: 1,
					year: 2023,
					title: 'Annual Report 2023',
					pdf_file: '/reports/2023.pdf'
				}
			]
		});
	}),

	// Search endpoint
	http.get(`${API_URL}/search/`, ({ request }) => {
		const url = new URL(request.url);
		const query = url.searchParams.get('q');
		
		return HttpResponse.json({
			results: [
				{
					type: 'page',
					title: 'Savings Account',
					url: '/deposits/savings',
					excerpt: 'Information about savings accounts'
				}
			],
			count: 1,
			query: query
		});
	}),

	// Search suggestions
	http.get(`${API_URL}/search/suggestions/`, ({ request }) => {
		const url = new URL(request.url);
		const query = url.searchParams.get('q');
		
		return HttpResponse.json({
			suggestions: ['savings account', 'loans', 'branches']
		});
	}),

	// Chatbot endpoints
	http.post(`${API_URL}/chatbot/sessions/start/`, () => {
		return HttpResponse.json({
			session_id: 'test-session-123',
			message: 'Hello! How can I help you today?'
		});
	}),

	http.post(`${API_URL}/chatbot/sessions/:sessionId/message/`, async ({ request }) => {
		const body = await request.json();
		return HttpResponse.json({
			response: 'This is a test response',
			session_id: 'test-session-123'
		});
	}),

	// Success stories
	http.get(`${API_URL}/success-stories/`, () => {
		return HttpResponse.json({
			count: 1,
			results: [
				{
					id: 1,
					title: 'Success Story',
					content: 'A great success',
					loan_type: 'business'
				}
			]
		});
	}),

	// About page endpoints
	http.get(`${API_URL}/about/`, () => {
		return HttpResponse.json({
			mission: 'Our mission',
			vision: 'Our vision',
			history: 'Our history',
			services: []
		});
	}),

	// Sustainability endpoint
	http.get(`${API_URL}/sustainability/`, () => {
		return HttpResponse.json({
			title: 'Sustainability Initiatives',
			content: 'Our commitment to sustainability'
		});
	}),

	// Careers endpoint
	http.get(`${API_URL}/careers/`, () => {
		return HttpResponse.json({
			positions: [
				{
					id: 1,
					title: 'Bank Teller',
					location: 'Manila',
					description: 'Join our team'
				}
			]
		});
	}),

	// Privacy policy
	http.get(`${API_URL}/privacy-policy/`, () => {
		return HttpResponse.json({
			title: 'Privacy Policy',
			content: 'Our privacy policy content'
		});
	})
];
