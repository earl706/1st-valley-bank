import React, { useState, useEffect } from 'react';
import { ArrowRight, X, FileText, Download } from 'lucide-react';

function PDFModal({ open, onClose, pdfUrl, title }) {
	useEffect(() => {
		if (open) {
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = originalOverflow;
			};
		}
	}, [open]);

	if (!open || !pdfUrl) return null;

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
				<div className="flex flex-shrink-0 items-center gap-4 px-6 pt-6 pb-2">
					<FileText className="h-5 w-5 text-[#396131]" />
					<h2 className="truncate text-lg font-bold text-[#396131]" title={title}>
						{title}
					</h2>
				</div>
				<div className="flex-1 overflow-hidden rounded-b-xl">
					<iframe
						src={pdfUrl}
						title={title}
						className="h-full w-full border-0"
						allowFullScreen
						style={{ background: 'white', minHeight: 400 }}
					/>
				</div>
			</div>
		</div>
	);
}

function StoryModal({ open, onClose, story, brandColor, onViewPDF }) {
	if (!open || !story) return null;

	return (
		<div
			className="fixed inset-0 z-99 flex items-center justify-center overflow-y-auto bg-black/40"
			aria-modal="true"
			role="dialog"
			tabIndex={-1}
			onClick={onClose}
		>
			<div
				className="relative mx-auto max-h-[90vh] max-w-7xl overflow-y-auto rounded-xl bg-white p-8 shadow-2xl md:max-h-[80vh]"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
					aria-label="Close"
				>
					<X className="h-6 w-6" />
				</button>
				<div className="flex flex-col items-center">
					<img
						src={story.img || story.image}
						alt={story.alt || story.name}
						className="mb-4 h-40 w-full max-w-[220px] rounded-lg border border-gray-200 object-cover"
					/>
					<span className="mb-1 text-xl leading-tight font-bold" style={{ color: brandColor }}>
						{story.name || story.title}
					</span>
					<span className="mb-2 text-sm leading-tight text-gray-500">
						{story.location || story.subtitle}
					</span>
					<div className="mb-4 flex flex-col gap-3 text-base leading-relaxed font-normal text-gray-700">
						{Array.isArray(story.paragraphs) && story.paragraphs.length > 0 ? (
							story.paragraphs.map((para, idx) => (
								<p key={idx} className="whitespace-pre-line">
									{para}
								</p>
							))
						) : (
							<p className="whitespace-pre-line">
								{story.fullStory || story.full || story.story || story.description}
							</p>
						)}
					</div>
					{story.pdf_file && (
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								onViewPDF(story.pdf_file, story.name || story.title);
							}}
							className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#396131] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#294624]"
						>
							<FileText size={18} />
							View PDF Story
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default function SuccessStoriesSection({
	id = 'success-stories',
	title = 'Success Stories',
	subtitle = 'Real stories from our clients who have grown with our services.',
	stories = [],
	brandColor = '#396131',
	className = '',
	containerClassName = 'mx-[20px] my-12',
	gridClassName = 'grid grid-cols-1 gap-8 md:grid-cols-2 lg:mx-[60px] lg:grid-cols-3',
	buttonText = 'Read Story',
	showButton = true
}) {
	const [openModalIndex, setOpenModalIndex] = useState(null);
	const [pdfModal, setPdfModal] = useState({ open: false, pdfUrl: null, title: '' });

	const handleOpenModal = (idx) => {
		const story = stories[idx];
		// If story has PDF, show PDF directly instead of story modal
		if (story && story.pdf_file) {
			handleViewPDF(story.pdf_file, story.name || story.title);
		} else {
			setOpenModalIndex(idx);
		}
	};
	const handleCloseModal = () => setOpenModalIndex(null);

	const handleViewPDF = (pdfUrl, title) => {
		setPdfModal({ open: true, pdfUrl, title });
		setOpenModalIndex(null); // Close story modal when opening PDF
	};

	const handleClosePDF = () => {
		setPdfModal({ open: false, pdfUrl: null, title: '' });
	};

	// Disable scroll on body when modal is open
	useEffect(() => {
		if (openModalIndex !== null) {
			const originalStyle = window.getComputedStyle(document.body).overflow;
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = originalStyle;
			};
		}
	}, [openModalIndex]);

	return (
		<section id={id} className={`${containerClassName} ${className} py-24`}>
			<PDFModal
				open={pdfModal.open}
				onClose={handleClosePDF}
				pdfUrl={pdfModal.pdfUrl}
				title={pdfModal.title}
			/>

			<header className="mb-8 text-center">
				<h2 className="text-3xl leading-tight font-bold md:text-5xl" style={{ color: brandColor }}>
					{title}
				</h2>
				<p className="mt-2 text-2xl leading-tight font-normal text-gray-600 md:text-3xl">
					{subtitle}
				</p>
			</header>
			<div className={gridClassName}>
				{stories.map((story, index) => (
					<div
						key={story.name || story.id || index}
						className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
					>
						<img
							src={story.img || story.image}
							alt={story.alt || story.name}
							className="mb-4 h-40 w-full max-w-[220px] rounded-lg border border-gray-200 object-cover"
						/>
						<span className="mb-1 text-xl leading-tight font-bold" style={{ color: brandColor }}>
							{story.name || story.title}
						</span>
						<span className="mb-2 text-sm leading-tight text-gray-500">
							{story.location || story.subtitle}
						</span>
						<p className="mb-4 text-center text-base leading-relaxed font-normal text-gray-700">
							{story.description}
						</p>
						<div className="mt-auto flex w-full flex-col gap-2">
							{showButton && (
								<button
									type="button"
									className="group inline-flex transform cursor-pointer items-center justify-center rounded-xl bg-[#396131] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
									onClick={() => handleOpenModal(index)}
								>
									<span className="text-center text-base leading-tight font-semibold">
										{buttonText}
									</span>
									<span className="ml-2 flex items-center justify-center">
										<ArrowRight
											size={16}
											strokeWidth={2}
											className="stroke-white transition-transform duration-300 group-hover:translate-x-1"
										/>
									</span>
								</button>
							)}
						</div>
						{openModalIndex === index && (
							<StoryModal
								open={openModalIndex === index}
								onClose={handleCloseModal}
								story={story}
								brandColor={brandColor}
								onViewPDF={handleViewPDF}
							/>
						)}
					</div>
				))}
			</div>
		</section>
	);
}
