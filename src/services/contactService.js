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
	},

	/**
	 * Get all contact submissions (Admin only)
	 * @param {Object} params - Query parameters
	 * @param {number} params.page - Page number
	 * @param {string} params.status - Filter by status (new, in_progress, resolved, closed)
	 * @param {string} params.subject - Filter by subject
	 * @param {string} params.search - Search term
	 * @returns {Promise<Object>} Contact submissions list
	 */
	async getSubmissions(params = {}) {
		try {
			const response = await api.get('/contact/submissions/', { params });
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get single contact submission (Admin only)
	 * @param {number} id - Submission ID
	 * @returns {Promise<Object>} Submission details
	 */
	async getSubmission(id) {
		try {
			const response = await api.get(`/contact/submissions/${id}/`);
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Update contact submission status (Admin only)
	 * @param {number} id - Submission ID
	 * @param {Object} data - Update data
	 * @param {string} data.status - New status
	 * @param {string} data.admin_notes - Admin notes
	 * @returns {Promise<Object>} Updated submission
	 */
	async updateSubmission(id, data) {
		try {
			const response = await api.patch(`/contact/submissions/${id}/`, data);
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	}
};

export default contactService;
