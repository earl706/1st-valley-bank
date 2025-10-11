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
			description: 'Short-term investment with competitive rates.',
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
			description: 'Medium-term investment with attractive rates.',
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
			description: 'Annual investment for long-term savings goals.',
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
			title: '5 Years',
			description: 'Long-term investment with the highest rates.',
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
			<main className="flex flex-col">
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
				<section
					id="deposits"
					data-scroll
					className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-24 text-white"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-16 text-center">
							<h2 className="mb-4 text-5xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
								TIME DEPOSIT
							</h2>
							<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-white/90 to-[#aee3b7]"></div>
							<p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed font-normal text-white/80">
								Choose the term that matches your investment goals
							</p>
						</div>
						<div className="grid gap-8 lg:grid-cols-4">
							{timeDeposits.map((deposit, index) => (
								<div
									key={index}
									className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/90 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
								>
									{/* Image Container */}
									<div className="mb-2 flex items-center justify-center">
										<img
											src={deposit.image}
											alt={`${deposit.title} visual`}
											className="h-44 w-44 object-contain lg:h-56 lg:w-56"
										/>
									</div>
									{/* Content Container */}
									<div className="flex flex-1 flex-col">
										<div className="mb-4 flex items-center justify-between">
											<div>
												<h3 className="text-xl leading-snug font-bold text-[#185027]">
													{deposit.title}
												</h3>
												<p className="text-xs leading-snug font-normal text-[#35603e]/90">
													Term Period
												</p>
											</div>
											<div className="text-right">
												<div className="text-xl leading-snug font-bold text-[#396131]">
													{deposit.interestRate.split(' ')[0]}
												</div>
												<div className="text-xs leading-snug font-normal text-[#35603e]/90">
													Interest Rate
												</div>
											</div>
										</div>

										<p className="mb-4 text-sm leading-relaxed font-normal text-[#35603e]">
											{deposit.description}
										</p>

										<div className="mb-4 rounded-lg bg-white/80 p-3">
											<div className="text-xs leading-snug font-normal text-[#35603e]/90">
												Minimum Initial Amount
											</div>
											<div className="text-lg leading-snug font-bold text-[#396131]">
												{deposit.initialAmount}
											</div>
										</div>

										<NavLink
											to={deposit.route}
											className="mt-auto flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#396131] to-[#4a7c3a] px-5 py-2.5 text-sm leading-snug font-bold text-white transition-all duration-300 hover:shadow-lg"
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
					<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
						<div className="mb-16 text-center">
							<h2 className="mb-4 text-3xl leading-tight font-bold sm:text-4xl">
								Time Deposit Requirements
							</h2>
							<p className="text-base leading-relaxed font-normal text-gray-500">
								What you need to open a time deposit account
							</p>
						</div>

						<div className="grid gap-8 md:grid-cols-2">
							<div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
								<div className="mb-6 flex items-center gap-4">
									<DollarSign className="h-8 w-8 text-gray-400" />
									<h3 className="text-2xl leading-tight font-bold">Investment Requirements</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Minimum initial deposit amount
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Valid government-issued ID
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Proof of income or source of funds
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Completed application form
										</span>
									</li>
								</ul>
							</div>

							<div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
								<div className="mb-6 flex items-center gap-4">
									<Shield className="h-8 w-8 text-gray-400" />
									<h3 className="text-2xl leading-tight font-bold">Terms & Conditions</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Fixed term commitment
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Early withdrawal penalties apply
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Interest credited at maturity
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Automatic renewal option available
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											PDIC insured up to ₱500,000
										</span>
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
