import React from 'react';
import { NavLink } from 'react-router-dom';
import {
	ArrowRight,
	Star,
	CheckCircle,
	Mail,
	Phone,
	MapPin,
	Handshake,
	Quote,
	Sparkles,
	PiggyBank,
	Building2,
	Home,
	Shield,
	Users,
	TrendingUp
} from 'lucide-react';

import img1 from '/src/assets/homepage/1.png';
import img2 from '/src/assets/homepage/2.png';
import img3 from '/src/assets/homepage/3.png';
import img4 from '/src/assets/homepage/4.png';
import img5 from '/src/assets/homepage/5.png';
import img6 from '/src/assets/homepage/6.png';
import logo from '/src/assets/logo.png';

export default function HomePage() {
	const services = [
		{
			image: img1,
			title: 'Savings & Deposits',
			description:
				'Secure your future with our comprehensive savings solutions designed to help you grow your wealth steadily.',
			features: ['High Interest Rates', 'Flexible Terms', 'Online Banking', 'Mobile App'],
			path: '/deposits',
			gradient: 'from-[#396131] to-[#4a7c3a]'
		},
		{
			image: img2,
			title: 'Loans & Credit',
			description:
				'Achieve your dreams with our flexible loan products tailored for businesses, agriculture, and personal needs.',
			features: ['Quick Approval', 'Competitive Rates', 'Flexible Payment', 'Expert Guidance'],
			path: '/loans',
			gradient: 'from-[#396131] to-[#4a7c3a]'
		},
		{
			image: img3,
			title: 'Properties',
			description:
				'Discover prime real estate and vehicle opportunities with our exclusive property listings and financing.',
			features: ['Prime Locations', 'Flexible Financing', 'Expert Valuation', 'Legal Support'],
			path: '/properties-for-sale',
			gradient: 'from-[#396131] to-[#4a7c3a]'
		}
	];

	const features = [
		{
			image: img4,
			title: 'Bank-Grade Security',
			description:
				'Your financial data is protected with industry-leading encryption and security measures.',
			stats: '99.9% Uptime'
		},
		{
			image: img5,
			title: 'Community Focused',
			description:
				'We understand local needs and provide personalized banking solutions for our community.',
			stats: '82+ Branches'
		},
		{
			image: img6,
			title: 'Growth Partner',
			description:
				'From startup to success, we support your business journey with tailored financial solutions.',
			stats: '25+ Years'
		}
	];

	const testimonials = [
		{
			name: 'Maria Santos',
			role: 'Small Business Owner',
			content:
				'1st Valley Bank helped me grow my business from a small sari-sari store to a thriving grocery chain. Their support is unmatched.',
			rating: 5,
			image: logo
		},
		{
			name: 'Juan Dela Cruz',
			role: 'Farmer',
			content:
				'The agricultural loan program gave me the capital I needed to expand my rice farm. Now I can provide for my family better.',
			rating: 5,
			image: logo
		},
		{
			name: 'Ana Rodriguez',
			role: 'Teacher',
			content:
				'Their home loan made my dream of owning a house come true. The process was smooth and the rates were very reasonable.',
			rating: 5,
			image: logo
		}
	];

	const stats = [
		{ number: '82+', label: 'Branches Nationwide' },
		{ number: '25+', label: 'Years of Service' },
		{ number: '500K+', label: 'Happy Customers' },
		{ number: '₱50B+', label: 'Assets Under Management' }
	];

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-green-50">
				{/* Background Elements */}
				<div className="absolute inset-0">
					<div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-[#396131]/20 to-[#4a7c3a]/20 blur-3xl"></div>
					<div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-green-400/20 to-[#396131]/20 blur-3xl"></div>
				</div>

				{/* Carousel Logic */}
				{(() => {
					const heroSlides = [
						{
							title1: 'Your Financial',
							title2: 'Success is Our Mission',
							description:
								'Experience banking that understands your dreams. From personal savings to business growth, we provide innovative solutions that help you achieve your financial goals.',
							image: logo,
							imageAlt: '1st Valley Bank',
							ctaButtons: [
								{
									text: 'Explore Services',
									path: '/consumer-protection/1vb-products',
									style: 'primary',
									icon: ArrowRight
								},
								{
									text: 'Learn More',
									path: '/about-us',
									style: 'secondary',
									icon: null
								}
							]
						},
						{
							title1: 'Secure Your Future',
							title2: 'with Smart Savings',
							description:
								'Start building your wealth today with our high-yield savings accounts and investment products designed to help you reach your financial goals faster.',
							image: img1,
							imageAlt: 'Savings & Deposits',
							ctaButtons: [
								{
									text: 'Open Savings Account',
									path: '/deposits',
									style: 'primary',
									icon: PiggyBank
								}
							]
						},
						{
							title1: 'Grow Your Business',
							title2: 'with Flexible Loans',
							description:
								'Get the funding you need to expand your business, purchase equipment, or invest in new opportunities with our competitive loan products.',
							image: img2,
							imageAlt: 'Loans & Credit',
							ctaButtons: [
								{
									text: 'Apply for Loan',
									path: '/loans',
									style: 'primary',
									icon: Building2
								}
							]
						},
						{
							title1: 'Find Your Dream',
							title2: 'Property Today',
							description:
								'Browse our exclusive collection of prime real estate and vehicles. We offer flexible financing options to make your property dreams come true.',
							image: img3,
							imageAlt: 'Properties for Sale',
							ctaButtons: [
								{
									text: 'Browse Properties',
									path: '/properties-for-sale',
									style: 'primary',
									icon: Home
								}
							]
						}
					];

					// Enhanced state management with smooth transitions
					const [current, setCurrent] = React.useState(0);
					const [isTransitioning, setIsTransitioning] = React.useState(false);
					const [isPaused, setIsPaused] = React.useState(false);
					const touchStartX = React.useRef(0);
					const touchEndX = React.useRef(0);
					const autoPlayRef = React.useRef(null);

					// Auto-play functionality
					React.useEffect(() => {
						if (isPaused || heroSlides.length <= 1) return;

						autoPlayRef.current = setInterval(() => {
							nextSlide();
						}, 5000); // Change slide every 5 seconds

						return () => {
							if (autoPlayRef.current) {
								clearInterval(autoPlayRef.current);
							}
						};
					}, [current, isPaused]);

					// Enhanced slide change with transition control
					const changeSlide = (newIndex) => {
						if (isTransitioning || newIndex === current) return;

						setIsTransitioning(true);
						setCurrent(newIndex);

						setTimeout(() => {
							setIsTransitioning(false);
						}, 500); // Match transition duration
					};

					const prevSlide = () => {
						const newIndex = current === 0 ? heroSlides.length - 1 : current - 1;
						changeSlide(newIndex);
					};

					const nextSlide = () => {
						const newIndex = current === heroSlides.length - 1 ? 0 : current + 1;
						changeSlide(newIndex);
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
							nextSlide();
						} else if (isRightSwipe) {
							prevSlide();
						}
					};

					// Keyboard navigation
					React.useEffect(() => {
						const handleKeyDown = (e) => {
							if (e.key === 'ArrowLeft') {
								prevSlide();
							} else if (e.key === 'ArrowRight') {
								nextSlide();
							}
						};

						window.addEventListener('keydown', handleKeyDown);
						return () => window.removeEventListener('keydown', handleKeyDown);
					}, [current]);

					return (
						<div
							className="max-w-8xl relative mx-auto px-4 py-5 sm:px-6 lg:px-8 lg:py-8"
							onMouseEnter={() => setIsPaused(true)}
							onMouseLeave={() => setIsPaused(false)}
							onTouchStart={handleTouchStart}
							onTouchMove={handleTouchMove}
							onTouchEnd={handleTouchEnd}
						>
							<div className="relative overflow-hidden">
								{/* Slide Container with smooth transitions */}
								<div
									className="flex transition-transform duration-500 ease-in-out"
									style={{ transform: `translateX(-${current * 100}%)` }}
								>
									{heroSlides.map((slide, index) => (
										<div
											key={index}
											className="w-full flex-shrink-0"
											role="tabpanel"
											aria-label={`Slide ${index + 1} of ${heroSlides.length}`}
										>
											<div className="mx-8 grid min-h-[560px] items-center gap-12 lg:mx-16 lg:min-h-[640px] lg:grid-cols-2">
												{/* Image with enhanced animations */}
												<div className="relative order-0 flex h-full items-center justify-center lg:order-1">
													<div className="relative z-10">
														<img
															src={slide.image}
															alt={slide.imageAlt}
															className={`mx-auto h-auto w-full max-w-lg transform drop-shadow-2xl transition-all duration-700 ${
																index === current ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
															}`}
														/>
													</div>
												</div>

												{/* Content with staggered animations */}
												<div className="order-1 flex h-full flex-col justify-center space-y-8 lg:order-0">
													<div className="space-y-4">
														<h1 className="text-4xl leading-tight font-bold text-gray-900 sm:text-5xl lg:text-6xl">
															<span
																className={`block transform bg-gradient-to-r from-[#396131] via-[#4a7c3a] to-[#5a8c4a] bg-clip-text text-5xl leading-tight font-black text-transparent transition-all delay-100 duration-700 sm:text-6xl lg:text-7xl ${
																	index === current
																		? 'translate-y-0 opacity-100'
																		: 'translate-y-4 opacity-0'
																}`}
															>
																{slide.title1}
															</span>
															<span
																className={`block transform bg-gradient-to-r from-[#396131] via-[#4a7c3a] to-[#5a8c4a] bg-clip-text text-5xl leading-tight font-black text-transparent transition-all delay-200 duration-700 sm:text-6xl lg:text-7xl ${
																	index === current
																		? 'translate-y-0 opacity-100'
																		: 'translate-y-4 opacity-0'
																}`}
															>
																{slide.title2}
															</span>
														</h1>

														<p
															className={`max-w-2xl transform text-xl leading-relaxed text-gray-600 transition-all delay-300 duration-700 ${
																index === current
																	? 'translate-y-0 opacity-100'
																	: 'translate-y-4 opacity-0'
															}`}
														>
															{slide.description}
														</p>
													</div>

													<div
														className={`flex transform flex-col gap-4 transition-all delay-400 duration-700 sm:flex-row ${
															index === current
																? 'translate-y-0 opacity-100'
																: 'translate-y-4 opacity-0'
														}`}
													>
														{slide.ctaButtons.map((button, buttonIndex) => (
															<NavLink
																key={buttonIndex}
																to={button.path}
																className={`group inline-flex transform items-center justify-center rounded-xl px-8 py-4 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
																	button.style === 'primary'
																		? 'bg-gradient-to-r from-[#396131] to-[#4a7c3a] text-white'
																		: 'border-2 border-gray-300 text-gray-700 hover:border-[#396131] hover:text-[#396131]'
																}`}
															>
																{button.icon && <button.icon className="mr-2 h-5 w-5" />}
																{button.text}
																{button.style === 'secondary' && button.icon && (
																	<button.icon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
																)}
															</NavLink>
														))}
													</div>
												</div>
											</div>
										</div>
									))}
								</div>

								{/* Enhanced Carousel Controls */}
								{heroSlides.length > 1 && (
									<>
										<button
											onClick={prevSlide}
											disabled={isTransitioning}
											className={`absolute top-1/2 left-4 z-20 hidden -translate-x-[calc(100%+0.5rem)] -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 shadow transition-all duration-200 hover:bg-white sm:left-6 sm:flex md:left-8 lg:left-10 xl:left-12 ${
												isTransitioning ? 'pointer-events-none opacity-50' : 'hover:scale-110'
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
											onClick={nextSlide}
											disabled={isTransitioning}
											className={`absolute top-1/2 right-4 z-20 hidden translate-x-[calc(100%+0.5rem)] -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 shadow transition-all duration-200 hover:bg-white sm:right-6 sm:flex md:right-8 lg:right-10 xl:right-12 ${
												isTransitioning ? 'pointer-events-none opacity-50' : 'hover:scale-110'
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

										{/* Enhanced Progress Dots */}
										<div className="z-20 mt-6 flex justify-center gap-2 lg:mt-8 xl:absolute xl:bottom-4 xl:left-1/2 xl:mt-0 xl:-translate-x-1/2">
											{heroSlides.map((_, idx) => (
												<button
													key={idx}
													onClick={() => changeSlide(idx)}
													disabled={isTransitioning}
													className={`h-2 w-6 rounded-full transition-all duration-300 hover:scale-110 ${
														current === idx ? 'w-8 bg-[#396131]' : 'bg-gray-300 hover:bg-gray-400'
													} ${isTransitioning ? 'pointer-events-none' : ''}`}
													aria-label={`Go to slide ${idx + 1}`}
												/>
											))}
										</div>

										{/* Auto-play pause indicator */}
										{!isPaused && (
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

			{/* Services Section */}
			<section className="bg-white py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
							Your Lifetime Friend in Banking
						</h2>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{services.map((service, index) => (
							<div
								key={index}
								className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
							>
								{/* Service Image */}
								<div className="relative mb-6">
									<div className="h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#396131]/5 to-[#4a7c3a]/10">
										<img
											src={service.image}
											alt={service.title}
											className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
										/>
									</div>
									<div
										className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-xl opacity-10`}
									></div>
								</div>

								<h3 className="mb-4 text-2xl font-bold text-gray-900">{service.title}</h3>
								<p className="mb-6 flex-1 leading-relaxed text-gray-600">{service.description}</p>

								<NavLink
									to={service.path}
									className="group/btn mt-auto inline-flex items-center font-semibold text-[#396131] transition-colors hover:text-[#4a7c3a]"
								>
									Learn More
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
								</NavLink>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="bg-gradient-to-br from-gray-50 to-green-50 py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
							Why Choose 1st Valley Bank?
						</h2>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{features.map((feature, index) => (
							<div key={index} className="group flex flex-col text-center">
								{/* Improved Image Container */}
								<div className="relative mb-8">
									{/* Background decorative element */}

									{/* Main image container */}
									<div className="relative mx-auto h-40 w-40 overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
										<img
											src={feature.image}
											alt={feature.title}
											className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
										/>
									</div>
								</div>

								<h3 className="mb-4 text-2xl font-bold text-gray-900">{feature.title}</h3>
								<p className="mb-4 flex-1 leading-relaxed text-gray-600">{feature.description}</p>
								<div className="mt-auto text-3xl font-bold text-[#396131]">{feature.stats}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="bg-white py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
							Trusted by Our Community
						</h2>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{testimonials.map((testimonial, index) => (
							<div
								key={index}
								className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
							>
								<div className="mb-6 flex items-center">
									<div className="flex-shrink-0">
										<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#396131] to-[#4a7c3a]">
											<img
												src={testimonial.image}
												alt={testimonial.name}
												className="h-10 w-10 rounded-full object-cover"
											/>
										</div>
									</div>
									<div className="ml-4">
										<h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
										<p className="text-sm text-gray-600">{testimonial.role}</p>
									</div>
									<div className="ml-auto">
										<Quote className="h-8 w-8 text-[#396131]/30" />
									</div>
								</div>

								<div className="mb-4 flex">
									{[...Array(testimonial.rating)].map((_, i) => (
										<Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
									))}
								</div>

								<blockquote className="leading-relaxed text-gray-600 italic">
									"{testimonial.content}"
								</blockquote>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className="bg-gradient-to-r from-[#396131] to-[#4a7c3a] py-20">
				<div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
					<div className="space-y-8">
						<div className="inline-flex rounded-full bg-white/20 p-3 backdrop-blur-sm">
							<Mail className="h-8 w-8 text-white" />
						</div>

						<h2 className="text-3xl font-bold text-white sm:text-4xl">Stay Connected</h2>

						<p className="mx-auto max-w-2xl text-xl text-green-100">
							Get the latest financial tips, market insights, and exclusive offers delivered
							straight to your inbox.
						</p>

						<NavLink
							to="/newsletter"
							className="group inline-flex transform items-center rounded-xl bg-white px-8 py-4 font-semibold text-[#396131] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						>
							Subscribe to Newsletter
							<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
						</NavLink>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-white py-20">
				<div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
					<div className="space-y-8">
						<div className="inline-flex rounded-full bg-gradient-to-r from-[#396131] to-[#4a7c3a] p-3">
							<Handshake className="h-8 w-8 text-white" />
						</div>

						<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
							Ready to Start Your Financial Journey?
						</h2>

						<p className="mx-auto max-w-2xl text-xl text-gray-600">
							Join thousands of satisfied customers who trust 1st Valley Bank with their financial
							future. Let's build success together.
						</p>

						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<NavLink
								to="/contact-us"
								className="group inline-flex transform items-center justify-center rounded-xl bg-gradient-to-r from-[#396131] to-[#4a7c3a] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
							>
								Get Started Today
								<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
							</NavLink>

							<NavLink
								to="/about-us"
								className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 px-8 py-4 font-semibold text-gray-700 transition-all duration-300 hover:border-[#396131] hover:text-[#396131]"
							>
								Learn About Us
							</NavLink>
						</div>
					</div>
				</div>
			</section>

			{/* Need More Help Section */}
			<section className="bg-gradient-to-br from-gray-50 to-green-50 py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid gap-12 lg:grid-cols-2 lg:items-center">
						{/* Left Side - Content */}
						<div className="space-y-8">
							{/* Accent Line */}
							<div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#396131] to-[#4a7c3a]"></div>

							{/* Heading */}
							<div className="space-y-4">
								<h2 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
									Need more help?
								</h2>
								<p className="text-xl text-gray-600">Get all the help for your banking needs.</p>
							</div>

							{/* Help Options Grid */}
							<div className="grid gap-6 sm:grid-cols-2">
								{/* Give Feedback */}
								<NavLink
									to="/contact-us"
									className="group flex items-center space-x-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#396131] hover:shadow-lg"
								>
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#396131] to-[#4a7c3a]">
										<svg
											className="h-6 w-6 text-white"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
											/>
										</svg>
									</div>
									<div className="flex-1">
										<h3 className="font-semibold text-gray-900 transition-colors group-hover:text-[#396131]">
											Give ``feedback
										</h3>
									</div>
									<ArrowRight className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#396131]" />
								</NavLink>

								{/* Find Branch/ATM */}
								<NavLink
									to="/contact-us"
									className="group flex items-center space-x-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#396131] hover:shadow-lg"
								>
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#396131] to-[#4a7c3a]">
										<MapPin className="h-6 w-6 text-white" />
									</div>
									<div className="flex-1">
										<h3 className="font-semibold text-gray-900 transition-colors group-hover:text-[#396131]">
											Find a branch/ATM
										</h3>
									</div>
									<ArrowRight className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#396131]" />
								</NavLink>

								{/* Contact Us */}
								<NavLink
									to="/contact-us"
									className="group flex items-center space-x-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#396131] hover:shadow-lg"
								>
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#396131] to-[#4a7c3a]">
										<Phone className="h-6 w-6 text-white" />
									</div>
									<div className="flex-1">
										<h3 className="font-semibold text-gray-900 transition-colors group-hover:text-[#396131]">
											Contact us
										</h3>
									</div>
									<ArrowRight className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#396131]" />
								</NavLink>

								{/* View Scheduled Maintenance */}
								<NavLink
									to="/newsletter"
									className="group flex items-center space-x-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#396131] hover:shadow-lg"
								>
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#396131] to-[#4a7c3a]">
										<svg
											className="h-6 w-6 text-white"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
											/>
										</svg>
									</div>
									<div className="flex-1">
										<h3 className="font-semibold text-gray-900 transition-colors group-hover:text-[#396131]">
											View scheduled maintenance
										</h3>
									</div>
									<ArrowRight className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#396131]" />
								</NavLink>
							</div>

							{/* CTA Button */}
							<NavLink
								to="/contact-us"
								className="group inline-flex items-center rounded-xl border-2 border-[#396131] bg-white px-8 py-4 font-semibold text-[#396131] shadow-lg transition-all duration-300 hover:bg-[#396131] hover:text-white hover:shadow-xl"
							>
								EXPLORE HELP & SUPPORT
								<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
							</NavLink>
						</div>

						{/* Right Side - Illustration */}
						<div className="relative">
							{/* Background Shape */}
							<div className="absolute inset-0">
								<div className="h-full w-full rounded-3xl bg-gradient-to-br from-[#396131]/10 to-[#4a7c3a]/20"></div>
							</div>

							{/* Illustration Container */}
							<div className="relative flex h-96 items-center justify-center lg:h-[500px]">
								{/* Person Illustration */}
								<div className="relative">
									{/* Desk */}
									<div className="h-32 w-48 rounded-lg bg-gray-700 shadow-lg"></div>

									{/* Laptop */}
									<div className="absolute -top-8 left-1/2 h-16 w-24 -translate-x-1/2 rounded bg-gray-800 shadow-lg">
										<div className="absolute bottom-0 left-1/2 h-1 w-20 -translate-x-1/2 rounded bg-gray-600"></div>
										<div className="absolute bottom-1 left-1/2 h-2 w-8 -translate-x-1/2 rounded bg-white"></div>
									</div>

									{/* Person */}
									<div className="absolute -top-20 left-1/2 -translate-x-1/2">
										{/* Head */}
										<div className="h-8 w-8 rounded-full bg-pink-200"></div>
										{/* Hair */}
										<div className="absolute -top-1 left-1/2 h-6 w-10 -translate-x-1/2 rounded-full bg-gray-800"></div>
										{/* Body */}
										<div className="absolute top-6 left-1/2 h-12 w-16 -translate-x-1/2 rounded-lg bg-gradient-to-r from-[#396131] to-[#4a7c3a]"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
