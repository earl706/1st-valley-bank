/**
 * Contact Service
 * Handles contact form submissions
 */

import api, { handleApiError } from './api';

const contactService = {
	/**
	 * Submit contact form
	 * @param {Object} formData - Contact form data
	 * @param {string} formData.name - Full name
	 * @param {string} formData.email - Email address
	 * @param {string} formData.subject - Subject/inquiry type
	 * @param {string} formData.contact_number - Phone number
	 * @param {string} formData.barangay - Barangay
	 * @param {string} formData.municipality - Municipality/City
	 * @param {string} formData.province - Province
	 * @param {string} formData.message - Message content
	 * @returns {Promise<Object>} Submission confirmation
	 */
	async submitContact(formData) {
		try {
			const response = await api.post('/contact/submissions/create/', formData);
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	}
};

export default contactService;
