/**
 * Search Suggestions Service
 * Lightweight service for fetching autocomplete suggestions.
 * Uses dedicated endpoint that returns minimal data only.
 */

import api from './api';

const searchSuggestionsService = {
	/**
	 * Get search suggestions for autocomplete
	 * @param {string} query - Search query (min 2 chars)
	 * @param {AbortSignal} signal - AbortSignal for request cancellation
	 * @returns {Promise<Array>} Array of suggestion objects with id, title, subtitle, type, path
	 */
	async getSuggestions(query, signal = null) {
		if (!query || query.trim().length < 2) {
			return [];
		}

		try {
			const response = await api.get('/landing/search-suggestions/', {
				params: { q: query.trim() },
				signal // Performance: Allow request cancellation for stale queries
			});
			return response.data?.results || [];
		} catch (error) {
			// Performance: Ignore aborted requests (user typed new query)
			if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
				return [];
			}
			console.error('Error fetching search suggestions:', error);
			return [];
		}
	}
};

export default searchSuggestionsService;

