import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Info, MapPin, Phone } from 'lucide-react';
import Footer from './Footer';
import ChatBox from './ChatBox';
import { Search, TextSearch } from 'lucide-react';

import logo from '/src/assets/logo-official.png';
import gcash from '/src/assets/gcash-logo.png';
import bsp from '/src/assets/image-removebg-preview (1).png';
import ctb from '/src/assets/image-removebg-preview (2).png';
import pdic from '/src/assets/image-removebg-preview.png';
import usaid from '/src/assets/Seal_of_the_United_States_Agency_for_International_Development.svg.png';

import logoLight from '/src/assets/logo-light.svg';
import lightLogo from '/src/assets/1VB LOGO/1VB-light-hd.png';
import mobileLightlogo from '/src/assets/logo-light.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebook,
	faGoogle,
	faLinkedin,
	faSignalMessenger,
	faSkype,
	faYoutube
} from '@fortawesome/free-brands-svg-icons';
import {
	faAngleDown,
	faAngleRight,
	faArrowRight,
	faAngleUp,
	faEnvelopeCircleCheck,
	faMessage,
	faPaperPlane,
	faPhone,
	faVoicemail
} from '@fortawesome/free-solid-svg-icons';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

export default function Navbar({ children }) {
	const [scrollY, setScrollY] = useState(0);
	const [searchTerm, setSearchTerm] = useState('');
	// Primary navbar states
	const [activeItemHover, setActiveItemHover] = useState('');
	const [activeSubItemHover, setActiveSubItemHover] = useState('');

	// Secondary navbar states for multi-level dropdowns
	const [activeDropdown, setActiveDropdown] = useState(null);
	const [activeSubDropdown, setActiveSubDropdown] = useState(null);
	const [activeSubSubDropdown, setActiveSubSubDropdown] = useState(null);

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navigate = useNavigate();

	// Track scroll position
	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const location = window.location.pathname;

	const navbarNavigationItems = [
		{ navItem: 'HOME', path: '/', icon: <Home size={18} />, subItems: [] },
		{ navItem: 'ABOUT US', path: '/about-us', icon: <Info size={18} />, subItems: [] },
		{ navItem: 'BRANCHES', path: '/branches', icon: <MapPin size={18} />, subItems: [] },
		{ navItem: 'CONTACT US', path: '/contact-us', icon: <Phone size={18} />, subItems: [] }
	];

	const secondaryNavbarItems = [
		{
			navItem: 'DEPOSITS',
			path: '/deposits',
			subItems: [
				{
					subItem: 'Savings Accounts',
					path: '/deposits/savings-account',
					subsubItems: [
						{ subItem: 'SD PLUS', path: '/deposits/savings-account' },
						{ subItem: 'SSD MICRO', path: '/deposits/savings-account' },
						{ subItem: 'SSD REGULAR', path: '/deposits/savings-account' },
						{ subItem: 'HANDOG SAVINGS', path: '/deposits/savings-account' },
						{ subItem: 'BASIC SAVINGS', path: '/deposits/savings-account' }
					]
				},
				{
					subItem: 'Checking Accounts',
					path: '/deposits/checking-account',
					subsubItems: [{ subItem: '1ST CHECKING ACCOUNT', path: '/deposits/checking-account' }]
				},
				{
					subItem: 'Time Deposit',
					path: '/deposits/time-deposit',
					subsubItems: [
						{ subItem: '3 Months', path: '/deposits/time-deposit' },
						{ subItem: '6 Months', path: '/deposits/time-deposit' },
						{ subItem: '1 Year', path: '/deposits/time-deposit' },
						{ subItem: '2 Years', path: '/deposits/time-deposit' }
					]
				}
			]
		},
		{
			navItem: 'LOANS',
			path: '/loans',
			subItems: [
				{
					subItem: 'Salary Loans',
					path: '/loans/salary',
					subsubItems: [
						{ subItem: 'Government Employees', path: '/loans/salary' },
						{ subItem: 'Private Employees', path: '/loans/salary' }
					]
				},
				{
					subItem: 'Small Business Loan (SBL)',
					path: '/loans/small-business-loan',
					subsubItems: [
						{ subItem: 'Micro Business', path: '/loans/small-business-loan' },
						{ subItem: 'Small Business', path: '/loans/small-business-loan' }
					]
				},
				{
					subItem: 'Small and Medium Enterprise (SME)',
					path: '/loans/small-and-medium-enterprises',
					subsubItems: [
						{ subItem: 'SME Term Loan', path: '/loans/small-and-medium-enterprises' },
						{ subItem: 'SME Credit Line', path: '/loans/small-and-medium-enterprises' }
					]
				},
				{
					subItem: 'Gold & Gems (GG) and Jewelry Business Loan (JBL)',
					path: '/loans/gold-and-gems',
					subsubItems: [
						{ subItem: 'Gold & Gems Loan', path: '/loans/gold-and-gems' },
						{ subItem: 'Jewelry Business Loan', path: '/loans/gold-and-gems' }
					]
				},
				{
					subItem: 'Supervised Credit or Crop Production Loan',
					path: '/loans/supervised-credit',
					subsubItems: [
						{ subItem: 'Rice Production', path: '/loans/supervised-credit' },
						{ subItem: 'Corn Production', path: '/loans/supervised-credit' },
						{ subItem: 'High Value Crops', path: '/loans/supervised-credit' }
					]
				},
				{
					subItem: 'Agriculture Loan',
					path: '/loans/agriculture',
					subsubItems: [
						{ subItem: 'Agri Machinery', path: '/loans/agriculture' },
						{ subItem: 'Livestock', path: '/loans/agriculture' },
						{ subItem: 'Fisheries', path: '/loans/agriculture' }
					]
				},
				{
					subItem: 'Microfinance',
					path: '/loans/microfinance',
					subsubItems: [
						{ subItem: 'Group Loan', path: '/loans/microfinance' },
						{ subItem: 'Individual Loan', path: '/loans/microfinance' }
					]
				}
			]
		},
		{
			navItem: 'PROPERTIES FOR SALE',
			path: '/properties-for-sale',
			subItems: [
				{
					subItem: 'Vehicles',
					path: '/properties-for-sale/vehicles',
					subsubItems: []
				},
				{
					subItem: 'Real Estate and Other Properties Acquired for Sale',
					path: '/properties-for-sale/real-estate-and-other-properties-acquired-for-sale',
					subsubItems: []
				}
			]
		},
		{
			navItem: 'ATM LOCATOR',
			path: '/atm-locator',
			subItems: []
		},
		// Inserted as single direct links, not dropdowns
		{
			navItem: '1VB ADVISORY',
			path: '/1vb-advisory',
			subItems: []
		},
		{
			navItem: 'NEWSLETTER',
			path: '/newsletter',
			subItems: []
		},
		{
			navItem: 'CONSUMER PROTECTION',
			path: '/consumer-protection',
			subItems: []
		}
	];

	const footerNavigationItems = [
		{ navItem: 'Home', link: '/' },
		{ navItem: 'Deposits', link: '/deposits' },
		{ navItem: 'About Us', link: '/about-us' },
		{ navItem: 'Loans', link: '/loans' },
		{ navItem: 'Properties for Sale', link: '/properties-for-sale' },
		{ navItem: '1VB Advisory', link: '/1vb-advisory' },
		{ navItem: 'Consumer Protection', link: '/consumer-protection' },
		{ navItem: 'Newsletter', link: '/newsletter' }
	];

	const footerAgenciesNavigationItems = [
		{ image: bsp, link: '' },
		{ image: usaid, link: '' },
		{ image: ctb, link: '' },
		{ image: gcash, link: '' },
		{ image: pdic, link: '' }
	];

	const footerSocMedLinks = [
		{ link: '', icon: faFacebook },
		{ link: '', icon: faSkype },
		{ link: '', icon: faGoogle },
		{ link: '', icon: faLinkedin },
		{ link: '', icon: faYoutube }
	];

	// Enhanced hover handlers for secondary navbar
	const handleSecondaryNavItemHover = (index) => {
		setActiveDropdown(index);
		setActiveSubDropdown(null);
		setActiveSubSubDropdown(null);
	};

	const handleSecondaryNavItemLeave = () => {
		setActiveDropdown(null);
		setActiveSubDropdown(null);
		setActiveSubSubDropdown(null);
	};

	const handleSubItemHover = (subIndex) => {
		setActiveSubDropdown(subIndex);
		setActiveSubSubDropdown(null);
	};

	const handleSubSubItemHover = (subsubIndex) => {
		setActiveSubSubDropdown(subsubIndex);
	};

	const handleDropdownToggle = (index) => {
		setActiveDropdown(activeDropdown === index ? null : index);
		setActiveSubDropdown(null);
	};

	const handleSubDropdownToggle = (index) => {
		setActiveSubDropdown(activeSubDropdown === index ? null : index);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
		setActiveDropdown(null);
		setActiveSubDropdown(null);
	};

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' });
	}, [location]);

	return (
		<>
			<div className="font-poppins flex h-full w-full flex-col scroll-smooth">
				{/* UNIFIED RESPONSIVE NAVBAR */}
				<div className="fixed z-49 w-full bg-[#396131]" onMouseLeave={() => setActiveItemHover('')}>
					{/* Primary Navigation Section */}
					<div className="flex w-full items-center justify-between border-b-1 border-white bg-transparent px-10 py-4">
						{/* Logo */}
						<div className="flex items-center justify-start xl:w-1/3">
							<NavLink to="/">
								<img
									src={mobileLightlogo}
									className="hidden transition-transform duration-200 hover:scale-105 md:hidden lg:block lg:h-[84px]"
									alt=""
								/>
								<img
									src={mobileLightlogo}
									className="block h-[36px] transition-transform duration-200 hover:scale-105 lg:hidden"
									alt=""
								/>
							</NavLink>
						</div>

						{/* Desktop/Tablet Navigation Menu */}
						<div className="hidden items-center justify-center py-4 text-white xl:flex xl:w-1/3 xl:gap-[30px]">
							<ul className="flex h-full items-center justify-center gap-3 md:gap-4 xl:gap-[30px]">
								{navbarNavigationItems.map((navItem, index) => (
									<li
										key={index}
										onMouseEnter={() =>
											window.innerWidth >= 1280 && setActiveItemHover(navItem.path)
										}
										className="hidden xl:block"
									>
										<NavLink
											to={navItem.path}
											className={({ isActive }) =>
												isActive
													? 'flex h-full transform flex-col items-center text-[1.125rem] font-bold whitespace-nowrap text-white transition-all duration-200 hover:scale-105 hover:text-yellow-300'
													: 'flex h-full transform flex-col items-center text-[1.125rem] font-bold whitespace-nowrap text-white transition-all duration-200 hover:scale-105 hover:text-yellow-300'
											}
										>
											{navItem.subItems.length > 0 ? (
												<div className="flex items-center gap-[5px]">
													<span className="flex">{navItem.navItem}</span>
													<FontAwesomeIcon
														icon={faAngleUp}
														className={`${
															activeItemHover == navItem.path
																? 'rotate-180 text-white transition-all duration-300'
																: 'text-white transition-all duration-300'
														}`}
													/>
												</div>
											) : (
												<>{navItem.navItem}</>
											)}
										</NavLink>
										<div
											className={`${
												navItem.path == location || activeItemHover == navItem.path
													? 'w-full bg-white'
													: 'w-0 bg-transparent'
											} h-1 rounded-full transition-all duration-300 ease-in-out`}
										></div>

										{/* Primary Dropdown - Desktop Only */}
										{activeItemHover == navItem.path &&
											navItem.subItems.length > 0 &&
											window.innerWidth >= 1280 && (
												<div className="absolute left-0 z-100 mt-[82px] flex w-full max-w-screen bg-gradient-to-l from-[#396131] to-[#4a7c3a] text-[0.9rem] text-white opacity-100 shadow-xl transition-all duration-300 ease-in-out">
													<div className="h-full min-h-[200px] min-w-[250px] bg-[#31542B]/80 pt-[20px] pr-[30px] pl-[20px]">
														<span className="font-bold text-white capitalize">
															{navItem.navItem}
														</span>
													</div>
													<div className="leading-auto flex flex-col gap-[20px] py-[10px] pl-[50px]">
														{navItem.subItems.map((subItem, index) => (
															<NavLink
																onMouseEnter={() => setActiveSubItemHover(subItem.path)}
																onMouseLeave={() => setActiveSubItemHover('')}
																to={subItem.path}
																key={index}
																className="flex w-full items-center gap-[10px] font-bold text-white transition-all duration-200 hover:translate-x-2 hover:text-[#d1ffdc]"
															>
																<div className="h-[25px] w-[25px] rounded-[5px] bg-[#31542B] transition-all duration-200 hover:bg-[#396131]"></div>
																<div className="flex flex-col">
																	<span className="transition-colors duration-200 hover:text-[#d1ffdc]">
																		{subItem.subItem}
																	</span>
																	<div
																		className={`${
																			navItem.path == location || activeSubItemHover == subItem.path
																				? 'w-full bg-white'
																				: 'w-0 bg-transparent'
																		} h-[3px] rounded-full transition-all duration-300 ease-in-out`}
																	></div>
																</div>
															</NavLink>
														))}
													</div>
												</div>
											)}
									</li>
								))}

								{/* Tablet Navigation Items */}
								{navbarNavigationItems.slice(0, 4).map((navItem, index) => (
									<li key={index} className="block md:block xl:hidden">
										<NavLink
											to={navItem.path}
											className="text-[0.7rem] font-bold text-white transition-all duration-200 hover:scale-105 hover:text-[#c8f5cb]"
										>
											{navItem.navItem}
										</NavLink>
									</li>
								))}
							</ul>
						</div>
						{/* --- Search Bar (Desktop/Tablet) --- */}
						<div className="hidden items-center justify-end xl:flex xl:w-1/3">
							<form
								onSubmit={(e) => {
									e.preventDefault();
									if (searchTerm.trim()) {
										navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
										setIsMobileMenuOpen(false);
										setActiveDropdown(null);
										setActiveSubDropdown(null);
										setActiveSubSubDropdown(null);
										setActiveItemHover('');
									}
								}}
								className="flex w-full max-w-[300px] overflow-hidden rounded-[5px] shadow-md"
							>
								<div className="absolute py-2 pl-4">
									<Search className="h-5 w-5 text-[#396131]" />
								</div>
								<input
									type="text"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="h-full w-full border-0 bg-white py-2 pl-13 text-base font-medium text-[#396131] placeholder-gray-300 outline-none placeholder:text-xs focus:ring-0"
									aria-label="Search query"
									placeholder="Search..."
								/>
								<button
									type="submit"
									className="flex cursor-pointer items-center justify-center rounded-r-[5px] bg-[#396131] px-4 text-xs font-bold text-white transition-colors duration-200 hover:bg-red-500"
									aria-label="Search"
								>
									SEARCH
								</button>
							</form>
						</div>

						{/* --- Search Bar (Tablet) --- */}
						<div className="mx-2 hidden w-1/3 max-w-xs items-center md:flex xl:hidden">
							<form
								onSubmit={(e) => {
									e.preventDefault();
									if (searchTerm.trim()) {
										navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
										setIsMobileMenuOpen(false);
										setActiveDropdown(null);
										setActiveSubDropdown(null);
										setActiveSubSubDropdown(null);
										setActiveItemHover('');
									}
								}}
								className="flex w-full overflow-hidden rounded-[5px] shadow-md"
							>
								<div className="absolute py-2 pl-4">
									<Search className="h-5 w-5 text-[#396131]" />
								</div>
								<input
									type="text"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="h-full w-full border-0 bg-white py-2 pl-13 text-base font-medium text-[#396131] placeholder-gray-300 outline-none placeholder:text-xs focus:ring-0"
									aria-label="Search query"
									placeholder="Search..."
								/>
								<button
									type="submit"
									className="flex cursor-pointer items-center justify-center rounded-r-[5px] bg-[#396131] px-4 text-xs font-bold text-white transition-colors duration-200 hover:bg-red-500"
									aria-label="Search"
								>
									SEARCH
								</button>
							</form>
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="touch-manipulation p-2 text-white md:block xl:hidden"
						>
							{isMobileMenuOpen ? (
								<X className="h-6 w-6 text-white" />
							) : (
								<Menu className="h-6 w-6 text-white" />
							)}
						</button>
					</div>

					{/* Secondary Navigation Section - Desktop Only */}
					<div
						className="hidden w-full justify-between gap-3 bg-transparent px-10 py-3 text-[12px] font-bold drop-shadow-lg xl:flex xl:gap-[20px] xl:py-[15px] xl:text-[14px]"
						onMouseLeave={handleSecondaryNavItemLeave}
					>
						<ul className="flex gap-3 text-white xl:gap-[30px]">
							{secondaryNavbarItems.slice(0, 4).map((navItem, index) => (
								<li
									key={index}
									onMouseEnter={() => {
										if (window.innerWidth >= 1280) {
											handleSecondaryNavItemHover(index);
											setActiveItemHover('');
										}
									}}
								>
									<NavLink to={navItem.path} className="group">
										{navItem.subItems.length > 0 ? (
											<div className="flex items-center gap-[5px] transition-all duration-200 hover:text-yellow-300">
												<span className="text-[10px] xl:text-sm">{navItem.navItem}</span>
												<FontAwesomeIcon
													icon={faAngleUp}
													className={`transition-all duration-300 ${activeDropdown === index ? 'rotate-180 text-white' : 'text-white'}`}
												/>
											</div>
										) : (
											<span className="text-[10px] transition-all duration-200 hover:text-yellow-300 xl:text-sm">
												{navItem.navItem}
											</span>
										)}
										<div
											className={`${
												navItem.path == location ||
												(activeDropdown === index && window.innerWidth >= 1280)
													? 'w-full bg-white'
													: 'w-0 bg-transparent'
											} h-[3px] rounded-full transition-all duration-300 ease-in-out`}
										></div>
									</NavLink>

									{/* Multi-Level Dropdown - Desktop Only */}
									{activeDropdown === index &&
										navItem.subItems.length > 0 &&
										window.innerWidth >= 1280 && (
											<div className="absolute left-0 z-40 mt-[16px] w-full max-w-screen bg-gradient-to-l from-[#396131] to-[#4a7c3a] text-[0.9rem] text-white opacity-100 shadow-2xl transition-all duration-300 ease-in-out">
												<div className="flex">
													{/* Left Sidebar for SubItems */}
													<div className="flex min-h-[300px] min-w-[280px] flex-col bg-[#31542B]/80">
														{navItem.subItems.map((subItem, subIndex) => (
															<NavLink
																to={subItem.path}
																key={subIndex}
																className="relative"
																onMouseEnter={() => handleSubItemHover(subIndex)}
															>
																<button
																	onClick={() => {}}
																	className="w-full cursor-pointer border-l-4 border-transparent px-[20px] py-[15px] text-left leading-[1.4rem] font-bold text-white capitalize transition-all duration-200 hover:translate-x-2 hover:border-white hover:bg-[#396131]"
																>
																	<div className="flex items-center justify-between">
																		<span className="text-sm xl:text-base">{subItem.subItem}</span>
																		{subItem.subsubItems.length > 0 && (
																			<FontAwesomeIcon
																				icon={faAngleRight}
																				className="text-sm text-white"
																			/>
																		)}
																	</div>
																</button>
															</NavLink>
														))}
													</div>

													{/* Right Content Area */}
													<div className="flex-1 p-[30px]">
														{activeSubDropdown !== null && navItem.subItems[activeSubDropdown] && (
															<div className="transition-all duration-300 ease-in-out">
																<h3 className="mb-[20px] border-b-2 border-white pb-2 text-lg font-bold text-white">
																	{navItem.subItems[activeSubDropdown].subItem}
																</h3>

																{navItem.subItems[activeSubDropdown].subsubItems.length > 0 ? (
																	<div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
																		{navItem.subItems[activeSubDropdown].subsubItems.map(
																			(subsubItem, subsubIndex) => (
																				<NavLink
																					key={subsubIndex}
																					to={subsubItem.path}
																					className="group flex items-center gap-[15px] rounded-lg border border-transparent p-[15px] transition-all duration-200 hover:border-white hover:bg-[#4a7c3a]/40"
																				>
																					<div className="h-[12px] w-[12px] rounded-full bg-white transition-colors duration-200 group-hover:bg-[#396131]"></div>
																					<div className="flex flex-col">
																						<span className="font-semibold text-white transition-colors duration-200 group-hover:text-[#b8f2bf]">
																							{subsubItem.subItem}
																						</span>
																						<div className="h-[2px] w-0 bg-[#b8f2bf] transition-all duration-300 ease-in-out group-hover:w-full"></div>
																					</div>
																				</NavLink>
																			)
																		)}
																	</div>
																) : (
																	<div className="text-gray-300 italic">
																		Navigate to {navItem.subItems[activeSubDropdown].subItem} for
																		more information.
																	</div>
																)}
															</div>
														)}

														{activeSubDropdown === null && (
															<div className="mt-[50px] text-center text-gray-200">
																<p className="text-lg">
																	Hover over a category to see available options
																</p>
															</div>
														)}
													</div>
												</div>
											</div>
										)}
								</li>
							))}
						</ul>
						<ul className="flex gap-3 text-white xl:gap-[30px]">
							{secondaryNavbarItems.slice(4, 7).map((navItem, index) => (
								<li
									key={index}
									onMouseEnter={() => {
										if (window.innerWidth >= 1280) {
											handleSecondaryNavItemHover(index + 4);
											setActiveItemHover('');
										}
									}}
								>
									<NavLink to={navItem.path} className="group">
										{navItem.subItems.length > 0 ? (
											<div className="flex items-center gap-[5px] transition-all duration-200 hover:text-yellow-300">
												<span className="text-[10px] xl:text-sm">{navItem.navItem}</span>
												<FontAwesomeIcon
													icon={faAngleUp}
													className={`transition-all duration-300 ${activeDropdown === index + 3 ? 'rotate-180 text-white' : 'text-white'}`}
												/>
											</div>
										) : (
											<span className="text-[10px] transition-all duration-200 hover:text-yellow-300 xl:text-sm">
												{navItem.navItem}
											</span>
										)}
										<div
											className={`${
												navItem.path == location ||
												(activeDropdown === index + 4 && window.innerWidth >= 1280)
													? 'w-full bg-white'
													: 'w-0 bg-transparent'
											} h-[3px] rounded-full transition-all duration-300 ease-in-out`}
										></div>
									</NavLink>

									{/* Multi-Level Dropdown - Desktop Only */}
									{activeDropdown === index &&
										navItem.subItems.length > 0 &&
										window.innerWidth >= 1280 && (
											<div className="absolute left-0 z-40 mt-[16px] w-full max-w-screen bg-gradient-to-l from-[#396131] to-[#4a7c3a] text-[0.9rem] text-white opacity-100 shadow-2xl transition-all duration-300 ease-in-out">
												<div className="flex">
													{/* Left Sidebar for SubItems */}
													<div className="flex min-h-[300px] min-w-[280px] flex-col bg-[#31542B]/80">
														{navItem.subItems.map((subItem, subIndex) => (
															<NavLink
																to={subItem.path}
																key={subIndex}
																className="relative"
																onMouseEnter={() => handleSubItemHover(subIndex)}
															>
																<button
																	onClick={() => {}}
																	className="w-full cursor-pointer border-l-4 border-transparent px-[20px] py-[15px] text-left leading-[1.4rem] font-bold text-white capitalize transition-all duration-200 hover:translate-x-2 hover:border-white hover:bg-[#396131]"
																>
																	<div className="flex items-center justify-between">
																		<span className="text-sm xl:text-base">{subItem.subItem}</span>
																		{subItem.subsubItems.length > 0 && (
																			<FontAwesomeIcon
																				icon={faAngleRight}
																				className="text-sm text-white"
																			/>
																		)}
																	</div>
																</button>
															</NavLink>
														))}
													</div>

													{/* Right Content Area */}
													<div className="flex-1 p-[30px]">
														{activeSubDropdown !== null && navItem.subItems[activeSubDropdown] && (
															<div className="transition-all duration-300 ease-in-out">
																<h3 className="mb-[20px] border-b-2 border-white pb-2 text-lg font-bold text-white">
																	{navItem.subItems[activeSubDropdown].subItem}
																</h3>

																{navItem.subItems[activeSubDropdown].subsubItems.length > 0 ? (
																	<div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
																		{navItem.subItems[activeSubDropdown].subsubItems.map(
																			(subsubItem, subsubIndex) => (
																				<NavLink
																					key={subsubIndex}
																					to={subsubItem.path}
																					className="group flex items-center gap-[15px] rounded-lg border border-transparent p-[15px] transition-all duration-200 hover:border-white hover:bg-[#4a7c3a]/40"
																				>
																					<div className="h-[12px] w-[12px] rounded-full bg-white transition-colors duration-200 group-hover:bg-[#396131]"></div>
																					<div className="flex flex-col">
																						<span className="font-semibold text-white transition-colors duration-200 group-hover:text-[#b8f2bf]">
																							{subsubItem.subItem}
																						</span>
																						<div className="h-[2px] w-0 bg-[#b8f2bf] transition-all duration-300 ease-in-out group-hover:w-full"></div>
																					</div>
																				</NavLink>
																			)
																		)}
																	</div>
																) : (
																	<div className="text-gray-300 italic">
																		Navigate to {navItem.subItems[activeSubDropdown].subItem} for
																		more information.
																	</div>
																)}
															</div>
														)}

														{activeSubDropdown === null && (
															<div className="mt-[50px] text-center text-gray-200">
																<p className="text-lg">
																	Hover over a category to see available options
																</p>
															</div>
														)}
													</div>
												</div>
											</div>
										)}
								</li>
							))}
						</ul>
					</div>

					{/* Mobile Menu Overlay */}
					{isMobileMenuOpen && (
						<div
							className="bg-opacity-50 fixed inset-0 z-50 bg-black md:block xl:hidden"
							onClick={closeMobileMenu}
						>
							<div
								className="absolute top-0 right-0 h-full w-full max-w-sm overflow-y-auto bg-white shadow-xl"
								onClick={(e) => e.stopPropagation()}
							>
								{/* Menu Header */}
								<div className="flex items-center justify-between bg-gradient-to-l from-[#396131] to-[#4a7c3a] p-4 text-white">
									<h2 className="text-lg font-bold">Menu</h2>
									<button onClick={closeMobileMenu} className="touch-manipulation p-2">
										<X className="h-6 w-6 text-white" />
									</button>
								</div>

								{/* --- Mobile Search Bar --- */}
								<div className="p-4">
									<form
										onSubmit={(e) => {
											e.preventDefault();
											if (searchTerm.trim()) {
												navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
												setIsMobileMenuOpen(false);
												setActiveDropdown(null);
												setActiveSubDropdown(null);
												setActiveSubSubDropdown(null);
												setActiveItemHover('');
											}
										}}
										className="flex w-full overflow-hidden rounded-[5px] shadow-md"
									>
										<div className="absolute py-2 pl-4">
											<Search className="h-5 w-5 text-[#396131]" />
										</div>
										<input
											type="text"
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											className="h-full w-full border-0 bg-white py-2 pl-13 text-base font-medium text-[#396131] placeholder-gray-300 outline-none placeholder:text-xs focus:ring-0"
											aria-label="Search query"
											placeholder="Search..."
										/>
										<button
											type="submit"
											className="flex cursor-pointer items-center justify-center rounded-r-[5px] bg-[#396131] px-4 text-xs font-bold text-white transition-colors duration-200 hover:bg-[#27481e]"
											aria-label="Search"
										>
											SEARCH
										</button>
									</form>
								</div>

								{/* Menu Content */}
								<div className="p-4">
									{/* Primary Navigation */}
									<div className="mb-6">
										{navbarNavigationItems.map((navItem, index) => (
											<div key={index} className="mb-2">
												<div className="flex items-center justify-between">
													<NavLink
														to={navItem.path}
														className="flex-1 touch-manipulation rounded-lg px-3 py-3 text-sm font-semibold text-[#396131] transition-colors duration-200 hover:bg-[#f2fbf0] hover:text-[#204216]"
														onClick={closeMobileMenu}
													>
														{navItem.navItem}
													</NavLink>
													{navItem.subItems.length > 0 && (
														<button
															onClick={() => handleDropdownToggle(`primary-${index}`)}
															className="touch-manipulation rounded-lg p-2 text-[#396131] hover:bg-[#e4f9ea]"
														>
															<ChevronDown
																className={`h-4 w-4 transition-transform duration-200 ${
																	activeDropdown === `primary-${index}`
																		? 'rotate-180 text-[#396131]'
																		: 'text-[#396131]'
																}`}
															/>
														</button>
													)}
												</div>

												{/* Primary Subitems */}
												{activeDropdown === `primary-${index}` && navItem.subItems.length > 0 && (
													<div className="mt-2 ml-4 space-y-1">
														{navItem.subItems.map((subItem, subIndex) => (
															<NavLink
																key={subIndex}
																to={subItem.path}
																className="block touch-manipulation rounded-lg px-3 py-2 text-sm text-[#2b4a1d] transition-colors duration-200 hover:bg-[#e4f9ea] hover:text-[#396131]"
																onClick={closeMobileMenu}
															>
																{subItem.subItem}
															</NavLink>
														))}
													</div>
												)}
											</div>
										))}
									</div>

									{/* Secondary Navigation */}
									<div className="mb-6">
										<h3 className="mb-3 text-sm font-bold tracking-wide text-[#31542b] uppercase">
											Categories
										</h3>
										{secondaryNavbarItems.map((navItem, index) => (
											<div key={index} className="mb-2">
												<div className="flex items-center justify-between">
													<NavLink
														to={navItem.path}
														className="flex-1 touch-manipulation rounded-lg px-3 py-3 text-sm font-semibold text-[#396131] transition-colors duration-200 hover:bg-[#e1f5e7] hover:text-[#204216]"
														onClick={closeMobileMenu}
													>
														{navItem.navItem}
													</NavLink>
													{navItem.subItems.length > 0 && (
														<button
															onClick={() => handleDropdownToggle(`secondary-${index}`)}
															className="touch-manipulation rounded-lg p-2 text-[#396131] hover:bg-[#e4f9ea]"
														>
															<ChevronDown
																className={`h-4 w-4 transition-transform duration-200 ${
																	activeDropdown === `secondary-${index}`
																		? 'rotate-180 text-[#396131]'
																		: 'text-[#396131]'
																}`}
															/>
														</button>
													)}
												</div>

												{/* Secondary Subitems */}
												{activeDropdown === `secondary-${index}` && navItem.subItems.length > 0 && (
													<div className="mt-2 ml-4 space-y-1">
														{navItem.subItems.map((subItem, subIndex) => (
															<div key={subIndex}>
																<div className="flex items-center justify-between">
																	<NavLink
																		to={subItem.path}
																		className="flex-1 touch-manipulation rounded-lg px-3 py-2 text-sm text-[#28541f] transition-colors duration-200 hover:bg-[#e1f5e7] hover:text-[#396131]"
																		onClick={closeMobileMenu}
																	>
																		{subItem.subItem}
																	</NavLink>
																	{subItem.subsubItems.length > 0 && (
																		<button
																			onClick={() =>
																				handleSubDropdownToggle(`${index}-${subIndex}`)
																			}
																			className="touch-manipulation p-1 text-[#adcebb] hover:text-[#396131]"
																		>
																			<ChevronRight
																				className={`h-3 w-3 transition-transform duration-200 ${
																					activeSubDropdown === `${index}-${subIndex}`
																						? 'rotate-90 text-[#396131]'
																						: 'text-[#adcebb]'
																				}`}
																			/>
																		</button>
																	)}
																</div>

																{/* Sub-subitems */}
																{activeSubDropdown === `${index}-${subIndex}` &&
																	subItem.subsubItems.length > 0 && (
																		<div className="mt-1 ml-4 space-y-1">
																			{subItem.subsubItems.map((subsubItem, subsubIndex) => (
																				<NavLink
																					key={subsubIndex}
																					to={subsubItem.path}
																					className="block touch-manipulation rounded-lg px-3 py-2 text-sm text-[#396131] transition-colors duration-200 hover:bg-[#eaf8ef] hover:text-[#28541f]"
																					onClick={closeMobileMenu}
																				>
																					• {subsubItem.subItem}
																				</NavLink>
																			))}
																		</div>
																	)}
															</div>
														))}
													</div>
												)}
											</div>
										))}
									</div>

									{/* Contact Button */}
									<div className="border-t border-[#cce8d6] pt-4">
										<NavLink
											to="/contact-us"
											className="block w-full touch-manipulation rounded-lg bg-gradient-to-l from-[#396131] to-[#4a7c3a] px-4 py-3 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#396131]"
											onClick={closeMobileMenu}
										>
											Contact Us
										</NavLink>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="mt-[64px] md:mt-[64px] xl:mt-37">{children}</div>
				<ChatBox />

				{/* Footer remains the same */}
				<Footer />
			</div>
		</>
	);
}
