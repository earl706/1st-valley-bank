/**
 * Product Service
 * Handles deposit and loan products
 */

import api, { handleApiError } from './api';

const productService = {
	// ========== Deposit Products ==========

	/**
	 * Get all deposit products
	 * @param {Object} params - Query parameters
	 * @param {string} params.product_type - Filter by type (savings, checking, time_deposit)
	 * @param {boolean} params.is_active - Filter by active status
	 * @returns {Promise<Object>} Deposit products list
	 */
	async getDepositProducts(params = {}) {
		try {
			const response = await api.get('/deposits/', { params });
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get deposit products by type
	 * @param {string} productType - Product type (savings, checking, time_deposit)
	 * @returns {Promise<Object>} Filtered deposit products
	 */
	async getDepositProductsByType(productType) {
		try {
			const response = await api.get(`/deposits/${productType}/`);
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get single deposit product
	 * @param {number} id - Product ID
	 * @returns {Promise<Object>} Product details
	 */
	async getDepositProduct(id) {
		try {
			const response = await api.get(`/deposits/${id}/`);
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	// ========== Loan Products ==========

	/**
	 * Get all loan products
	 * @param {Object} params - Query parameters
	 * @param {string} params.loan_type - Filter by type (agriculture, sme, etc.)
	 * @param {boolean} params.is_active - Filter by active status
	 * @returns {Promise<Object>} Loan products list
	 */
	async getLoanProducts(params = {}) {
		try {
			const response = await api.get('/loans/', { params });
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get loan products by type
	 * @param {string} loanType - Loan type (agriculture, sme, microfinance, etc.)
	 * @returns {Promise<Object>} Filtered loan products
	 */
	async getLoanProductsByType(loanType) {
		try {
			const response = await api.get(`/loans/${loanType}/`);
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get single loan product
	 * @param {number} id - Product ID
	 * @returns {Promise<Object>} Product details
	 */
	async getLoanProduct(id) {
		try {
			const response = await api.get(`/loans/${id}/`);
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	}
};

export default productService;
