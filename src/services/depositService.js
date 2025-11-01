import api from './api'; // Make sure api.js exports a base axios/fetch instance

const BASE_URL = '/deposits/'; // Hardcoded relative API path

const getDepositProducts = async ({
	productType = 'savings',
	page = 1,
	pageSize = 20,
	search = '',
	ordering = 'display_order',
	isActive = true
} = {}) => {
	const params = {};
	if (productType) params.product_type = productType;
	if (page) params.page = page;
	if (pageSize) params.page_size = pageSize;
	if (search) params.search = search;
	if (ordering) params.ordering = ordering;
	if (typeof isActive === 'boolean') params.is_active = isActive;

	try {
		const response = await api.get(BASE_URL, { params });
		return response.data;
	} catch (error) {
		console.error('Error fetching deposit products:', error);
		throw error;
	}
};

// Convenience helpers
export const getSavingsAccounts = (options = {}) =>
	getDepositProducts({ ...options, productType: 'savings' });

export const getCheckingAccounts = (options = {}) =>
	getDepositProducts({ ...options, productType: 'checking' });

export const getTimeDeposits = (options = {}) =>
	getDepositProducts({ ...options, productType: 'time_deposit' });

export default {
	getSavingsAccounts,
	getCheckingAccounts,
	getTimeDeposits,
	getDepositProducts
};
