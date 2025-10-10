import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
	ArrowRight,
	Star,
	CheckCircle,
	Mail,
	Phone,
	MapPin,
	Handshake,
	Quote,
	Sparkles,
	PiggyBank,
	Building2,
	Home,
	Shield,
	Users,
	TrendingUp,
	ChevronUp,
	ChevronDown
} from 'lucide-react';

import img1 from '/src/assets/homepage/1.png';
import img2 from '/src/assets/homepage/2.png';
import img3 from '/src/assets/homepage/3.png';
import img4 from '/src/assets/homepage/4.png';
import img5 from '/src/assets/homepage/5.png';
import img6 from '/src/assets/homepage/6.png';
import logo from '/src/assets/logo.png';
import CarouselSection from '../components/CarouselSection';
import img from '/src/assets/homepage/heroSectionImage.png';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import carouselImg4 from '/src/assets/carousel/4.png';
import carouselImg5 from '/src/assets/carousel/5.png';
import carouselImg6 from '/src/assets/carousel/6.png';
import carouselImg7 from '/src/assets/carousel/7.png';

// Utility to find links in plain text and convert them to <a> tags.
function renderAnswer(answer) {
	// If already a React node (advanced usage), just return.
	if (React.isValidElement(answer)) return answer;

	const urlRegex = /(https?:\/\/[^\s]+)/g;

	// Split at URLs, keep URLs in result
	const parts = answer.split(urlRegex);

	return parts.map((part, idx) => {
		if (urlRegex.test(part)) {
			// Optionally you could provide rel and target
			return (
				<a
					key={idx}
					href={part}
					target="_blank"
					rel="noopener noreferrer"
					className="break-all text-[#396131] underline hover:text-[#24581c]"
				>
					{part}
				</a>
			);
		}
		// Replace \n with <br />
		const withLinebreaks = [];
		part.split('\n').forEach((p, i, arr) => {
			withLinebreaks.push(p);
			if (i < arr.length - 1) withLinebreaks.push(<br key={i} />);
		});
		return <React.Fragment key={idx}>{withLinebreaks}</React.Fragment>;
	});
}

function FAQSection({ faqs }) {
	const [openIdx, setOpenIdx] = React.useState(null);

	const toggleIdx = (idx) => {
		setOpenIdx(idx === openIdx ? null : idx);
	};

	return (
		<div className="space-y-4">
			{faqs.map((faq, idx) => (
				<div key={faq.question}>
					<button
						onClick={() => toggleIdx(idx)}
						className="flex w-full items-center justify-between rounded-lg bg-[#F4F8F4] px-5 py-4 text-left text-lg font-semibold text-[#396131] shadow transition hover:bg-[#e5efe6]"
						aria-expanded={openIdx === idx}
						aria-controls={`faq-body-${idx}`}
					>
						<span>{faq.question}</span>
						<span className="ml-4 text-[#396131]">
							{openIdx === idx ? (
								<ChevronUp className="h-5 w-5" />
							) : (
								<ChevronDown className="h-5 w-5" />
							)}
						</span>
					</button>
					<div
						id={`faq-body-${idx}`}
						className={`overflow-auto rounded-b-md border-l-4 border-[#396131] bg-white px-5 text-gray-700 transition-all duration-300 ${openIdx === idx ? 'max-h-40 py-3 opacity-100' : 'max-h-0 py-0 opacity-0'} `}
						aria-hidden={openIdx !== idx}
					>
						{renderAnswer(faq.answer)}
					</div>
				</div>
			))}
		</div>
	);
}

// Example FAQ data for 3 topics: Accounts, Online Banking, Loans
const faqs = [
	// Topic: Accounts
	{
		question: 'How can I pay my 1st Valley Bank loan through GCash?',
		answer:
			'You can conveniently pay your 1st Valley Bank loan through GCash Bank Transfer by following these steps:\n1. Open the GCash App.\n2. Tap Bank Transfer and select Local.\n3. Choose BDO or Chinabank as the recipient bank, then enter the official 1st Valley Bank account details; BDO: 00322-001071-1 or Chinabank: 1161-0000-6594.\nPlease ensure payments are made only to these official accounts, as transactions sent to personal GCash numbers or unofficial accounts will not be acknowledged or accepted. \n For more information, please visit this link: https://www.facebook.com/1stValleyBank/posts/1069427195303924?rdid=riGbbaYG48sPOthu'
	},
	{
		question: 'How can I pay my 1st Valley Bank loan online?',
		answer:
			'Online Fund Transfer (BDO Online / GCash Bank Transfer)\n\nSTEPS:\n1. Log in to your BDO Online Banking or Mobile App.\n2. Transfer funds to our official BDO account: 00322-001071-1.\n   Alternatively, you may use GCash Bank Transfer and send your payment to:\n   • BDO: 00322-001071-1\n   • Chinabank: 1161-0000-6594\n3. Enter your Promissory Note Number and Account Name in the remarks section.\n4. Confirm the transaction and take a screenshot or save your receipt as proof of payment.\n\n⚠️ Please ensure that payments are made only to these official accounts.\nTransactions sent to personal GCash numbers or unofficial accounts will not be acknowledged or accepted. \n For more information, please visit this link: https://www.facebook.com/1stValleyBank/posts/924469796466332?rdid=OrVPGhmXmfCssfYT#'
	},
	{
		question: 'How do I open a new account at 1st Valley Bank?',
		answer:
			'Opening a new account is easy! Visit your nearest 1st Valley Bank branch with a valid ID and proof of address. Our friendly staff will guide you through the application process. You can also begin the process online on our website.'
	},
	{
		question: 'Is there a minimum balance required to maintain my account?',
		answer:
			'Yes, most of our accounts require a maintaining balance of PHP 1,000. Some account types may have different requirements, so please check our Deposits page or contact customer service for complete details.'
	},

	// Topic: Online Banking
	{
		question: 'How can I enroll in online banking?',
		answer:
			'Currently, online banking is not yet available with 1st Valley Bank. Please visit your nearest branch or contact our customer service team for any account needs or inquiries.'
	},
	{
		question: 'Is digital banking with 1st Valley Bank secure?',
		answer:
			'Digital banking is not yet offered by 1st Valley Bank. Rest assured, all existing customer transactions and data remain protected using strict bank-level security protocols. For updates on future services, please follow our official channels.'
	},

	// Topic: Loans
	{
		question: 'What types of loans does 1st Valley Bank offer?',
		answer:
			'We offer a range of loans including personal, business, agricultural, and property loans. Whatever your goal, we’re here to help you achieve it! Check our Loans page to learn more and see current offers.'
	}
];

export default function HomePage() {
	const services = [
		{
			image: carouselImg1,
			title: 'Savings & Deposits',
			description:
				'Secure your future with our comprehensive savings solutions designed to help you grow your wealth steadily.',
			features: ['High Interest Rates', 'Flexible Terms', 'Online Banking', 'Mobile App'],
			path: '/deposits',
			gradient: 'from-[#396131] to-[#4a7c3a]'
		},
		{
			image: carouselImg2,
			title: 'Loans & Credit',
			description:
				'Achieve your dreams with our flexible loan products tailored for businesses, agriculture, and personal needs.',
			features: ['Quick Approval', 'Competitive Rates', 'Flexible Payment', 'Expert Guidance'],
			path: '/loans',
			gradient: 'from-[#396131] to-[#4a7c3a]'
		},
		{
			image: carouselImg3,
			title: 'Properties',
			description:
				'Discover prime real estate and vehicle opportunities with our exclusive property listings and financing.',
			features: ['Prime Locations', 'Flexible Financing', 'Expert Valuation', 'Legal Support'],
			path: '/properties-for-sale',
			gradient: 'from-[#396131] to-[#4a7c3a]'
		}
	];

	const features = [
		{
			image: carouselImg1,
			title: 'Bank-Grade Security',
			description:
				'Your financial data is protected with industry-leading encryption and security measures.',
			stats: '99.9% Uptime'
		},
		{
			image: carouselImg2,
			title: 'Community Focused',
			description:
				'We understand local needs and provide personalized banking solutions for our community.',
			stats: '82+ Branches'
		},
		{
			image: carouselImg4,
			title: 'Growth Partner',
			description:
				'From startup to success, we support your business journey with tailored financial solutions.',
			stats: '25+ Years'
		}
	];

	const testimonials = [
		{
			name: 'Maria Santos',
			role: 'Small Business Owner',
			content:
				'1st Valley Bank helped me grow my business from a small sari-sari store to a thriving grocery chain. Their support is unmatched.',
			rating: 5,
			image: logo
		},
		{
			name: 'Juan Dela Cruz',
			role: 'Farmer',
			content:
				'The agricultural loan program gave me the capital I needed to expand my rice farm. Now I can provide for my family better.',
			rating: 5,
			image: logo
		},
		{
			name: 'Ana Rodriguez',
			role: 'Teacher',
			content:
				'Their home loan made my dream of owning a house come true. The process was smooth and the rates were very reasonable.',
			rating: 5,
			image: logo
		}
	];

	const stats = [
		{ number: '82+', label: 'Branches Nationwide' },
		{ number: '25+', label: 'Years of Service' },
		{ number: '500K+', label: 'Happy Customers' },
		{ number: '₱50B+', label: 'Assets Under Management' }
	];

	const heroSlides = [
		{
			title: 'Bank with ease, Bank with 1VB ATM',
			subtitle: '',
			description:
				'Access your money anytime, anywhere with our reliable ATM network. Withdraw cash, check balances, and more—day or night.',
			image: carouselImg3,
			imageAlt: 'ATM Services',
			route: '/atm-services',
			buttonText: 'Find an ATM',
			showButton: true
		},
		{
			title: 'Convenient Pickup-Deposit Service',
			subtitle: '',
			description:
				'Enjoy hassle-free banking with our Pickup-Deposit service. We come to you—schedule a pickup and deposit your funds without visiting a branch.',
			image: carouselImg2,
			imageAlt: 'Pickup-Deposit Service',
			route: '/pickup-deposit',
			buttonText: 'Schedule a Pickup',
			showButton: true
		},
		{
			title: 'GCash Services for Easy Transactions',
			subtitle: '',
			description:
				'Link your account to GCash for seamless digital payments, fund transfers, and more. Experience the convenience of cashless banking.',
			image: carouselImg1,
			imageAlt: 'GCash Services',
			route: '/gcash-services',
			buttonText: 'Learn More',
			showButton: true
		},
		{
			title: 'Secure Your Future with Smart Savings',
			subtitle: '',
			description:
				'Start building your wealth today with our high-yield savings accounts and investment products designed to help you reach your financial goals faster.',
			image: carouselImg4,
			imageAlt: 'Savings & Deposits',
			route: '/deposits',
			buttonText: 'Open Savings Account',
			showButton: true
		},
		{
			title: 'Grow Your Business with Flexible Loans',
			subtitle: '',
			description:
				'Get the funding you need to expand your business, purchase equipment, or invest in new opportunities with our competitive loan products.',
			image: carouselImg5,
			imageAlt: 'Loans & Credit',
			route: '/loans',
			buttonText: 'Apply for Loan',
			showButton: true
		},
		{
			title: 'Find Your Dream Property Today',
			subtitle: '',
			description:
				'Browse our exclusive collection of prime real estate and vehicles. We offer flexible financing options to make your property dreams come true.',
			image: carouselImg6,
			imageAlt: 'Properties for Sale',
			route: '/properties-for-sale',
			buttonText: 'Browse Properties',
			showButton: true
		}
	];

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<CarouselSection
				id="hero-carousel"
				slides={heroSlides}
				autoPlay={true}
				autoPlayInterval={5000}
				backgroundColor="from-slate-50 via-white to-green-50"
				brandColor="#396131"
				brandGradient="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
				minHeight="min-h-[560px] lg:min-h-[640px]"
				showLearnMoreButton={true}
				learnMoreText="Learn More"
				excludeLearnMoreForTitles={[]}
			/>

			{/* Services Section */}
			<section className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-20 text-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-4xl font-bold text-white">Your Lifetime Friend in Banking</h2>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{services.map((service, index) => (
							<div
								key={index}
								className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/10 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
							>
								{/* Service Image */}
								<div className="relative mb-6">
									<div className="h-auto w-full overflow-hidden rounded-xl">
										<img
											src={service.image}
											alt={service.title}
											className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
										/>
									</div>
								</div>

								<h3 className="mb-4 text-2xl font-bold text-white">{service.title}</h3>
								<p className="mb-6 flex-1 text-base leading-relaxed text-white/80">
									{service.description}
								</p>

								<NavLink
									to={service.path}
									className="group/btn mt-auto inline-flex items-center text-base font-semibold text-white transition-colors hover:text-[#ffe37d]"
								>
									Learn More
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
								</NavLink>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="bg-[#E9F2EA] py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-4xl font-bold text-gray-900">
							Banking That Stays by Your Side
						</h2>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{features.map((feature, index) => (
							<div key={index} className="group flex flex-col text-center">
								{/* Improved Image Container */}
								<div className="relative mb-8">
									{/* Main image container */}
									<div className="relative mx-auto h-40 w-40 overflow-hidden transition-all duration-300 group-hover:scale-105">
										<img
											src={feature.image}
											alt={feature.title}
											className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
										/>
									</div>
								</div>

								<h3 className="mb-4 text-2xl font-bold text-gray-900">{feature.title}</h3>
								<p className="mb-4 flex-1 text-base leading-relaxed text-gray-600">
									{feature.description}
								</p>
								<div className="mt-auto text-2xl font-bold text-[#396131]">{feature.stats}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-4xl font-bold text-white">Trusted by Our Community</h2>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{testimonials.map((testimonial, index) => (
							<div
								key={index}
								className="rounded-2xl border border-white/10 bg-white/10 p-8 shadow-lg backdrop-blur transition-all duration-300 hover:shadow-xl"
							>
								<div className="mb-6 flex items-center">
									<div className="flex-shrink-0">
										<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#396131] to-[#4a7c3a]">
											<img
												src={testimonial.image}
												alt={testimonial.name}
												className="h-10 w-10 rounded-full object-cover"
											/>
										</div>
									</div>
									<div className="ml-4">
										<h4 className="text-base font-semibold text-white">{testimonial.name}</h4>
										<p className="text-sm text-white/70">{testimonial.role}</p>
									</div>
									<div className="ml-auto">
										<Quote className="h-8 w-8 text-gray-100/30" />
									</div>
								</div>

								<div className="mb-4 flex">
									{[...Array(testimonial.rating)].map((_, i) => (
										<Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
									))}
								</div>

								<blockquote className="text-sm leading-relaxed text-white italic">
									"{testimonial.content}"
								</blockquote>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className="bg-[#E9F2EA] py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center gap-12 md:flex-row">
						{/* Image Side */}
						<div className="mb-8 flex w-full flex-shrink-0 justify-center md:mb-0 md:w-1/2">
							<img
								src={carouselImg3}
								alt="Newsletter illustration"
								className="h-72 w-72 object-contain md:h-96 md:w-96"
							/>
						</div>
						{/* Content Side */}
						<div className="flex w-full flex-col items-center space-y-6 text-center md:w-1/2 md:items-start md:text-left">
							<div className="mb-2 inline-flex rounded-full bg-[#396131] p-3 backdrop-blur-sm">
								<Mail className="h-8 w-8 text-white" />
							</div>
							<h2 className="text-4xl font-bold text-gray-900">Stay Connected</h2>
							<p className="max-w-xl text-base text-gray-700">
								Get the latest financial tips, market insights, and exclusive offers delivered
								straight to your inbox.
							</p>
							<NavLink
								to="/newsletter"
								className="group inline-flex transform items-center rounded-xl bg-[#396131] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
							>
								Subscribe to Newsletter
								<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
							</NavLink>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-gradient-to-l from-[#4a7c3a] to-[#396131] py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col-reverse items-center gap-12 lg:flex-row">
						{/* Content Side */}
						<div className="flex w-full flex-1 flex-col items-center space-y-6 text-center md:w-1/2 md:items-start md:text-left">
							<div className="mb-2 inline-flex rounded-full bg-white/20 p-3">
								<Handshake className="h-8 w-8 text-white" />
							</div>
							<h2 className="text-4xl font-bold text-white">
								Ready to Start Your Financial Journey?
							</h2>
							<p className="max-w-xl text-base text-white/90">
								Join thousands of satisfied customers who trust 1st Valley Bank with their financial
								future. Let's build success together.
							</p>
							<div className="flex flex-col justify-center gap-4 sm:flex-row">
								<NavLink
									to="/contact-us"
									className="group inline-flex transform items-center justify-center rounded-xl bg-white/10 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-xl"
								>
									Get Started Today
									<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
								</NavLink>
							</div>
						</div>
						{/* Image Side */}
						<div className="mb-8 flex w-full flex-shrink-0 justify-center md:mb-0 md:w-1/2">
							<img
								src={carouselImg7}
								alt="Financial journey illustration"
								className="h-72 w-72 object-contain md:h-96 md:w-96"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section with Dropdowns */}
			<section className="bg-white py-20">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
					<h2 className="mb-10 text-center text-3xl font-bold text-[#396131]">
						Frequently Asked Questions
					</h2>

					{/* FAQ Dropdowns */}
					<FAQSection faqs={faqs} />
				</div>
			</section>

			{/* Need More Help Section */}
			<section className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
						{/* Left Side - Content */}
						{/*
							Refactored: Help options are now defined in an array and rendered via map.
						*/}
						{(() => {
							const helpOptions = [
								{
									to: '/contact-us',
									icon: (
										<svg
											className="h-6 w-6 text-white"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
											/>
										</svg>
									),
									title: 'Give feedback'
								},
								{
									to: '/contact-us',
									icon: <MapPin className="h-6 w-6 text-white" />,
									title: 'Find a branch/ATM'
								},
								{
									to: '/contact-us',
									icon: <Phone className="h-6 w-6 text-white" />,
									title: 'Contact us'
								},
								{
									to: '/newsletter',
									icon: (
										<svg
											className="h-6 w-6 text-white"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
											/>
										</svg>
									),
									title: 'View scheduled maintenance'
								}
							];

							return (
								<div className="order-1 space-y-8 lg:order-0">
									{/* Accent Line */}
									<div className="h-1 w-16 rounded-full bg-gradient-to-r from-white/90 to-white/30"></div>

									{/* Heading */}
									<div className="space-y-4">
										<h2 className="text-4xl font-bold text-white">Need more help?</h2>
										<p className="text-base text-white/80">
											Get all the help for your banking needs.
										</p>
									</div>

									{/* Help Options Grid */}
									<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
										{helpOptions.map((option, idx) => (
											<NavLink
												key={option.title}
												to={option.to}
												className="group flex items-center space-x-4 rounded-2xl border border-white/10 bg-white/10 p-3 shadow-lg transition-all duration-300 hover:scale-101 hover:shadow-xl"
											>
												<div className="flex h-12 w-12 items-center justify-center">
													{option.icon}
												</div>
												<div className="flex-1">
													<h3 className="text-base font-semibold text-white transition-colors group-hover:text-[#F4F8F4]">
														{option.title}
													</h3>
												</div>
												<ArrowRight className="h-5 w-5 text-white/80 transition-colors group-hover:text-white" />
											</NavLink>
										))}
									</div>

									{/* CTA Button */}
									<NavLink
										to="/contact-us"
										className="group inline-flex transform items-center justify-center rounded-xl border border-white/10 bg-white/10 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-101 hover:shadow-xl"
									>
										EXPLORE HELP & SUPPORT
										<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
									</NavLink>
								</div>
							);
						})()}

						{/* Right Side - Illustration */}
						<div className="relative mx-auto h-48 w-48 overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl sm:h-64 sm:w-64 lg:h-full lg:w-full">
							<img
								src={img}
								alt={'Person at desk illustration'}
								className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
							/>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
