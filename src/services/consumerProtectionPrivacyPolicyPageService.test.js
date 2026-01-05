import { describe, it, expect, vi, beforeEach } from 'vitest';
import consumerProtectionPrivacyPolicyPageService from './consumerProtectionPrivacyPolicyPageService';
import api from './api';

vi.mock('./api');

describe('consumerProtectionPrivacyPolicyPageService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getPrivacyPolicyPage', () => {
		it('fetches privacy policy page data successfully', async () => {
			const mockData = {
				title: 'Privacy Policy',
				last_updated: '2024-01-01',
				sections: [
					{ id: 1, heading: 'Data Collection', content: 'We collect...' },
					{ id: 2, heading: 'Data Usage', content: 'We use your data...' },
					{ id: 3, heading: 'Data Protection', content: 'We protect...' }
				],
				contact_email: 'privacy@firstvalleybank.com'
			};

			api.get.mockResolvedValue({ data: mockData });

			const result = await consumerProtectionPrivacyPolicyPageService.getPrivacyPolicyPage();

			expect(api.get).toHaveBeenCalledWith('/landing/consumer-protection-privacy-policy-page/', {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			expect(result).toEqual(mockData);
		});

		it('handles API errors', async () => {
			const mockError = new Error('Failed to fetch privacy policy');
			api.get.mockRejectedValue(mockError);

			await expect(
				consumerProtectionPrivacyPolicyPageService.getPrivacyPolicyPage()
			).rejects.toThrow('Failed to fetch privacy policy');
		});

		it('handles empty response', async () => {
			api.get.mockResolvedValue({ data: {} });

			const result = await consumerProtectionPrivacyPolicyPageService.getPrivacyPolicyPage();

			expect(result).toEqual({});
		});

		it('handles null response', async () => {
			api.get.mockResolvedValue({ data: null });

			const result = await consumerProtectionPrivacyPolicyPageService.getPrivacyPolicyPage();

			expect(result).toBeNull();
		});

		it('handles 404 not found', async () => {
			const notFoundError = new Error('Not found');
			notFoundError.response = { status: 404 };
			api.get.mockRejectedValue(notFoundError);

			await expect(
				consumerProtectionPrivacyPolicyPageService.getPrivacyPolicyPage()
			).rejects.toThrow('Not found');
		});

		it('handles server errors', async () => {
			const serverError = new Error('Internal server error');
			serverError.response = { status: 500 };
			api.get.mockRejectedValue(serverError);

			await expect(
				consumerProtectionPrivacyPolicyPageService.getPrivacyPolicyPage()
			).rejects.toThrow('Internal server error');
		});

		it('handles network timeout', async () => {
			const timeoutError = new Error('Timeout');
			timeoutError.code = 'ECONNABORTED';
			api.get.mockRejectedValue(timeoutError);

			await expect(
				consumerProtectionPrivacyPolicyPageService.getPrivacyPolicyPage()
			).rejects.toThrow('Timeout');
		});
	});
});

