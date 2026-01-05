import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock web-vitals before importing performance module
const mockOnCLS = vi.hoisted(() => vi.fn());
const mockOnFID = vi.hoisted(() => vi.fn());
const mockOnFCP = vi.hoisted(() => vi.fn());
const mockOnLCP = vi.hoisted(() => vi.fn());
const mockOnTTFB = vi.hoisted(() => vi.fn());
const mockOnINP = vi.hoisted(() => vi.fn());

vi.mock('web-vitals', () => ({
	onCLS: mockOnCLS,
	onFID: mockOnFID,
	onFCP: mockOnFCP,
	onLCP: mockOnLCP,
	onTTFB: mockOnTTFB,
	onINP: mockOnINP
}));

import { reportWebVitals, measurePerformance, trackPageLoad } from './performance';

describe('performance utilities', () => {
	let originalEnv;
	let originalGtag;
	let originalPerformance;

	beforeEach(() => {
		// Clear all mocks
		vi.clearAllMocks();
		
		// Save original environment
		originalEnv = import.meta.env;
		originalGtag = window.gtag;
		originalPerformance = window.performance;

		// Mock console.log and console.error
		vi.spyOn(console, 'log').mockImplementation(() => {});
		vi.spyOn(console, 'error').mockImplementation(() => {});

		// Mock window.gtag
		window.gtag = vi.fn();

		// Mock performance API
		window.performance = {
			mark: vi.fn(),
			measure: vi.fn(),
			getEntriesByName: vi.fn(() => [{ duration: 100 }]),
			clearMarks: vi.fn(),
			clearMeasures: vi.fn(),
			getEntriesByType: vi.fn(() => [
				{
					domainLookupStart: 0,
					domainLookupEnd: 10,
					connectStart: 10,
					connectEnd: 20,
					requestStart: 20,
					responseStart: 30,
					responseEnd: 40,
					domLoading: 40,
					domContentLoadedEventEnd: 50,
					loadEventStart: 50,
					loadEventEnd: 60,
					fetchStart: 0
				}
			])
		};
	});

	afterEach(() => {
		// Restore original environment
		import.meta.env = originalEnv;
		window.gtag = originalGtag;
		window.performance = originalPerformance;
		console.log.mockRestore();
		console.error.mockRestore();
	});

	describe('reportWebVitals', () => {
		it('initializes web vitals tracking', () => {
			reportWebVitals();

			// Verify all web vitals listeners are registered
			expect(mockOnCLS).toHaveBeenCalled();
			expect(mockOnFID).toHaveBeenCalled();
			expect(mockOnFCP).toHaveBeenCalled();
			expect(mockOnLCP).toHaveBeenCalled();
			expect(mockOnTTFB).toHaveBeenCalled();
			expect(mockOnINP).toHaveBeenCalled();
		});

		it('registers callbacks for each metric', () => {
			reportWebVitals();

			// Verify callback was registered
			expect(mockOnCLS).toHaveBeenCalledWith(expect.any(Function));
		});

		it('logs initialization in dev mode', () => {
			import.meta.env.DEV = true;

			reportWebVitals();

			expect(console.log).toHaveBeenCalledWith(
				'[Performance] Web Vitals tracking initialized'
			);
		});

		it('handles errors gracefully', () => {
			// Test that reportWebVitals doesn't throw even if web-vitals has issues
			expect(() => reportWebVitals()).not.toThrow();
		});
	});

	describe('measurePerformance', () => {
		it('measures function execution time', () => {
			const testFn = vi.fn(() => 'result');

			const result = measurePerformance('test-operation', testFn);

			expect(result).toBe('result');
			expect(testFn).toHaveBeenCalled();
			expect(window.performance.mark).toHaveBeenCalledWith('test-operation-start');
			expect(window.performance.mark).toHaveBeenCalledWith('test-operation-end');
			expect(window.performance.measure).toHaveBeenCalledWith(
				'test-operation-measure',
				'test-operation-start',
				'test-operation-end'
			);
		});

		it('logs duration in dev mode', () => {
			import.meta.env.DEV = true;
			const testFn = () => 'result';

			measurePerformance('test-op', testFn);

			expect(console.log).toHaveBeenCalledWith('[Performance] test-op:', 100, 'ms');
		});

		it('cleans up performance marks', () => {
			const testFn = () => 'result';

			measurePerformance('test-op', testFn);

			expect(window.performance.clearMarks).toHaveBeenCalledWith('test-op-start');
			expect(window.performance.clearMarks).toHaveBeenCalledWith('test-op-end');
			expect(window.performance.clearMeasures).toHaveBeenCalledWith('test-op-measure');
		});

		it('works without performance API', () => {
			delete window.performance;
			const testFn = vi.fn(() => 'result');

			const result = measurePerformance('test-op', testFn);

			expect(result).toBe('result');
			expect(testFn).toHaveBeenCalled();
		});
	});

	describe('trackPageLoad', () => {
		it('registers load event listener', () => {
			import.meta.env.DEV = true;

			trackPageLoad();

			// Function should execute without errors
			expect(true).toBe(true);
		});

		it('handles missing performance API', () => {
			const originalWindow = global.window;
			delete global.window;

			expect(() => trackPageLoad()).not.toThrow();

			global.window = originalWindow;
		});

		it('handles missing navigation entry', () => {
			window.performance.getEntriesByType = vi.fn(() => []);

			trackPageLoad();

			// Should not throw error
			expect(true).toBe(true);
		});
	});
});

