import React, { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';

function StoryModal({ open, onClose, story, brandColor }) {
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

	const handleOpenModal = (idx) => setOpenModalIndex(idx);
	const handleCloseModal = () => setOpenModalIndex(null);

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
						{showButton && (
							<button
								type="button"
								className={`mt-auto inline-flex cursor-pointer items-center gap-2 rounded-lg border border-solid px-5 py-2.5 font-semibold transition-colors duration-200 hover:text-white ${
									openModalIndex === index
										? `bg-[${brandColor}] text-white border-[${brandColor}]`
										: `text-[${brandColor}] border-[${brandColor}] hover:bg-[${brandColor}] hover:text-white focus-visible:bg-[${brandColor}] focus-visible:text-white`
								} `}
								onClick={() => handleOpenModal(index)}
							>
								<span className="text-base leading-tight font-semibold">{buttonText}</span>
								<ArrowRight
									size={16}
									strokeWidth={2}
									className={
										openModalIndex === index
											? 'stroke-white'
											: `stroke-[${brandColor}] group-hover:stroke-white group-focus-visible:stroke-white`
									}
								/>
							</button>
						)}
						{openModalIndex === index && (
							<StoryModal
								open={openModalIndex === index}
								onClose={handleCloseModal}
								story={story}
								brandColor={brandColor}
							/>
						)}
					</div>
				))}
			</div>
		</section>
	);
}
