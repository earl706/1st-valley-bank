/**
 * Form validation utilities
 */

import { isValidEmail, isValidPhone } from './security';

/**
 * Validation result type
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether the validation passed
 * @property {Object} errors - Object with field names as keys and error messages as values
 */

/**
 * Validate contact form data
 * @param {Object} formData - Contact form data
 * @returns {ValidationResult} Validation result
 */
export const validateContactForm = (formData) => {
	const errors = {};

	// Name validation
	if (!formData.name || formData.name.trim().length < 2) {
		errors.name = 'Name must be at least 2 characters';
	} else if (formData.name.trim().length > 255) {
		errors.name = 'Name must be less than 255 characters';
	}

	// Email validation
	if (!formData.email || !formData.email.trim()) {
		errors.email = 'Email is required';
	} else if (!isValidEmail(formData.email)) {
		errors.email = 'Please enter a valid email address';
	}

	// Phone validation
	if (!formData.contact_number || !formData.contact_number.trim()) {
		errors.contact_number = 'Contact number is required';
	} else if (!isValidPhone(formData.contact_number)) {
		errors.contact_number = 'Please enter a valid phone number';
	}

	// Subject validation
	if (!formData.subject || !formData.subject.trim()) {
		errors.subject = 'Please select a subject';
	}

	// Message validation
	if (!formData.message || formData.message.trim().length < 10) {
		errors.message = 'Message must be at least 10 characters';
	} else if (formData.message.length > 5000) {
		errors.message = 'Message must be less than 5000 characters';
	}

	// Address fields (optional but validate if provided)
	if (formData.barangay && formData.barangay.length > 255) {
		errors.barangay = 'Barangay name is too long';
	}
	if (formData.municipality && formData.municipality.length > 255) {
		errors.municipality = 'Municipality name is too long';
	}
	if (formData.province && formData.province.length > 255) {
		errors.province = 'Province name is too long';
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors
	};
};

/**
 * Validate newsletter subscription
 * @param {string} email - Email address
 * @returns {ValidationResult} Validation result
 */
export const validateNewsletterEmail = (email) => {
	const errors = {};

	if (!email || !email.trim()) {
		errors.email = 'Email is required';
	} else if (!isValidEmail(email)) {
		errors.email = 'Please enter a valid email address';
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors
	};
};

/**
 * Validate feedback form
 * @param {Object} formData - Feedback form data
 * @returns {ValidationResult} Validation result
 */
export const validateFeedbackForm = (formData) => {
	const errors = {};

	if (!formData.name || formData.name.trim().length < 2) {
		errors.name = 'Name must be at least 2 characters';
	}

	if (formData.email && !isValidEmail(formData.email)) {
		errors.email = 'Please enter a valid email address';
	}

	if (formData.contactNumber && !isValidPhone(formData.contactNumber)) {
		errors.contactNumber = 'Please enter a valid phone number';
	}

	if (!formData.date) {
		errors.date = 'Date is required';
	}

	if (formData.details && formData.details.trim().length < 10) {
		errors.details = 'Details must be at least 10 characters';
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors
	};
};

/**
 * Generic field validator
 * @param {string} value - Field value
 * @param {Object} rules - Validation rules
 * @returns {string|null} Error message or null if valid
 */
export const validateField = (value, rules) => {
	if (rules.required && (!value || !value.toString().trim())) {
		return rules.requiredMessage || 'This field is required';
	}

	if (value && rules.minLength && value.length < rules.minLength) {
		return rules.minLengthMessage || `Must be at least ${rules.minLength} characters`;
	}

	if (value && rules.maxLength && value.length > rules.maxLength) {
		return rules.maxLengthMessage || `Must be less than ${rules.maxLength} characters`;
	}

	if (value && rules.pattern && !rules.pattern.test(value)) {
		return rules.patternMessage || 'Invalid format';
	}

	if (value && rules.type === 'email' && !isValidEmail(value)) {
		return 'Please enter a valid email address';
	}

	if (value && rules.type === 'phone' && !isValidPhone(value)) {
		return 'Please enter a valid phone number';
	}

	return null;
};

