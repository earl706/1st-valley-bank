import * as Sentry from '@sentry/react';

export function initSentry() {
	const dsn = import.meta.env.VITE_SENTRY_DSN;
	if (!dsn) return;
    
	const environment =
		import.meta?.env?.VITE_APP_ENV || import.meta?.env?.MODE || 'development';

	// Keep costs predictable at small traffic volumes.
	const tracesSampleRateRaw = import.meta?.env?.VITE_SENTRY_TRACES_SAMPLE_RATE;
	const tracesSampleRate = tracesSampleRateRaw ? Number(tracesSampleRateRaw) : 0.05;
	Sentry.init({
		dsn:dsn,
		environment,
        setDefaultPii:true,
		// Basic tracing; we intentionally avoid session replay by default.
		integrations: [Sentry.browserTracingIntegration()],
		tracesSampleRate: Number.isFinite(tracesSampleRate) ? tracesSampleRate : 0.05,
		beforeSend(event) {
			// Best-effort scrubbing: avoid shipping cookies or full URLs with query params.
			if (event?.request?.cookies) delete event.request.cookies;
			if (event?.request?.url) {
				try {
					const url = new URL(event.request.url);
					url.search = '';
					event.request.url = url.toString();
				} catch {
					// ignore
				}
			}
			return event;
		}    
	});
}


