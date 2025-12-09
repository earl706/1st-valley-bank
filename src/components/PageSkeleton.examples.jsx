/**
 * PageSkeleton Component Usage Examples
 *
 * This file demonstrates how to use the PageSkeleton components
 * across different page types in the frontend-main application.
 */

import React, { useState } from 'react';
import {
	HeroSectionSkeleton,
	CardSkeleton,
	CardGridSkeleton,
	CarouselSkeleton,
	TableSkeleton,
	FormSkeleton,
	FormFieldSkeleton,
	MapSkeleton,
	SectionHeaderSkeleton,
	ContentSectionSkeleton,
	ProductListingPageSkeleton,
	DetailPageSkeleton,
	FormPageSkeleton,
	NewsletterPageSkeleton,
	GenericPageSkeleton
} from './PageSkeleton';

// ============================================================================
// PRODUCT LISTING PAGE EXAMPLES
// ============================================================================

/**
 * Example 1: Deposits Page
 */
export function DepositsPageExample() {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);

	if (loading && products.length === 0) {
		return (
			<ProductListingPageSkeleton
				showHero={true}
				showCarousel={true}
				showProductGrid={true}
				productColumns={3}
				productRows={3}
				variant="dark"
			/>
		);
	}

	return <div>{/* Your deposits page content */}</div>;
}

/**
 * Example 2: Loans Page
 */
export function LoansPageExample() {
	const [loading, setLoading] = useState(true);
	const [loans, setLoans] = useState([]);

	if (loading && loans.length === 0) {
		return (
			<ProductListingPageSkeleton
				showHero={true}
				showCarousel={true}
				showProductGrid={true}
				productColumns={3}
				productRows={3}
				variant="dark"
			/>
		);
	}

	return <div>{/* Your loans page content */}</div>;
}

/**
 * Example 3: Properties Page
 */
export function PropertiesPageExample() {
	const [loading, setLoading] = useState(true);
	const [properties, setProperties] = useState([]);

	if (loading && properties.length === 0) {
		return (
			<ProductListingPageSkeleton
				showHero={true}
				showCarousel={false}
				showProductGrid={true}
				productColumns={3}
				productRows={6}
				variant="light"
			/>
		);
	}

	return <div>{/* Your properties page content */}</div>;
}

// ============================================================================
// DETAIL PAGE EXAMPLES
// ============================================================================

/**
 * Example 4: Savings Account Detail Page
 */
export function SavingsAccountPageExample() {
	const [loading, setLoading] = useState(true);
	const [account, setAccount] = useState(null);

	if (loading && !account) {
		return <DetailPageSkeleton showHero={true} showContent={true} contentSections={3} />;
	}

	return <div>{/* Your detail page content */}</div>;
}

// ============================================================================
// FORM PAGE EXAMPLES
// ============================================================================

/**
 * Example 5: Contact Us Page
 */
export function ContactUsPageExample() {
	const [loading, setLoading] = useState(true);
	const [formReady, setFormReady] = useState(false);

	if (loading && !formReady) {
		return <FormPageSkeleton showHero={true} showForm={true} formFields={10} showMap={true} />;
	}

	return <div>{/* Your contact form page content */}</div>;
}

// ============================================================================
// NEWSLETTER PAGE EXAMPLES
// ============================================================================

/**
 * Example 6: Newsletter Listing Page
 */
export function NewsletterPageExample() {
	const [loading, setLoading] = useState(true);
	const [articles, setArticles] = useState([]);

	if (loading && articles.length === 0) {
		return <NewsletterPageSkeleton showHero={true} showGrid={true} gridColumns={3} gridRows={6} />;
	}

	return <div>{/* Your newsletter page content */}</div>;
}

// ============================================================================
// LOCATION PAGE EXAMPLES
// ============================================================================

/**
 * Example 7: Branches Page
 */
export function BranchesPageExample() {
	const [loading, setLoading] = useState(true);
	const [branches, setBranches] = useState([]);

	if (loading && branches.length === 0) {
		return (
			<main className="flex flex-col">
				<HeroSectionSkeleton />
				<section className="py-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid gap-8 lg:grid-cols-2">
							<div>
								<SectionHeaderSkeleton className="mb-6" />
								<CardGridSkeleton columns={1} rows={5} variant="dark" />
							</div>
							<div>
								<MapSkeleton height="h-full min-h-[600px]" />
							</div>
						</div>
					</div>
				</section>
			</main>
		);
	}

	return <div>{/* Your branches page content */}</div>;
}

// ============================================================================
// CUSTOM PAGE EXAMPLES
// ============================================================================

/**
 * Example 8: Home Page with Multiple Sections
 */
export function HomePageExample() {
	const [loading, setLoading] = useState(true);

	if (loading) {
		return (
			<main className="flex flex-col">
				<HeroSectionSkeleton showButton={true} />
				<section className="py-12">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<CarouselSkeleton slides={3} />
					</div>
				</section>
				<ContentSectionSkeleton
					showHeader={true}
					showCards={true}
					cardColumns={3}
					cardRows={3}
					variant="light"
				/>
				<ContentSectionSkeleton
					showHeader={true}
					showCards={true}
					cardColumns={4}
					cardRows={2}
					variant="dark"
				/>
			</main>
		);
	}

	return <div>{/* Your home page content */}</div>;
}

/**
 * Example 9: About Us Page
 */
export function AboutUsPageExample() {
	const [loading, setLoading] = useState(true);
	const [content, setContent] = useState(null);

	if (loading && !content) {
		return (
			<main className="flex flex-col">
				<HeroSectionSkeleton showButton={false} />
				<section className="py-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<SectionHeaderSkeleton className="mb-12" />
						<div className="grid gap-8 md:grid-cols-2">
							<div className="space-y-4">
								<SkeletonText lines={5} />
							</div>
							<div className="space-y-4">
								<SkeletonText lines={5} />
							</div>
						</div>
						<div className="mt-12">
							<CarouselSkeleton slides={3} />
						</div>
					</div>
				</section>
			</main>
		);
	}

	return <div>{/* Your about page content */}</div>;
}

// ============================================================================
// INDIVIDUAL COMPONENT EXAMPLES
// ============================================================================

/**
 * Example 10: Using Individual Components
 */
export function CustomLayoutExample() {
	const [loading, setLoading] = useState(true);

	if (loading) {
		return (
			<main className="flex flex-col">
				{/* Hero */}
				<HeroSectionSkeleton />

				{/* Section 1: Products Grid */}
				<section className="bg-gray-50 py-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<SectionHeaderSkeleton alignment="center" className="mb-12" />
						<CardGridSkeleton columns={3} rows={3} variant="light" />
					</div>
				</section>

				{/* Section 2: Dark Products Grid */}
				<section className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<SectionHeaderSkeleton alignment="center" className="mb-12" />
						<CardGridSkeleton columns={3} rows={3} variant="dark" />
					</div>
				</section>

				{/* Section 3: Table */}
				<section className="py-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<SectionHeaderSkeleton className="mb-8" />
						<TableSkeleton columns={7} rows={10} />
					</div>
				</section>
			</main>
		);
	}

	return <div>{/* Your custom page content */}</div>;
}

// Helper component for examples
const SkeletonText = ({ lines = 3, className = '' }) => {
	const SkeletonBox = ({
		width = 'w-full',
		height = 'h-4',
		rounded = 'rounded',
		className = ''
	}) => <div className={`animate-pulse bg-gray-200 ${width} ${height} ${rounded} ${className}`} />;

	return (
		<div className={`space-y-2 ${className}`}>
			{Array.from({ length: lines }).map((_, idx) => (
				<SkeletonBox
					key={idx}
					width={idx === lines - 1 ? 'w-3/4' : 'w-full'}
					height="h-4"
					className="mb-1"
				/>
			))}
		</div>
	);
};
