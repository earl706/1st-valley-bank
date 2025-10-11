import { faLetterboxd } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Calendar, ArrowRight, Eye, Clock, X } from 'lucide-react';
import img1 from '/src/assets/newsletter/1.jpg';
import img2 from '/src/assets/newsletter/2.jpg';
import img3 from '/src/assets/newsletter/3.jpg';
import img4 from '/src/assets/newsletter/4.jpg';
import img5 from '/src/assets/newsletter/5.jpg';
import img6 from '/src/assets/newsletter/6.jpg';
import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import img from '/src/assets/homepage/heroSectionImage.png';
import CarouselSection from '../components/CarouselSection';

import pdf1 from '/src/assets/newsletter/document.pdf';

// PDF Viewer Modal Component
function PDFModal({ pdfUrl, title, onClose }) {
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

const NewsletterGrid = () => {
	const [pdfModal, setPdfModal] = useState({ open: false, pdfUrl: null, title: '' });
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(newsletters.length / PAGE_SIZE);

	const openPDF = (pdfUrl, title) => {
		setPdfModal({ open: true, pdfUrl, title });
	};

	const closePDF = () => {
		setPdfModal({ open: false, pdfUrl: null, title: '' });
	};

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const paginatedNewsletters = newsletters.slice(
		(currentPage - 1) * PAGE_SIZE,
		currentPage * PAGE_SIZE
	);

	return (
		<div className="min-h-screen bg-gradient-to-l from-[#396131] to-[#4a7c3a] px-6 py-24">
			{pdfModal.open && (
				<PDFModal pdfUrl={pdfModal.pdfUrl} title={pdfModal.title} onClose={closePDF} />
			)}
			<div className="mx-auto max-w-7xl">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
						Latest Newsletter Issues
					</h2>
					<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-white to-white/80"></div>
					<p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
						Stay updated with our curated collection of insights, trends, and innovations across
						various industries.
					</p>
				</div>

				{/* Grid Layout */}
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{paginatedNewsletters.map((newsletter) => (
						<div
							key={newsletter.id}
							className="group flex h-full transform flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/90 shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl"
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
									<div className="rounded-full bg-white/90 px-3 py-1 shadow-lg backdrop-blur-sm">
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
									<h2 className="mb-3 text-xl leading-tight font-bold text-[#396131] transition-colors duration-200 group-hover:text-[#4a7a3f]">
										{newsletter.title}
									</h2>

									{/* Opening Paragraph */}
									<p className="mb-4 line-clamp-3 text-sm leading-relaxed text-[#204927]">
										{newsletter.description}
									</p>

									{/* Meta Info */}
									<div className="mt-auto mb-6 flex items-center gap-4 text-xs text-[#32653f]/80">
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
								<button
									className="group/btn mt-4 flex w-full transform cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#396131] px-4 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-[#2d4d26] hover:shadow-lg active:scale-95"
									onClick={() => openPDF(newsletter.pdf, newsletter.title)}
								>
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

				{/* Pagination Section */}
				<div className="mt-12 flex flex-col items-center gap-4">
					<div className="flex items-center gap-2">
						<button
							className="cursor-pointer rounded-lg border border-white bg-[#3e7a3e] px-3 py-2 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-[#396131] disabled:opacity-50"
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
						>
							Previous
						</button>
						{Array.from({ length: totalPages }, (_, idx) => (
							<button
								key={idx + 1}
								className={`cursor-pointer rounded-lg border px-3 py-2 font-semibold ${
									currentPage === idx + 1
										? 'border-white bg-[#396131] text-white'
										: 'border-white bg-white text-[#396131] hover:bg-[#396131] hover:text-white'
								} transition-all duration-200`}
								onClick={() => handlePageChange(idx + 1)}
							>
								{idx + 1}
							</button>
						))}
						<button
							className="cursor-pointer rounded-lg border border-white bg-[#3e7a3e] px-3 py-2 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-[#396131] disabled:opacity-50"
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
						>
							Next
						</button>
					</div>
					<div className="text-xs text-white/80">
						Page {currentPage} of {totalPages}
					</div>
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
