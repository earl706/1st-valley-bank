/**
 * Advisory Service
 * Handles 1VB Advisory gallery images
 */

import api, { handleApiError } from './api';

const advisoryService = {
	/**
	 * Get all advisory gallery images
	 * @returns {Promise<Object>} Gallery images
	 */
	async getGallery() {
		try {
			const response = await api.get('/advisory/gallery/');
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get single advisory image
	 * @param {number} id - Image ID
	 * @returns {Promise<Object>} Image details
	 */
	async getImage(id) {
		try {
			const response = await api.get(`/advisory/gallery/${id}/`);
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	}
};

export default advisoryService;
