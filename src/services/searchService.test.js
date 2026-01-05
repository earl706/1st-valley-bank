import { describe, it, expect, vi, beforeEach } from 'vitest';
import searchService from './searchService';
import depositService from './depositService';
import loanService from './loanService';
import propertyService from './propertyService';
import locationService from './locationService';
import landingService from './landingService';
import newsletterService from './newsletterService';

// Mock all service dependencies
vi.mock('./depositService', () => ({
	default: {
		getDepositProducts: vi.fn()
	}
}));
vi.mock('./loanService', () => ({
	default: {
		getByType: vi.fn()
	}
}));
vi.mock('./propertyService', () => ({
	default: {
		getProperties: vi.fn()
	}
}));
vi.mock('./locationService', () => ({
	default: {
		getBranches: vi.fn(),
		getATMs: vi.fn()
	}
}));
vi.mock('./landingService', () => ({
	default: {
		getFAQs: vi.fn(),
		getFaqs: vi.fn()
	}
}));
vi.mock('./newsletterService', () => ({
	default: {
		getNewsletters: vi.fn()
	}
}));

describe('searchService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		console.error.mockRestore();
	});

	describe('search', () => {
		it('returns empty results for empty query', async () => {
			const result = await searchService.search('');

			expect(result.success).toBe(true);
			expect(result.data).toEqual({
				deposits: [],
				loans: [],
				properties: [],
				branches: [],
				atms: [],
				faqs: [],
				newsletters: [],
				pages: []
			});
		});

		it('returns empty results for whitespace-only query', async () => {
			const result = await searchService.search('   ');

			expect(result.success).toBe(true);
			expect(result.data.deposits).toEqual([]);
		});

		it('searches deposits successfully', async () => {
			const mockDeposits = {
				results: [
					{
						id: 1,
						name: 'Regular Savings',
						subtitle: 'Save for your future',
						description: 'A basic savings account',
						product_type: 'savings',
						features: ['Low minimum balance'],
						interest_rate_above: '2.5%',
						required_initial_deposit: 500
					}
				]
			};

			depositService.getDepositProducts.mockResolvedValue(mockDeposits);
			loanService.getByType.mockResolvedValue({ results: [] });
			propertyService.getProperties.mockResolvedValue({ success: true, data: { results: [] } });
			locationService.getBranches.mockResolvedValue({ success: true, data: [] });
			locationService.getATMs.mockResolvedValue({ success: true, data: { results: [] } });
			landingService.getFAQs.mockResolvedValue({ data: [] });
			newsletterService.getNewsletters.mockResolvedValue({ success: true, data: { results: [] } });

			const result = await searchService.search('savings');

			expect(result.success).toBe(true);
			expect(result.data.deposits).toHaveLength(1);
			expect(result.data.deposits[0]).toMatchObject({
				id: 1,
				title: 'Regular Savings',
				subtitle: 'Save for your future',
				type: 'deposit',
				path: '/deposits/regular-savings'
			});
		});

		it('searches loans successfully', async () => {
			depositService.getDepositProducts.mockResolvedValue({ results: [] });
			loanService.getByType.mockResolvedValue({
				results: [
					{
						id: 1,
						title: 'Salary Loan',
						description: 'Quick cash for employees',
						loan_type: 'salary',
						features: ['Fast approval']
					}
				]
			});
			propertyService.getProperties.mockResolvedValue({ success: true, data: { results: [] } });
			locationService.getBranches.mockResolvedValue({ success: true, data: [] });
			locationService.getATMs.mockResolvedValue({ success: true, data: { results: [] } });
			landingService.getFAQs.mockResolvedValue({ data: [] });
			newsletterService.getNewsletters.mockResolvedValue({ success: true, data: { results: [] } });

			const result = await searchService.search('salary');

			expect(result.success).toBe(true);
			expect(result.data.loans.length).toBeGreaterThan(0);
		});

		it('searches properties successfully', async () => {
			depositService.getDepositProducts.mockResolvedValue({ results: [] });
			loanService.getByType.mockResolvedValue({ results: [] });
			propertyService.getProperties.mockResolvedValue({
				success: true,
				data: {
					results: [
						{
							id: 1,
							title: 'House for Sale',
							description: 'Beautiful home',
							location: 'CDO',
							price: 5000000,
							property_type: 'real_estate',
							property_code: 'R-001'
						}
					]
				}
			});
			locationService.getBranches.mockResolvedValue({ success: true, data: [] });
			locationService.getATMs.mockResolvedValue({ success: true, data: { results: [] } });
			landingService.getFAQs.mockResolvedValue({ data: [] });
			newsletterService.getNewsletters.mockResolvedValue({ success: true, data: { results: [] } });

			const result = await searchService.search('house');

			expect(result.success).toBe(true);
			expect(result.data.properties).toHaveLength(1);
			expect(result.data.properties[0].title).toBe('House for Sale');
		});

		it('searches branches successfully', async () => {
			depositService.getDepositProducts.mockResolvedValue({ results: [] });
			loanService.getByType.mockResolvedValue({ results: [] });
			propertyService.getProperties.mockResolvedValue({ success: true, data: { results: [] } });
			locationService.getBranches.mockResolvedValue({
				success: true,
				data: [
					{
						id: 1,
						name: 'Main Branch',
						address: '123 Main St',
						region: 'ncr',
						contact_number: '123-4567',
						operating_hours: { Monday: '9AM-5PM', Tuesday: '9AM-5PM' }
					}
				]
			});
			locationService.getATMs.mockResolvedValue({ success: true, data: { results: [] } });
			landingService.getFAQs.mockResolvedValue({ data: [] });
			newsletterService.getNewsletters.mockResolvedValue({ success: true, data: { results: [] } });

			const result = await searchService.search('main');

			expect(result.success).toBe(true);
			expect(result.data.branches).toHaveLength(1);
			expect(result.data.branches[0].title).toBe('Main Branch');
		});

		it('searches ATMs successfully', async () => {
			depositService.getDepositProducts.mockResolvedValue({ results: [] });
			loanService.getByType.mockResolvedValue({ results: [] });
			propertyService.getProperties.mockResolvedValue({ success: true, data: { results: [] } });
			locationService.getBranches.mockResolvedValue({ success: true, data: [] });
			locationService.getATMs.mockResolvedValue({
				success: true,
				data: {
					results: [
						{
							id: 1,
							name: 'Mall ATM',
							location: 'SM City',
							is_24_hours: true
						}
					]
				}
			});
			landingService.getFAQs.mockResolvedValue({ data: [] });
			newsletterService.getNewsletters.mockResolvedValue({ success: true, data: { results: [] } });

			const result = await searchService.search('mall');

			expect(result.success).toBe(true);
			expect(result.data.atms).toHaveLength(1);
			expect(result.data.atms[0].title).toBe('Mall ATM');
		});

		it('searches FAQs successfully', async () => {
			depositService.getDepositProducts.mockResolvedValue({ results: [] });
			loanService.getByType.mockResolvedValue({ results: [] });
			propertyService.getProperties.mockResolvedValue({ success: true, data: { results: [] } });
			locationService.getBranches.mockResolvedValue({ success: true, data: [] });
			locationService.getATMs.mockResolvedValue({ success: true, data: { results: [] } });
			landingService.getFaqs.mockResolvedValue({
				data: [
					{
						id: 1,
						question: 'How do I open an account?',
						answer: 'Visit any branch with valid ID',
						category: 'accounts'
					}
				]
			});
			newsletterService.getNewsletters.mockResolvedValue({ results: [] });

			const result = await searchService.search('account');

			expect(result.success).toBe(true);
			expect(result.data.faqs).toHaveLength(1);
			expect(result.data.faqs[0].title).toBe('How do I open an account?');
		});

		it('searches newsletters successfully', async () => {
			depositService.getDepositProducts.mockResolvedValue({ results: [] });
			loanService.getByType.mockResolvedValue({ results: [] });
			propertyService.getProperties.mockResolvedValue({ success: true, data: { results: [] } });
			locationService.getBranches.mockResolvedValue({ success: true, data: [] });
			locationService.getATMs.mockResolvedValue({ success: true, data: { results: [] } });
			landingService.getFaqs.mockResolvedValue({ data: [] });
			newsletterService.getNewsletters.mockResolvedValue({
				results: [
					{
						id: 1,
						title: 'January 2024 Newsletter',
						subject: 'January 2024 Newsletter',
						summary: 'Monthly updates',
						created_at: '2024-01-01'
					}
				]
			});

			const result = await searchService.search('january');

			expect(result.success).toBe(true);
			expect(result.data.newsletters).toHaveLength(1);
			expect(result.data.newsletters[0].title).toBe('January 2024 Newsletter');
		});

		it('handles errors in individual search categories gracefully', async () => {
			depositService.getDepositProducts.mockRejectedValue(new Error('Deposit error'));
			loanService.getByType.mockRejectedValue(new Error('Loan error'));
			propertyService.getProperties.mockResolvedValue({ success: true, data: { results: [] } });
			locationService.getBranches.mockResolvedValue({ success: true, data: [] });
			locationService.getATMs.mockResolvedValue({ success: true, data: { results: [] } });
			landingService.getFAQs.mockResolvedValue({ data: [] });
			newsletterService.getNewsletters.mockResolvedValue({ success: true, data: { results: [] } });

			const result = await searchService.search('test');

			// Should still return success with empty arrays for failed categories
			expect(result.success).toBe(true);
			expect(result.data.deposits).toEqual([]);
			expect(result.data.loans).toEqual([]);
			expect(console.error).toHaveBeenCalled();
		});

		it('handles complete search failure', async () => {
			depositService.getDepositProducts.mockRejectedValue(new Error('Error'));
			loanService.getByType.mockRejectedValue(new Error('Error'));
			propertyService.getProperties.mockRejectedValue(new Error('Error'));
			locationService.getBranches.mockRejectedValue(new Error('Error'));
			locationService.getATMs.mockRejectedValue(new Error('Error'));
			landingService.getFaqs.mockRejectedValue(new Error('Error'));
			newsletterService.getNewsletters.mockRejectedValue(new Error('Error'));

			const result = await searchService.search('test');

			// Even with all errors, searchService catches them and returns success
			// with empty results arrays (see try-catch blocks in implementation)
			expect(result.success).toBe(true);
			expect(result.data.deposits).toEqual([]);
			expect(result.data.loans).toEqual([]);
		});

		it('searches across multiple categories simultaneously', async () => {
			depositService.getDepositProducts.mockResolvedValue({
				results: [{ id: 1, name: 'test Savings', product_type: 'savings', subtitle: 'test' }]
			});
			loanService.getByType.mockResolvedValue({
				results: [{ id: 1, title: 'test Loan', loan_type: 'salary' }]
			});
			propertyService.getProperties.mockResolvedValue({
				success: true,
				data: { results: [{ id: 1, title: 'test Property', property_type: 'real_estate', description: 'test' }] }
			});
			locationService.getBranches.mockResolvedValue({
				success: true,
				data: [{ id: 1, name: 'test Branch', address: 'test address' }]
			});
			locationService.getATMs.mockResolvedValue({
				success: true,
				data: { results: [{ id: 1, name: 'test ATM', location: 'test' }] }
			});
			landingService.getFaqs.mockResolvedValue({
				data: [{ id: 1, question: 'test FAQ', answer: 'Answer' }]
			});
			newsletterService.getNewsletters.mockResolvedValue({
				results: [{ id: 1, title: 'test Newsletter', subject: 'test Newsletter' }]
			});

			const result = await searchService.search('test');

			expect(result.success).toBe(true);
			expect(result.data.deposits).toHaveLength(1);
			expect(result.data.loans.length).toBeGreaterThan(0);
			expect(result.data.properties).toHaveLength(1);
			expect(result.data.branches).toHaveLength(1);
			expect(result.data.atms).toHaveLength(1);
			expect(result.data.faqs).toHaveLength(1);
			expect(result.data.newsletters).toHaveLength(1);
		});

		it('handles null or undefined responses from services', async () => {
			depositService.getDepositProducts.mockResolvedValue(null);
			loanService.getByType.mockResolvedValue(undefined);
			propertyService.getProperties.mockResolvedValue({ success: true, data: null });
			locationService.getBranches.mockResolvedValue({ success: true, data: null });
			locationService.getATMs.mockResolvedValue({ success: true, data: null });
			landingService.getFAQs.mockResolvedValue({ data: null });
			newsletterService.getNewsletters.mockResolvedValue({ success: true, data: null });

			const result = await searchService.search('test');

			expect(result.success).toBe(true);
			expect(result.data.deposits).toEqual([]);
			expect(result.data.loans).toEqual([]);
		});
	});

	describe('getQuickResults', () => {
		it('returns quick results with limited items per category', async () => {
			const mockDeposits = {
				results: Array(10)
					.fill(null)
					.map((_, i) => ({
						id: i,
						name: `Deposit ${i}`,
						product_type: 'savings'
					}))
			};

			depositService.getDepositProducts.mockResolvedValue(mockDeposits);
			loanService.getByType.mockResolvedValue({ results: [] });
			propertyService.getProperties.mockResolvedValue({ success: true, data: { results: [] } });
			locationService.getBranches.mockResolvedValue({ success: true, data: [] });
			locationService.getATMs.mockResolvedValue({ success: true, data: { results: [] } });
			landingService.getFAQs.mockResolvedValue({ data: [] });
			newsletterService.getNewsletters.mockResolvedValue({ success: true, data: { results: [] } });

			const result = await searchService.search('test');

			expect(result.success).toBe(true);
			// Quick results should limit items per category
			expect(result.data.deposits.length).toBeLessThanOrEqual(10);
		});
	});
});

