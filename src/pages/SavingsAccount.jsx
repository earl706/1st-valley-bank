import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, PiggyBank, CreditCard, Users, GraduationCap, Building, User, DollarSign, Banknote } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPiggyBank,
	faCreditCard,
	faHandsHoldingChild,
	faMoneyBillTransfer,
	faSackDollar,
	faGraduationCap,
	faMagnifyingGlassDollar,
	faBuildingUser,
	faUser
} from '@fortawesome/free-solid-svg-icons';

export default function SavingsAccount() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');

	const savingsAccounts = [
		{
			name: 'Regular Savings',
			icon: faPiggyBank,
			description: 'This account is for individuals eighteen (18) years old and above whose purpose is for personal savings.',
			initialDeposit: '₱1,000.00',
			minimumBalance: '₱1,000.00',
			interestRate: '0.10% - 0.15% per annum',
			features: ['Personal savings', 'Age 18+', 'Monthly interest', 'ATM access']
		},
		{
			name: 'Kiddie and Teens Savings',
			icon: faCreditCard,
			description: 'The Kiddie and Teen Savings are offered to children ages 8 to 17 years. If the account holder reaches the age of eighteen (18), he/she has the option to close the account or open a new regular account.',
			initialDeposit: '₱100.00',
			minimumBalance: '₱500.00',
			interestRate: '0.10% - 0.15% per annum',
			features: ['Ages 8-17', 'Educational savings', 'Parent/guardian supervision', 'Transition to regular account']
		},
		{
			name: 'SSD Regular Savings',
			icon: faHandsHoldingChild,
			description: 'Special Savings Deposit for regular customers with enhanced benefits and features.',
			initialDeposit: '₱1,000.00',
			minimumBalance: '₱1,000.00',
			interestRate: '0.10% - 0.15% per annum',
			features: ['Enhanced benefits', 'Regular customers', 'Higher interest potential', 'Premium services']
		},
		{
			name: 'SSD Microfinance Savings',
			icon: faMoneyBillTransfer,
			description: 'Special Savings Deposit designed for microfinance clients with flexible terms and conditions.',
			initialDeposit: '₱100.00',
			minimumBalance: '₱500.00',
			interestRate: '0.10% - 0.15% per annum',
			features: ['Microfinance clients', 'Flexible terms', 'Community banking', 'Financial inclusion']
		},
		{
			name: 'SD Hendog Savings',
			icon: faSackDollar,
			description: 'Special savings account with unique features and benefits for specific customer segments.',
			initialDeposit: '₱1,000.00',
			minimumBalance: '₱1,000.00',
			interestRate: '0.10% - 0.15% per annum',
			features: ['Special features', 'Unique benefits', 'Targeted segments', 'Enhanced services']
		},
		{
			name: 'Basic Deposit Account',
			icon: faGraduationCap,
			description: 'Designed for individuals eighteen (18) years old and above, this account aims to promote financial inclusion to the unserved and underserved individuals and micro-entrepreneurs.',
			initialDeposit: '₱100.00',
			minimumBalance: 'None',
			interestRate: '0.10% - 0.15% per annum',
			features: ['Financial inclusion', 'No minimum balance', 'Micro-entrepreneurs', 'Basic banking services']
		},
		{
			name: 'Payroll Served',
			icon: faMagnifyingGlassDollar,
			description: "This account is for private employers who wish to avail of the Bank's ATM payroll services for the salaries and other benefits of its employees.",
			initialDeposit: 'Based on Agreement',
			minimumBalance: '₱1,000.00',
			interestRate: '0.10% - 0.15% per annum',
			features: ['Payroll services', 'Employer accounts', 'ATM access', 'Salary distribution']
		},
		{
			name: 'ATM Savings',
			icon: faBuildingUser,
			description: 'This account is for individuals eighteen (18) years old and above. ATM is convenient banking and enables cashless purchases.',
			initialDeposit: '₱1,000.00',
			minimumBalance: '₱1,000.00',
			interestRate: '0.10% - 0.15% per annum',
			features: ['ATM access', 'Convenient banking', 'Cashless transactions', '24/7 access']
		},
		{
			name: 'Student ATM Savings',
			icon: faUser,
			description: 'This account is designed for kids and teens aged 7 to 19 years old. It has a low initial deposit of P100 and the minimum balance to earn interest is only P500.',
			initialDeposit: '₱100.00',
			minimumBalance: '₱500.00',
			interestRate: '1.00% per annum',
			features: ['Ages 7-19', 'Low initial deposit', 'Higher interest rate', 'Educational focus']
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
				<nav className="bg-opacity-50 fixed top-35 right-4 z-40 rounded-2xl bg-black p-2 backdrop-blur-lg">
					<div className="flex flex-col gap-2">
						{['main', 'accounts', 'requirements'].map((section) => (
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

				{/* Hero Section */}
				<section
					id="main"
					data-scroll
					className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-green-50"
				>
					<div className="absolute inset-0">
						<div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-[#396131]/20 to-[#4a7c3a]/20 blur-3xl"></div>
						<div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-green-400/20 to-[#396131]/20 blur-3xl"></div>
					</div>

					<div className="max-w-8xl relative mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
						<div className="mx-8 grid min-h-[560px] items-center gap-12 lg:mx-16 lg:min-h-[640px] lg:grid-cols-2">
							<div className="relative order-0 flex h-full items-center justify-center lg:order-1">
								<div className="relative z-10">
									<PiggyBank className="mx-auto h-48 w-48 text-[#396131] drop-shadow-2xl lg:h-64 lg:w-64" />
								</div>
							</div>

							<div className="order-1 flex h-full flex-col justify-center space-y-8 lg:order-0">
								<div className="space-y-6">
									<NavLink
										to="/deposits"
										className="group inline-flex items-center text-[#396131] hover:text-[#4a7c3a] transition-colors duration-300"
									>
										<ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
										Back to Deposits
									</NavLink>

									<h1 className="text-4xl leading-tight font-bold text-gray-900 sm:text-5xl lg:text-6xl">
										<span className="block bg-gradient-to-r from-[#396131] via-[#4a7c3a] to-[#5a8c4a] bg-clip-text text-5xl leading-tight font-black text-transparent sm:text-6xl lg:text-7xl">
											Savings Account
										</span>
										<span className="block bg-gradient-to-r from-[#396131] via-[#4a7c3a] to-[#5a8c4a] bg-clip-text text-2xl leading-tight font-bold text-transparent sm:text-3xl lg:text-4xl">
											Building your financial future
										</span>
									</h1>

									<p className="max-w-2xl text-xl leading-relaxed text-gray-600">
										Choose from 9 different savings account types tailored to meet your specific financial goals and life stage. Each account offers competitive interest rates and flexible terms.
									</p>

									<div className="flex items-center gap-4 text-sm text-gray-600">
										<div className="flex items-center gap-2">
											<Users className="h-4 w-4" />
											<span>9 Account Types</span>
										</div>
										<div className="flex items-center gap-2">
											<DollarSign className="h-4 w-4" />
											<span>Competitive Rates</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Accounts Section */}
				<section id="accounts" data-scroll className="text-[#396131]">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-16 text-center">
							<h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
								Available Savings Accounts
							</h2>
							<p className="text-xl text-gray-600">
								Find the perfect savings account for your needs
							</p>
						</div>

						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{savingsAccounts.map((account, index) => (
								<div
									key={index}
									className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
								>
									<div className="mb-6 flex items-center justify-center">
										<FontAwesomeIcon
											icon={account.icon}
											className="h-12 w-12 text-[#396131]"
										/>
									</div>

									<h3 className="mb-4 text-xl font-bold text-gray-900">
										{account.name}
									</h3>

									<p className="mb-6 text-gray-600 leading-relaxed">
										{account.description}
									</p>

									<div className="mb-6 space-y-3">
										<div className="flex justify-between">
											<span className="text-sm font-medium text-gray-500">Initial Deposit:</span>
											<span className="text-sm font-semibold text-[#396131]">{account.initialDeposit}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-sm font-medium text-gray-500">Minimum Balance:</span>
											<span className="text-sm font-semibold text-[#396131]">{account.minimumBalance}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-sm font-medium text-gray-500">Interest Rate:</span>
											<span className="text-sm font-semibold text-[#396131]">{account.interestRate}</span>
										</div>
									</div>

									<div className="mb-6">
										<h4 className="mb-3 text-sm font-semibold text-gray-800">Key Features:</h4>
										<ul className="space-y-2">
											{account.features.map((feature, featureIndex) => (
												<li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
													<div className="h-1.5 w-1.5 rounded-full bg-[#396131]"></div>
													{feature}
												</li>
											))}
										</ul>
									</div>

									<button className="mt-auto w-full rounded-lg bg-gradient-to-r from-[#396131] to-[#4a7c3a] px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg">
										Open Account
									</button>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Requirements Section */}
				<section id="requirements" data-scroll className="bg-[#396131] text-white">
					<div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
						<div className="mb-16 text-center">
							<h2 className="mb-4 text-3xl font-bold sm:text-4xl">
								Account Opening Requirements
							</h2>
							<p className="text-xl text-green-100">
								What you need to open a savings account
							</p>
						</div>

						<div className="grid gap-8 md:grid-cols-2">
							<div className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
								<div className="mb-6 flex items-center gap-4">
									<User className="h-8 w-8 text-green-300" />
									<h3 className="text-xl font-bold">Individual Requirements</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-green-300"></div>
										<span>Colored photocopy of 2 Valid IDs</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-green-300"></div>
										<span>Three pieces 2x2 pictures</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-green-300"></div>
										<span>If you have business - Business Permit, DTI Permit</span>
									</li>
								</ul>
							</div>

							<div className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
								<div className="mb-6 flex items-center gap-4">
									<Building className="h-8 w-8 text-green-300" />
									<h3 className="text-xl font-bold">Corporate Requirements</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-green-300"></div>
										<span>SEC Certificate of Registration</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-green-300"></div>
										<span>Notarized Secretary Certificate</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-green-300"></div>
										<span>Articles Of Incorporation & By-Laws</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-green-300"></div>
										<span>Notarized Board Resolution</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-green-300"></div>
										<span>Two Valid IDs of Signatories</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-green-300"></div>
										<span>Business Permit</span>
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
