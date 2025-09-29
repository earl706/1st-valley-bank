import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, CreditCard, Building, User, DollarSign, CheckCircle } from 'lucide-react';
import CarouselSection from '../components/CarouselSection';
import img from '/src/assets/homepage/heroSectionImage.png';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';

export default function CheckingAccount() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');

	const checkingAccounts = [
		{
			title: 'Personal Checking Account',
			description:
				'Perfect for individuals who need frequent access to their funds with check-writing capabilities and convenient banking services.',
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
			],
			image: carouselImg1,
			route: '/contact-us'
		},
		{
			title: 'Business/Corporate Checking Account',
			description:
				'Designed for businesses and corporations that require comprehensive banking services with multiple signatories and enhanced features.',
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
			],
			image: carouselImg2,
			route: '/contact-us'
		},
		{
			title: 'Premium Checking Account',
			description:
				'Our premium checking account offers enhanced benefits, higher transaction limits, and exclusive services for high-value customers.',
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
			],
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
								Checking Account
							</span>
							<span className="block bg-gradient-to-r from-[#396131] via-[#4a7c3a] to-[#5a8c4a] bg-clip-text text-2xl leading-tight font-bold text-transparent sm:text-3xl lg:text-4xl">
								Convenient business banking
							</span>
						</>
					}
					description="Professional checking solutions designed for businesses and individuals who need frequent transactions and check-writing capabilities."
					stats={[
						{ icon: <CheckCircle className="h-4 w-4" />, label: '3 Account Types' },
						{ icon: <DollarSign className="h-4 w-4" />, label: 'Check Writing' }
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
					slides={checkingAccounts}
				/>

				{/* Accounts Section */}
				<section id="accounts" data-scroll className="text-[#396131]">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-16 text-center">
							<h2 className="mb-4 text-4xl font-bold text-[#396131] md:text-5xl lg:text-6xl">
								CHECKING ACCOUNTS
							</h2>
							<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#396131] to-[#4a7a3f]"></div>
							<p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
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
										<img
											src={account.image}
											alt={`${account.title} visual`}
											className="h-48 w-auto object-contain lg:h-64"
										/>
									</div>

									<div className="flex-1">
										<h3 className="mb-4 text-2xl font-bold text-gray-900">{account.title}</h3>

										<p className="mb-6 leading-relaxed text-gray-600">{account.description}</p>

										<div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
											<div className="rounded-lg bg-gray-50 p-4">
												<div className="text-sm font-medium text-gray-500">Initial Deposit</div>
												<div className="text-lg font-semibold text-[#396131]">
													{account.initialDeposit}
												</div>
											</div>
											<div className="rounded-lg bg-gray-50 p-4">
												<div className="text-sm font-medium text-gray-500">Minimum Balance</div>
												<div className="text-lg font-semibold text-[#396131]">
													{account.minimumBalance}
												</div>
											</div>
											<div className="rounded-lg bg-gray-50 p-4">
												<div className="text-sm font-medium text-gray-500">Interest Rate</div>
												<div className="text-lg font-semibold text-[#396131]">
													{account.interestRate}
												</div>
											</div>
										</div>

										{/* <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
											<div>
												<h4 className="mb-3 text-sm font-semibold text-gray-800">Features:</h4>
												<ul className="space-y-2">
													{account.features.map((feature, featureIndex) => (
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
											<div>
												<h4 className="mb-3 text-sm font-semibold text-gray-800">Benefits:</h4>
												<ul className="space-y-2">
													{account.benefits.map((benefit, benefitIndex) => (
														<li
															key={benefitIndex}
															className="flex items-center gap-2 text-sm text-gray-600"
														>
															<div className="h-1.5 w-1.5 rounded-full bg-[#396131]"></div>
															{benefit}
														</li>
													))}
												</ul>
											</div>
										</div> */}

										<NavLink
											to={account.route}
											className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-[#396131] to-[#4a7c3a] px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg lg:w-auto"
										>
											Open Account
										</NavLink>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Requirements Section */}
				<section id="requirements" data-scroll className="border-gray-200 bg-white text-gray-900">
					<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
						<div className="mb-12 text-center">
							<h2 className="mb-2 text-3xl font-bold sm:text-4xl">Account Opening Requirements</h2>
							<p className="text-lg text-gray-500">What you need to open a checking account</p>
						</div>

						<div className="grid gap-8 md:grid-cols-2">
							<div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
								<div className="mb-6 flex items-center gap-4">
									<User className="h-8 w-8 text-gray-400" />
									<h3 className="text-xl font-bold">Individual Requirements</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>Colored photocopy of 2 Valid IDs</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>Three pieces 2x2 pictures</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>Proof of income (payslip, ITR, etc.)</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>Initial deposit amount</span>
									</li>
								</ul>
							</div>

							<div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
								<div className="mb-6 flex items-center gap-4">
									<Building className="h-8 w-8 text-gray-400" />
									<h3 className="text-xl font-bold">Business Requirements</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>SEC Certificate of Registration</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>Articles of Incorporation</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>Board Resolution for account opening</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>Valid IDs of authorized signatories</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span>Business Permit</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
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
