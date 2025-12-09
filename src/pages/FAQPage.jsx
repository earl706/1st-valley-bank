import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, HelpCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import PageHeroSection from '../components/PageHeroSection';
import { LightHeader } from '../components/Header';
import landingService from '../services/landingService';
import { DetailPageSkeleton } from '../components/PageSkeleton';

// Utility to find links in plain text and convert them to <a> tags.
function renderAnswer(answer) {
	// If already a React node (advanced usage), just return.
	if (React.isValidElement(answer)) return answer;

	const urlRegex = /(https?:\/\/[^\s]+)/g;

	// Split at URLs, keep URLs in result
	const parts = answer.split(urlRegex);

	return parts.map((part, idx) => {
		if (urlRegex.test(part)) {
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

function FAQSection({ faqs, title, subtitle }) {
	const [openIdx, setOpenIdx] = useState(null);

	const toggleIdx = (idx) => {
		setOpenIdx(idx === openIdx ? null : idx);
	};

	return (
		<div className="space-y-4">
			{title && (
				<div className="mb-6">
					<h3 className="mb-2 text-2xl font-bold text-[#396131]">{title}</h3>
					{subtitle && <p className="text-base text-gray-600">{subtitle}</p>}
				</div>
			)}
			{faqs.map((faq, idx) => (
				<div key={faq.id || faq.question || idx}>
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
						className={`overflow-auto rounded-b-md border-l-4 border-[#396131] bg-white px-5 text-gray-700 transition-all duration-300 ${
							openIdx === idx ? 'max-h-96 py-3 opacity-100' : 'max-h-0 py-0 opacity-0'
						}`}
						aria-hidden={openIdx !== idx}
					>
						{renderAnswer(faq.answer)}
					</div>
				</div>
			))}
		</div>
	);
}

export default function FAQPage() {
	const [faqs, setFaqs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchFAQs = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await landingService.getFaqs();
				// Handle both array and paginated response formats
				const faqsData = Array.isArray(response.data)
					? response.data
					: response.data?.results || response.data?.faqs || [];
				setFaqs(faqsData.filter((faq) => faq.is_active !== false));
			} catch (err) {
				console.error('Error fetching FAQs:', err);
				setError('Failed to load FAQs. Please try again later.');
				setFaqs([]);
			} finally {
				setLoading(false);
			}
		};

		fetchFAQs();
	}, []);

	// Show skeleton on initial load
	if (loading && faqs.length === 0) {
		return <DetailPageSkeleton showHero={true} showContent={true} contentSections={3} />;
	}

	return (
		<>
			<main className="flex flex-col">
				<PageHeroSection
					pageSlug="faq"
					brandColor="#396131"
					brandGradient="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
					minHeight="min-h-[560px] lg:min-h-[640px]"
					showLearnMoreButton={false}
				/>

				{/* FAQ Content Section */}
				<section className="bg-white py-20">
					<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
						<LightHeader
							badgeText="FAQ"
							title="Frequently Asked Questions"
							subtitle="Find answers to the most common questions from our customers. Can't find what you're looking for? Contact us for assistance."
							alignment="center"
							level={2}
							className="mb-12"
							textClassName="text-[#396131]"
						/>

						{error ? (
							<div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
								<p className="text-red-800">{error}</p>
							</div>
						) : faqs.length === 0 ? (
							<div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center">
								<HelpCircle className="mx-auto mb-4 h-16 w-16 text-gray-400" />
								<p className="text-lg font-semibold text-gray-700">
									No FAQs available at this time.
								</p>
								<p className="mt-2 text-gray-600">
									Please check back later or contact us if you have questions.
								</p>
							</div>
						) : (
							// Just render all FAQs in a single list
							<FAQSection faqs={faqs} />
						)}
					</div>
				</section>

				{/* Contact CTA Section */}
				<section className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-16">
					<div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
						<h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
							Still Have Questions?
						</h2>
						<p className="mb-8 text-lg text-white/90">
							Our team is here to help. Get in touch with us for personalized assistance.
						</p>
						<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
							<NavLink
								to="/contact-us"
								className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#396131] shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
							>
								Contact Us
							</NavLink>
							<NavLink
								to="/branches"
								className="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
							>
								Find a Branch
							</NavLink>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
