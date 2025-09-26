import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, CreditCard, Building, User, DollarSign, CheckCircle } from 'lucide-react';

export default function CheckingAccount() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');

	const checkingAccounts = [
		{
			name: 'Personal Checking Account',
			description: 'Perfect for individuals who need frequent access to their funds with check-writing capabilities and convenient banking services.',
			initialDeposit: '₱5,000.00',
			minimumBalance: '₱10,000.00',
			interestRate: '0.10% - 0.15% per annum',
			features: [
				'Check writing privileges',
				'ATM access',
				'Online banking',
				'Mobile banking',
				'Debit card',
				'Monthly statements'
			],
			benefits: [
				'Convenient bill payments',
				'Direct deposit',
				'Overdraft protection available',
				'24/7 account access'
			]
		},
		{
			name: 'Business/Corporate Checking Account',
			description: 'Designed for businesses and corporations that require comprehensive banking services with multiple signatories and enhanced features.',
			initialDeposit: '₱10,000.00',
			minimumBalance: '₱10,000.00',
			interestRate: '0.10% - 0.15% per annum',
			features: [
				'Multiple signatories',
				'Business check writing',
				'Payroll services',
				'Merchant services',
				'Cash management',
				'Online business banking'
			],
			benefits: [
				'Streamlined business operations',
				'Professional banking services',
				'Dedicated relationship manager',
				'Bulk transaction processing'
			]
		},
		{
			name: 'Premium Checking Account',
			description: 'Our premium checking account offers enhanced benefits, higher transaction limits, and exclusive services for high-value customers.',
			initialDeposit: '₱25,000.00',
			minimumBalance: '₱25,000.00',
			interestRate: '0.15% - 0.25% per annum',
			features: [
				'Premium interest rates',
				'Unlimited transactions',
				'Priority customer service',
				'Free wire transfers',
				'Concierge banking',
				'Investment advisory services'
			],
			benefits: [
				'Exclusive banking privileges',
				'Waived fees on most services',
				'Priority loan processing',
				'Personalized financial planning'
			]
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
									<CreditCard className="mx-auto h-48 w-48 text-[#396131] drop-shadow-2xl lg:h-64 lg:w-64" />
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
											Checking Account
										</span>
										<span className="block bg-gradient-to-r from-[#396131] via-[#4a7c3a] to-[#5a8c4a] bg-clip-text text-2xl leading-tight font-bold text-transparent sm:text-3xl lg:text-4xl">
											Convenient business banking
										</span>
									</h1>

									<p className="max-w-2xl text-xl leading-relaxed text-gray-600">
										Professional checking solutions designed for businesses and individuals who need frequent transactions and check-writing capabilities.
									</p>

									<div className="flex items-center gap-4 text-sm text-gray-600">
										<div className="flex items-center gap-2">
											<CheckCircle className="h-4 w-4" />
											<span>3 Account Types</span>
										</div>
										<div className="flex items-center gap-2">
											<DollarSign className="h-4 w-4" />
											<span>Check Writing</span>
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
								Available Checking Accounts
							</h2>
							<p className="text-xl text-gray-600">
								Choose the checking account that fits your needs
							</p>
						</div>

						<div className="grid gap-8 lg:grid-cols-1">
							{checkingAccounts.map((account, index) => (
								<div
									key={index}
									className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl lg:flex-row lg:gap-8"
								>
									<div className="mb-6 flex items-center justify-center lg:mb-0 lg:w-1/4">
										<CreditCard className="h-16 w-16 text-[#396131]" />
									</div>

									<div className="flex-1">
										<h3 className="mb-4 text-2xl font-bold text-gray-900">
											{account.name}
										</h3>

										<p className="mb-6 text-gray-600 leading-relaxed">
											{account.description}
										</p>

										<div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
											<div className="rounded-lg bg-gray-50 p-4">
												<div className="text-sm font-medium text-gray-500">Initial Deposit</div>
												<div className="text-lg font-semibold text-[#396131]">{account.initialDeposit}</div>
											</div>
											<div className="rounded-lg bg-gray-50 p-4">
												<div className="text-sm font-medium text-gray-500">Minimum Balance</div>
												<div className="text-lg font-semibold text-[#396131]">{account.minimumBalance}</div>
											</div>
											<div className="rounded-lg bg-gray-50 p-4">
												<div className="text-sm font-medium text-gray-500">Interest Rate</div>
												<div className="text-lg font-semibold text-[#396131]">{account.interestRate}</div>
											</div>
										</div>

										<div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
											<div>
												<h4 className="mb-3 text-sm font-semibold text-gray-800">Features:</h4>
												<ul className="space-y-2">
													{account.features.map((feature, featureIndex) => (
														<li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
															<div className="h-1.5 w-1.5 rounded-full bg-[#396131]"></div>
															{feature}
														</li>
													))}
												</ul>
											</div>
											<div>
												<h4 className="mb-3 text-sm font-semibold text-gray-800">Benefits:</h4>
												<ul className="space-y-2">
													{account.benefits.map((benefit, benefitIndex) => (
														<li key={benefitIndex} className="flex items-center gap-2 text-sm text-gray-600">
															<div className="h-1.5 w-1.5 rounded-full bg-[#396131]"></div>
															{benefit}
														</li>
													))}
												</ul>
											</div>
										</div>

										<button className="w-full rounded-lg bg-gradient-to-r from-[#396131] to-[#4a7c3a] px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg lg:w-auto">
											Open Account
										</button>
									</div>
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
								What you need to open a checking account
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
										<span>Proof of income (payslip, ITR, etc.)</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-green-300"></div>
										<span>Initial deposit amount</span>
									</li>
								</ul>
							</div>

							<div className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
								<div className="mb-6 flex items-center gap-4">
									<Building className="h-8 w-8 text-green-300" />
									<h3 className="text-xl font-bold">Business Requirements</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-green-300"></div>
										<span>SEC Certificate of Registration</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-green-300"></div>
										<span>Articles of Incorporation</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-green-300"></div>
										<span>Board Resolution for account opening</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-green-300"></div>
										<span>Valid IDs of authorized signatories</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-green-300"></div>
										<span>Business Permit</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 rounded-full bg-green-300"></div>
										<span>Financial statements (if applicable)</span>
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
