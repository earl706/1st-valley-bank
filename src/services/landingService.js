// Landing Page API service for landing endpoints

import api from './api'; // Assume api.js exports API helpers like api.get(), api.post(), etc.

const BASE_URL = '/landing'; // Adjust if base path differs in your project setup.

const landingService = {
	// Full landing page - all data in one payload
	async getLandingPageFull(params = {}) {
		return await api.get(`${BASE_URL}/landing-page-full/`, { params });
	},

	// Pages
	async getPages() {
		return await api.get(`${BASE_URL}/pages/`);
	},
	async getPage(slugOrId) {
		return await api.get(`${BASE_URL}/pages/${encodeURIComponent(slugOrId)}/`);
	},

	// Hero Sections
	async getHeroSections(params = {}) {
		return await api.get(`${BASE_URL}/hero-sections/`, { params });
	},
	async getHeroSection(id) {
		return await api.get(`${BASE_URL}/hero-sections/${id}/`);
	},

	// Services
	async getServices() {
		return await api.get(`${BASE_URL}/services/`);
	},
	async getService(id) {
		return await api.get(`${BASE_URL}/services/${id}/`);
	},

	// Testimonials
	async getTestimonials() {
		return await api.get(`${BASE_URL}/testimonials/`);
	},
	async getTestimonial(id) {
		return await api.get(`${BASE_URL}/testimonials/${id}/`);
	},

	// FAQs
	async getFaqs() {
		return await api.get(`${BASE_URL}/faqs/`);
	},
	async getFaq(id) {
		return await api.get(`${BASE_URL}/faqs/${id}/`);
	},

	// Team Members
	async getTeamMembers() {
		return await api.get(`${BASE_URL}/team-members/`);
	},
	async getTeamMember(id) {
		return await api.get(`${BASE_URL}/team-members/${id}/`);
	},

	// Content Sections
	async getContentSections() {
		return await api.get(`${BASE_URL}/content-sections/`);
	},
	async getContentSection(id) {
		return await api.get(`${BASE_URL}/content-sections/${id}/`);
	},

	// Bank Statistics
	async getBankStatistics() {
		return await api.get(`${BASE_URL}/statistics/`);
	},
	async getBankStatistic(id) {
		return await api.get(`${BASE_URL}/statistics/${id}/`);
	},

	// Footer
	async getFooter() {
		return await api.get(`${BASE_URL}/footer/full/`);
	},

	// About Page
	async getAboutPage() {
		return await api.get(`${BASE_URL}/about-page/`);
	},

	// Product Area Management Officers
	async getProductAreaManagementOfficers(params = {}) {
		return await api.get(`${BASE_URL}/product-area-management-officers/`, { params });
	},
	async getProductAreaManagementOfficer(id) {
		return await api.get(`${BASE_URL}/product-area-management-officers/${id}/`);
	},

	// Org Chart - Pre-built tree structure for senior management
	async getOfficerOrgChart() {
		return await api.get(`${BASE_URL}/officers/org-chart/`);
	}
};

export default landingService;
