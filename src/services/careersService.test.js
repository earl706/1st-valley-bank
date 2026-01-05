import { describe, it, expect, vi, beforeEach } from 'vitest';
import careersService from './careersService';
import api from './api';

vi.mock('./api');

describe('careersService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getCareersPage', () => {
		it('fetches careers page data successfully', async () => {
			const mockData = {
				title: 'Careers at First Valley Bank',
				description: 'Join our team',
				openings: [
					{ id: 1, position: 'Loan Officer', location: 'CDO', type: 'Full-time' },
					{ id: 2, position: 'Teller', location: 'Davao', type: 'Part-time' }
				]
			};

			api.get.mockResolvedValue({ data: mockData });

			const result = await careersService.getCareersPage();

			expect(api.get).toHaveBeenCalledWith('/landing/careers-page/', {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			expect(result).toEqual(mockData);
		});

		it('handles API errors', async () => {
			const mockError = new Error('Server error');
			api.get.mockRejectedValue(mockError);

			await expect(careersService.getCareersPage()).rejects.toThrow('Server error');
		});

		it('returns empty openings when none are available', async () => {
			const mockData = { openings: [] };
			api.get.mockResolvedValue({ data: mockData });

			const result = await careersService.getCareersPage();

			expect(result).toEqual(mockData);
			expect(result.openings).toHaveLength(0);
		});

		it('handles network timeout', async () => {
			const timeoutError = new Error('Timeout');
			timeoutError.code = 'ECONNABORTED';
			api.get.mockRejectedValue(timeoutError);

			await expect(careersService.getCareersPage()).rejects.toThrow('Timeout');
		});
	});
});

