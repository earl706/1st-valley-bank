import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import img1 from '/src/assets/advisory/1.jpg';
import img2 from '/src/assets/advisory/2.png';
import img3 from '/src/assets/advisory/3.jpg';
import img4 from '/src/assets/advisory/4.jpeg';
import img5 from '/src/assets/advisory/5.png';
import img6 from '/src/assets/advisory/6.jpg';
import img7 from '/src/assets/advisory/7.jpg';
import img8 from '/src/assets/advisory/8.jpg';
import img9 from '/src/assets/advisory/9.jpg';
import img10 from '/src/assets/advisory/10.png';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const Carousel = () => {
	const [current, setCurrent] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [touchStart, setTouchStart] = useState(null);
	const [touchEnd, setTouchEnd] = useState(null);
	const [loading, setLoading] = useState(true);

	// Auto-play functionality (every 4s)
	useEffect(() => {
		if (isPaused || images.length <= 1) return;
		const interval = setInterval(() => {
			nextSlide();
		}, 4000);
		return () => clearInterval(interval);
	}, [current, isPaused]);

	const nextSlide = useCallback(() => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrent((prev) => (prev + 1) % images.length);
		setTimeout(() => setIsTransitioning(false), 500);
	}, [isTransitioning]);

	const prevSlide = useCallback(() => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrent((prev) => (prev - 1 + images.length) % images.length);
		setTimeout(() => setIsTransitioning(false), 500);
	}, [isTransitioning]);

	const changeSlide = useCallback(
		(idx) => {
			if (isTransitioning || idx === current) return;
			setIsTransitioning(true);
			setCurrent(idx);
			setTimeout(() => setIsTransitioning(false), 500);
		},
		[current, isTransitioning]
	);

	// Keyboard navigation
	useEffect(() => {
		const onKey = (e) => {
			if (e.key === 'ArrowLeft') prevSlide();
			if (e.key === 'ArrowRight') nextSlide();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [prevSlide, nextSlide]);

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
		setTouchStart(null);
		setTouchEnd(null);
	};

	// The main source of slowness is the use of heavy transitions and rendering all images at once (even those not visible).
	// To improve performance, only render the current, previous, and next images in the DOM, and reduce transition durations.
	// Also, avoid unnecessary re-renders and use lighter transition classes.

	return (
		<div
			className="w-full p-2 sm:p-4 lg:p-8"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
		>
			<div
				className="relative h-56 overflow-hidden rounded-3xl border border-[#396131]/10 bg-gradient-to-br from-[#e8f5e9] via-[#f1f8e9] to-[#e0f2f1] shadow-2xl sm:h-72 md:h-96 lg:h-[28rem] xl:h-[34rem]"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				{/* Loading spinner */}
				{loading && (
					<div className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-br from-[#396131]/80 to-[#4a7a3f]/80">
						<div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
					</div>
				)}
				{/* Slide Container */}
				<div
					className="flex h-full transition-transform duration-300 ease-in-out"
					style={{ transform: `translateX(-${current * 100}%)` }}
				>
					{images.map((img, idx) => {
						// Only render current, previous, and next images for performance
						const isActive = idx === current;
						const isPrev = idx === (current - 1 + images.length) % images.length;
						const isNext = idx === (current + 1) % images.length;
						if (!isActive && !isPrev && !isNext)
							return <div key={idx} className="flex h-full w-full flex-shrink-0" />;
						return (
							<div
								key={idx}
								className="flex h-full w-full flex-shrink-0 items-center justify-center"
								role="tabpanel"
								aria-label={`Slide ${idx + 1} of ${images.length}`}
							>
								<img
									src={img}
									alt={`Advisory Slide ${idx + 1}`}
									className={`mx-auto h-full w-full max-w-4xl object-contain object-center drop-shadow-lg transition-all duration-300 ${
										isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
									}`}
									onLoad={idx === 0 ? () => setLoading(false) : undefined}
									loading={idx === 0 ? 'eager' : 'lazy'}
									draggable={false}
									style={{
										userSelect: 'none',
										imageOrientation: 'from-image'
									}}
								/>
							</div>
						);
					})}
				</div>
				{/* Carousel Controls */}
				{images.length > 1 && (
					<>
						<button
							onClick={prevSlide}
							disabled={isTransitioning}
							className={`absolute top-1/2 left-4 z-20 hidden -translate-x-[calc(100%+0.5rem)] -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 shadow transition-all duration-150 hover:bg-white hover:shadow-lg sm:left-6 sm:flex md:left-8 lg:left-10 xl:left-12 ${
								isTransitioning ? 'pointer-events-none opacity-50' : 'hover:scale-110'
							}`}
							aria-label="Previous Slide"
						>
							<ChevronLeft className="h-6 w-6" />
						</button>
						<button
							onClick={nextSlide}
							disabled={isTransitioning}
							className={`absolute top-1/2 right-4 z-20 hidden translate-x-[calc(100%+0.5rem)] -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 shadow transition-all duration-150 hover:bg-white hover:shadow-lg sm:right-6 sm:flex md:right-8 lg:right-10 xl:right-12 ${
								isTransitioning ? 'pointer-events-none opacity-50' : 'hover:scale-110'
							}`}
							aria-label="Next Slide"
						>
							<ChevronRight className="h-6 w-6" />
						</button>
						{/* Progress Dots */}
						<div className="z-20 mt-6 flex justify-center gap-2 lg:mt-8 xl:absolute xl:bottom-4 xl:left-1/2 xl:mt-0 xl:-translate-x-1/2">
							{images.map((_, idx) => (
								<button
									key={idx}
									onClick={() => changeSlide(idx)}
									disabled={isTransitioning}
									className={`h-2 w-4 cursor-pointer rounded-full transition-all duration-150 hover:scale-110 ${
										current === idx ? 'w-10 bg-[#396131]' : 'bg-gray-300 hover:bg-gray-400'
									} ${isTransitioning ? 'pointer-events-none' : ''}`}
									aria-label={`Go to slide ${idx + 1}`}
								/>
							))}
						</div>
					</>
				)}
				{/* Counter */}
				<div className="absolute top-3 right-3 z-20 rounded-full bg-[#396131]/80 px-3 py-1 text-xs font-semibold text-white shadow-md sm:text-sm">
					{current + 1} / {images.length}
				</div>
			</div>
			{/* Thumbnails */}
			<div className="scrollbar-thin scrollbar-thumb-[#396131]/30 scrollbar-track-transparent mt-6 flex justify-center space-x-2 overflow-x-auto px-2 pb-2 sm:space-x-3 sm:px-0 lg:mt-10">
				{images.map((img, idx) => (
					<button
						key={idx}
						onClick={() => changeSlide(idx)}
						className={`h-12 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-100 focus:ring-2 focus:ring-[#396131]/40 focus:outline-none sm:h-16 sm:w-20 md:h-20 md:w-24 ${
							idx === current
								? 'scale-105 border-[#396131] opacity-100 shadow-lg'
								: 'border-transparent opacity-60 hover:opacity-90'
						}`}
						tabIndex={0}
						aria-label={`Go to slide ${idx + 1}`}
					>
						<img
							src={img}
							alt={`Thumbnail ${idx + 1}`}
							className="h-full w-full object-cover object-center"
							loading="lazy"
							draggable={false}
							style={{
								userSelect: 'none',
								imageOrientation: 'from-image'
							}}
						/>
					</button>
				))}
			</div>
		</div>
	);
};

export default Carousel;
