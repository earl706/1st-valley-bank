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
			title: 'Loans',
			subtitle: 'Fuel your dreams with smart financing',
			description:
				"Whether you're growing a business, investing in agriculture, or managing daily needs, our flexible loan options come with competitive rates and easy terms. Experience fast approval, personalized support, and financial solutions designed to help you succeed.",
			features: [],
			image: img,
			imageAlt: 'Loans Overview',
			route: '/loans'
		},
		{
			title: 'Salary Loans',
			subtitle: 'Cash when you need it',
			description:
				'Need cash before payday? Get quick approval, low rates, and flexible terms with our convenient salary loans.',
			features: [],
			image: img,
			imageAlt: 'Salary Loans',
			route: '/loans/salary'
		},
		{
			title: 'Small Business Loan',
			subtitle: 'Fuel your business growth',
			description:
				'Easy-access loans to upgrade, expand, or boost working capital. Take your business to the next level hassle-free.',
			features: [],
			image: img,
			imageAlt: 'Small Business Loan',
			route: '/loans/small-business-loan'
		},
		{
			title: 'Small and Medium Enterprise',
			subtitle: 'Scale your enterprise',
			description:
				'Take your SME to the next level with flexible financing, competitive rates, and support designed for business success.',
			features: [],
			image: img,
			imageAlt: 'SME Loans',
			route: '/loans/small-and-medium-enterprises'
		},
		{
			title: 'Gold and Gems & Jewelry Business Loan',
			subtitle: 'Turn assets into instant cash',
			description:
				'Secure, hassle-free loans with low rates to meet your urgent financial needs. Your valuable assets can work for you.',
			features: [],
			image: img,
			imageAlt: 'Gold and Gems Loans',
			route: '/loans/gold-and-gems'
		},
		{
			title: 'Supervised Credit or Crop Production Loan',
			subtitle: 'Supervised credit for success',
			description:
				'Grow your farm smarter! Agri loans with funds, technical help, and flexible repayment to boost your harvest and income.',
			features: [],
			image: img,
			imageAlt: 'Supervised Credit Loans',
			route: '/loans/supervised-credit'
		},
		{
			title: 'Agricultural Loans',
			subtitle: 'Sow success with smart financing',
			description:
				'Fast funds, low rates, and support to help your farm thrive! Get the financing you need to grow your agricultural business.',
			features: [],
			image: img,
			imageAlt: 'Agricultural Loans',
			route: '/loans/agriculture'
		},
		{
			title: 'Microfinance',
			subtitle: 'Start small, dream big',
			description:
				'Get fast, affordable microfinance loans to jumpstart and grow your small business with confidence and support.',
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
				<section id="loans" className="">
					<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						{/* Section Header */}
						<div className="mb-16 text-center">
							<h2 className="mb-4 text-4xl font-bold text-[#396131] md:text-5xl lg:text-6xl">
								LOANS
							</h2>
							<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#396131] to-[#4a7a3f]"></div>
							<p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
								Discover our comprehensive loan solutions designed to meet your financial needs
							</p>
						</div>

						{/* Loans Grid */}
						<div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
							{loanSlides.map((loan, index) =>
								loan.title == 'Loans' ? (
									''
								) : (
									<div
										key={index}
										className="group relative flex h-full transform flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
									>
										{/* Card gradient overlay */}
										<div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#396131]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

										<div className="relative flex flex-1 flex-col p-8 lg:p-10">
											<div className="flex flex-1 flex-col items-center gap-6 sm:flex-row sm:items-start lg:gap-8">
												{/* Improved Image Container */}
												<div className="relative mb-8">
													{/* Background decorative element */}

													{/* Main image container */}
													<div className="relative mx-auto h-40 w-40 overflow-hidden transition-all duration-300 group-hover:scale-105">
														<img
															src={loan.image}
															alt={loan.title}
															className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
														/>
													</div>
												</div>

												{/* Content */}
												<div className="flex h-full flex-1 flex-col text-center sm:text-left">
													<h3 className="mb-3 text-xl font-bold text-[#396131] transition-colors duration-300 group-hover:text-[#4a7a3f] lg:text-2xl">
														{loan.title}
													</h3>
													<p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600 lg:text-base">
														{loan.description}
													</p>

													{/* CTA Button */}
													<div className="mt-auto">
														<NavLink
															to={loan.route}
															className="group/btn inline-flex transform items-center justify-center rounded-xl bg-[#396131] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#4a7a3f] hover:shadow-xl focus:ring-4 focus:ring-[#396131]/25 focus:outline-none"
														>
															<span className="mr-2">Learn More</span>
															<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
														</NavLink>
													</div>
												</div>
											</div>
										</div>
									</div>
								)
							)}{' '}
						</div>
					</div>
				</section>

				{/* Loan Services Section */}
				<section id="loan-services" className="bg-gray-50 py-20">
					<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						{/* Section Header */}
						<div className="mb-16">
							<div className="mb-6 flex items-center gap-4">
								<div className="h-1 w-16 rounded-full bg-[#396131]"></div>
								<h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Loan services</h2>
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
									<div className="mb-2 text-sm text-gray-500">Policy</div>
									<h3 className="mb-4 text-xl font-bold text-gray-900">Legal policy for loans</h3>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex-1"></div>
									<button className="group/btn inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 hover:bg-[#396131]">
										<ArrowRight className="h-5 w-5 text-gray-600 transition-colors duration-300 group-hover/btn:text-white" />
									</button>
								</div>
							</div>

							{/* After Sales Service */}
							<div className="group relative transform overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
								<div className="mb-6">
									<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 transition-colors duration-300 group-hover:bg-[#396131]/10">
										<Sprout className="h-8 w-8 text-gray-600 transition-colors duration-300 group-hover:text-[#396131]" />
									</div>
									<div className="mb-2 text-sm text-gray-500">Auto loan</div>
									<h3 className="mb-4 text-xl font-bold text-gray-900">After sales service</h3>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex-1"></div>
									<button className="group/btn inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 hover:bg-[#396131]">
										<ArrowRight className="h-5 w-5 text-gray-600 transition-colors duration-300 group-hover/btn:text-white" />
									</button>
								</div>
							</div>

							{/* Payment Solutions */}
							<div className="group relative transform overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
								<div className="mb-6">
									<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 transition-colors duration-300 group-hover:bg-[#396131]/10">
										<DollarSign className="h-8 w-8 text-gray-600 transition-colors duration-300 group-hover:text-[#396131]" />
									</div>
									<div className="mb-2 text-sm text-gray-500">Housing loan</div>
									<h3 className="mb-4 text-xl font-bold text-gray-900">Payment solutions</h3>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex-1"></div>
									<button className="group/btn inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 hover:bg-[#396131]">
										<ArrowRight className="h-5 w-5 text-gray-600 transition-colors duration-300 group-hover/btn:text-white" />
									</button>
								</div>
							</div>
						</div>

						{/* Additional Information */}
						<div className="mt-16 text-center">
							<p className="mx-auto mb-8 max-w-2xl text-gray-600">
								Our comprehensive loan services extend beyond just lending. We provide complete
								support throughout your loan journey with professional guidance and flexible
								solutions.
							</p>
							<NavLink
								to="/contact-us"
								className="inline-flex items-center justify-center rounded-xl bg-[#396131] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[#4a7a3f]"
							>
								Get Professional Advice
								<ArrowRight className="ml-2 h-5 w-5" />
							</NavLink>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
