import { describe, it, expect, vi, beforeEach } from 'vitest';
import loanService from './loanService';
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

describe('loanService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getByType', () => {
		it('fetches loans by type', async () => {
			const mockLoans = {
				count: 2,
				results: [
					{
						id: 1,
						title: 'Personal Loan',
						loan_type: 'personal',
						interest_rate: 5.5,
						min_amount: 10000,
						max_amount: 500000
					},
					{
						id: 2,
						title: 'Business Loan',
						loan_type: 'personal',
						interest_rate: 6.5,
						min_amount: 50000,
						max_amount: 2000000
					}
				]
			};

			api.get.mockResolvedValue({ data: mockLoans });

			const result = await loanService.getByType('personal');

			expect(result).toEqual(mockLoans);
			expect(api.get).toHaveBeenCalledWith('/loans/', {
				params: { loan_type: 'personal' }
			});
		});

		it('fetches loans with additional parameters', async () => {
			const mockResponse = {
				count: 1,
				results: [{ id: 1, title: 'SME Loan', loan_type: 'sme' }]
			};

			api.get.mockResolvedValue({ data: mockResponse });

			const params = {
				page: 2,
				page_size: 10,
				ordering: 'interest_rate'
			};

			const result = await loanService.getByType('sme', params);

			expect(result).toEqual(mockResponse);
			expect(api.get).toHaveBeenCalledWith('/loans/', {
				params: {
					...params,
					loan_type: 'sme'
				}
			});
		});

		it('handles API errors', async () => {
			const mockError = {
				response: {
					status: 404,
					data: { error: 'Not Found' }
				}
			};

			api.get.mockRejectedValue(mockError);

			await expect(loanService.getByType('invalid')).rejects.toEqual({
				error: 'Not Found',
				message: 'The requested resource was not found'
			});
		});

		it('handles network errors', async () => {
			const mockError = {
				request: {},
				message: 'Network Error'
			};

			api.get.mockRejectedValue(mockError);

			await expect(loanService.getByType('personal')).rejects.toEqual({
				error: 'Network Error',
				message: 'Unable to connect to server. Please check your internet connection.'
			});
		});

		it('fetches different loan types', async () => {
			const loanTypes = ['personal', 'business', 'sme', 'agriculture', 'microfinance'];

			for (const type of loanTypes) {
				api.get.mockResolvedValue({
					data: {
						count: 1,
						results: [{ id: 1, loan_type: type }]
					}
				});

				await loanService.getByType(type);

				expect(api.get).toHaveBeenCalledWith('/loans/', {
					params: { loan_type: type }
				});
			}
		});

		it('merges custom params with loan_type', async () => {
			api.get.mockResolvedValue({ data: { count: 0, results: [] } });

			const customParams = {
				search: 'housing',
				min_amount: 100000,
				max_amount: 1000000,
				ordering: '-interest_rate'
			};

			await loanService.getByType('personal', customParams);

			expect(api.get).toHaveBeenCalledWith('/loans/', {
				params: {
					...customParams,
					loan_type: 'personal'
				}
			});
		});

		it('handles empty results', async () => {
			api.get.mockResolvedValue({
				data: {
					count: 0,
					results: []
				}
			});

			const result = await loanService.getByType('personal');

			expect(result.count).toBe(0);
			expect(result.results).toEqual([]);
		});
	});
});

