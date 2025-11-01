import api from './api';

const API_BASE_URL = '/annual-reports/annual-reports/';

const annualReportService = {
	async getAnnualReports(params = {}) {
		const query = new URLSearchParams(params).toString();
		const url = query ? `${API_BASE_URL}?${query}` : `${API_BASE_URL}`;
		const response = await api.get(url, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response.data;
	},
	async getAnnualReport(id) {
		const url = `${API_BASE_URL}/${id}/`;
		const response = await api.get(url, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response.data;
	}
};

export default annualReportService;
