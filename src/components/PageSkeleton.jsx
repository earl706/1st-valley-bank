/**
 * PageSkeleton Component System
 *
 * A comprehensive, modern, responsive loading skeleton system for frontend-main pages.
 * Provides various skeleton components for different page layouts and content types.
 */

import React from 'react';

// ============================================================================
// BASE COMPONENTS
// ============================================================================

/**
 * Base Skeleton Box
 */
const SkeletonBox = ({ width = 'w-full', height = 'h-4', rounded = 'rounded', className = '' }) => (
	<div className={`animate-pulse bg-gray-200 ${width} ${height} ${rounded} ${className}`} />
);

/**
 * Base Skeleton Text
 */
const SkeletonText = ({ lines = 3, className = '' }) => (
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

// ============================================================================
// HERO SECTION SKELETONS
// ============================================================================

/**
 * Hero Section Skeleton
 */
export const HeroSectionSkeleton = ({ showButton = true, minHeight = 'min-h-[560px]' }) => (
	<div
		className={`relative flex items-center justify-center ${minHeight} bg-gradient-to-br from-gray-100 to-gray-200`}
	>
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="flex flex-col items-center gap-6 text-center">
				{/* Badge */}
				<SkeletonBox width="w-32" height="h-6" rounded="rounded-full" className="mb-2" />
				{/* Title */}
				<SkeletonBox width="w-96" height="h-12" className="mx-auto mb-4" />
				{/* Subtitle */}
				<SkeletonBox width="w-80" height="h-6" className="mx-auto mb-6" />
				{/* Description */}
				<div className="mb-6 space-y-2">
					<SkeletonBox width="w-full" height="h-4" className="mx-auto max-w-2xl" />
					<SkeletonBox width="w-3/4" height="h-4" className="mx-auto max-w-2xl" />
				</div>
				{/* Button */}
				{showButton && (
					<div className="flex gap-4">
						<SkeletonBox width="w-32" height="h-12" rounded="rounded-lg" />
						<SkeletonBox width="w-32" height="h-12" rounded="rounded-lg" />
					</div>
				)}
			</div>
		</div>
	</div>
);

// ============================================================================
// CARD SKELETONS
// ============================================================================

/**
 * Card Skeleton (Dark/Light variant)
 */
export const CardSkeleton = ({ variant = 'dark', showImage = true, showButton = true }) => {
	const bgColor = variant === 'dark' ? 'bg-gray-700' : 'bg-white';
	const textColor = variant === 'dark' ? 'bg-gray-600' : 'bg-gray-200';

	return (
		<div className={`flex h-full flex-col overflow-hidden rounded-lg shadow-lg ${bgColor}`}>
			{showImage && <div className="h-48 w-full animate-pulse bg-gray-300" />}
			<div
				className={`flex flex-1 flex-col p-6 ${variant === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
			>
				{/* Title */}
				<SkeletonBox width="w-3/4" height="h-6" className={`mb-3 ${textColor}`} />
				{/* Subtitle */}
				<SkeletonBox width="w-1/2" height="h-4" className={`mb-4 ${textColor}`} />
				{/* Description */}
				<div className="mb-4 space-y-2">
					<SkeletonBox width="w-full" height="h-3" className={textColor} />
					<SkeletonBox width="w-5/6" height="h-3" className={textColor} />
					<SkeletonBox width="w-4/6" height="h-3" className={textColor} />
				</div>
				{/* Features/Info */}
				<div className="mb-4 space-y-2">
					<SkeletonBox width="w-2/3" height="h-4" className={textColor} />
					<SkeletonBox width="w-1/2" height="h-4" className={textColor} />
				</div>
				{/* Button */}
				{showButton && (
					<SkeletonBox
						width="w-full"
						height="h-10"
						rounded="rounded-lg"
						className={`mt-auto ${textColor}`}
					/>
				)}
			</div>
		</div>
	);
};

/**
 * Card Grid Skeleton
 */
export const CardGridSkeleton = ({
	columns = 3,
	rows = 3,
	variant = 'dark',
	showImage = true,
	showButton = true
}) => {
	const gridCols = {
		1: 'grid-cols-1',
		2: 'grid-cols-1 md:grid-cols-2',
		3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
		4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
	};

	return (
		<div className={`grid ${gridCols[columns] || gridCols[3]} gap-6`}>
			{Array.from({ length: rows }).map((_, idx) => (
				<CardSkeleton key={idx} variant={variant} showImage={showImage} showButton={showButton} />
			))}
		</div>
	);
};

// ============================================================================
// CAROUSEL SKELETONS
// ============================================================================

/**
 * Carousel Skeleton
 */
export const CarouselSkeleton = ({ slides = 3, showDots = true, showArrows = true }) => (
	<div className="relative w-full">
		<div className="overflow-hidden rounded-lg">
			<div className="flex transition-transform duration-500">
				{Array.from({ length: slides }).map((_, idx) => (
					<div key={idx} className="min-w-full">
						<div className="relative h-96 w-full animate-pulse bg-gradient-to-br from-gray-200 to-gray-300">
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="text-center">
									<SkeletonBox width="w-64" height="h-8" className="mx-auto mb-4" />
									<SkeletonBox width="w-48" height="h-6" className="mx-auto mb-2" />
									<SkeletonBox width="w-96" height="h-4" className="mx-auto" />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
		{showArrows && (
			<>
				<SkeletonBox
					width="w-10"
					height="h-10"
					rounded="rounded-full"
					className="absolute top-1/2 left-4 -translate-y-1/2"
				/>
				<SkeletonBox
					width="w-10"
					height="h-10"
					rounded="rounded-full"
					className="absolute top-1/2 right-4 -translate-y-1/2"
				/>
			</>
		)}
		{showDots && (
			<div className="mt-4 flex justify-center gap-2">
				{Array.from({ length: slides }).map((_, idx) => (
					<SkeletonBox key={idx} width="w-2" height="h-2" rounded="rounded-full" />
				))}
			</div>
		)}
	</div>
);

// ============================================================================
// TABLE SKELETONS
// ============================================================================

/**
 * Table Skeleton
 */
export const TableSkeleton = ({ columns = 5, rows = 5, showHeader = true }) => (
	<div className="w-full overflow-x-auto rounded-lg bg-white shadow">
		<table className="w-full min-w-full divide-y divide-gray-200">
			{showHeader && (
				<thead className="bg-gray-50">
					<tr>
						{Array.from({ length: columns }).map((_, idx) => (
							<th key={idx} className="px-6 py-3 text-left">
								<SkeletonBox width="w-24" height="h-4" />
							</th>
						))}
					</tr>
				</thead>
			)}
			<tbody className="divide-y divide-gray-200 bg-white">
				{Array.from({ length: rows }).map((_, rowIdx) => (
					<tr key={rowIdx} className="animate-pulse">
						{Array.from({ length: columns }).map((_, colIdx) => (
							<td key={colIdx} className="px-6 py-4">
								<SkeletonBox width="w-24" height="h-4" />
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

// ============================================================================
// FORM SKELETONS
// ============================================================================

/**
 * Form Field Skeleton
 */
export const FormFieldSkeleton = ({ showLabel = true, showInput = true, showHelper = false }) => (
	<div className="space-y-2">
		{showLabel && <SkeletonBox width="w-24" height="h-4" />}
		{showInput && <SkeletonBox width="w-full" height="h-10" rounded="rounded-lg" />}
		{showHelper && <SkeletonBox width="w-48" height="h-3" />}
	</div>
);

/**
 * Form Skeleton
 */
export const FormSkeleton = ({ fields = 6, showTitle = true, showButton = true }) => (
	<div className="w-full max-w-2xl space-y-6 rounded-lg bg-white p-6 shadow">
		{showTitle && (
			<div className="mb-6">
				<SkeletonBox width="w-48" height="h-8" className="mb-2" />
				<SkeletonBox width="w-64" height="h-4" />
			</div>
		)}
		<div className="space-y-4">
			{Array.from({ length: fields }).map((_, idx) => (
				<FormFieldSkeleton key={idx} />
			))}
		</div>
		{showButton && (
			<div className="flex gap-4 pt-4">
				<SkeletonBox width="w-32" height="h-10" rounded="rounded-lg" />
				<SkeletonBox width="w-32" height="h-10" rounded="rounded-lg" />
			</div>
		)}
	</div>
);

// ============================================================================
// MAP SKELETONS
// ============================================================================

/**
 * Map Skeleton
 */
export const MapSkeleton = ({ height = 'h-96' }) => (
	<div className={`w-full ${height} animate-pulse rounded-lg bg-gray-200`}>
		<div className="flex h-full items-center justify-center">
			<div className="text-center">
				<SkeletonBox width="w-16" height="h-16" rounded="rounded-full" className="mx-auto mb-2" />
				<SkeletonBox width="w-32" height="h-4" className="mx-auto" />
			</div>
		</div>
	</div>
);

// ============================================================================
// SECTION SKELETONS
// ============================================================================

/**
 * Section Header Skeleton
 */
export const SectionHeaderSkeleton = ({
	showBadge = true,
	showSubtitle = true,
	alignment = 'left'
}) => {
	const alignClass = alignment === 'center' ? 'items-center text-center' : 'items-start text-left';

	return (
		<div className={`flex flex-col gap-4 ${alignClass}`}>
			{showBadge && <SkeletonBox width="w-24" height="h-6" rounded="rounded-full" />}
			<SkeletonBox width="w-64" height="h-10" className="mb-2" />
			{showSubtitle && <SkeletonBox width="w-96" height="h-5" />}
		</div>
	);
};

/**
 * Content Section Skeleton
 */
export const ContentSectionSkeleton = ({
	showHeader = true,
	showCards = true,
	cardColumns = 3,
	cardRows = 3,
	variant = 'dark'
}) => (
	<section className="py-16">
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			{showHeader && <SectionHeaderSkeleton className="mb-12" />}
			{showCards && <CardGridSkeleton columns={cardColumns} rows={cardRows} variant={variant} />}
		</div>
	</section>
);

// ============================================================================
// PAGE SKELETONS
// ============================================================================

/**
 * Product Listing Page Skeleton
 * For pages like Deposits, Loans, Properties, etc.
 */
export const ProductListingPageSkeleton = ({
	showHero = true,
	showCarousel = false,
	showProductGrid = true,
	productColumns = 3,
	productRows = 3,
	variant = 'dark'
}) => (
	<main className="flex flex-col">
		{showHero && <HeroSectionSkeleton />}
		{showCarousel && (
			<section className="py-12">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<CarouselSkeleton slides={3} />
				</div>
			</section>
		)}
		{showProductGrid && (
			<ContentSectionSkeleton
				showHeader={true}
				showCards={true}
				cardColumns={productColumns}
				cardRows={productRows}
				variant={variant}
			/>
		)}
	</main>
);

/**
 * Detail Page Skeleton
 * For pages showing detailed information
 */
export const DetailPageSkeleton = ({
	showHero = true,
	showContent = true,
	contentSections = 2
}) => (
	<main className="flex flex-col">
		{showHero && <HeroSectionSkeleton showButton={false} />}
		{showContent && (
			<section className="py-16">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
					{Array.from({ length: contentSections }).map((_, idx) => (
						<div key={idx} className="mb-12">
							<SectionHeaderSkeleton className="mb-6" />
							<SkeletonText lines={4} />
						</div>
					))}
				</div>
			</section>
		)}
	</main>
);

/**
 * Form Page Skeleton
 * For pages with forms like ContactUs
 */
export const FormPageSkeleton = ({
	showHero = true,
	showForm = true,
	formFields = 8,
	showMap = false
}) => (
	<main className="flex flex-col">
		{showHero && <HeroSectionSkeleton showButton={false} />}
		<section className="py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid gap-8 lg:grid-cols-2">
					{showForm && (
						<div>
							<FormSkeleton fields={formFields} />
						</div>
					)}
					{showMap && (
						<div>
							<MapSkeleton height="h-full min-h-[500px]" />
						</div>
					)}
				</div>
			</div>
		</section>
	</main>
);

/**
 * Newsletter/Article Grid Page Skeleton
 */
export const NewsletterPageSkeleton = ({
	showHero = true,
	showGrid = true,
	gridColumns = 3,
	gridRows = 6
}) => (
	<main className="flex flex-col">
		{showHero && <HeroSectionSkeleton showButton={false} />}
		{showGrid && (
			<section className="py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<SectionHeaderSkeleton className="mb-12" />
					<CardGridSkeleton
						columns={gridColumns}
						rows={gridRows}
						variant="light"
						showImage={true}
						showButton={true}
					/>
					{/* Pagination Skeleton */}
					<div className="mt-8 flex justify-center gap-2">
						{Array.from({ length: 5 }).map((_, idx) => (
							<SkeletonBox key={idx} width="w-10" height="h-10" rounded="rounded-lg" />
						))}
					</div>
				</div>
			</section>
		)}
	</main>
);

/**
 * Generic Page Skeleton
 * Fallback for any page type
 */
export const GenericPageSkeleton = ({ children, className = '' }) => (
	<main className={`flex flex-col ${className}`}>
		<HeroSectionSkeleton />
		<section className="py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{children || (
					<div className="space-y-8">
						<SectionHeaderSkeleton className="mb-8" />
						<SkeletonText lines={5} />
						<CardGridSkeleton columns={3} rows={3} />
					</div>
				)}
			</div>
		</section>
	</main>
);

// ============================================================================
// EXPORTS
// ============================================================================

export default {
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
};
