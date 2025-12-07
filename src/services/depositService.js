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

export const getAllDepositProducts = async (options = {}) => {
	// Fetches all deposit products (without productType filter)
	// If fetchAll is true, will fetch all pages to get complete results
	const params = {};

	// Convert boolean is_active to string if needed
	if (options.is_active !== undefined) {
		params.is_active =
			typeof options.is_active === 'boolean'
				? String(options.is_active).toLowerCase()
				: options.is_active;
	}

	// Copy other params
	if (options.ordering) params.ordering = options.ordering;
	if (options.search) params.search = options.search;

	// Handle pagination
	const fetchAll = options.fetchAll !== false; // Default to true
	const pageSize = options.page_size || (fetchAll ? 1000 : 10); // Large page size if fetching all
	const page = options.page || 1;

	if (fetchAll) {
		// Fetch all products by using a large page size
		params.page = 1;
		params.page_size = pageSize;

		try {
			const response = await api.get(BASE_URL, { params });
			const { count, results } = response.data;

			// If we got all results in one page, return them
			if (results.length >= count) {
				return response.data;
			}

			// Otherwise, fetch remaining pages
			const allResults = [...results];
			const totalPages = Math.ceil(count / pageSize);

			for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
				const pageParams = { ...params, page: currentPage };
				const pageResponse = await api.get(BASE_URL, { params: pageParams });
				allResults.push(...pageResponse.data.results);
			}

			return {
				count: allResults.length,
				results: allResults
			};
		} catch (error) {
			console.error('Error fetching all deposit products:', error);
			throw error;
		}
	} else {
		// Normal pagination
		params.page = page;
		params.page_size = pageSize;

		try {
			const response = await api.get(BASE_URL, { params });
			return response.data;
		} catch (error) {
			console.error('Error fetching deposit products:', error);
			throw error;
		}
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
