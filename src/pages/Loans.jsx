import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
	ArrowRight,
	Landmark,
	Wheat,
	Gem,
	HandCoins,
	DollarSign,
	BriefcaseBusiness,
	Building2,
	Sprout
} from 'lucide-react';
import CarouselSection from '../components/CarouselSection';
import PageHeroSection from '../components/PageHeroSection';
import { DarkCard } from '../components/Card';
import { DarkPrimaryButton, LightPrimaryButton } from '../components/Buttons';
import { DarkHeader } from '../components/Header';
import { ProductListingPageSkeleton } from '../components/PageSkeleton';
import img from '/src/assets/homepage/heroSectionImage.png';

export default function Loans() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');
	const [loading, setLoading] = useState(true);

	// Simulate loading for static content
	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 300);
		return () => clearTimeout(timer);
	}, []);

	// Carousel data for loans
	const loanSlides = [
		{
			title: 'Salary Loans',
			subtitle: 'Cash when you need it',
			description: 'Quick, low-rate cash before payday.',
			features: [],
			image: img,
			imageAlt: 'Salary Loans',
			route: '/loans/salary'
		},
		{
			title: 'Small Business Loan',
			subtitle: 'Fuel your business growth',
			description: 'Simple loans to grow or fund your business.',
			features: [],
			image: img,
			imageAlt: 'Small Business Loan',
			route: '/loans/small-business-loan'
		},
		{
			title: 'Small and Medium Enterprise',
			subtitle: 'Scale your enterprise',
			description: 'Flexible financing for SMEs to expand.',
			features: [],
			image: img,
			imageAlt: 'SME Loans',
			route: '/loans/small-and-medium-enterprises'
		},
		{
			title: 'Gold and Gems & Jewelry Business Loan',
			subtitle: 'Turn assets into instant cash',
			description: 'Hassle-free loans using your assets.',
			features: [],
			image: img,
			imageAlt: 'Gold and Gems Loans',
			route: '/loans/gold-and-gems'
		},
		{
			title: 'Supervised Credit or Crop Production Loan',
			subtitle: 'Supervised credit for success',
			description: 'Agri loans with support, funds, and guidance.',
			features: [],
			image: img,
			imageAlt: 'Supervised Credit Loans',
			route: '/loans/supervised-credit'
		},
		{
			title: 'Agricultural Loans',
			subtitle: 'Sow success with smart financing',
			description: 'Fast funds to help your farm grow.',
			features: [],
			image: img,
			imageAlt: 'Agricultural Loans',
			route: '/loans/agriculture'
		},
		{
			title: 'Microfinance',
			subtitle: 'Start small, dream big',
			description: 'Quick micro loans for small businesses.',
			features: [],
			image: img,
			imageAlt: 'Microfinance Loans',
			route: '/loans/microfinance'
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

	// Show skeleton on initial load
	if (loading) {
		return (
			<ProductListingPageSkeleton
				showHero={true}
				showCarousel={false}
				showProductGrid={true}
				productColumns={3}
				productRows={3}
				variant="dark"
			/>
		);
	}

	return (
		<>
			<main className="flex flex-col">
				{/* Loans Carousel Hero Section */}
				<PageHeroSection
					pageSlug="loans"
					brandColor="#396131"
					brandGradient="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
					minHeight="min-h-[560px] lg:min-h-[640px]"
					showLearnMoreButton={true}
					learnMoreText="Learn More"
				/>
				<section id="loans" className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-24">
					<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						{/* Section Header */}
						<DarkHeader
							badgeText="Products"
							title="LOANS"
							subtitle="Discover our comprehensive loan solutions designed to meet your financial needs"
							alignment="center"
							level={2}
							className="mb-16"
						/>

						{/* Loans Grid */}
						<div className="grid grid-cols-1 items-stretch gap-2 lg:grid-cols-3 lg:gap-4">
							{loanSlides.map((loan, index) =>
								loan.title != 'Loans' ? (
									<DarkCard
										key={index}
										useNativeSpacing={true}
										className="group flex h-full flex-col overflow-hidden p-0 bg-white"
									>
										<div className="flex flex-1 flex-col items-center gap-6 p-8 sm:items-start lg:gap-8 lg:p-10">
											{/* Image Container */}
											<div className="relative mb-4 w-full">
												<div className="relative w-full overflow-hidden transition-all duration-300 group-hover:scale-105">
													<img
														src={loan.image}
														alt={loan.title}
														className="h-auto w-full rounded-xl object-cover transition-all duration-500 group-hover:scale-105"
													/>
												</div>
											</div>

											{/* Content */}
											<div className="flex h-full w-full flex-1 flex-col text-center sm:text-left">
												<h3 className="mb-3 text-2xl leading-tight font-bold text-[#396131] transition-colors duration-300 group-hover:text-[#4a7c3a]">
													{loan.title}
												</h3>
												<p className="mb-6 flex-1 text-base leading-relaxed font-normal text-[#396131]/80">
													{loan.description}
												</p>
												<div className="mt-auto">
													<LightPrimaryButton
														to={loan.route}	
														className="w-full"
														secondaryIcon={
															<ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
														}
													>
														Learn More
													</LightPrimaryButton>
												</div>
											</div>
										</div>
									</DarkCard>
								) : (
									''
								)
							)}
						</div>
					</div>
				</section>

				{/* Loan Services Section */}
				<section id="loan-services" className="py-20">
					<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						{/* Section Header */}
						<div className="mb-16">
							<div className="mb-6 flex items-center gap-4">
								<div className="h-1 w-16 rounded-full bg-[#396131]"></div>
								<h2 className="text-3xl leading-tight font-bold text-gray-900 md:text-3xl">
									Loan Services
								</h2>
							</div>
						</div>

						{/* Services Grid */}
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							{/* Legal Policy for Loans */}
							<div className="group relative transform overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
								<div className="mb-6">
									<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 transition-colors duration-300 group-hover:bg-[#396131]/10">
										<Building2 className="h-8 w-8 text-gray-600 transition-colors duration-300 group-hover:text-[#396131]" />
									</div>
									<div className="mb-2 text-sm font-normal text-gray-500">Policy</div>
									<h3 className="mb-4 text-2xl leading-tight font-bold text-gray-900">
										Legal Policy for Loans
									</h3>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex-1"></div>
									<NavLink
										to="/contact-us"
										className="group/btn inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 hover:bg-[#396131]"
									>
										<ArrowRight className="h-5 w-5 text-gray-600 transition-colors duration-300 group-hover/btn:text-white" />
									</NavLink>
								</div>
							</div>

							{/* After Sales Service */}
							<div className="group relative transform overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
								<div className="mb-6">
									<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 transition-colors duration-300 group-hover:bg-[#396131]/10">
										<Sprout className="h-8 w-8 text-gray-600 transition-colors duration-300 group-hover:text-[#396131]" />
									</div>
									<div className="mb-2 text-sm font-normal text-gray-500">Auto Loan</div>
									<h3 className="mb-4 text-2xl leading-tight font-bold text-gray-900">
										After Sales Service
									</h3>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex-1"></div>
									<NavLink
										to="/contact-us"
										className="group/btn inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 hover:bg-[#396131]"
									>
										<ArrowRight className="h-5 w-5 text-gray-600 transition-colors duration-300 group-hover/btn:text-white" />
									</NavLink>
								</div>
							</div>

							{/* Payment Solutions */}
							<div className="group relative transform overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
								<div className="mb-6">
									<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 transition-colors duration-300 group-hover:bg-[#396131]/10">
										<DollarSign className="h-8 w-8 text-gray-600 transition-colors duration-300 group-hover:text-[#396131]" />
									</div>
									<div className="mb-2 text-sm font-normal text-gray-500">Housing Loan</div>
									<h3 className="mb-4 text-2xl leading-tight font-bold text-gray-900">
										Payment Solutions
									</h3>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex-1"></div>
									<NavLink
										to="/contact-us"
										className="group/btn inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 hover:bg-[#396131]"
									>
										<ArrowRight className="h-5 w-5 text-gray-600 transition-colors duration-300 group-hover/btn:text-white" />
									</NavLink>
								</div>
							</div>
						</div>

						{/* Additional Information */}
						<div className="mt-16 text-center">
							<p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed font-normal text-gray-600">
								Our comprehensive loan services extend beyond just lending. We provide complete
								support throughout your loan journey with professional guidance and flexible
								solutions.
							</p>
							<NavLink
								to="/contact-us"
								className="group inline-flex items-center justify-center rounded-xl bg-[#396131] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1"
							>
								<span className="text-center">Get Professional Advice</span>
								<span className="ml-2 flex items-center justify-center">
									<ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
								</span>
							</NavLink>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
