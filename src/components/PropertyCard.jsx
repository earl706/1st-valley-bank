import React, { useState } from 'react';
import { MapPin, Hash, Eye, Ruler } from 'lucide-react';
import Modal from './Modal';
import { LightCard } from './Card';
import { LightPrimaryButton } from './Buttons';

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

	const formatPrice = (price) => {
		let num = Number(price);
		if (isNaN(num)) return 'N/A';
		return num.toLocaleString();
	};

	const formatArea = (area) => {
		if (!area || isNaN(Number(area))) return 'N/A';
		return `${Number(area).toLocaleString()} sqm`;
	};

	const displayTitle = () =>
		property.title ||
		(property.property_type_display ? property.property_type_display : property.property_type) ||
		'Property';

	// Real Estate only: prepare additional details for the Modal
	const additionalDetails = [
		{
			label: 'Property Type',
			value: property.property_type_display || property.property_type || 'N/A'
		},
		{ label: 'Property Code', value: property.property_code || 'N/A' },
		{ label: 'Area', value: formatArea(property.area) }
	];

	return (
		<>
			<LightCard
				useNativeSpacing={true}
				className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md"
			>
				{/* Image Container */}
				<div className="relative h-56 overflow-hidden bg-gray-100">
					{!imageLoaded && (
						<div className="absolute inset-0 flex items-center justify-center bg-gray-50">
							<div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-600"></div>
						</div>
					)}
					<img
						src={property.main_image}
						alt={`Property ${property.property_code || property.title || ''}`}
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
								₱{formatPrice(property.price)}
							</span>
						</div>
					</div>
				</div>

				{/* Card Content */}
				<div className="p-5">
					{/* Property Title */}
					<div className="mb-2">
						<span className="block truncate text-lg font-semibold text-gray-900">
							{displayTitle()}
						</span>
					</div>

					{/* Real Estate Property Details */}
					<div className="mb-5 space-y-2">
						{property.location && (
							<div className="flex items-center gap-2 text-gray-500">
								<MapPin size={16} className="text-gray-400" />
								<span className="text-base leading-relaxed font-normal">{property.location}</span>
							</div>
						)}
						{property.property_code && (
							<div className="flex items-center gap-2 text-gray-500">
								<Hash size={16} className="text-gray-400" />
								<span className="text-base leading-relaxed font-normal">
									{property.property_code}
								</span>
							</div>
						)}
						{!!property.area && (
							<div className="flex items-center gap-2 text-gray-500">
								<Ruler size={16} className="text-gray-400" />
								<span className="text-base leading-relaxed font-normal">
									{formatArea(property.area)}
								</span>
							</div>
						)}
					</div>

					{/* Action Button */}
					<LightPrimaryButton onClick={handleView} className="w-full">
						<span className="flex w-full items-center justify-center gap-2">
							<Eye size={18} className="transition-transform duration-300 group-hover:scale-110" />
							<span className="text-center">View Details</span>
						</span>
					</LightPrimaryButton>
				</div>
			</LightCard>

			{/* Modal */}
			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				title={`${displayTitle()}${property.property_code ? ` - ${property.property_code}` : ''}`}
				content={
					property.description ||
					'This property is in excellent condition and ready for immediate occupancy. Contact us for more information and to schedule a viewing.'
				}
				image={property.main_image}
				additionalImages={property.additional_images || []}
				details={additionalDetails}
				price={formatPrice(property.price)}
				location={property.location}
				brandColor="#396131"
				showInquireButton={true}
				inquireButtonText="Inquire Now"
				inquireButtonLink="/contact-us"
			/>
		</>
	);
}
