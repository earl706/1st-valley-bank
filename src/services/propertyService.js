/**
 * Property Service
 * Handles properties for sale (vehicles and real estate)
 */

import api, { handleApiError } from './api';

const propertyService = {
	/**
	 * Get all properties
	 * @param {Object} params - Query parameters
	 * @param {string} params.property_type - Filter by type (vehicle, real_estate)
	 * @param {string} params.status - Filter by status (available, reserved, sold)
	 * @param {number} params.min_price - Minimum price
	 * @param {number} params.max_price - Maximum price
	 * @param {number} params.page - Page number
	 * @param {number} params.page_size - Items per page
	 * @returns {Promise<Object>} Properties list
	 */
	async getProperties(params = {}) {
		try {
			const response = await api.get('/properties/properties/', { params });
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get single property
	 * @param {number} id - Property ID
	 * @returns {Promise<Object>} Property details
	 */
	async getProperty(id) {
		try {
			const response = await api.get(`/properties/properties/${id}/`);
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get vehicles for sale
	 * @param {Object} params - Query parameters
	 * @returns {Promise<Object>} Vehicle listings
	 */
	async getVehicles(params = {}) {
		return this.getProperties({ ...params, property_type: 'vehicle' });
	},

	/**
	 * Get real estate for sale
	 * @param {Object} params - Query parameters
	 * @returns {Promise<Object>} Real estate listings
	 */
	async getRealEstate(params = {}) {
		return this.getProperties({ ...params, property_type: 'real_estate' });
	},

	/**
	 * Get featured properties
	 * @returns {Promise<Object>} Featured properties list
	 */
	async getFeaturedProperties() {
		try {
			const response = await api.get('/properties/properties/', {
				params: { is_featured: true, status: 'available' }
			});
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	}
};

export default propertyService;
