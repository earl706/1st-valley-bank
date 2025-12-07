import React from 'react';
import { usePageHeroSections } from '../hooks/usePageHeroSections';
import CarouselSection from './CarouselSection';
import HeroSection from './HeroSection';

/**
 * Component that automatically fetches and renders hero sections for a page
 * Supports both carousel (multiple slides) and single hero section
 *
 * @param {string} pageSlug - Optional page slug. If not provided, will be derived from route
 * @param {Object} props - Additional props to pass to CarouselSection or HeroSection
 */
export default function PageHeroSection({ pageSlug = null, ...props }) {
	const { heroSections, loading, error } = usePageHeroSections(pageSlug);

	if (loading) {
		return (
			<div className="flex min-h-[560px] items-center justify-center">
				<div className="text-center">
					<div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#396131] border-t-transparent"></div>
					<p className="mt-4 text-sm text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	if (error) {
		console.warn('Hero sections error:', error);
		// Don't render anything on error, let pages use their fallback
		return null;
	}

	if (!heroSections || heroSections.length === 0) {
		// No hero sections found, return null to allow pages to use their own
		return null;
	}

	// If multiple hero sections, use CarouselSection
	if (heroSections.length > 1) {
		return (
			<CarouselSection
				id={`page-hero-carousel-${pageSlug || 'default'}`}
				slides={heroSections}
				autoPlay={props.autoPlay !== false}
				autoPlayInterval={props.autoPlayInterval || 5000}
				brandColor={props.brandColor || '#396131'}
				brandGradient={props.brandGradient || 'from-[#396131] via-[#4a7c3a] to-[#5a8c4a]'}
				minHeight={props.minHeight || 'min-h-[560px] lg:min-h-[640px]'}
				showLearnMoreButton={props.showLearnMoreButton !== false}
				learnMoreText={props.learnMoreText || 'Learn More'}
				{...props}
			/>
		);
	}

	// Single hero section, use HeroSection component
	const section = heroSections[0];

	// Handle bgColor/textColor props (convert to backgroundColor/titleColor)
	let backgroundColor = props.backgroundColor || 'from-slate-50 via-white to-green-50';
	let titleColor = props.titleColor || 'from-[#396131] via-[#4a7c3a] to-[#5a8c4a]';

	// If bgColor is provided (solid color), convert to gradient
	if (props.bgColor) {
		// Remove # if present and format for Tailwind
		const color = props.bgColor.replace('#', '');
		backgroundColor = `from-[#${color}] to-[#${color}]`;
	}
	// If textColor is provided, adjust titleColor
	if (props.textColor) {
		// Remove # if present and format for Tailwind
		const color = props.textColor.replace('#', '');
		titleColor = `from-[#${color}] to-[#${color}]`;
	}

	return (
		<HeroSection
			title={section.title}
			subtitle={section.subtitle}
			description={section.description}
			features={section.features || []}
			image={section.image}
			imageAlt={section.imageAlt || section.title}
			ctaText={section.button_text || section.buttonText || 'Learn More'}
			ctaLink={section.route || section.button_route}
			showCta={!!(section.route || section.button_route)}
			backgroundColor={backgroundColor}
			titleColor={titleColor}
			className={props.className || ''}
		/>
	);
}
