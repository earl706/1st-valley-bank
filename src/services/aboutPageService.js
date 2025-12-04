import api from './api';

const API_BASE_URL = '/landing/about-page/';

const aboutPageService = {
	async getAboutPage() {
		const response = await api.get(API_BASE_URL, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response.data;
	}
};

export default aboutPageService;
