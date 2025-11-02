import { Calendar, ArrowRight, Eye, Clock, X } from 'lucide-react';
import img1 from '/src/assets/newsletter/1.jpg';
import img2 from '/src/assets/newsletter/2.jpg';
import img3 from '/src/assets/newsletter/3.jpg';
import img4 from '/src/assets/newsletter/4.jpg';
import img5 from '/src/assets/newsletter/5.jpg';
import img6 from '/src/assets/newsletter/6.jpg';
import React, { useState, useEffect } from 'react';
import img from '/src/assets/homepage/heroSectionImage.png';
import CarouselSection from '../components/CarouselSection';

import pdf1 from '/src/assets/newsletter/document.pdf';
import { DarkCard, LightCard } from '../components/Card';
import { DarkPrimaryButton, LightPrimaryButton } from '../components/Buttons';
import newsletterService from '../services/newsletterService';

// PDF Viewer Modal Component
function PDFModal({ pdfUrl, title, onClose, id }) {
	useEffect(() => {
		newsletterService.incrementViewCount(id).then((response) => {});
	}, []);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
			<div className="relative flex h-[90vh] w-full max-w-7xl flex-col rounded-xl bg-white shadow-2xl">
				<button
					className="absolute top-3 right-3 z-10 cursor-pointer rounded-full bg-white p-2 shadow hover:bg-gray-100"
					onClick={onClose}
					aria-label="Close PDF"
				>
					<X size={20} />
				</button>
				<div className="flex-shrink-0 px-6 pt-6 pb-2">
					<h2 className="text-lg font-bold text-[#396131]">{title}</h2>
				</div>
				<div className="flex-1 overflow-hidden">
					<iframe src={pdfUrl} title={title} className="h-full w-full border-0" allowFullScreen />
				</div>
			</div>
		</div>
	);
}

const newsletters = Array.from({ length: 27 }, (_, i) => {
	const idx = i + 1;
	const images = [img1, img2, img3, img4, img5, img6];
	const titles = [
		'Grow Your Business with 1VB SME Loans',
		'Secure Your Future with 1VB Deposit Products',
		'How 1VB’s Agriculture Loans Empower Farmers',
		'1VB’s Commitment to Consumer Protection',
		'Discover the Benefits of 1VB’s Salary Loans',
		'Maximize Your Wealth with 1VB Advisory Services'
	];
	const subtitles = [
		'Unlock Growth Potential with Flexible Financing',
		'Safe and Rewarding Savings Solutions',
		'Funding Growth for Filipino Farmers',
		'Transparent, Fair, and Secure Banking',
		'Quick Access to Funds When You Need Them Most',
		'Personalized Financial Guidance You Can Trust'
	];
	const descriptions = [
		'At 1st Valley Bank, we understand the challenges small and medium enterprises face. That’s why our SME loans offer competitive rates, flexible terms, and fast approvals to help you expand your business, upgrade equipment, or boost working capital. Discover how we can support your entrepreneurial journey today!',
		'Building your financial future starts with the right savings plan. 1st Valley Bank offers a range of deposit products designed to keep your money safe while helping it grow. Whether you’re saving for education, emergencies, or investments, our trusted deposit accounts provide security and convenience you can rely on.',
		'Agriculture is the backbone of our nation, and 1st Valley Bank is proud to support farmers with tailored loan programs. Our agriculture loans provide flexible funds for seeds, equipment, and more, plus expert guidance to boost productivity and income. Learn how our lending solutions can help cultivate your success',
		'At 1st Valley Bank, protecting our customers is a top priority. We are committed to transparent practices, safeguarding your privacy, and ensuring fair treatment across all products and services. Read on to learn about our latest consumer protection policies and how we keep your banking experience safe and worry-free',
		'Need cash for unexpected expenses or special occasions? Our Salary Loans offer fast, hassle-free access to funds directly deducted from your paycheck. With competitive rates and flexible terms, 1VB makes borrowing easy, so you can focus on what matters most without financial stress',
		'Financial success starts with smart decisions. At 1st Valley Bank, our Advisory team provides expert guidance tailored to your goals—whether it’s investment planning, loan management, or wealth growth. Discover how our trusted advisors can help you navigate your financial future with confidence'
	];
	return {
		id: idx,
		title: titles[(idx - 1) % titles.length],
		subtitle: subtitles[(idx - 1) % subtitles.length],
		description: descriptions[(idx - 1) % descriptions.length],
		datetime: 'June 19, 2025',
		see_full_article_button: 'Read Full Article',
		image: images[(idx - 1) % images.length],
		views: '3.2k',
		readTime: '5 min',
		buttonText: 'Read Full Story',
		route: '/newsletter',
		pdf: pdf1
	};
});

// Mock pagination constants
const PAGE_SIZE = 9;

export const NewsletterGrid = ({
	data = { count: newsletters.length, results: newsletters }, // expecting backend format; fallback for legacy
	showPagination = true,
	cardVariant = 'dark' // "dark" for DarkCard/DarkPrimaryButton or "light" for LightCard/LightPrimaryButton
}) => {
	const [pdfModal, setPdfModal] = useState({ open: false, pdfUrl: null, title: '', id: null });
	const [currentPage, setCurrentPage] = useState(1);

	// Do we have data in backend format? Accept legacy [{...}] as fallback for previews/mockup/SSR.
	const newslettersArr = Array.isArray(data?.results)
		? data.results
		: Array.isArray(data)
			? data
			: [];
	// fall back to demo data only if completely empty
	const count =
		typeof data?.count === 'number' ? data.count : newslettersArr.length || newsletters.length;
	const totalPages = Math.ceil(count / PAGE_SIZE);

	// Pagination (server or client-side, both supported)
	const getCurrentPageResults = () => {
		if (showPagination) {
			if (Array.isArray(data?.results)) {
				// Assume full slice already in results, do client-side
				return newslettersArr.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
			}
			// fallback to direct array
			return newslettersArr.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
		}
		return newslettersArr;
	};

	const paginatedNewsletters = getCurrentPageResults();

	const openPDF = (pdfUrl, title, id) => {
		setPdfModal({ open: true, pdfUrl, title, id });
	};

	const closePDF = () => {
		setPdfModal({ open: false, pdfUrl: null, title: '', id: null });
	};

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	// Helper for card/button selection
	const isDark = cardVariant === 'dark';

	const Card = isDark ? DarkCard : LightCard;
	const PrimaryButton = isDark ? DarkPrimaryButton : LightPrimaryButton;

	useEffect(() => {
		console.log(paginatedNewsletters);
	}, [paginatedNewsletters]);

	return (
		<div className="">
			{pdfModal.open && (
				<PDFModal
					pdfUrl={pdfModal.pdfUrl}
					title={pdfModal.title}
					onClose={closePDF}
					id={pdfModal.id}
				/>
			)}

			{/* Grid Layout */}
			<div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
				{paginatedNewsletters.map((newsletter) => {
					// Map backend props -> frontend as used
					const {
						id,
						title,
						subtitle,
						description,
						image,
						thumbnail,
						pdf_file,
						views,
						read_time,
						published_date
					} = newsletter;

					return (
						<Card
							key={id}
							useNativeSpacing={true}
							className={
								`flex h-full flex-col overflow-hidden rounded-3xl p-0 shadow-lg transition-all duration-200 hover:shadow-md` +
								(isDark ? '' : ' border border-[#396131]/10 bg-white/90')
							}
						>
							{/* Image Section */}
							<div className="relative h-48 overflow-hidden">
								<img
									src={thumbnail}
									alt={subtitle || title}
									className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-110"
								/>
								<div
									className={
										isDark
											? 'absolute inset-0 bg-gradient-to-t from-[#18421d]/80 via-[#224f27]/30 to-transparent'
											: 'absolute inset-0 bg-gradient-to-t from-[#eaf8ed]/90 via-transparent to-transparent'
									}
								></div>

								{/* Category Badge */}
								<div className="absolute top-4 left-4">
									<div className="rounded-full border border-[#396131]/20 bg-[#f6fff3]/90 px-3 py-1 shadow-lg backdrop-blur-sm">
										<span className="text-xs font-bold tracking-wide text-[#396131] uppercase">
											{title}
										</span>
									</div>
								</div>

								{/* Date Badge */}
								<div className="absolute top-4 right-4">
									<div
										className={
											(isDark ? 'bg-[#4a7c3a]/90' : 'bg-[#396131]/80') +
											' rounded-full px-3 py-1 shadow-lg backdrop-blur-sm'
										}
									>
										<div
											className={
												'flex items-center gap-1 ' + (isDark ? 'text-white' : 'text-white')
											}
										>
											<Calendar size={12} />
											<time className="text-xs leading-tight font-normal">
												{/* Format: "June 15" */}
												{published_date
													? new Date(published_date).toLocaleDateString('en-US', {
															month: 'short',
															day: 'numeric'
														})
													: '--'}
											</time>
										</div>
									</div>
								</div>
							</div>

							{/* Content Section */}
							<div className="flex flex-grow flex-col p-6">
								<div className="flex flex-grow flex-col">
									{/* Section (Card) Header */}
									<h2
										className={
											'mb-3 text-2xl leading-tight font-bold transition-colors duration-200 md:text-2xl ' +
											(isDark ? 'text-white group-hover:text-[#e5ffe2]' : 'text-[#396131]')
										}
									>
										{title}
									</h2>

									{/* Opening Paragraph */}
									<p
										className={
											'mb-4 line-clamp-3 text-base leading-relaxed font-normal ' +
											(isDark ? 'text-white/80' : 'text-[#18421d]/80')
										}
									>
										{description}
									</p>

									{/* Meta Info */}
									<div
										className={
											'mt-auto mb-6 flex items-center gap-4 text-sm leading-relaxed ' +
											(isDark ? 'text-white/60' : 'text-[#396131]/70')
										}
									>
										<div className="flex items-center gap-1">
											<Eye size={16} />
											<span className="font-normal">
												{typeof views === 'number' ? views : views || ''}
											</span>
										</div>
										<div className="flex items-center gap-1">
											<Clock size={16} />
											<span className="font-normal">{read_time || ''}</span>
										</div>
									</div>
								</div>

								<PrimaryButton className="w-full" onClick={() => openPDF(pdf_file, title, id)}>
									<span className="flex w-full items-center justify-center gap-2">
										<span className="text-base font-semibold text-white">Read Full Article</span>
										<ArrowRight
											size={18}
											className="text-white transition-transform duration-300 group-hover:translate-x-1"
										/>
									</span>
								</PrimaryButton>
							</div>
						</Card>
					);
				})}
			</div>

			{/* Pagination Section */}
			{showPagination && totalPages > 1 && (
				<div className="mt-12 flex flex-col items-center gap-4">
					<div className="flex items-center gap-2">
						<button
							className={
								'group inline-flex transform cursor-pointer items-center rounded-xl ' +
								(isDark
									? 'bg-[#396131] text-white'
									: 'border border-[#396131]/60 bg-white text-[#396131]') +
								' px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50'
							}
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
						>
							<span className="text-sm font-bold">Previous</span>
						</button>
						{Array.from({ length: totalPages }, (_, idx) => (
							<button
								key={idx + 1}
								className={
									'group inline-flex transform cursor-pointer items-center rounded-xl px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ' +
									(currentPage === idx + 1
										? isDark
											? 'bg-[#396131] text-white'
											: 'bg-[#396131] text-white'
										: isDark
											? 'bg-white text-[#396131]'
											: 'border border-[#396131]/30 bg-white text-[#396131]')
								}
								onClick={() => handlePageChange(idx + 1)}
							>
								<span className="text-sm font-bold">{idx + 1}</span>
							</button>
						))}
						<button
							className={
								'group inline-flex transform cursor-pointer items-center rounded-xl ' +
								(isDark
									? 'bg-[#396131] text-white'
									: 'border border-[#396131]/60 bg-white text-[#396131]') +
								' px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50'
							}
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
						>
							<span className="text-sm font-bold">Next</span>
						</button>
					</div>
					<div
						className={
							'text-xs leading-relaxed font-normal ' +
							(isDark ? 'text-white/80' : 'text-[#396131]/80')
						}
					>
						Page {currentPage} of {totalPages}
					</div>
				</div>
			)}
		</div>
	);
};

export default function Newsletter() {
	const [newsletters, setNewsletters] = useState([]);

	useEffect(() => {
		newsletterService.getNewsletters().then((response) => {
			console.log(response);
			setNewsletters(response.results);
		});
	}, [newsletterService]);
	return (
		<>
			<main className="flex flex-col">
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
						...newsletters?.slice(0, 5).map((newsletter) => newsletter)
					]}
					brandGradient="from-[#396131] via-[#396131] to-[#396131]"
					brandColor="#396131"
				/>
				<section className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] px-6 py-24">
					<div className="mx-auto max-w-7xl">
						<div className="mb-16 text-center">
							<h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
								Newsletter
							</h2>
							<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-white to-white/80"></div>
							<p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
								Stay updated with our curated collection of insights, trends, and innovations across
								various industries.
							</p>
						</div>
						<NewsletterGrid
							data={{ count: newsletters.length, results: newsletters }}
							showPagination={true}
						/>
					</div>
				</section>
			</main>
		</>
	);
}
