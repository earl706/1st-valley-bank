import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { usePageHeroSections, getPageSlugFromRoute } from './usePageHeroSections';
import landingService from '../services/landingService';

// Mock landingService
vi.mock('../services/landingService');

// Mock useLocation
const mockUseLocation = vi.hoisted(() => vi.fn());
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return {
		...actual,
		useLocation: mockUseLocation
	};
});

describe('usePageHeroSections', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockUseLocation.mockReturnValue({ pathname: '/' });
	});

	describe('getPageSlugFromRoute', () => {
		it('returns correct slug for exact route match', () => {
			expect(getPageSlugFromRoute('/')).toBe('home');
			expect(getPageSlugFromRoute('/about-us')).toBe('about-us');
			expect(getPageSlugFromRoute('/contact-us')).toBe('contact-us');
			expect(getPageSlugFromRoute('/loans')).toBe('loans');
			expect(getPageSlugFromRoute('/deposits')).toBe('deposits');
		});

		it('returns correct slug for nested routes', () => {
			expect(getPageSlugFromRoute('/deposits/savings-account')).toBe('deposits-savings-account');
			expect(getPageSlugFromRoute('/deposits/checking-account')).toBe('deposits-checking-account');
			expect(getPageSlugFromRoute('/deposits/time-deposit')).toBe('deposits-time-deposit');
		});

		it('returns correct slug for loan routes', () => {
			expect(getPageSlugFromRoute('/loans/agriculture')).toBe('loans-agriculture');
			expect(getPageSlugFromRoute('/loans/sme')).toBe('loans-sme');
			expect(getPageSlugFromRoute('/loans/microfinance')).toBe('loans-microfinance');
			expect(getPageSlugFromRoute('/loans/salary')).toBe('loans-salary');
		});

		it('returns correct slug for property routes', () => {
			expect(getPageSlugFromRoute('/properties-for-sale')).toBe('properties-for-sale');
			expect(getPageSlugFromRoute('/properties-for-sale/vehicles')).toBe(
				'properties-for-sale-vehicles'
			);
		});

		it('returns null for unknown routes', () => {
			// Unknown routes will try startsWith match on all known routes
			// and return null if no match found
			expect(getPageSlugFromRoute('/unknown-route')).toBeNull();
			expect(getPageSlugFromRoute('/invalid')).toBeNull();
		});

		it('handles routes with trailing slashes', () => {
			// With trailing slash, will match '/loans' via startsWith
			const result = getPageSlugFromRoute('/loans/');
			// Since '/loans/' starts with '/loans', it will match and return 'loans'
			expect(result).toBe('loans');
		});

		it('handles dynamic route segments', () => {
			// Routes that start with a known path should match the longest matching route
			// '/loans/agriculture/details' starts with '/loans/agriculture' which exists in map
			const result = getPageSlugFromRoute('/loans/agriculture/details');
			expect(result).toBe('loans-agriculture');
		});
	});

	describe('usePageHeroSections hook', () => {
		it('initializes with loading state', () => {
			mockUseLocation.mockReturnValue({ pathname: '/home' });
			landingService.getLandingPageFull.mockResolvedValue({
				data: { hero_sections: [{ title: 'Home', subtitle: 'Welcome' }] }
			});

			const { result } = renderHook(() => usePageHeroSections());

			expect(result.current.loading).toBe(true);
			expect(result.current.heroSections).toEqual([]);
			expect(result.current.error).toBeNull();
		});

		it('fetches hero section data successfully', async () => {
			mockUseLocation.mockReturnValue({ pathname: '/home' });

			const mockHeroData = {
				title: 'Welcome to First Valley Bank',
				subtitle: 'Your trusted financial partner',
				image: '/images/hero.jpg',
				description: 'Banking made easy'
			};

			landingService.getLandingPageFull.mockResolvedValue({
				data: { hero_sections: [mockHeroData] }
			});

			const { result } = renderHook(() => usePageHeroSections());

			await waitFor(() => {
				expect(result.current.loading).toBe(false);
			});

			expect(result.current.heroSections).toHaveLength(1);
			expect(result.current.heroSections[0].title).toBe(mockHeroData.title);
			expect(result.current.error).toBeNull();
			expect(landingService.getLandingPageFull).toHaveBeenCalledWith({ page: 'home' });
		});

		it('handles API errors gracefully', async () => {
			mockUseLocation.mockReturnValue({ pathname: '/about-us' });

			const mockError = new Error('Failed to fetch hero section');
			landingService.getLandingPageFull.mockRejectedValue(mockError);

			const { result } = renderHook(() => usePageHeroSections());

			await waitFor(() => {
				expect(result.current.loading).toBe(false);
			});

			expect(result.current.heroSections).toEqual([]);
			expect(result.current.error).toBe('Failed to fetch hero section');
		});

		it('does not fetch when route has no slug mapping', async () => {
			mockUseLocation.mockReturnValue({ pathname: '/unknown-route' });

			const { result } = renderHook(() => usePageHeroSections());

			await waitFor(() => {
				expect(result.current.loading).toBe(false);
			});

			expect(landingService.getLandingPageFull).not.toHaveBeenCalled();
			expect(result.current.heroSections).toEqual([]);
		});

		it('refetches when route changes', async () => {
			// Start with home route
			mockUseLocation.mockReturnValue({ pathname: '/home' });

			landingService.getLandingPageFull.mockResolvedValue({
				data: { hero_sections: [{ title: 'Home' }] }
			});

			const { result, rerender } = renderHook(() => usePageHeroSections());

			await waitFor(() => {
				expect(result.current.loading).toBe(false);
			});

			expect(landingService.getLandingPageFull).toHaveBeenCalledWith({ page: 'home' });

			// Change to about-us route
			mockUseLocation.mockReturnValue({ pathname: '/about-us' });
			landingService.getLandingPageFull.mockResolvedValue({
				data: { hero_sections: [{ title: 'About Us' }] }
			});

			rerender();

			await waitFor(() => {
				expect(landingService.getLandingPageFull).toHaveBeenCalledWith({ page: 'about-us' });
			});
		});

		it('handles empty response data', async () => {
			mockUseLocation.mockReturnValue({ pathname: '/home' });

			landingService.getLandingPageFull.mockResolvedValue({
				data: null
			});

			const { result } = renderHook(() => usePageHeroSections());

			await waitFor(() => {
				expect(result.current.loading).toBe(false);
			});

			expect(result.current.heroSections).toEqual([]);
		});

		it('handles network timeout errors', async () => {
			mockUseLocation.mockReturnValue({ pathname: '/loans' });

			const timeoutError = new Error('Timeout');
			timeoutError.code = 'ECONNABORTED';
			landingService.getLandingPageFull.mockRejectedValue(timeoutError);

			const { result } = renderHook(() => usePageHeroSections());

			await waitFor(() => {
				expect(result.current.loading).toBe(false);
			});

			expect(result.current.error).toBe('Timeout');
		});

		it('handles 404 not found errors', async () => {
			mockUseLocation.mockReturnValue({ pathname: '/deposits' });

			const notFoundError = new Error('Not found');
			notFoundError.response = { status: 404 };
			landingService.getLandingPageFull.mockRejectedValue(notFoundError);

			const { result } = renderHook(() => usePageHeroSections());

			await waitFor(() => {
				expect(result.current.loading).toBe(false);
			});

			expect(result.current.error).toBe('Not found');
			expect(result.current.heroSections).toEqual([]);
		});

		it('fetches data for different page types', async () => {
			const pages = [
				{ pathname: '/home', slug: 'home' },
				{ pathname: '/about-us', slug: 'about-us' },
				{ pathname: '/loans', slug: 'loans' },
				{ pathname: '/deposits', slug: 'deposits' },
				{ pathname: '/branches', slug: 'branches' }
			];

			for (const page of pages) {
				vi.clearAllMocks();
				mockUseLocation.mockReturnValue({ pathname: page.pathname });

				landingService.getLandingPageFull.mockResolvedValue({
					data: { hero_sections: [{ title: page.slug }] }
				});

				const { result } = renderHook(() => usePageHeroSections());

				await waitFor(() => {
					expect(result.current.loading).toBe(false);
				});

				expect(landingService.getLandingPageFull).toHaveBeenCalledWith({ page: page.slug });
			}
		});

		it('returns correct data structure', async () => {
			mockUseLocation.mockReturnValue({ pathname: '/home' });

			const mockData = {
				title: 'Test Title',
				subtitle: 'Test Subtitle',
				image: '/test.jpg',
				button_text: 'Learn More',
				button_route: '/about',
				features: ['Feature 1', 'Feature 2']
			};

			landingService.getLandingPageFull.mockResolvedValue({
				data: { hero_sections: [mockData] }
			});

			const { result } = renderHook(() => usePageHeroSections());

			await waitFor(() => {
				expect(result.current.loading).toBe(false);
			});

			expect(result.current).toMatchObject({
				heroSections: expect.arrayContaining([
					expect.objectContaining({
						title: 'Test Title',
						subtitle: 'Test Subtitle'
					})
				]),
				loading: false,
				error: null
			});
		});
	});
});

