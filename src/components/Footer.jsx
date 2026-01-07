import React, { useState, useEffect } from 'react';
import logo from '/src/assets/logo-official.png';
import logolight from '/src/assets/1VB LOGO/1VB-light-hd.png';
import { NavLink } from 'react-router-dom';
import {
	Phone,
	Mail,
	MapPin,
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Youtube,
	ExternalLink,
	ChevronUp,
	Shield,
	Building2,
	Headphones
} from 'lucide-react';
import landingService from '../services/landingService';

// Icon mapping for dynamic import of social icons by name
const ICONS = {
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Youtube
};

const Footer = () => {
	const [email, setEmail] = useState('');
	const [isSubscribed, setIsSubscribed] = useState(false);
	const [footerData, setFooterData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchFooterData = async () => {
			setLoading(true);
			try {
				const data = await landingService.getFooter();
				setFooterData(data.data);
			} catch (error) {
				console.error('Error fetching footer data:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchFooterData();
	}, []);

	const handleEmailSubmit = () => {
		if (email && email.includes('@')) {
			setIsSubscribed(true);
			setTimeout(() => setIsSubscribed(false), 3000);
			setEmail('');
		}
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	// Guards for dynamic values
	const footer = footerData?.footer;
	const quickLinks = footerData?.quick_links || [];
	const socialLinks = footerData?.social_links || [];

	return (
		<footer className="relative">
			{/* Scroll to Top Button */}
			<button
				onClick={scrollToTop}
				className="absolute top-6 right-6 z-20 cursor-pointer rounded-full bg-white/20 p-3 drop-shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white/30"
				aria-label="Scroll to top"
			>
				<ChevronUp className="h-5 w-5 text-[#396131]" />
			</button>

			{/* Contact Us Section */}
			<section className="bg-white py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<h2 className="mb-12 text-3xl font-bold text-gray-900 sm:text-4xl">
						{footer?.contact_us_title || 'Contact us'}
					</h2>
					<div className="grid gap-8 md:grid-cols-3">
						{/* Corporate Center */}
						<div className="space-y-4">
							<div className="flex items-center gap-4">
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#396131] to-[#4a7c3a]">
									<Building2 className="h-6 w-6 text-white" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900">
									{footer?.contact_corporate_center_title || '1st Valley Bank Corporate Center'}
								</h3>
							</div>
							<div className="ml-16 space-y-2">
								<p className="text-gray-600">
									{footer?.contact_corporate_center_location || 'Cagayan de Oro City, Philippines'}
								</p>
								<p className="text-gray-600">
									{footer?.contact_corporate_center_phone_label || 'Trunkline:'}{' '}
									<a
										href={
											footer?.contact_corporate_center_phone
												? `tel:${footer.contact_corporate_center_phone}`
												: 'tel:+639178208542'
										}
										className="text-[#396131] hover:underline"
									>
										{footer?.contact_corporate_center_phone_display || '(+63) 917-820-8542'}
									</a>
								</p>
							</div>
						</div>

						{/* Contact Center */}
						<div className="space-y-4">
							<div className="flex items-center gap-4">
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#396131] to-[#4a7c3a]">
									<Headphones className="h-6 w-6 text-white" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900">
									{footer?.contact_center_title || '1st Valley Bank Contact Center'}
								</h3>
							</div>
							<div className="ml-16 space-y-2">
								<p className="text-gray-600">
									{footer?.contact_center_hotline_label || 'Hotline:'}{' '}
									<a
										href={
											footer?.contact_center_hotline
												? `tel:${footer.contact_center_hotline}`
												: 'tel:+639178208542'
										}
										className="text-[#396131] hover:underline"
									>
										{footer?.contact_center_hotline_display || '(+63) 917-820-8542'}
									</a>
								</p>
								<p className="text-gray-600">
									{footer?.contact_center_outside_label || 'Outside Metro Manila:'}{' '}
									<a
										href={
											footer?.contact_center_outside
												? `tel:${footer.contact_center_outside}`
												: 'tel:+639178208542'
										}
										className="text-[#396131] hover:underline"
									>
										{footer?.contact_center_outside_display || '#917-820-8542'}
									</a>
								</p>
								{footer?.contact_center_note ? (
									<p className="text-sm text-gray-500">{footer.contact_center_note}</p>
								) : (
									<p className="text-sm text-gray-500">
										(For landline only, press # followed by 917-820-8542)
									</p>
								)}
								<div className="mt-3">
									<p className="text-gray-600">
										{footer?.contact_center_international_label || 'International Toll-Free:'}
									</p>
									<p className="text-gray-600">
										{footer?.contact_center_international_number ||
											'(IAC) +800-8-CALL1VB (2255-182)'}
									</p>
									{footer?.contact_center_international_url &&
									footer?.contact_center_international_url_label ? (
										<a
											href={footer.contact_center_international_url}
											className="text-sm text-[#396131] hover:underline"
											target="_blank"
											rel="noopener noreferrer"
										>
											{footer.contact_center_international_url_label}
										</a>
									) : (
										<a href="#" className="text-sm text-[#396131] hover:underline">
											See list of IAC here
										</a>
									)}
								</div>
							</div>
						</div>

						{/* Email/Phishing Reports */}
						<div className="space-y-4">
							<div className="flex items-center gap-4">
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#396131] to-[#4a7c3a]">
									<Mail className="h-6 w-6 text-white" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900">
									{footer?.contact_emailphishing_title || 'Email/Phishing Reports'}
								</h3>
							</div>
							<div className="ml-16 space-y-2">
								<p className="text-gray-600">
									<a
										href={
											footer?.contact_emailphishing_email
												? `mailto:${footer.contact_emailphishing_email}`
												: 'mailto:info@1stvalleybank.com'
										}
										className="text-[#396131] hover:underline"
									>
										{footer?.contact_emailphishing_email || 'info@1stvalleybank.com'}
									</a>
								</p>
								<p className="text-sm text-gray-500">
									{footer?.contact_emailphishing_note ||
										'This channel is for online banking enrollment and/or updating of registered online banking contact information of overseas clients.'}
								</p>
								<p className="text-sm text-gray-500">
									{footer?.contact_emailphishing_phishing_label ||
										'For phishing reports, please send the email to '}
									<a
										href={
											footer?.contact_emailphishing_phishing || 'mailto:security@1stvalleybank.com'
										}
										className="text-[#396131] hover:underline"
									>
										{footer?.contact_emailphishing_phishing_display || 'security@1stvalleybank.com'}
									</a>
									.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Existing Footer Content */}
			<div className="bg-[#396131] text-white">
				<div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					{loading ? (
						<div className="flex h-32 items-center justify-center">
							<span className="text-sm text-white opacity-70">Loading footer...</span>
						</div>
					) : (
						<>
							{/* Main Footer Content */}
							<div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
								{/* Company Info & Logo */}
								<div className="space-y-6">
									<div className="group cursor-pointer">
										<img
											src={footer?.logo_image || logolight}
											alt="1st Valley Bank Official Logo"
											className="group-hover:bg-opacity-20 mb-4 flex h-auto w-full items-center justify-center rounded-2xl p-2 transition-all duration-300"
										/>
									</div>

									<p className="text-sm leading-relaxed text-gray-200">
										{footer?.main_text ||
											'Your trusted partner in financial growth and prosperity. Building stronger communities through innovative banking solutions.'}
									</p>

									{/* Regulatory Info */}
									<div className="rounded-xl border border-white/20 bg-white/5 p-4">
										<div className="mb-2 flex items-start gap-3">
											<Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-300" />
											<p className="text-xs leading-relaxed text-gray-200">
												{footer?.regulatory_bsp || 'Regulated by Bangko Sentral ng Pilipinas (BSP)'}
											</p>
										</div>
										<p className="text-xs text-gray-200">
											{footer?.regulatory_pdic ||
												'Deposits insured by PDIC up to ₱1 million per depositor'}
										</p>
									</div>
								</div>

								{/* Quick Links - dynamically from backend */}
								<div className="space-y-6">
									<h3 className="text-lg font-bold text-white">
										{footer?.quick_links_label || 'Quick Links'}
									</h3>
									<ul className="space-y-3">
										{quickLinks.length > 0 ? (
											quickLinks.map((item, index) => (
												<li key={item.id || index}>
													<NavLink
														to={item.url}
														className="group flex items-center text-sm text-gray-200 transition-all duration-200 hover:text-white"
														target={item.open_in_new_tab ? '_blank' : undefined}
														rel={item.open_in_new_tab ? 'noopener noreferrer' : undefined}
													>
														<span className="transition-transform duration-200 group-hover:translate-x-1">
															{item.label}
														</span>
														{item.open_in_new_tab ? (
															<ExternalLink className="ml-2 h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
														) : null}
													</NavLink>
												</li>
											))
										) : (
											<li className="text-sm text-gray-300">No links available.</li>
										)}
									</ul>
								</div>

								{/* Newsletter & Social */}
								<div className="space-y-6">
									<h3 className="text-lg font-bold text-white">
										{footer?.newsletter_label || 'Stay Connected'}
									</h3>

									{/* Newsletter */}
									<div className="rounded-xl border border-white/20 bg-white/5 p-4">
										<h4 className="mb-2 text-sm font-semibold">
											{footer?.newsletter_title || 'Newsletter'}
										</h4>
										<p className="mb-4 text-xs text-gray-200">
											{footer?.newsletter_description || 'Get updates and financial tips'}
										</p>

										<div className="space-y-3">
											<input
												type="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												placeholder="Enter your email"
												className="focus:bg-opacity-20 w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-300 transition-all duration-200 focus:border-green-400 focus:outline-none"
											/>
											<button
												onClick={handleEmailSubmit}
												disabled={isSubscribed}
												className="w-full rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:from-green-700 hover:to-green-800 disabled:scale-100 disabled:from-green-500 disabled:to-green-600"
											>
												{isSubscribed
													? 'Subscribed!'
													: footer?.newsletter_button_label || 'Subscribe'}
											</button>
										</div>
									</div>

									{/* Social Media */}
									<div>
										<h4 className="mb-4 text-sm font-semibold">
											{footer?.social_label || 'Follow Us'}
										</h4>
										<div className="flex gap-3">
											{socialLinks.length > 0 ? (
												socialLinks.map((social, index) => {
													const IconComponent =
														ICONS[social.label] || ICONS[social.icon_name] || ExternalLink;
													return (
														<a
															key={social.id || index}
															href={social.url}
															aria-label={social.label || social.icon || ''}
															target="_blank"
															rel="noopener noreferrer"
															className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-white/10"
														>
															<IconComponent className="h-4 w-4" />
														</a>
													);
												})
											) : (
												<span className="text-xs text-gray-300">No social links.</span>
											)}
										</div>
									</div>
								</div>
							</div>
							{/* Copyright */}
							<div className="border-t border-white/20 pt-8 text-center">
								<p className="text-sm text-gray-300">
									{footer?.copyright ||
										'Copyright © 2026 1st Valley Bank Inc. All rights reserved.'}
								</p>
							</div>
						</>
					)}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
