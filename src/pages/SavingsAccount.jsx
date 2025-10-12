import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DarkCard } from '../components/Card';
import { DarkPrimaryButton } from '../components/Buttons';
import { ArrowLeft, Users, Building, User, DollarSign, ArrowRight } from 'lucide-react';
import CarouselSection from '../components/CarouselSection';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import carouselImg4 from '/src/assets/carousel/4.png';
import carouselImg5 from '/src/assets/carousel/5.png';
import carouselImg6 from '/src/assets/carousel/6.png';

export default function SavingsAccount() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');

	const savingsAccounts = [
		{
			title: 'Regular Savings',
			description: 'For individuals 18+, ideal for personal savings and monthly interest.',
			initialDeposit: '₱1,000.00',
			minimumBalance: '₱1,000.00',
			interestRate: '0.10% - 0.15% p.a.',
			features: ['Personal savings', 'Age 18+', 'Monthly interest', 'ATM access'],
			image: carouselImg1,
			route: '/contact-us'
		},
		{
			title: 'Kiddie and Teens Savings',
			description: 'For ages 8-17, helps kids and teens save with parental guidance.',
			initialDeposit: '₱100.00',
			minimumBalance: '₱500.00',
			interestRate: '0.10% - 0.15% p.a.',
			features: [
				'Ages 8-17',
				'Educational savings',
				'Parent/guardian supervision',
				'Transition to regular account'
			],
			image: carouselImg2,
			route: '/contact-us'
		},
		{
			title: 'SSD Regular Savings',
			description: 'For regular customers seeking enhanced benefits and premium services.',
			initialDeposit: '₱1,000.00',
			minimumBalance: '₱1,000.00',
			interestRate: '0.10% - 0.15% p.a',
			features: [
				'Enhanced benefits',
				'Regular customers',
				'Higher interest potential',
				'Premium services'
			],
			image: carouselImg3,
			route: '/contact-us'
		},
		{
			title: 'SSD Microfinance Savings',
			description: 'For microfinance clients, offers flexible terms and community banking.',
			initialDeposit: '₱100.00',
			minimumBalance: '₱500.00',
			interestRate: '0.10% - 0.15% p.a',
			features: [
				'Microfinance clients',
				'Flexible terms',
				'Community banking',
				'Financial inclusion'
			],
			image: carouselImg4,
			route: '/contact-us'
		},
		{
			title: 'SD Handog Savings',
			description: 'Special account with unique features for targeted customer segments.',
			initialDeposit: '₱1,000.00',
			minimumBalance: '₱1,000.00',
			interestRate: '0.10% - 0.15% p.a',
			features: ['Special features', 'Unique benefits', 'Targeted segments', 'Enhanced services'],
			image: carouselImg5,
			route: '/contact-us'
		},
		{
			title: 'Basic Deposit Account',
			description: 'For 18+, promotes financial inclusion with no minimum balance required.',
			initialDeposit: '₱100.00',
			minimumBalance: 'None',
			interestRate: '0.10% - 0.15% p.a',
			features: [
				'Financial inclusion',
				'No minimum balance',
				'Micro-entrepreneurs',
				'Basic banking services'
			],
			image: carouselImg6,
			route: '/contact-us'
		},
		{
			title: 'Payroll Served',
			description: 'For employers using the Bank’s ATM payroll for employee salaries.',
			initialDeposit: 'Based on Agreement',
			minimumBalance: '₱1,000.00',
			interestRate: '0.10% - 0.15% p.a',
			features: ['Payroll services', 'Employer accounts', 'ATM access', 'Salary distribution'],
			image: carouselImg1,
			route: '/contact-us'
		},
		{
			title: 'ATM Savings',
			description: 'For individuals 18+, offers ATM access and convenient cashless banking.',
			initialDeposit: '₱1,000.00',
			minimumBalance: '₱1,000.00',
			interestRate: '0.10% - 0.15% p.a',
			features: ['ATM access', 'Convenient banking', 'Cashless transactions', '24/7 access'],
			image: carouselImg2,
			route: '/contact-us'
		},
		{
			title: 'Student ATM Savings',
			description: 'For ages 7-19, low deposit, higher interest, and educational focus.',
			initialDeposit: '₱100.00',
			minimumBalance: '₱500.00',
			interestRate: '1.00% p.a',
			features: ['Ages 7-19', 'Low initial deposit', 'Higher interest rate', 'Educational focus'],
			image: carouselImg3,
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
								Savings Account
							</span>
							<span className="block bg-gradient-to-r from-[#396131] via-[#4a7c3a] to-[#5a8c4a] bg-clip-text text-2xl leading-tight font-bold text-transparent sm:text-3xl lg:text-4xl">
								Building your financial future
							</span>
						</>
					}
					description="Choose from 9 different savings account types tailored to meet your specific financial goals and life stage. Each account offers competitive interest rates and flexible terms."
					stats={[
						{ icon: <Users className="h-4 w-4" />, label: '9 Account Types' },
						{ icon: <DollarSign className="h-4 w-4" />, label: 'Competitive Rates' }
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
					slides={savingsAccounts}
				/>

				<section
					id="accounts"
					data-scroll
					className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-24 text-white"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-16 text-center">
							<h2 className="mb-4 text-3xl leading-tight font-bold text-white md:text-5xl">
								SAVINGS ACCOUNTS
							</h2>
							<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-white/90 to-[#aee3b7]"></div>
							<p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed font-normal text-white/80">
								Find the perfect savings account for your needs
							</p>
						</div>

						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{savingsAccounts.map((account, index) => (
								<DarkCard key={index} useNativeSpacing={true}>
									{/* Emphasize image: make it a top banner */}
									<div className="flex h-40 w-full items-center justify-center">
										<img
											src={account.image}
											alt={`${account.title} visual`}
											className="h-28 w-auto object-contain"
										/>
									</div>
									<div className="flex w-full flex-1 flex-col p-8">
										<h3 className="mt-2 mb-4 text-center text-2xl leading-tight font-bold text-white">
											{account.title}
										</h3>
										<p className="mb-6 text-center text-base leading-relaxed font-normal text-white/80">
											{account.description}
										</p>
										<div className="mb-6 space-y-3">
											<div className="flex justify-between">
												<span className="text-sm leading-relaxed font-normal text-white/70">
													Initial Deposit:
												</span>
												<span className="text-sm leading-relaxed font-bold text-white">
													{account.initialDeposit}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm leading-relaxed font-normal text-white/70">
													Minimum Balance:
												</span>
												<span className="text-sm leading-relaxed font-bold text-white">
													{account.minimumBalance}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm leading-relaxed font-normal text-white/70">
													Interest Rate:
												</span>
												<span className="text-sm leading-relaxed font-bold text-white">
													{account.interestRate}
												</span>
											</div>
										</div>
										<DarkPrimaryButton
											to={account.route}
											className="mt-auto w-full"
											secondaryIcon={
												<ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
											}
										>
											Open Account
										</DarkPrimaryButton>
									</div>
								</DarkCard>
							))}
						</div>
					</div>
				</section>

				{/* Requirements Section */}
				<section id="requirements" data-scroll className="bg-white text-gray-900">
					<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
						<div className="mb-12 text-center">
							<h2 className="mb-2 text-3xl leading-tight font-bold text-gray-900 md:text-5xl">
								Account Opening Requirements
							</h2>
							<p className="text-base leading-relaxed font-normal text-gray-500">
								What you need to open a savings account
							</p>
						</div>

						<div className="grid gap-8 md:grid-cols-2">
							<div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
								<div className="mb-6 flex items-center gap-4">
									<User className="h-8 w-8 text-gray-400" />
									<h3 className="text-2xl leading-tight font-bold">Individual Requirements</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Colored photocopy of 2 Valid IDs
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Three pieces 2x2 pictures
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											If you have business - Business Permit, DTI Permit
										</span>
									</li>
								</ul>
							</div>

							<div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
								<div className="mb-6 flex items-center gap-4">
									<Building className="h-8 w-8 text-gray-400" />
									<h3 className="text-2xl leading-tight font-bold">Corporate Requirements</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											SEC Certificate of Registration
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Notarized Secretary Certificate
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Articles Of Incorporation & By-Laws
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Notarized Board Resolution
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Two Valid IDs of Signatories
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">Business Permit</span>
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
