import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { reportWebVitals, trackPageLoad } from './utils/performance.js';
import { initSentry } from './monitoring/sentry.js';
import { initGA4 } from './analytics/ga4.js';
import * as Sentry from "@sentry/react";


// Initialize performance monitoring
reportWebVitals();
trackPageLoad();
// Initialize monitoring/analytics (no-ops if env vars are missing)
initSentry();
initGA4();

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>
);
