import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { reportWebVitals, trackPageLoad } from './utils/performance.js';

// Initialize performance monitoring
reportWebVitals();
trackPageLoad();

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>
);
