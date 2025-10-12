import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CarouselSection from '../components/CarouselSection';
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
import img from '/src/assets/homepage/heroSectionImage.png';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import carouselImg4 from '/src/assets/carousel/4.png';
import carouselImg5 from '/src/assets/carousel/5.png';
import carouselImg6 from '/src/assets/carousel/6.png';
import carouselImg7 from '/src/assets/carousel/7.png';
import { DarkCard } from '../components/Card';
import { LightPrimaryButton } from '../components/Buttons';

export default function Deposits() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');

	const slides = [
		{
			title: 'Savings Account',
			subtitle: 'Building your financial future',
			description:
				'Choose from 9 different savings account types tailored to meet your specific financial goals and life stage.',
			features: [
				'Regular Savings',
				'Kiddie and Teens Savings',
				'SSD Regular Savings',
				'SSD Microfinance Savings',
				'SD Handog Savings',
				'Basic Deposit Account',
				'Payroll Served',
				'ATM Savings',
				'Student ATM Savings'
			],
			image: carouselImg1,
			imageAlt: 'Savings Account',
			route: '/deposits/savings-account'
		},
		{
			title: 'Checking Account',
			subtitle: 'Convenient business banking',
			description:
				'Professional checking solutions designed for businesses and individuals who need frequent transactions and check-writing capabilities.',
			features: [
				'Personal Checking Account',
				'Business/Corporate Checking Account',
				'Premium Checking Account'
			],
			image: carouselImg2,
			imageAlt: 'Checking Account',
			route: '/deposits/checking-account'
		},
		{
			title: 'Time Deposit',
			subtitle: 'Higher returns, guaranteed',
			description:
				'Secure your future with fixed-term deposits offering competitive interest rates and guaranteed returns on your investment.',
			features: [
				'SD Plus 3 Months',
				'SD Plus 6 Months',
				'SD Plus 1 Year',
				'SD Plus 5 Years and 1 Day'
			],
			image: carouselImg3,
			imageAlt: 'Time Deposit',
			route: '/deposits/time-deposit'
		}
	];

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
			image: carouselImg1,
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
			image: carouselImg2,
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
			image: carouselImg3,
			route: '/deposits/time-deposit',
			buttonText: 'Explore Time Deposits',
			layout: 'left' // content left, visual right
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
				{/* Deposits Carousel Hero Section */}
				<CarouselSection
					id="main"
					slides={slides}
					autoPlay={true}
					autoPlayInterval={5000}
					backgroundColor="from-slate-50 via-white to-green-50"
					brandColor="#396131"
					brandGradient="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
					minHeight="min-h-[560px] lg:min-h-[640px]"
					showLearnMoreButton={true}
					learnMoreText="Learn More"
				/>
				{/* Products Showcase Section */}
				<section
					id="products"
					data-scroll
					className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-24"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						{/* Section Header */}
						<div className="mb-16 text-center">
							<h2 className="mb-4 text-5xl leading-tight font-bold text-white md:text-5xl lg:text-5xl">
								DEPOSITS
							</h2>
							<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-white/90 to-[#b1ffc2]"></div>
							<p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed font-normal text-white/80">
								Choose the perfect deposit solution for your financial goals and start building your
								wealth today
							</p>
						</div>

						{/* Products Array */}
						{(() => {
							return (
								<div className="space-y-16">
									{products.map((product, index) => {
										const IconComponent = product.icon;
										const isLeftLayout = product.layout === 'left';

										return (
											<DarkCard key={product.id}>
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
																<div className="text-sm leading-tight font-semibold tracking-wider text-white uppercase">
																	{product.category}
																</div>
																<h3 className="text-3xl leading-tight font-bold text-white md:text-3xl">
																	{product.title}
																</h3>
															</div>
														</div>
														<p className="mb-8 text-base leading-relaxed font-normal text-white">
															{product.description}
														</p>
														<div className="mb-8">
															<h4 className="mb-4 text-2xl leading-tight font-bold tracking-wider text-white uppercase">
																{product.id === 'time-deposit'
																	? 'Available Terms'
																	: 'Account Types Available'}
															</h4>
															<div
																className={`grid grid-cols-1 gap-3 ${product.features.length > 3 ? 'sm:grid-cols-2' : ''}`}
															>
																{product.features.map((feature, featureIndex) => (
																	<div key={featureIndex} className="flex items-center gap-3">
																		<div className="h-2 w-2 rounded-full bg-white"></div>
																		<span className="text-base leading-relaxed font-normal text-white">
																			{feature}
																		</span>
																	</div>
																))}
															</div>
															{product.additionalInfo && (
																<div className="mt-3 text-base leading-relaxed font-bold text-white">
																	{product.additionalInfo}
																</div>
															)}
														</div>
														<LightPrimaryButton
															to={product.route}
															className="w-fit"
															secondaryIcon={
																<ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
															}
														>
															{product.buttonText}
														</LightPrimaryButton>
													</div>
													{/* Visual Side */}
													<div
														className={`relative flex items-center justify-center p-8 lg:p-12 ${isLeftLayout ? 'lg:order-2' : 'lg:order-1'}`}
													>
														<div className="relative">
															<div className="absolute inset-0 rounded-3xl"></div>
															<img
																src={product.image}
																alt={`${product.title} Visual`}
																className="relative z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
															/>
														</div>
													</div>
												</div>
											</DarkCard>
										);
									})}
								</div>
							);
						})()}
					</div>
				</section>
			</main>
		</>
	);
}
