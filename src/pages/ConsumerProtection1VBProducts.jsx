import React from 'react';
import {
	faArrowUpRightDots,
	faBreadSlice,
	faBuilding,
	faCashRegister,
	faCodeBranch,
	faCoins,
	faCommentsDollar,
	faCreditCard,
	faFileInvoiceDollar,
	faGem,
	faGraduationCap,
	faHandHoldingHand,
	faHandsHoldingChild,
	faHandSparkles,
	faHouseLaptop,
	faLeaf,
	faLightbulb,
	faMagnifyingGlassDollar,
	faMobile,
	faMoneyBillTransfer,
	faMoneyBillTrendUp,
	faMoneyBillWheat,
	faNetworkWired,
	faPhone,
	faPiggyBank,
	faPlusCircle,
	faSackDollar,
	faTractor,
	faTrophy,
	faUsersGear,
	faWheatAwn
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

export default function ConsumerProtection1VBProducts() {
	const loans = [
		{
			type: 'AGRICULTURE',
			logo: faWheatAwn,
			description:
				'Sow success with 1st Valley Bank Agri Loans—fast funds, low rates, and support to help your farm thrive!',
			path: '/loans/agriculture'
		},
		{
			type: 'GOLD & GEMS',
			logo: faGem,
			description:
				'Turn your gold and gems into quick cash! Secure, hassle-free loans with low rates to meet your urgent financial needs',
			path: '/loans/gold-and-gems'
		},
		{
			type: 'MICROFINANCE',
			logo: faHouseLaptop,
			description:
				'Start small, dream big! Get fast, affordable microfinance loans to jumpstart and grow your small business with confidence',
			path: '/loans/microfinance'
		},
		{
			type: 'SALARY',
			logo: faCommentsDollar,
			description:
				'Need cash before payday? Get quick approval, low rates, and flexible terms with 1st Valley Bank’s Salary Loans today!',
			path: '/loans/salary'
		},
		{
			type: 'SBL',
			logo: faBreadSlice,
			description:
				'Fuel your business growth with easy-access loans. Upgrade, expand, or boost working capital hassle-free and fast',
			path: '/loans/small-business-loan'
		},
		{
			type: 'SME',
			logo: faTractor,
			description:
				'Take your SME to the next level with flexible financing, competitive rates, and support designed for business success',
			path: '/loans/small-and-medium-enterprises'
		},
		{
			type: 'SUCRE',
			logo: faMoneyBillWheat,
			description:
				'Grow your farm smarter! Agri loans with funds, technical help, and flexible repayment to boost your harvest and income',
			path: '/loans/supervised-credit'
		}
	];

	const depositsFeatures = [
		{ feature: 'Regular Savings', icon: faPiggyBank },
		{ feature: 'ATM Savings', icon: faCreditCard },
		{ feature: 'Kiddie & Teen Savings', icon: faHandsHoldingChild },
		{ feature: 'Basic Deposit', icon: faMoneyBillTransfer },
		{ feature: 'Payroll Servicing Deposit', icon: faSackDollar },
		{ feature: 'Student ATM Savings', icon: faGraduationCap },
		{ feature: 'Special Savings Deposit', icon: faMagnifyingGlassDollar }
	];

	return (
		<>
			<main className="flex flex-col gap-[40px] pb-[50px] lg:gap-[80px]">
				<section
					id="main"
					className="mx-[5px] flex flex-col-reverse rounded-[8px] bg-white text-[#396131] drop-shadow-lg lg:mx-[10px] lg:flex-row lg:py-[50px]"
				>
					<div className="mx-[10px] flex flex-col gap-[20px] p-[20px] lg:w-3/5 lg:px-[60px] lg:py-[80px]">
						<div className="flex flex-col gap-[20px]">
							<span className="text-[2rem]/[2rem] font-bold lg:text-[4rem]/[4rem]">
								Consumer Protection
							</span>
							<span className="text-[1.5rem]/[1.5rem] font-semibold lg:text-[3rem]/[3rem]">
								1VB Products
							</span>
						</div>
						<span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
							At 1st Valley Bank, your protection starts with every product we offer. Our Consumer
							Protection: 1VB Products initiative ensures that each loan, deposit, and service is
							designed with fairness, transparency, and your best interest in mind. Know your
							rights, stay informed, and bank with confidence—because you deserve nothing less.
						</span>
					</div>
					<div className="flex items-center justify-center lg:w-2/5">
						<FontAwesomeIcon
							icon={faGem}
							className="flex aspect-square"
							style={{ width: '60%', height: 'auto' }}
						/>
					</div>
				</section>
				<section id="loans" className="relative overflow-hidden py-16 lg:py-24">
					{/* Background decoration */}
					<div className="absolute inset-0 opacity-40">
						<div className="absolute inset-0 bg-gradient-to-br from-[#396131]/5 via-transparent to-[#396131]/10"></div>
					</div>

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
							{loans.map((loan, index) => (
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
													<FontAwesomeIcon
														icon={loan.logo}
														className="text-3xl text-white lg:text-4xl"
													/>
												</div>
												{/* Decorative ring */}
												<div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#396131]/20 to-[#4a7a3f]/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"></div>
											</div>

											{/* Content */}
											<div className="flex-1 text-center sm:text-left">
												<h3 className="mb-3 text-xl font-bold text-[#396131] transition-colors duration-300 group-hover:text-[#4a7a3f] lg:text-2xl">
													{loan.type}
												</h3>
												<p className="mb-6 text-sm leading-relaxed text-gray-600 lg:text-base">
													{loan.description}
												</p>

												{/* CTA Button */}
												<NavLink
													to={loan.path}
													className="group/btn inline-flex transform items-center justify-center rounded-xl bg-[#396131] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#4a7a3f] hover:shadow-xl focus:ring-4 focus:ring-[#396131]/25 focus:outline-none"
												>
													<span className="mr-2">Learn More</span>
													<svg
														className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M9 5l7 7-7 7"
														/>
													</svg>
												</NavLink>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
				<section
					id="deposits"
					data-scroll
					className="relative mx-4 overflow-hidden rounded-3xl bg-gradient-to-br from-[#396131] to-[#2d4a26] py-16 text-white shadow-2xl sm:mx-6 lg:mx-8 lg:py-20"
				>
					{/* Background decorative elements */}
					<div className="absolute inset-0 opacity-10">
						<div className="absolute top-10 right-10 h-32 w-32 rounded-full bg-white/20 blur-2xl"></div>
						<div className="absolute bottom-20 left-16 h-24 w-24 rounded-full bg-white/15 blur-xl"></div>
						<div className="absolute top-1/2 left-1/4 h-16 w-16 rounded-full bg-white/10 blur-lg"></div>
					</div>

					<div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
						{/* Section Header */}
						<div className="mb-16 text-center lg:mb-20">
							<h2 className="mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl xl:text-5xl">
								1VB Deposits: Safe, Secure, and Rewarding
							</h2>
							<div className="mx-auto h-1 w-24 rounded-full bg-white/80"></div>
						</div>

						{/* Main Deposit Types */}
						<div className="mb-16 grid grid-cols-1 gap-8 lg:mb-20 lg:grid-cols-2 lg:gap-12">
							{/* Regular Deposits */}
							<div className="group transform rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 lg:p-8">
								<div className="flex h-full flex-col items-center gap-6 sm:flex-row sm:items-start lg:gap-8">
									{/* Icon Container */}
									<div className="relative flex-shrink-0">
										<div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 lg:h-32 lg:w-32">
											<FontAwesomeIcon
												icon={faPiggyBank}
												className="text-4xl text-white lg:text-5xl"
											/>
										</div>
										<div className="absolute -inset-2 rounded-3xl bg-white/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"></div>
									</div>

									{/* Content */}
									<div className="flex h-full flex-1 flex-col justify-between text-center sm:text-left">
										<div className="flex-1">
											<h3 className="mb-4 text-xl font-bold lg:mb-6 lg:text-2xl">Regular</h3>
											<div className="mb-6 space-y-3 lg:mb-8 lg:space-y-4">
												<div className="flex items-center justify-center gap-3 sm:justify-start">
													<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
														<FontAwesomeIcon icon={faPlusCircle} className="text-sm text-white" />
													</div>
													<span className="text-sm font-semibold lg:text-base">SD PLUS</span>
												</div>
												<div className="flex items-center justify-center gap-3 sm:justify-start">
													<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
														<FontAwesomeIcon
															icon={faFileInvoiceDollar}
															className="text-sm text-white"
														/>
													</div>
													<span className="text-sm font-semibold lg:text-base">
														1ST CHECKING ACCOUNT
													</span>
												</div>
											</div>
										</div>
										<NavLink
											to="/deposits/regular-savings"
											className="group/btn inline-flex transform items-center justify-center rounded-xl bg-white px-6 py-3 font-bold text-[#396131] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-xl focus:ring-4 focus:ring-white/25 focus:outline-none"
										>
											<span className="mr-2">Learn More</span>
											<svg
												className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</NavLink>
									</div>
								</div>
							</div>

							{/* Special Deposits */}
							<div className="group transform rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 lg:p-8">
								<div className="flex h-full flex-col items-center gap-6 sm:flex-row sm:items-start lg:gap-8">
									{/* Icon Container */}
									<div className="relative flex-shrink-0">
										<div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 lg:h-32 lg:w-32">
											<FontAwesomeIcon
												icon={faMoneyBillTransfer}
												className="text-4xl text-white lg:text-5xl"
											/>
										</div>
										<div className="absolute -inset-2 rounded-3xl bg-white/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"></div>
									</div>

									{/* Content */}
									<div className="flex h-full flex-1 flex-col justify-between text-center sm:text-left">
										<div className="flex-1">
											<h3 className="mb-4 text-xl font-bold lg:mb-6 lg:text-2xl">Special</h3>
											<div className="mb-6 space-y-3 lg:mb-8 lg:space-y-4">
												<div className="flex items-center justify-center gap-3 sm:justify-start">
													<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
														<FontAwesomeIcon icon={faCoins} className="text-sm text-white" />
													</div>
													<span className="text-sm font-semibold lg:text-base">SSD MICRO</span>
												</div>
												<div className="flex items-center justify-center gap-3 sm:justify-start">
													<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
														<FontAwesomeIcon
															icon={faMoneyBillTrendUp}
															className="text-sm text-white"
														/>
													</div>
													<span className="text-sm font-semibold lg:text-base">SSD REGULAR</span>
												</div>
												<div className="flex items-center justify-center gap-3 sm:justify-start">
													<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
														<FontAwesomeIcon
															icon={faFileInvoiceDollar}
															className="text-sm text-white"
														/>
													</div>
													<span className="text-sm font-semibold lg:text-base">HANDOG SAVINGS</span>
												</div>
												<div className="flex items-center justify-center gap-3 sm:justify-start">
													<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
														<FontAwesomeIcon
															icon={faFileInvoiceDollar}
															className="text-sm text-white"
														/>
													</div>
													<span className="text-sm font-semibold lg:text-base">BASIC SAVINGS</span>
												</div>
											</div>
										</div>
										<NavLink
											to="/deposits/special-savings"
											className="group/btn inline-flex transform items-center justify-center rounded-xl bg-white px-6 py-3 font-bold text-[#396131] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-xl focus:ring-4 focus:ring-white/25 focus:outline-none"
										>
											<span className="mr-2">Learn More</span>
											<svg
												className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</NavLink>
									</div>
								</div>
							</div>
						</div>

						{/* Features Grid */}
						<div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:p-8">
							<div className="mb-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:mb-10 lg:grid-cols-4 lg:gap-8">
								{depositsFeatures.map((deposit, index) => (
									<div
										key={index}
										className="group flex transform flex-col items-center gap-3 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 lg:gap-4"
									>
										<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 lg:h-20 lg:w-20">
											<FontAwesomeIcon
												icon={deposit.icon}
												className="text-2xl text-white lg:text-3xl"
											/>
										</div>
										<span className="text-sm leading-tight font-semibold lg:text-base">
											{deposit.feature}
										</span>
									</div>
								))}
							</div>

							{/* Main CTA */}
							<div className="text-center">
								<NavLink
									to="/deposits"
									className="group/btn inline-flex transform items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-[#396131] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-xl focus:ring-4 focus:ring-white/25 focus:outline-none"
								>
									<span className="mr-2">Learn More About All Deposits</span>
									<svg
										className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</NavLink>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
