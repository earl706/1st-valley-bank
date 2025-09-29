import React from 'react';
import { NavLink } from 'react-router-dom';

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
						{showButton && story.route && (
							<NavLink
								to={story.route}
								className="mt-auto inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 font-semibold transition-all duration-200 hover:text-white focus:ring-2 focus:outline-none"
								style={{
									borderColor: brandColor,
									color: brandColor,
									'--hover-bg': brandColor,
									'--focus-ring': `${brandColor}30`
								}}
								onMouseEnter={(e) => {
									e.target.style.backgroundColor = brandColor;
									e.target.style.color = 'white';
								}}
								onMouseLeave={(e) => {
									e.target.style.backgroundColor = 'white';
									e.target.style.color = brandColor;
								}}
							>
								<span>{buttonText}</span>
								<svg
									className="h-4 w-4"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</NavLink>
						)}
					</div>
				))}
			</div>
		</section>
	);
}
