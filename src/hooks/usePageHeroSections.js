import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import landingService from '../services/landingService';

/**
 * Maps route paths to page slugs for hero section fetching
 */
const ROUTE_TO_SLUG_MAP = {
	'/': 'home',
	'/home': 'home',
	'/about-us': 'about-us',
	'/contact-us': 'contact-us',
	'/atm-locator': 'atm-locator',
	'/branches': 'branches',
	'/loans': 'loans',
	'/deposits': 'deposits',
	'/deposits/savings-account': 'deposits-savings-account',
	'/deposits/checking-account': 'deposits-checking-account',
	'/deposits/time-deposit': 'deposits-time-deposit',
	'/properties-for-sale': 'properties-for-sale',
	'/properties-for-sale/vehicles': 'properties-for-sale-vehicles',
	'/properties-for-sale/real-estate-and-other-properties-acquired-for-sale':
		'properties-for-sale-real-estate-and-other-properties-acquired-for-sale',
	'/newsletter': 'newsletter',
	'/1vb-advisory': 'one-vb-advisory',
	'/one-vb-advisory': 'one-vb-advisory',
	'/loans/agriculture': 'loans-agriculture',
	'/loans/sme': 'loans-sme',
	'/loans/small-and-medium-enterprises': 'loans-sme',
	'/loans/microfinance': 'loans-microfinance',
	'/loans/sucre': 'loans-sucre',
	'/loans/supervised-credit': 'loans-sucre',
	'/loans/small-business-loan': 'loans-sbl',
	'/loans/salary': 'loans-salary',
	'/loans/gold-gems': 'loans-gold-gems',
	'/loans/gold-and-gems': 'loans-gold-gems',
	'/consumer-protection': 'consumer-protection',
	'/loan-qualification': 'loan-qualification'
};

/**
 * Get page slug from current route
 * @param {string} pathname - Current pathname from useLocation
 * @returns {string|null} Page slug or null if not found
 */
export function getPageSlugFromRoute(pathname) {
	// Try exact match first
	if (ROUTE_TO_SLUG_MAP[pathname]) {
		return ROUTE_TO_SLUG_MAP[pathname];
	}

	// Try to find a matching route (for dynamic routes)
	for (const [route, slug] of Object.entries(ROUTE_TO_SLUG_MAP)) {
		if (pathname.startsWith(route)) {
			return slug;
		}
	}

	return null;
}

/**
 * Custom hook to fetch hero sections for the current page
 * @param {string|null} pageSlug - Optional page slug. If not provided, will be derived from route
 * @returns {Object} { heroSections, loading, error }
 */
export function usePageHeroSections(pageSlug = null) {
	const location = useLocation();
	const [heroSections, setHeroSections] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Determine page slug
		const slug = pageSlug || getPageSlugFromRoute(location.pathname);

		if (!slug) {
			setLoading(false);
			setHeroSections([]);
			return;
		}

		const fetchHeroSections = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await landingService.getLandingPageFull({ page: slug });
				const sections = response.data?.hero_sections || [];
				// Transform backend data to match CarouselSection format
				const transformedSections = sections.map((section) => ({
					title: section.title,
					subtitle: section.subtitle,
					description: section.description,
					image: section.image || '',
					imageAlt: section.image_alt || section.title,
					route: section.button_route || null,
					button_route: section.button_route || null,
					button_text: section.button_text || null,
					buttonText: section.button_text || null,
					features: section.features || []
				}));
				setHeroSections(transformedSections);
			} catch (err) {
				console.error('Error fetching hero sections:', err);
				setError(err.message || 'Failed to load hero sections');
				setHeroSections([]);
			} finally {
				setLoading(false);
			}
		};

		fetchHeroSections();
	}, [location.pathname, pageSlug]);

	return { heroSections, loading, error };
}
