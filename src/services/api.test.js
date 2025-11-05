import { describe, it, expect, beforeEach } from 'vitest';
import { server } from '../test/mocks/server';
import { http, HttpResponse } from 'msw';

const API_URL = 'http://127.0.0.1:8000/api';

// Simple API client functions
const fetchProperties = async () => {
	const response = await fetch(`${API_URL}/properties/`);
	if (!response.ok) throw new Error('Failed to fetch properties');
	return response.json();
};

const fetchProperty = async (id) => {
	const response = await fetch(`${API_URL}/properties/${id}/`);
	if (!response.ok) throw new Error('Failed to fetch property');
	return response.json();
};

const submitContact = async (data) => {
	const response = await fetch(`${API_URL}/contact/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	if (!response.ok) throw new Error('Failed to submit contact form');
	return response.json();
};

describe('API Service', () => {
	describe('Properties API', () => {
		it('fetches properties list successfully', async () => {
			const data = await fetchProperties();

			expect(data).toHaveProperty('results');
			expect(data.results).toHaveLength(2);
			expect(data.results[0]).toHaveProperty('title');
			expect(data.results[0].title).toBe('Beautiful House');
		});

		it('fetches single property successfully', async () => {
			const data = await fetchProperty(1);

			expect(data).toHaveProperty('id');
			expect(data).toHaveProperty('title');
			expect(data.title).toBe('Beautiful House');
			expect(data.price).toBe(250000);
		});

		it('handles API errors gracefully', async () => {
			// Override handler for this test
			server.use(
				http.get(`${API_URL}/properties/`, () => {
					return new HttpResponse(null, { status: 500 });
				})
			);

			await expect(fetchProperties()).rejects.toThrow('Failed to fetch properties');
		});
	});

	describe('Contact API', () => {
		it('submits contact form successfully', async () => {
			const contactData = {
				name: 'John Doe',
				email: 'john@example.com',
				message: 'Hello!'
			};

			const response = await submitContact(contactData);

			expect(response).toHaveProperty('message');
			expect(response.message).toBe('Contact form submitted successfully');
			expect(response.data).toEqual(contactData);
		});

		it('handles contact form submission errors', async () => {
			// Override handler to return error
			server.use(
				http.post(`${API_URL}/contact/`, () => {
					return new HttpResponse(null, { status: 400 });
				})
			);

			const contactData = {
				name: 'John Doe',
				email: 'invalid-email',
				message: 'Hello!'
			};

			await expect(submitContact(contactData)).rejects.toThrow('Failed to submit contact form');
		});
	});
});
