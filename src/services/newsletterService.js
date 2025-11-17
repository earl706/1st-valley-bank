/**
 * Newsletter Service
 * Handles newsletter articles and subscriptions
 */

import api, { handleApiError } from './api';

const newsletterService = {
	/**
	 * Get all newsletters with pagination
	 * @param {Object} params - Query parameters
	 * @param {number} params.page - Page number
	 * @param {number} params.page_size - Items per page
	 * @param {string} params.status - Filter by status (published, draft, archived)
	 * @param {string} params.search - Search term
	 * @returns {Promise<Object>} Newsletter list with pagination
	 */
	async getNewsletters(params = {}) {
		try {
			const response = await api.get('/newsletter/newsletters/', { params });
			return response.data;
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get single newsletter by ID
	 * @param {number} id - Newsletter ID
	 * @returns {Promise<Object>} Newsletter details
	 */
	async getNewsletter(id) {
		try {
			const response = await api.get(`/newsletter/newsletters/${id}/`);
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Create new newsletter (Admin only)
	 * @param {FormData} formData - Newsletter data with files
	 * @returns {Promise<Object>} Created newsletter
	 */
	async createNewsletter(formData) {
		try {
			const response = await api.post('/newsletters/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Update newsletter (Admin only)
	 * @param {number} id - Newsletter ID
	 * @param {FormData|Object} data - Updated data
	 * @returns {Promise<Object>} Updated newsletter
	 */
	async updateNewsletter(id, data) {
		try {
			const config = {};
			if (data instanceof FormData) {
				config.headers = { 'Content-Type': 'multipart/form-data' };
			}

			const response = await api.put(`/newsletters/${id}/`, data, config);
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Subscribe to newsletter
	 * @param {string} email - Email address
	 * @returns {Promise<Object>} Subscription status
	 */
	async subscribe(email) {
		try {
			const response = await api.post('/newsletter/subscribers/', { email: email });
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Increment the view count of a newsletter article.
	 * @param {number} id - Newsletter ID (primary key)
	 * @returns {Promise<Object>} Response with updated view count
	 */
	async incrementViewCount(id) {
		try {
			const response = await api.post(`/newsletter/newsletters/${id}/increment-view-count/`);
			return response.data;
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	}
};

export default newsletterService;
