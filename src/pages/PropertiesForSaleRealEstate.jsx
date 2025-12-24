import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import PageHeroSection from '../components/PageHeroSection';
import propertyService from '../services/propertyService';
import { ProductListingPageSkeleton, CardGridSkeleton } from '../components/PageSkeleton';
import { ChevronLeft, ChevronRight, Filter, X, Search } from 'lucide-react';

const PAGE_SIZE = 9;
const STATUS_OPTIONS = [
	{ value: '', label: 'All Status' },
	{ value: 'available', label: 'Available' },
	{ value: 'reserved', label: 'Reserved' },
	{ value: 'sold', label: 'Sold' }
];

const SORT_OPTIONS = [
	{ value: '', label: 'Default' },
	{ value: 'price', label: 'Price: Low to High' },
	{ value: '-price', label: 'Price: High to Low' },
	{ value: 'created_at', label: 'Newest First' },
	{ value: '-created_at', label: 'Oldest First' }
];

export default function PropertiesForSaleRealEstate() {
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [showFilters, setShowFilters] = useState(false);

	// Applied filter states (used in API calls)
	const [statusFilter, setStatusFilter] = useState('');
	const [minPrice, setMinPrice] = useState('');
	const [maxPrice, setMaxPrice] = useState('');
	const [sortBy, setSortBy] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	// Draft filter states (what user is typing/selecting)
	const [draftStatusFilter, setDraftStatusFilter] = useState('');
	const [draftMinPrice, setDraftMinPrice] = useState('');
	const [draftMaxPrice, setDraftMaxPrice] = useState('');

	const totalPages = Math.ceil(totalCount / PAGE_SIZE);

	const fetchProperties = async (page = 1) => {
		setLoading(true);
		setError(null);
		try {
			const params = {
				page,
				page_size: PAGE_SIZE,
				property_type: 'real_estate'
			};

			if (statusFilter) params.status = statusFilter;
			if (minPrice) params.min_price = parseFloat(minPrice);
			if (maxPrice) params.max_price = parseFloat(maxPrice);
			if (sortBy) params.ordering = sortBy;
			if (searchQuery.trim()) params.search = searchQuery.trim();

			const response = await propertyService.getRealEstate(params);
			if (response.success) {
				setProperties(response.data.results || []);
				setTotalCount(response.data.count || 0);
			} else {
				setError(response.message || 'Failed to load properties');
				setProperties([]);
			}
		} catch (err) {
			console.error('Failed to fetch properties:', err);
			setError('Failed to load properties');
			setProperties([]);
		} finally {
			setLoading(false);
		}
	};

	// Sync draft filters with applied filters when they change
	useEffect(() => {
		setDraftStatusFilter(statusFilter);
		setDraftMinPrice(minPrice);
		setDraftMaxPrice(maxPrice);
	}, [statusFilter, minPrice, maxPrice]);

	useEffect(() => {
		fetchProperties(currentPage);
	}, [currentPage, statusFilter, minPrice, maxPrice, sortBy, searchQuery]);

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const handleApplyFilters = () => {
		setStatusFilter(draftStatusFilter);
		setMinPrice(draftMinPrice);
		setMaxPrice(draftMaxPrice);
		setCurrentPage(1);
	};

	const handleFilterReset = () => {
		setStatusFilter('');
		setMinPrice('');
		setMaxPrice('');
		setSortBy('');
		setSearchQuery('');
		setDraftStatusFilter('');
		setDraftMinPrice('');
		setDraftMaxPrice('');
		setCurrentPage(1);
	};

	const hasActiveFilters = statusFilter || minPrice || maxPrice || sortBy || searchQuery.trim();
	const hasDraftChanges =
		draftStatusFilter !== statusFilter || draftMinPrice !== minPrice || draftMaxPrice !== maxPrice;

	// Show skeleton on initial load
	if (loading && properties.length === 0 && currentPage === 1) {
		return (
			<ProductListingPageSkeleton
				showHero={true}
				showCarousel={false}
				showProductGrid={true}
				productColumns={3}
				productRows={3}
				variant="light"
			/>
		);
	}

	return (
		<>
			<main className="flex flex-col">
				<PageHeroSection pageSlug="properties-for-sale-real-estate-and-other-properties-acquired-for-sale" />
				<section
					id="properties"
					className="max-mx-7xl px-8 flex flex-col pb-8"
					style={{ backgroundColor: '#396131' }}
				>
					<div className="my-16 text-center">
						<h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
							Real Estate & Properties
						</h2>
						<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-white/70 to-white/40"></div>
						<p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
							Explore our assortment of prime real estate, residential, commercial, and foreclosed
							properties for sale, opportunities offered only by 1st Valley Bank.
						</p>
					</div>

					{/* Search Bar */}
					<div className="mb-4">
						<div className="relative">
							<Search
								className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-[#396131]/50"
								size={20}
							/>
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => {
									setSearchQuery(e.target.value);
									setCurrentPage(1);
								}}
								placeholder="Search by title, location, description, property code..."
								className="w-full rounded-lg border border-white/30 bg-white py-2.5 pr-4 pl-10 text-sm text-[#396131] placeholder:text-[#396131]/50 focus:border-white focus:ring-2 focus:ring-white/20 focus:outline-none"
							/>
							{searchQuery && (
								<button
									onClick={() => {
										setSearchQuery('');
										setCurrentPage(1);
									}}
									className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-white/60 transition hover:bg-white/20 hover:text-white"
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
								className="flex items-center gap-2 rounded-lg border border-white/30 bg-white px-4 py-2 text-sm font-semibold text-[#396131] transition hover:bg-white/90"
							>
								<Filter size={18} />
								Filters
								{hasActiveFilters && (
									<span className="ml-1 rounded-full bg-[#396131] px-2 py-0.5 text-xs text-white">
										{
											[
												statusFilter,
												minPrice || maxPrice ? 'Price' : null,
												sortBy ? 'Sort' : null,
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
									className="flex items-center gap-1 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
								>
									<X size={16} />
									Clear Filters
								</button>
							)}
						</div>
						<div className="flex items-center gap-2">
							<label className="text-sm font-medium text-white">Sort:</label>
							<select
								value={sortBy}
								onChange={(e) => {
									setSortBy(e.target.value);
									setCurrentPage(1);
								}}
								className="rounded-lg border border-white/30 bg-white px-3 py-2 text-sm text-[#396131] focus:border-white focus:ring-2 focus:ring-white/20 focus:outline-none"
							>
								{SORT_OPTIONS.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Filter Panel */}
					{showFilters && (
						<div className="mb-6 rounded-lg border border-white/20 bg-white p-4 shadow-sm">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								<div>
									<label className="mb-2 block text-sm font-medium text-[#396131]">Status</label>
									<select
										value={draftStatusFilter}
										onChange={(e) => setDraftStatusFilter(e.target.value)}
										className="w-full rounded-lg border border-white/30 bg-white px-3 py-2 text-sm text-[#396131] focus:border-white focus:ring-2 focus:ring-white/20 focus:outline-none"
									>
										{STATUS_OPTIONS.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
								</div>
								<div>
									<label className="mb-2 block text-sm font-medium text-[#396131]">
										Min Price (₱)
									</label>
									<input
										type="number"
										value={draftMinPrice}
										onChange={(e) => setDraftMinPrice(e.target.value)}
										placeholder="0"
										min="0"
										className="w-full rounded-lg border border-white/30 bg-white px-3 py-2 text-sm text-[#396131] focus:border-white focus:ring-2 focus:ring-white/20 focus:outline-none"
									/>
								</div>
								<div>
									<label className="mb-2 block text-sm font-medium text-[#396131]">
										Max Price (₱)
									</label>
									<input
										type="number"
										value={draftMaxPrice}
										onChange={(e) => setDraftMaxPrice(e.target.value)}
										placeholder="No limit"
										min="0"
										className="w-full rounded-lg border border-white/30 bg-white px-3 py-2 text-sm text-[#396131] focus:border-white focus:ring-2 focus:ring-white/20 focus:outline-none"
									/>
								</div>
							</div>
							<div className="mt-4 flex items-center justify-end gap-3">
								<button
									onClick={() => {
										setDraftStatusFilter(statusFilter);
										setDraftMinPrice(minPrice);
										setDraftMaxPrice(maxPrice);
									}}
									className="rounded-lg border border-white/30 bg-white px-4 py-2 text-sm font-medium text-[#396131] transition hover:bg-white/90"
								>
									Reset
								</button>
								<button
									onClick={handleApplyFilters}
									disabled={!hasDraftChanges}
									className="rounded-lg bg-[#396131] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#27461f] disabled:cursor-not-allowed disabled:opacity-50"
								>
									Apply Filters
								</button>
							</div>
						</div>
					)}

					{/* Results Count */}
					{!loading && (
						<div className="mb-4 text-sm text-white/70">
							Showing {properties.length > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0} to{' '}
							{Math.min(currentPage * PAGE_SIZE, totalCount)} of {totalCount} properties
						</div>
					)}

					{/* Loading State */}
					{loading && properties.length === 0 ? (
						<CardGridSkeleton
							columns={3}
							rows={3}
							variant="light"
							showImage={true}
							showButton={false}
						/>
					) : error ? (
						<div className="text-center text-red-200">{error}</div>
					) : properties.length === 0 ? (
						<div className="col-span-full py-12 text-center text-white opacity-60">
							No properties found. Try adjusting your filters.
						</div>
					) : (
						<>
							<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
								{properties.map((property, index) => (
									<PropertyCard key={property.id || index} property={property} />
								))}
							</div>

							{/* Pagination */}
							{totalPages > 1 && (
								<div className="mt-12 flex flex-col items-center gap-4">
									<div className="flex items-center gap-2">
										<button
											className="group inline-flex transform cursor-pointer items-center rounded-xl border border-white/60 bg-white px-4 py-2 text-sm font-semibold text-[#396131] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
											onClick={() => handlePageChange(currentPage - 1)}
											disabled={currentPage === 1}
										>
											<ChevronLeft size={18} className="mr-1" />
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
																? 'bg-white text-[#396131] font-bold'
																: 'border border-white/30 bg-transparent text-white'
														}`}
														onClick={() => handlePageChange(page)}
													>
														<span className="text-sm font-bold">{page}</span>
													</button>
												);
											} else if (page === currentPage - 2 || page === currentPage + 2) {
												return (
													<span key={page} className="px-2 text-white/50">
														...
													</span>
												);
											}
											return null;
										})}
										<button
											className="group inline-flex transform cursor-pointer items-center rounded-xl border border-white/60 bg-white px-4 py-2 text-sm font-semibold text-[#396131] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
											onClick={() => handlePageChange(currentPage + 1)}
											disabled={currentPage === totalPages}
										>
											<span className="text-sm font-bold">Next</span>
											<ChevronRight size={18} className="ml-1" />
										</button>
									</div>
									<div className="text-xs leading-relaxed font-normal text-white/80">
										Page {currentPage} of {totalPages}
									</div>
								</div>
							)}
						</>
					)}
				</section>
			</main>
		</>
	);
}
