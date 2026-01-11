/**
 * Performance Monitoring Utility
 * Tracks Web Vitals and sends metrics to analytics services
 */

import { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

/**
 * Send performance metrics to analytics
 * You can customize this to send to your analytics service (e.g., Google Analytics, custom API)
 */
function sendToAnalytics(metric) {
	// In development, log to console
	if (import.meta.env.DEV) {
		// console.log('[Performance]', metric.name, {
		// 	value: metric.value,
		// 	rating: metric.rating,
		// 	delta: metric.delta,
		// 	id: metric.id
		// });
	}

	// In production, you can send to your analytics service
	if (import.meta.env.PROD) {
		// Example: Send to Google Analytics
		if (window.gtag) {
		  window.gtag('event', metric.name, {
		    event_category: 'Web Vitals',
		    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
		    event_label: metric.id,
		    non_interaction: true,
		  });
		}
		// Example: Send to custom API endpoint
		// fetch('/api/analytics/performance', {
		//   method: 'POST',
		//   headers: { 'Content-Type': 'application/json' },
		//   body: JSON.stringify({
		//     name: metric.name,
		//     value: metric.value,
		//     rating: metric.rating,
		//     delta: metric.delta,
		//     id: metric.id,
		//     url: window.location.href,
		//     timestamp: Date.now(),
		//   }),
		// }).catch(console.error);
	}
}

/**
 * Initialize Web Vitals tracking
 */
export function reportWebVitals() {
	try {
		// Core Web Vitals
		onCLS(sendToAnalytics); // Cumulative Layout Shift
		onFID(sendToAnalytics); // First Input Delay (deprecated, use INP)
		onFCP(sendToAnalytics); // First Contentful Paint
		onLCP(sendToAnalytics); // Largest Contentful Paint
		onTTFB(sendToAnalytics); // Time to First Byte
		onINP(sendToAnalytics); // Interaction to Next Paint (replaces FID)

		if (import.meta.env.DEV) {
			// console.log('[Performance] Web Vitals tracking initialized');
		}
	} catch (error) {
		// console.error('[Performance] Failed to initialize Web Vitals:', error);
	}
}

/**
 * Measure custom performance metrics
 */
export function measurePerformance(name, fn) {
	if (typeof performance !== 'undefined' && performance.mark) {
		const startMark = `${name}-start`;
		const endMark = `${name}-end`;
		const measureName = `${name}-measure`;

		performance.mark(startMark);
		const result = fn();
		performance.mark(endMark);
		performance.measure(measureName, startMark, endMark);

		const measure = performance.getEntriesByName(measureName)[0];
		if (import.meta.env.DEV) {
			// console.log(`[Performance] ${name}:`, measure.duration, 'ms');
		}

		// Clean up
		performance.clearMarks(startMark);
		performance.clearMarks(endMark);
		performance.clearMeasures(measureName);

		return result;
	}
	return fn();
}

/**
 * Track page load performance
 */
export function trackPageLoad() {
	if (typeof window !== 'undefined' && window.performance) {
		window.addEventListener('load', () => {
			setTimeout(() => {
				const navigation = performance.getEntriesByType('navigation')[0];
				if (navigation) {
					const metrics = {
						dns: navigation.domainLookupEnd - navigation.domainLookupStart,
						tcp: navigation.connectEnd - navigation.connectStart,
						request: navigation.responseStart - navigation.requestStart,
						response: navigation.responseEnd - navigation.responseStart,
						dom: navigation.domContentLoadedEventEnd - navigation.domLoading,
						load: navigation.loadEventEnd - navigation.loadEventStart,
						total: navigation.loadEventEnd - navigation.fetchStart
					};

					if (import.meta.env.DEV) {
						// console.log('[Performance] Page Load Metrics:', metrics);
					}

					// Send to analytics if needed
					if (import.meta.env.PROD) {
						// Custom analytics integration here
					}
				}
			}, 0);
		});
	}
}
