/**
 * Location Service
 * Handles branch and ATM locations
 */

import api, { handleApiError } from './api';

const locationService = {
	// ========== Branches ==========

	/**
	 * Get all branches
	 * @param {Object} params - Query parameters
	 * @param {string} params.region - Filter by region (mindanao, visayas, luzon, ncr)
	 * @param {boolean} params.has_atm - Filter branches with ATM
	 * @param {boolean} params.is_active - Filter by active status
	 * @returns {Promise<Object>} Branches list grouped by region
	 */
	async getBranches(params = {}) {
		try {
			const response = await api.get('/locations/branches/', { params });
			return { success: true, data: response.data.results };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get single branch
	 * @param {number} id - Branch ID
	 * @returns {Promise<Object>} Branch details
	 */
	async getBranch(id) {
		try {
			const response = await api.get(`/branches/${id}/`);
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get branches by region
	 * @param {string} region - Region (mindanao, visayas, luzon, ncr)
	 * @returns {Promise<Object>} Branches in the region
	 */
	async getBranchesByRegion(region) {
		return this.getBranches({ region });
	},

	// ========== ATM Locations ==========

	/**
	 * Get all ATM locations
	 * @param {Object} params - Query parameters
	 * @param {boolean} params.is_24_hours - Filter 24-hour ATMs
	 * @param {number} params.branch_id - Filter by branch
	 * @returns {Promise<Object>} ATM locations list
	 */
	async getATMs(params = {}) {
		try {
			const response = await api.get('/locations/atms/', { params });
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get single ATM location
	 * @param {number} id - ATM ID
	 * @returns {Promise<Object>} ATM details
	 */
	async getATM(id) {
		try {
			const response = await api.get(`/atms/${id}/`);
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Search places via backend Google Maps proxy
	 * @param {string} query - Free-form address text
	 * @param {Object} params - Additional query params (limit, country, etc.)
	 */
	async searchPlaces(query, params = {}) {
		if (!query || !query.trim()) {
			return { success: true, data: [] };
		}

		try {
			const response = await api.get('/locations/autocomplete/', {
				params: {
					query,
					limit: params.limit ?? 5,
					region: params.region ?? params.country ?? 'ph',
					language: params.language ?? 'en',
					session_token: params.sessionToken
				}
			});
			return { success: true, data: response.data?.results || [] };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Find the nearest branch based on a structured Philippine address.
	 * @param {Object} payload
	 * @param {string} payload.province
	 * @param {string} payload.municipality
	 * @param {string} payload.barangay
	 * @param {string} [payload.address] - Optional full address string override
	 * @param {boolean} [payload.has_atm] - Optional filter to show only branches with ATM
	 */
	async findNearestBranchByAddress({ province, municipality, barangay, address, has_atm }) {
		try {
			const response = await api.post('/locations/branches/nearest/', {
				province,
				municipality,
				barangay,
				address,
				has_atm
			});
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Find the nearest ATM based on a structured Philippine address.
	 * @param {Object} payload
	 * @param {string} payload.province
	 * @param {string} payload.municipality
	 * @param {string} payload.barangay
	 * @param {string} [payload.address] - Optional full address string override
	 */
	async findNearestATMByAddress({ province, municipality, barangay, address }) {
		try {
			const response = await api.post('/locations/atms/nearest/', {
				province,
				municipality,
				barangay,
				address
			});
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Reverse geocode coordinates via backend Google Maps proxy
	 * @param {number} latitude
	 * @param {number} longitude
	 */
	async reverseGeocode({ latitude, longitude }) {
		if (latitude === undefined || longitude === undefined) {
			return { success: false, message: 'Latitude and longitude are required.' };
		}

		try {
			const response = await api.get('/locations/google-reverse-geocode/', {
				params: { latitude, longitude }
			});
			return { success: true, data: response.data?.result || null };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Find nearest branch or ATM
	 * @param {number} latitude - User's latitude
	 * @param {number} longitude - User's longitude
	 * @param {string} type - 'branch' or 'atm'
	 * @returns {Promise<Object>} Nearest location
	 */
	async findNearest(latitude, longitude, type = 'branch') {
		try {
			const response = await api.get(`/${type}s/nearest/`, {
				params: { latitude, longitude }
			});
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	}
};

export default locationService;
