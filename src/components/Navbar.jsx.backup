import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CaretDownIcon } from '@phosphor-icons/react';
import Footer from './Footer';
import ChatBox from './ChatBox';

import logo from '/src/assets/logo-official.png';
import gcash from '/src/assets/gcash-logo-png_seeklogo-522261-removebg-preview.png';
import bsp from '/src/assets/image-removebg-preview (1).png';
import ctb from '/src/assets/image-removebg-preview (2).png';
import pdic from '/src/assets/image-removebg-preview.png';
import usaid from '/src/assets/Seal_of_the_United_States_Agency_for_International_Development.svg.png';
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
		{ navItem: 'HOME', path: '/', subItems: [] },
		{
			navItem: 'CONSUMER PROTECTION',
			path: '/consumer-protection',
			subItems: [
				{
					subItem: 'Privacy Policy',
					path: '/consumer-protection/privacy-policy'
				},
				{ subItem: '1VB Products', path: '/consumer-protection/1vb-products' },
				{
					subItem: 'Product Requirements',
					path: '/consumer-protection/product-requirements'
				}
			]
		},
		{ navItem: 'ABOUT US', path: '/about-us', subItems: [] },
		{ navItem: '1VB ADVISORY', path: '/1vb-advisory', subItems: [] },
		{ navItem: 'NEWSLETTER', path: '/newsletter', subItems: [] },
		{
			navItem: 'PRODUCTS',
			path: '/consumer-protection/1vb-products',
			subItems: []
		}
	];

	const secondaryNavbarItems = [
		{
			navItem: 'DEPOSITS',
			path: '/deposits',
			subItems: [
				{
					subItem: 'Regular Savings',
					path: '/deposits/regular-savings',
					subsubItems: [
						{ subItem: 'SD PLUS', path: '/deposits/regular-savings' },
						{
							subItem: '1ST CHECKING ACCOUNT',
							path: '/deposits/regular-savings'
						}
					]
				},
				{
					subItem: 'Special Savings',
					path: '/deposits/special-savings',
					subsubItems: [
						{ subItem: 'SSD MICRO', path: '/deposits/special-savings' },
						{ subItem: 'SSD REGULAR', path: '/deposits/special-savings' },
						{ subItem: 'HANDOG SAVINGS', path: '/deposits/special-savings' },
						{ subItem: 'BASIC SAVINGS', path: '/deposits/special-savings' }
					]
				}
			]
		},
		{
			navItem: 'LOANS',
			path: '/loans',
			subItems: [
				{
					subItem: 'Agriculture',
					path: '/loans/agriculture',
					subsubItems: []
				},
				{
					subItem: 'Small and Medium Enterprises (SME)',
					path: '/loans/small-and-medium-enterprises',
					subsubItems: []
				},
				{
					subItem: 'Microfinance',
					path: '/loans/microfinance',
					subsubItems: []
				},
				{
					subItem: 'Supervised Credit (SUCRE)',
					path: '/loans/supervised-credit',
					subsubItems: []
				},
				{
					subItem: 'Gold & Gems',
					path: '/loans/gold-and-gems',
					subsubItems: []
				},
				{
					subItem: 'Small Business Loan (SBL)',
					path: '/loans/small-business-loan',
					subsubItems: []
				},
				{
					subItem: 'Salary',
					path: '/loans/salary',
					subsubItems: []
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
				<div className="fixed top-0 left-0 z-50 h-1 w-full bg-gray-800">
					<div
						className="h-full bg-gradient-to-r from-[#31542B] via-[#FB3F3F] to-[#FDE900] transition-all duration-300"
						style={{
							width: `${
								(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
							}%`
						}}
					/>
				</div>

				{/* DESKTOP NAVBAR */}
				<div
					className="fixed z-99 hidden w-full bg-white lg:block"
					onMouseLeave={() => setActiveItemHover('')}
				>
					{/* Primary Navbar */}

					<div className="flex h-[69px] w-full items-center justify-end bg-[#5E9B55] px-[40px] py-[10px]">
						<div className="">
							<NavLink to="/">
								<img
									src={logo}
									className="h-[40px] transition-transform duration-200 hover:scale-105"
									alt=""
								/>
							</NavLink>
						</div>
						<div className="flex w-full max-w-screen items-center justify-end gap-[30px] text-[0.5625rem] text-white">
							<ul className="flex gap-[30px]">
								{navbarNavigationItems.map((navItem, index) => (
									<li key={index} onMouseEnter={() => setActiveItemHover(navItem.path)}>
										<NavLink
											to={navItem.path}
											className={({ isActive }) =>
												isActive
													? 'flex transform flex-col items-center text-[0.9rem] font-bold transition-all duration-200 hover:scale-105 hover:text-gray-200'
													: 'flex transform flex-col items-center text-[0.9rem] font-bold transition-all duration-200 hover:scale-105 hover:text-gray-200'
											}
											key={index}
										>
											{navItem.subItems.length > 0 ? (
												<div className="flex items-center gap-[5px]">
													<span className="flex">{navItem.navItem}</span>

													<FontAwesomeIcon
														icon={faAngleUp}
														className={
															activeItemHover == navItem.path
																? 'rotate-180 transition-all duration-300'
																: 'transition-all duration-300'
														}
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
											} h-[3px] rounded-full transition-all duration-300 ease-in-out`}
										></div>

										{/* Primary Dropdown */}
										{activeItemHover == navItem.path && navItem.subItems.length > 0 && (
											<div className="absolute left-0 z-100 mt-[82px] flex w-[100vw] bg-white text-[0.9rem] text-black opacity-100 shadow-xl transition-all duration-300 ease-in-out">
												<div className="h-full min-h-[200px] min-w-[250px] bg-[#31542B] pt-[20px] pr-[30px] pl-[20px]">
													<span className="font-bold text-white capitalize">{navItem.navItem}</span>
												</div>
												<div className="leading-auto flex flex-col gap-[20px] py-[10px] pl-[50px]">
													{navItem.subItems.map((subItem, index) => (
														<NavLink
															onMouseEnter={() => setActiveSubItemHover(subItem.path)}
															onMouseLeave={() => setActiveSubItemHover('')}
															to={subItem.path}
															key={index}
															className="flex w-full items-center gap-[10px] font-bold text-[#31542B] transition-all duration-200 hover:translate-x-2"
														>
															<div className="h-[25px] w-[25px] rounded-[5px] bg-[#31542B] transition-all duration-200 hover:bg-[#396131]"></div>
															<div className="flex flex-col">
																<span className="transition-colors duration-200 hover:text-[#396131]">
																	{subItem.subItem}
																</span>
																<div
																	className={`${
																		navItem.path == location || activeSubItemHover == subItem.path
																			? 'w-full bg-[#31542B]'
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
							</ul>
							<NavLink to="/contact-us">
								<span className="transform cursor-pointer rounded-[10px] bg-white px-[20px] py-[12px] text-[0.875rem] font-bold text-[#396131] outline-0 outline-white drop-shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#396131] hover:text-white hover:outline-1">
									Contact Us
								</span>
							</NavLink>
						</div>
					</div>

					{/* Secondary Navbar with Enhanced Multi-Level Dropdowns */}
					<div
						className="flex w-full gap-[20px] bg-white px-[95px] py-[15px] font-[#1E1E1E] text-[14px] font-bold drop-shadow-lg"
						onMouseLeave={handleSecondaryNavItemLeave}
					>
						<ul className="flex gap-[30px]">
							{secondaryNavbarItems.map((navItem, index) => (
								<li
									key={index}
									onMouseEnter={() => {
										handleSecondaryNavItemHover(index);
										setActiveItemHover('');
									}}
								>
									<NavLink to={navItem.path} className="group" key={index}>
										{navItem.subItems.length > 0 ? (
											<div className="flex items-center gap-[5px] transition-all duration-200 hover:text-[#396131]">
												{navItem.navItem}
												<FontAwesomeIcon
													icon={faAngleUp}
													className={
														activeDropdown === index
															? 'rotate-180 transition-all duration-300'
															: 'transition-all duration-300'
													}
												/>
											</div>
										) : (
											<span className="transition-all duration-200 hover:text-[#396131]">
												{navItem.navItem}
											</span>
										)}
										<div
											className={`${
												navItem.path == location || activeDropdown === index
													? 'w-full bg-[#1E1E1E]'
													: 'w-0 bg-transparent'
											} h-[3px] rounded-full transition-all duration-300 ease-in-out`}
										></div>
									</NavLink>

									{/* Multi-Level Dropdown */}
									{activeDropdown === index && navItem.subItems.length > 0 && (
										<div className="absolute left-0 z-40 mt-[16px] w-[100vw] translate-y-0 bg-white text-[0.9rem] text-black opacity-100 shadow-2xl transition-all duration-300 ease-in-out">
											<div className="flex">
												{/* Left Sidebar for SubItems */}
												<div className="flex min-h-[300px] min-w-[280px] flex-col bg-[#31542B]">
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
																	<span>{subItem.subItem}</span>
																	{subItem.subsubItems.length > 0 && (
																		<FontAwesomeIcon icon={faAngleRight} className="text-sm" />
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
															<h3 className="mb-[20px] border-b-2 border-[#31542B] pb-2 text-lg font-bold text-[#31542B]">
																{navItem.subItems[activeSubDropdown].subItem}
															</h3>

															{navItem.subItems[activeSubDropdown].subsubItems.length > 0 ? (
																<div className="grid grid-cols-2 gap-[20px]">
																	{navItem.subItems[activeSubDropdown].subsubItems.map(
																		(subsubItem, subsubIndex) => (
																			<NavLink
																				key={subsubIndex}
																				to={subsubItem.path}
																				className="group flex items-center gap-[15px] rounded-lg border border-transparent p-[15px] transition-all duration-200 hover:border-[#31542B] hover:bg-gray-50"
																			>
																				<div className="h-[12px] w-[12px] rounded-full bg-[#31542B] transition-colors duration-200 group-hover:bg-[#396131]"></div>
																				<div className="flex flex-col">
																					<span className="font-semibold text-[#31542B] transition-colors duration-200 group-hover:text-[#396131]">
																						{subsubItem.subItem}
																					</span>
																					<div className="h-[2px] w-0 bg-[#396131] transition-all duration-300 ease-in-out group-hover:w-full"></div>
																				</div>
																			</NavLink>
																		)
																	)}
																</div>
															) : (
																<div className="text-gray-500 italic">
																	Navigate to {navItem.subItems[activeSubDropdown].subItem} for more
																	information.
																</div>
															)}
														</div>
													)}

													{activeSubDropdown === null && (
														<div className="mt-[50px] text-center text-gray-400">
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
				</div>

				{/* MOBILE */}
				<div className="fixed z-50 w-full lg:hidden">
					{/* Mobile Header */}
					<div className="flex h-16 items-center justify-between bg-[#31542B] px-4">
						<div className="flex items-center">
							<NavLink to="/" className="flex h-10 w-10 items-center justify-center rounded-lg">
								<img src={logo} alt="" />
							</NavLink>
						</div>

						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="p-1 text-white"
						>
							{isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</button>
					</div>

					{/* Mobile Menu Overlay */}
					{isMobileMenuOpen && (
						<div className="bg-opacity-50 fixed inset-0 z-50 bg-black" onClick={closeMobileMenu}>
							<div
								className="absolute top-0 right-0 h-full w-80 overflow-y-auto bg-white shadow-xl"
								onClick={(e) => e.stopPropagation()}
							>
								{/* Menu Header */}
								<div className="flex items-center justify-between bg-[#31542B] p-4 text-white">
									<h2 className="text-lg font-bold"></h2>
									<button onClick={closeMobileMenu}>
										<X className="h-6 w-6" />
									</button>
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
														className="flex-1 rounded-lg px-2 py-3 font-semibold text-[#31542B] transition-colors duration-200 hover:bg-gray-50"
														onClick={closeMobileMenu}
													>
														{navItem.navItem}
													</NavLink>
													{navItem.subItems.length > 0 && (
														<button
															onClick={() => handleDropdownToggle(`primary-${index}`)}
															className="rounded-lg p-2 text-[#31542B] hover:bg-gray-50"
														>
															<ChevronDown
																className={`h-4 w-4 transition-transform duration-200 ${
																	activeDropdown === `primary-${index}` ? 'rotate-180' : ''
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
																className="block rounded-lg px-3 py-2 text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-[#31542B]"
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
										<h3 className="mb-3 text-sm font-bold tracking-wide text-gray-500 uppercase">
											Categories
										</h3>
										{secondaryNavbarItems.map((navItem, index) => (
											<div key={index} className="mb-2">
												<div className="flex items-center justify-between">
													<NavLink
														to={navItem.path}
														className="flex-1 rounded-lg px-2 py-3 font-semibold text-[#31542B] transition-colors duration-200 hover:bg-gray-50"
														onClick={closeMobileMenu}
													>
														{navItem.navItem}
													</NavLink>
													{navItem.subItems.length > 0 && (
														<button
															onClick={() => handleDropdownToggle(`secondary-${index}`)}
															className="rounded-lg p-2 text-[#31542B] hover:bg-gray-50"
														>
															<ChevronDown
																className={`h-4 w-4 transition-transform duration-200 ${
																	activeDropdown === `secondary-${index}` ? 'rotate-180' : ''
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
																		className="flex-1 rounded-lg px-3 py-2 text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-[#31542B]"
																		onClick={closeMobileMenu}
																	>
																		{subItem.subItem}
																	</NavLink>
																	{subItem.subsubItems.length > 0 && (
																		<button
																			onClick={() =>
																				handleSubDropdownToggle(`${index}-${subIndex}`)
																			}
																			className="p-1 text-gray-400 hover:text-[#31542B]"
																		>
																			<ChevronRight
																				className={`h-3 w-3 transition-transform duration-200 ${
																					activeSubDropdown === `${index}-${subIndex}`
																						? 'rotate-90'
																						: ''
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
																					href={subsubItem.path}
																					className="block rounded-lg px-3 py-2 text-sm text-gray-500 transition-colors duration-200 hover:bg-gray-50 hover:text-[#31542B]"
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
									<div className="border-t border-gray-200 pt-4">
										<NavLink
											href="/contact-us"
											className="block w-full rounded-lg bg-[#31542B] px-4 py-3 text-center font-semibold text-white transition-colors duration-200 hover:bg-[#396131]"
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

				<div className="mt-20 lg:mt-[133px]">{children}</div>
				<ChatBox />

				{/* Footer remains the same */}
				<Footer />
			</div>
		</>
	);
}
