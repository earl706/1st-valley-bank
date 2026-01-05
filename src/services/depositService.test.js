import { describe, it, expect, vi, beforeEach } from 'vitest';
import depositService, {
	getAllDepositProducts,
	getSavingsAccounts,
	getCheckingAccounts,
	getTimeDeposits,
	getProductTypeRequirements
} from './depositService';
import api from './api';

vi.mock('./api');

describe('depositService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getSavingsAccounts', () => {
		it('fetches savings accounts', async () => {
			const mockResponse = {
				count: 2,
				results: [
					{
						id: 1,
						name: 'Regular Savings',
						product_type: 'savings',
						interest_rate: 2.5,
						minimum_balance: 500
					},
					{
						id: 2,
						name: 'Special Savings',
						product_type: 'savings',
						interest_rate: 3.0,
						minimum_balance: 1000
					}
				]
			};

			api.get.mockResolvedValue({ data: mockResponse });

			const result = await getSavingsAccounts();

			expect(result).toEqual(mockResponse);
			expect(api.get).toHaveBeenCalledWith('/deposits/', {
				params: expect.objectContaining({
					product_type: 'savings'
				})
			});
		});

		it('accepts custom options', async () => {
			api.get.mockResolvedValue({ data: { count: 0, results: [] } });

			await getSavingsAccounts({ page: 2, search: 'regular' });

			expect(api.get).toHaveBeenCalledWith('/deposits/', {
				params: expect.objectContaining({
					product_type: 'savings',
					page: 2,
					search: 'regular'
				})
			});
		});
	});

	describe('getCheckingAccounts', () => {
		it('fetches checking accounts', async () => {
			const mockResponse = {
				count: 1,
				results: [
					{
						id: 1,
						name: 'Business Checking',
						product_type: 'checking',
						interest_rate: 1.0
					}
				]
			};

			api.get.mockResolvedValue({ data: mockResponse });

			const result = await getCheckingAccounts();

			expect(result).toEqual(mockResponse);
			expect(api.get).toHaveBeenCalledWith('/deposits/', {
				params: expect.objectContaining({
					product_type: 'checking'
				})
			});
		});
	});

	describe('getTimeDeposits', () => {
		it('fetches time deposits', async () => {
			const mockResponse = {
				count: 1,
				results: [
					{
						id: 1,
						name: '12-Month Time Deposit',
						product_type: 'time_deposit',
						interest_rate: 4.5,
						term_months: 12
					}
				]
			};

			api.get.mockResolvedValue({ data: mockResponse });

			const result = await getTimeDeposits();

			expect(result).toEqual(mockResponse);
			expect(api.get).toHaveBeenCalledWith('/deposits/', {
				params: expect.objectContaining({
					product_type: 'time_deposit'
				})
			});
		});
	});

	describe('getAllDepositProducts', () => {
		it('fetches all deposit products with default options', async () => {
			const mockResponse = {
				count: 3,
				results: [
					{ id: 1, name: 'Savings', product_type: 'savings' },
					{ id: 2, name: 'Checking', product_type: 'checking' },
					{ id: 3, name: 'Time Deposit', product_type: 'time_deposit' }
				]
			};

			api.get.mockResolvedValue({ data: mockResponse });

			const result = await getAllDepositProducts();

			expect(result).toEqual(mockResponse);
			expect(api.get).toHaveBeenCalledWith('/deposits/', {
				params: expect.objectContaining({
					page: 1,
					page_size: 1000
				})
			});
		});

		it('filters by active status', async () => {
			api.get.mockResolvedValue({ data: { count: 0, results: [] } });

			await getAllDepositProducts({ is_active: true });

			expect(api.get).toHaveBeenCalledWith('/deposits/', {
				params: expect.objectContaining({
					is_active: 'true'
				})
			});
		});

		it('handles pagination when fetchAll is false', async () => {
			const mockResponse = {
				count: 50,
				results: Array(10).fill({ id: 1, name: 'Product' })
			};

			api.get.mockResolvedValue({ data: mockResponse });

			await getAllDepositProducts({ fetchAll: false, page: 2, page_size: 10 });

			expect(api.get).toHaveBeenCalledWith('/deposits/', {
				params: expect.objectContaining({
					page: 2,
					page_size: 10
				})
			});
		});

		it('fetches multiple pages when results exceed page size', async () => {
			const firstPage = {
				count: 15,
				results: Array(10).fill({ id: 1, name: 'Product 1' })
			};
			const secondPage = {
				count: 15,
				results: Array(5).fill({ id: 2, name: 'Product 2' })
			};

			api.get
				.mockResolvedValueOnce({ data: firstPage })
				.mockResolvedValueOnce({ data: secondPage });

			const result = await getAllDepositProducts({ page_size: 10 });

			expect(result.count).toBe(15);
			expect(result.results).toHaveLength(15);
			expect(api.get).toHaveBeenCalledTimes(2);
		});

		it('applies search and ordering', async () => {
			api.get.mockResolvedValue({ data: { count: 0, results: [] } });

			await getAllDepositProducts({
				search: 'savings',
				ordering: '-interest_rate'
			});

			expect(api.get).toHaveBeenCalledWith('/deposits/', {
				params: expect.objectContaining({
					search: 'savings',
					ordering: '-interest_rate'
				})
			});
		});

		it('handles API errors', async () => {
			api.get.mockRejectedValue(new Error('Network error'));

			await expect(getAllDepositProducts()).rejects.toThrow('Network error');
		});
	});

	describe('getProductTypeRequirements', () => {
		it('fetches requirements for a product type', async () => {
			const mockRequirements = {
				product_type: 'savings',
				requirements: [
					'Valid ID',
					'Proof of Address',
					'Initial Deposit of ₱500'
				]
			};

			api.get.mockResolvedValue({ data: mockRequirements });

			const result = await getProductTypeRequirements('savings');

			expect(result).toEqual(mockRequirements);
			expect(api.get).toHaveBeenCalledWith('/deposits/requirements/savings/');
		});

		it('returns empty requirements on error', async () => {
			api.get.mockRejectedValue(new Error('Not found'));

			const result = await getProductTypeRequirements('invalid');

			expect(result).toEqual({
				product_type: 'invalid',
				requirements: []
			});
		});

		it('fetches requirements for different product types', async () => {
			const types = ['savings', 'checking', 'time_deposit'];

			for (const type of types) {
				api.get.mockResolvedValue({
					data: { product_type: type, requirements: [] }
				});

				await getProductTypeRequirements(type);

				expect(api.get).toHaveBeenCalledWith(`/deposits/requirements/${type}/`);
			}
		});
	});

	describe('default export methods', () => {
		it('exports all methods', () => {
			expect(depositService.getSavingsAccounts).toBeDefined();
			expect(depositService.getCheckingAccounts).toBeDefined();
			expect(depositService.getTimeDeposits).toBeDefined();
			expect(depositService.getDepositProducts).toBeDefined();
			expect(depositService.getProductTypeRequirements).toBeDefined();
		});
	});
});

