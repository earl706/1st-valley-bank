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

	// Contact form
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

	// Newsletter
	http.post(`${API_URL}/newsletter/subscribe/`, async ({ request }) => {
		const body = await request.json();
		return HttpResponse.json(
			{
				message: 'Successfully subscribed',
				email: body.email
			},
			{ status: 201 }
		);
	})
];
