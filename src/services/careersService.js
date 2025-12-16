import api from './api';

const API_BASE_URL = '/landing/careers-page/';

const careersService = {
	async getCareersPage() {
		const response = await api.get(API_BASE_URL, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response.data;
	}
};

export default careersService;

