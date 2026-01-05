import { describe, it, expect, vi, beforeEach } from 'vitest';
import aboutPageService from './aboutPageService';
import api from './api';

vi.mock('./api');

describe('aboutPageService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getAboutPage', () => {
		it('fetches about page data successfully', async () => {
			const mockData = {
				title: 'About Us',
				description: 'Learn more about First Valley Bank',
				sections: [
					{ id: 1, title: 'Our History', content: 'Founded in 1978' },
					{ id: 2, title: 'Our Mission', content: 'Serving communities' }
				]
			};

			api.get.mockResolvedValue({ data: mockData });

			const result = await aboutPageService.getAboutPage();

			expect(api.get).toHaveBeenCalledWith('/landing/about-page/', {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			expect(result).toEqual(mockData);
		});

		it('handles API errors', async () => {
			const mockError = new Error('Network error');
			api.get.mockRejectedValue(mockError);

			await expect(aboutPageService.getAboutPage()).rejects.toThrow('Network error');
			expect(api.get).toHaveBeenCalledWith('/landing/about-page/', {
				headers: {
					'Content-Type': 'application/json'
				}
			});
		});

		it('returns empty data when API returns empty response', async () => {
			api.get.mockResolvedValue({ data: null });

			const result = await aboutPageService.getAboutPage();

			expect(result).toBeNull();
		});

		it('handles malformed response data', async () => {
			const mockData = { unexpected: 'format' };
			api.get.mockResolvedValue({ data: mockData });

			const result = await aboutPageService.getAboutPage();

			expect(result).toEqual(mockData);
		});
	});
});

