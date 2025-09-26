import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import img1 from '/src/assets/homepage/1.png';
import { PiggyBank, CreditCard, TrendingUp } from 'lucide-react';
import img2 from '/src/assets/homepage/2.png';
import img3 from '/src/assets/homepage/3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faExpand,
	faUpDownLeftRight,
	faPiggyBank,
	faCreditCard,
	faHandsHoldingChild,
	faMoneyBillTransfer,
	faSackDollar,
	faGraduationCap,
	faMagnifyingGlassDollar,
	faBuildingUser,
	faPaperPlane,
	faUser
} from '@fortawesome/free-solid-svg-icons';

export default function Deposits() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');

	const features = [
		{
			name: 'Regular Savings',
			icon: faHandsHoldingChild,
			description:
				'This account is for individuals eighteen (18) years old and above whose purpose is for personal savings.'
		},
		{
			name: 'Kiddie & Teen Savings',
			icon: faHandsHoldingChild,
			description:
				'The Kiddie and Teen Savings are offered to children ages 8 to 17 years. If the account holder reaches the age of eighteen (18), he/she has the option to close the account or open a new regular account.'
		},
		{
			name: 'Basic Deposit',
			icon: faHandsHoldingChild,
			description:
				'Designed for individuals eighteen (18) years old and above, this account aims to promote financial inclusion to the unserved and underserved individuals and micro-entrepreneurs.'
		},
		{
			name: 'Payroll Servicing Deposit',
			icon: faMoneyBillTransfer,
			description:
				"This account is for private employers who wish to avail of the Bank's ATM payroll services for the salaries and other benefits of its employees. The opening and maintenance of the accounts shall be based on the Memorandum of Agreement (MOA) entered into by and between the bank."
		},
		{
			name: 'Student ATM Savings',
			icon: faMoneyBillTransfer,
			description:
				'This account is designed for kids and teens aged 7 to 19 years old. It has a low initial deposit of P100 and the minimum balance to earn interest is only P500. The account offers an interest rate of 1.00% per annum, higher than a regular savings account.'
		},
		{
			name: 'Special Savings Deposit',
			icon: faGraduationCap,
			description:
				'This account is designed for kids and teens aged 7 to 19 years old. It has a low initial deposit of P100 and the minimum balance to earn interest is only P500. The account offers an interest rate of 1.00% per annum, higher than a regular savings account.'
		},
		{
			name: 'ATM Savings',
			icon: faMagnifyingGlassDollar,
			description:
				'This account is for individuals eighteen (18) years old and above. ATM is convenient banking and enables cashless purchases.'
		}
	];

	const savingsDeposit = [
		{
			account: 'Regular Savings',
			required_initial_deposit: '1,000.00',
			required_monthly_ADB: '1,000.00',
			required_monthly_ADB_to_earn_interest: '1,000.00',
			interest_rate_per_annum_below: '0.10',
			interest_rate_per_annum_above: '0.15'
		},
		{
			account: 'Kids & Teens Savings Account',
			required_initial_deposit: '100.00',
			required_monthly_ADB: '500.00',
			required_monthly_ADB_to_earn_interest: '500.00',
			interest_rate_per_annum_below: '0.10',
			interest_rate_per_annum_above: '0.15'
		},
		{
			account: 'Basic Deposit',
			required_initial_deposit: '100.00',
			required_monthly_ADB: 'NONE',
			required_monthly_ADB_to_earn_interest: '500.00',
			interest_rate_per_annum_below: '0.10',
			interest_rate_per_annum_above: '0.15'
		},
		{
			account: 'ATM Savings',
			required_initial_deposit: '1,000.00',
			required_monthly_ADB: '1,000.00',
			required_monthly_ADB_to_earn_interest: '1,000.00',
			interest_rate_per_annum_below: '0.10',
			interest_rate_per_annum_above: '0.15'
		},
		{
			account: 'ATM Payroll Services ',
			required_initial_deposit: 'Based on Agreement',
			required_monthly_ADB: '1,000.00',
			required_monthly_ADB_to_earn_interest: '1,000.00',
			interest_rate_per_annum_below: '0.10',
			interest_rate_per_annum_above: '0.15'
		},
		{
			account: 'ATM Payroll Services ',
			required_initial_deposit: 'Based on Agreement',
			required_monthly_ADB: 'Based on Agreement',
			required_monthly_ADB_to_earn_interest: '100.00',
			interest_rate_per_annum_below: '0.10',
			interest_rate_per_annum_above: '0.15'
		}
	];

	const checkingCurrentAccount = [
		{
			account: 'Personal',
			required_initial_deposit: '5,000.00',
			required_monthly_ADB: '10,000.00',
			required_monthly_ADB_to_earn_interest: '10,000.00',
			interest_rate_per_annum_below: '0.10',
			interest_rate_per_annum_above: '0.15'
		},
		{
			account: 'Corporate',
			required_initial_deposit: '10,000.00',
			required_monthly_ADB: '10,000.00',
			required_monthly_ADB_to_earn_interest: '10,000.00',
			interest_rate_per_annum_below: '0.10',
			interest_rate_per_annum_above: '0.15'
		}
	];

	const terms = [
		{
			term: '3 Months',
			initial_amount: '5,000.00',
			interest_per_annum: '4.00% gross(renewal) 4.50% gross(new)'
		},
		{
			term: '3 Months',
			initial_amount: '5,000.00',
			interest_per_annum: '4.75% gross(renewal) 4.50% gross(new)'
		},
		{
			term: '1 Year',
			initial_amount: '50,000.00',
			interest_per_annum: '6.00% gross(renewal) 4.50% gross(new)'
		},
		{
			term: '5 Years and 1 Day Annually',
			initial_amount: '50,000.00',
			interest_per_annum: '6.0% net-interest credited to savings account annually'
		},
		{
			term: '5 Years and 1 Day',
			initial_amount: '50,000.00',
			interest_per_annum: '6.0% net credited upon maturity'
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
				<nav className="bg-opacity-50 fixed top-35 right-4 z-40 rounded-2xl bg-black p-2 backdrop-blur-lg">
					<div className="flex flex-col gap-2">
						{['main', 'products', 'savings-deposit', 'checking-current-deposit'].map((section) => (
							<button
								key={section}
								onClick={() => scrollToSection(section)}
								className={`h-3 w-3 rounded-full transition-all duration-300 ${
									activeSection === section
										? 'scale-125 cursor-pointer bg-[#396131]'
										: 'cursor-pointer bg-gray-500 hover:bg-gray-300'
								}`}
							/>
						))}
					</div>
				</nav>
				{/* Deposits Carousel Hero Section */}
				<section
					id="main"
					data-scroll
					className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-green-50"
				>
					{/* Background Elements */}
					<div className="absolute inset-0">
						<div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-[#396131]/20 to-[#4a7c3a]/20 blur-3xl"></div>
						<div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-green-400/20 to-[#396131]/20 blur-3xl"></div>
					</div>

					{/* Carousel Implementation */}
					{(() => {
						// Carousel data
						const depositSlides = [
							{
								title: 'Savings Account',
								subtitle: 'Building your financial future',
								description:
									'Choose from 9 different savings account types tailored to meet your specific financial goals and life stage.',
								accountTypes: [
									'Regular Savings',
									'Kiddie and Teens Savings',
									'SSD Regular Savings',
									'SSD Microfinance Savings',
									'SD Hendog Savings',
									'Basic Deposit Account',
									'Payroll Served',
									'ATM Savings',
									'Student ATM Savings'
								],
								image: img1,
								gradient: 'from-[#396131] to-[#4a7c3a]'
							},
							{
								title: 'Checking Account',
								subtitle: 'Convenient business banking',
								description:
									'Professional checking solutions designed for businesses and individuals who need frequent transactions and check-writing capabilities.',
								accountTypes: [
									'Personal Checking Account',
									'Business/Corporate Checking Account',
									'Premium Checking Account'
								],
								image: img2,
								gradient: 'from-[#396131] to-[#4a7c3a]'
							},
							{
								title: 'Time Deposit',
								subtitle: 'Higher returns, guaranteed',
								description:
									'Secure your future with fixed-term deposits offering competitive interest rates and guaranteed returns on your investment.',
								accountTypes: [
									'SD Plus 3 Months',
									'SD Plus 6 Months',
									'SD Plus 1 Year',
									'SD Plus 5 Years and 1 Day'
								],
								image: img3,
								gradient: 'from-[#396131] to-[#4a7c3a]'
							}
						];

						// Carousel state management
						const [carouselCurrent, setCarouselCurrent] = React.useState(0);
						const [carouselIsTransitioning, setCarouselIsTransitioning] = React.useState(false);
						const [carouselIsPaused, setCarouselIsPaused] = React.useState(false);
						const touchStartX = React.useRef(0);
						const touchEndX = React.useRef(0);
						const autoPlayRef = React.useRef(null);

						// Auto-play functionality
						React.useEffect(() => {
							if (carouselIsPaused || depositSlides.length <= 1) return;

							autoPlayRef.current = setInterval(() => {
								carouselNextSlide();
							}, 5000);

							return () => {
								if (autoPlayRef.current) {
									clearInterval(autoPlayRef.current);
								}
							};
						}, [carouselCurrent, carouselIsPaused]);

						// Enhanced slide change with transition control
						const carouselChangeSlide = (newIndex) => {
							if (carouselIsTransitioning || newIndex === carouselCurrent) return;

							setCarouselIsTransitioning(true);
							setCarouselCurrent(newIndex);

							setTimeout(() => {
								setCarouselIsTransitioning(false);
							}, 500);
						};

						const carouselPrevSlide = () => {
							const newIndex =
								carouselCurrent === 0 ? depositSlides.length - 1 : carouselCurrent - 1;
							carouselChangeSlide(newIndex);
						};

						const carouselNextSlide = () => {
							const newIndex =
								carouselCurrent === depositSlides.length - 1 ? 0 : carouselCurrent + 1;
							carouselChangeSlide(newIndex);
						};

						// Touch handlers for swipe support
						const handleTouchStart = (e) => {
							touchStartX.current = e.touches[0].clientX;
						};

						const handleTouchMove = (e) => {
							touchEndX.current = e.touches[0].clientX;
						};

						const handleTouchEnd = () => {
							if (!touchStartX.current || !touchEndX.current) return;

							const distance = touchStartX.current - touchEndX.current;
							const isLeftSwipe = distance > 50;
							const isRightSwipe = distance < -50;

							if (isLeftSwipe) {
								carouselNextSlide();
							} else if (isRightSwipe) {
								carouselPrevSlide();
							}
						};

						// Keyboard navigation
						React.useEffect(() => {
							const handleKeyDown = (e) => {
								if (e.key === 'ArrowLeft') {
									carouselPrevSlide();
								} else if (e.key === 'ArrowRight') {
									carouselNextSlide();
								}
							};

							window.addEventListener('keydown', handleKeyDown);
							return () => window.removeEventListener('keydown', handleKeyDown);
						}, [carouselCurrent]);

						return (
							<div
								className="max-w-8xl relative mx-auto px-4 py-5 sm:px-6 lg:px-8 lg:py-8"
								onMouseEnter={() => setCarouselIsPaused(true)}
								onMouseLeave={() => setCarouselIsPaused(false)}
								onTouchStart={handleTouchStart}
								onTouchMove={handleTouchMove}
								onTouchEnd={handleTouchEnd}
							>
								<div className="relative overflow-hidden">
									{/* Slide Container */}
									<div
										className="flex transition-transform duration-500 ease-in-out"
										style={{ transform: `translateX(-${carouselCurrent * 100}%)` }}
									>
										{depositSlides.map((slide, index) => (
											<div
												key={index}
												className="w-full flex-shrink-0"
												role="tabpanel"
												aria-label={`Slide ${index + 1} of ${depositSlides.length}`}
											>
												<div className="mx-8 grid min-h-[560px] items-center gap-12 lg:mx-16 lg:min-h-[640px] lg:grid-cols-2">
													{/* Icon/Visual */}
													{/* <div className="relative order-0 flex h-full items-center justify-center lg:order-1">
														<div className="relative z-10">
															<img
																src={slide.image}
																alt={slide.title}
																className={`mx-auto h-48 w-48 transform drop-shadow-2xl transition-all duration-700 lg:h-64 lg:w-64 ${
																	index === carouselCurrent
																		? 'scale-100 opacity-100'
																		: 'scale-95 opacity-0'
																}`}
															/>{' '}
														</div>
													</div> */}
													<div className="relative order-0 flex h-full items-center justify-center lg:order-1">
														<div className="relative z-10">
															<img
																src={slide.image}
																alt={''}
																className={`mx-auto h-auto w-full max-w-lg transform drop-shadow-2xl transition-all duration-700 ${
																	index === carouselCurrent
																		? 'scale-100 opacity-100'
																		: 'scale-95 opacity-0'
																}`}
															/>
														</div>
													</div>

													{/* Content */}
													<div className="order-1 flex h-full flex-col justify-center space-y-8 lg:order-0">
														<div className="space-y-4">
															<h1 className="text-4xl leading-tight font-bold text-gray-900 sm:text-5xl lg:text-6xl">
																<span
																	className={`block transform bg-gradient-to-r from-[#396131] via-[#4a7c3a] to-[#5a8c4a] bg-clip-text text-5xl leading-tight font-black text-transparent transition-all delay-100 duration-700 sm:text-6xl lg:text-7xl ${
																		index === carouselCurrent
																			? 'translate-y-0 opacity-100'
																			: 'translate-y-4 opacity-0'
																	}`}
																>
																	{slide.title}
																</span>
																<span
																	className={`block transform bg-gradient-to-r from-[#396131] via-[#4a7c3a] to-[#5a8c4a] bg-clip-text text-2xl leading-tight font-bold text-transparent transition-all delay-200 duration-700 sm:text-3xl lg:text-4xl ${
																		index === carouselCurrent
																			? 'translate-y-0 opacity-100'
																			: 'translate-y-4 opacity-0'
																	}`}
																>
																	{slide.subtitle}
																</span>
															</h1>

															<p
																className={`max-w-2xl transform text-xl leading-relaxed text-gray-600 transition-all delay-300 duration-700 ${
																	index === carouselCurrent
																		? 'translate-y-0 opacity-100'
																		: 'translate-y-4 opacity-0'
																}`}
															>
																{slide.description}
															</p>

															{/* Account Types List */}
															<div
																className={`transform transition-all delay-400 duration-700 ${
																	index === carouselCurrent
																		? 'translate-y-0 opacity-100'
																		: 'translate-y-4 opacity-0'
																}`}
															>
																<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
																	{slide.accountTypes.map((accountType, typeIndex) => (
																		<div key={typeIndex} className="flex items-center gap-2">
																			<div className="h-2 w-2 rounded-full bg-[#396131]"></div>
																			<span className="text-sm text-gray-700">{accountType}</span>
																		</div>
																	))}
																</div>
															</div>

															{/* Learn More Button */}
															<div
																className={`transform pt-8 transition-all delay-500 duration-700 ${
																	index === carouselCurrent
																		? 'translate-y-0 opacity-100'
																		: 'translate-y-4 opacity-0'
																}`}
															>
																<NavLink
																	to={`/deposits/${slide.title.toLowerCase().replace(/\s+/g, '-')}`}
																	className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#396131] to-[#4a7c3a] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
																>
																	Learn More
																	<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
																</NavLink>
															</div>
														</div>
													</div>
												</div>
											</div>
										))}
									</div>

									{/* Carousel Controls */}
									{depositSlides.length > 1 && (
										<>
											<button
												onClick={carouselPrevSlide}
												disabled={carouselIsTransitioning}
												className={`absolute top-1/2 left-4 z-20 hidden -translate-x-[calc(100%+0.5rem)] -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 shadow transition-all duration-200 hover:bg-white sm:left-6 sm:flex md:left-8 lg:left-10 xl:left-12 ${
													carouselIsTransitioning
														? 'pointer-events-none opacity-50'
														: 'hover:scale-110'
												}`}
												aria-label="Previous Slide"
											>
												<svg
													className="h-6 w-6 text-[#396131]"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15 19l-7-7 7-7"
													/>
												</svg>
											</button>
											<button
												onClick={carouselNextSlide}
												disabled={carouselIsTransitioning}
												className={`absolute top-1/2 right-4 z-20 hidden translate-x-[calc(100%+0.5rem)] -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 shadow transition-all duration-200 hover:bg-white sm:right-6 sm:flex md:right-8 lg:right-10 xl:right-12 ${
													carouselIsTransitioning
														? 'pointer-events-none opacity-50'
														: 'hover:scale-110'
												}`}
												aria-label="Next Slide"
											>
												<svg
													className="h-6 w-6 text-[#396131]"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 5l7 7-7 7"
													/>
												</svg>
											</button>

											{/* Progress Dots */}
											<div className="z-20 mt-6 flex justify-center gap-2 lg:mt-8 xl:absolute xl:bottom-4 xl:left-1/2 xl:mt-0 xl:-translate-x-1/2">
												{depositSlides.map((_, idx) => (
													<button
														key={idx}
														onClick={() => carouselChangeSlide(idx)}
														disabled={carouselIsTransitioning}
														className={`h-2 w-6 rounded-full transition-all duration-300 hover:scale-110 ${
															carouselCurrent === idx
																? 'w-8 bg-[#396131]'
																: 'bg-gray-300 hover:bg-gray-400'
														} ${carouselIsTransitioning ? 'pointer-events-none' : ''}`}
														aria-label={`Go to slide ${idx + 1}`}
													/>
												))}
											</div>

											{/* Auto-play indicator */}
											{!carouselIsPaused && (
												<div className="absolute top-4 right-4 z-20 rounded-full bg-white/80 p-2 text-xs text-gray-600">
													<div className="flex items-center gap-1">
														<div className="h-2 w-2 animate-pulse rounded-full bg-[#396131]"></div>
														Auto
													</div>
												</div>
											)}
										</>
									)}
								</div>
							</div>
						);
					})()}
				</section>
				{/* Products Showcase Section */}
				<section
					id="products"
					data-scroll
					className="bg-gradient-to-br from-slate-50 via-white to-green-50 py-24"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-20 text-center">
							<h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
								Deposit Solutions
							</h2>
							<p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
								Choose the perfect deposit solution for your financial goals and start building your
								wealth today
							</p>
						</div>

						{/* Products Array */}
						{(() => {
							const products = [
								{
									id: 'savings-account',
									title: 'Savings Account',
									category: 'Personal Banking',
									description:
										'Choose from 9 different savings account types tailored to meet your specific financial goals and life stage. From regular savings to specialized accounts for students and kids.',
									features: [
										'Regular Savings',
										'Kiddie & Teens Savings',
										'SSD Regular Savings',
										'SSD Microfinance Savings',
										'SD Hendog Savings',
										'Basic Deposit Account'
									],
									additionalInfo: '+ 3 more specialized accounts',
									icon: PiggyBank,
									image: img1,
									route: '/deposits/savings-account',
									buttonText: 'Explore Savings Accounts',
									layout: 'left' // content left, visual right
								},
								{
									id: 'checking-account',
									title: 'Checking Account',
									category: 'Business Banking',
									description:
										'Professional checking solutions designed for businesses and individuals who need frequent transactions and check-writing capabilities. Perfect for daily business operations.',
									features: [
										'Personal Checking Account',
										'Business/Corporate Checking Account',
										'Premium Checking Account'
									],
									additionalInfo: null,
									icon: CreditCard,
									image: img2,
									route: '/deposits/checking-account',
									buttonText: 'Explore Checking Accounts',
									layout: 'right' // visual left, content right
								},
								{
									id: 'time-deposit',
									title: 'Time Deposit',
									category: 'Investment',
									description:
										'Secure your future with fixed-term deposits offering competitive interest rates and guaranteed returns on your investment. Higher yields for your savings.',
									features: [
										'SD Plus 3 Months',
										'SD Plus 6 Months',
										'SD Plus 1 Year',
										'SD Plus 5 Years and 1 Day'
									],
									additionalInfo: null,
									icon: TrendingUp,
									image: img3,
									route: '/deposits/time-deposit',
									buttonText: 'Explore Time Deposits',
									layout: 'left' // content left, visual right
								}
							];

							return (
								<div className="space-y-16">
									{products.map((product, index) => {
										const IconComponent = product.icon;
										const isLeftLayout = product.layout === 'left';

										return (
											<div
												key={product.id}
												className="group hover:shadow-3xl relative overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500"
											>
												<div className="grid min-h-[400px] grid-cols-1 lg:grid-cols-2">
													{/* Content Side */}
													<div
														className={`flex flex-col justify-center p-8 lg:p-12 ${isLeftLayout ? '' : 'lg:order-2'}`}
													>
														<div className="mb-6 flex items-center gap-4">
															<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#396131] to-[#4a7c3a] shadow-lg">
																<IconComponent className="h-8 w-8 text-white" />
															</div>
															<div>
																<div className="text-sm font-semibold tracking-wider text-[#396131] uppercase">
																	{product.category}
																</div>
																<h3 className="text-3xl font-bold text-gray-900 lg:text-4xl">
																	{product.title}
																</h3>
															</div>
														</div>
														<p className="mb-8 text-lg leading-relaxed text-gray-600">
															{product.description}
														</p>
														<div className="mb-8">
															<h4 className="mb-4 text-sm font-semibold tracking-wider text-gray-800 uppercase">
																{product.id === 'time-deposit'
																	? 'Available Terms'
																	: 'Account Types Available'}
															</h4>
															<div
																className={`grid grid-cols-1 gap-3 ${product.features.length > 3 ? 'sm:grid-cols-2' : ''}`}
															>
																{product.features.map((feature, featureIndex) => (
																	<div key={featureIndex} className="flex items-center gap-3">
																		<div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#396131] to-[#4a7c3a]"></div>
																		<span className="text-sm font-medium text-gray-700">
																			{feature}
																		</span>
																	</div>
																))}
															</div>
															{product.additionalInfo && (
																<div className="mt-3 text-sm font-semibold text-[#396131]">
																	{product.additionalInfo}
																</div>
															)}
														</div>
														<NavLink
															to={product.route}
															className="group/btn inline-flex w-fit items-center justify-center rounded-2xl bg-gradient-to-r from-[#396131] to-[#4a7c3a] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
														>
															{product.buttonText}
															<ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
														</NavLink>
													</div>
													{/* Visual Side */}
													<div
														className={`relative flex items-center justify-center bg-gradient-to-br from-[#396131]/5 to-[#4a7c3a]/10 p-8 lg:p-12 ${isLeftLayout ? 'lg:order-2' : 'lg:order-1'}`}
													>
														<div className="relative">
															<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#396131]/20 to-[#4a7c3a]/20 blur-3xl"></div>
															<img
																src={product.image}
																alt={`${product.title} Visual`}
																className="relative z-10 h-64 w-64 rounded-3xl object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
															/>
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							);
						})()}
					</div>
				</section>
				{/* <section id="requirements" data-scroll className="text-[#396131]">
					<div className="mx-[20px] flex flex-col justify-center gap-[50px] lg:mx-[80px] lg:flex-row lg:gap-[175px]">
						<div className="flex flex-col gap-[30px] lg:w-1/2 lg:gap-[40px]">
							<div className="flex flex-col items-center gap-[50px]">
								<FontAwesomeIcon icon={faBuildingUser} className="flex aspect-square text-[5rem]" />
								<span className="text-center text-[1.5rem]/[1.5rem] font-bold">
									Requirements for Account Opening-Corporate
								</span>
							</div>
							<div className="flex flex-col gap-[20px] lg:gap-[30px]">
								{[
									'SEC Certificate of Registration',
									'Notarized Secretary Certificate',
									'Articles Of Incorporation & By-Laws',
									'Notarized Board Resolution to open an account with 1vb, election of officers and authorized signatories',
									'Two Valid IDs of Signatories',
									'Three recent 2x2 picture of Signatories',
									'Business Permit',
									'General Information Sheet'
								].map((requirement, index) => (
									<div className="flex items-center gap-[20px] lg:gap-[30px]" key={index}>
										<FontAwesomeIcon
											icon={faPaperPlane}
											className="flex aspect-square text-[1.2rem] lg:text-[2rem]"
										/>
										<span className="text-[0.8rem]/[0.9rem] lg:text-[0.9rem]/[0.9rem]">
											{requirement}
										</span>
									</div>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-[30px] lg:w-1/2 lg:gap-[40px]">
							<div className="flex flex-col items-center gap-[50px]">
								<FontAwesomeIcon icon={faUser} className="flex aspect-square text-[5rem]" />
								<span className="text-center text-[1.5rem]/[1.5rem] font-bold">
									Requirements for Account Opening-Individual
								</span>
							</div>
							<div className="flex flex-col gap-[20px] lg:gap-[30px]">
								{[
									'Colored photocopy of 2 Valid IDs',
									'Three pieces 2x2 pictures',
									'If you have business - Business Permit, DTI Permit'
								].map((requirement, index) => (
									<div className="flex items-center gap-[20px] lg:gap-[30px]" key={index}>
										<FontAwesomeIcon
											icon={faPaperPlane}
											className="flex aspect-square text-[1.2rem] lg:text-[2rem]"
										/>
										<span className="text-[0.8rem]/[0.9rem] lg:text-[0.9rem]/[0.9rem]">
											{requirement}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</section> */}
				{/* <section id="savings-deposit" data-scroll className="flex flex-col gap-[40px]">
					<span className="text-center text-[1.5rem]/[1.5rem] font-bold text-[#396131] lg:text-[2rem]/[2rem]">
						Types of Savings Deposit
					</span>
					<div className="flex flex-col gap-[30px] bg-[#396131] p-[20px] text-white lg:p-[40px]">
						<span className="text-center text-[1rem]/[1rem] font-bold lg:text-[1.5rem]/[1.5rem]">
							Savings Deposit
						</span>
						<div className="overflow-auto rounded-lg border border-gray-200/20 shadow-sm">
							<table className="w-full">
								<thead className="border-b border-gray-200/20 text-[0.6rem] font-bold lg:text-[1rem]/[1rem]">
									<tr>
										<th className="px-3 py-3 text-left tracking-wider lg:px-6 lg:py-6">
											Account Type
										</th>
										<th className="px-3 py-3 text-left tracking-wider lg:px-6 lg:py-6">
											Required Initial Deposit
										</th>
										<th className="px-3 py-3 text-left tracking-wider lg:px-6 lg:py-6">
											Required Minimum Monthly ADB
										</th>
										<th className="px-3 py-3 text-left tracking-wider lg:px-6 lg:py-6">
											Required ADB To Earn Interest
										</th>
										<th className="px-3 py-3 text-left tracking-wider lg:px-6 lg:py-6">
											<div className="flex flex-col">
												<span>Interest Rate Per Annum </span>
												<span className="text-[0.5rem]/[0.5rem] font-normal lg:text-[0.8rem]/[0.8rem]">
													Below 5M ADB
												</span>
											</div>
										</th>
										<th className="px-3 py-3 text-left tracking-wider lg:px-6 lg:py-6">
											<div className="flex flex-col">
												<span>Interest Rate Per Annum </span>
												<span className="text-[0.5rem]/[0.5rem] font-normal lg:text-[0.8rem]/[0.8rem]">
													Below 5M ADB
												</span>
											</div>
										</th>
									</tr>
								</thead>
								<tbody className="divide-y">
									{savingsDeposit.map((row, index) => (
										<tr
											key={index}
											className="text-[0.6rem]/[0.6rem] text-white transition-colors duration-150 lg:text-[0.9rem]/[0.9rem]"
										>
											<td className="px-3 py-3 font-bold whitespace-nowrap lg:px-6 lg:py-10">
												{row.account}
											</td>
											<td className="px-3 py-3 whitespace-nowrap lg:px-6 lg:py-10">
												{row.required_initial_deposit}
											</td>
											<td className="px-3 py-3 whitespace-nowrap lg:px-6 lg:py-10">
												{row.required_monthly_ADB}
											</td>
											<td className="px-3 py-3 whitespace-nowrap lg:px-6 lg:py-10">
												{row.required_monthly_ADB_to_earn_interest}
											</td>
											<td className="px-3 py-3 whitespace-nowrap lg:px-6 lg:py-10">
												{row.interest_rate_per_annum_below}
											</td>
											<td className="px-3 py-3 whitespace-nowrap lg:px-6 lg:py-10">
												{row.interest_rate_per_annum_above}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</section>
				<section
					id="checking-current-deposit"
					data-scroll
					className="flex flex-col gap-[20px] lg:gap-[40px]"
				>
					<div className="flex flex-col gap-[30px] bg-white p-[40px] text-[#396131]">
						<span className="text-center text-[1rem] font-bold lg:text-[1.5rem]/[1.5rem]">
							Checking/Current Account
						</span>
						<div className="flex flex-col gap-[50px]">
							<div className="overflow-auto rounded-lg border border-[#396131]/20 shadow-sm">
								<table className="w-full">
									<thead className="border-b border-[#396131]/20 text-[0.6rem]/[0.6rem] font-bold lg:text-[1rem]/[1rem]">
										<tr>
											<th className="px-3 py-3 text-left tracking-wider lg:px-6 lg:py-6">
												Account Type
											</th>
											<th className="px-3 py-3 text-left tracking-wider lg:px-6 lg:py-6">
												Required Initial Deposit
											</th>
											<th className="px-3 py-3 text-left tracking-wider lg:px-6 lg:py-6">
												Required Minimum Monthly ADB
											</th>
											<th className="px-3 py-3 text-left tracking-wider lg:px-6 lg:py-6">
												Required ADB To Earn Interest
											</th>
											<th className="px-3 py-3 text-left tracking-wider lg:px-6 lg:py-6">
												<div className="flex flex-col">
													<span>Interest Rate Per Annum </span>
													<span className="font-normal lg:text-[0.8rem]/[0.8rem]">
														Below 5M ADB
													</span>
												</div>
											</th>
											<th className="px-3 py-3 text-left tracking-wider lg:px-6 lg:py-6">
												<div className="flex flex-col">
													<span>Interest Rate Per Annum </span>
													<span className="font-normal lg:text-[0.8rem]/[0.8rem]">
														Below 5M ADB
													</span>
												</div>
											</th>
										</tr>
									</thead>
									<tbody className="divide-y">
										{checkingCurrentAccount.map((row, index) => (
											<tr
												key={index}
												className="text-[0.6rem]/[0.6rem] text-[#396131] transition-colors duration-150 lg:text-[0.9rem]/[0.9rem]"
											>
												<td className="px-3 py-5 font-bold whitespace-nowrap lg:px-6 lg:py-10">
													{row.account}
												</td>
												<td className="px-3 py-5 whitespace-nowrap lg:px-6 lg:py-10">
													{row.required_initial_deposit}
												</td>
												<td className="px-3 py-5 whitespace-nowrap lg:px-6 lg:py-10">
													{row.required_monthly_ADB}
												</td>
												<td className="px-3 py-5 whitespace-nowrap lg:px-6 lg:py-10">
													{row.required_monthly_ADB_to_earn_interest}
												</td>
												<td className="px-3 py-5 whitespace-nowrap lg:px-6 lg:py-10">
													{row.interest_rate_per_annum_below}
												</td>
												<td className="px-3 py-5 whitespace-nowrap lg:px-6 lg:py-10">
													{row.interest_rate_per_annum_above}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							<div className="overflow-auto rounded-lg border border-[#396131]/20 shadow-sm">
								<table className="w-full">
									<thead className="border-b border-[#396131]/20 text-[0.6rem]/[0.6rem] font-bold lg:text-[1rem]/[1rem]">
										<tr>
											<th className="px-3 py-6 text-left tracking-wider lg:px-6 lg:py-6">Terms</th>
											<th className="px-3 py-6 text-left tracking-wider lg:px-6 lg:py-6">
												Initial Amount
											</th>
											<th className="px-3 py-6 text-left tracking-wider lg:px-6 lg:py-6">
												Interest Rate Per Annum
											</th>
										</tr>
									</thead>
									<tbody className="divide-y">
										{terms.map((row, index) => (
											<tr
												key={index}
												className="text-[0.6rem]/[0.6rem] text-[#396131] transition-colors duration-150 lg:text-[0.9rem]/[0.9rem]"
											>
												<td className="px-3 py-5 font-bold whitespace-nowrap lg:px-6 lg:py-10">
													{row.term}
												</td>
												<td className="px-3 py-5 whitespace-nowrap lg:px-6 lg:py-10">
													{row.initial_amount}
												</td>
												<td className="px-3 py-5 whitespace-nowrap lg:px-6 lg:py-10">
													{row.interest_per_annum}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</section> */}
			</main>
		</>
	);
}
