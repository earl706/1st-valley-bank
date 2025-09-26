import React, { useState } from 'react';
import logo from '/src/assets/logo.png';
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

const Footer = () => {
	const [email, setEmail] = useState('');
	const [isSubscribed, setIsSubscribed] = useState(false);

	// Mock data - replace with your actual data
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

	const socialLinks = [
		{ icon: Facebook, href: '#', label: 'Facebook' },
		{ icon: Twitter, href: '#', label: 'Twitter' },
		{ icon: Instagram, href: '#', label: 'Instagram' },
		{ icon: Linkedin, href: '#', label: 'LinkedIn' },
		{ icon: Youtube, href: '#', label: 'YouTube' }
	];

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
					<h2 className="mb-12 text-3xl font-bold text-gray-900 sm:text-4xl">Contact us</h2>

					<div className="grid gap-8 md:grid-cols-3">
						{/* Corporate Center */}
						<div className="space-y-4">
							<div className="flex items-center gap-4">
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#396131] to-[#4a7c3a]">
									<Building2 className="h-6 w-6 text-white" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900">
									1st Valley Bank Corporate Center
								</h3>
							</div>
							<div className="ml-16 space-y-2">
								<p className="text-gray-600">Cagayan de Oro City, Philippines</p>
								<p className="text-gray-600">
									Trunkline:{' '}
									<a href="tel:+639178208542" className="text-[#396131] hover:underline">
										(+63) 917-820-8542
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
									1st Valley Bank Contact Center
								</h3>
							</div>
							<div className="ml-16 space-y-2">
								<p className="text-gray-600">
									Hotline:{' '}
									<a href="tel:+639178208542" className="text-[#396131] hover:underline">
										(+63) 917-820-8542
									</a>
								</p>
								<p className="text-gray-600">
									Outside Metro Manila:{' '}
									<a href="tel:+639178208542" className="text-[#396131] hover:underline">
										#917-820-8542
									</a>
								</p>
								<p className="text-sm text-gray-500">
									(For landline only, press # followed by 917-820-8542)
								</p>
								<div className="mt-3">
									<p className="text-gray-600">International Toll-Free:</p>
									<p className="text-gray-600">(IAC) +800-8-CALL1VB (2255-182)</p>
									<a href="#" className="text-sm text-[#396131] hover:underline">
										See list of IAC here
									</a>
								</div>
							</div>
						</div>

						{/* Email/Phishing Reports */}
						<div className="space-y-4">
							<div className="flex items-center gap-4">
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#396131] to-[#4a7c3a]">
									<Mail className="h-6 w-6 text-white" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900">Email/Phishing Reports</h3>
							</div>
							<div className="ml-16 space-y-2">
								<p className="text-gray-600">
									<a
										href="mailto:info@1stvalleybank.com"
										className="text-[#396131] hover:underline"
									>
										info@1stvalleybank.com
									</a>
								</p>
								<p className="text-sm text-gray-500">
									This channel is for online banking enrollment and/or updating of registered online
									banking contact information of overseas clients.
								</p>
								<p className="text-sm text-gray-500">
									For phishing reports, please send the email to{' '}
									<a
										href="mailto:security@1stvalleybank.com"
										className="text-[#396131] hover:underline"
									>
										security@1stvalleybank.com
									</a>
									.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Existing Footer Content */}
			<div className="bg-[#31542B] text-white">
				<div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					{/* Main Footer Content */}
					<div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
						{/* Company Info & Logo */}
						<div className="space-y-6">
							<div className="group cursor-pointer">
								<img
									src={logo}
									className="group-hover:bg-opacity-20 mb-4 flex h-32 w-32 items-center justify-center rounded-2xl p-2 transition-all duration-300 group-hover:scale-105"
								/>
								<h3 className="mb-3 text-xl font-bold">1st Valley Bank</h3>
							</div>

							<p className="text-sm leading-relaxed text-gray-200">
								Your trusted partner in financial growth and prosperity. Building stronger
								communities through innovative banking solutions.
							</p>

							{/* Regulatory Info */}
							<div className="rounded-xl border border-white/20 bg-white/5 p-4">
								<div className="mb-2 flex items-start gap-3">
									<Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-300" />
									<p className="text-xs leading-relaxed text-gray-200">
										Regulated by Bangko Sentral ng Pilipinas (BSP)
									</p>
								</div>
								<p className="text-xs text-gray-200">
									Deposits insured by PDIC up to ₱1 million per depositor
								</p>
							</div>
						</div>

						{/* Quick Links */}
						<div className="space-y-6">
							<h3 className="text-lg font-bold text-white">Quick Links</h3>
							<ul className="space-y-3">
								{footerNavigationItems.map((item, index) => (
									<li key={index}>
										<NavLink
											to={item.link}
											className="group flex items-center text-sm text-gray-200 transition-all duration-200 hover:text-white"
										>
											<span className="transition-transform duration-200 group-hover:translate-x-1">
												{item.navItem}
											</span>
											<ExternalLink className="ml-2 h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
										</NavLink>
									</li>
								))}
							</ul>
						</div>

						{/* Newsletter & Social */}
						<div className="space-y-6">
							<h3 className="text-lg font-bold text-white">Stay Connected</h3>

							{/* Newsletter */}
							<div className="rounded-xl border border-white/20 bg-white/5 p-4">
								<h4 className="mb-2 text-sm font-semibold">Newsletter</h4>
								<p className="mb-4 text-xs text-gray-200">Get updates and financial tips</p>

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
										{isSubscribed ? 'Subscribed!' : 'Subscribe'}
									</button>
								</div>
							</div>

							{/* Social Media */}
							<div>
								<h4 className="mb-4 text-sm font-semibold">Follow Us</h4>
								<div className="flex gap-3">
									{socialLinks.map((social, index) => {
										const IconComponent = social.icon;
										return (
											<a
												key={index}
												href={social.href}
												aria-label={social.label}
												className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-white/10"
											>
												<IconComponent className="h-4 w-4" />
											</a>
										);
									})}
								</div>
							</div>
						</div>
					</div>

					{/* Regulatory Agencies & Links */}
					<div className="mb-8 border-t border-white/20 pt-8">
						<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
							<div className="flex items-center gap-6">
								<span className="text-sm font-medium">Regulated by:</span>
								<div className="flex items-center gap-3">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
										<span className="text-xs font-bold">BSP</span>
									</div>
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
										<span className="text-xs font-bold">PDIC</span>
									</div>
								</div>
							</div>

							<div className="flex items-center gap-4 text-sm text-gray-300">
								<NavLink
									to="/consumer-protection/privacy-policy"
									className="transition-colors duration-200 hover:text-white"
								>
									Privacy Policy
								</NavLink>
								<span>•</span>
								<a href="#" className="transition-colors duration-200 hover:text-white">
									Terms
								</a>
								<span>•</span>
								<a href="#" className="transition-colors duration-200 hover:text-white">
									Sitemap
								</a>
							</div>
						</div>
					</div>

					{/* Copyright */}
					<div className="border-t border-white/20 pt-8 text-center">
						<p className="text-sm text-gray-300">
							Copyright © 2025 1st Valley Bank Inc. All rights reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
