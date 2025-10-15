/**
 * Homepage Service
 * Handles homepage content (hero slides, testimonials, FAQs, statistics)
 */

import api, { handleApiError } from './api';

const homepageService = {
	/**
	 * Get hero carousel slides
	 * @returns {Promise<Object>} Hero slides
	 */
	async getHeroSlides() {
		try {
			const response = await api.get('/homepage/hero-slides/');
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get testimonials
	 * @returns {Promise<Object>} Customer testimonials
	 */
	async getTestimonials() {
		try {
			const response = await api.get('/homepage/testimonials/');
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get FAQs
	 * @param {Object} params - Query parameters
	 * @param {string} params.category - Filter by category (accounts, loans, etc.)
	 * @returns {Promise<Object>} FAQs list
	 */
	async getFAQs(params = {}) {
		try {
			const response = await api.get('/homepage/faqs/', { params });
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get bank statistics
	 * @returns {Promise<Object>} Bank statistics
	 */
	async getStatistics() {
		try {
			const response = await api.get('/homepage/statistics/');
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get all homepage content at once
	 * @returns {Promise<Object>} All homepage data
	 */
	async getAllContent() {
		try {
			const [heroSlides, testimonials, faqs, statistics] = await Promise.all([
				this.getHeroSlides(),
				this.getTestimonials(),
				this.getFAQs(),
				this.getStatistics()
			]);

			return {
				success: true,
				data: {
					heroSlides: heroSlides.data || [],
					testimonials: testimonials.data || [],
					faqs: faqs.data || [],
					statistics: statistics.data || []
				}
			};
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	}
};

export default homepageService;
