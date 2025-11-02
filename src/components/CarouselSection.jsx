import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CarouselSection({
	id = 'carousel',
	slides = [],
	autoPlay = true,
	autoPlayInterval = 5000,
	brandColor = '#396131',
	brandGradient = 'from-[#396131] via-[#4a7c3a] to-[#5a8c4a]',
	minHeight = 'min-h-[560px] lg:min-h-[640px]',
	showLearnMoreButton = true,
	learnMoreText = 'Learn More',
	excludeLearnMoreForTitles = [],
	imageOnly = false // NEW PARAMETER: if true, render only the image for each slide
}) {
	const [current, setCurrent] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [touchStart, setTouchStart] = useState(null);
	const [touchEnd, setTouchEnd] = useState(null);

	// Auto-play functionality
	useEffect(() => {
		if (!autoPlay || isPaused || slides.length <= 1) return;

		const interval = setInterval(() => {
			nextSlide();
		}, autoPlayInterval);

		return () => clearInterval(interval);
	}, [current, isPaused, autoPlay, autoPlayInterval, slides.length]);

	const nextSlide = useCallback(() => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrent((prev) => (prev + 1) % slides.length);
		setTimeout(() => setIsTransitioning(false), 500);
	}, [isTransitioning, slides.length]);

	const prevSlide = useCallback(() => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
		setTimeout(() => setIsTransitioning(false), 500);
	}, [isTransitioning, slides.length]);

	const changeSlide = useCallback(
		(index) => {
			if (isTransitioning || index === current) return;
			setIsTransitioning(true);
			setCurrent(index);
			setTimeout(() => setIsTransitioning(false), 500);
		},
		[current, isTransitioning]
	);

	// Touch handlers
	const handleTouchStart = (e) => {
		setTouchEnd(null);
		setTouchStart(e.targetTouches[0].clientX);
	};

	const handleTouchMove = (e) => {
		setTouchEnd(e.targetTouches[0].clientX);
	};

	const handleTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > 50;
		const isRightSwipe = distance < -50;

		if (isLeftSwipe) nextSlide();
		if (isRightSwipe) prevSlide();
	};

	if (!slides || slides.length === 0) {
		return null;
	}

	return (
		<section id={id} data-scroll className={`relative overflow-hidden`}>
			{/* Carousel Implementation */}
			<div
				className="max-w-8xl relative mx-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-4"
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				<div className="relative overflow-hidden">
					{/* Slide Container */}
					<div
						className="flex transition-transform duration-500 ease-in-out"
						style={{ transform: `translateX(-${current * 100}%)` }}
					>
						{slides.map((slide, index) => (
							<div
								key={index}
								className="w-full flex-shrink-0"
								role="tabpanel"
								aria-label={`Slide ${index + 1} of ${slides.length}`}
							>
								{imageOnly ? (
									// Only render the image, no content, no grid, no title, etc.
									<div className={`flex items-center justify-center ${minHeight}`}>
										<img
											src={slide.image}
											alt={slide.imageAlt || slide.title || ''}
											className={`mx-auto h-auto w-full max-w-lg transform drop-shadow-lg transition-all duration-700 hover:scale-110 hover:drop-shadow-2xl ${
												index === current ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
											}`}
											style={{
												imageOrientation: 'from-image',
												objectFit: 'contain'
											}}
										/>
									</div>
								) : (
									<div
										className={`mx-8 grid ${minHeight} items-center gap-12 lg:mx-16 lg:grid-cols-2`}
									>
										{/* Image/Visual */}
										<div className="relative order-0 flex h-full items-center justify-center lg:order-1">
											<div className="relative z-10">
												<img
													src={slide.image}
													alt={slide.imageAlt || slide.title || ''}
													className={`mx-auto h-auto w-full max-w-lg transform drop-shadow-lg transition-all duration-700 hover:scale-110 hover:drop-shadow-2xl ${
														index === current ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
													}`}
													style={{
														imageOrientation: 'from-image',
														objectFit: 'contain'
													}}
												/>
											</div>
										</div>

										{/* Content */}
										<div className="order-1 flex h-full flex-col justify-center space-y-8 lg:order-0">
											<div className="space-y-4">
												<h1 className="text-3xl leading-tight font-bold text-gray-900 sm:text-4xl lg:text-5xl">
													<span
														className={`block transform bg-gradient-to-r ${brandGradient} bg-clip-text text-3xl leading-tight font-black text-transparent transition-all delay-100 duration-700 sm:text-4xl lg:text-5xl ${
															index === current
																? 'translate-y-0 opacity-100'
																: 'translate-y-4 opacity-0'
														}`}
													>
														{slide.title || slide.name}
													</span>
													{slide.subtitle && (
														<span
															className={`block transform bg-gradient-to-r ${brandGradient} bg-clip-text text-lg leading-tight font-bold text-transparent transition-all delay-200 duration-700 sm:text-xl lg:text-2xl ${
																index === current
																	? 'translate-y-0 opacity-100'
																	: 'translate-y-4 opacity-0'
															}`}
														>
															{slide.subtitle}
														</span>
													)}
												</h1>

												{slide.description && (
													<p
														className={`max-w-2xl transform text-base leading-relaxed text-gray-600 transition-all delay-300 duration-700 ${
															index === current
																? 'translate-y-0 opacity-100'
																: 'translate-y-4 opacity-0'
														}`}
													>
														{slide.description}
													</p>
												)}

												{/* Features List */}
												{slide.features && slide.features.length > 0 && (
													<div
														className={`transform transition-all delay-400 duration-700 ${
															index === current
																? 'translate-y-0 opacity-100'
																: 'translate-y-4 opacity-0'
														}`}
													>
														<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
															{slide.features.map((feature, featureIndex) => (
																<div key={featureIndex} className="flex items-center gap-2">
																	<div
																		className="h-2 w-2 rounded-full"
																		style={{ backgroundColor: brandColor }}
																	></div>
																	<span className="text-sm text-gray-700">{feature}</span>
																</div>
															))}
														</div>
													</div>
												)}

												{/* Learn More Button */}
												{showLearnMoreButton &&
													(slide.route || slide.button_route) &&
													(slide.showButton !== false || slide.button_text) &&
													!excludeLearnMoreForTitles.includes(slide.title) && (
														<div
															className={`transform pt-8 transition-all delay-500 duration-700 ${
																index === current
																	? 'translate-y-0 opacity-100'
																	: 'translate-y-4 opacity-0'
															}`}
														>
															{slide.onButtonClick ? (
																<button
																	type="button"
																	className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
																	style={{
																		background: `linear-gradient(to right, ${brandColor}, ${brandColor}dd)`
																	}}
																	onClick={slide.onButtonClick}
																>
																	{slide.buttonText || learnMoreText}
																	<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
																</button>
															) : (
																<NavLink
																	to={slide.route || slide.button_route}
																	className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
																	style={{
																		background: `linear-gradient(to right, ${brandColor}, ${brandColor}dd)`
																	}}
																>
																	{slide.buttonText || learnMoreText}
																	<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
																</NavLink>
															)}
														</div>
													)}
											</div>
										</div>
									</div>
								)}
							</div>
						))}
					</div>

					{/* Carousel Controls */}
					{slides.length > 1 && (
						<>
							<button
								onClick={prevSlide}
								disabled={isTransitioning}
								className={`absolute top-1/2 left-4 z-20 hidden -translate-x-[calc(100%+0.5rem)] -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 shadow transition-all duration-200 hover:bg-white hover:shadow-lg sm:left-6 sm:flex md:left-8 lg:left-10 xl:left-12 ${
									isTransitioning ? 'pointer-events-none opacity-50' : 'hover:scale-110'
								}`}
								aria-label="Previous Slide"
							>
								<ChevronLeft className="h-6 w-6" style={{ color: brandColor }} aria-hidden="true" />
							</button>
							<button
								onClick={nextSlide}
								disabled={isTransitioning}
								className={`absolute top-1/2 right-4 z-20 hidden translate-x-[calc(100%+0.5rem)] -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 shadow transition-all duration-200 hover:bg-white hover:shadow-lg sm:right-6 sm:flex md:right-8 lg:right-10 xl:right-12 ${
									isTransitioning ? 'pointer-events-none opacity-50' : 'hover:scale-110'
								}`}
								aria-label="Next Slide"
							>
								<ChevronRight
									className="h-6 w-6"
									style={{ color: brandColor }}
									aria-hidden="true"
								/>
							</button>

							{/* Progress Dots */}
							<div className="z-20 mt-6 flex justify-center gap-2 lg:mt-8 xl:absolute xl:bottom-4 xl:left-1/2 xl:mt-0 xl:-translate-x-1/2">
								{slides.map((_, idx) => (
									<button
										key={idx}
										onClick={() => changeSlide(idx)}
										disabled={isTransitioning}
										className={`h-2 w-4 cursor-pointer rounded-full transition-all duration-300 hover:scale-110 ${
											current === idx ? 'w-10' : 'bg-gray-300 hover:bg-gray-400'
										} ${isTransitioning ? 'pointer-events-none' : ''}`}
										style={{
											backgroundColor: current === idx ? brandColor : undefined
										}}
										aria-label={`Go to slide ${idx + 1}`}
									/>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
}
