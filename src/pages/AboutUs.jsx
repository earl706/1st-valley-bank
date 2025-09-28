import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons/faBuildingColumns';
import logo from '/src/assets/logo.png';

import img1 from '/src/assets/about-us/1.jpg';
import img2 from '/src/assets/about-us/2.png';
import img3 from '/src/assets/about-us/3.png';
import img4 from '/src/assets/about-us/4.png';
import img5 from '/src/assets/about-us/5.jpg';
import img6 from '/src/assets/about-us/6.png';
import img7 from '/src/assets/about-us/7.jpg';
import img8 from '/src/assets/about-us/8.jpg';
import img9 from '/src/assets/about-us/9.jpg';
import { NavLink } from 'react-router-dom';
import { faWheatAwn } from '@fortawesome/free-solid-svg-icons/faWheatAwn';
import CorporateProfile from '../components/CorporateProfile';
import {
	faArrowUpRightDots,
	faBreadSlice,
	faBuilding,
	faBuildingFlag,
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
	faSeedling,
	faTractor,
	faTrophy,
	faUsersGear
} from '@fortawesome/free-solid-svg-icons';

export default function AboutUs() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');

	const [imageLoaded1, setImageLoaded1] = useState(false);
	const [imageLoaded2, setImageLoaded2] = useState(false);
	const [imageLoaded3, setImageLoaded3] = useState(false);
	const [imageLoaded4, setImageLoaded4] = useState(false);

	// Sample images - replace with your actual img2 and img3
	// const img2 =
	//   "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=458&h=380&fit=crop";
	// const img3 =
	//   "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=458&h=380&fit=crop";

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

	const services = [
		{
			name: 'BRANCH NETWORKING',
			icon: faCodeBranch,
			description:
				'1VB clients will enjoy utmost convenience through inter-branch transactions such as deposit withdrawal, loan payment and check encashment. The Bank is operating on a vast network of 78 branches and branch lite units in Mindanao and certain areas in the Visayan Region.'
		},
		{
			name: 'GCASH SERVICES',
			icon: faMobile,
			description:
				'The revolutionary power of mobile commerce is available to 1VB clients through the G-Cash platform. With G-Cash, clients can pay their bills, send and receive remittances, deposit money, withdraw cash, buy or transfer load conveniently without the time restrictions of conventional banking.'
		},
		{
			name: 'ATM SERVICES',
			icon: faCashRegister,
			description:
				'Through the ENCASH Network Services, 1st Valley Bank provides ATM services to our clients 24/7. Interconnected with BANCNET, MEGALINK, and EXPRESSNET, 1Vas ATM services allow their holders to self-manage their withdrawal and real-time balances transactions.'
		}
	];

	const awards = [
		{
			header: "Landbank's GOLDEN AWARD",
			description:
				"Recipient of the Landbank's GOLDEN AWARD for sustaining highly sound and profitable operations "
		},
		{
			header: 'MOST VALUED LOCAL PARTNER',
			description:
				'As recognized by the Department of Agriculture through the Philippine Crop Insurance Corporation (PCIC).'
		},
		{
			header: 'MOST OUTSTANDING PARTNER',
			description: "From the People's Credit & Finance Corporation"
		},
		{
			header: 'MOST OUTSTANDING PARTNER',
			description: 'From the MFTransparency for responsible and transparent pricing'
		},
		{
			header: '3RD LARGEST RURAL BANK in the country',
			description:
				'Ranked as the 3RD LARGEST RURAL BANK in the country by the Rural Bankers Association of the Philippines (RBAP), and association whose goal is to promote rural development '
		}
	];

	const corporateProfile = {
		senior_management: [
			{
				name: 'Nicolette Lim-Gica',
				position: 'VICE PRESIDENT FOR OPERATIONS',
				image: logo
			},
			{ name: 'Glenn A. Mendez', position: 'CHIEF OF STAFF', image: logo },
			{
				name: 'Anavic A. Sarsale',
				position: 'VICE PRESIDENT FOR FINANCE',
				image: logo
			},
			{
				name: 'Alfredo F. Girbes',
				position: 'BUSINESS DEVELOPMENT HEAD',
				image: logo
			},
			{
				name: 'Atty. Samuel Ryan C. Rudinas',
				position: 'CHIEF LEGAL OFFICER',
				image: logo
			},
			{
				name: 'Atty. Zara Teodora D. Cabanlet',
				position: 'CORPORATE SECRETARY',
				image: logo
			},
			{ name: 'Vivian V. Lim', position: 'HR DIRECTOR', image: logo },
			{ name: 'Emily E. Enad', position: 'CHIEF RISK OFFICER', image: logo },
			{
				name: 'Benjie Tadeo M. Abad, Jr.',
				position: 'CHIEF COMPLIANCE OFFICER',
				image: logo
			},
			{
				name: 'Onisimo L. Prado',
				position: 'CHIEF INTERNAL AUDITOR',
				image: logo
			},
			{ name: 'Felizardo A. Enad', position: 'IT DIRECTOR', image: logo },
			{ name: 'Annie Lisa G. Estrera', position: 'CREDIT HEAD', image: logo },
			{ name: 'Estrella E. Florida', position: 'COMPTROLLER', image: logo }
		],
		product_management: [
			{
				name: 'Bernard C. Paderes',
				position: 'SMALL & MEDIUM ENTERPRISE LOANS',
				image: logo
			},
			{
				name: 'Errol C. Dioso',
				position: 'SUPERVISED CREDIT',
				image: logo
			},
			{
				name: 'Muamar Carba Yap',
				position: 'AGRICULTURAL LOANS',
				image: logo
			},
			{
				name: 'Andre M. Ates',
				position: 'MICROFINANCE & JEWELRY LOANS',
				image: logo
			},
			{
				name: 'Jubal Y. Yu',
				position: 'SALARY LOANS',
				image: logo
			},
			{
				name: 'Stella Maris S. Aranas',
				position: 'DEPOSIT',
				image: logo
			},
			{
				name: 'Glenn G. Bagaloyos',
				position: 'LANAO AURORA',
				image: logo
			},
			{
				name: 'Hazel O. Geromo',
				position: 'MISAMIS ORIENTAL',
				image: logo
			},
			{
				name: 'Peter M. Alfon',
				position: 'ZAMBOANGA SIBUGAY 1',
				image: logo
			},
			{
				name: 'Romulo P. Fiel',
				position: 'VISAYAS',
				image: logo
			},
			{
				name: 'Cecil C. Palenzuela',
				position: 'COTABATO DAVAO',
				image: logo
			},
			{
				name: 'Jamael M. Dangnan',
				position: 'MISAMIS ORIENTAL CDO',
				image: logo
			},
			{
				name: 'Samson Cababan, Jr.',
				position: 'ZAMBOANGA SIBUGAY 2',
				image: logo
			},
			{
				name: 'Frederick I. Paringit',
				position: 'CARAGA DAVAO NORTH',
				image: logo
			},
			{
				name: 'Heracleo Gaan, Jr.',
				position: 'BUKIDNON SOUTH',
				image: logo
			},
			{
				name: 'Christopher M. Obedencio',
				position: 'BUKIDNON NORTH',
				image: logo
			}
		]
	};

	const annualReports = [
		{
			title: 'ANNUAL REPORT 2023',
			corporate_highlights: ['One-Stop-Shop', 'Personalized Services', 'Right Financial Solutions'],
			key_figures: [
				'Total Resources: ₱10.99 billion',
				'Net Income: Over ₱200 million',
				'Loan-to-Deposit Ratio: 1:1',
				'High Liquidity'
			],
			comparative_growth: [
				'Loans: ₱7.3 billion → ₱7.4 billion',
				'Deposits: ₱7.3 billion → ₱7.4 billion',
				'Net Interest Income: ₱983.7 million',
				'Net Income: ₱224.9 million'
			],
			path: '/',
			image: img8
		},
		{
			title: 'ANNUAL REPORT 2023',
			corporate_highlights: ['One-Stop-Shop', 'Personalized Services', 'Right Financial Solutions'],
			key_figures: [
				'Total Resources: ₱10.99 billion',
				'Net Income: Over ₱200 million',
				'Loan-to-Deposit Ratio: 1:1',
				'High Liquidity'
			],
			comparative_growth: [
				'Loans: ₱7.3 billion → ₱7.4 billion',
				'Deposits: ₱7.3 billion → ₱7.4 billion',
				'Net Interest Income: ₱983.7 million',
				'Net Income: ₱224.9 million'
			],
			path: '/',
			image: img8
		},
		{
			title: 'ANNUAL REPORT 2023',
			corporate_highlights: ['One-Stop-Shop', 'Personalized Services', 'Right Financial Solutions'],
			key_figures: [
				'Total Resources: ₱10.99 billion',
				'Net Income: Over ₱200 million',
				'Loan-to-Deposit Ratio: 1:1',
				'High Liquidity'
			],
			comparative_growth: [
				'Loans: ₱7.3 billion → ₱7.4 billion',
				'Deposits: ₱7.3 billion → ₱7.4 billion',
				'Net Interest Income: ₱983.7 million',
				'Net Income: ₱224.9 million'
			],
			path: '/',
			image: img8
		},
		{
			title: 'ANNUAL REPORT 2023',
			corporate_highlights: ['One-Stop-Shop', 'Personalized Services', 'Right Financial Solutions'],
			key_figures: [
				'Total Resources: ₱10.99 billion',
				'Net Income: Over ₱200 million',
				'Loan-to-Deposit Ratio: 1:1',
				'High Liquidity'
			],
			comparative_growth: [
				'Loans: ₱7.3 billion → ₱7.4 billion',
				'Deposits: ₱7.3 billion → ₱7.4 billion',
				'Net Interest Income: ₱983.7 million',
				'Net Income: ₱224.9 million'
			],
			path: '/',
			image: img8
		},
		{
			title: 'ANNUAL REPORT 2023',
			corporate_highlights: ['One-Stop-Shop', 'Personalized Services', 'Right Financial Solutions'],
			key_figures: [
				'Total Resources: ₱10.99 billion',
				'Net Income: Over ₱200 million',
				'Loan-to-Deposit Ratio: 1:1',
				'High Liquidity'
			],
			comparative_growth: [
				'Loans: ₱7.3 billion → ₱7.4 billion',
				'Deposits: ₱7.3 billion → ₱7.4 billion',
				'Net Interest Income: ₱983.7 million',
				'Net Income: ₱224.9 million'
			],
			path: '/',
			image: img8
		},
		{
			title: 'ANNUAL REPORT 2023',
			corporate_highlights: ['One-Stop-Shop', 'Personalized Services', 'Right Financial Solutions'],
			key_figures: [
				'Total Resources: ₱10.99 billion',
				'Net Income: Over ₱200 million',
				'Loan-to-Deposit Ratio: 1:1',
				'High Liquidity'
			],
			comparative_growth: [
				'Loans: ₱7.3 billion → ₱7.4 billion',
				'Deposits: ₱7.3 billion → ₱7.4 billion',
				'Net Interest Income: ₱983.7 million',
				'Net Income: ₱224.9 million'
			],
			path: '/',
			image: img8
		}
	];

	const branchDirectories = [
		{
			image: img9,
			name: 'Baroy',
			location: 'Poblacion, Baroy,  Lanao del Norte',
			contact_numbers: '0917-849-6985 / 0955-512-2468 / 063-227-7142',
			email: 'baroy@1vb.com.ph'
		},
		{
			image: img9,
			name: 'Baroy',
			location: 'Poblacion, Baroy,  Lanao del Norte',
			contact_numbers: '0917-849-6985 / 0955-512-2468 / 063-227-7142',
			email: 'baroy@1vb.com.ph'
		},
		{
			image: img9,
			name: 'Baroy',
			location: 'Poblacion, Baroy,  Lanao del Norte',
			contact_numbers: '0917-849-6985 / 0955-512-2468 / 063-227-7142',
			email: 'baroy@1vb.com.ph'
		},
		{
			image: img9,
			name: 'Baroy',
			location: 'Poblacion, Baroy,  Lanao del Norte',
			contact_numbers: '0917-849-6985 / 0955-512-2468 / 063-227-7142',
			email: 'baroy@1vb.com.ph'
		},
		{
			image: img9,
			name: 'Baroy',
			location: 'Poblacion, Baroy,  Lanao del Norte',
			contact_numbers: '0917-849-6985 / 0955-512-2468 / 063-227-7142',
			email: 'baroy@1vb.com.ph'
		},
		{
			image: img9,
			name: 'Baroy',
			location: 'Poblacion, Baroy,  Lanao del Norte',
			contact_numbers: '0917-849-6985 / 0955-512-2468 / 063-227-7142',
			email: 'baroy@1vb.com.ph'
		}
	];

	// Track scroll position
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
			<main className="flex flex-col gap-[80px] pb-[50px] lg:gap-[120px]">
				<nav className="fixed top-35 right-4 z-40 rounded-2xl bg-white/50 p-2 backdrop-blur-lg">
					<div className="flex flex-col gap-2">
						{[
							'main',
							'description',
							'history',
							'marketing',
							'loans',
							'deposits',
							'services',
							'awards',
							'core-values',
							'branch-management',
							'corporate-profile',
							'annual-reports',
							'branch-directory'
						].map((section) => (
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

				<section
					id="main"
					data-scroll
					className="mx-[5px] rounded-[8px] bg-white px-[20px] py-[40px] drop-shadow-lg lg:mx-[15px] lg:px-[80px] lg:py-[40px]"
				>
					<div className="flex flex-col-reverse items-center justify-between gap-[20px] rounded-[8px] text-[#396131] lg:flex-row lg:gap-[50px]">
						<div className="flex flex-col items-start gap-[20px] lg:w-3/5 lg:gap-[60px]">
							<div className="flex flex-col gap-[20px]">
								<span className="text-[2rem] font-bold lg:text-[4rem]">About Us</span>
								<span className="text-[0.8rem]/[2.4rem] font-medium lg:text-[1rem]/[3rem]">
									Founded in 1956, 1st Valley Bank, A Development Bank, has a long and distinguished
									history of banking excellence. It started as a rural bank operating in Northern
									Mindanao before it grew exponentially as a development bank with 78 branches and
									branch lites in Mindanao and certain areas in the Visayas.
								</span>
							</div>
						</div>
						<div className="lg:w-2/5">
							<FontAwesomeIcon
								icon={faBuildingColumns}
								className="aspect-square"
								style={{ width: '100%', height: 'auto' }}
							/>
						</div>
					</div>
				</section>
				<section
					id="description"
					data-scroll
					className="mx-[10px] flex flex-col justify-end gap-[20px] rounded-[8px] bg-[#396131] p-[20px] drop-shadow-lg lg:flex-row lg:p-[80px]"
				>
					<div className="flex justify-center lg:w-1/2">
						<img src={img1} alt="" className="h-[600px] w-[556px] rounded-[12px] object-cover" />
					</div>
					<div className="flex flex-col gap-[10px] text-[0.8rem]/[2.4rem] text-white lg:w-1/2 lg:gap-[20px] lg:text-[1rem]/[3rem]">
						<span className="text-[2rem]/[2rem] font-bold lg:text-[4rem]/[4rem]">Bank Profile</span>
						<span>
							1st Valley Bank (1VB) is one of the largest independent developmental banks dedicated
							to fund development projects and businesses through the provision of loan capital.
							While the Bank's primary clients are entrepreneurs and farmers, it also serves the
							financial needs of teachers, barangay officials, regular employees of local government
							units, as well as individuals who are in need of fast cash.
						</span>
						<span>
							In 27 December 2019, the merger between 1st Valley Bank (1VB), Sugbuanon Rural Bank,
							Inc. (SRBI) and D'Asian Hills Bank, Inc. (DAHBI) has been declared as official with
							1VB as the surviving entity. With the completion of the merger, clients can expect
							greater customer service satisfaction.
						</span>
						<span>
							1st Valley Bank ranks 3rd in terms of assets, and is considered as one of the fastest
							development banks in the country. Its audited financial statements show that as of
							December 2019, the Bank has a total of Php10B+ resources.
						</span>
					</div>
				</section>
				<section
					id="history"
					data-scroll
					className="lg:gap-none mx-[10px] flex flex-col-reverse justify-between gap-[30px] rounded-[8px] p-[20px] lg:flex-row lg:p-[50px]"
				>
					<div className="flex flex-col gap-[10px] text-[#396131] lg:w-1/2 lg:gap-[30px]">
						<span className="text-[1.5rem]/[3rem] font-bold lg:text-[4rem]/[4rem]">
							Brief History
						</span>
						<div className="flex flex-col gap-[10px] text-[0.8rem]/[2.4rem] lg:gap-[20px] lg:text-[1rem]/[2.5rem]">
							<span>
								1st Valley Bank, a rapidly growing development bank in Mindanao and Visayas, traces
								its roots in the rural banking industry.
							</span>
							<span>
								1st Valley Bank was formerly known as the Rural Bank of Kapatagan Valley (RUBANKA)
								first, and then Kapatagan Valley Bank (KVB). It earned its license to operate on
								November 24,1956 and became the 75th rural bank in the country.
							</span>
							<span>
								On April 5, 1957, the Bank has earned its prestigious membership in the Rural Bank
								Association of the Philippines (RBAP).
							</span>
							<span>
								In April 2004, Kapatagan Valley Bank entered into a consolidation agreement with
								Rural Bank of Sinacaban. On August 30, 2005, the Securities and Exchange Commission
								(SEC) issued the Certificate of Consolidation and Certificate of Incorporation to
								the merging institutions. This official merger gave birth to 1st Valley Bank.
							</span>
							<span>
								On August 1, 2013, 1st Valley Bank has progressed into a development bank. It seeks
								to provide sufficient loan capital for productive investment along with technical
								assistance to help guarantee success of its borrowers.
							</span>
							<span>
								Today, following the successful completion of its merger with SRBI and DAHBI, IVB is
								operating on a vast network of 78 branches and branch lites.
							</span>
						</div>
					</div>
					<div className="flex h-full items-center gap-[10px] lg:w-1/2 lg:flex-col lg:gap-[40px]">
						<img
							src={img2}
							alt=""
							className="h-[180px] w-[200px] rounded-[12px] object-cover lg:h-[380px] lg:w-[458px]"
						/>
						<img
							src={img3}
							alt=""
							className="h-[180px] w-[200px] rounded-[12px] object-cover lg:h-[380px] lg:w-[458px]"
						/>
					</div>
				</section>
				<section
					id="marketing"
					data-scroll
					className="mx-[10px] flex flex-col gap-[60px] rounded-[8px] bg-[#396131] p-[20px] lg:p-[50px]"
				>
					<div className="flex flex-col gap-[50px] lg:flex-row">
						<div className="flex flex-col items-start lg:w-1/3">
							<img src={img4} alt="" className="h-[455px] w-[468px] rounded-[12px] object-cover" />
						</div>
						<div className="flex flex-col gap-[30px] text-white lg:w-2/3">
							<span className="text-[1.5rem]/[3rem] font-bold lg:text-[3rem]/[3rem]">
								Why do business with us?
							</span>
							<div className="flex flex-col gap-[10px] text-[0.8rem]/[2.4rem] lg:gap-[20px] lg:text-[1rem]/[2.5rem]">
								<span>
									There are so many reasons doing business with us will be profitable for you. Our
									long years in the industry, 64 years and counting, make us one of the most stable
									banks you can depend.
								</span>
								<span>
									1st Valley Bank is also known for its personalized services as it treats its
									clients as family and friends. You can even call the Bank as your lifetime friend.
								</span>
								<span>
									You're looking for a bank that can support your financial needs to grow your
									business? 1st Valley Bank offers a full range of services. You want convenience in
									banking? 1st Valley Bank delivers its services whenever and wherever you want it.
									Come and experience 1st Valley Bank!
								</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col-reverse gap-[30px] lg:flex-row lg:gap-[50px]">
						<div className="flex flex-col gap-[20px] text-white lg:w-3/5">
							<div className="flex flex-col">
								<span className="text-[1.5rem]/[3rem] font-bold lg:text-[3rem]/[5rem]">
									At 1st Valley Bank,
								</span>
								<span className="text-[1.5rem]/[3rem] font-bold lg:text-[3rem]/[5rem]">
									You're Always First
								</span>
							</div>
							<div className="flex flex-col gap-[10px] text-[0.8rem]/[2.4rem] lg:gap-[20px] lg:text-[1rem]/[2.5rem]">
								<span>
									There is nothing more important for 1st Valley Bank than to work with their
									clients to ensure that they benefit from the products and services of the Bank.
									The Bank sees to it that what they offer are financial solutions that match the
									needs of their clients.
								</span>
								<span>
									1st Valley Bank grows its business for its clients. Meeting the needs of their
									clients comes first for the Bank. All employees of the Bank work hard to deliver
									more value to the Bank's clients. They know that the time of their clients is
									valuable, and they do everything in their capacity to get their work done faster
									to deliver the products and services speedily.
								</span>
							</div>
						</div>
						<div className="flex flex-col items-start lg:w-2/5">
							<img src={img5} alt="" className="h-[507px] w-[468px] rounded-[12px] object-cover" />
						</div>
					</div>
				</section>

				{/* <section
          id="loans"
          data-scroll
          className="flex flex-col items-center text-[#396131] gap-[40px] mx-[10px] "
        >
          <p className="text-[4rem] text-center font-bold">LOANS</p>
          <div className="grid grid-cols-2 gap-x-[50px] gap-y-[80px] px-[80px]">
            {loans.map((loan, index) => (
              <div className="flex gap-[40px] items-center" key={index}>
                <div className="flex justify-center items-center w-1/2">
                  <FontAwesomeIcon
                    icon={loan.logo}
                    className="aspect-square"
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
                <div className="flex flex-col justify-between h-full w-1/2 gap-[30px]">
                  <div className="flex flex-col gap-[20px]">
                    <span className="font-bold text-[1.5rem]/[1.5rem]">
                      {loan.type}
                    </span>
                    <span className="text-[1rem]/[2.5rem]">
                      {loan.description}
                    </span>
                  </div>
                  <NavLink
                    to={loan.path}
                    className="w-full text-[1rem]/[1.5rem] text-white font-bold bg-[#396131] text-center py-[10px] rounded-[10px] transition-all transform duration-300 outline-0 ease-in-out outline-[#396131] hover:outline-1 hover:bg-white hover:text-[#396131] hover:scale-105"
                  >
                    Learn More
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </section> */}

				<section id="loans" data-scroll className="relative overflow-hidden py-16 lg:py-24">
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
				{/* <section
          id="deposits"
          data-scroll
          className="flex flex-col px-[50px] py-[50px] mx-[10px] gap-[85px] bg-[#396131] text-white drop-shadow-lg rounded-[8px]"
        >
          <div className="flex flex-col gap-[80px]">
            <p className="font-bold text-center text-[2rem]/[2rem]">
              1VB Deposits: Safe, Secure, and Rewarding
            </p>
            <div className="flex gap-[94px]">
              <div className="flex gap-[40px] w-1/2 h-[300px]">
                <div className="flex items-center justify-center w-1/2">
                  <FontAwesomeIcon
                    icon={faPiggyBank}
                    className="aspect-square"
                    style={{ width: "238px", height: "213px" }}
                  />
                </div>
                <div className="flex flex-col justify-between h-full w-1/2">
                  <div className="flex flex-col gap-[22px]">
                    <p className="text-[1.5rem] font-bold">Regular</p>
                    <div className="flex flex-col gap-[20px] font-bold text-[1rem]">
                      <div className="flex gap-[12px]">
                        <FontAwesomeIcon
                          icon={faPlusCircle}
                          className="aspect-square"
                          style={{ width: "26px", height: "27px" }}
                        />
                        <span>SD PLUS</span>
                      </div>
                      <div className="flex gap-[12px]">
                        <FontAwesomeIcon
                          icon={faFileInvoiceDollar}
                          className="aspect-square"
                          style={{ width: "26px", height: "27px" }}
                        />
                        <span>1ST CHECKING ACCOUNT</span>
                      </div>
                    </div>
                  </div>
                  <NavLink
                    to="/deposits/regular-savings"
                    className="w-full text-center font-bold bg-white text-[#396131] outline-0 outline-white py-[10px] rounded-[10px] transition-all transform duration-300 ease-in-out hover:outline-1 hover:text-white hover:bg-[#396131] hover:scale-105"
                  >
                    Learn More
                  </NavLink>
                </div>
              </div>
              <div className="flex gap-[40px] w-1/2 h-[300px]">
                <div className="flex items-center justify-center w-1/2">
                  <FontAwesomeIcon
                    icon={faMoneyBillTransfer}
                    className="aspect-square"
                    style={{ width: "256px", height: "205px" }}
                  />
                </div>
                <div className="flex flex-col justify-between w-1/2 h-full">
                  <div className="flex flex-col gap-[22px]">
                    <p className="text-[1.5rem] font-bold">Special</p>
                    <div className="flex flex-col gap-[20px] font-bold text-[1rem]">
                      <div className="flex gap-[12px]">
                        <FontAwesomeIcon
                          icon={faCoins}
                          className="aspect-square"
                          style={{ width: "26px", height: "27px" }}
                        />
                        <span>SSD MICRO</span>
                      </div>
                      <div className="flex gap-[12px]">
                        <FontAwesomeIcon
                          icon={faMoneyBillTrendUp}
                          className="aspect-square"
                          style={{ width: "26px", height: "27px" }}
                        />
                        <span>SSD REGULAR</span>
                      </div>
                      <div className="flex gap-[12px]">
                        <FontAwesomeIcon
                          icon={faFileInvoiceDollar}
                          className="aspect-square"
                          style={{ width: "26px", height: "27px" }}
                        />
                        <span>HANDOG SAVINGS</span>
                      </div>
                      <div className="flex gap-[12px]">
                        <FontAwesomeIcon
                          icon={faFileInvoiceDollar}
                          className="aspect-square"
                          style={{ width: "26px", height: "27px" }}
                        />
                        <span>BASIC SAVINGS</span>
                      </div>
                    </div>
                  </div>
                  <NavLink
                    to="/deposits/special-savings"
                    className="w-full text-center font-bold bg-white text-[#396131] outline-0 outline-white py-[10px] rounded-[10px] transition-all transform duration-300 ease-in-out hover:outline-1 hover:text-white hover:bg-[#396131] hover:scale-105"
                  >
                    Learn More
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[50px] w-full">
            <div className="grid grid-cols-4 gap-y-[60px] font-bold text-[1rem]">
              {depositsFeatures.map((deposit, index) => (
                <div
                  className="flex flex-col items-center gap-[30px]"
                  key={index}
                >
                  <FontAwesomeIcon
                    icon={deposit.icon}
                    className="aspect-square"
                    style={{ width: "80px", height: "71px" }}
                  />
                  <span>{deposit.feature}</span>
                </div>
              ))}
            </div>
            <NavLink
              to="/deposits"
              className="w-full text-center font-bold bg-white text-[#396131] outline-0 outline-white py-[10px] rounded-[10px] transition-all transform duration-300 ease-in-out hover:outline-1 hover:text-white hover:bg-[#396131] hover:scale-101"
            >
              Learn More
            </NavLink>
          </div>
        </section> */}
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
				{/* <section
          id="services"
          data-scroll
          className="flex flex-col gap-[50px] p-[50px] text-[#396131]"
        >
          <p className="font-bold text-[4rem]/[4rem] text-center">SERVICES</p>
          <div className="grid grid-cols-3 gap-x-[25px]">
            {services.map((service, index) => (
              <div className="flex flex-col justify-center items-center gap-[20px]">
                <div className="flex flex-col justify-center items-center gap-[50px]">
                  <FontAwesomeIcon
                    icon={service.icon}
                    className="aspect-square"
                    style={{ width: "208px", height: "238px" }}
                  />
                  <span className="font-bold text-[1.5rem]/[1.5rem]">
                    {service.name}
                  </span>
                </div>
                <span className="text-[1rem]/[2rem]">
                  {service.description}
                </span>
              </div>
            ))}
          </div>
        </section> */}
				<section id="services" data-scroll className="relative overflow-hidden py-16 lg:py-24">
					{/* Background decoration */}
					<div className="absolute inset-0 opacity-40">
						<div className="absolute inset-0 bg-gradient-to-br from-[#396131]/5 via-transparent to-[#396131]/10"></div>
						<div className="absolute top-20 right-20 h-40 w-40 rounded-full bg-[#396131]/10 blur-3xl"></div>
						<div className="absolute bottom-32 left-16 h-32 w-32 rounded-full bg-[#396131]/15 blur-2xl"></div>
					</div>

					<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						{/* Section Header */}
						<div className="mb-16 text-center lg:mb-20">
							<h2 className="mb-6 text-4xl font-bold text-[#396131] md:text-5xl lg:text-6xl">
								SERVICES
							</h2>
							<div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#396131] to-[#4a7a3f]"></div>
							<p className="mx-auto max-w-2xl text-lg text-gray-600">
								Comprehensive financial solutions designed to meet all your banking needs
							</p>
						</div>

						{/* Services Grid */}
						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
							{services.map((service, index) => (
								<div
									key={index}
									className="group relative transform overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl lg:p-10"
								>
									{/* Card gradient overlay */}
									<div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#396131]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

									{/* Decorative corner accent */}
									<div className="absolute top-0 right-0 h-16 w-16 rounded-bl-3xl bg-gradient-to-br from-[#396131]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

									<div className="relative text-center">
										{/* Icon Container */}
										<div className="mb-8 lg:mb-10">
											<div className="relative inline-block">
												<div className="mx-auto flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-[#396131] to-[#4a7a3f] shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 lg:h-40 lg:w-40">
													<FontAwesomeIcon
														icon={service.icon}
														className="text-4xl text-white lg:text-5xl"
													/>
												</div>
												{/* Floating ring animation */}
												{/* <div className="absolute -inset-4 bg-gradient-to-br from-[#396131]/20 to-[#4a7a3f]/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm scale-110 group-hover:scale-125"></div> */}
												{/* Pulse effect */}
												{/* <div className="absolute -inset-2 bg-[#396131]/10 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div> */}
											</div>
										</div>

										{/* Content */}
										<div className="space-y-4 lg:space-y-6">
											<h3 className="text-xl font-bold text-[#396131] transition-colors duration-300 group-hover:text-[#4a7a3f] lg:text-2xl">
												{service.name}
											</h3>

											<div className="mx-auto h-0.5 w-12 rounded-full bg-gradient-to-r from-[#396131] to-[#4a7a3f] opacity-60 transition-all duration-300 group-hover:w-16 group-hover:opacity-100"></div>

											<p className="text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700 lg:text-base">
												{service.description}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
				{/* <section
          id="awards"
          data-scroll
          className="flex flex-col gap-[30px] mx-[10px] p-[50px] text-[#396131]"
        >
          <div className="flex gap-[50px] items-center">
            <div className="flex justify-center items-start w-1/2">
              <FontAwesomeIcon
                icon={faTrophy}
                className="aspect-square"
                style={{ width: "564px", height: "501px" }}
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-[30px] w-1/2">
              <p className="text-[4rem]/[7rem] font-bold">
                AWARDS & RECOGNITION
              </p>
              <div className="flex flex-col gap-[40px]">
                <div className="flex flex-col gap-[20px]">
                  <span className="text-[2rem]/[2rem] font-bold">RATED A+</span>
                  <span className="text-[1rem]/[2rem]">
                    By PhilRatings, a pioneer domestic credit rating agency
                    recognized by the Bangko Sentral ng Pilipinas (BSP).{" "}
                  </span>
                </div>
                <div className="flex flex-col gap-[20px]">
                  <span className="text-[2rem]/[2rem] font-bold">
                    EAGLE AWARD FOR MICROFINANCE{" "}
                  </span>
                  <span className="text-[1rem]/[2rem]">
                    Bestowed by the U.S. Agency for International Development
                    through the RBAP-implemented MABS, a program that assists
                    rural banks in increasing their financial services to the
                    microenterprise sector.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-[50px] gap-y-[40px]">
            {awards.map((award, index) => (
              <div className="flex flex-col gap-[20px]" key={index}>
                <span className="text-[2rem]/[2rem] font-bold">
                  {award.header}
                </span>
                <span className="text-[1rem]/[2rem]">{award.description}</span>
              </div>
            ))}
          </div>
        </section> */}
				<section id="awards" data-scroll className="relative bg-white/80 py-8 lg:py-12">
					<div className="mx-auto max-w-5xl px-2 sm:px-4">
						{/* Header & Trophy */}
						<div className="flex flex-col-reverse items-center gap-6 md:flex-row md:gap-8">
							{/* Content */}
							<div className="flex-1 text-center md:text-left">
								<h2 className="mb-2 text-2xl font-bold text-[#396131] sm:text-3xl">
									Awards & Recognition
								</h2>
								<div className="mx-auto mb-4 h-1 w-16 rounded-full bg-[#396131] md:mx-0"></div>
								{/* Featured Awards */}
								<div className="flex flex-col gap-4">
									<div className="flex items-start gap-3 rounded-xl bg-white/90 p-4 shadow-sm">
										<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#396131]">
											<span className="text-base font-bold text-white">A+</span>
										</div>
										<div>
											<span className="mb-1 block text-base font-semibold text-[#396131]">
												RATED A+
											</span>
											<p className="text-sm text-gray-700">
												By PhilRatings, a pioneer domestic credit rating agency recognized by the
												Bangko Sentral ng Pilipinas (BSP).
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3 rounded-xl bg-white/90 p-4 shadow-sm">
										<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#396131]">
											<FontAwesomeIcon icon={faTrophy} className="text-base text-white" />
										</div>
										<div>
											<span className="mb-1 block text-base font-semibold text-[#396131]">
												EAGLE AWARD FOR MICROFINANCE
											</span>
											<p className="text-sm text-gray-700">
												Bestowed by the U.S. Agency for International Development through the
												RBAP-implemented MABS, a program that assists rural banks in increasing
												their financial services to the microenterprise sector.
											</p>
										</div>
									</div>
								</div>
							</div>
							{/* Trophy Icon */}
							<div className="mb-4 flex flex-1 justify-center md:mb-0 md:justify-end">
								<div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#396131] shadow-lg md:h-32 md:w-32">
									<FontAwesomeIcon icon={faTrophy} className="text-4xl text-white md:text-6xl" />
								</div>
							</div>
						</div>
						{/* Additional Awards Grid */}
						<div className="mt-8 rounded-2xl border border-amber-100 bg-white/70 p-4 shadow-md backdrop-blur-sm">
							<div className="mb-4 text-center">
								<h3 className="mb-1 text-lg font-bold text-[#396131]">More Achievements</h3>
								<div className="mx-auto h-0.5 w-10 rounded-full bg-[#396131]"></div>
							</div>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
								{awards.map((award, index) => (
									<div
										key={index}
										className="group flex items-start gap-3 rounded-xl border border-gray-100 bg-white/90 p-3 shadow-sm transition-all duration-200 hover:border-amber-200 hover:shadow-md"
									>
										<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#396131] transition-transform duration-200 group-hover:scale-105">
											<FontAwesomeIcon icon={faTrophy} className="text-xs text-white" />
										</div>
										<div className="flex-1">
											<span className="block text-sm font-semibold text-[#396131]">
												{award.header}
											</span>
											<p className="text-xs text-gray-700">{award.description}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section id="core-values" className="relative bg-white/80 py-8 lg:py-12">
					<div className="mx-auto max-w-5xl px-2 sm:px-4">
						{/* Vision & Mission - Compact Modern Layout */}
						<div className="flex flex-col-reverse items-center gap-8 md:flex-row md:gap-10">
							{/* Content */}
							<div className="flex-1 text-center md:text-left">
								<h2 className="mb-3 text-2xl font-bold text-[#396131] sm:text-3xl">
									Vision & Mission
								</h2>
								<div className="mx-auto mb-4 h-1 w-16 rounded-full bg-[#396131] md:mx-0"></div>
								<div className="flex flex-col gap-4">
									<div className="flex items-start gap-3 rounded-xl bg-white/90 p-4 shadow-sm">
										<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#396131]">
											<FontAwesomeIcon icon={faLightbulb} className="text-lg text-white" />
										</div>
										<div>
											<span className="mb-1 block text-base font-semibold text-[#396131]">
												Vision
											</span>
											<p className="text-sm text-gray-700">
												We envision to be the preferred banking institution in delivering innovative
												and customer-centered services.
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3 rounded-xl bg-white/90 p-4 shadow-sm">
										<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#396131]">
											<FontAwesomeIcon icon={faLeaf} className="text-lg text-white" />
										</div>
										<div>
											<span className="mb-1 block text-base font-semibold text-[#396131]">
												Mission
											</span>
											<p className="text-sm text-gray-700">
												Committed to delivering exceptional banking services while fostering growth
												for our customers, employees, stakeholders, and communities.
											</p>
										</div>
									</div>
								</div>
							</div>
							{/* Icon */}
							<div className="flex flex-1 justify-center md:justify-end">
								<div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#396131] shadow-lg md:h-40 md:w-40">
									<FontAwesomeIcon icon={faLightbulb} className="text-5xl text-white md:text-7xl" />
								</div>
							</div>
						</div>

						{/* Mission Points & Core Values - Modern Grid */}
						<div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
							{/* Mission Points */}
							<div className="flex flex-col gap-4 rounded-2xl bg-white/90 p-5 shadow-md">
								<h3 className="mb-2 text-center text-xl font-bold text-[#396131]">
									Mission Points
								</h3>
								<div className="flex flex-col gap-3">
									{[
										[
											'Customer First',
											'Be one 1st Valley Bank; be the go-to bank for our customers',
											faBuildingFlag
										],
										['Top Employer', 'Be the top employer for our staff', faUsersGear],
										[
											'High Returns',
											'Ensure delivery of high returns for our stakeholders',
											faSeedling
										],
										[
											'Community Development',
											'Promote development in the areas where we operate',
											faArrowUpRightDots
										]
									].map((point, idx) => (
										<div key={idx} className="flex items-start gap-3 rounded-lg bg-white/80 p-3">
											<div className="flex h-8 w-8 items-center justify-center rounded bg-[#396131]">
												<FontAwesomeIcon icon={point[2]} className="text-base text-white" />
											</div>
											<div>
												<span className="block text-sm font-semibold text-[#396131]">
													{point[0]}
												</span>
												<p className="text-xs text-gray-700">{point[1]}</p>
											</div>
										</div>
									))}
								</div>
							</div>
							{/* Core Values */}
							<div className="flex flex-col gap-4 rounded-2xl bg-white/90 p-5 shadow-md">
								<h3 className="mb-2 text-center text-xl font-bold text-[#396131]">Core Values</h3>
								<div className="flex flex-col gap-3">
									{[
										[
											'Integrity & Transparency',
											'We conduct our business with integrity, transparency, honesty, and the highest ethical standards.',
											faHandSparkles
										],
										[
											'Equality & Respect',
											'Treating our customers with equality, fairness, and respect is foremost in our delivery of excellent banking services.',
											faHandHoldingHand
										],
										[
											'Innovation & Excellence',
											'We develop our business through innovation, enthusiasm, creativity, and our constant quest for excellence.',
											faLightbulb
										]
									].map((value, idx) => (
										<div key={idx} className="flex items-start gap-3 rounded-lg bg-white/80 p-3">
											<div className="flex h-8 w-8 items-center justify-center rounded bg-[#396131]">
												<FontAwesomeIcon icon={value[2]} className="text-base text-white" />
											</div>
											<div>
												<span className="block text-sm font-semibold text-[#396131]">
													{value[0]}
												</span>
												<p className="text-xs text-gray-700">{value[1]}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				<section
					id="corporate-profile"
					data-scroll
					className="relative flex flex-col gap-6 bg-gradient-to-br from-[#396131] via-[#396131]/90 to-emerald-900/90 p-4 text-white shadow-2xl ring-1 ring-emerald-900/10 backdrop-blur-md sm:p-6 md:p-8 lg:p-10 xl:p-12"
				>
					<span className="text-center text-[1.5rem]/[2rem] font-extrabold tracking-tight drop-shadow-lg lg:text-[2.2rem]/[2.7rem]">
						Corporate Profile
					</span>
					<div className="flex flex-col gap-[28px]">
						{/* Senior Management Modernized */}
						<div className="flex flex-col gap-[14px]">
							<span className="text-center text-[1rem] font-semibold tracking-wider text-emerald-200/90 uppercase">
								Senior Management
							</span>
							<div className="flex flex-col items-center gap-[10px]">
								<div className="relative flex flex-col items-center justify-center gap-[8px]">
									<div className="relative">
										<img
											src={logo}
											alt="Atty. Nicolas J. Lim"
											className="h-[72px] w-[72px] rounded-full bg-white object-cover shadow-lg transition-transform duration-300 hover:scale-105"
										/>
									</div>
									<div className="flex flex-col items-center">
										<span className="text-center text-[1rem] font-bold tracking-tight text-white/90 lg:text-[1.1rem]">
											Atty. Nicolas J. Lim
										</span>
										<span className="text-[0.6rem] font-medium tracking-wide text-white/80 uppercase group-hover:text-white/80 lg:text-[0.8rem]">
											PRESIDENT
										</span>
									</div>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-x-[8px] gap-y-[14px] text-center md:grid-cols-3 lg:grid-cols-4 lg:gap-x-[16px] lg:gap-y-[24px]">
								{corporateProfile.senior_management.map((officer, index) => (
									<div
										className="group flex flex-col items-center justify-center gap-[8px] rounded-xl bg-white/10 p-2 shadow-md transition-all duration-300 hover:bg-emerald-900/20 hover:shadow-lg"
										key={index}
									>
										<img
											src={officer.image || logo}
											alt={officer.name}
											className="h-[48px] w-[48px] rounded-full bg-white object-cover shadow transition-transform duration-300 group-hover:scale-105"
										/>
										<div className="flex flex-col items-center">
											<span className="text-[0.85rem] font-semibold text-white/90 group-hover:text-emerald-200 lg:text-[0.95rem]">
												{officer.name}
											</span>
											<span className="text-[0.6rem] font-medium tracking-wide text-white/80 uppercase group-hover:text-white/80 lg:text-[0.8rem]">
												{officer.position}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
						{/* Product & Area Management Modernized */}
						<div className="flex flex-col gap-[16px]">
							<span className="text-center text-[1rem] font-semibold tracking-wider text-emerald-200/90 uppercase">
								Product &amp; Area Management
							</span>
							<div className="grid grid-cols-2 gap-x-[8px] gap-y-[14px] text-center md:grid-cols-3 lg:grid-cols-4 lg:gap-x-[16px] lg:gap-y-[24px]">
								{corporateProfile.product_management.map((officer, index) => (
									<div
										className="group flex flex-col items-center justify-center gap-[8px] rounded-xl bg-white/10 p-2 shadow-md transition-all duration-300 hover:bg-emerald-900/20 hover:shadow-lg"
										key={index}
									>
										<img
											src={officer.image || logo}
											alt={officer.name}
											className="h-[48px] w-[48px] rounded-full bg-white object-cover shadow transition-transform duration-300 group-hover:scale-105"
										/>
										<div className="flex flex-col items-center">
											<span className="text-[0.85rem] font-semibold text-white/90 group-hover:text-emerald-200 lg:text-[0.95rem]">
												{officer.name}
											</span>
											<span className="text-[0.6rem] font-medium tracking-wide text-white/80 uppercase group-hover:text-white/80 lg:text-[0.8rem]">
												{officer.position}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>
				<section
					id="annual-reports"
					data-scroll
					className="relative flex flex-col items-center justify-center gap-12 px-4 py-12 text-[#396131] lg:px-12 lg:py-20"
				>
					<h2 className="mb-2 text-center text-3xl font-extrabold tracking-tight text-[#396131] sm:text-4xl lg:text-5xl">
						Annual Reports
					</h2>

					<div className="grid w-full max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
						{annualReports.map((report, index) => (
							<div
								key={index}
								className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
							>
								<div className="relative">
									<img
										src={report.image}
										alt={report.title}
										className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-[#396131]/60 via-transparent to-transparent opacity-80"></div>
									<span className="absolute bottom-4 left-1/2 w-[90%] -translate-x-1/2 rounded-lg bg-white/90 px-4 py-2 text-center text-lg font-bold text-[#396131] shadow-md backdrop-blur-sm sm:text-xl">
										{report.title}
									</span>
								</div>
								<div className="flex flex-1 flex-col gap-6 px-6 py-6">
									<div>
										<span className="mb-2 block text-base font-semibold text-[#396131]">
											Corporate Highlights
										</span>
										<ul className="flex flex-col gap-2">
											{report.corporate_highlights.map((highlight, idx) => (
												<li key={idx} className="flex items-center gap-3">
													<span className="inline-block h-4 w-4 flex-shrink-0 rounded bg-gradient-to-br from-[#396131] to-[#4a7a3f]"></span>
													<span className="text-sm text-gray-700">{highlight}</span>
												</li>
											))}
										</ul>
									</div>
									<div>
										<span className="mb-2 block text-base font-semibold text-[#396131]">
											Financial Performance
										</span>
										<div className="mb-3">
											<span className="block text-sm font-bold text-[#396131]">Key Figures</span>
											<ul className="mt-1 flex flex-col gap-1">
												{report.key_figures.map((figure, idx) => (
													<li key={idx} className="flex items-center gap-2">
														<span className="inline-block h-3 w-3 flex-shrink-0 rounded bg-[#396131]"></span>
														<span className="text-xs text-gray-700">{figure}</span>
													</li>
												))}
											</ul>
										</div>
										<div>
											<span className="block text-sm font-bold text-[#396131]">
												Comparative Growth
											</span>
											<ul className="mt-1 flex flex-col gap-1">
												{report.comparative_growth.map((growth, idx) => (
													<li key={idx} className="flex items-center gap-2">
														<span className="inline-block h-3 w-3 flex-shrink-0 rounded bg-[#4a7a3f]"></span>
														<span className="text-xs text-gray-700">{growth}</span>
													</li>
												))}
											</ul>
										</div>
									</div>
									<div className="mt-auto flex">
										<NavLink
											to=""
											className="w-full rounded-lg bg-gradient-to-r from-[#396131] to-[#4a7a3f] py-3 text-center text-base font-bold text-white shadow transition-all duration-200 hover:from-white hover:to-white hover:text-[#396131] hover:shadow-lg hover:ring-2 hover:ring-[#396131]"
										>
											See Full Report
										</NavLink>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
				<section
					id="branch-directory"
					data-scroll
					className="mx-[10px] flex flex-col gap-[40px] rounded-[10px] bg-[#396131] p-[20px] text-white drop-shadow-lg lg:gap-[80px] lg:p-[50px]"
				>
					<span className="text-center text-[1.5rem]/[2.5rem] font-bold lg:text-[2.5rem]/[2.5rem]">
						Branch Directory
					</span>
					<div className="grid grid-cols-1 gap-x-[50px] gap-y-[30px] lg:grid-cols-2 lg:gap-y-[60px]">
						{branchDirectories.map((branch, index) => (
							<div className="flex gap-[20px]" key={index}>
								<img src={branch.image} alt="" className="h-[150px] w-[150px] rounded-[15px]" />
								<div className="flex flex-col gap-[10px] lg:gap-[20px]">
									<div className="flex flex-col gap-[12px] font-bold">
										<span className="text-[1rem]/[1rem] lg:text-[1.4rem]/[1.4rem]">
											{branch.name}
										</span>
										<span className="text-[0.8rem]/[0.8rem] lg:text-[0.9rem]/[0.9rem]">
											{branch.location}
										</span>
									</div>
									<div className="flex flex-col gap-[12px] text-[0.8rem]/[0.8rem] lg:text-[0.9rem]/[0.9rem]">
										<span className="">{branch.contact_numbers}</span>
										<span className="">{branch.email}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			</main>
		</>
	);
}
