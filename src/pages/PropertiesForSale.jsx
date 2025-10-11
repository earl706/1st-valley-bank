import React, { useEffect, useState } from 'react';
import img1 from '/src/assets/properties-for-sale/1.jpeg';
import img2 from '/src/assets/properties-for-sale/2.jpeg';
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

export default function PropertiesForSale() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');

	const sampleVehicles = [
		{
			image: img1,
			additionalImages: [img1, img1, img1],
			location: 'Bacolod, Lanao Del Norte',
			year: 2017,
			plateNumber: 'JDO5067',
			price: 180000.0
		},
		{
			image: img1,
			additionalImages: [img1, img1, img1],
			location: 'Bacolod, Lanao Del Norte',
			year: 2017,
			plateNumber: 'JDO5067',
			price: 180000.0
		},
		{
			image: img1,
			additionalImages: [img1, img1, img1],
			location: 'Bacolod, Lanao Del Norte',
			year: 2017,
			plateNumber: 'JDO5067',
			price: 180000.0
		},
		{
			image: img1,
			additionalImages: [img1, img1, img1],
			location: 'Bacolod, Lanao Del Norte',
			year: 2017,
			plateNumber: 'JDO5067',
			price: 180000.0
		},
		{
			image: img1,
			additionalImages: [img1, img1, img1],
			location: 'Bacolod, Lanao Del Norte',
			year: 2017,
			plateNumber: 'JDO5067',
			price: 180000.0
		},
		{
			image: img1,
			additionalImages: [img1, img1, img1],
			location: 'Bacolod, Lanao Del Norte',
			year: 2017,
			plateNumber: 'JDO5067',
			price: 180000.0
		}
	];

	const sampleProperties = [
		{
			image: img2,
			additionalImages: [img2, img2, img2],
			location: 'Residential Land, Napoloan Pagadian City, Zamboanga del Sur',
			date: '2018-12-4',
			number: 'TCT#1372020004737 / TCT#1372020004738',
			price: 1950000.0,
			area: 1262,
			propertyCode: 'K05-03'
		},
		{
			image: img2,
			additionalImages: [img2, img2, img2],
			location: 'Residential Land, Napoloan Pagadian City, Zamboanga del Sur',
			date: '2018-12-4',
			number: 'TCT#1372020004737 / TCT#1372020004738',
			price: 1950000.0,
			area: 1262,
			propertyCode: 'K05-03'
		},
		{
			image: img2,
			additionalImages: [img2, img2, img2],
			location: 'Residential Land, Napoloan Pagadian City, Zamboanga del Sur',
			date: '2018-12-4',
			number: 'TCT#1372020004737 / TCT#1372020004738',
			price: 1950000.0,
			area: 1262,
			propertyCode: 'K05-03'
		},
		{
			image: img2,
			additionalImages: [img2, img2, img2],
			location: 'Residential Land, Napoloan Pagadian City, Zamboanga del Sur',
			date: '2018-12-4',
			number: 'TCT#1372020004737 / TCT#1372020004738',
			price: 1950000.0,
			area: 1262,
			propertyCode: 'K05-03'
		},
		{
			image: img2,
			additionalImages: [img2, img2, img2],
			location: 'Residential Land, Napoloan Pagadian City, Zamboanga del Sur',
			date: '2018-12-4',
			number: 'TCT#1372020004737 / TCT#1372020004738',
			price: 1950000.0,
			area: 1262,
			propertyCode: 'K05-03'
		},
		{
			image: img2,
			additionalImages: [img2, img2, img2],
			location: 'Residential Land, Napoloan Pagadian City, Zamboanga del Sur',
			date: '2018-12-4',
			number: 'TCT#1372020004737 / TCT#1372020004738',
			price: 1950000.0,
			area: 1262,
			propertyCode: 'K05-03'
		}
	];

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
							image: img, // Replace with actual image path if available
							imageAlt: 'Vehicles for Sale',
							route: '/properties-for-sale/vehicles',
							buttonText: 'See Vehicles'
						},
						{
							title: 'Properties for Sale',
							subtitle: 'Featured listings for sale',
							description:
								'Explore affordable real estate, vehicles, and more from 1st Valley Bank. Find your next opportunity today!',
							image: img, // Replace with actual image path if available
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
					{/* Add vertical spacing between hero and grid */}
					<div className="h-8 lg:h-12" />
					<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
						{sampleVehicles.map((vehicle, index) => (
							<VehicleCard key={index} vehicle={vehicle} />
						))}
					</div>
					{/* Add vertical spacing before the button */}
					<div className="h-8 lg:h-12" />
					<NavLink
						to="/properties-for-sale/vehicles"
						className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#396131] px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#4a7a3f] hover:shadow-lg focus:ring-2 focus:ring-[#396131]/40 focus:outline-none"
						style={{ letterSpacing: '0.01em' }}
					>
						<Eye
							size={20}
							className="opacity-80 transition-transform duration-200 group-hover:scale-110"
						/>
						<span className="tracking-tight">See More</span>
					</NavLink>
					{/* Add bottom spacing after the section */}
					<div className="h-8 lg:h-12" />
				</section>
				<section
					id="properties"
					className="mx-[20px] flex flex-col gap-[30px] text-[#396131] lg:mx-[80px] lg:gap-[70px]"
				>
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

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{sampleProperties.map((property, index) => (
							<PropertyCard key={index} property={property} />
						))}
					</div>
					<NavLink
						to="/properties-for-sale/real-estate-and-other-properties-acquired-for-sale"
						className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#396131] px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#4a7a3f] hover:shadow-lg focus:ring-2 focus:ring-[#396131]/40 focus:outline-none"
						style={{ letterSpacing: '0.01em' }}
					>
						<Eye size={18} className="transition-transform duration-200 group-hover:scale-110" />
						See More
					</NavLink>
				</section>
			</main>
		</>
	);
}
