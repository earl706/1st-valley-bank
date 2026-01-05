import { describe, it, expect, vi, beforeEach } from 'vitest';
import homepageService from './homepageService';
import api from './api';

// Mock api but keep handleApiError real
vi.mock('./api', async () => {
	const actual = await vi.importActual('./api');
	return {
		...actual,
		default: {
			post: vi.fn(),
			get: vi.fn(),
			put: vi.fn(),
			delete: vi.fn()
		}
	};
});

describe('homepageService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getHeroSlides', () => {
		it('fetches hero slides successfully', async () => {
			const mockData = {
				count: 2,
				results: [
					{ id: 1, title: 'Slide 1', image: '/slide1.jpg' },
					{ id: 2, title: 'Slide 2', image: '/slide2.jpg' }
				]
			};
			api.get.mockResolvedValue({ data: mockData });

			const result = await homepageService.getHeroSlides();

			expect(api.get).toHaveBeenCalledWith('/homepage/hero-slides/');
			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockData);
		});

		it('handles errors when fetching hero slides', async () => {
			const mockError = {
				response: {
					status: 500,
					data: {}
				}
			};
			api.get.mockRejectedValue(mockError);

			const result = await homepageService.getHeroSlides();

			expect(result.success).toBe(false);
			expect(result.error).toBe('Server Error');
		});
	});

	describe('getTestimonials', () => {
		it('fetches testimonials successfully', async () => {
			const mockData = {
				count: 1,
				results: [{ id: 1, name: 'John Doe', testimonial: 'Great service!' }]
			};
			api.get.mockResolvedValue({ data: mockData });

			const result = await homepageService.getTestimonials();

			expect(api.get).toHaveBeenCalledWith('/homepage/testimonials/');
			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockData);
		});

		it('handles errors when fetching testimonials', async () => {
			const mockError = {
				response: {
					status: 404,
					data: {}
				}
			};
			api.get.mockRejectedValue(mockError);

			const result = await homepageService.getTestimonials();

			expect(result.success).toBe(false);
			expect(result.error).toBe('Not Found');
		});
	});

	describe('getFAQs', () => {
		it('fetches FAQs successfully with default params', async () => {
			const mockData = {
				count: 1,
				results: [{ id: 1, question: 'What is this?', answer: 'An answer' }]
			};
			api.get.mockResolvedValue({ data: mockData });

			const result = await homepageService.getFAQs();

			expect(api.get).toHaveBeenCalledWith('/homepage/faqs/', {
				params: {}
			});
			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockData);
		});

		it('fetches FAQs with custom params', async () => {
			const mockData = {
				count: 1,
				results: [{ id: 1, question: 'Test?', answer: 'Answer' }]
			};
			api.get.mockResolvedValue({ data: mockData });

			const params = { page: 1, page_size: 10, category: 'general' };
			const result = await homepageService.getFAQs(params);

			expect(api.get).toHaveBeenCalledWith('/homepage/faqs/', { params });
			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockData);
		});

		it('handles errors when fetching FAQs', async () => {
			const mockError = {
				response: {
					status: 500,
					data: {}
				}
			};
			api.get.mockRejectedValue(mockError);

			const result = await homepageService.getFAQs();

			expect(result.success).toBe(false);
			expect(result.error).toBe('Server Error');
		});
	});

	describe('getStatistics', () => {
		it('fetches statistics successfully', async () => {
			const mockData = {
				branches: 50,
				atms: 100,
				customers: 100000
			};
			api.get.mockResolvedValue({ data: mockData });

			const result = await homepageService.getStatistics();

			expect(api.get).toHaveBeenCalledWith('/homepage/statistics/');
			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockData);
		});

		it('handles errors when fetching statistics', async () => {
			const mockError = {
				response: {
					status: 500,
					data: {}
				}
			};
			api.get.mockRejectedValue(mockError);

			const result = await homepageService.getStatistics();

			expect(result.success).toBe(false);
			expect(result.error).toBe('Server Error');
		});
	});

	describe('getAllContent', () => {
		it('fetches all content successfully', async () => {
			const mockHeroSlides = [{ id: 1 }];
			const mockTestimonials = [{ id: 1 }];
			const mockFAQs = [{ id: 1 }];
			const mockStatistics = { branches: 50 };

			api.get
				.mockResolvedValueOnce({ data: mockHeroSlides })
				.mockResolvedValueOnce({ data: mockTestimonials })
				.mockResolvedValueOnce({ data: mockFAQs })
				.mockResolvedValueOnce({ data: mockStatistics });

			const result = await homepageService.getAllContent();

			expect(result.success).toBe(true);
			expect(result.data).toEqual({
				heroSlides: mockHeroSlides,
				testimonials: mockTestimonials,
				faqs: mockFAQs,
				statistics: mockStatistics
			});
		});

		it('returns data structure even when some services fail', async () => {
			const mockError = {
				response: {
					status: 500,
					data: {}
				}
			};

			// Mock all calls to fail - individual services catch and return success: false
			api.get.mockRejectedValue(mockError);

			const result = await homepageService.getAllContent();

			// getAllContent returns success: true even if individual services fail
			// because Promise.all resolves with the returned objects (not errors)
			expect(result.success).toBe(true);
			expect(result.data).toBeDefined();
			expect(result.data.heroSlides).toEqual([]);
			expect(result.data.testimonials).toEqual([]);
		});
	});
});

