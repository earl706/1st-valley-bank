import {
	Calendar,
	ArrowRight,
	Eye,
	Clock,
	X,
	Filter,
	Search,
	ChevronLeft,
	ChevronRight
} from 'lucide-react';
import img1 from '/src/assets/newsletter/1.jpg';
import img2 from '/src/assets/newsletter/2.jpg';
import img3 from '/src/assets/newsletter/3.jpg';
import img4 from '/src/assets/newsletter/4.jpg';
import img5 from '/src/assets/newsletter/5.jpg';
import img6 from '/src/assets/newsletter/6.jpg';
import React, { useState, useEffect } from 'react';
import img from '/src/assets/homepage/heroSectionImage.png';
import CarouselSection from '../components/CarouselSection';
import PageHeroSection from '../components/PageHeroSection';

import pdf1 from '/src/assets/newsletter/document.pdf';
import { DarkCard, LightCard } from '../components/Card';
import { DarkPrimaryButton, LightPrimaryButton } from '../components/Buttons';
import newsletterService from '../services/newsletterService';
import { NewsletterPageSkeleton } from '../components/PageSkeleton';

// PDF Viewer Modal Component
function PDFModal({ pdfUrl, title, onClose, id }) {
	useEffect(() => {
		newsletterService.incrementViewCount(id).then((response) => {});
	}, []);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
			<div className="relative flex h-[90vh] w-full max-w-7xl flex-col rounded-xl bg-white shadow-2xl">
				<button
					className="absolute top-3 right-3 z-10 cursor-pointer rounded-full bg-white p-2 shadow hover:bg-gray-100"
					onClick={onClose}
					aria-label="Close PDF"
				>
					<X size={20} />
				</button>
				<div className="flex-shrink-0 px-6 pt-6 pb-2">
					<h2 className="text-lg font-bold text-[#396131]">{title}</h2>
				</div>
				<div className="flex-1 overflow-hidden">
					<iframe src={pdfUrl} title={title} className="h-full w-full border-0" allowFullScreen />
				</div>
			</div>
		</div>
	);
}

const newsletters = Array.from({ length: 27 }, (_, i) => {
	const idx = i + 1;
	const images = [img1, img2, img3, img4, img5, img6];
	const titles = [
		'Grow Your Business with 1VB SME Loans',
		'Secure Your Future with 1VB Deposit Products',
		'How 1VB’s Agriculture Loans Empower Farmers',
		'1VB’s Commitment to Consumer Protection',
		'Discover the Benefits of 1VB’s Salary Loans',
		'Maximize Your Wealth with 1VB Advisory Services'
	];
	const subtitles = [
		'Unlock Growth Potential with Flexible Financing',
		'Safe and Rewarding Savings Solutions',
		'Funding Growth for Filipino Farmers',
		'Transparent, Fair, and Secure Banking',
		'Quick Access to Funds When You Need Them Most',
		'Personalized Financial Guidance You Can Trust'
	];
	const descriptions = [
		'At 1st Valley Bank, we understand the challenges small and medium enterprises face. That’s why our SME loans offer competitive rates, flexible terms, and fast approvals to help you expand your business, upgrade equipment, or boost working capital. Discover how we can support your entrepreneurial journey today!',
		'Building your financial future starts with the right savings plan. 1st Valley Bank offers a range of deposit products designed to keep your money safe while helping it grow. Whether you’re saving for education, emergencies, or investments, our trusted deposit accounts provide security and convenience you can rely on.',
		'Agriculture is the backbone of our nation, and 1st Valley Bank is proud to support farmers with tailored loan programs. Our agriculture loans provide flexible funds for seeds, equipment, and more, plus expert guidance to boost productivity and income. Learn how our lending solutions can help cultivate your success',
		'At 1st Valley Bank, protecting our customers is a top priority. We are committed to transparent practices, safeguarding your privacy, and ensuring fair treatment across all products and services. Read on to learn about our latest consumer protection policies and how we keep your banking experience safe and worry-free',
		'Need cash for unexpected expenses or special occasions? Our Salary Loans offer fast, hassle-free access to funds directly deducted from your paycheck. With competitive rates and flexible terms, 1VB makes borrowing easy, so you can focus on what matters most without financial stress',
		'Financial success starts with smart decisions. At 1st Valley Bank, our Advisory team provides expert guidance tailored to your goals—whether it’s investment planning, loan management, or wealth growth. Discover how our trusted advisors can help you navigate your financial future with confidence'
	];
	return {
		id: idx,
		title: titles[(idx - 1) % titles.length],
		subtitle: subtitles[(idx - 1) % subtitles.length],
		description: descriptions[(idx - 1) % descriptions.length],
		datetime: 'June 19, 2025',
		see_full_article_button: 'Read Full Article',
		image: images[(idx - 1) % images.length],
		views: '3.2k',
		readTime: '5 min',
		buttonText: 'Read Full Story',
		route: '/newsletter',
		pdf: pdf1
	};
});

// Mock pagination constants (used by NewsletterGrid component)
const NEWSLETTER_GRID_PAGE_SIZE = 9;

export const NewsletterGrid = ({
	data = { count: newsletters.length, results: newsletters }, // expecting backend format; fallback for legacy
	showPagination = true,
	cardVariant = 'dark' // "dark" for DarkCard/DarkPrimaryButton or "light" for LightCard/LightPrimaryButton
}) => {
	const [pdfModal, setPdfModal] = useState({ open: false, pdfUrl: null, title: '', id: null });
	const [currentPage, setCurrentPage] = useState(1);

	// Do we have data in backend format? Accept legacy [{...}] as fallback for previews/mockup/SSR.
	const newslettersArr = Array.isArray(data?.results)
		? data.results
		: Array.isArray(data)
			? data
			: [];
	// fall back to demo data only if completely empty
	const count =
		typeof data?.count === 'number' ? data.count : newslettersArr.length || newsletters.length;
	const totalPages = Math.ceil(count / NEWSLETTER_GRID_PAGE_SIZE);

	// Pagination (server or client-side, both supported)
	const getCurrentPageResults = () => {
		if (showPagination) {
			if (Array.isArray(data?.results)) {
				// Assume full slice already in results, do client-side
				return newslettersArr.slice(
					(currentPage - 1) * NEWSLETTER_GRID_PAGE_SIZE,
					currentPage * NEWSLETTER_GRID_PAGE_SIZE
				);
			}
			// fallback to direct array
			return newslettersArr.slice(
				(currentPage - 1) * NEWSLETTER_GRID_PAGE_SIZE,
				currentPage * NEWSLETTER_GRID_PAGE_SIZE
			);
		}
		return newslettersArr;
	};

	const paginatedNewsletters = getCurrentPageResults();

	const openPDF = (pdfUrl, title, id) => {
		setPdfModal({ open: true, pdfUrl, title, id });
	};

	const closePDF = () => {
		setPdfModal({ open: false, pdfUrl: null, title: '', id: null });
	};

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	// Helper for card/button selection
	const isDark = cardVariant === 'dark';

	const Card = isDark ? DarkCard : LightCard;
	const PrimaryButton = isDark ? DarkPrimaryButton : LightPrimaryButton;

	useEffect(() => {
		console.log(paginatedNewsletters);
	}, [paginatedNewsletters]);

	return (
		<div className="">
			{pdfModal.open && (
				<PDFModal
					pdfUrl={pdfModal.pdfUrl}
					title={pdfModal.title}
					onClose={closePDF}
					id={pdfModal.id}
				/>
			)}

			{/* Grid Layout */}
			<div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
				{paginatedNewsletters.map((newsletter) => {
					// Map backend props -> frontend as used
					const {
						id,
						title,
						subtitle,
						description,
						image,
						thumbnail,
						pdf_file,
						views,
						read_time,
						published_date
					} = newsletter;

					return (
						<Card
							key={id}
							useNativeSpacing={true}
							className={
								`flex h-full flex-col overflow-hidden rounded-3xl p-0 shadow-lg transition-all duration-200 hover:shadow-md` +
								(isDark ? '' : ' border border-[#396131]/10 bg-white/90')
							}
						>
							{/* Image Section */}
							<div className="relative h-48 overflow-hidden">
								<img
									src={thumbnail}
									alt={subtitle || title}
									className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-110"
								/>
								<div
									className={
										isDark
											? 'absolute inset-0 bg-gradient-to-t from-[#18421d]/80 via-[#224f27]/30 to-transparent'
											: 'absolute inset-0 bg-gradient-to-t from-[#eaf8ed]/90 via-transparent to-transparent'
									}
								></div>

								{/* Category Badge */}
								<div className="absolute top-4 left-4">
									<div className={`rounded-full border border-[#396131]/20 bg-[#f6fff3]/90 px-3 py-1 shadow-lg backdrop-blur-sm`}>
										<span className="text-xs font-bold tracking-wide text-[#396131] uppercase">
											{title}
										</span>
									</div>
								</div>

								{/* Date Badge */}
								<div className="absolute top-4 right-4">
									<div
										className={
											(isDark ? 'bg-[#4a7c3a]/90' : 'bg-[#396131]/80') +
											' rounded-full px-3 py-1 shadow-lg backdrop-blur-sm'
										}
									>
										<div
											className={
												'flex items-center gap-1 ' +
												(isDark
													? 'text-white'
													: 'text-white')
											}
										>
											<Calendar size={12} />
											<time className="text-xs leading-tight font-normal">
												{/* Format: "June 15" */}
												{published_date
													? new Date(published_date).toLocaleDateString('en-US', {
															month: 'short',
															day: 'numeric'
														})
													: '--'}
											</time>
										</div>
									</div>
								</div>
							</div>

							{/* Content Section */}
							<div className="flex flex-grow flex-col p-6">
								<div className="flex flex-grow flex-col">
									{/* Section (Card) Header */}
									<h2
										className={
											'mb-3 text-2xl leading-tight font-bold transition-colors duration-200 md:text-2xl ' +
											(isDark ? 'text-white group-hover:text-[#e5ffe2]' : 'text-[#18421d]')
										}
									>
										{title}
									</h2>

									{/* Opening Paragraph */}
									<p
										className={
											'mb-4 line-clamp-3 text-base leading-relaxed font-normal ' +
											(isDark ? 'text-white/80' : 'text-[#18421d]/80')
										}
									>
										{description}
									</p>

									{/* Meta Info */}
									<div
										className={
											'mt-auto mb-6 flex items-center gap-4 text-sm leading-relaxed ' +
											(isDark ? 'text-white/60' : 'text-[#396131]/90')
										}
									>
										<div className="flex items-center gap-1">
											<Eye size={16} className={isDark ? 'text-white/70' : 'text-[#396131]/60'} />
											<span className={"font-normal " + (isDark ? '' : 'text-[#396131]')}>
												{typeof views === 'number' ? views : views || ''}
											</span>
										</div>
										<div className="flex items-center gap-1">
											<Clock size={16} className={isDark ? 'text-white/70' : 'text-[#396131]/60'} />
											<span className={"font-normal " + (isDark ? '' : 'text-[#396131]')}>{read_time || ''}</span>
										</div>
									</div>
								</div>

								<PrimaryButton className="w-full" onClick={() => openPDF(pdf_file, title, id)}>
									<span className="flex w-full items-center justify-center gap-2">
										<span className={"text-base font-semibold " + (isDark ? "text-[#396131]" : "text-white")}>Read Full Article</span>
										<ArrowRight
											size={18}
											className={(isDark ?  "text-[#396131]" : "text-white") + " transition-transform duration-300 group-hover:translate-x-1"}
										/>
									</span>
								</PrimaryButton>
							</div>
						</Card>
					);
				})}
			</div>

			{/* Pagination Section */}
			{showPagination && totalPages > 1 && (
				<div className="mt-12 flex flex-col items-center gap-4">
					<div className="flex items-center gap-2">
						<button
							className={
								'group inline-flex transform cursor-pointer items-center rounded-xl ' +
								(isDark
									? 'bg-[#396131] text-white'
									: 'border border-[#396131]/60 bg-white text-[#396131]') +
								' px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50'
							}
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
						>
							<span className="text-sm font-bold">Previous</span>
						</button>
						{Array.from({ length: totalPages }, (_, idx) => (
							<button
								key={idx + 1}
								className={
									'group inline-flex transform cursor-pointer items-center rounded-xl px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ' +
									(currentPage === idx + 1
										? isDark
											? 'bg-[#396131] text-white'
											: 'bg-[#396131] text-white'
										: isDark
											? 'bg-white text-[#396131]'
											: 'border border-[#396131]/30 bg-white text-[#396131]')
								}
								onClick={() => handlePageChange(idx + 1)}
							>
								<span className="text-sm font-bold">{idx + 1}</span>
							</button>
						))}
						<button
							className={
								'group inline-flex transform cursor-pointer items-center rounded-xl ' +
								(isDark
									? 'bg-[#396131] text-white'
									: 'border border-[#396131]/60 bg-white text-[#396131]') +
								' px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50'
							}
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
						>
							<span className="text-sm font-bold">Next</span>
						</button>
					</div>
					<div
						className={
							'text-xs leading-relaxed font-normal ' +
							(isDark ? 'text-white/80' : 'text-[#396131]/80')
						}
					>
						Page {currentPage} of {totalPages}
					</div>
				</div>
			)}
		</div>
	);
};

const PAGE_SIZE = 9;

const SORT_OPTIONS = [
	{ value: '-published_date', label: 'Default' },
	{ value: 'published_date', label: 'Oldest First' },
	{ value: '-published_date', label: 'Newest First' },
	{ value: 'views', label: 'Most Views' },
	{ value: '-views', label: 'Least Views' },
	{ value: 'title', label: 'Title: A-Z' },
	{ value: '-title', label: 'Title: Z-A' }
];

const READ_TIME_OPTIONS = [
	{ value: '', label: 'All Read Times' },
	{ value: '1', label: '1 min' },
	{ value: '2', label: '2 min' },
	{ value: '3', label: '3 min' },
	{ value: '4', label: '4 min' },
	{ value: '5', label: '5 min' },
	{ value: '10', label: '10+ min' }
];

export default function Newsletter() {
	const [newsletters, setNewsletters] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [showFilters, setShowFilters] = useState(false);

	// Applied filter states (used in API calls)
	const [categoryFilter, setCategoryFilter] = useState('');
	const [minViews, setMinViews] = useState('');
	const [maxViews, setMaxViews] = useState('');
	const [readTimeFilter, setReadTimeFilter] = useState('');
	const [publishedDateFrom, setPublishedDateFrom] = useState('');
	const [publishedDateTo, setPublishedDateTo] = useState('');
	const [sortBy, setSortBy] = useState('-published_date');
	const [searchQuery, setSearchQuery] = useState('');

	// Draft filter states (what user is typing/selecting)
	const [draftCategoryFilter, setDraftCategoryFilter] = useState('');
	const [draftMinViews, setDraftMinViews] = useState('');
	const [draftMaxViews, setDraftMaxViews] = useState('');
	const [draftReadTimeFilter, setDraftReadTimeFilter] = useState('');
	const [draftPublishedDateFrom, setDraftPublishedDateFrom] = useState('');
	const [draftPublishedDateTo, setDraftPublishedDateTo] = useState('');

	const totalPages = Math.ceil(totalCount / PAGE_SIZE);

	const fetchNewsletters = async (page = 1) => {
		setLoading(true);
		setError(null);
		try {
			const params = {
				page,
				page_size: PAGE_SIZE,
				status: 'published' // Always show only published newsletters
			};

			if (categoryFilter) params.filter_category = categoryFilter;
			if (minViews) params.filter_views_gte = parseInt(minViews);
			if (maxViews) params.filter_views_lte = parseInt(maxViews);
			if (readTimeFilter) params.filter_read_time = readTimeFilter;
			if (publishedDateFrom) params.filter_published_date_gte = publishedDateFrom;
			if (publishedDateTo) params.filter_published_date_lte = publishedDateTo;
			if (sortBy) params.ordering = sortBy;
			if (searchQuery.trim()) params.search = searchQuery.trim();

			const response = await newsletterService.getNewsletters(params);
			if (response.results) {
				setNewsletters(response.results || []);
				setTotalCount(response.count || 0);
			} else {
				setError('Failed to load newsletters');
				setNewsletters([]);
			}
		} catch (err) {
			console.error('Failed to fetch newsletters:', err);
			setError('Failed to load newsletters');
			setNewsletters([]);
		} finally {
			setLoading(false);
		}
	};

	// Sync draft filters with applied filters when they change
	useEffect(() => {
		setDraftCategoryFilter(categoryFilter);
		setDraftMinViews(minViews);
		setDraftMaxViews(maxViews);
		setDraftReadTimeFilter(readTimeFilter);
		setDraftPublishedDateFrom(publishedDateFrom);
		setDraftPublishedDateTo(publishedDateTo);
	}, [categoryFilter, minViews, maxViews, readTimeFilter, publishedDateFrom, publishedDateTo]);

	useEffect(() => {
		fetchNewsletters(currentPage);
	}, [
		currentPage,
		categoryFilter,
		minViews,
		maxViews,
		readTimeFilter,
		publishedDateFrom,
		publishedDateTo,
		sortBy,
		searchQuery
	]);

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const handleApplyFilters = () => {
		setCategoryFilter(draftCategoryFilter);
		setMinViews(draftMinViews);
		setMaxViews(draftMaxViews);
		setReadTimeFilter(draftReadTimeFilter);
		setPublishedDateFrom(draftPublishedDateFrom);
		setPublishedDateTo(draftPublishedDateTo);
		setCurrentPage(1);
	};

	const handleFilterReset = () => {
		setCategoryFilter('');
		setMinViews('');
		setMaxViews('');
		setReadTimeFilter('');
		setPublishedDateFrom('');
		setPublishedDateTo('');
		setSortBy('-published_date');
		setSearchQuery('');
		setDraftCategoryFilter('');
		setDraftMinViews('');
		setDraftMaxViews('');
		setDraftReadTimeFilter('');
		setDraftPublishedDateFrom('');
		setDraftPublishedDateTo('');
		setCurrentPage(1);
	};

	const hasActiveFilters =
		categoryFilter ||
		minViews ||
		maxViews ||
		readTimeFilter ||
		publishedDateFrom ||
		publishedDateTo ||
		sortBy !== '-published_date' ||
		searchQuery.trim();
	const hasDraftChanges =
		draftCategoryFilter !== categoryFilter ||
		draftMinViews !== minViews ||
		draftMaxViews !== maxViews ||
		draftReadTimeFilter !== readTimeFilter ||
		draftPublishedDateFrom !== publishedDateFrom ||
		draftPublishedDateTo !== publishedDateTo;

	// Show skeleton on initial load
	if (loading && newsletters.length === 0 && currentPage === 1) {
		return <NewsletterPageSkeleton showHero={true} showGrid={true} gridColumns={3} gridRows={3} />;
	}

	return (
		<>
			<main className="flex flex-col">
				<PageHeroSection pageSlug="newsletter" />

				<section className="bg-white lg:bg-[#E9F2EA] px-6 py-24">
					<div className="mx-auto max-w-7xl">
						<div className="mb-16 text-center">
							<h2 className="mb-4 text-4xl font-bold text-[#396131] md:text-5xl lg:text-6xl">
								Newsletter
							</h2>
							<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#396131] to-[#4a7c3a]/80"></div>
							<p className="mx-auto mt-6 max-w-2xl text-lg text-[#396131]/80">
								Stay updated with our curated collection of insights, trends, and innovations across
								various industries.
							</p>
						</div>

						{/* Search Bar */}
						<div className="mb-4">
							<div className="relative">
								<Search
									className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-[#396131]/60"
									size={20}
								/>
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => {
										setSearchQuery(e.target.value);
										setCurrentPage(1);
									}}
									placeholder="Search by title, subtitle, description..."
									className="w-full rounded-lg border border-[#396131]/20 bg-white py-2.5 pr-4 pl-10 text-sm text-[#396131] placeholder:text-[#396131]/40 focus:border-[#396131]/30 focus:ring-2 focus:ring-[#396131]/10 focus:outline-none transition"
								/>
								{searchQuery && (
									<button
										onClick={() => {
											setSearchQuery('');
											setCurrentPage(1);
										}}
										className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-[#396131]/60 transition hover:bg-[#396131]/10 hover:text-[#396131]"
										aria-label="Clear search"
									>
										<X size={16} />
									</button>
								)}
							</div>
						</div>

						{/* Filters and Sort Section */}
						<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<div className="flex flex-wrap items-center gap-3">
								<button
									onClick={() => setShowFilters(!showFilters)}
									className="flex items-center gap-2 rounded-lg border border-[#396131]/20 bg-white px-4 py-2 text-sm font-semibold text-[#396131] transition hover:bg-[#396131]/10"
								>
									<Filter size={18} className="text-[#396131]" />
									Filters
									{hasActiveFilters && (
										<span className="ml-1 rounded-full bg-[#396131] px-2 py-0.5 text-xs text-white">
											{
												[
													categoryFilter ? 'Category' : null,
													minViews || maxViews ? 'Views' : null,
													readTimeFilter ? 'Read Time' : null,
													publishedDateFrom || publishedDateTo ? 'Date' : null,
													sortBy !== '-published_date' ? 'Sort' : null,
													searchQuery.trim() ? 'Search' : null
												].filter(Boolean).length
											}
										</span>
									)}
									{hasDraftChanges && (
										<span className="ml-1 rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">
											Pending
										</span>
									)}
								</button>
								{hasActiveFilters && (
									<button
										onClick={handleFilterReset}
										className="flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
									>
										<X size={16} />
										Clear Filters
									</button>
								)}
							</div>
							<div className="flex items-center gap-2">
								<label className="text-sm font-medium text-[#396131]">Sort:</label>
								<select
									value={sortBy}
									onChange={(e) => {
										setSortBy(e.target.value);
										setCurrentPage(1);
									}}
									className="rounded-lg border border-[#396131]/20 bg-white px-3 py-2 text-sm text-[#396131] focus:border-[#396131]/30 focus:ring-2 focus:ring-[#396131]/10 focus:outline-none transition"
								>
									{SORT_OPTIONS.map((option) => (
										<option
											key={option.value}
											value={option.value}
											className="bg-[#E9F2EA] text-[#396131]"
										>
											{option.label}
										</option>
									))}
								</select>
							</div>
						</div>

						{/* Filter Panel */}
						{showFilters && (
							<div className="mb-6 rounded-lg border border-[#396131]/10 bg-white p-4 shadow-sm">
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
									<div>
										<label className="mb-2 block text-sm font-medium text-[#396131]">Category</label>
										<input
											type="text"
											value={draftCategoryFilter}
											onChange={(e) => setDraftCategoryFilter(e.target.value)}
											placeholder="e.g., banking, community"
											className="w-full rounded-lg border border-[#396131]/20 bg-[#F6FAF7] px-3 py-2 text-sm text-[#396131] placeholder:text-[#396131]/40 focus:border-[#396131]/30 focus:ring-2 focus:ring-[#396131]/10 focus:outline-none"
										/>
									</div>
									<div>
										<label className="mb-2 block text-sm font-medium text-[#396131]">Min Views</label>
										<input
											type="number"
											value={draftMinViews}
											onChange={(e) => setDraftMinViews(e.target.value)}
											placeholder="0"
											min="0"
											className="w-full rounded-lg border border-[#396131]/20 bg-[#F6FAF7] px-3 py-2 text-sm text-[#396131] placeholder:text-[#396131]/40 focus:border-[#396131]/30 focus:ring-2 focus:ring-[#396131]/10 focus:outline-none"
										/>
									</div>
									<div>
										<label className="mb-2 block text-sm font-medium text-[#396131]">Max Views</label>
										<input
											type="number"
											value={draftMaxViews}
											onChange={(e) => setDraftMaxViews(e.target.value)}
											placeholder="No limit"
											min="0"
											className="w-full rounded-lg border border-[#396131]/20 bg-[#F6FAF7] px-3 py-2 text-sm text-[#396131] placeholder:text-[#396131]/40 focus:border-[#396131]/30 focus:ring-2 focus:ring-[#396131]/10 focus:outline-none"
										/>
									</div>
									<div>
										<label className="mb-2 block text-sm font-medium text-[#396131]">Read Time</label>
										<select
											value={draftReadTimeFilter}
											onChange={(e) => setDraftReadTimeFilter(e.target.value)}
											className="w-full rounded-lg border border-[#396131]/20 bg-[#F6FAF7] px-3 py-2 text-sm text-[#396131] focus:border-[#396131]/30 focus:ring-2 focus:ring-[#396131]/10 focus:outline-none"
										>
											{READ_TIME_OPTIONS.map((option) => (
												<option
													key={option.value}
													value={option.value}
													className="bg-[#E9F2EA] text-[#396131]"
												>
													{option.label}
												</option>
											))}
										</select>
									</div>
									<div>
										<label className="mb-2 block text-sm font-medium text-[#396131]">
											Published From
										</label>
										<input
											type="date"
											value={draftPublishedDateFrom}
											onChange={(e) => setDraftPublishedDateFrom(e.target.value)}
											className="w-full rounded-lg border border-[#396131]/20 bg-[#F6FAF7] px-3 py-2 text-sm text-[#396131] focus:border-[#396131]/30 focus:ring-2 focus:ring-[#396131]/10 focus:outline-none"
										/>
									</div>
									<div>
										<label className="mb-2 block text-sm font-medium text-[#396131]">
											Published To
										</label>
										<input
											type="date"
											value={draftPublishedDateTo}
											onChange={(e) => setDraftPublishedDateTo(e.target.value)}
											className="w-full rounded-lg border border-[#396131]/20 bg-[#F6FAF7] px-3 py-2 text-sm text-[#396131] focus:border-[#396131]/30 focus:ring-2 focus:ring-[#396131]/10 focus:outline-none"
										/>
									</div>
								</div>
								<div className="mt-4 flex items-center justify-end gap-3">
									<button
										onClick={() => {
											setDraftCategoryFilter(categoryFilter);
											setDraftMinViews(minViews);
											setDraftMaxViews(maxViews);
											setDraftReadTimeFilter(readTimeFilter);
											setDraftPublishedDateFrom(publishedDateFrom);
											setDraftPublishedDateTo(publishedDateTo);
										}}
										className="rounded-lg border border-[#396131]/20 bg-[#F6FAF7] px-4 py-2 text-sm font-medium text-[#396131] transition hover:bg-[#396131]/10"
									>
										Reset
									</button>
									<button
										onClick={handleApplyFilters}
										disabled={!hasDraftChanges}
										className="rounded-lg bg-[#396131] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#396131]/90 disabled:cursor-not-allowed disabled:opacity-50"
									>
										Apply Filters
									</button>
								</div>
							</div>
						)}

						{/* Results Count */}
						{!loading && (
							<div className="mb-4 text-sm text-[#396131]/70">
								Showing {newsletters.length > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0} to{' '}
								{Math.min(currentPage * PAGE_SIZE, totalCount)} of {totalCount} articles
							</div>
						)}

						{/* Loading State */}
						{loading && newsletters.length === 0 ? (
							<NewsletterPageSkeleton
								showHero={false}
								showGrid={true}
								gridColumns={3}
								gridRows={3}
							/>
						) : error ? (
							<div className="text-center text-red-600">{error}</div>
						) : newsletters.length === 0 ? (
							<div className="col-span-full py-12 text-center text-[#396131]/60">
								No articles found. Try adjusting your filters.
							</div>
						) : (
							<>
								<NewsletterGrid
									data={{ count: totalCount, results: newsletters }}
									showPagination={false}
									cardVariant="light"
								/>

								{/* Pagination */}
								{totalPages > 1 && (
									<div className="mt-12 flex flex-col items-center gap-4">
										<div className="flex items-center gap-2">
											<button
												className="group inline-flex transform cursor-pointer items-center rounded-xl border border-[#396131]/50 bg-[#F6FAF7] px-4 py-2 text-sm font-semibold text-[#396131] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
												onClick={() => handlePageChange(currentPage - 1)}
												disabled={currentPage === 1}
											>
												<ChevronLeft size={18} className="mr-1 text-[#396131]" />
												<span className="text-sm font-bold">Previous</span>
											</button>
											{Array.from({ length: totalPages }, (_, idx) => {
												const page = idx + 1;
												// Show first page, last page, current page, and pages around current
												if (
													page === 1 ||
													page === totalPages ||
													(page >= currentPage - 1 && page <= currentPage + 1)
												) {
													return (
														<button
															key={page}
															className={`group inline-flex transform cursor-pointer items-center rounded-xl px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
																currentPage === page
																	? 'bg-[#396131] text-white'
																	: 'border border-[#396131]/20 bg-[#F6FAF7] text-[#396131]'
															}`}
															onClick={() => handlePageChange(page)}
														>
															<span className="text-sm font-bold">{page}</span>
														</button>
													);
												} else if (page === currentPage - 2 || page === currentPage + 2) {
													return (
														<span key={page} className="px-2 text-[#396131]/40">
															...
														</span>
													);
												}
												return null;
											})}
											<button
												className="group inline-flex transform cursor-pointer items-center rounded-xl border border-[#396131]/50 bg-[#F6FAF7] px-4 py-2 text-sm font-semibold text-[#396131] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
												onClick={() => handlePageChange(currentPage + 1)}
												disabled={currentPage === totalPages}
											>
												<span className="text-sm font-bold">Next</span>
												<ChevronRight size={18} className="ml-1 text-[#396131]" />
											</button>
										</div>
										<div className="text-xs leading-relaxed font-normal text-[#396131]/80">
											Page {currentPage} of {totalPages}
										</div>
									</div>
								)}
							</>
						)}
					</div>
				</section>
			</main>
		</>
	);
}
