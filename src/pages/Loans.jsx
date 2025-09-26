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
			icon: Landmark,
			gradient: 'from-[#396131] to-[#4a7c3a]',
			route: '/loans'
		},
		{
			title: 'Agriculture Loan',
			subtitle: 'Sow success with smart financing',
			description:
				'Fast funds, low rates, and support to help your farm thrive! Get the financing you need to grow your agricultural business.',
			features: [
				'Quick approval process',
				'Competitive interest rates',
				'Flexible repayment terms',
				'Expert agricultural support'
			],
			icon: Wheat,
			gradient: 'from-[#396131] to-[#4a7c3a]',
			route: '/loans/agriculture'
		},
		{
			title: 'Gold & Gems Loan',
			subtitle: 'Turn assets into instant cash',
			description:
				'Secure, hassle-free loans with low rates to meet your urgent financial needs. Your valuable assets can work for you.',
			features: ['Instant valuation', 'Secure storage', 'Competitive rates', 'Quick disbursement'],
			icon: Gem,
			gradient: 'from-[#396131] to-[#4a7c3a]',
			route: '/loans/gold-and-gems'
		},
		{
			title: 'Microfinance Loan',
			subtitle: 'Start small, dream big',
			description:
				'Get fast, affordable microfinance loans to jumpstart and grow your small business with confidence and support.',
			features: [
				'Low minimum requirements',
				'Business mentoring',
				'Flexible terms',
				'Community support'
			],
			icon: HandCoins,
			gradient: 'from-[#396131] to-[#4a7c3a]',
			route: '/loans/microfinance'
		},
		{
			title: 'Salary Loan',
			subtitle: 'Cash when you need it',
			description:
				'Need cash before payday? Get quick approval, low rates, and flexible terms with our convenient salary loans.',
			features: [
				'Same-day approval',
				'No collateral required',
				'Automatic deduction',
				'Competitive rates'
			],
			icon: DollarSign,
			gradient: 'from-[#396131] to-[#4a7c3a]',
			route: '/loans/salary'
		},
		{
			title: 'Small Business Loan',
			subtitle: 'Fuel your business growth',
			description:
				'Easy-access loans to upgrade, expand, or boost working capital. Take your business to the next level hassle-free.',
			features: [
				'Working capital support',
				'Equipment financing',
				'Expansion funding',
				'Business advisory'
			],
			icon: BriefcaseBusiness,
			gradient: 'from-[#396131] to-[#4a7c3a]',
			route: '/loans/small-business-loan'
		},
		{
			title: 'SME Loan',
			subtitle: 'Scale your enterprise',
			description:
				'Take your SME to the next level with flexible financing, competitive rates, and support designed for business success.',
			features: [
				'Growth capital',
				'Technology investment',
				'Market expansion',
				'Strategic planning'
			],
			icon: Building2,
			gradient: 'from-[#396131] to-[#4a7c3a]',
			route: '/loans/small-and-medium-enterprises'
		},
		{
			title: 'SUCRE Loan',
			subtitle: 'Supervised credit for success',
			description:
				'Grow your farm smarter! Agri loans with funds, technical help, and flexible repayment to boost your harvest and income.',
			features: [
				'Technical assistance',
				'Supervised credit',
				'Harvest optimization',
				'Income enhancement'
			],
			icon: Sprout,
			gradient: 'from-[#396131] to-[#4a7c3a]',
			route: '/loans/supervised-credit'
		}
	];
	// Carousel state management
	const [carouselCurrent, setCarouselCurrent] = useState(0);
	const [carouselIsTransitioning, setCarouselIsTransitioning] = useState(false);
	const [carouselIsPaused, setCarouselIsPaused] = useState(false);
	const touchStartX = useRef(0);
	const touchEndX = useRef(0);
	const autoPlayRef = useRef(null);

	// Auto-play functionality
	useEffect(() => {
		if (carouselIsPaused || loanSlides.length <= 1) return;

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
		const newIndex = carouselCurrent === 0 ? loanSlides.length - 1 : carouselCurrent - 1;
		carouselChangeSlide(newIndex);
	};

	const carouselNextSlide = () => {
		const newIndex = carouselCurrent === loanSlides.length - 1 ? 0 : carouselCurrent + 1;
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
	useEffect(() => {
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
			<main className="flex flex-col gap-[40px] pb-[50px] lg:gap-[120px]">
				<nav className="bg-opacity-50 fixed top-35 right-4 z-40 rounded-2xl bg-black p-2 backdrop-blur-lg">
					<div className="flex flex-col gap-2">
						{['main', 'loans'].map((section) => (
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

				{/* Loans Carousel Hero Section */}
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
								{loanSlides.map((slide, index) => (
									<div
										key={index}
										className="w-full flex-shrink-0"
										role="tabpanel"
										aria-label={`Slide ${index + 1} of ${loanSlides.length}`}
									>
										<div className="mx-8 grid min-h-[560px] items-center gap-12 lg:mx-16 lg:min-h-[640px] lg:grid-cols-2">
											{/* Icon/Visual */}
											<div className="relative order-0 flex h-full items-center justify-center lg:order-1">
												<div className="relative z-10"></div>
												<slide.icon className="h-1/2 w-1/2 text-[#396131]" />
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

													{/* Features List */}
													<div
														className={`transform transition-all delay-400 duration-700 ${
															index === carouselCurrent
																? 'translate-y-0 opacity-100'
																: 'translate-y-4 opacity-0'
														}`}
													>
														<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
															{slide.features.map((feature, featureIndex) => (
																<div key={featureIndex} className="flex items-center gap-2">
																	<div className="h-2 w-2 rounded-full bg-[#396131]"></div>
																	<span className="text-sm text-gray-700">{feature}</span>
																</div>
															))}
														</div>
													</div>

													{/* Learn More Button */}
													{slide.title === 'Loans' ? (
														''
													) : (
														<div
															className={`transform pt-8 transition-all delay-500 duration-700 ${
																index === carouselCurrent
																	? 'translate-y-0 opacity-100'
																	: 'translate-y-4 opacity-0'
															}`}
														>
															<NavLink
																to={slide.route}
																className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#396131] to-[#4a7c3a] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
															>
																Learn More
																<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
															</NavLink>
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>

							{/* Carousel Controls */}
							{loanSlides.length > 1 && (
								<>
									<button
										onClick={carouselPrevSlide}
										disabled={carouselIsTransitioning}
										className={`absolute top-1/2 left-4 z-20 hidden -translate-x-[calc(100%+0.5rem)] -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 shadow transition-all duration-200 hover:bg-white sm:left-6 sm:flex md:left-8 lg:left-10 xl:left-12 ${
											carouselIsTransitioning ? 'pointer-events-none opacity-50' : 'hover:scale-110'
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
											carouselIsTransitioning ? 'pointer-events-none opacity-50' : 'hover:scale-110'
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
										{loanSlides.map((_, idx) => (
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
				</section>
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
						<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
							{loanSlides.map((loan, index) =>
								loan.title == 'Loans' ? (
									''
								) : (
									<div
										key={index}
										className="group relative transform overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
									>
										{/* Card gradient overlay */}
										<div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#396131]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

										<div className="relative p-8 lg:p-10">
											<div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start lg:gap-8">
												{/* Icon Container */}
												<div className="relative flex-shrink-0">
													<div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#396131] to-[#4a7a3f] shadow-lg transition-transform duration-300 group-hover:scale-110 lg:h-32 lg:w-32">
														<loan.icon className="h-3/4 w-3/4 text-3xl text-white lg:text-4xl" />
													</div>
													{/* Decorative ring */}
													<div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#396131]/20 to-[#4a7a3f]/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"></div>
												</div>

												{/* Content */}
												<div className="flex-1 text-center sm:text-left">
													<h3 className="mb-3 text-xl font-bold text-[#396131] transition-colors duration-300 group-hover:text-[#4a7a3f] lg:text-2xl">
														{loan.title}
													</h3>
													<p className="mb-6 text-sm leading-relaxed text-gray-600 lg:text-base">
														{loan.description}
													</p>

													{/* CTA Button */}
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
								)
							)}{' '}
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
