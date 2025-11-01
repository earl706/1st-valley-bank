import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons/faBuildingColumns';
import logo from '/src/assets/logo.png';

import img8 from '/src/assets/about-us/8.jpg';
import img9 from '/src/assets/about-us/9.jpg';
import gcashLogo from '/src/assets/gcash-logo.png';
import { NavLink } from 'react-router-dom';
import { Clock, User, HandCoins, Smartphone, ArrowRight } from 'lucide-react';
import {
	faArrowUpRightDots,
	faBuilding,
	faBuildingFlag,
	faCashRegister,
	faCodeBranch,
	faLeaf,
	faLightbulb,
	faHandHoldingHand,
	faHandSparkles,
	faMobile,
	faSeedling,
	faTrophy,
	faUsersGear,
	faFilePdf,
	faTimes,
	faChevronLeft,
	faChevronRight
} from '@fortawesome/free-solid-svg-icons';

import CarouselSection from '../components/CarouselSection';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import carouselImg4 from '/src/assets/carousel/4.png';
import carouselImg5 from '/src/assets/carousel/5.png';
import carouselImg6 from '/src/assets/carousel/6.png';
import carouselImg7 from '/src/assets/carousel/7.png';
import { LightCard } from '../components/Card';
import { LightPrimaryButton } from '../components/Buttons';
import { LightHeader, DarkHeader } from '../components/Header';

// --- API service import for live annual reports data ---
import annualReportService from '../services/annualReportService';

const PDFModal = ({ open, onClose, pdfUrl }) => {
	if (!open) return null;
	return (
		<div className="bg-opacity-60 fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
			<div className="relative w-full max-w-7xl overflow-hidden rounded-lg bg-white shadow-xl">
				<button
					className="absolute top-3 right-3 text-2xl text-gray-800 hover:text-red-500"
					onClick={onClose}
					aria-label="Close"
				>
					<FontAwesomeIcon icon={faTimes} />
				</button>
				<div className="p-6 pt-12">
					<h2 className="mb-2 flex items-center gap-2 text-2xl font-bold text-[#396131]">
						<FontAwesomeIcon icon={faFilePdf} className="text-rose-700" />
						Report PDF Preview
					</h2>
					{pdfUrl ? (
						<iframe
							title="Annual Report PDF"
							src={pdfUrl}
							className="h-[60vh] w-full rounded border-0"
						></iframe>
					) : (
						<p className="mt-6 mb-8 text-gray-600">Sorry, no PDF available for this report.</p>
					)}
					<div className="mt-4 flex justify-end">
						<LightPrimaryButton onClick={onClose}>Close</LightPrimaryButton>
					</div>
				</div>
			</div>
		</div>
	);
};

const AnnualReportModal = ({
	open,
	onClose,
	report,
	onViewPDF,
	onPrev,
	onNext,
	showPrev,
	showNext
}) => {
	if (!open || !report) return null;

	// Helper: render object key/value pairs (for key_figures, comparative_growth)
	const renderKeyValueList = (obj) =>
		obj && typeof obj === 'object'
			? Object.entries(obj).map(([key, value]) => (
					<li key={key}>
						<span className="font-semibold">{key}:</span> {value}
					</li>
				))
			: null;

	return (
		<div className="bg-opacity-60 fixed inset-0 z-[9998] flex items-center justify-center bg-black/70">
			<button
				className="absolute top-3 right-3 cursor-pointer text-2xl text-gray-200 transition-all duration-300 hover:text-red-500"
				onClick={onClose}
				aria-label="Close"
			>
				<FontAwesomeIcon icon={faTimes} />
			</button>
			<div className="relative max-h-[90vh] w-full max-w-7xl overflow-y-auto rounded-xl bg-white shadow-2xl">
				<div className="flex items-center justify-between p-4">
					{showPrev && (
						<button
							className="p-2 text-[#396131] hover:text-[#4a7a3f]"
							title="Previous"
							onClick={onPrev}
						>
							<FontAwesomeIcon icon={faChevronLeft} />
						</button>
					)}
					<span className="flex-1 text-center text-lg font-bold text-[#396131] uppercase">
						{report.title}
					</span>
					{showNext && (
						<button
							className="p-2 text-[#396131] hover:text-[#4a7a3f]"
							title="Next"
							onClick={onNext}
						>
							<FontAwesomeIcon icon={faChevronRight} />
						</button>
					)}
				</div>
				<div className="p-6">
					<div className="mb-5 flex justify-center">
						<img
							src={report.image}
							alt={report.title}
							className="max-h-48 w-auto rounded-lg border shadow-sm"
						/>
					</div>
					<div className="mb-5">
						<h3 className="mb-1 text-lg font-bold text-[#396131]">Corporate Highlights</h3>
						<ul className="grid list-inside list-disc gap-1 text-gray-800">
							{Array.isArray(report.corporate_highlights) &&
								report.corporate_highlights.map((h, i) => <li key={i}>{h}</li>)}
						</ul>
					</div>
					{report.key_figures && Object.keys(report.key_figures).length > 0 && (
						<div className="mb-5">
							<h3 className="mb-1 text-lg font-bold text-[#396131]">Key Figures</h3>
							<ul className="grid list-inside list-disc gap-1 text-gray-800">
								{renderKeyValueList(report.key_figures)}
							</ul>
						</div>
					)}
					{report.comparative_growth && Object.keys(report.comparative_growth).length > 0 && (
						<div className="mb-5">
							<h3 className="mb-1 text-lg font-bold text-[#396131]">Comparative Growth</h3>
							<ul className="grid list-inside list-disc gap-1 text-gray-800">
								{renderKeyValueList(report.comparative_growth)}
							</ul>
						</div>
					)}
					{report.additional_info && (
						<div className="mb-5">
							<h3 className="mb-1 text-lg font-bold text-[#396131]">Additional Info</h3>
							<div className="text-gray-700">{report.additional_info}</div>
						</div>
					)}
					<div className="mt-8 flex gap-3">
						<LightPrimaryButton
							className="flex flex-1 items-center justify-center gap-2"
							onClick={onClose}
							variant="secondary"
						>
							Close
						</LightPrimaryButton>
						<LightPrimaryButton
							className="flex flex-1 items-center justify-center gap-2"
							onClick={onViewPDF}
						>
							<FontAwesomeIcon icon={faFilePdf} className="text-rose-700" />
							View PDF
						</LightPrimaryButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default function AboutUs() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');

	const [imageLoaded1, setImageLoaded1] = useState(false);
	const [imageLoaded2, setImageLoaded2] = useState(false);
	const [imageLoaded3, setImageLoaded3] = useState(false);
	const [imageLoaded4, setImageLoaded4] = useState(false);

	const [annualReportModalIdx, setAnnualReportModalIdx] = useState(null);
	const [pdfModalOpen, setPdfModalOpen] = useState(false);

	// --- Live data: annual reports state and loader ---
	const [annualReports, setAnnualReports] = useState([]);
	const [annualReportsLoading, setAnnualReportsLoading] = useState(true);
	const [annualReportsError, setAnnualReportsError] = useState(null);

	const services = [
		{
			name: 'BRANCH NETWORKING',
			image: carouselImg2,
			description:
				'Enjoy convenient inter-branch transactions at 78 locations across Mindanao and the Visayas.'
		},
		{
			name: 'GCASH SERVICES',
			image: gcashLogo,
			description: 'Pay bills, send/receive remittances, and manage funds anytime with GCash.'
		},
		{
			name: 'ATM SERVICES',
			image: carouselImg3,
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

	// --- Live data: Fetch annual reports on mount ---

	const fetchAnnualReports = async (mountedRef) => {
		setAnnualReportsLoading(true);
		setAnnualReportsError(null);
		try {
			const reports = await annualReportService.getAnnualReports({
				page: 1,
				page_size: 6,
				ordering: '-created_at'
			});
			console.log(reports);
			if (mountedRef.current) {
				setAnnualReports(reports.results);
				setAnnualReportsLoading(false);
			}
		} catch (err) {
			console.log(err);
			if (mountedRef.current) {
				setAnnualReportsError(
					err?.message || 'Failed to load annual reports. Please try again later.'
				);
				setAnnualReports([]);
				setAnnualReportsLoading(false);
			}
		}
	};

	useEffect(() => {
		const mountedRef = { current: true };
		fetchAnnualReports(mountedRef);
		return () => {
			mountedRef.current = false;
		};
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
			onButtonClick: () => {
				scrollToSection('#description');
			}
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
			onButtonClick: () => {
				scrollToSection('#history');
			}
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
			onButtonClick: () => {
				scrollToSection('#marketing');
			}
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
				<section
					id="description"
					data-scroll
					className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-12"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<DarkHeader
							badgeText="Bank Overview"
							title="About 1st Valley Bank"
							subtitle="One of the largest independent development banks dedicated to funding development projects and businesses in the Philippines."
						/>
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
								<p className="mb-4 text-base leading-relaxed font-normal text-white/90">
									<strong>1st Valley Bank (1VB)</strong> is one of the largest independent
									developmental banks dedicated to funding development projects and businesses
									through the provision of loan capital. While the Bank's primary clients are
									entrepreneurs and farmers, it also serves the financial needs of teachers,
									barangay officials, regular employees of local government units, as well as
									individuals who are in need of fast cash.
								</p>
								<p className="mb-4 text-base leading-relaxed font-normal text-white/90">
									On <strong>27 December 2019</strong>, the merger between 1st Valley Bank (1VB),
									Sugbuanon Rural Bank, Inc. (SRBI), and D'Asian Hills Bank, Inc. (DAHBI) was
									declared official, with 1VB as the surviving entity. With the completion of the
									merger, clients can expect greater customer service satisfaction.
								</p>
								<p className="text-base leading-relaxed font-normal text-white/90">
									1st Valley Bank ranks <strong>3rd in terms of assets</strong> and is considered
									one of the fastest-growing development banks in the country. Its audited financial
									statements show that as of December 2019, the Bank has a total of Php10B+ in
									resources.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section id="history" data-scroll className="bg-white py-12">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<LightHeader
							badgeText="Brief History"
							title="Our Roots"
							subtitle="Explore the origins and milestones that shaped 1st Valley Bank's growth from its humble beginnings to present-day achievements."
						/>
						<div className="flex flex-col-reverse items-center gap-8 lg:flex-row">
							<div className="flex-1">
								<p className="mb-4 text-base leading-relaxed font-normal text-gray-700">
									<strong className="text-[#396131]">1st Valley Bank</strong>, a rapidly growing
									development bank in Mindanao and Visayas, traces its roots in the rural banking
									industry.
								</p>
								<p className="mb-4 text-base leading-relaxed font-normal text-gray-700">
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
								<p className="mb-4 text-base leading-relaxed font-normal text-gray-700">
									On <strong className="text-[#396131]">April 5, 1957</strong>, the Bank earned its
									prestigious membership in the Rural Bank Association of the Philippines (RBAP).
								</p>
								<p className="mb-4 text-base leading-relaxed font-normal text-gray-700">
									In <strong className="text-[#396131]">April 2004</strong>, Kapatagan Valley Bank
									entered into a consolidation agreement with Rural Bank of Sinacaban. On{' '}
									<strong className="text-[#396131]">August 30, 2005</strong>, the Securities and
									Exchange Commission (SEC) issued the Certificate of Consolidation and Certificate
									of Incorporation to the merging institutions. This official merger gave birth to
									1st Valley Bank.
								</p>
								<p className="mb-4 text-base leading-relaxed font-normal text-gray-700">
									On <strong className="text-[#396131]">August 1, 2013</strong>, 1st Valley Bank
									progressed into a development bank. It seeks to provide sufficient loan capital
									for productive investment along with technical assistance to help guarantee the
									success of its borrowers.
								</p>
								<p className="text-base leading-relaxed font-normal text-gray-700">
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
				<section
					id="marketing"
					data-scroll
					className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-16"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<DarkHeader
							badgeText="Why Choose Us"
							title="Your Trusted Banking Partner"
							subtitle="Experience the difference of a bank that puts your needs first, with a legacy of
									excellence and a commitment to your financial success."
						/>
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
											text: 'Seamless banking',
											icon: Smartphone
										}
									];
									return (
										<ul className="mb-4 flex flex-col gap-3">
											{whyChooseUsItems.map((item, idx) => {
												const Icon = item.icon;
												return (
													<li key={idx} className="flex items-center gap-3">
														<Icon className="h-5 w-5 text-white" />
														<span className="text-base leading-relaxed font-normal text-white">
															{item.text}
														</span>
													</li>
												);
											})}
										</ul>
									);
								})()}
							</div>
						</div>
					</div>
				</section>
				<section id="services" data-scroll className="relative overflow-hidden py-16 lg:py-24">
					<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<LightHeader
							badgeText="Services"
							title="Comprehensive Banking Solutions"
							subtitle="Comprehensive financial solutions designed to meet all your banking needs."
						/>
						{/* Services Grid */}
						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
							{services.map((service, index) => (
								<LightCard
									className="group relative flex h-full flex-col items-center text-center"
									key={index}
								>
									{/* Icon Container */}
									<div className="mb-8 lg:mb-10">
										<div className="relative inline-block">
											<div className="mx-auto flex h-32 w-32 items-center justify-center transition-all duration-500 group-hover:scale-101 lg:h-40 lg:w-40">
												<img
													src={service.image}
													alt={service.name + ' logo'}
													className="h-full w-full object-cover"
												/>
											</div>
										</div>
									</div>
									{/* Content */}
									<div className="flex h-full w-full flex-col space-y-4 lg:space-y-6">
										<h3 className="text-xl leading-tight font-bold text-[#396131] transition-colors duration-300 group-hover:text-[#4a7a3f]">
											{service.name}
										</h3>
										<div className="mx-auto h-0.5 w-12 rounded-full bg-gradient-to-r from-[#396131] to-[#4a7a3f] opacity-60 transition-all duration-300 group-hover:w-16 group-hover:opacity-100"></div>
										<p className="text-base leading-relaxed font-normal text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
											{service.description}
										</p>
										<div className="mt-auto flex w-full justify-center pt-4">
											<LightPrimaryButton
												to={service.link || '#'}
												secondaryIcon={
													<ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
												}
												className="w-full"
											>
												Learn More
											</LightPrimaryButton>
										</div>
									</div>
								</LightCard>
							))}
						</div>
					</div>
				</section>
				<section
					id="awards"
					data-scroll
					className="relative bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-8 lg:py-12"
				>
					<div className="mx-auto max-w-5xl px-2 sm:px-4">
						<DarkHeader
							badgeText="Awards"
							title="Awards & Recognition"
							subtitle="Recognized for excellence in service and financial leadership."
						/>
						{/* Header & Trophy */}
						<div className="flex flex-col-reverse items-center gap-6 md:flex-row md:gap-8">
							{/* Content */}
							<div className="flex-1 text-center md:text-left">
								{/* Featured Awards */}
								<div className="flex flex-col gap-4">
									<div className="flex items-start gap-3 p-4">
										<div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/80">
											<span className="text-xl font-bold text-[#396131]">A+</span>
										</div>
										<div>
											<span className="mb-1 block text-2xl leading-tight font-bold text-white">
												RATED A+
											</span>
											<p className="text-base leading-relaxed font-normal text-white">
												By PhilRatings, a BSP-recognized credit rating agency.
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3 p-4">
										<div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/80">
											<FontAwesomeIcon icon={faTrophy} className="text-xl text-[#396131]" />
										</div>
										<div>
											<span className="mb-1 block text-2xl leading-tight font-bold text-white">
												EAGLE AWARD FOR MICROFINANCE
											</span>
											<p className="text-base leading-relaxed font-normal text-white">
												From USAID via MABS, for expanding rural microfinance services.
											</p>
										</div>
									</div>
								</div>
							</div>
							{/* Trophy Icon */}
							<div className="mb-4 flex flex-1 justify-center md:mb-0 md:justify-end">
								<div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/80 shadow-lg md:h-32 md:w-32">
									<FontAwesomeIcon
										icon={faTrophy}
										className="text-5xl text-[#396131] md:text-7xl"
									/>
								</div>
							</div>
						</div>
						{/* Additional Awards Grid */}
						<div className="mt-8 p-4">
							<div className="mb-4 text-center">
								<h3 className="mb-1 text-xl leading-tight font-bold text-white">
									More Achievements
								</h3>
								<div className="mx-auto h-0.5 w-10 rounded-full bg-white/60"></div>
							</div>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
								{awards.map((award, index) => (
									<div
										key={index}
										className="group flex items-start gap-3 p-3 transition-all duration-200"
									>
										<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-white/80 transition-transform duration-200 group-hover:scale-105">
											<FontAwesomeIcon icon={faTrophy} className="text-base text-[#396131]" />
										</div>
										<div className="flex-1">
											<span className="block text-base leading-tight font-semibold text-white">
												{award.header}
											</span>
											<p className="text-sm leading-relaxed font-normal text-white">
												{award.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>
				<section id="core-values" className="relative bg-white/80 py-8 lg:py-12">
					<div className="mx-auto max-w-5xl px-2 sm:px-4">
						<LightHeader
							badgeText="Vision & Mission"
							title="Our Vision, Mission & Values"
							subtitle="Guided by a clear vision, a resolute mission, and enduring core values."
						/>
						{/* Vision & Mission - Compact Modern Layout */}
						<div className="flex flex-col-reverse items-center gap-8 md:flex-row md:gap-10">
							{/* Content */}
							<div className="flex-1 text-center md:text-left">
								<div className="flex flex-col gap-4">
									<div className="flex items-start gap-3 p-4">
										<div className="flex h-9 w-9 items-center justify-center">
											<FontAwesomeIcon icon={faLightbulb} className="text-2xl text-[#396131]" />
										</div>
										<div>
											<span className="mb-1 block text-2xl leading-tight font-bold text-[#396131]">
												Vision
											</span>
											<p className="text-base leading-relaxed font-normal text-gray-700">
												We envision to be the preferred banking institution in delivering innovative
												and customer-centered services.
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3 p-4">
										<div className="flex h-9 w-9 items-center justify-center">
											<FontAwesomeIcon icon={faLeaf} className="text-2xl text-[#396131]" />
										</div>
										<div>
											<span className="mb-1 block text-2xl leading-tight font-bold text-[#396131]">
												Mission
											</span>
											<p className="text-base leading-relaxed font-normal text-gray-700">
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
								<h3 className="mb-2 text-center text-xl leading-tight font-bold text-[#396131]">
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
												<FontAwesomeIcon icon={point[2]} className="text-xl text-[#396131]" />
											</div>
											<div>
												<span className="block text-base leading-tight font-semibold text-[#396131]">
													{point[0]}
												</span>
												<p className="text-sm leading-relaxed font-normal text-gray-700">
													{point[1]}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
							{/* Core Values */}
							<div className="flex flex-col gap-4 p-5">
								<h3 className="mb-2 text-center text-xl leading-tight font-bold text-[#396131]">
									Core Values
								</h3>
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
												<FontAwesomeIcon icon={value[2]} className="text-xl text-[#396131]" />
											</div>
											<div>
												<span className="block text-base leading-tight font-semibold text-[#396131]">
													{value[0]}
												</span>
												<p className="text-sm leading-relaxed font-normal text-gray-700">
													{value[1]}
												</p>
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
					className="relative flex flex-col gap-6 bg-gradient-to-l from-[#396131] to-[#4a7c3a] p-4 text-white shadow-2xl ring-1 ring-emerald-900/10 backdrop-blur-md sm:p-6 md:p-8 lg:p-10 xl:p-12"
				>
					<DarkHeader
						badgeText="Corporate Profile"
						title="Meet Our Leadership"
						subtitle="Discover our experienced management team dedicated to driving our success."
					/>
					<div className="flex flex-col gap-7">
						{/* Senior Management Modernized */}
						<div className="flex flex-col gap-5">
							<span className="text-center text-xl leading-tight font-bold tracking-wider text-white/80 uppercase">
								Senior Management
							</span>
							<div className="flex flex-col items-center gap-3">
								<div className="relative flex flex-col items-center justify-center gap-2">
									<div className="relative">
										<img
											src={logo}
											alt="Atty. Nicolas J. Lim"
											className="h-20 w-20 rounded-full bg-white object-cover shadow-lg transition-transform duration-300 hover:scale-105"
										/>
									</div>
									<div className="flex flex-col items-center">
										<span className="text-center text-xl font-bold tracking-tight text-white">
											Atty. Nicolas J. Lim
										</span>
										<span className="text-xs font-medium tracking-wide text-white/80 uppercase group-hover:text-white">
											PRESIDENT
										</span>
									</div>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-x-2 gap-y-5 text-center md:grid-cols-3 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-6">
								{corporateProfile.senior_management.map((officer, index) => (
									<div
										className="group flex flex-col items-center justify-center gap-2 rounded-xl bg-white/10 p-2 shadow-md transition-all duration-300 hover:bg-white/20 hover:shadow-lg"
										key={index}
									>
										<img
											src={officer.image || logo}
											alt={officer.name}
											className="h-12 w-12 rounded-full bg-white object-cover shadow transition-transform duration-300 group-hover:scale-105"
										/>
										<div className="flex flex-col items-center">
											<span className="text-base leading-tight font-semibold text-white">
												{officer.name}
											</span>
											<span className="text-xs font-medium tracking-wide text-white/70 uppercase group-hover:text-white">
												{officer.position}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
						{/* Product & Area Management Modernized */}
						<div className="flex flex-col gap-6">
							<span className="text-center text-xl leading-tight font-bold tracking-wider text-white/80 uppercase">
								Product &amp; Area Management
							</span>
							<div className="grid grid-cols-2 gap-x-2 gap-y-5 text-center md:grid-cols-3 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-6">
								{corporateProfile.product_management.map((officer, index) => (
									<div
										className="group flex flex-col items-center justify-center gap-2 rounded-xl bg-white/10 p-2 shadow-md transition-all duration-300 hover:bg-white/20 hover:shadow-lg"
										key={index}
									>
										<img
											src={officer.image || logo}
											alt={officer.name}
											className="h-12 w-12 rounded-full bg-white object-cover shadow transition-transform duration-300 group-hover:scale-105"
										/>
										<div className="flex flex-col items-center">
											<span className="text-base leading-tight font-semibold text-white group-hover:text-white">
												{officer.name}
											</span>
											<span className="text-xs font-medium tracking-wide text-white/70 uppercase group-hover:text-white">
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
					<LightHeader
						badgeText="Reports"
						title="Annual Reports"
						subtitle="Review annual reports and corporate highlights of our continued growth and stability."
					/>
					<div className="grid w-full max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
						{annualReports.map((report, index) => (
							<LightCard
								useNativeSpacing={true}
								className="group relative flex flex-col overflow-hidden rounded-2xl p-0 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
								key={index}
							>
								<div className="relative">
									<img
										src={report.image}
										alt={report.title}
										className="h-60 w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<span className="absolute bottom-4 left-1/2 w-[90%] -translate-x-1/2 rounded-lg bg-white/90 px-4 py-2 text-center text-xl font-bold text-[#396131] shadow-md backdrop-blur-sm md:text-2xl">
										{report.title}
									</span>
								</div>
								<div className="flex flex-1 flex-col gap-6 px-6 py-6">
									<div>
										<span className="mb-2 block text-xl leading-tight font-bold text-[#396131]">
											Corporate Highlights
										</span>
										<ul className="flex flex-col gap-2">
											{report.corporate_highlights.map((highlight, idx) => (
												<li key={idx} className="flex items-center gap-3">
													<span className="inline-block h-4 w-4 flex-shrink-0 rounded bg-gradient-to-br from-[#396131] to-[#4a7a3f]"></span>
													<span className="text-base leading-relaxed font-normal text-gray-700">
														{highlight}
													</span>
												</li>
											))}
										</ul>
									</div>
									<div className="mt-auto flex justify-center">
										<LightPrimaryButton
											to=""
											className="w-full py-4 text-xl"
											secondaryIcon={<ArrowRight className="ml-3 h-5 w-5" />}
											onClick={(e) => {
												e.preventDefault();
												setAnnualReportModalIdx(index);
											}}
										>
											See Full Report
										</LightPrimaryButton>
									</div>
								</div>
							</LightCard>
						))}
					</div>
					{/* Modal for detail view */}
					<AnnualReportModal
						open={annualReportModalIdx !== null}
						report={
							typeof annualReportModalIdx === 'number' ? annualReports[annualReportModalIdx] : null
						}
						onClose={() => setAnnualReportModalIdx(null)}
						onViewPDF={() => {
							setPdfModalOpen(true);
						}}
						onPrev={() => setAnnualReportModalIdx((idx) => (idx > 0 ? idx - 1 : idx))}
						onNext={() =>
							setAnnualReportModalIdx((idx) => (idx < annualReports.length - 1 ? idx + 1 : idx))
						}
						showPrev={typeof annualReportModalIdx === 'number' && annualReportModalIdx > 0}
						showNext={
							typeof annualReportModalIdx === 'number' &&
							annualReports &&
							annualReportModalIdx < annualReports.length - 1
						}
					/>
					{/* Modal for PDF viewer */}
					<PDFModal
						open={pdfModalOpen}
						onClose={() => setPdfModalOpen(false)}
						pdfUrl={
							typeof annualReportModalIdx === 'number' && annualReports[annualReportModalIdx]
								? annualReports[annualReportModalIdx].pdf_file
								: null
						}
					/>
				</section>
			</main>
		</>
	);
}
