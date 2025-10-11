import React, { useState } from 'react';
import { MapPin, Calendar, Hash, Eye } from 'lucide-react';
import Modal from './Modal';

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

	// Prepare additional details for the modal
	const additionalDetails = [
		{ label: 'Make', value: vehicle.make || 'N/A' },
		{ label: 'Model', value: vehicle.model || 'N/A' },
		{ label: 'Mileage', value: vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : 'N/A' },
		{ label: 'Fuel Type', value: vehicle.fuelType || 'N/A' },
		{ label: 'Transmission', value: vehicle.transmission || 'N/A' },
		{ label: 'Condition', value: vehicle.condition || 'Good' }
	];

	return (
		<>
			<div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md">
				{/* Image Container */}
				<div className="relative h-56 overflow-hidden bg-gray-100">
					{!imageLoaded && (
						<div className="absolute inset-0 flex items-center justify-center bg-gray-50">
							<div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-gray-400"></div>
						</div>
					)}
					<img
						src={vehicle.image}
						alt={`${vehicle.year} Vehicle`}
						className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
							imageLoaded ? 'opacity-100' : 'opacity-0'
						}`}
						style={{
							imageOrientation: 'from-image'
						}}
						onLoad={() => setImageLoaded(true)}
					/>

					{/* Price Badge */}
					<div className="absolute bottom-3 left-3">
						<div className="rounded-lg bg-white/90 px-3 py-1.5 text-gray-900 shadow backdrop-blur-sm">
							<span className="text-base font-bold tracking-tight">
								₱{vehicle.price.toLocaleString()}
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
							<span className="text-base leading-relaxed font-normal">{vehicle.location}</span>
						</div>
						<div className="flex items-center gap-2 text-gray-500">
							<Calendar size={16} className="text-gray-400" />
							<span className="text-base leading-relaxed font-normal">{vehicle.year}</span>
						</div>
						<div className="flex items-center gap-2 text-gray-500">
							<Hash size={16} className="text-gray-400" />
							<span className="font-mono text-base leading-relaxed font-normal">
								{vehicle.plateNumber}
							</span>
						</div>
					</div>

					{/* Action Button */}
					<button
						onClick={handleView}
						className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-[#396131] px-4 py-2 text-base leading-relaxed font-bold text-white transition-all duration-150 hover:scale-105 hover:bg-[#4a7a3f] focus:outline-none"
					>
						<Eye size={18} className="transition-transform duration-150 group-hover:scale-110" />
						View Details
					</button>
				</div>
			</div>

			{/* Modal */}
			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				title={`${vehicle.year} ${vehicle.make || 'Vehicle'} ${vehicle.model || ''}`}
				content={
					vehicle.description ||
					'This vehicle is in excellent condition and ready for immediate use. Contact us for more information and to schedule a viewing.'
				}
				image={vehicle.image}
				additionalImages={vehicle.additionalImages || []} // Pass additional images
				details={additionalDetails}
				price={vehicle.price}
				location={vehicle.location}
				year={vehicle.year}
				plateNumber={vehicle.plateNumber}
				brandColor="#396131"
				showInquireButton={true}
				inquireButtonText="Inquire Now"
				inquireButtonLink="/contact-us"
			/>
		</>
	);
}
