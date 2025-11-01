import api, { handleApiError } from './api';

// Loan Service - Only GET request with parameter for each loan type
const loanService = {
	// Get loans filtered by loan type
	async getByType(loanType, params = {}) {
		try {
			const query = { ...params, loan_type: loanType };
			const res = await api.get('/loans/', { params: query });
			return res.data;
		} catch (error) {
			throw handleApiError(error);
		}
	}
};

export default loanService;
