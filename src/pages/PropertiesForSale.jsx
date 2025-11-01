import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, Hash, Eye, Heart, Share2, Home, Ruler } from 'lucide-react';
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
import CarouselSection from '../components/CarouselSection';
import img from '/src/assets/homepage/heroSectionImage.png';

// Import propertyService
import propertyService from '../services/propertyService';

export default function PropertiesForSale() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');

	// State for fetched property data
	const [vehicles, setVehicles] = useState([]);
	const [vehiclesLoading, setVehiclesLoading] = useState(true);
	const [vehiclesError, setVehiclesError] = useState(null);

	const [realEstate, setRealEstate] = useState([]);
	const [realEstateLoading, setRealEstateLoading] = useState(true);
	const [realEstateError, setRealEstateError] = useState(null);

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

	const fetchVehicles = () => {
		setVehiclesLoading(true);
		setVehiclesError(null);
		propertyService
			.getVehicles({ status: 'available', page: 1, page_size: 6 })
			.then((response) => {
				console.log('Vehicles:', response.data.results);
				if (response.success) {
					setVehicles(response.data.results || []);
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

	const fetchRealEstate = () => {
		setRealEstateLoading(true);
		setRealEstateError(null);
		propertyService
			.getRealEstate({ status: 'available', page: 1, page_size: 6 })
			.then((response) => {
				console.log('Real Estate:', response.data.results);
				if (response.success) {
					setRealEstate(response.data.results || []);
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

	// Fetch vehicles (property_type=vehicle) on mount
	useEffect(() => {
		fetchVehicles();
	}, []);

	// Fetch properties (property_type=real_estate) on mount
	useEffect(() => {
		fetchRealEstate();
	}, []);

	return (
		<>
			<main className="mb-4 flex flex-col lg:mb-8">
				<CarouselSection
					id="properties-for-sale-carousel"
					slides={[
						{
							title: 'Vehicles',
							subtitle: 'Great deals on wheels',
							description:
								'Browse quality pre-owned vehicles at affordable prices from 1st Valley Bank. Find your next car today!',
							image: img,
							imageAlt: 'Vehicles for Sale',
							route: '/properties-for-sale/vehicles',
							buttonText: 'See Vehicles'
						},
						{
							title: 'Properties for Sale',
							subtitle: 'Featured listings for sale',
							description:
								'Explore affordable real estate, vehicles, and more from 1st Valley Bank. Find your next opportunity today!',
							image: img,
							imageAlt: 'Properties for Sale',
							route: '/properties-for-sale/real-estate-and-other-properties-acquired-for-sale',
							buttonText: 'See Properties'
						}
					]}
					autoPlay={true}
					autoPlayInterval={7000}
					backgroundColor="from-green-50 via-white to-emerald-50"
					brandColor="#396131"
					brandGradient="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
					showLearnMoreButton={true}
					learnMoreText="Explore Listings"
				/>
				<section id="vehicles" className="max-mx-7xl mx-auto flex flex-col text-[#396131]">
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
					{vehiclesLoading ? (
						<div className="text-center text-[#396131] opacity-80">Loading vehicles...</div>
					) : vehiclesError ? (
						<div className="text-center text-red-600">{vehiclesError}</div>
					) : (
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
							<span className="text-center tracking-tight">See More</span>
						</span>
					</NavLink>
					<div className="h-8 lg:h-12" />
				</section>
				<section id="properties" className="mx-auto flex max-w-7xl flex-col text-[#396131]">
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
					{realEstateLoading ? (
						<div className="text-center text-[#396131] opacity-80">Loading real estate...</div>
					) : realEstateError ? (
						<div className="text-center text-red-600">{realEstateError}</div>
					) : (
						<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
							{realEstate.length === 0 ? (
								<div className="col-span-full text-center text-[#396131] opacity-60">
									No real estate available.
								</div>
							) : (
								realEstate.map((property, index) => (
									<PropertyCard key={realEstate.id || index} property={property} />
								))
							)}
						</div>
					)}
					<div className="h-8 lg:h-12" />
					<NavLink
						to="/properties-for-sale/real-estate-and-other-properties-acquired-for-sale"
						className="group inline-flex transform items-center justify-center rounded-xl bg-[#396131] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						style={{ letterSpacing: '0.01em' }}
					>
						<span className="flex w-full items-center justify-center gap-2 text-center">
							<Eye size={18} className="transition-transform duration-300 group-hover:scale-110" />
							<span className="text-center">See More</span>
						</span>
					</NavLink>
				</section>
			</main>
		</>
	);
}
