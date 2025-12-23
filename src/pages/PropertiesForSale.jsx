import React, { useEffect, useState } from 'react';
import {
	MapPin,
	Calendar,
	Hash,
	Eye,
	Heart,
	Share2,
	Home,
	Ruler,
	ChevronLeft,
	ChevronRight
} from 'lucide-react';
import {
	faHouseCircleCheck,
	faMoneyBillTrendUp,
	faTags,
	faTruck
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import VehicleCard from '../components/VehicleCard';
import PropertyCard from '../components/PropertyCard';
import PageHeroSection from '../components/PageHeroSection';
import img from '/src/assets/homepage/heroSectionImage.png';

// Import propertyService
import propertyService from '../services/propertyService';
import {
	ProductListingPageSkeleton,
	CardGridSkeleton,
	SectionHeaderSkeleton
} from '../components/PageSkeleton';

const PAGE_SIZE = 9;

export default function PropertiesForSale() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');

	// State for fetched property data
	const [vehicles, setVehicles] = useState([]);
	const [vehiclesLoading, setVehiclesLoading] = useState(true);
	const [vehiclesError, setVehiclesError] = useState(null);
	const [vehiclesCurrentPage, setVehiclesCurrentPage] = useState(1);
	const [vehiclesTotalCount, setVehiclesTotalCount] = useState(0);

	const [realEstate, setRealEstate] = useState([]);
	const [realEstateLoading, setRealEstateLoading] = useState(true);
	const [realEstateError, setRealEstateError] = useState(null);
	const [realEstateCurrentPage, setRealEstateCurrentPage] = useState(1);
	const [realEstateTotalCount, setRealEstateTotalCount] = useState(0);

	const vehiclesTotalPages = Math.ceil(vehiclesTotalCount / PAGE_SIZE);
	const realEstateTotalPages = Math.ceil(realEstateTotalCount / PAGE_SIZE);

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		const observers = [];
		const createObserver = (threshold = 0.1) => {
			return new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						setIsVisible((prev) => ({
							...prev,
							[entry.target.id]: entry.isIntersecting
						}));
						if (entry.isIntersecting) {
							setActiveSection(entry.target.id);
						}
					});
				},
				{ threshold, rootMargin: '-50px 0px' }
			);
		};
		const observer = createObserver();
		const elements = document.querySelectorAll('[data-scroll]');
		elements.forEach((el) => observer.observe(el));
		observers.push(observer);
		return () => observers.forEach((obs) => obs.disconnect());
	}, []);

	const scrollToSection = (id) => {
		document.getElementById(id)?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	};

	// Separate fetch functions

	const fetchVehicles = (page = 1) => {
		setVehiclesLoading(true);
		setVehiclesError(null);
		propertyService
			.getVehicles({ status: 'available', page, page_size: PAGE_SIZE, ordering: '-created_at' })
			.then((response) => {
				console.log('Vehicles:', response.data.results);
				if (response.success) {
					setVehicles(response.data.results || []);
					setVehiclesTotalCount(response.data.count || 0);
				} else {
					setVehiclesError(response.message || 'Failed to load vehicles');
					setVehicles([]);
				}
			})
			.catch(() => {
				console.error('Failed to load vehicles');
				setVehiclesError('Failed to load vehicles');
				setVehicles([]);
			})
			.finally(() => setVehiclesLoading(false));
	};

	const fetchRealEstate = (page = 1) => {
		setRealEstateLoading(true);
		setRealEstateError(null);
		propertyService
			.getRealEstate({ status: 'available', page, page_size: PAGE_SIZE, ordering: '-created_at' })
			.then((response) => {
				console.log('Real Estate:', response.data.results);
				if (response.success) {
					setRealEstate(response.data.results || []);
					setRealEstateTotalCount(response.data.count || 0);
				} else {
					setRealEstateError(response.message || 'Failed to load real estate');
					setRealEstate([]);
				}
			})
			.catch(() => {
				console.error('Failed to load real estate');
				setRealEstateError('Failed to load real estate');
				setRealEstate([]);
			})
			.finally(() => setRealEstateLoading(false));
	};

	const handleVehiclesPageChange = (page) => {
		if (page >= 1 && page <= vehiclesTotalPages) {
			setVehiclesCurrentPage(page);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const handleRealEstatePageChange = (page) => {
		if (page >= 1 && page <= realEstateTotalPages) {
			setRealEstateCurrentPage(page);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	// Fetch vehicles (property_type=vehicle) on mount and when page changes
	useEffect(() => {
		fetchVehicles(vehiclesCurrentPage);
	}, [vehiclesCurrentPage]);

	// Fetch properties (property_type=real_estate) on mount and when page changes
	useEffect(() => {
		fetchRealEstate(realEstateCurrentPage);
	}, [realEstateCurrentPage]);

	// Show skeleton on initial load
	if (vehiclesLoading && vehicles.length === 0 && realEstateLoading && realEstate.length === 0) {
		return (
			<ProductListingPageSkeleton
				showHero={true}
				showCarousel={false}
				showProductGrid={true}
				productColumns={3}
				productRows={2}
				variant="light"
			/>
		);
	}

	return (
		<>
			<main className="mb-4 flex flex-col lg:mb-8">
				<PageHeroSection
					pageSlug="properties-for-sale"
					brandColor="#396131"
					brandGradient="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
					showLearnMoreButton={true}
					learnMoreText="Explore Listings"
				/>
				<section id="vehicles" className="max-mx-7xl mx-auto px-4 flex flex-col text-[#396131]">
					<div className="mt-16 text-center">
						<h2 className="mb-4 text-4xl font-bold text-[#396131] md:text-5xl lg:text-6xl">
							Vehicles
						</h2>
						<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#396131] to-[#396131]/80"></div>
						<p className="mx-auto mt-6 max-w-2xl text-lg text-[#396131]/80">
							Discover a selection of quality pre-owned vehicles at affordable prices, available
							exclusively from 1st Valley Bank.
						</p>
					</div>
					<div className="h-8 lg:h-12" />
					{vehiclesLoading && vehicles.length === 0 ? (
						<CardGridSkeleton
							columns={3}
							rows={2}
							variant="light"
							showImage={true}
							showButton={false}
						/>
					) : vehiclesError ? (
						<div className="text-center text-red-600">{vehiclesError}</div>
					) : (
						<>
							{/* Results Count */}
							{!vehiclesLoading && (
								<div className="mb-4 text-sm text-[#396131]/70">
									Showing {vehicles.length > 0 ? (vehiclesCurrentPage - 1) * PAGE_SIZE + 1 : 0} to{' '}
									{Math.min(vehiclesCurrentPage * PAGE_SIZE, vehiclesTotalCount)} of{' '}
									{vehiclesTotalCount} vehicles
								</div>
							)}
							<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
								{vehicles.length === 0 ? (
									<div className="col-span-full text-center text-[#396131] opacity-60">
										No vehicles available.
									</div>
								) : (
									vehicles.map((vehicle, index) => (
										<VehicleCard key={vehicle.id || index} vehicle={vehicle} />
									))
								)}
							</div>

							{/* Pagination */}
							{vehiclesTotalPages > 1 && (
								<div className="mt-12 flex flex-col items-center gap-4">
									<div className="flex items-center gap-2">
										<button
											className="group inline-flex transform cursor-pointer items-center rounded-xl border border-[#396131]/60 bg-white px-4 py-2 text-sm font-semibold text-[#396131] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
											onClick={() => handleVehiclesPageChange(vehiclesCurrentPage - 1)}
											disabled={vehiclesCurrentPage === 1}
										>
											<ChevronLeft size={18} className="mr-1" />
											<span className="text-sm font-bold">Previous</span>
										</button>
										{Array.from({ length: vehiclesTotalPages }, (_, idx) => {
											const page = idx + 1;
											// Show first page, last page, current page, and pages around current
											if (
												page === 1 ||
												page === vehiclesTotalPages ||
												(page >= vehiclesCurrentPage - 1 && page <= vehiclesCurrentPage + 1)
											) {
												return (
													<button
														key={page}
														className={`group inline-flex transform cursor-pointer items-center rounded-xl px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
															vehiclesCurrentPage === page
																? 'bg-[#396131] text-white'
																: 'border border-[#396131]/30 bg-white text-[#396131]'
														}`}
														onClick={() => handleVehiclesPageChange(page)}
													>
														<span className="text-sm font-bold">{page}</span>
													</button>
												);
											} else if (
												page === vehiclesCurrentPage - 2 ||
												page === vehiclesCurrentPage + 2
											) {
												return (
													<span key={page} className="px-2 text-[#396131]/50">
														...
													</span>
												);
											}
											return null;
										})}
										<button
											className="group inline-flex transform cursor-pointer items-center rounded-xl border border-[#396131]/60 bg-white px-4 py-2 text-sm font-semibold text-[#396131] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
											onClick={() => handleVehiclesPageChange(vehiclesCurrentPage + 1)}
											disabled={vehiclesCurrentPage === vehiclesTotalPages}
										>
											<span className="text-sm font-bold">Next</span>
											<ChevronRight size={18} className="ml-1" />
										</button>
									</div>
									<div className="text-xs leading-relaxed font-normal text-[#396131]/80">
										Page {vehiclesCurrentPage} of {vehiclesTotalPages}
									</div>
								</div>
							)}
						</>
					)}
					<div className="h-8 lg:h-12" />
					<NavLink
						to="/properties-for-sale/vehicles"
						className="group inline-flex transform items-center justify-center rounded-xl bg-[#396131] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						style={{ letterSpacing: '0.01em' }}
					>
						<span className="flex w-full items-center justify-center gap-2 text-center">
							<Eye
								size={20}
								className="opacity-80 transition-transform duration-300 group-hover:scale-110"
							/>
							<span className="text-center tracking-tight">View All Vehicles</span>
						</span>
					</NavLink>
					<div className="h-8 lg:h-12" />
				</section>
				<section id="properties" className="mx-auto px-4 flex max-w-7xl flex-col text-[#396131]">
					<div className="mt-16 text-center">
						<h2 className="mb-4 text-4xl font-bold text-[#396131] md:text-5xl lg:text-6xl">
							Real Estate & Properties
						</h2>
						<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#396131] to-[#396131]/80"></div>
						<p className="mx-auto mt-6 max-w-2xl text-lg text-[#396131]/80">
							Explore our assortment of prime real estate, residential, commercial, and foreclosed
							properties for sale, opportunities offered only by 1st Valley Bank.
						</p>
					</div>
					<div className="h-8 lg:h-12" />
					{realEstateLoading && realEstate.length === 0 ? (
						<CardGridSkeleton
							columns={3}
							rows={2}
							variant="light"
							showImage={true}
							showButton={false}
						/>
					) : realEstateError ? (
						<div className="text-center text-red-600">{realEstateError}</div>
					) : (
						<>
							{/* Results Count */}
							{!realEstateLoading && (
								<div className="mb-4 text-sm text-[#396131]/70">
									Showing {realEstate.length > 0 ? (realEstateCurrentPage - 1) * PAGE_SIZE + 1 : 0}{' '}
									to {Math.min(realEstateCurrentPage * PAGE_SIZE, realEstateTotalCount)} of{' '}
									{realEstateTotalCount} properties
								</div>
							)}
							<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
								{realEstate.length === 0 ? (
									<div className="col-span-full text-center text-[#396131] opacity-60">
										No real estate available.
									</div>
								) : (
									realEstate.map((property, index) => (
										<PropertyCard key={property.id || index} property={property} />
									))
								)}
							</div>

							{/* Pagination */}
							{realEstateTotalPages > 1 && (
								<div className="mt-12 flex flex-col items-center gap-4">
									<div className="flex items-center gap-2">
										<button
											className="group inline-flex transform cursor-pointer items-center rounded-xl border border-[#396131]/60 bg-white px-4 py-2 text-sm font-semibold text-[#396131] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
											onClick={() => handleRealEstatePageChange(realEstateCurrentPage - 1)}
											disabled={realEstateCurrentPage === 1}
										>
											<ChevronLeft size={18} className="mr-1" />
											<span className="text-sm font-bold">Previous</span>
										</button>
										{Array.from({ length: realEstateTotalPages }, (_, idx) => {
											const page = idx + 1;
											// Show first page, last page, current page, and pages around current
											if (
												page === 1 ||
												page === realEstateTotalPages ||
												(page >= realEstateCurrentPage - 1 && page <= realEstateCurrentPage + 1)
											) {
												return (
													<button
														key={page}
														className={`group inline-flex transform cursor-pointer items-center rounded-xl px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
															realEstateCurrentPage === page
																? 'bg-[#396131] text-white'
																: 'border border-[#396131]/30 bg-white text-[#396131]'
														}`}
														onClick={() => handleRealEstatePageChange(page)}
													>
														<span className="text-sm font-bold">{page}</span>
													</button>
												);
											} else if (
												page === realEstateCurrentPage - 2 ||
												page === realEstateCurrentPage + 2
											) {
												return (
													<span key={page} className="px-2 text-[#396131]/50">
														...
													</span>
												);
											}
											return null;
										})}
										<button
											className="group inline-flex transform cursor-pointer items-center rounded-xl border border-[#396131]/60 bg-white px-4 py-2 text-sm font-semibold text-[#396131] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
											onClick={() => handleRealEstatePageChange(realEstateCurrentPage + 1)}
											disabled={realEstateCurrentPage === realEstateTotalPages}
										>
											<span className="text-sm font-bold">Next</span>
											<ChevronRight size={18} className="ml-1" />
										</button>
									</div>
									<div className="text-xs leading-relaxed font-normal text-[#396131]/80">
										Page {realEstateCurrentPage} of {realEstateTotalPages}
									</div>
								</div>
							)}
						</>
					)}
					<div className="h-8 lg:h-12" />
					<NavLink
						to="/properties-for-sale/real-estate-and-other-properties-acquired-for-sale"
						className="group inline-flex transform items-center justify-center rounded-xl bg-[#396131] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						style={{ letterSpacing: '0.01em' }}
					>
						<span className="flex w-full items-center justify-center gap-2 text-center">
							<Eye size={18} className="transition-transform duration-300 group-hover:scale-110" />
							<span className="text-center">View All Properties</span>
						</span>
					</NavLink>
				</section>
			</main>
		</>
	);
}
