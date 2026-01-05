import { describe, it, expect, vi, beforeEach } from 'vitest';
import contactService from './contactService';
import api, { handleApiError } from './api';

// Mock api but keep handleApiError real
vi.mock('./api', async () => {
	const actual = await vi.importActual('./api');
	return {
		...actual,
		default: {
			post: vi.fn(),
			get: vi.fn(),
			put: vi.fn(),
			delete: vi.fn()
		}
	};
});

describe('contactService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('submitContact', () => {
		it('successfully submits contact form', async () => {
			const mockResponse = {
				data: {
					id: 1,
					name: 'John Doe',
					email: 'john@example.com',
					message: 'Test message'
				}
			};

			api.post.mockResolvedValue(mockResponse);

			const formData = {
				name: 'John Doe',
				email: 'john@example.com',
				subject: 'Inquiry',
				contact_number: '09171234567',
				barangay: 'Test Barangay',
				municipality: 'Test City',
				province: 'Test Province',
				message: 'Test message'
			};

			const result = await contactService.submitContact(formData);

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockResponse.data);
			expect(api.post).toHaveBeenCalledWith('/contact/submissions/create/', formData);
		});

		it('handles validation errors (400)', async () => {
			const mockError = {
				response: {
					status: 400,
					data: {
						error: 'Validation Error',
						details: { email: 'Invalid email format' }
					}
				}
			};

			api.post.mockRejectedValue(mockError);

			const formData = {
				name: 'John Doe',
				email: 'invalid-email',
				message: 'Test'
			};

			const result = await contactService.submitContact(formData);

			expect(result.success).toBe(false);
			expect(result.error).toBe('Validation Error');
		});

		it('handles network errors', async () => {
			const mockError = {
				request: {},
				message: 'Network Error'
			};

			api.post.mockRejectedValue(mockError);

			const result = await contactService.submitContact({});

			expect(result.success).toBe(false);
			expect(result.error).toBe('Network Error');
		});

		it('handles server errors (500)', async () => {
			const mockError = {
				response: {
					status: 500,
					data: {}
				}
			};

			api.post.mockRejectedValue(mockError);

			const result = await contactService.submitContact({});

			expect(result.success).toBe(false);
			expect(result.error).toBe('Server Error');
		});

		it('sends complete form data', async () => {
			api.post.mockResolvedValue({ data: { id: 1 } });

			const completeFormData = {
				name: 'Jane Smith',
				email: 'jane@example.com',
				subject: 'Account Inquiry',
				contact_number: '09187654321',
				barangay: 'Barangay 1',
				municipality: 'Manila',
				province: 'Metro Manila',
				message: 'I would like to inquire about opening an account'
			};

			await contactService.submitContact(completeFormData);

			expect(api.post).toHaveBeenCalledWith(
				'/contact/submissions/create/',
				completeFormData
			);
		});
	});
});

