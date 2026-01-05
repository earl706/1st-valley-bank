import { describe, it, expect, vi, beforeEach } from 'vitest';
import advisoryService from './advisoryService';
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

describe('advisoryService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getGallery', () => {
		it('fetches gallery images successfully', async () => {
			const mockData = [
				{ id: 1, title: 'Advisory 2023', image_url: '/gallery/2023.jpg', order: 1 },
				{ id: 2, title: 'Advisory 2022', image_url: '/gallery/2022.jpg', order: 2 }
			];

			api.get.mockResolvedValue({ data: mockData });

			const result = await advisoryService.getGallery();

			expect(api.get).toHaveBeenCalledWith('/advisory/');
			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockData);
		});

		it('handles API errors', async () => {
			api.get.mockRejectedValue({
				response: { status: 500, data: {} }
			});

			const result = await advisoryService.getGallery();

			expect(result.success).toBe(false);
			expect(result.error).toBe('Server Error');
		});

		it('handles network errors', async () => {
			api.get.mockRejectedValue({
				request: {},
				message: 'Network Error'
			});

			const result = await advisoryService.getGallery();

			expect(result.success).toBe(false);
			expect(result.error).toBe('Network Error');
		});

		it('returns empty array when no images available', async () => {
			api.get.mockResolvedValue({ data: [] });

			const result = await advisoryService.getGallery();

			expect(result.success).toBe(true);
			expect(result.data).toEqual([]);
		});
	});

	describe('getImage', () => {
		it('fetches single image successfully', async () => {
			const mockData = {
				id: 1,
				title: 'Advisory 2023',
				image_url: '/gallery/2023.jpg',
				description: 'Advisory gallery for 2023',
				order: 1
			};

			api.get.mockResolvedValue({ data: mockData });

			const result = await advisoryService.getImage(1);

			expect(api.get).toHaveBeenCalledWith('/advisory/gallery/1/');
			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockData);
		});

		it('handles image not found', async () => {
			api.get.mockRejectedValue({
				response: { status: 404, data: {} }
			});

			const result = await advisoryService.getImage(999);

			expect(result.success).toBe(false);
			expect(result.error).toBe('Not Found');
		});

		it('handles server errors', async () => {
			api.get.mockRejectedValue({
				response: { status: 500, data: {} }
			});

			const result = await advisoryService.getImage(1);

			expect(result.success).toBe(false);
			expect(result.error).toBe('Server Error');
		});

		it('fetches images with different IDs', async () => {
			const ids = [1, 5, 10];
			for (const id of ids) {
				api.get.mockResolvedValueOnce({ data: { id } });
				const result = await advisoryService.getImage(id);
				expect(api.get).toHaveBeenCalledWith(`/advisory/gallery/${id}/`);
				expect(result.success).toBe(true);
			}
		});
	});
});

