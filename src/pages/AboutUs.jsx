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
import img from '/src/assets/homepage/heroSectionImage.png';
import { Clock, User, HandCoins, Smartphone } from 'lucide-react';
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
import CarouselSection from '../components/CarouselSection';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import carouselImg4 from '/src/assets/carousel/4.png';
import carouselImg5 from '/src/assets/carousel/5.png';
import carouselImg6 from '/src/assets/carousel/6.png';
import carouselImg7 from '/src/assets/carousel/7.png';

export default function AboutUs() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');

	const [imageLoaded1, setImageLoaded1] = useState(false);
	const [imageLoaded2, setImageLoaded2] = useState(false);
	const [imageLoaded3, setImageLoaded3] = useState(false);
	const [imageLoaded4, setImageLoaded4] = useState(false);

	const services = [
		{
			name: 'BRANCH NETWORKING',
			icon: faCodeBranch,
			description:
				'Enjoy convenient inter-branch transactions at 78 locations across Mindanao and the Visayas.'
		},
		{
			name: 'GCASH SERVICES',
			icon: faMobile,
			description: 'Pay bills, send/receive remittances, and manage funds anytime with GCash.'
		},
		{
			name: 'ATM SERVICES',
			icon: faCashRegister,
			description:
				'Access 24/7 ATM services for withdrawals and balance checks via ENCASH and major networks.'
		}
	];

	const awards = [
		{
			header: "Landbank's GOLDEN AWARD",
			description: 'For sustained sound and profitable operations.'
		},
		{
			header: 'MOST VALUED LOCAL PARTNER',
			description: 'Recognized by the Department of Agriculture (PCIC).'
		},
		{
			header: 'MOST OUTSTANDING PARTNER',
			description: "From the People's Credit & Finance Corporation."
		},
		{
			header: 'MOST OUTSTANDING PARTNER',
			description: 'From MFTransparency for responsible pricing.'
		},
		{
			header: '3RD LARGEST RURAL BANK in the country',
			description: 'Ranked 3rd largest by the Rural Bankers Association of the Philippines.'
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

	// Custom anchor navigation function
	const scrollToSection = (sectionId) => {
		const element = document.getElementById(sectionId.replace('#', ''));
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	};

	// Carousel slides data for About Us sections
	const aboutUsSlides = [
		{
			title: 'About 1st Valley Bank',
			subtitle: 'Your Trusted Development Bank',
			description:
				'Founded in 1956, 1st Valley Bank has a long and distinguished history of banking excellence. We started as a rural bank operating in Northern Mindanao and have grown exponentially as a development bank with 78 branches and branch lites in Mindanao and certain areas in the Visayas.',
			image: logo,
			imageAlt: '1st Valley Bank Logo',
			route: '#description',
			buttonText: 'Learn About Our Profile',
			showButton: true,
			onButtonClick: () => scrollToSection('#description')
		},
		{
			title: 'Our Rich History',
			subtitle: 'From Rural Bank to Development Bank',
			description:
				'Discover our journey from the Rural Bank of Kapatagan Valley (RUBANKA) in 1956 to becoming one of the largest development banks in the country. Learn about our mergers, growth, and commitment to serving our communities.',
			image: carouselImg1,
			imageAlt: 'Bank History',
			route: '#history',
			buttonText: 'Explore Our History',
			showButton: true,
			onButtonClick: () => scrollToSection('#history')
		},
		{
			title: 'Why Choose Us',
			subtitle: "You're Always First",
			description:
				'With 64+ years in the industry, we offer personalized services treating our clients as family and friends. We provide comprehensive financial solutions with convenience whenever and wherever you need them.',
			image: carouselImg2,
			imageAlt: 'Why Choose 1st Valley Bank',
			route: '#marketing',
			buttonText: 'Discover Our Benefits',
			showButton: true,
			onButtonClick: () => scrollToSection('#marketing')
		},
		{
			title: 'Comprehensive Loans',
			subtitle: 'Financial Solutions for Every Need',
			description:
				'From agriculture and microfinance to salary loans and SME financing, we offer a full range of loan products designed to help you achieve your financial goals with competitive rates and flexible terms.',
			image: carouselImg3,
			imageAlt: 'Loan Services',
			route: '/loans',
			buttonText: 'View All Loans',
			showButton: true,
			onButtonClick: () => scrollToSection('#loans')
		},
		{
			title: 'Secure Deposits',
			subtitle: 'Safe, Secure, and Rewarding',
			description:
				'Protect and grow your wealth with our comprehensive deposit products. From regular savings to special deposits, we offer high interest rates, flexible terms, and the security you can trust.',
			image: carouselImg4,
			imageAlt: 'Deposit Services',
			route: '/deposits',
			buttonText: 'Explore Deposits',
			showButton: true,
			onButtonClick: () => scrollToSection('#deposits')
		},
		{
			title: 'Banking Services',
			subtitle: 'Convenience at Your Fingertips',
			description:
				'Experience modern banking with our branch networking, GCash services, and 24/7 ATM services. We provide comprehensive financial solutions designed to meet all your banking needs.',
			image: carouselImg5,
			imageAlt: 'Banking Services',
			route: '#services',
			buttonText: 'View All Services',
			showButton: true,
			onButtonClick: () => scrollToSection('#services')
		},
		{
			title: 'Awards & Recognition',
			subtitle: 'Excellence in Banking',
			description:
				'Recognized as one of the top development banks in the country with an A+ rating from PhilRatings and multiple awards for our outstanding service and commitment to our communities.',
			image: carouselImg6,
			imageAlt: 'Awards and Recognition',
			route: '#awards',
			buttonText: 'See Our Achievements',
			showButton: true,
			onButtonClick: () => scrollToSection('#awards')
		},
		{
			title: 'Vision & Mission',
			subtitle: 'Our Core Values',
			description:
				'We envision being the preferred banking institution delivering innovative and customer-centered services. Our mission is to foster growth for our customers, employees, stakeholders, and communities.',
			image: carouselImg7,
			imageAlt: 'Vision and Mission',
			route: '#core-values',
			buttonText: 'Learn Our Values',
			showButton: true,
			onButtonClick: () => scrollToSection('#core-values')
		},
		{
			title: 'Corporate Profile',
			subtitle: 'Meet Our Leadership Team',
			description:
				'Get to know our experienced senior management and product management teams who are dedicated to providing exceptional banking services and driving our continued growth and success.',
			image: carouselImg1,
			imageAlt: 'Corporate Leadership',
			route: '#corporate-profile',
			buttonText: 'Meet Our Team',
			showButton: true,
			onButtonClick: () => scrollToSection('#corporate-profile')
		}
	];

	return (
		<>
			<CarouselSection
				id="about-us-carousel"
				slides={aboutUsSlides}
				autoPlay={true}
				autoPlayInterval={6000}
				backgroundColor="from-slate-50 via-white to-green-50"
				brandColor="#396131"
				brandGradient="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
				minHeight="min-h-[560px] lg:min-h-[640px]"
				showLearnMoreButton={true}
				learnMoreText="Learn More"
				excludeLearnMoreForTitles={[]}
			/>
			<main className="flex flex-col">
				{/* Hero Carousel Section */}
				<section id="description" data-scroll className="bg-white py-12">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-2/5">
								<div className="flex h-auto w-full items-center justify-center">
									<img
										src={carouselImg4}
										alt="1st Valley Bank Building"
										className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
									/>
								</div>
							</div>
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<FontAwesomeIcon icon={faBuilding} className="h-4 w-4 text-[#396131]" />
									<span className="text-2xl font-semibold text-[#396131]">Bank Overview</span>
								</div>
								<p className="mb-4 text-sm leading-relaxed text-gray-700">
									<strong className="text-[#396131]">1st Valley Bank (1VB)</strong> is one of the
									largest independent developmental banks dedicated to funding development projects
									and businesses through the provision of loan capital. While the Bank's primary
									clients are entrepreneurs and farmers, it also serves the financial needs of
									teachers, barangay officials, regular employees of local government units, as well
									as individuals who are in need of fast cash.
								</p>
								<p className="mb-4 text-sm leading-relaxed text-gray-700">
									On <strong className="text-[#396131]">27 December 2019</strong>, the merger
									between 1st Valley Bank (1VB), Sugbuanon Rural Bank, Inc. (SRBI), and D'Asian
									Hills Bank, Inc. (DAHBI) was declared official, with 1VB as the surviving entity.
									With the completion of the merger, clients can expect greater customer service
									satisfaction.
								</p>

								<p className="text-sm leading-relaxed text-gray-700">
									1st Valley Bank ranks <strong>3rd in terms of assets</strong> and is considered
									one of the fastest-growing development banks in the country. Its audited financial
									statements show that as of December 2019, the Bank has a total of Php10B+ in
									resources.
								</p>
							</div>
						</div>
					</div>
				</section>{' '}
				<section id="history" data-scroll className="bg-white py-12">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col-reverse items-center gap-8 lg:flex-row">
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<FontAwesomeIcon icon={faBuildingColumns} className="h-4 w-4 text-[#396131]" />
									<span className="text-2xl font-semibold text-[#396131]">Brief History</span>
								</div>
								<p className="mb-4 text-sm leading-relaxed text-gray-700">
									<strong className="text-[#396131]">1st Valley Bank</strong>, a rapidly growing
									development bank in Mindanao and Visayas, traces its roots in the rural banking
									industry.
								</p>
								<p className="mb-4 text-sm leading-relaxed text-gray-700">
									1st Valley Bank was formerly known as the{' '}
									<strong className="text-[#396131]">
										Rural Bank of Kapatagan Valley (RUBANKA)
									</strong>{' '}
									first, and then{' '}
									<strong className="text-[#396131]">Kapatagan Valley Bank (KVB)</strong>. It earned
									its license to operate on{' '}
									<strong className="text-[#396131]">November 24, 1956</strong> and became the 75th
									rural bank in the country.
								</p>
								<p className="mb-4 text-sm leading-relaxed text-gray-700">
									On <strong className="text-[#396131]">April 5, 1957</strong>, the Bank earned its
									prestigious membership in the Rural Bank Association of the Philippines (RBAP).
								</p>
								<p className="mb-4 text-sm leading-relaxed text-gray-700">
									In <strong className="text-[#396131]">April 2004</strong>, Kapatagan Valley Bank
									entered into a consolidation agreement with Rural Bank of Sinacaban. On{' '}
									<strong className="text-[#396131]">August 30, 2005</strong>, the Securities and
									Exchange Commission (SEC) issued the Certificate of Consolidation and Certificate
									of Incorporation to the merging institutions. This official merger gave birth to
									1st Valley Bank.
								</p>
								<p className="mb-4 text-sm leading-relaxed text-gray-700">
									On <strong className="text-[#396131]">August 1, 2013</strong>, 1st Valley Bank
									progressed into a development bank. It seeks to provide sufficient loan capital
									for productive investment along with technical assistance to help guarantee the
									success of its borrowers.
								</p>
								<p className="text-sm leading-relaxed text-gray-700">
									Today, following the successful completion of its merger with SRBI and DAHBI,{' '}
									<strong className="text-[#396131]">1VB</strong> is operating on a vast network of{' '}
									<strong className="text-[#396131]">78 branches and branch lites</strong>.
								</p>
							</div>
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-2/5">
								<div className="flex h-auto w-full items-center justify-center">
									<img
										src={carouselImg7}
										alt="1st Valley Bank Building"
										className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section id="marketing" data-scroll className="bg-white py-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-2/5">
								<div className="flex h-72 w-72 items-center justify-center">
									<img
										src={carouselImg4}
										alt="1st Valley Bank Building"
										className="h-64 w-64 object-cover transition-transform duration-300 hover:scale-105"
									/>
								</div>
							</div>
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<FontAwesomeIcon icon={faBuildingColumns} className="h-4 w-4 text-[#396131]" />
									<span className="text-2xl font-semibold text-[#396131]">Why Choose Us</span>
								</div>

								{/*
									Refactored to iterate through an array and use lucide-react icons.
									Make sure the relevant lucide-react icons are imported at the top of your file, e.g.:
									import { Clock, User, HandCoins, Smartphone } from "lucide-react";
								*/}
								{(() => {
									const whyChooseUsItems = [
										{
											text: '64+ years of trusted banking',
											icon: Clock
										},
										{
											text: 'Personalized, friendly service',
											icon: User
										},
										{
											text: 'Comprehensive financial solutions',
											icon: HandCoins
										},
										{
											text: 'Convenience—anytime, anywhere',
											icon: Smartphone
										}
									];
									return (
										<ul className="mb-4 flex flex-col gap-3">
											{whyChooseUsItems.map((item, idx) => {
												const Icon = item.icon;
												return (
													<li key={idx} className="flex items-center gap-3">
														<Icon className="h-4 w-4 text-[#396131]" />
														<span className="text-base text-gray-700">{item.text}</span>
													</li>
												);
											})}
										</ul>
									);
								})()}
								<p className="text-base font-medium text-[#396131]">
									Experience the difference of a bank that puts your needs first, with a legacy of
									excellence and a commitment to your financial success.
								</p>
							</div>
						</div>
					</div>
				</section>
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
							<h2 className="mb-6 text-2xl font-bold text-[#396131] md:text-3xl lg:text-4xl">
								SERVICES
							</h2>
							<div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#396131] to-[#4a7a3f]"></div>
							<p className="mx-auto max-w-2xl text-base text-gray-600">
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

									<div className="relative flex h-full flex-col text-center">
										{/* Icon Container */}
										<div className="mb-8 lg:mb-10">
											<div className="relative inline-block">
												<div className="mx-auto flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-[#396131] to-[#4a7a3f] shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 lg:h-40 lg:w-40">
													<FontAwesomeIcon
														icon={service.icon}
														className="text-4xl text-white lg:text-5xl"
													/>
												</div>
											</div>
										</div>

										{/* Content */}
										<div className="flex h-full flex-col space-y-4 lg:space-y-6">
											<h3 className="text-lg font-bold text-[#396131] transition-colors duration-300 group-hover:text-[#4a7a3f] lg:text-xl">
												{service.name}
											</h3>

											<div className="mx-auto h-0.5 w-12 rounded-full bg-gradient-to-r from-[#396131] to-[#4a7a3f] opacity-60 transition-all duration-300 group-hover:w-16 group-hover:opacity-100"></div>

											<p className="text-xs leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700 lg:text-sm">
												{service.description}
											</p>

											<div className="mt-auto flex p-4">
												<NavLink
													to={service.link || '#'}
													className="inline-block w-full cursor-pointer rounded-lg bg-[#396131] px-5 py-2 text-xs font-semibold text-white shadow transition-all duration-300 hover:bg-[#4a7a3f] focus:ring-2 focus:ring-[#396131]/50 focus:outline-none"
												>
													Learn More
												</NavLink>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
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
									<div className="flex items-start gap-3 p-4">
										<div className="flex h-9 w-9 items-center justify-center rounded-lg">
											<span className="text-base font-bold text-[#396131]">A+</span>
										</div>
										<div>
											<span className="mb-1 block text-base font-semibold text-[#396131]">
												RATED A+
											</span>
											<p className="text-sm text-gray-700">
												By PhilRatings, a BSP-recognized credit rating agency.
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3 p-4">
										<div className="flex h-9 w-9 items-center justify-center">
											<FontAwesomeIcon icon={faTrophy} className="text-base text-[#396131]" />
										</div>
										<div>
											<span className="mb-1 block text-base font-semibold text-[#396131]">
												EAGLE AWARD FOR MICROFINANCE
											</span>
											<p className="text-sm text-gray-700">
												From USAID via MABS, for expanding rural microfinance services.
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
						<div className="mt-8 p-4">
							<div className="mb-4 text-center">
								<h3 className="mb-1 text-lg font-bold text-[#396131]">More Achievements</h3>
								<div className="mx-auto h-0.5 w-10 rounded-full bg-[#396131]"></div>
							</div>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
								{awards.map((award, index) => (
									<div
										key={index}
										className="group flex items-start gap-3 p-3 transition-all duration-200"
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
									<div className="flex items-start gap-3 p-4">
										<div className="flex h-9 w-9 items-center justify-center">
											<FontAwesomeIcon icon={faLightbulb} className="text-lg text-[#396131]" />
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
									<div className="flex items-start gap-3 p-4">
										<div className="flex h-9 w-9 items-center justify-center">
											<FontAwesomeIcon icon={faLeaf} className="text-lg text-[#396131]" />
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
							<div className="flex flex-col gap-4 p-5">
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
										<div key={idx} className="flex items-start gap-3 p-3">
											<div className="flex h-8 w-8 items-center justify-center rounded">
												<FontAwesomeIcon icon={point[2]} className="text-base text-[#396131]" />
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
							<div className="flex flex-col gap-4 p-5">
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
											<div className="flex h-8 w-8 items-center justify-center rounded">
												<FontAwesomeIcon icon={value[2]} className="text-base text-[#396131]" />
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
											<span className="text-[0.85rem] font-semibold text-white/90 lg:text-[0.95rem]">
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
			</main>
		</>
	);
}
