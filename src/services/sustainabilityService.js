import api from './api';

const API_BASE_URL = '/landing/sustainability-page/';

const sustainabilityService = {
	async getSustainabilityPage() {
		const response = await api.get(API_BASE_URL, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response.data;
	}
};

export default sustainabilityService;

