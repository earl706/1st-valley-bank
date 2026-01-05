import { describe, it, expect, vi, beforeEach } from 'vitest';
import sustainabilityService from './sustainabilityService';
import api from './api';

vi.mock('./api');

describe('sustainabilityService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getSustainabilityPage', () => {
		it('fetches sustainability page data successfully', async () => {
			const mockData = {
				title: 'Sustainability Initiatives',
				description: 'Our commitment to the environment',
				initiatives: [
					{ id: 1, name: 'Green Banking', description: 'Paperless transactions' },
					{ id: 2, name: 'Community Programs', description: 'Local partnerships' }
				],
				goals: ['Carbon neutral by 2030', 'Sustainable lending practices']
			};

			api.get.mockResolvedValue({ data: mockData });

			const result = await sustainabilityService.getSustainabilityPage();

			expect(api.get).toHaveBeenCalledWith('/landing/sustainability-page/', {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			expect(result).toEqual(mockData);
		});

		it('handles API errors', async () => {
			const mockError = new Error('Failed to fetch');
			api.get.mockRejectedValue(mockError);

			await expect(sustainabilityService.getSustainabilityPage()).rejects.toThrow(
				'Failed to fetch'
			);
		});

		it('handles empty response', async () => {
			api.get.mockResolvedValue({ data: {} });

			const result = await sustainabilityService.getSustainabilityPage();

			expect(result).toEqual({});
		});

		it('handles 404 not found error', async () => {
			const notFoundError = new Error('Not found');
			notFoundError.response = { status: 404 };
			api.get.mockRejectedValue(notFoundError);

			await expect(sustainabilityService.getSustainabilityPage()).rejects.toThrow('Not found');
		});
	});
});

