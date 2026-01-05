/**
 * Security utilities for input sanitization and validation
 */

import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} dirty - Unsanitized HTML string
 * @param {Object} config - DOMPurify configuration options
 * @returns {string} Sanitized HTML string
 */
export const sanitizeHTML = (dirty, config = {}) => {
	if (!dirty || typeof dirty !== 'string') {
		return '';
	}

	const defaultConfig = {
		ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		ALLOWED_ATTR: ['href', 'title', 'target'],
		ALLOW_DATA_ATTR: false,
		...config
	};

	return DOMPurify.sanitize(dirty, defaultConfig);
};

/**
 * Sanitize plain text input (removes all HTML)
 * @param {string} input - User input string
 * @returns {string} Sanitized plain text
 */
export const sanitizeText = (input) => {
	if (!input || typeof input !== 'string') {
		return '';
	}
	// Remove all HTML tags and decode entities
	return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};

/**
 * Sanitize email address
 * @param {string} email - Email address
 * @returns {string} Sanitized email
 */
export const sanitizeEmail = (email) => {
	if (!email || typeof email !== 'string') {
		return '';
	}
	// Remove any HTML and trim whitespace
	return sanitizeText(email).trim().toLowerCase();
};

/**
 * Sanitize phone number (keep only digits, +, -, spaces, parentheses)
 * @param {string} phone - Phone number
 * @returns {string} Sanitized phone number
 */
export const sanitizePhone = (phone) => {
	if (!phone || typeof phone !== 'string') {
		return '';
	}
	// Allow only digits, +, -, spaces, and parentheses
	return phone.replace(/[^\d+\-()\s]/g, '').trim();
};

/**
 * Sanitize form data object
 * @param {Object} formData - Form data object
 * @param {Object} fieldConfig - Configuration for each field type
 * @returns {Object} Sanitized form data
 */
export const sanitizeFormData = (formData, fieldConfig = {}) => {
	const sanitized = {};

	for (const [key, value] of Object.entries(formData)) {
		if (value === null || value === undefined) {
			sanitized[key] = value;
			continue;
		}

		const config = fieldConfig[key] || {};
		const fieldType = config.type || 'text';

		switch (fieldType) {
			case 'email':
				sanitized[key] = sanitizeEmail(value);
				break;
			case 'phone':
				sanitized[key] = sanitizePhone(value);
				break;
			case 'html':
				sanitized[key] = sanitizeHTML(value, config.htmlConfig);
				break;
			case 'text':
			default:
				sanitized[key] = sanitizeText(value);
				break;
		}

		// Apply max length if specified
		if (config.maxLength && sanitized[key].length > config.maxLength) {
			sanitized[key] = sanitized[key].substring(0, config.maxLength);
		}
	}

	return sanitized;
};

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
	if (!email || typeof email !== 'string') {
		return false;
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email.trim());
};

/**
 * Validate phone number format (basic)
 * @param {string} phone - Phone number
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
	if (!phone || typeof phone !== 'string') {
		return false;
	}
	// At least 7 digits (international format)
	const digitsOnly = phone.replace(/\D/g, '');
	return digitsOnly.length >= 7 && digitsOnly.length <= 15;
};

/**
 * Rate limiting utility
 */
class RateLimiter {
	constructor(maxRequests = 5, windowMs = 60000) {
		this.maxRequests = maxRequests;
		this.windowMs = windowMs;
		this.requests = new Map();
	}

	/**
	 * Check if request is allowed
	 * @param {string} key - Unique identifier (e.g., user IP, form type)
	 * @returns {boolean} True if allowed
	 */
	isAllowed(key) {
		const now = Date.now();
		const userRequests = this.requests.get(key) || [];

		// Remove old requests outside the window
		const recentRequests = userRequests.filter(
			(timestamp) => now - timestamp < this.windowMs
		);

		if (recentRequests.length >= this.maxRequests) {
			return false;
		}

		// Add current request
		recentRequests.push(now);
		this.requests.set(key, recentRequests);

		return true;
	}

	/**
	 * Get time until next request is allowed (in seconds)
	 * @param {string} key - Unique identifier
	 * @returns {number} Seconds until next request allowed
	 */
	getTimeUntilNext(key) {
		const now = Date.now();
		const userRequests = this.requests.get(key) || [];
		const recentRequests = userRequests.filter(
			(timestamp) => now - timestamp < this.windowMs
		);

		if (recentRequests.length < this.maxRequests) {
			return 0;
		}

		const oldestRequest = recentRequests[0];
		const timeUntilOldestExpires = this.windowMs - (now - oldestRequest);
		return Math.ceil(timeUntilOldestExpires / 1000);
	}

	/**
	 * Reset rate limit for a key
	 * @param {string} key - Unique identifier
	 */
	reset(key) {
		this.requests.delete(key);
	}
}

// Create singleton instances for different use cases
export const contactFormRateLimiter = new RateLimiter(3, 60000); // 3 requests per minute
export const newsletterRateLimiter = new RateLimiter(5, 60000); // 5 requests per minute

/**
 * Get a unique key for rate limiting (uses form type + user agent hash)
 * @param {string} formType - Type of form (e.g., 'contact', 'newsletter')
 * @returns {string} Unique key
 */
export const getRateLimitKey = (formType) => {
	// Use form type + a simple hash of user agent (not perfect, but better than nothing)
	const userAgent = navigator.userAgent || '';
	const simpleHash = userAgent.split('').reduce((acc, char) => {
		return ((acc << 5) - acc) + char.charCodeAt(0);
	}, 0);
	return `${formType}_${Math.abs(simpleHash)}`;
};

/**
 * Secure console logging (only in development)
 * @param {...any} args - Arguments to log
 */
export const secureLog = (...args) => {
	if (import.meta.env.DEV) {
		// In development, log normally but sanitize sensitive data
		const sanitizedArgs = args.map((arg) => {
			if (typeof arg === 'object' && arg !== null) {
				const sanitized = { ...arg };
				// Mask sensitive fields
				if (sanitized.email) {
					sanitized.email = sanitized.email.replace(/(.{2}).*(@.*)/, '$1***$2');
				}
				if (sanitized.contact_number || sanitized.phone) {
					const phone = sanitized.contact_number || sanitized.phone;
					sanitized.contact_number = phone ? phone.replace(/\d(?=\d{4})/g, '*') : phone;
					sanitized.phone = sanitized.contact_number;
				}
				if (sanitized.password) {
					sanitized.password = '***';
				}
				return sanitized;
			}
			return arg;
		});
		console.log(...sanitizedArgs);
	}
	// In production, do nothing
};

/**
 * Secure error logging
 * @param {string} message - Error message
 * @param {Error} error - Error object
 */
export const secureErrorLog = (message, error) => {
	if (import.meta.env.DEV) {
		console.error(message, error);
	} else {
		// In production, send to error tracking service (e.g., Sentry)
		// Don't log sensitive data
		if (window.Sentry) {
			window.Sentry.captureException(error, {
				tags: { context: message },
				extra: { message }
			});
		}
	}
};

