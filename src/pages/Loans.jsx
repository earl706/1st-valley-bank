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

import img1 from '/src/assets/homepage/1.png';
import img2 from '/src/assets/homepage/2.png';
import img3 from '/src/assets/homepage/3.png';
import img4 from '/src/assets/homepage/4.png';
import img5 from '/src/assets/homepage/5.png';
import img6 from '/src/assets/homepage/6.png';
import img from '/src/assets/homepage/heroSectionImage.png';

export default function Loans() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');

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

	return (
		<>
			<main className="flex flex-col">
				{/* Loans Carousel Hero Section */}
				<CarouselSection
					id="main"
					slides={loanSlides}
					autoPlay={true}
					autoPlayInterval={5000}
					backgroundColor="from-slate-50 via-white to-green-50"
					brandColor="#396131"
					brandGradient="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
					minHeight="min-h-[560px] lg:min-h-[640px]"
					showLearnMoreButton={true}
					learnMoreText="Learn More"
					excludeLearnMoreForTitles={['Loans']}
				/>
				<section id="loans" className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-24">
					<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						{/* Section Header */}
						<div className="mb-16 text-center">
							<h2 className="mb-4 text-5xl leading-tight font-bold text-white md:text-5xl lg:text-5xl">
								LOANS
							</h2>
							<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-white/80 to-[#a8ffc2]"></div>
							<p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed font-normal text-white/90">
								Discover our comprehensive loan solutions designed to meet your financial needs
							</p>
						</div>

						{/* Loans Grid */}
						<div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3 lg:gap-12">
							{loanSlides.map((loan, index) =>
								loan.title == 'Loans' ? (
									''
								) : (
									<div
										key={index}
										className="group relative flex h-full transform flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/90 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
									>
										<div className="relative flex flex-1 flex-col p-8 lg:p-10">
											<div className="flex flex-1 flex-col items-center gap-6 sm:items-start lg:gap-8">
												{/* Improved Image Container */}
												<div className="relative mb-4">
													{/* Main image container */}
													<div className="relative h-full w-full overflow-hidden transition-all duration-300 group-hover:scale-105">
														<img
															src={loan.image}
															alt={loan.title}
															className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
														/>
													</div>
												</div>

												{/* Content */}
												<div className="flex h-full flex-1 flex-col text-center sm:text-left">
													<h3 className="mb-3 text-2xl leading-tight font-bold text-[#396131] transition-colors duration-300 group-hover:text-[#4a7a3f]">
														{loan.title}
													</h3>
													<p className="mb-6 flex-1 text-base leading-relaxed font-normal text-[#2e4935]">
														{loan.description}
													</p>

													{/* CTA Button */}
													<div className="mt-auto">
														<NavLink
															to={loan.route}
															className="group inline-flex w-full transform items-center justify-center rounded-xl bg-[#396131] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
														>
															<span className="text-center">Learn More</span>
															<span className="ml-3 flex items-center justify-center">
																<ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
															</span>
														</NavLink>
													</div>
												</div>
											</div>
										</div>
									</div>
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
