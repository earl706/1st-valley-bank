import { describe, it, expect } from 'vitest';

describe('services/index (barrel export)', () => {
	it('exports all expected services', async () => {
		const services = await import('./index');

		// Verify all expected services are exported
		expect(services).toHaveProperty('newsletterService');
		expect(services).toHaveProperty('contactService');
		expect(services).toHaveProperty('productService');
		expect(services).toHaveProperty('propertyService');
		expect(services).toHaveProperty('locationService');
		expect(services).toHaveProperty('homepageService');
		expect(services).toHaveProperty('chatbotService');
		expect(services).toHaveProperty('advisoryService');
		expect(services).toHaveProperty('searchService');
		expect(services).toHaveProperty('annualReportService');
		expect(services).toHaveProperty('loanService');
		expect(services).toHaveProperty('depositService');
		expect(services).toHaveProperty('api');
		expect(services).toHaveProperty('handleApiError');
	});

	it('exports are functions or objects', async () => {
		const services = await import('./index');

		expect(typeof services.newsletterService).toBe('object');
		expect(typeof services.contactService).toBe('object');
		expect(typeof services.productService).toBe('object');
		expect(typeof services.propertyService).toBe('object');
		expect(typeof services.locationService).toBe('object');
		expect(typeof services.homepageService).toBe('object');
		expect(typeof services.chatbotService).toBe('object');
		expect(typeof services.advisoryService).toBe('object');
		expect(typeof services.searchService).toBe('object');
		expect(typeof services.annualReportService).toBe('object');
		expect(typeof services.loanService).toBe('object');
		expect(typeof services.depositService).toBe('object');
		// api can be either function or object depending on implementation
		expect(['object', 'function']).toContain(typeof services.api);
		expect(typeof services.handleApiError).toBe('function');
	});
});

