import React, { useState } from 'react';
import { MapPin, Calendar, Hash, Eye } from 'lucide-react';
import Modal from './Modal';
import { LightCard } from './Card';

// Utility: safely parse numbers for price formatting
function displayPrice(priceString) {
	let num = Number(priceString);
	if (isNaN(num)) return 'N/A';
	return num.toLocaleString();
}

export default function VehicleCard({ vehicle }) {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleView = (e) => {
		e.preventDefault();
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	// Prepare additional details for the modal, using new data format
	const additionalDetails = [
		{ label: 'Make', value: vehicle.make || 'N/A' },
		{ label: 'Model', value: vehicle.model || 'N/A' }
	];

	return (
		<>
			<LightCard
				useNativeSpacing={true}
				className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md"
			>
				{/* Image Container */}
				<div className="relative h-56 overflow-hidden rounded-t-2xl bg-gray-100">
					{!imageLoaded && (
						<div className="absolute inset-0 flex items-center justify-center rounded-t-2xl bg-gray-50">
							<div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-gray-400"></div>
						</div>
					)}
					{vehicle.main_image && vehicle.main_image.trim() ? (
						<img
							src={vehicle.main_image}
							alt={vehicle.title || `${vehicle.year || ''} ${vehicle.make || 'Vehicle'}`}
							className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${
								imageLoaded ? 'opacity-100' : 'opacity-0'
							}`}
							style={{
								imageOrientation: 'from-image'
							}}
							onLoad={() => setImageLoaded(true)}
						/>
					) : (
						<div
							className={`absolute inset-0 flex h-full w-full items-center justify-center bg-gray-200 text-gray-600 transition-all duration-300 group-hover:scale-105 ${
								imageLoaded ? 'opacity-100' : 'opacity-0'
							}`}
							style={{
								imageOrientation: 'from-image'
							}}
							onLoad={() => setImageLoaded(true)}
						>
							<span className="text-lg font-semibold opacity-80">No Image</span>
						</div>
					)}

					{/* Price Badge */}
					<div className="absolute bottom-3 left-3">
						<div className="rounded-lg bg-white/90 px-3 py-1.5 text-gray-900 shadow backdrop-blur-sm">
							<span className="text-base font-bold tracking-tight">
								₱{displayPrice(vehicle.price)}
							</span>
						</div>
					</div>
				</div>

				{/* Card Content */}
				<div className="p-5">
					{/* Vehicle Details */}
					<div className="mb-5 space-y-2">
						<div className="flex items-center gap-2 text-gray-500">
							<MapPin size={16} className="text-gray-400" />
							<span className="text-base leading-relaxed font-normal">
								{vehicle.location || 'N/A'}
							</span>
						</div>
						<div className="flex items-center gap-2 text-gray-500">
							<Calendar size={16} className="text-gray-400" />
							<span className="text-base leading-relaxed font-normal">{vehicle.year || 'N/A'}</span>
						</div>
						<div className="flex items-center gap-2 text-gray-500">
							<Hash size={16} className="text-gray-400" />
							<span className="font-mono text-base leading-relaxed font-normal">
								{vehicle.plate_number ? vehicle.plate_number : 'N/A'}
							</span>
						</div>
					</div>

					{/* Action Button */}
					<button
						onClick={handleView}
						className="group inline-flex w-full transform cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#396131] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
					>
						<span className="flex w-full items-center justify-center gap-2">
							<Eye size={18} className="transition-transform duration-300 group-hover:scale-110" />
							<span className="text-center">View Details</span>
						</span>
					</button>
				</div>
			</LightCard>

			{/* Modal */}
			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				title={
					vehicle.title || `${vehicle.year || ''} ${vehicle.make || ''} ${vehicle.model || ''}`
				}
				content={
					vehicle.description ||
					`This vehicle is in excellent condition and ready for immediate use. Contact us for more information and to schedule a viewing.`
				}
				image={vehicle.main_image}
				additionalImages={vehicle.additional_images || []}
				details={additionalDetails}
				price={vehicle.price}
				location={vehicle.location}
				year={vehicle.year}
				plateNumber={vehicle.property_code || ''}
				brandColor="#396131"
				showInquireButton={true}
				inquireButtonText="Inquire Now"
				inquireButtonLink="/contact-us"
			/>
		</>
	);
}
