import React, { useState, useRef, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import carouselImg1 from '/src/assets/carousel/1.png';
import advisoryService from '../services/advisoryService';
import { X } from 'lucide-react';

const OptimizedImageGallery = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [images, setImages] = useState([]);

	const getGallery = async () => {
		try {
			const res = await advisoryService.getGallery();
			// We expect res.data.results as [{id, title, image, thumbnail, alt_text, ...}, ...]
			setImages(res.data.results);
		} catch (error) {
			console.error('Failed to fetch gallery:', error);
		}
	};
	useEffect(() => {
		getGallery();
	}, []);

	const ImageCard = ({ img }) => {
		const [isLoaded, setIsLoaded] = useState(false);
		const imgRef = useRef(null);

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
				{/* Render the thumbnail image */}
				<img
					src={img.thumbnail}
					alt={img.alt_text || ''}
					className={`h-full w-full object-cover transition-opacity duration-300 ${
						isLoaded ? 'opacity-100' : 'opacity-0'
					}`}
					onLoad={() => setIsLoaded(true)}
					loading="lazy"
				/>
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
					{/* Render the full size image if selected */}
					<img
						src={selectedImage.image}
						alt={selectedImage.alt_text || ''}
						className="max-h-[90vh] max-w-full object-contain"
						onClick={(e) => e.stopPropagation()}
					/>
				</div>
			)}
		</div>
	);
};

export default function OneVBAdvisory() {
	return (
		<>
			<main className="flex flex-col">
				<HeroSection
					title="1VB Advisory"
					subtitle=""
					description="Get expert, personalized guidance for every financial decision with 1VB Advisory."
					features={[]}
					image={carouselImg1}
					imageAlt="1VB Advisory"
				/>
				<section
					id="advisory-gallery"
					className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] px-4 py-8"
				>
					{/* Section Header */}
					<div className="mb-16 text-center">
						<h2 className="mb-4 pt-16 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
							1VB Advisory Gallery
						</h2>
						<div className="mx-auto h-1 w-24 rounded-full bg-white/80"></div>
						<p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
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
