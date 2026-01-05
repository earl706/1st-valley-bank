import { describe, it, expect, vi, beforeEach } from 'vitest';
import searchSuggestionsService from './searchSuggestionsService';
import api from './api';

vi.mock('./api');

describe('searchSuggestionsService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		console.error.mockRestore();
	});

	describe('getSuggestions', () => {
		it('returns empty array for empty query', async () => {
			const result = await searchSuggestionsService.getSuggestions('');

			expect(result).toEqual([]);
			expect(api.get).not.toHaveBeenCalled();
		});

		it('returns empty array for query less than 2 characters', async () => {
			const result = await searchSuggestionsService.getSuggestions('a');

			expect(result).toEqual([]);
			expect(api.get).not.toHaveBeenCalled();
		});

		it('fetches suggestions for valid query', async () => {
			const mockData = {
				results: [
					{ id: 1, title: 'Savings Account', subtitle: 'Deposit', type: 'deposit', path: '/deposits/savings' },
					{ id: 2, title: 'Salary Loan', subtitle: 'Loan', type: 'loan', path: '/loans/salary' }
				]
			};

			api.get.mockResolvedValue({ data: mockData });

			const result = await searchSuggestionsService.getSuggestions('sa');

			expect(api.get).toHaveBeenCalledWith('/landing/search-suggestions/', {
				params: { q: 'sa' },
				signal: null
			});
			expect(result).toEqual(mockData.results);
		});

		it('trims whitespace from query', async () => {
			const mockData = { results: [] };
			api.get.mockResolvedValue({ data: mockData });

			await searchSuggestionsService.getSuggestions('  loan  ');

			expect(api.get).toHaveBeenCalledWith('/landing/search-suggestions/', {
				params: { q: 'loan' },
				signal: null
			});
		});

		it('passes abort signal to API call', async () => {
			const mockData = { results: [] };
			const abortController = new AbortController();
			api.get.mockResolvedValue({ data: mockData });

			await searchSuggestionsService.getSuggestions('test', abortController.signal);

			expect(api.get).toHaveBeenCalledWith('/landing/search-suggestions/', {
				params: { q: 'test' },
				signal: abortController.signal
			});
		});

		it('returns empty array on AbortError', async () => {
			const abortError = new Error('Aborted');
			abortError.name = 'AbortError';
			api.get.mockRejectedValue(abortError);

			const result = await searchSuggestionsService.getSuggestions('test');

			expect(result).toEqual([]);
			expect(console.error).not.toHaveBeenCalled();
		});

		it('returns empty array on ERR_CANCELED', async () => {
			const cancelError = new Error('Canceled');
			cancelError.code = 'ERR_CANCELED';
			api.get.mockRejectedValue(cancelError);

			const result = await searchSuggestionsService.getSuggestions('test');

			expect(result).toEqual([]);
			expect(console.error).not.toHaveBeenCalled();
		});

		it('handles other errors and logs them', async () => {
			const networkError = new Error('Network error');
			api.get.mockRejectedValue(networkError);

			const result = await searchSuggestionsService.getSuggestions('test');

			expect(result).toEqual([]);
			expect(console.error).toHaveBeenCalledWith('Error fetching search suggestions:', networkError);
		});

		it('handles missing results in response', async () => {
			api.get.mockResolvedValue({ data: {} });

			const result = await searchSuggestionsService.getSuggestions('test');

			expect(result).toEqual([]);
		});

		it('handles null data in response', async () => {
			api.get.mockResolvedValue({ data: null });

			const result = await searchSuggestionsService.getSuggestions('test');

			expect(result).toEqual([]);
		});

		it('handles response with empty results array', async () => {
			api.get.mockResolvedValue({ data: { results: [] } });

			const result = await searchSuggestionsService.getSuggestions('xyz');

			expect(result).toEqual([]);
		});
	});
});

