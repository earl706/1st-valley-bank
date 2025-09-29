import { faLetterboxd } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Calendar, ArrowRight, Eye, Clock } from 'lucide-react';
import img1 from '/src/assets/newsletter/1.jpg';
import img2 from '/src/assets/newsletter/2.jpg';
import img3 from '/src/assets/newsletter/3.jpg';
import img4 from '/src/assets/newsletter/4.jpg';
import img5 from '/src/assets/newsletter/5.jpg';
import img6 from '/src/assets/newsletter/6.jpg';
import React from 'react';
import HeroSection from '../components/HeroSection';
import img from '/src/assets/homepage/heroSectionImage.png';
import CarouselSection from '../components/CarouselSection';

const newsletters = [
	{
		id: 1,
		title: 'Grow Your Business with 1VB SME Loans',
		subtitle: 'Unlock Growth Potential with Flexible Financing',
		description:
			'At 1st Valley Bank, we understand the challenges small and medium enterprises face. That’s why our SME loans offer competitive rates, flexible terms, and fast approvals to help you expand your business, upgrade equipment, or boost working capital. Discover how we can support your entrepreneurial journey today!',
		datetime: 'June 19, 2025',
		see_full_article_button: 'Read Full Article',
		image: img1,
		views: '3.2k',
		readTime: '5 min',
		learnMoreText: 'Read Full Story',
		route: '/newsletter'
	},
	{
		id: 2,
		title: 'Secure Your Future with 1VB Deposit Products',
		subtitle: 'Safe and Rewarding Savings Solutions',
		description:
			'Building your financial future starts with the right savings plan. 1st Valley Bank offers a range of deposit products designed to keep your money safe while helping it grow. Whether you’re saving for education, emergencies, or investments, our trusted deposit accounts provide security and convenience you can rely on.',
		datetime: 'June 19, 2025',
		see_full_article_button: 'Read Full Article',
		image: img2,
		views: '3.2k',
		readTime: '5 min',
		learnMoreText: 'Read Full Story',
		route: '/newsletter'
	},
	{
		id: 3,
		title: 'How 1VB’s Agriculture Loans Empower Farmers',
		subtitle: 'Funding Growth for Filipino Farmers',
		description:
			'Agriculture is the backbone of our nation, and 1st Valley Bank is proud to support farmers with tailored loan programs. Our agriculture loans provide flexible funds for seeds, equipment, and more, plus expert guidance to boost productivity and income. Learn how our lending solutions can help cultivate your success',
		datetime: 'June 19, 2025',
		see_full_article_button: 'Read Full Article',
		image: img3,
		views: '3.2k',
		readTime: '5 min',
		learnMoreText: 'Read Full Story',
		route: '/newsletter'
	},
	{
		id: 4,
		title: '1VB’s Commitment to Consumer Protection',
		subtitle: 'Transparent, Fair, and Secure Banking',
		description:
			'At 1st Valley Bank, protecting our customers is a top priority. We are committed to transparent practices, safeguarding your privacy, and ensuring fair treatment across all products and services. Read on to learn about our latest consumer protection policies and how we keep your banking experience safe and worry-free',
		datetime: 'June 19, 2025',
		see_full_article_button: 'Read Full Article',
		image: img4,
		views: '3.2k',
		readTime: '5 min',
		learnMoreText: 'Read Full Story',
		route: '/newsletter'
	},
	{
		id: 5,
		title: 'Discover the Benefits of 1VB’s Salary Loans',
		subtitle: 'Quick Access to Funds When You Need Them Most',
		description:
			'Need cash for unexpected expenses or special occasions? Our Salary Loans offer fast, hassle-free access to funds directly deducted from your paycheck. With competitive rates and flexible terms, 1VB makes borrowing easy, so you can focus on what matters most without financial stress',
		datetime: 'June 19, 2025',
		see_full_article_button: 'Read Full Article',
		image: img5,
		views: '3.2k',
		readTime: '5 min',
		learnMoreText: 'Read Full Story',
		route: '/newsletter'
	},
	{
		id: 6,
		title: 'Maximize Your Wealth with 1VB Advisory Services',
		subtitle: 'Personalized Financial Guidance You Can Trust',
		description:
			'Financial success starts with smart decisions. At 1st Valley Bank, our Advisory team provides expert guidance tailored to your goals—whether it’s investment planning, loan management, or wealth growth. Discover how our trusted advisors can help you navigate your financial future with confidence',
		datetime: 'June 19, 2025',
		see_full_article_button: 'Read Full Article',
		image: img6,
		views: '3.2k',
		readTime: '5 min',
		learnMoreText: 'Read Full Story',
		route: '/newsletter'
	}
];
const NewsletterGrid = () => {
	return (
		<div className="min-h-screen p-6">
			<div className="mx-auto max-w-7xl">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-4xl font-bold text-[#396131] md:text-5xl lg:text-6xl">
						Latest Newsletter Issues
					</h2>
					<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#396131] to-[#4a7a3f]"></div>
					<p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
						Stay updated with our curated collection of insights, trends, and innovations across
						various industries.
					</p>
				</div>

				{/* Grid Layout */}
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{newsletters.map((newsletter) => (
						<div
							key={newsletter.id}
							className="group flex h-full transform flex-col overflow-hidden rounded-3xl border border-slate-200/50 bg-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl"
						>
							{/* Image Section */}
							<div className="relative h-48 overflow-hidden">
								<img
									src={newsletter.image}
									alt={newsletter.subtitle}
									className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

								{/* Category Badge */}
								<div className="absolute top-4 left-4">
									<div className="rounded-full bg-white/95 px-3 py-1 shadow-lg backdrop-blur-sm">
										<span className="text-xs font-semibold tracking-wide text-[#396131] uppercase">
											{newsletter.title}
										</span>
									</div>
								</div>

								{/* Date Badge */}
								<div className="absolute top-4 right-4">
									<div className="rounded-full bg-[#396131]/90 px-3 py-1 shadow-lg backdrop-blur-sm">
										<div className="flex items-center gap-1 text-white">
											<Calendar size={12} />
											<time className="text-xs font-medium">
												{new Date(newsletter.datetime).toLocaleDateString('en-US', {
													month: 'short',
													day: 'numeric'
												})}
											</time>
										</div>
									</div>
								</div>
							</div>

							{/* Content Section */}
							<div className="flex flex-grow flex-col p-6">
								<div className="flex flex-grow flex-col">
									{/* Header */}
									<h2 className="mb-3 text-xl leading-tight font-bold text-slate-800 transition-colors duration-200 group-hover:text-[#396131]">
										{newsletter.title}
									</h2>

									{/* Opening Paragraph */}
									<p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
										{newsletter.description}
									</p>

									{/* Meta Info */}
									<div className="mt-auto mb-6 flex items-center gap-4 text-xs text-slate-500">
										<div className="flex items-center gap-1">
											<Eye size={14} />
											<span>{newsletter.views}</span>
										</div>
										<div className="flex items-center gap-1">
											<Clock size={14} />
											<span>{newsletter.readTime} read</span>
										</div>
									</div>
								</div>

								{/* Action Button */}
								<button className="group/btn mt-4 flex w-full transform cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#396131] px-4 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-[#2d4d26] hover:shadow-lg active:scale-95">
									<span className="text-sm">{newsletter.see_full_article_button}</span>
									<ArrowRight
										size={16}
										className="transition-transform duration-300 group-hover/btn:translate-x-1"
									/>
								</button>
							</div>
						</div>
					))}
				</div>

				{/* Load More Section */}
				<div className="mt-12 text-center">
					<button className="transform rounded-2xl border-2 border-[#396131] bg-white px-8 py-4 font-semibold text-[#396131] shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[#396131] hover:text-white">
						Load More Articles
					</button>
				</div>
			</div>
		</div>
	);
};

export default function Newsletter() {
	return (
		<>
			<main className="flex flex-col gap-[80px] pb-[50px]">
				<CarouselSection
					id="newsletter-hero-carousel"
					slides={[
						{
							title: '1VB Newsletter',
							subtitle: null,
							description:
								'Get expert financial tips and updates from 1VB Advisory—helping you make smart decisions for a brighter future.',
							image: img,
							imageAlt: 'Newsletter Envelope Icon',
							route: null
						},
						...newsletters.slice(0, 5).map((newsletter) => newsletter)
					]}
					brandGradient="from-[#396131] via-[#396131] to-[#396131]"
					brandColor="#396131"
				/>
				<section>
					<NewsletterGrid />
				</section>
			</main>
		</>
	);
}
