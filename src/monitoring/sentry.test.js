import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as Sentry from '@sentry/react';

// Mock Sentry before importing the module under test
vi.mock('@sentry/react', () => ({
	default: {
		init: vi.fn(),
		browserTracingIntegration: vi.fn(() => 'browserTracingIntegration')
	},
	init: vi.fn(),
	browserTracingIntegration: vi.fn(() => 'browserTracingIntegration')
}));

describe('sentry', () => {
	let originalEnv;
	let sentryModule;

	beforeEach(async () => {
		vi.clearAllMocks();
		vi.resetModules();
		// Store original env but don't try to mutate import.meta.env directly
		originalEnv = {
			VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
			VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
			MODE: import.meta.env.MODE,
			VITE_SENTRY_TRACES_SAMPLE_RATE: import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE
		};
		// Reload module to get fresh state
		sentryModule = await import('./sentry');
	});

	afterEach(() => {
		// Restore is handled by vi.resetModules in next beforeEach
	});

	describe('initSentry', () => {
		it('does not initialize Sentry when DSN is not provided', async () => {
			vi.resetModules();
			// Mock env without DSN
			vi.stubEnv('VITE_SENTRY_DSN', '');
			
			const { initSentry } = await import('./sentry');
			initSentry();

			expect(Sentry.init).not.toHaveBeenCalled();
			
			vi.unstubAllEnvs();
		});

		it('initializes Sentry with DSN and default environment', async () => {
			vi.resetModules();
			vi.stubEnv('VITE_SENTRY_DSN', 'test-dsn-123');
			vi.stubEnv('VITE_APP_ENV', undefined);
			vi.stubEnv('MODE', undefined);

			const { initSentry } = await import('./sentry');
			initSentry();

			expect(Sentry.init).toHaveBeenCalled();
			const callArgs = Sentry.init.mock.calls[0][0];
			expect(callArgs.dsn).toBe('test-dsn-123');
			expect(callArgs.environment).toBe('development');
			expect(callArgs.setDefaultPii).toBe(true);
			expect(callArgs.integrations).toContain('browserTracingIntegration');
			expect(callArgs.tracesSampleRate).toBe(0.05);
			
			vi.unstubAllEnvs();
		});

		it('uses VITE_APP_ENV for environment when provided', async () => {
			vi.resetModules();
			vi.stubEnv('VITE_SENTRY_DSN', 'test-dsn');
			vi.stubEnv('VITE_APP_ENV', 'production');

			const { initSentry } = await import('./sentry');
			initSentry();

			expect(Sentry.init).toHaveBeenCalled();
			const callArgs = Sentry.init.mock.calls[0][0];
			expect(callArgs.environment).toBe('production');
			
			vi.unstubAllEnvs();
		});

		it('falls back to MODE when VITE_APP_ENV is not available', async () => {
			vi.resetModules();
			vi.stubEnv('VITE_SENTRY_DSN', 'test-dsn');
			vi.stubEnv('VITE_APP_ENV', undefined);
			vi.stubEnv('MODE', 'test-mode');

			const { initSentry } = await import('./sentry');
			initSentry();

			expect(Sentry.init).toHaveBeenCalled();
			const callArgs = Sentry.init.mock.calls[0][0];
			expect(callArgs.environment).toBe('test-mode');
			
			vi.unstubAllEnvs();
		});

		it('uses custom tracesSampleRate when provided', async () => {
			vi.resetModules();
			vi.stubEnv('VITE_SENTRY_DSN', 'test-dsn');
			vi.stubEnv('VITE_SENTRY_TRACES_SAMPLE_RATE', '0.2');

			const { initSentry } = await import('./sentry');
			initSentry();

			expect(Sentry.init).toHaveBeenCalled();
			const callArgs = Sentry.init.mock.calls[0][0];
			expect(callArgs.tracesSampleRate).toBe(0.2);
			
			vi.unstubAllEnvs();
		});

		it('defaults to 0.05 tracesSampleRate when not provided', async () => {
			vi.resetModules();
			vi.stubEnv('VITE_SENTRY_DSN', 'test-dsn');
			vi.stubEnv('VITE_SENTRY_TRACES_SAMPLE_RATE', undefined);

			const { initSentry } = await import('./sentry');
			initSentry();

			expect(Sentry.init).toHaveBeenCalled();
			const callArgs = Sentry.init.mock.calls[0][0];
			expect(callArgs.tracesSampleRate).toBe(0.05);
			
			vi.unstubAllEnvs();
		});

		it('handles invalid tracesSampleRate and defaults to 0.05', async () => {
			vi.resetModules();
			vi.stubEnv('VITE_SENTRY_DSN', 'test-dsn');
			vi.stubEnv('VITE_SENTRY_TRACES_SAMPLE_RATE', 'invalid-number');

			const { initSentry } = await import('./sentry');
			initSentry();

			expect(Sentry.init).toHaveBeenCalled();
			const callArgs = Sentry.init.mock.calls[0][0];
			expect(callArgs.tracesSampleRate).toBe(0.05);
			
			vi.unstubAllEnvs();
		});
        
		it('includes browserTracingIntegration in integrations', async () => {
			vi.resetModules();
			vi.stubEnv('VITE_SENTRY_DSN', 'test-dsn');

			const { initSentry } = await import('./sentry');
			initSentry();

			expect(Sentry.browserTracingIntegration).toHaveBeenCalled();
			expect(Sentry.init).toHaveBeenCalled();
			const callArgs = Sentry.init.mock.calls[0][0];
			expect(callArgs.integrations).toContain('browserTracingIntegration');
			
			vi.unstubAllEnvs();
		});

		it('removes cookies from request in beforeSend', async () => {
			vi.resetModules();
			vi.stubEnv('VITE_SENTRY_DSN', 'test-dsn');

			const { initSentry } = await import('./sentry');
			initSentry();

			expect(Sentry.init).toHaveBeenCalled();
			const initCall = Sentry.init.mock.calls[0][0];
			const beforeSend = initCall.beforeSend;

			const event = {
				request: {
					cookies: { sessionId: '123' },
					url: 'https://example.com/page?param=value'
				}
			};

			const result = beforeSend(event);

			expect(result.request.cookies).toBeUndefined();
			
			vi.unstubAllEnvs();
		});

		it('removes query params from URL in beforeSend', async () => {
			vi.resetModules();
			vi.stubEnv('VITE_SENTRY_DSN', 'test-dsn');

			const { initSentry } = await import('./sentry');
			initSentry();

			expect(Sentry.init).toHaveBeenCalled();
			const initCall = Sentry.init.mock.calls[0][0];
			const beforeSend = initCall.beforeSend;

			const event = {
				request: {
					url: 'https://example.com/page?param=value&other=123'
				}
			};

			const result = beforeSend(event);

			expect(result.request.url).toBe('https://example.com/page');
			
			vi.unstubAllEnvs();
		});

		it('handles invalid URL gracefully in beforeSend', async () => {
			vi.resetModules();
			vi.stubEnv('VITE_SENTRY_DSN', 'test-dsn');

			const { initSentry } = await import('./sentry');
			initSentry();

			expect(Sentry.init).toHaveBeenCalled();
			const initCall = Sentry.init.mock.calls[0][0];
			const beforeSend = initCall.beforeSend;

			const event = {
				request: {
					url: 'not-a-valid-url'
				}
			};

			// Should not throw, should return event unchanged
			const result = beforeSend(event);
			expect(result).toBeDefined();
			
			vi.unstubAllEnvs();
		});

		it('returns event unchanged if request is missing', async () => {
			vi.resetModules();
			vi.stubEnv('VITE_SENTRY_DSN', 'test-dsn');

			const { initSentry } = await import('./sentry');
			initSentry();

			expect(Sentry.init).toHaveBeenCalled();
			const initCall = Sentry.init.mock.calls[0][0];
			const beforeSend = initCall.beforeSend;

			const event = {};

			const result = beforeSend(event);
			expect(result).toEqual(event);
			
			vi.unstubAllEnvs();
		});
	});
});

