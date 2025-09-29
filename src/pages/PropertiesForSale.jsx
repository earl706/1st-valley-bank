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
					<div className={`relative overflow-hidden bg-gradient-to-br`}>
						{/* Hero Content */}
						<div className="max-w-8xl relative mx-auto px-2 py-4 sm:px-3 lg:px-4 lg:py-8">
							<div className="mx-2 grid min-h-[340px] items-center gap-4 lg:mx-4 lg:min-h-[400px] lg:grid-cols-2">
								{/* Image/Visual */}
								<div className="relative order-0 flex h-full items-center justify-center lg:order-0">
									<div className="relative z-10">
										<img
											src={img}
											alt={'Vehicles'}
											className="mx-auto h-auto w-full max-w-xs transform drop-shadow-2xl transition-all duration-700"
										/>
									</div>
								</div>

								{/* Content */}
								<div className="order-1 flex h-full flex-col justify-center space-y-4 lg:order-1">
									<div className="space-y-2">
										{/* Title */}
										<h1 className="text-2xl leading-tight font-bold text-[#396131] sm:text-3xl lg:text-4xl">
											<span
												className={`font-blacksm:text-4xl block text-3xl leading-tight lg:text-5xl`}
											>
												Vehicles
											</span>
											<span
												className={`block text-lg leading-tight font-bold sm:text-xl lg:text-2xl`}
											>
												Looking for great deals on wheels?
											</span>
										</h1>

										<p className="max-w-xl text-base leading-relaxed text-gray-600">
											Find quality pre-owned vehicles at great prices with 1st Valley Bank. Explore
											our listings and drive home your next car today!
										</p>
									</div>
								</div>
							</div>
						</div>
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
					<div className={`relative overflow-hidden bg-gradient-to-br`}>
						{/* Hero Content */}
						<div className="max-w-8xl relative mx-auto px-2 py-4 sm:px-3 lg:px-4 lg:py-8">
							<div className="mx-2 grid min-h-[340px] items-center gap-4 lg:mx-4 lg:min-h-[400px] lg:grid-cols-2">
								{/* Image/Visual */}
								<div className="relative order-0 flex h-full items-center justify-center lg:order-1">
									<div className="relative z-10">
										<img
											src={img}
											alt={'Vehicles'}
											className="mx-auto h-auto w-full max-w-xs transform drop-shadow-2xl transition-all duration-700"
										/>
									</div>
								</div>

								{/* Content */}
								<div className="order-1 flex h-full flex-col justify-center space-y-4 lg:order-0">
									<div className="space-y-2">
										{/* Title */}
										<h1 className="text-2xl leading-tight font-bold text-[#396131] sm:text-3xl lg:text-4xl">
											<span
												className={`font-blacksm:text-4xl block text-3xl leading-tight lg:text-5xl`}
											>
												Real Estate & Others
											</span>
											<span
												className={`block text-lg leading-tight font-bold sm:text-xl lg:text-2xl`}
											>
												Find your next property investment today!
											</span>
										</h1>

										<p className="max-w-xl text-base leading-relaxed text-gray-600">
											Discover great-value real estate and properties for sale at 1st Valley Bank.
											Find your ideal lot, home, or space—affordable, trusted, and ready for you!
										</p>
									</div>
								</div>
							</div>
						</div>
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
