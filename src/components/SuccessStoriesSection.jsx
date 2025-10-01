import React, { useState } from 'react';

function StoryModal({ open, onClose, story, brandColor }) {
	if (!open || !story) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
			aria-modal="true"
			role="dialog"
			tabIndex={-1}
		>
			<div className="relative w-full max-w-7xl rounded-xl bg-white p-8 shadow-2xl">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
					aria-label="Close"
				>
					<svg
						className="h-6 w-6"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				<div className="flex flex-col items-center">
					<img
						src={story.img || story.image}
						alt={story.alt || story.name}
						className="mb-4 h-40 w-full max-w-[220px] rounded-lg border border-gray-200 object-cover"
					/>
					<span className="mb-1 text-lg font-bold" style={{ color: brandColor }}>
						{story.name || story.title}
					</span>
					<span className="mb-2 text-sm text-gray-500">{story.location || story.subtitle}</span>
					<div className="mb-4 flex flex-col gap-3 text-base text-gray-700">
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

	return (
		<section id={id} className={`${containerClassName} ${className}`}>
			<header className="mb-8 text-center">
				<h2 className="text-2xl font-bold md:text-3xl" style={{ color: brandColor }}>
					{title}
				</h2>
				<p className="mt-2 text-base text-gray-600 md:text-lg">{subtitle}</p>
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
						<span className="mb-1 text-lg font-bold" style={{ color: brandColor }}>
							{story.name || story.title}
						</span>
						<span className="mb-2 text-sm text-gray-500">{story.location || story.subtitle}</span>
						<p className="mb-4 text-center text-sm text-gray-700">{story.description}</p>
						{showButton && (
							<button
								type="button"
								className={`mt-auto inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#396131] px-5 py-2.5 font-semibold text-[#396131] transition-all duration-200 hover:bg-[#396131] hover:text-white focus:ring-2 focus:outline-none`}
								onClick={() => handleOpenModal(index)}
							>
								<span
									className="transition-colors duration-200"
									style={{
										color: 'inherit'
									}}
								>
									{buttonText}
								</span>
								<svg
									className="h-4 w-4"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
								<style>{`
									[data-tw="success-story-btn"]:hover, 
									[data-tw="success-story-btn"]:focus-visible {
										background-color: ${brandColor} !important;
										color: white !important;
									}
								`}</style>
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
