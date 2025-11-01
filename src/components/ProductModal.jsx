import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Phone, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Props shape:
 * {
 *   isOpen,
 *   onClose,
 *   loan (object, see below),
 *   brandColor = '#396131',
 *   showInquireButton = true,
 *   inquireButtonText = 'Inquire Now',
 *   inquireButtonLink = '/contact-us',
 * }
 *
 * loan: {
 *   id, loan_type, loan_type_display, title, subtitle, description, full_description,
 *   image, min_amount, max_amount, interest_rate, term_options, requirements, features, is_active, ...
 * }
 */
export default function ProductModal({
	isOpen,
	onClose,
	loan = {},
	brandColor = '#396131',
	showInquireButton = true,
	inquireButtonText = 'Inquire Now',
	inquireButtonLink = '/contact-us'
}) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Support for future use: if loan.additionalImages present
	const allImages = [loan.image, ...(loan.additionalImages || [])].filter(Boolean);

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

	useEffect(() => {
		if (isOpen) setCurrentImageIndex(0);
	}, [isOpen]);

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
	};
	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
	};

	if (!isOpen) return null;

	const renderAmountRange = () => {
		if (!loan.min_amount && !loan.max_amount) return null;
		if (loan.min_amount && loan.max_amount) {
			return (
				<>
					₱{Number(loan.min_amount).toLocaleString()} - ₱{Number(loan.max_amount).toLocaleString()}
				</>
			);
		}
		if (loan.min_amount) {
			return <>₱{Number(loan.min_amount).toLocaleString()}</>;
		}
		return <>₱{Number(loan.max_amount).toLocaleString()}</>;
	};

	const renderInterestRate = () => {
		if (
			loan.interest_rate &&
			loan.interest_rate !== 'NaN' &&
			loan.interest_rate !== null &&
			loan.interest_rate !== ''
		) {
			return (
				<div>
					<b>Interest Rate:</b> {loan.interest_rate}% p.a.
				</div>
			);
		}
		return null;
	};

	const renderTerms = () => {
		if (Array.isArray(loan.term_options) && loan.term_options.length > 0) {
			return (
				<div>
					<b>Terms:</b> {loan.term_options.filter(Boolean).join(', ')}
				</div>
			);
		}
		return null;
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

			{/* Modal Content */}
			<div className="relative mx-4 max-h-[90vh] w-full max-w-7xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
				{/* Header */}
				<div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
					<h2 className="text-xl font-bold text-gray-900">
						{loan.title || 'Loan Product Details'}
					</h2>
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
							<div className="relative overflow-hidden">
								{allImages.length > 0 ? (
									<img
										src={allImages[currentImageIndex]}
										alt={`${loan.title || 'Loan Image'} - Image ${currentImageIndex + 1}`}
										className="w-full object-cover"
									/>
								) : (
									<div className="flex w-full items-center justify-center bg-gray-100 text-gray-300">
										<span>No Image</span>
									</div>
								)}

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

								{allImages.length > 1 && (
									<div className="absolute top-2 right-2">
										<div className="rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
											{currentImageIndex + 1} / {allImages.length}
										</div>
									</div>
								)}
							</div>

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
							{/* Subtitle */}
							{loan.subtitle && (
								<div>
									<p className="text-gray-500">{loan.subtitle}</p>
								</div>
							)}
							{/* Loan Type Display */}
							{loan.loan_type_display && (
								<div>
									<span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
										{loan.loan_type_display}
									</span>
								</div>
							)}

							{/* Description */}
							{loan.description && (
								<div className="space-y-3">
									<h3 className="text-lg font-semibold text-gray-900">Description</h3>
									<p className="leading-relaxed text-gray-700">{loan.description}</p>
								</div>
							)}
							{/* Full Description */}
							{loan.full_description && (
								<div>
									<p className="leading-relaxed text-gray-700">{loan.full_description}</p>
								</div>
							)}

							{/* Feature List */}
							{Array.isArray(loan.features) && loan.features.length > 0 && (
								<div className="space-y-3">
									<h3 className="text-lg font-semibold text-gray-900">Features & Benefits</h3>
									<div className="space-y-2">
										{loan.features.map((feature, idx) => (
											<div key={idx} className="flex items-start gap-3">
												<CheckCircle size={18} className="mt-0.5 flex-shrink-0 text-green-500" />
												<span className="text-gray-700">{feature}</span>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Requirements */}
							{Array.isArray(loan.requirements) && loan.requirements.length > 0 && (
								<div className="space-y-3">
									<h3 className="text-lg font-semibold text-gray-900">Requirements</h3>
									<ul className="ml-6 list-disc space-y-1 text-gray-700">
										{loan.requirements.map((req, idx) => (
											<li key={idx}>{req}</li>
										))}
									</ul>
								</div>
							)}

							{/* Amount, Rates, Terms, Status */}
							<div className="space-y-1 text-[15px]">
								{renderAmountRange() && (
									<div>
										<b>Amount:</b> {renderAmountRange()}
									</div>
								)}
								{renderInterestRate()}
								{renderTerms()}
							</div>

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
