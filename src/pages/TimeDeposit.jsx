import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Calendar, DollarSign, Clock, Shield } from 'lucide-react';
import CarouselSection from '../components/CarouselSection';
import img from '/src/assets/homepage/heroSectionImage.png';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import carouselImg4 from '/src/assets/carousel/4.png';

export default function TimeDeposit() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');

	const timeDeposits = [
		{
			title: '3 Months',
			description:
				'Short-term investment option with competitive rates for those who want to park their funds for a brief period.',
			initialAmount: '₱5,000.00',
			interestRate: '4.00% gross (renewal) / 4.50% gross (new)',
			features: [
				'Short-term commitment',
				'Competitive interest rates',
				'Flexible renewal options',
				'Early withdrawal available with penalty'
			],
			benefits: [
				'Quick returns',
				'Low risk investment',
				'Liquidity after 3 months',
				'Higher than savings rates'
			],
			image: carouselImg1,
			route: '/contact-us'
		},
		{
			title: '6 Months',
			description:
				'Medium-term investment with attractive rates, perfect for those planning for near-future expenses or goals.',
			initialAmount: '₱5,000.00',
			interestRate: '4.75% gross (renewal) / 4.50% gross (new)',
			features: [
				'Medium-term commitment',
				'Enhanced interest rates',
				'Automatic renewal option',
				'Partial withdrawal allowed'
			],
			benefits: [
				'Better returns than 3-month',
				'Balanced risk-reward',
				'Planning for mid-term goals',
				'Stable investment option'
			],
			image: carouselImg2,
			route: '/contact-us'
		},
		{
			title: '1 Year',
			description:
				'Annual investment with excellent rates, ideal for long-term savings goals and wealth building.',
			initialAmount: '₱50,000.00',
			interestRate: '6.00% gross (renewal) / 4.50% gross (new)',
			features: [
				'Annual commitment',
				'Premium interest rates',
				'Compound interest benefits',
				'Flexible maturity options'
			],
			benefits: [
				'Maximum returns',
				'Long-term wealth building',
				'Compound interest growth',
				'Financial goal achievement'
			],
			image: carouselImg3,
			route: '/contact-us'
		},
		{
			title: '5 Years and 1 Day',
			description:
				'Long-term investment with the highest rates, perfect for retirement planning and long-term wealth accumulation.',
			initialAmount: '₱50,000.00',
			interestRate: '6.0% net (credited annually) / 6.0% net (credited upon maturity)',
			features: [
				'Long-term commitment',
				'Maximum interest rates',
				'Annual interest crediting',
				'Retirement planning tool'
			],
			benefits: [
				'Highest possible returns',
				'Retirement planning',
				'Long-term wealth accumulation',
				'Annual interest payments'
			],
			image: carouselImg4,
			route: '/contact-us'
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
			<main className="flex flex-col gap-[40px] pb-[50px] lg:gap-[120px]">
				<CarouselSection
					id="main"
					title={
						<>
							<span className="block bg-gradient-to-r from-[#396131] via-[#4a7c3a] to-[#5a8c4a] bg-clip-text text-5xl leading-tight font-black text-transparent sm:text-6xl lg:text-7xl">
								Time Deposit
							</span>
							<span className="block bg-gradient-to-r from-[#396131] via-[#4a7c3a] to-[#5a8c4a] bg-clip-text text-2xl leading-tight font-bold text-transparent sm:text-3xl lg:text-4xl">
								Higher returns, guaranteed
							</span>
						</>
					}
					description="Secure your future with fixed-term deposits offering competitive interest rates and guaranteed returns on your investment."
					stats={[
						{ icon: <Calendar className="h-4 w-4" />, label: '4 Terms Available' },
						{ icon: <Shield className="h-4 w-4" />, label: 'Guaranteed Returns' }
					]}
					extra={
						<NavLink
							to="/deposits"
							className="group inline-flex items-center text-[#396131] transition-colors duration-300 hover:text-[#4a7c3a]"
						>
							<ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
							Back to Deposits
						</NavLink>
					}
					slides={timeDeposits}
					icon={
						<TrendingUp className="mx-auto h-48 w-48 text-[#396131] drop-shadow-2xl lg:h-64 lg:w-64" />
					}
				/>

				{/* Deposits Section */}
				<section id="deposits" data-scroll className="text-[#396131]">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-16 text-center">
							<h2 className="mb-4 text-4xl font-bold text-[#396131] md:text-5xl lg:text-6xl">
								TIME DEPOSIT TERMS
							</h2>
							<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#396131] to-[#4a7a3f]"></div>
							<p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
								Choose the term that matches your investment goals
							</p>
						</div>

						<div className="grid gap-8 lg:grid-cols-1">
							{timeDeposits.map((deposit, index) => (
								<div
									key={index}
									className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl lg:flex-row"
								>
									{/* Image Container */}
									<div className="mb-6 flex items-center justify-center lg:mr-8 lg:mb-0 lg:w-1/3">
										<img
											src={deposit.image}
											alt={`${deposit.title} visual`}
											className="h-56 w-56 object-contain lg:h-80 lg:w-80"
										/>
									</div>
									{/* Content Container */}
									<div className="flex flex-1 flex-col">
										<div className="mb-6 flex items-center justify-between">
											<div>
												<h3 className="text-2xl font-bold text-gray-900">{deposit.title}</h3>
												<p className="text-sm text-gray-500">Term Period</p>
											</div>
											<div className="text-right">
												<div className="text-2xl font-bold text-[#396131]">
													{deposit.interestRate.split(' ')[0]}
												</div>
												<div className="text-sm text-gray-500">Interest Rate</div>
											</div>
										</div>

										<p className="mb-6 leading-relaxed text-gray-600">{deposit.description}</p>

										<div className="mb-6 rounded-lg bg-gray-50 p-4">
											<div className="text-sm font-medium text-gray-500">
												Minimum Initial Amount
											</div>
											<div className="text-xl font-semibold text-[#396131]">
												{deposit.initialAmount}
											</div>
										</div>

										{/* <div className="mb-6 grid grid-cols-1 gap-4">
											<div>
												<h4 className="mb-3 text-sm font-semibold text-gray-800">Features:</h4>
												<ul className="space-y-2">
													{deposit.features.map((feature, featureIndex) => (
														<li
															key={featureIndex}
															className="flex items-center gap-2 text-sm text-gray-600"
														>
															<div className="h-1.5 w-1.5 rounded-full bg-[#396131]"></div>
															{feature}
														</li>
													))}
												</ul>
											</div>
										</div>

										<div className="mb-6">
											<h4 className="mb-3 text-sm font-semibold text-gray-800">Benefits:</h4>
											<ul className="space-y-2">
												{deposit.benefits.map((benefit, benefitIndex) => (
													<li
														key={benefitIndex}
														className="flex items-center gap-2 text-sm text-gray-600"
													>
														<div className="h-1.5 w-1.5 rounded-full bg-[#396131]"></div>
														{benefit}
													</li>
												))}
											</ul>
										</div> */}

										<NavLink
											to={deposit.route}
											className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#396131] to-[#4a7c3a] px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg"
										>
											Open Time Deposit
										</NavLink>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Requirements Section */}
				<section id="requirements" data-scroll className="bg-white text-gray-900">
					<div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
						<div className="mb-16 text-center">
							<h2 className="mb-4 text-3xl font-bold sm:text-4xl">Time Deposit Requirements</h2>
							<p className="text-xl text-gray-500">What you need to open a time deposit account</p>
						</div>

						<div className="grid gap-8 md:grid-cols-2">
							<div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
								<div className="mb-6 flex items-center gap-4">
									<DollarSign className="h-8 w-8 text-gray-400" />
									<h3 className="text-xl font-bold">Investment Requirements</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>Minimum initial deposit amount</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>Valid government-issued ID</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>Proof of income or source of funds</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>Completed application form</span>
									</li>
								</ul>
							</div>

							<div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
								<div className="mb-6 flex items-center gap-4">
									<Shield className="h-8 w-8 text-gray-400" />
									<h3 className="text-xl font-bold">Terms & Conditions</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>Fixed term commitment</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>Early withdrawal penalties apply</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>Interest credited at maturity</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>Automatic renewal option available</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>PDIC insured up to ₱500,000</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
