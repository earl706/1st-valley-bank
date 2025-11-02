import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { X, MapPin, Calendar, Hash, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Modal({
	isOpen,
	onClose,
	title = 'Vehicle Details',
	content,
	image,
	additionalImages = [], // New parameter for additional images
	details = [],
	price,
	location,
	year,
	plateNumber,
	brandColor = '#396131',
	showInquireButton = true,
	inquireButtonText = 'Inquire Now',
	inquireButtonLink = '/contact-us'
}) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Combine main image with additional images
	const allImages = [image, ...additionalImages].filter(Boolean);

	// Handle escape key press
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	// Reset image index when modal opens
	useEffect(() => {
		if (isOpen) {
			setCurrentImageIndex(0);
		}
	}, [isOpen]);

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
	};

	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<div
				className="absolute inset-0 cursor-pointer bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal Content */}
			<div className="relative mx-4 max-h-[90vh] w-full max-w-7xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
				{/* Header */}
				<div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
					<h2 className="text-xl font-bold text-gray-900">{title}</h2>
					<button
						onClick={onClose}
						className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
					>
						<X size={24} />
					</button>
				</div>

				{/* Content */}
				<div className="p-6">
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{/* Image Section */}
						<div className="space-y-4">
							{/* Main Image Display */}
							<div className="relative overflow-hidden rounded-xl bg-gray-100">
								<img
									src={allImages[currentImageIndex]}
									alt={`${title} - Image ${currentImageIndex + 1}`}
									className="h-64 w-full object-cover lg:h-80"
								/>

								{/* Navigation Arrows (only show if more than 1 image) */}
								{allImages.length > 1 && (
									<>
										<button
											onClick={prevImage}
											className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70 focus:ring-2 focus:ring-white/50 focus:outline-none"
										>
											<ChevronLeft size={20} />
										</button>
										<button
											onClick={nextImage}
											className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70 focus:ring-2 focus:ring-white/50 focus:outline-none"
										>
											<ChevronRight size={20} />
										</button>
									</>
								)}

								{/* Image Counter */}
								{allImages.length > 1 && (
									<div className="absolute top-2 right-2">
										<div className="rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
											{currentImageIndex + 1} / {allImages.length}
										</div>
									</div>
								)}

								{/* Price Badge */}
								{price && (
									<div className="absolute bottom-4 left-4">
										<div className="rounded-lg bg-white/90 px-4 py-2 shadow backdrop-blur-sm">
											<span className="text-lg font-bold text-gray-900">
												₱{price.toLocaleString()}
											</span>
										</div>
									</div>
								)}
							</div>

							{/* Thumbnail Gallery */}
							{allImages.length > 1 && (
								<div className="flex gap-2 overflow-x-auto pb-2">
									{allImages.map((img, index) => (
										<button
											key={index}
											onClick={() => setCurrentImageIndex(index)}
											className={`relative flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
												index === currentImageIndex
													? 'border-blue-500 ring-2 ring-blue-200'
													: 'border-gray-200 hover:border-gray-300'
											}`}
										>
											<img
												src={img}
												alt={`Thumbnail ${index + 1}`}
												className="h-16 w-16 object-cover"
											/>
										</button>
									))}
								</div>
							)}
						</div>

						{/* Details Section */}
						<div className="space-y-6">
							{/* Basic Info */}
							<div className="space-y-3">
								{location && (
									<div className="flex items-center gap-3">
										<MapPin size={20} className="text-gray-400" />
										<span className="text-gray-700">{location}</span>
									</div>
								)}
								{year && (
									<div className="flex items-center gap-3">
										<Calendar size={20} className="text-gray-400" />
										<span className="text-gray-700">{year}</span>
									</div>
								)}
								{plateNumber && (
									<div className="flex items-center gap-3">
										<Hash size={20} className="text-gray-400" />
										<span className="font-mono text-gray-700">{plateNumber}</span>
									</div>
								)}
							</div>

							{/* Additional Details */}
							{details.length > 0 && (
								<div className="space-y-3">
									<h3 className="text-lg font-semibold text-gray-900">Details</h3>
									<div className="space-y-2">
										{details.map((detail, index) => (
											<div key={index} className="flex justify-between">
												<span className="text-gray-600">{detail.label}:</span>
												<span className="font-medium text-gray-900">{detail.value}</span>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Content */}
							{content && (
								<div className="space-y-3">
									<h3 className="text-lg font-semibold text-gray-900">Description</h3>
									<p className="leading-relaxed text-gray-700">{content}</p>
								</div>
							)}

							{/* Action Buttons */}
							<div className="flex flex-col gap-3 pt-4">
								{showInquireButton && (
									<NavLink
										to={inquireButtonLink}
										className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-all duration-200 hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:outline-none"
										style={{
											backgroundColor: brandColor,
											focusRingColor: `${brandColor}30`
										}}
									>
										<Phone size={18} />
										{inquireButtonText}
									</NavLink>
								)}

								<button
									onClick={onClose}
									className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
