import { describe, it, expect, vi, beforeEach } from 'vitest';
import newsletterService from './newsletterService';
import api from './api';

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

describe('newsletterService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getNewsletters', () => {
		it('fetches newsletters with default params', async () => {
			const mockNewsletters = {
				count: 2,
				results: [
					{
						id: 1,
						title: 'January Newsletter',
						status: 'published',
						published_date: '2024-01-01'
					},
					{
						id: 2,
						title: 'February Newsletter',
						status: 'published',
						published_date: '2024-02-01'
					}
				]
			};

			api.get.mockResolvedValue({ data: mockNewsletters });

			const result = await newsletterService.getNewsletters();

			expect(result).toEqual(mockNewsletters);
			expect(api.get).toHaveBeenCalledWith('/newsletter/newsletters/', { params: {} });
		});

		it('applies pagination params', async () => {
			api.get.mockResolvedValue({ data: { count: 0, results: [] } });

			await newsletterService.getNewsletters({ page: 2, page_size: 10 });

			expect(api.get).toHaveBeenCalledWith('/newsletter/newsletters/', {
				params: { page: 2, page_size: 10 }
			});
		});

		it('filters by status', async () => {
			api.get.mockResolvedValue({ data: { count: 0, results: [] } });

			await newsletterService.getNewsletters({ status: 'published' });

			expect(api.get).toHaveBeenCalledWith('/newsletter/newsletters/', {
				params: { status: 'published' }
			});
		});

		it('applies search term', async () => {
			api.get.mockResolvedValue({ data: { count: 0, results: [] } });

			await newsletterService.getNewsletters({ search: 'january' });

			expect(api.get).toHaveBeenCalledWith('/newsletter/newsletters/', {
				params: { search: 'january' }
			});
		});

		it('handles API errors', async () => {
			api.get.mockRejectedValue({
				response: { status: 500, data: {} }
			});

			const result = await newsletterService.getNewsletters();

			expect(result.success).toBe(false);
			expect(result.error).toBe('Server Error');
		});
	});

	describe('getNewsletter', () => {
		it('fetches single newsletter by ID', async () => {
			const mockNewsletter = {
				id: 1,
				title: 'January Newsletter',
				content: 'Newsletter content',
				status: 'published'
			};

			api.get.mockResolvedValue({ data: mockNewsletter });

			const result = await newsletterService.getNewsletter(1);

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockNewsletter);
			expect(api.get).toHaveBeenCalledWith('/newsletter/newsletters/1/');
		});

		it('handles newsletter not found', async () => {
			api.get.mockRejectedValue({
				response: { status: 404, data: {} }
			});

			const result = await newsletterService.getNewsletter(999);

			expect(result.success).toBe(false);
			expect(result.error).toBe('Not Found');
		});
	});

	describe('createNewsletter', () => {
		it('creates newsletter with FormData', async () => {
			const mockNewsletter = {
				id: 1,
				title: 'New Newsletter'
			};

			api.post.mockResolvedValue({ data: mockNewsletter });

			const formData = new FormData();
			formData.append('title', 'New Newsletter');
			formData.append('content', 'Content here');

			const result = await newsletterService.createNewsletter(formData);

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockNewsletter);
			expect(api.post).toHaveBeenCalledWith(
				'/newsletters/',
				formData,
				{ headers: { 'Content-Type': 'multipart/form-data' } }
			);
		});

		it('handles validation errors', async () => {
			api.post.mockRejectedValue({
				response: {
					status: 400,
					data: { error: 'Validation Error' }
				}
			});

			const result = await newsletterService.createNewsletter(new FormData());

			expect(result.success).toBe(false);
			expect(result.error).toBe('Validation Error');
		});

		it('handles authentication errors', async () => {
			api.post.mockRejectedValue({
				response: { status: 401, data: {} }
			});

			const result = await newsletterService.createNewsletter(new FormData());

			expect(result.success).toBe(false);
			expect(result.error).toBe('Authentication Error');
		});
	});

	describe('updateNewsletter', () => {
		it('updates newsletter with FormData', async () => {
			const mockUpdated = {
				id: 1,
				title: 'Updated Newsletter'
			};

			api.put.mockResolvedValue({ data: mockUpdated });

			const formData = new FormData();
			formData.append('title', 'Updated Newsletter');

			const result = await newsletterService.updateNewsletter(1, formData);

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockUpdated);
			expect(api.put).toHaveBeenCalledWith(
				'/newsletters/1/',
				formData,
				{ headers: { 'Content-Type': 'multipart/form-data' } }
			);
		});

		it('updates newsletter with regular object', async () => {
			const mockUpdated = {
				id: 1,
				title: 'Updated Newsletter'
			};

			api.put.mockResolvedValue({ data: mockUpdated });

			const updateData = { title: 'Updated Newsletter' };

			const result = await newsletterService.updateNewsletter(1, updateData);

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockUpdated);
			expect(api.put).toHaveBeenCalledWith('/newsletters/1/', updateData, {});
		});

		it('handles not found error', async () => {
			api.put.mockRejectedValue({
				response: { status: 404, data: {} }
			});

			const result = await newsletterService.updateNewsletter(999, {});

			expect(result.success).toBe(false);
			expect(result.error).toBe('Not Found');
		});
	});

	describe('subscribe', () => {
		it('subscribes with valid email', async () => {
			const mockResponse = {
				message: 'Successfully subscribed',
				email: 'test@example.com'
			};

			api.post.mockResolvedValue({ data: mockResponse });

			const result = await newsletterService.subscribe('test@example.com');

			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockResponse);
			expect(api.post).toHaveBeenCalledWith('/newsletter/subscribers/', {
				email: 'test@example.com'
			});
		});

		it('handles invalid email error', async () => {
			api.post.mockRejectedValue({
				response: {
					status: 400,
					data: { error: 'Validation Error' }
				}
			});

			const result = await newsletterService.subscribe('invalid-email');

			expect(result.success).toBe(false);
			expect(result.error).toBe('Validation Error');
		});

		it('handles duplicate subscription error', async () => {
			api.post.mockRejectedValue({
				response: {
					status: 400,
					data: { error: 'Already subscribed' }
				}
			});

			const result = await newsletterService.subscribe('test@example.com');

			expect(result.success).toBe(false);
		});

		it('handles network errors', async () => {
			api.post.mockRejectedValue({
				request: {},
				message: 'Network Error'
			});

			const result = await newsletterService.subscribe('test@example.com');

			expect(result.success).toBe(false);
			expect(result.error).toBe('Network Error');
		});
	});

	describe('incrementViewCount', () => {
		it('increments view count for newsletter', async () => {
			const mockResponse = {
				id: 1,
				view_count: 42
			};

			api.post.mockResolvedValue({ data: mockResponse });

			const result = await newsletterService.incrementViewCount(1);

			expect(result).toEqual(mockResponse);
			expect(api.post).toHaveBeenCalledWith(
				'/newsletter/newsletters/1/increment-view-count/'
			);
		});

		it('handles errors when incrementing view count', async () => {
			api.post.mockRejectedValue({
				response: { status: 404, data: {} }
			});

			const result = await newsletterService.incrementViewCount(999);

			expect(result.success).toBe(false);
			expect(result.error).toBe('Not Found');
		});
	});
});

