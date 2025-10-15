/**
 * Search Service
 * Handles global search functionality
 */

import api, { handleApiError } from './api';

const searchService = {
	/**
	 * Perform global search
	 * @param {string} query - Search query
	 * @param {string} category - Optional category filter (newsletters, loans, deposits, properties, faqs)
	 * @returns {Promise<Object>} Search results
	 */
	async search(query, category = null) {
		try {
			const params = { q: query };
			if (category) {
				params.category = category;
			}

			const response = await api.get('/search/', { params });
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	}
};

export default searchService;
