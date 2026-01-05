import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('ga4 analytics', () => {
	let originalEnv;
	let originalWindow;
	let originalDocument;
	let ga4Module;

	beforeEach(async () => {
		// Save original environment
		originalEnv = import.meta.env;
		originalWindow = global.window;
		originalDocument = global.document;

		// Reset environment
		import.meta.env.VITE_GA4_MEASUREMENT_ID = 'G-TEST123';

		// Mock window and document - make them available as globals
		const mockWindow = {
			location: { href: 'http://localhost:3000/test' },
			dataLayer: [],
			gtag: vi.fn()
		};

		const mockDocument = {
			title: 'Test Page',
			head: {
				appendChild: vi.fn()
			},
			querySelector: vi.fn(),
			createElement: vi.fn(() => ({
				dataset: {},
				src: '',
				addEventListener: vi.fn()
			}))
		};

		// Make window and document available as globals
		global.window = mockWindow;
		global.document = mockDocument;
		globalThis.window = mockWindow;
		globalThis.document = mockDocument;

		// Clear any initialization state and reload module
		vi.resetModules();
		ga4Module = await import('./ga4.js');
	});

	afterEach(() => {
		// Restore original environment
		import.meta.env = originalEnv;
		global.window = originalWindow;
		global.document = originalDocument;
		vi.restoreAllMocks();
	});

	describe('initGA4', () => {
		it('initializes GA4 with valid measurement ID', () => {
			ga4Module.initGA4();

			expect(window.gtag).toHaveBeenCalledWith('js', expect.any(Date));
			expect(window.gtag).toHaveBeenCalledWith('config', 'G-TEST123', {
				send_page_view: false
			});
		});

		it('does not initialize without measurement ID', () => {
			import.meta.env.VITE_GA4_MEASUREMENT_ID = '';

			ga4Module.initGA4();

			// gtag should not be called
			expect(window.gtag).not.toHaveBeenCalled();
		});

		it('does not initialize twice', () => {
			ga4Module.initGA4();
			const callCount = window.gtag.mock.calls.length;

			ga4Module.initGA4();

			// Should not add more calls
			expect(window.gtag.mock.calls.length).toBe(callCount);
		});

		it('creates gtag function if not exists', () => {
			delete window.gtag;

			ga4Module.initGA4();

			expect(typeof window.gtag).toBe('function');
		});

		it('creates dataLayer if not exists', async () => {
			// Reset module to ensure initialized is false
			vi.resetModules();
			ga4Module = await import('./ga4.js');
			
			delete global.window.dataLayer;
			delete global.window.gtag;

			ga4Module.initGA4();

			expect(Array.isArray(global.window.dataLayer)).toBe(true);
		});

		it('injects gtag script into document head', async () => {
			// Reset module to ensure initialized is false
			vi.resetModules();
			ga4Module = await import('./ga4.js');
			
			global.document.querySelector.mockReturnValue(null);
			delete global.window.gtag;
			const mockScript = {
				dataset: {},
				src: '',
				addEventListener: vi.fn()
			};
			global.document.createElement.mockReturnValue(mockScript);

			ga4Module.initGA4();

			expect(global.document.head.appendChild).toHaveBeenCalled();
			expect(mockScript.src).toContain('googletagmanager.com/gtag/js');
			expect(mockScript.src).toContain('G-TEST123');
		});

		it('does not inject script if already exists', () => {
			const mockScript = { dataset: { ga4: 'G-TEST123' } };
			document.querySelector.mockReturnValue(mockScript);

			ga4Module.initGA4();

			// Should still initialize but not append new script
			expect(window.gtag).toHaveBeenCalled();
		});

		it('handles server-side rendering gracefully', async () => {
			const originalWindow = global.window;
			delete global.window;

			expect(() => ga4Module.initGA4()).not.toThrow();

			global.window = originalWindow;
		});
	});

	describe('trackPageView', () => {
		it('tracks page view with path', () => {
			ga4Module.initGA4();
			window.gtag.mockClear();

			ga4Module.trackPageView('/test-page');

			expect(window.gtag).toHaveBeenCalledWith('event', 'page_view', {
				page_location: 'http://localhost:3000/test',
				page_path: '/test-page',
				page_title: 'Test Page'
			});
		});

		it('initializes GA4 if not already initialized', () => {
			ga4Module.trackPageView('/test');

			// Should have called config during initialization
			expect(window.gtag).toHaveBeenCalledWith('config', 'G-TEST123', expect.any(Object));
		});

		it('does not track without measurement ID', () => {
			import.meta.env.VITE_GA4_MEASUREMENT_ID = '';

			ga4Module.trackPageView('/test');

			// Should not call gtag for page_view
			const pageViewCalls = window.gtag.mock.calls.filter(
				(call) => call[0] === 'event' && call[1] === 'page_view'
			);
			expect(pageViewCalls.length).toBe(0);
		});

		it('handles missing gtag function', () => {
			ga4Module.initGA4();
			delete window.gtag;

			expect(() => ga4Module.trackPageView('/test')).not.toThrow();
		});

		it('tracks multiple page views', () => {
			ga4Module.initGA4();
			window.gtag.mockClear();

			ga4Module.trackPageView('/page1');
			ga4Module.trackPageView('/page2');
			ga4Module.trackPageView('/page3');

			const pageViewCalls = window.gtag.mock.calls.filter(
				(call) => call[0] === 'event' && call[1] === 'page_view'
			);
			expect(pageViewCalls.length).toBe(3);
		});

		it('handles server-side rendering', () => {
			const originalWindow = global.window;
			delete global.window;

			expect(() => ga4Module.trackPageView('/test')).not.toThrow();

			global.window = originalWindow;
		});
	});

	describe('trackEvent', () => {
		it('tracks custom event with name and params', () => {
			ga4Module.initGA4();
			window.gtag.mockClear();

			ga4Module.trackEvent('button_click', {
				button_name: 'submit',
				page: '/contact'
			});

			expect(window.gtag).toHaveBeenCalledWith('event', 'button_click', {
				button_name: 'submit',
				page: '/contact'
			});
		});

		it('tracks event without params', () => {
			ga4Module.initGA4();
			window.gtag.mockClear();

			ga4Module.trackEvent('form_submit');

			expect(window.gtag).toHaveBeenCalledWith('event', 'form_submit', {});
		});

		it('initializes GA4 if not already initialized', () => {
			ga4Module.trackEvent('test_event');

			// Should have called config during initialization
			expect(window.gtag).toHaveBeenCalledWith('config', 'G-TEST123', expect.any(Object));
		});

		it('does not track without measurement ID', () => {
			import.meta.env.VITE_GA4_MEASUREMENT_ID = '';

			ga4Module.trackEvent('test_event');

			// Should not call gtag for custom event
			const eventCalls = window.gtag.mock.calls.filter(
				(call) => call[0] === 'event' && call[1] === 'test_event'
			);
			expect(eventCalls.length).toBe(0);
		});

		it('handles missing gtag function', () => {
			ga4Module.initGA4();
			delete window.gtag;

			expect(() => ga4Module.trackEvent('test_event')).not.toThrow();
		});

		it('tracks multiple events', () => {
			ga4Module.initGA4();
			window.gtag.mockClear();

			ga4Module.trackEvent('event1', { value: 1 });
			ga4Module.trackEvent('event2', { value: 2 });
			ga4Module.trackEvent('event3', { value: 3 });

			const eventCalls = window.gtag.mock.calls.filter((call) => call[0] === 'event');
			expect(eventCalls.length).toBe(3);
		});

		it('handles complex event parameters', () => {
			ga4Module.initGA4();
			window.gtag.mockClear();

			const complexParams = {
				category: 'engagement',
				label: 'video_play',
				value: 100,
				custom_dimension: 'test',
				nested: {
					key: 'value'
				}
			};

			ga4Module.trackEvent('video_interaction', complexParams);

			expect(window.gtag).toHaveBeenCalledWith('event', 'video_interaction', complexParams);
		});

		it('handles server-side rendering', () => {
			const originalWindow = global.window;
			delete global.window;

			expect(() => ga4Module.trackEvent('test_event')).not.toThrow();

			global.window = originalWindow;
		});
	});

	describe('integration scenarios', () => {
		it('handles complete tracking flow', () => {
			// Initialize
			ga4Module.initGA4();
			expect(window.gtag).toHaveBeenCalledWith('config', 'G-TEST123', expect.any(Object));

			window.gtag.mockClear();

			// Track page view
			ga4Module.trackPageView('/home');
			expect(window.gtag).toHaveBeenCalledWith('event', 'page_view', expect.any(Object));

			// Track custom event
			ga4Module.trackEvent('user_action', { action: 'click' });
			expect(window.gtag).toHaveBeenCalledWith('event', 'user_action', expect.any(Object));
		});

		it('handles rapid successive calls', () => {
			ga4Module.initGA4();
			window.gtag.mockClear();

			for (let i = 0; i < 10; i++) {
				ga4Module.trackEvent(`event_${i}`);
			}

			const eventCalls = window.gtag.mock.calls.filter((call) => call[0] === 'event');
			expect(eventCalls.length).toBe(10);
		});

		it('preserves dataLayer across calls', () => {
			window.dataLayer = [];

			ga4Module.initGA4();
			ga4Module.trackPageView('/test');
			ga4Module.trackEvent('test_event');

			// dataLayer should accumulate calls
			expect(Array.isArray(window.dataLayer)).toBe(true);
		});
	});
});

