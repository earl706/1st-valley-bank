import { describe, it, expect, vi, beforeEach } from 'vitest';
import productService from './productService';
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

describe('productService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('Deposit Products', () => {
		describe('getDepositProducts', () => {
			it('fetches all deposit products successfully', async () => {
				const mockData = {
					count: 2,
					results: [
						{ id: 1, name: 'Regular Savings', product_type: 'savings', is_active: true },
						{ id: 2, name: 'Checking Account', product_type: 'checking', is_active: true }
					]
				};

				api.get.mockResolvedValue({ data: mockData });

				const result = await productService.getDepositProducts();

				expect(api.get).toHaveBeenCalledWith('/deposits/', { params: {} });
				expect(result.success).toBe(true);
				expect(result.data).toEqual(mockData);
			});

			it('fetches deposit products with filters', async () => {
				const mockData = { count: 1, results: [] };
				api.get.mockResolvedValue({ data: mockData });

				await productService.getDepositProducts({ product_type: 'savings', is_active: true });

				expect(api.get).toHaveBeenCalledWith('/deposits/', {
					params: { product_type: 'savings', is_active: true }
				});
			});

			it('handles API errors', async () => {
				api.get.mockRejectedValue({
					response: { status: 500, data: {} }
				});

				const result = await productService.getDepositProducts();

				expect(result.success).toBe(false);
				expect(result.error).toBe('Server Error');
			});

			it('handles network errors', async () => {
				api.get.mockRejectedValue({
					request: {},
					message: 'Network Error'
				});

				const result = await productService.getDepositProducts();

				expect(result.success).toBe(false);
				expect(result.error).toBe('Network Error');
			});
		});

		describe('getDepositProductsByType', () => {
			it('fetches savings products', async () => {
				const mockData = [
					{ id: 1, name: 'Regular Savings', product_type: 'savings' }
				];

				api.get.mockResolvedValue({ data: mockData });

				const result = await productService.getDepositProductsByType('savings');

				expect(api.get).toHaveBeenCalledWith('/deposits/savings/');
				expect(result.success).toBe(true);
				expect(result.data).toEqual(mockData);
			});

			it('fetches checking products', async () => {
				const mockData = [
					{ id: 2, name: 'Checking Account', product_type: 'checking' }
				];

				api.get.mockResolvedValue({ data: mockData });

				const result = await productService.getDepositProductsByType('checking');

				expect(api.get).toHaveBeenCalledWith('/deposits/checking/');
				expect(result.success).toBe(true);
			});

			it('fetches time deposit products', async () => {
				const mockData = [
					{ id: 3, name: 'Time Deposit', product_type: 'time_deposit' }
				];

				api.get.mockResolvedValue({ data: mockData });

				const result = await productService.getDepositProductsByType('time_deposit');

				expect(api.get).toHaveBeenCalledWith('/deposits/time_deposit/');
				expect(result.success).toBe(true);
			});

			it('handles not found errors', async () => {
				api.get.mockRejectedValue({
					response: { status: 404, data: {} }
				});

				const result = await productService.getDepositProductsByType('invalid');

				expect(result.success).toBe(false);
				expect(result.error).toBe('Not Found');
			});
		});

		describe('getDepositProduct', () => {
			it('fetches single deposit product successfully', async () => {
				const mockData = {
					id: 1,
					name: 'Regular Savings',
					product_type: 'savings',
					description: 'A basic savings account',
					features: ['Low minimum balance', 'ATM access']
				};

				api.get.mockResolvedValue({ data: mockData });

				const result = await productService.getDepositProduct(1);

				expect(api.get).toHaveBeenCalledWith('/deposits/1/');
				expect(result.success).toBe(true);
				expect(result.data).toEqual(mockData);
			});

			it('handles product not found', async () => {
				api.get.mockRejectedValue({
					response: { status: 404, data: {} }
				});

				const result = await productService.getDepositProduct(999);

				expect(result.success).toBe(false);
				expect(result.error).toBe('Not Found');
			});

			it('handles server errors', async () => {
				api.get.mockRejectedValue({
					response: { status: 500, data: {} }
				});

				const result = await productService.getDepositProduct(1);

				expect(result.success).toBe(false);
				expect(result.error).toBe('Server Error');
			});
		});
	});

	describe('Loan Products', () => {
		describe('getLoanProducts', () => {
			it('fetches all loan products successfully', async () => {
				const mockData = {
					count: 3,
					results: [
						{ id: 1, title: 'Salary Loan', loan_type: 'salary', is_active: true },
						{ id: 2, title: 'SME Loan', loan_type: 'sme', is_active: true },
						{ id: 3, title: 'Agriculture Loan', loan_type: 'agriculture', is_active: true }
					]
				};

				api.get.mockResolvedValue({ data: mockData });

				const result = await productService.getLoanProducts();

				expect(api.get).toHaveBeenCalledWith('/loans/', { params: {} });
				expect(result.success).toBe(true);
				expect(result.data).toEqual(mockData);
			});

			it('fetches loan products with filters', async () => {
				const mockData = { count: 1, results: [] };
				api.get.mockResolvedValue({ data: mockData });

				await productService.getLoanProducts({ loan_type: 'sme', is_active: true });

				expect(api.get).toHaveBeenCalledWith('/loans/', {
					params: { loan_type: 'sme', is_active: true }
				});
			});

			it('handles API errors', async () => {
				api.get.mockRejectedValue({
					response: { status: 500, data: {} }
				});

				const result = await productService.getLoanProducts();

				expect(result.success).toBe(false);
				expect(result.error).toBe('Server Error');
			});

			it('handles network errors', async () => {
				api.get.mockRejectedValue({
					request: {},
					message: 'Network Error'
				});

				const result = await productService.getLoanProducts();

				expect(result.success).toBe(false);
				expect(result.error).toBe('Network Error');
			});
		});

		describe('getLoanProductsByType', () => {
			const loanTypes = [
				'agriculture',
				'sme',
				'microfinance',
				'supervised_credit',
				'gold_and_gems',
				'salary'
			];

			loanTypes.forEach((type) => {
				it(`fetches ${type} loan products`, async () => {
					const mockData = [{ id: 1, title: `${type} Loan`, loan_type: type }];

					api.get.mockResolvedValue({ data: mockData });

					const result = await productService.getLoanProductsByType(type);

					expect(api.get).toHaveBeenCalledWith(`/loans/${type}/`);
					expect(result.success).toBe(true);
					expect(result.data).toEqual(mockData);
				});
			});

			it('handles not found errors', async () => {
				api.get.mockRejectedValue({
					response: { status: 404, data: {} }
				});

				const result = await productService.getLoanProductsByType('invalid');

				expect(result.success).toBe(false);
				expect(result.error).toBe('Not Found');
			});

			it('handles server errors', async () => {
				api.get.mockRejectedValue({
					response: { status: 500, data: {} }
				});

				const result = await productService.getLoanProductsByType('sme');

				expect(result.success).toBe(false);
				expect(result.error).toBe('Server Error');
			});
		});

		describe('getLoanProduct', () => {
			it('fetches single loan product successfully', async () => {
				const mockData = {
					id: 1,
					title: 'Salary Loan',
					loan_type: 'salary',
					description: 'Quick cash for employees',
					features: ['Fast approval', 'Flexible terms'],
					interest_rate: '12% per annum'
				};

				api.get.mockResolvedValue({ data: mockData });

				const result = await productService.getLoanProduct(1);

				expect(api.get).toHaveBeenCalledWith('/loans/1/');
				expect(result.success).toBe(true);
				expect(result.data).toEqual(mockData);
			});

			it('handles product not found', async () => {
				api.get.mockRejectedValue({
					response: { status: 404, data: {} }
				});

				const result = await productService.getLoanProduct(999);

				expect(result.success).toBe(false);
				expect(result.error).toBe('Not Found');
			});

			it('handles unauthorized access', async () => {
				api.get.mockRejectedValue({
					response: { status: 401, data: {} }
				});

				const result = await productService.getLoanProduct(1);

				expect(result.success).toBe(false);
				expect(result.error).toBe('Authentication Error');
			});

			it('handles server errors', async () => {
				api.get.mockRejectedValue({
					response: { status: 500, data: {} }
				});

				const result = await productService.getLoanProduct(1);

				expect(result.success).toBe(false);
				expect(result.error).toBe('Server Error');
			});
		});
	});

	describe('Integration scenarios', () => {
		it('fetches both deposit and loan products', async () => {
			const mockDeposits = { count: 1, results: [{ id: 1, name: 'Savings' }] };
			const mockLoans = { count: 1, results: [{ id: 1, title: 'Salary Loan' }] };

			api.get
				.mockResolvedValueOnce({ data: mockDeposits })
				.mockResolvedValueOnce({ data: mockLoans });

			const depositsResult = await productService.getDepositProducts();
			const loansResult = await productService.getLoanProducts();

			expect(depositsResult.success).toBe(true);
			expect(loansResult.success).toBe(true);
		});

		it('handles mixed success and failure', async () => {
			api.get
				.mockResolvedValueOnce({ data: { count: 1, results: [] } })
				.mockRejectedValueOnce({ response: { status: 500, data: {} } });

			const depositsResult = await productService.getDepositProducts();
			const loansResult = await productService.getLoanProducts();

			expect(depositsResult.success).toBe(true);
			expect(loansResult.success).toBe(false);
		});
	});
});

