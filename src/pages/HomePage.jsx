import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import newsletterImg1 from '/src/assets/newsletter/1.jpg';
import newsletterImg2 from '/src/assets/newsletter/2.jpg';
import newsletterImg3 from '/src/assets/newsletter/3.jpg';
import {
	Calendar,
	ArrowRight,
	MessageCircle,
	Star,
	CheckCircle,
	Mail,
	ShieldCheck,
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
import {
	DarkPrimaryButton,
	LightPrimaryButton,
	LightSecondaryButton,
	DarkSecondaryButton
} from '../components/Buttons';
import { LightCard } from '../components/Card';
import { LightHeader, DarkHeader } from '../components/Header';
import { NewsletterGrid } from './Newsletter';
import pdf1 from '/src/assets/newsletter/document.pdf';
import newsletterService from '../services/newsletterService';

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
						className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-[#F4F8F4] px-5 py-4 text-left text-lg font-semibold text-[#396131] shadow transition hover:bg-[#e5efe6]"
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
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [newsletterArticles, setNewsletterArticles] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Simple email validation regex
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setError('Please enter a valid email address.');
			setSuccess('');
			return;
		}

		setIsSubmitting(true);
		try {
			const response = await newsletterService.subscribe(email);
			console.log(response);
			if (response.success) {
				setSuccess(response.message);
				setError('');
				setEmail('');
			} else {
				setError(response.error);
				setSuccess('');
				setEmail('');
			}
		} catch (error) {
			setError(error.message);
			setSuccess('');
			setEmail('');
		} finally {
			setIsSubmitting(false);
		}
	};

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
			icon: ShieldCheck,
			title: 'Bank-Grade Security',
			description:
				'Your financial data is protected with industry-leading encryption and security measures.',
			stats: '99.9% Uptime'
		},
		{
			icon: Users,
			title: 'Community Focused',
			description:
				'We understand local needs and provide personalized banking solutions for our community.',
			stats: '82+ Branches'
		},
		{
			icon: TrendingUp,
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

	const heroSlides = [
		{
			title: 'Bank with ease, Bank with 1VB ATM',
			subtitle: '',
			description:
				'Access your money anytime, anywhere with our reliable ATM network. Withdraw cash, check balances, and more—day or night.',
			image: carouselImg3,
			imageAlt: 'ATM Services',
			route: '/atm-locator',
			buttonText: 'Find an ATM',
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

	useEffect(() => {
		newsletterService.getNewsletters({ page: 1, page_size: 3 }).then((response) => {
			console.log(response);
			setNewsletterArticles(response.results);
		});
	}, []);

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
					<DarkHeader
						badgeText="Services"
						title="Your Lifetime Friend in Banking"
						subtitle="Explore a wide range of solutions tailored to your financial goals."
						alignment="center"
						level={2}
						className="mb-16"
					/>

					<div className="grid gap-4 md:grid-cols-3">
						{services.map((service, index) => (
							<LightCard
								key={index}
								className="group flex flex-col border-white/10 bg-white/10 hover:-translate-y-2"
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

								<h3 className="mb-4 text-2xl leading-tight font-bold text-white">
									{service.title}
								</h3>
								<p className="mb-6 flex-1 text-base leading-relaxed font-normal text-white/80">
									{service.description}
								</p>

								<DarkPrimaryButton
									to={service.path}
									secondaryIcon={
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									}
								>
									Learn More
								</DarkPrimaryButton>
							</LightCard>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="bg-[#E9F2EA] py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<LightHeader
						badgeText="Features"
						title="Banking That Stays by Your Side"
						subtitle="Enjoy modern banking designed for your convenience and success."
						alignment="center"
						level={2}
						className="mb-16"
					/>

					<div className="grid gap-8 md:grid-cols-3">
						{features.map((feature, index) => (
							<div key={index} className="group flex flex-col text-center">
								{/* Improved Image Container */}
								<div className="relative mb-8">
									{/* Main image container */}
									<div className="relative mx-auto h-40 w-40 overflow-hidden transition-all duration-300 group-hover:scale-105">
										<feature.icon className="h-full w-full object-cover text-[#396131] transition-all duration-500 group-hover:scale-105" />
									</div>
								</div>

								<h3 className="mb-4 text-2xl leading-tight font-bold text-[#396131]">
									{feature.title}
								</h3>
								<p className="mb-4 flex-1 text-base leading-relaxed font-normal text-gray-600">
									{feature.description}
								</p>
								<div className="mt-auto text-xl leading-tight font-bold text-[#396131]">
									{feature.stats}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<DarkHeader
						badgeText="Testimonials"
						title="Trusted by Our Community"
						subtitle="Hear what our satisfied clients and partners have to say about 1st Valley Bank."
						alignment="center"
						level={2}
						className="mb-16"
					/>

					<div className="grid gap-4 md:grid-cols-3">
						{testimonials.map((testimonial, index) => (
							<LightCard
								key={index}
								className="border-white/10 bg-white/10 p-8 shadow-lg backdrop-blur hover:shadow-xl"
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
										<h4 className="text-xl leading-tight font-bold text-white">
											{testimonial.name}
										</h4>
										<p className="text-sm leading-snug font-normal text-white/70">
											{testimonial.role}
										</p>
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

								<blockquote className="text-sm leading-relaxed font-normal text-white italic">
									"{testimonial.content}"
								</blockquote>
							</LightCard>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className="flex flex-col items-center bg-[#E9F2EA] py-20">
				<LightHeader
					badgeText="Newsletter"
					title="Stay Connected"
					subtitle="Get the latest financial tips, market insights, and exclusive offers delivered
								straight to your inbox."
				/>
				<div className="mx-auto mb-8 w-full max-w-3xl">
					<form className="relative mx-auto flex w-full flex-col items-center gap-3 rounded-xl">
						{error && <div className="text-sm text-red-500">{error}</div>}
						{success && <div className="text-sm text-green-500">{success}</div>}
						<div className="relative w-full flex-1">
							<input
								type="email"
								placeholder="Enter your email address"
								className="peer w-full rounded-lg border border-[#396131]/20 bg-white px-4 py-3 pl-12 text-base placeholder-gray-400 shadow-sm transition focus:border-[#396131] focus:ring-2 focus:ring-[#396131]/20 focus:outline-none"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									setError('');
									setSuccess('');
								}}
								required
							/>
							<Mail className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#396131]/70" />
						</div>
						<LightPrimaryButton
							disabled={isSubmitting}
							type="submit"
							secondaryIcon={
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							}
							className="w-full"
							onClick={handleSubmit}
						>
							{isSubmitting ? 'Submitting...' : 'Subscribe to Newsletter'}
						</LightPrimaryButton>
					</form>
				</div>

				<div className="mx-auto w-full max-w-7xl">
					<NewsletterGrid
						data={{ count: newsletterArticles?.length, results: newsletterArticles }}
						showPagination={false}
						cardVariant="light"
					/>
				</div>
				<LightPrimaryButton
					secondaryIcon={
						<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					}
					className="mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8"
					to={'/newsletter'}
				>
					Read More
				</LightPrimaryButton>
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
							<h2 className="text-3xl leading-tight font-bold text-white md:text-5xl">
								Ready to Start Your Financial Journey?
							</h2>
							<p className="max-w-xl text-base leading-relaxed font-normal text-white/90">
								Join thousands of satisfied customers who trust 1st Valley Bank with their financial
								future. Let's build success together.
							</p>
							<div className="flex flex-col justify-center gap-4 sm:flex-row">
								<DarkPrimaryButton
									to={'/contact-us'}
									secondaryIcon={
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									}
								>
									Get Started Today
								</DarkPrimaryButton>
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
					<LightHeader
						badgeText="FAQ"
						title="Frequently Asked Questions"
						subtitle="Find answers to the most common questions from our customers."
						alignment="center"
						level={2}
						className="mb-10"
						textClassName="text-[#396131]"
					/>

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
									to: '/consumer-protection',
									icon: <MessageCircle className="h-6 w-6 text-white" />,
									title: 'Feedback'
								},
								{
									to: '/branches',
									icon: <MapPin className="h-6 w-6 text-white" />,
									title: 'Branches'
								},
								{
									to: '/contact-us',
									icon: <Phone className="h-6 w-6 text-white" />,
									title: 'Contact us'
								},
								{
									to: '/newsletter',
									icon: <Calendar className="h-6 w-6 text-white" />,
									title: 'Maintenance'
								}
							];

							return (
								<div className="order-1 space-y-8 lg:order-0">
									{/* Accent Line */}
									<div className="h-1 w-16 rounded-full bg-gradient-to-r from-white/90 to-white/30"></div>

									{/* Heading */}
									<div className="space-y-4">
										<h2 className="text-3xl leading-tight font-bold text-white md:text-5xl">
											Need more help?
										</h2>
										<p className="text-base leading-relaxed font-normal text-white/80">
											Get all the help for your banking needs.
										</p>
									</div>

									{/* Help Options Grid */}
									<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
										{helpOptions.map((option, idx) => (
											<DarkPrimaryButton
												key={option.title}
												to={option.to}
												className="px-4 py-4"
												primaryIcon={
													<span className="mr-4 flex h-12 w-12 items-center justify-center">
														{option.icon}
													</span>
												}
												secondaryIcon={
													<ArrowRight className="h-5 w-5 text-white/80 transition-colors group-hover:text-white" />
												}
											>
												<span className="text-lg leading-tight font-bold text-white transition-colors group-hover:text-[#F4F8F4]">
													{option.title}
												</span>
											</DarkPrimaryButton>
										))}
									</div>
									{/* CTA Button */}
									<DarkPrimaryButton
										to="/contact-us"
										className="px-8 py-4"
										secondaryIcon={
											<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
										}
									>
										<span className="text-base leading-tight font-semibold tracking-wide">
											EXPLORE HELP & SUPPORT
										</span>
									</DarkPrimaryButton>
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
