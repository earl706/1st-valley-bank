import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Hash, Eye, Heart, Share2, Home, Ruler } from 'lucide-react';
import Modal from './Modal';

export default function PropertyCard({ property }) {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleView = (e) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	};

	// Prepare additional details for the modal
	const additionalDetails = [
		{ label: 'Property Type', value: property.type || 'N/A' },
		{ label: 'Area', value: property.area ? `${property.area} sqm` : 'N/A' },
		{ label: 'Bedrooms', value: property.bedrooms || 'N/A' },
		{ label: 'Bathrooms', value: property.bathrooms || 'N/A' },
		{ label: 'Parking', value: property.parking || 'N/A' },
		{ label: 'Furnished', value: property.furnished || 'N/A' },
		{ label: 'Listed Date', value: formatDate(property.listedDate) }
	];

	return (
		<>
			<div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md">
				{/* Image Container */}
				<div className="relative h-56 overflow-hidden bg-gray-100">
					{!imageLoaded && (
						<div className="absolute inset-0 flex items-center justify-center bg-gray-50">
							<div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-600"></div>
						</div>
					)}
					<img
						src={property.image}
						alt={`Property ${property.propertyCode}`}
						className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
							imageLoaded ? 'opacity-100' : 'opacity-0'
						}`}
						onLoad={() => setImageLoaded(true)}
						style={{
							imageOrientation: 'from-image'
						}}
					/>

					{/* Price Badge */}
					<div className="absolute bottom-3 left-3">
						<div className="rounded-lg bg-white/90 px-3 py-1.5 text-gray-900 shadow backdrop-blur-sm">
							<span className="text-base font-semibold tracking-tight">
								₱{property.price.toLocaleString()}
							</span>
						</div>
					</div>
				</div>

				{/* Card Content */}
				<div className="p-5">
					{/* Property Details */}
					<div className="mb-5 space-y-2">
						<div className="flex items-center gap-2 text-gray-500">
							<MapPin size={16} className="text-gray-400" />
							<span className="text-base leading-relaxed font-normal">{property.location}</span>
						</div>
						<div className="flex items-center gap-2 text-gray-500">
							<Hash size={16} className="text-gray-400" />
							<span className="text-base leading-relaxed font-normal">{property.propertyCode}</span>
						</div>
						<div className="flex items-center gap-2 text-gray-500">
							<Home size={16} className="text-gray-400" />
							<span className="text-base leading-relaxed font-normal">{property.date}</span>
						</div>
						<div className="flex items-center gap-2 text-gray-500">
							<Ruler size={16} className="text-gray-400" />
							<span className="text-base leading-relaxed font-normal">{property.area} sqm</span>
						</div>
					</div>

					{/* Action Button */}
					<button
						onClick={handleView}
						className="group inline-flex w-full transform cursor-pointer items-center justify-center rounded-xl bg-[#396131] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
					>
						<span className="flex w-full items-center justify-center gap-2">
							<Eye size={18} className="transition-transform duration-300 group-hover:scale-110" />
							<span className="text-center">View Details</span>
						</span>
					</button>
				</div>
			</div>

			{/* Modal */}
			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				title={`${property.type} - ${property.propertyCode}`}
				content={
					property.description ||
					'This property is in excellent condition and ready for immediate occupancy. Contact us for more information and to schedule a viewing.'
				}
				image={property.image}
				additionalImages={property.additionalImages || []} // Pass additional images
				details={additionalDetails}
				price={property.price}
				location={property.location}
				year={formatDate(property.listedDate)}
				plateNumber={property.propertyCode}
				brandColor="#396131"
				showInquireButton={true}
				inquireButtonText="Inquire Now"
				inquireButtonLink="/contact-us"
			/>
		</>
	);
}
