import React, { useState, useRef, useEffect } from 'react';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Carousel from '../components/Carousel';
import HeroSection from '../components/HeroSection';
import carouselImg1 from '/src/assets/carousel/1.png';
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
// const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
import { Image, Loader2, ZoomIn, X } from 'lucide-react';

const OptimizedImageGallery = () => {
	const [selectedImage, setSelectedImage] = useState(null);

	const images = [
		{
			id: 1,
			src: img1,
			alt: 'Advisory event 1'
		},
		{
			id: 2,
			src: img2,
			alt: 'Advisory event 2'
		},
		{
			id: 3,
			src: img3,
			alt: 'Advisory event 3'
		},
		{
			id: 4,
			src: img4,
			alt: 'Advisory event 4'
		},
		{
			id: 5,
			src: img5,
			alt: 'Advisory event 5'
		},
		{
			id: 6,
			src: img6,
			alt: 'Advisory event 6'
		},
		{
			id: 7,
			src: img7,
			alt: 'Advisory event 7'
		},
		{
			id: 8,
			src: img8,
			alt: 'Advisory event 8'
		},
		{
			id: 9,
			src: img9,
			alt: 'Advisory event 9'
		},
		{
			id: 10,
			src: img10,
			alt: 'Advisory event 10'
		}
	];

	const ImageCard = ({ img }) => {
		const [isLoaded, setIsLoaded] = useState(false);
		const [isVisible, setIsVisible] = useState(false);
		const imgRef = useRef(null);

		useEffect(() => {
			const observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						setIsVisible(true);
					}
				},
				{ rootMargin: '100px' }
			);

			const currentRef = imgRef.current;
			if (currentRef) {
				observer.observe(currentRef);
			}

			return () => {
				if (currentRef) {
					observer.unobserve(currentRef);
				}
			};
		}, []);

		return (
			<div
				ref={imgRef}
				className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg bg-gray-200 transition-opacity hover:opacity-90"
				onClick={() => setSelectedImage(img)}
			>
				{!isLoaded && (
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="h-8 w-8 animate-spin rounded-full border-4 border-[#396131] border-t-transparent"></div>
					</div>
				)}

				{isVisible && (
					<img
						src={img.src}
						alt={img.alt}
						className={`h-full w-full object-cover transition-opacity duration-300 ${
							isLoaded ? 'opacity-100' : 'opacity-0'
						}`}
						onLoad={() => setIsLoaded(true)}
						loading="lazy"
					/>
				)}
			</div>
		);
	};

	return (
		<div className="min-h-screen">
			<div className="mx-auto max-w-7xl px-6 py-12">
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{images.map((img) => (
						<ImageCard key={img.id} img={img} />
					))}
				</div>
			</div>

			{selectedImage && (
				<div
					className="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
					onClick={() => setSelectedImage(null)}
				>
					<button
						className="absolute top-4 right-4 rounded-full bg-[#396131] p-2 text-white transition-colors hover:bg-[#2d4d27]"
						onClick={() => setSelectedImage(null)}
					>
						<X className="h-6 w-6" />
					</button>
					<img
						src={selectedImage.src}
						alt={selectedImage.alt}
						className="max-h-[90vh] max-w-full object-contain"
						onClick={(e) => e.stopPropagation()}
					/>
				</div>
			)}
		</div>
	);
};

// function GalleryImage({ img, idx }) {
// 	const [loaded, setLoaded] = React.useState(false);

// 	return (
// 		<div className="group relative overflow-hidden rounded-xl shadow-md">
// 			{/* Skeleton Loader */}
// 			{!loaded && (
// 				<div className="absolute inset-0 z-10 flex animate-pulse items-center justify-center bg-gray-200">
// 					<div className="h-32 w-full bg-gray-200 sm:h-40 md:h-48" />
// 					<svg
// 						className="absolute h-8 w-8 animate-spin text-gray-400"
// 						fill="none"
// 						viewBox="0 0 24 24"
// 					>
// 						<circle
// 							className="opacity-25"
// 							cx="12"
// 							cy="12"
// 							r="10"
// 							stroke="currentColor"
// 							strokeWidth="4"
// 						></circle>
// 						<path
// 							className="opacity-75"
// 							fill="currentColor"
// 							d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
// 						></path>
// 					</svg>
// 				</div>
// 			)}
// 			<img
// 				src={img}
// 				alt={`Advisory ${idx + 1}`}
// 				className={`h-32 w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 sm:h-40 md:h-48 ${loaded ? 'opacity-100' : 'opacity-0'}`}
// 				loading="lazy"
// 				onLoad={() => setLoaded(true)}
// 				// style={{ transition: 'opacity 0.3s' }}
// 			/>
// 			<div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
// 				<span className="text-sm font-semibold text-white">Image {idx + 1}</span>
// 			</div>
// 		</div>
// 	);
// }

export default function OneVBAdvisory() {
	return (
		<>
			<main className="flex flex-col gap-[40px] pb-[50px] lg:gap-[80px]">
				<HeroSection
					title="1VB Advisory"
					subtitle=""
					description="Get expert, personalized guidance for every financial decision with 1VB Advisory."
					features={[]}
					image={carouselImg1}
					imageAlt="1VB Advisory"
				/>

				{/* <section id="advisory-gallery" className="mx-auto max-w-6xl px-4 py-8">
					<h2 className="mb-6 text-center text-2xl font-bold text-[#396131]">Advisory Gallery</h2>
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
						{images.map((img, idx) => (
							<GalleryImage key={idx} img={img} idx={idx} />
						))}
					</div>
				</section> */}
				<section id="advisory-gallery" className="mx-auto">
					{/* Section Header */}
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-4xl font-bold text-[#396131] md:text-5xl lg:text-6xl">
							1VB Advisory Gallery
						</h2>
						<div className="mx-auto h-1 w-24 rounded-full bg-[#396131]/90"></div>
						<p className="mx-auto mt-6 max-w-2xl text-lg text-[#396131]/90">
							Explore moments from our advisory engagements, where expertise meets personalized
							service to empower your financial future.
						</p>
					</div>
					<OptimizedImageGallery />
				</section>
			</main>
		</>
	);
}
