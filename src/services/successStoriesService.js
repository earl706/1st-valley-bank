/**
 * Success Stories Service
 * Handles success stories for loan pages
 */

import api, { handleApiError } from './api';

const successStoriesService = {
	/**
	 * Get success stories filtered by loan type
	 * @param {string} loanType - Loan type (salary, sbl, sme, sucre, agriculture, microfinance, gold_gems)
	 * @returns {Promise<Object>} Success stories
	 */
	async getByLoanType(loanType) {
		try {
			const response = await api.get('/loans/success-stories/', {
				params: { loan_type: loanType }
			});
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get all success stories
	 * @returns {Promise<Object>} All success stories
	 */
	async getAll() {
		try {
			const response = await api.get('/loans/success-stories/');
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	}
};

export default successStoriesService;
