import api from './api';

const API_BASE_URL = '/landing/consumer-protection-privacy-policy-page/';

const consumerProtectionPrivacyPolicyPageService = {
	async getPrivacyPolicyPage() {
		const response = await api.get(API_BASE_URL, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response.data;
	}
};

export default consumerProtectionPrivacyPolicyPageService;
