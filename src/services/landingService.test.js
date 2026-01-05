import { describe, it, expect, vi, beforeEach } from 'vitest';
import landingService from './landingService';
import api from './api';

// Mock api but keep handleApiError real
vi.mock('./api', async () => {
	const actual = await vi.importActual('./api');
	return {
		...actual,
		default: {
			get: vi.fn()
		}
	};
});

describe('landingService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getLandingPageFull', () => {
		it('fetches landing page full data successfully', async () => {
			const mockData = { pages: [], hero_sections: [], services: [] };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getLandingPageFull();

			expect(api.get).toHaveBeenCalledWith('/landing/landing-page-full/', { params: {} });
			expect(result.data).toEqual(mockData);
		});

		it('passes params to getLandingPageFull', async () => {
			const mockData = { pages: [] };
			api.get.mockResolvedValue({ data: mockData });

			await landingService.getLandingPageFull({ page: 1 });

			expect(api.get).toHaveBeenCalledWith('/landing/landing-page-full/', { params: { page: 1 } });
		});

		it('handles errors when fetching landing page full', async () => {
			const mockError = {
				response: {
					status: 500,
					data: {}
				}
			};
			api.get.mockRejectedValue(mockError);

			await expect(landingService.getLandingPageFull()).rejects.toEqual(mockError);
		});
	});

	describe('getPages', () => {
		it('fetches pages successfully', async () => {
			const mockData = { count: 2, results: [{ id: 1, slug: 'home' }] };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getPages();

			expect(api.get).toHaveBeenCalledWith('/landing/pages/');
			expect(result.data).toEqual(mockData);
		});

		it('handles errors when fetching pages', async () => {
			const mockError = {
				response: {
					status: 404,
					data: {}
				}
			};
			api.get.mockRejectedValue(mockError);

			await expect(landingService.getPages()).rejects.toEqual(mockError);
		});
	});

	describe('getPage', () => {
		it('fetches page by slug successfully', async () => {
			const mockData = { id: 1, slug: 'home', title: 'Home' };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getPage('home');

			expect(api.get).toHaveBeenCalledWith('/landing/pages/home/');
			expect(result.data).toEqual(mockData);
		});

		it('encodes slug in URL', async () => {
			const mockData = { id: 1 };
			api.get.mockResolvedValue({ data: mockData });

			await landingService.getPage('about-us');

			expect(api.get).toHaveBeenCalledWith('/landing/pages/about-us/');
		});

		it('handles special characters in slug', async () => {
			const mockData = { id: 1 };
			api.get.mockResolvedValue({ data: mockData });

			await landingService.getPage('page with spaces');

			expect(api.get).toHaveBeenCalledWith('/landing/pages/page%20with%20spaces/');
		});
	});

	describe('getHeroSections', () => {
		it('fetches hero sections successfully', async () => {
			const mockData = { count: 2, results: [{ id: 1, title: 'Hero 1' }] };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getHeroSections();

			expect(api.get).toHaveBeenCalledWith('/landing/hero-sections/', { params: {} });
			expect(result.data).toEqual(mockData);
		});

		it('passes params to getHeroSections', async () => {
			const mockData = { results: [] };
			api.get.mockResolvedValue({ data: mockData });

			await landingService.getHeroSections({ page_slug: 'home' });

			expect(api.get).toHaveBeenCalledWith('/landing/hero-sections/', { params: { page_slug: 'home' } });
		});
	});

	describe('getHeroSection', () => {
		it('fetches hero section by id successfully', async () => {
			const mockData = { id: 1, title: 'Hero 1' };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getHeroSection(1);

			expect(api.get).toHaveBeenCalledWith('/landing/hero-sections/1/');
			expect(result.data).toEqual(mockData);
		});
	});

	describe('getServices', () => {
		it('fetches services successfully', async () => {
			const mockData = { count: 3, results: [{ id: 1, name: 'Service 1' }] };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getServices();

			expect(api.get).toHaveBeenCalledWith('/landing/services/');
			expect(result.data).toEqual(mockData);
		});
	});

	describe('getService', () => {
		it('fetches service by id successfully', async () => {
			const mockData = { id: 1, name: 'Service 1' };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getService(1);

			expect(api.get).toHaveBeenCalledWith('/landing/services/1/');
			expect(result.data).toEqual(mockData);
		});
	});

	describe('getTestimonials', () => {
		it('fetches testimonials successfully', async () => {
			const mockData = { count: 5, results: [{ id: 1, name: 'John Doe' }] };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getTestimonials();

			expect(api.get).toHaveBeenCalledWith('/landing/testimonials/');
			expect(result.data).toEqual(mockData);
		});
	});

	describe('getTestimonial', () => {
		it('fetches testimonial by id successfully', async () => {
			const mockData = { id: 1, name: 'John Doe' };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getTestimonial(1);

			expect(api.get).toHaveBeenCalledWith('/landing/testimonials/1/');
			expect(result.data).toEqual(mockData);
		});
	});

	describe('getFaqs', () => {
		it('fetches FAQs successfully', async () => {
			const mockData = { count: 10, results: [{ id: 1, question: 'FAQ 1' }] };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getFaqs();

			expect(api.get).toHaveBeenCalledWith('/landing/faqs/');
			expect(result.data).toEqual(mockData);
		});
	});

	describe('getFaq', () => {
		it('fetches FAQ by id successfully', async () => {
			const mockData = { id: 1, question: 'FAQ 1' };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getFaq(1);

			expect(api.get).toHaveBeenCalledWith('/landing/faqs/1/');
			expect(result.data).toEqual(mockData);
		});
	});

	describe('getTeamMembers', () => {
		it('fetches team members successfully', async () => {
			const mockData = { count: 8, results: [{ id: 1, name: 'Member 1' }] };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getTeamMembers();

			expect(api.get).toHaveBeenCalledWith('/landing/team-members/');
			expect(result.data).toEqual(mockData);
		});
	});

	describe('getTeamMember', () => {
		it('fetches team member by id successfully', async () => {
			const mockData = { id: 1, name: 'Member 1' };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getTeamMember(1);

			expect(api.get).toHaveBeenCalledWith('/landing/team-members/1/');
			expect(result.data).toEqual(mockData);
		});
	});

	describe('getContentSections', () => {
		it('fetches content sections successfully', async () => {
			const mockData = { count: 5, results: [{ id: 1, title: 'Section 1' }] };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getContentSections();

			expect(api.get).toHaveBeenCalledWith('/landing/content-sections/');
			expect(result.data).toEqual(mockData);
		});
	});

	describe('getContentSection', () => {
		it('fetches content section by id successfully', async () => {
			const mockData = { id: 1, title: 'Section 1' };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getContentSection(1);

			expect(api.get).toHaveBeenCalledWith('/landing/content-sections/1/');
			expect(result.data).toEqual(mockData);
		});
	});

	describe('getBankStatistics', () => {
		it('fetches bank statistics successfully', async () => {
			const mockData = { count: 4, results: [{ id: 1, label: 'Customers' }] };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getBankStatistics();

			expect(api.get).toHaveBeenCalledWith('/landing/statistics/');
			expect(result.data).toEqual(mockData);
		});
	});

	describe('getBankStatistic', () => {
		it('fetches bank statistic by id successfully', async () => {
			const mockData = { id: 1, label: 'Customers' };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getBankStatistic(1);

			expect(api.get).toHaveBeenCalledWith('/landing/statistics/1/');
			expect(result.data).toEqual(mockData);
		});
	});

	describe('getFooter', () => {
		it('fetches footer data successfully', async () => {
			const mockData = { quick_links: [], social_links: [] };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getFooter();

			expect(api.get).toHaveBeenCalledWith('/landing/footer/full/');
			expect(result.data).toEqual(mockData);
		});
	});

	describe('getAboutPage', () => {
		it('fetches about page data successfully', async () => {
			const mockData = { id: 1, title: 'About Us' };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getAboutPage();

			expect(api.get).toHaveBeenCalledWith('/landing/about-page/');
			expect(result.data).toEqual(mockData);
		});
	});

	describe('getProductAreaManagementOfficers', () => {
		it('fetches product area management officers successfully', async () => {
			const mockData = { count: 6, results: [{ id: 1, name: 'Officer 1' }] };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getProductAreaManagementOfficers();

			expect(api.get).toHaveBeenCalledWith('/landing/product-area-management-officers/', { params: {} });
			expect(result.data).toEqual(mockData);
		});

		it('passes params to getProductAreaManagementOfficers', async () => {
			const mockData = { results: [] };
			api.get.mockResolvedValue({ data: mockData });

			await landingService.getProductAreaManagementOfficers({ department: 'loans' });

			expect(api.get).toHaveBeenCalledWith('/landing/product-area-management-officers/', { params: { department: 'loans' } });
		});
	});

	describe('getProductAreaManagementOfficer', () => {
		it('fetches product area management officer by id successfully', async () => {
			const mockData = { id: 1, name: 'Officer 1' };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getProductAreaManagementOfficer(1);

			expect(api.get).toHaveBeenCalledWith('/landing/product-area-management-officers/1/');
			expect(result.data).toEqual(mockData);
		});
	});

	describe('getOfficerOrgChart', () => {
		it('fetches officer org chart successfully', async () => {
			const mockData = { tree: { id: 1, name: 'President', children: [] } };
			api.get.mockResolvedValue({ data: mockData });

			const result = await landingService.getOfficerOrgChart();

			expect(api.get).toHaveBeenCalledWith('/landing/officers/org-chart/');
			expect(result.data).toEqual(mockData);
		});
	});
});

