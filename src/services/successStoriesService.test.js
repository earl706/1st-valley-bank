import { describe, it, expect, vi, beforeEach } from 'vitest';
import successStoriesService from './successStoriesService';
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

describe('successStoriesService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getByLoanType', () => {
		it('fetches success stories by loan type successfully', async () => {
			const mockData = {
				count: 2,
				results: [
					{
						id: 1,
						title: 'Small Business Success',
						loan_type: 'sbl',
						borrower_name: 'Juan Dela Cruz',
						story: 'Expanded my sari-sari store'
					},
					{
						id: 2,
						title: 'Farm Expansion',
						loan_type: 'sbl',
						borrower_name: 'Maria Santos',
						story: 'Bought new equipment'
					}
				]
			};

			api.get.mockResolvedValue({ data: mockData });

			const result = await successStoriesService.getByLoanType('sbl');

			expect(api.get).toHaveBeenCalledWith('/loans/success-stories/', {
				params: { loan_type: 'sbl' }
			});
			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockData);
		});

		it('fetches stories for different loan types', async () => {
			const loanTypes = ['salary', 'sme', 'sucre', 'agriculture', 'microfinance', 'gold_gems'];

			for (const type of loanTypes) {
				api.get.mockResolvedValueOnce({ data: { count: 1, results: [] } });
				const result = await successStoriesService.getByLoanType(type);
				expect(api.get).toHaveBeenCalledWith('/loans/success-stories/', {
					params: { loan_type: type }
				});
				expect(result.success).toBe(true);
			}
		});

		it('handles API errors', async () => {
			api.get.mockRejectedValue({
				response: { status: 500, data: {} }
			});

			const result = await successStoriesService.getByLoanType('sbl');

			expect(result.success).toBe(false);
			expect(result.error).toBe('Server Error');
		});

		it('handles not found errors', async () => {
			api.get.mockRejectedValue({
				response: { status: 404, data: {} }
			});

			const result = await successStoriesService.getByLoanType('invalid');

			expect(result.success).toBe(false);
			expect(result.error).toBe('Not Found');
		});

		it('handles network errors', async () => {
			api.get.mockRejectedValue({
				request: {},
				message: 'Network Error'
			});

			const result = await successStoriesService.getByLoanType('sbl');

			expect(result.success).toBe(false);
			expect(result.error).toBe('Network Error');
		});

		it('returns empty results when no stories found', async () => {
			api.get.mockResolvedValue({ data: { count: 0, results: [] } });

			const result = await successStoriesService.getByLoanType('sbl');

			expect(result.success).toBe(true);
			expect(result.data.results).toHaveLength(0);
		});
	});

	describe('getAll', () => {
		it('fetches all success stories successfully', async () => {
			const mockData = {
				count: 3,
				results: [
					{ id: 1, title: 'Story 1', loan_type: 'sbl' },
					{ id: 2, title: 'Story 2', loan_type: 'sme' },
					{ id: 3, title: 'Story 3', loan_type: 'agriculture' }
				]
			};

			api.get.mockResolvedValue({ data: mockData });

			const result = await successStoriesService.getAll();

			expect(api.get).toHaveBeenCalledWith('/loans/success-stories/');
			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockData);
			expect(result.data.results).toHaveLength(3);
		});

		it('handles API errors', async () => {
			api.get.mockRejectedValue({
				response: { status: 500, data: {} }
			});

			const result = await successStoriesService.getAll();

			expect(result.success).toBe(false);
			expect(result.error).toBe('Server Error');
		});

		it('handles empty results', async () => {
			api.get.mockResolvedValue({ data: { count: 0, results: [] } });

			const result = await successStoriesService.getAll();

			expect(result.success).toBe(true);
			expect(result.data.results).toHaveLength(0);
		});

		it('handles network errors', async () => {
			api.get.mockRejectedValue({
				request: {},
				message: 'Network Error'
			});

			const result = await successStoriesService.getAll();

			expect(result.success).toBe(false);
			expect(result.error).toBe('Network Error');
		});
	});
});

