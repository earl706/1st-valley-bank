import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Eye, Clock, X, ArrowRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import { DarkPrimaryButton } from '../components/Buttons';
import newsletterService from '../services/newsletterService';
import { DetailPageSkeleton } from '../components/PageSkeleton';

// PDF Viewer Modal Component
function PDFModal({ pdfUrl, title, onClose, id }) {
	useEffect(() => {
		if (id) {
			newsletterService.incrementViewCount(id).then((response) => {
				console.log('View count incremented:', response);
			});
		}
	}, [id]);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
			<button
				onClick={onClose}
				aria-label="Close"
				className="absolute top-4 right-4 z-10 cursor-pointer rounded-full bg-white p-2 shadow hover:bg-gray-100"
			>
				<X className="h-5 w-5 text-gray-800" />
			</button>
			<div className="relative flex h-[90vh] w-full max-w-7xl flex-col rounded-xl bg-white shadow-2xl">
				<div className="shrink-0 px-6 pt-6 pb-2">
					<h2 className="text-lg font-bold text-[#396131]">{title}</h2>
				</div>
				<div className="flex-1 overflow-hidden">
					{pdfUrl ? (
						<iframe src={pdfUrl} title={title} className="h-full w-full border-0" allowFullScreen />
					) : (
						<div className="flex h-full items-center justify-center">
							<p className="text-gray-500">PDF not available</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default function NewsletterDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [newsletter, setNewsletter] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [pdfModal, setPdfModal] = useState({ open: false, pdfUrl: null, title: '', id: null });

	useEffect(() => {
		const fetchNewsletter = async () => {
			if (!id) {
				setError('Newsletter ID is required');
				setLoading(false);
				return;
			}

			setLoading(true);
			setError(null);

			try {
				const result = await newsletterService.getNewsletter(id);
				if (result.success && result.data) {
					setNewsletter(result.data);
				} else {
					setError(result.message || 'Failed to load newsletter');
				}
			} catch (err) {
				console.error('Error fetching newsletter:', err);
				setError('An error occurred while loading the newsletter');
			} finally {
				setLoading(false);
			}
		};

		fetchNewsletter();
	}, [id]);

	const openPDF = (pdfUrl, title, id) => {
		setPdfModal({ open: true, pdfUrl, title, id });
	};

	const closePDF = () => {
		setPdfModal({ open: false, pdfUrl: null, title: '', id: null });
	};

	const formatDate = (dateString) => {
		if (!dateString) return '—';
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		} catch {
			return dateString;
		}
	};

	if (loading) {
		return <DetailPageSkeleton showHero={true} showContent={true} contentSections={3} />;
	}

	if (error || !newsletter) {
		return (
			<div className="min-h-screen bg-[#f6fbf8]">
				<HeroSection
					title="Newsletter Not Found"
					subtitle="The newsletter article you're looking for doesn't exist or has been removed"
					bgColor="#396131"
					textColor="#fff"
				/>
				<div className="flex min-h-[60vh] items-center justify-center bg-gradient-to-l from-[#396131] to-[#4a7c3a] px-4 py-24">
					<div className="mx-auto max-w-2xl text-center">
						<div className="mb-6 text-6xl">📄</div>
						<h2 className="mb-4 text-3xl font-bold text-white">Article Not Found</h2>
						<p className="mb-8 text-lg text-white/80">
							{error || 'The newsletter article you requested could not be found.'}
						</p>
						<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
							<DarkPrimaryButton to="/newsletter" className="inline-flex items-center gap-2">
								<ArrowLeft className="h-5 w-5" />
								Back to Newsletter
							</DarkPrimaryButton>
							<DarkPrimaryButton to="/" className="inline-flex items-center gap-2">
								Go to Homepage
								<ArrowRight className="h-5 w-5" />
							</DarkPrimaryButton>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			{pdfModal.open && (
				<PDFModal
					pdfUrl={pdfModal.pdfUrl}
					title={pdfModal.title}
					onClose={closePDF}
					id={pdfModal.id}
				/>
			)}

			<div className="min-h-screen bg-[#f6fbf8]">
				<HeroSection
					title={newsletter.title || 'Newsletter Article'}
					subtitle={newsletter.subtitle || ''}
					bgColor="#396131"
					textColor="#fff"
				/>

				{/* Main Content */}
				<article className="bg-white px-4 py-12">
					<div className="mx-auto max-w-7xl">
						{/* Header Section */}
						<header className="mb-8">
							{/* Meta Information */}
							<div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4" />
									<time dateTime={newsletter.published_date}>
										{formatDate(newsletter.published_date)}
									</time>
								</div>
								{newsletter.read_time && (
									<div className="flex items-center gap-2">
										<Clock className="h-4 w-4" />
										<span>{newsletter.read_time}</span>
									</div>
								)}
								{newsletter.views !== undefined && (
									<div className="flex items-center gap-2">
										<Eye className="h-4 w-4" />
										<span>
											{typeof newsletter.views === 'number'
												? newsletter.views
												: newsletter.views || '0'}{' '}
											views
										</span>
									</div>
								)}
							</div>

							{/* Title */}
							<h1 className="mb-4 text-4xl leading-tight font-bold text-[#396131] md:text-5xl">
								{newsletter.title}
							</h1>

							{/* Subtitle */}
							{newsletter.subtitle && (
								<p className="mb-6 text-xl leading-relaxed text-gray-700">{newsletter.subtitle}</p>
							)}
						</header>

						{/* Featured Image */}
						{newsletter.image && (
							<div className="mb-8 overflow-hidden rounded-2xl shadow-lg">
								<img
									src={newsletter.image}
									alt={newsletter.title}
									className="h-auto w-full object-cover"
								/>
							</div>
						)}

						{/* Article Content */}
						<div className="prose prose-lg max-w-none">
							<div className="mb-8 text-base leading-relaxed whitespace-pre-line text-gray-800">
								{newsletter.description}
							</div>
						</div>

						{/* PDF Section */}
						{newsletter.pdf_file && (
							<div className="my-12 rounded-2xl border border-gray-200 bg-gradient-to-l from-[#396131] to-[#4a7c3a] p-8 text-center shadow-lg">
								<h3 className="mb-4 text-2xl font-bold text-white">Read the Full Article</h3>
								<p className="mb-6 text-white/90">
									Download or view the complete newsletter article in PDF format.
								</p>
								<DarkPrimaryButton
									onClick={() => openPDF(newsletter.pdf_file, newsletter.title, newsletter.id)}
									className="inline-flex items-center gap-2"
								>
									<span>View PDF</span>
									<ArrowRight className="h-5 w-5" />
								</DarkPrimaryButton>
							</div>
						)}

						{/* Footer Actions */}
						<div className="mt-12 flex flex-col gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:justify-between">
							<Link
								to="/newsletter"
								className="inline-flex items-center gap-2 text-[#396131] transition hover:underline"
							>
								<ArrowLeft className="h-5 w-5" />
								<span>Back to All Newsletters</span>
							</Link>
							<Link
								to="/contact-us"
								className="inline-flex items-center gap-2 text-[#396131] transition hover:underline"
							>
								<span>Contact Us</span>
								<ArrowRight className="h-5 w-5" />
							</Link>
						</div>
					</div>
				</article>
			</div>
		</>
	);
}
