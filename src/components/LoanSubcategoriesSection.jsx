import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductModal from './ProductModal';
import { DarkPrimaryButton, DarkSecondaryButton, LightPrimaryButton, LightSecondaryButton } from './Buttons';
import { DarkCard } from './Card';
import { DarkHeader } from './Header';
export default function LoanSubcategoriesSection({
	id = 'loan-subcategories',
	sectionTitle = 'Loan Types',
	sectionSubtitle = 'Choose the loan that best fits your needs',
	tagText = 'Loan Categories',
	loanTypes = [],
	showCallToAction = true,
	ctaOnly = false,
	ctaTitle = 'Need help choosing the right loan for you?',
	ctaPrimaryText = 'Get Expert Consultation',
	ctaPrimaryLink = '/contact-us',
	ctaSecondaryText = 'View All Loans',
	ctaSecondaryLink = '/loans',
	backgroundColor = 'from-slate-50 to-white',
	brandColor = '#396131',
	className = '',
	showModal = true // New prop to enable/disable modal functionality
}) {
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

	const handleViewDetails = (e, product) => {
		e.preventDefault();
		setSelectedProduct(product);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedProduct(null);
	};

	const handleApplyNow = (loanType) => {
		// Navigate to qualification page with loan type
		navigate(`/loan-qualification/${loanType.title.toLowerCase().replace(/\s+/g, '-')}`);
	};

	// If ctaOnly is true, render only the CTA section
	if (ctaOnly && showCallToAction) {
		return (
			<section
				id={id}
				className={`relative overflow-hidden bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-20 ${className}`}
			>
				<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					{/* Call to Action Only */}
					<div className="text-center">
						<h2 className="mb-6 text-3xl leading-tight font-bold text-white md:text-5xl">
							{ctaTitle}
						</h2>
						<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
							<DarkPrimaryButton
								to={ctaPrimaryLink}
								secondaryIcon={
									<ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
								}
							>
								<span className="text-center">{ctaPrimaryText}</span>
							</DarkPrimaryButton>
							<DarkSecondaryButton
								to={ctaSecondaryLink}
								secondaryIcon={
									<ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
								}
							>
								<span className="text-center">{ctaSecondaryText}</span>
							</DarkSecondaryButton>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<>
			<section
				id={id}
				className={`relative overflow-hidden bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-20 ${className}`}
			>
				<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					{/* Section Header */}
					<DarkHeader
						badgeText="Categories"
						title={sectionTitle}
						subtitle={sectionSubtitle}
						alignment="center"
						level={2}
						className="mb-16"
					/>

					{/* Loan Types Grid */}
					<div className="grid grid-cols-1 items-stretch gap-2 lg:grid-cols-2 lg:gap-4">
						{loanTypes.map((type, index) => (
							<DarkCard
								key={index}
								useNativeSpacing={true}
								className="group flex h-full flex-col overflow-hidden p-0 bg-white"
							>
								<div className="flex flex-1 flex-col items-center gap-6 p-8 sm:flex-row sm:items-start lg:gap-8 lg:p-10">
									{/* Image Container */}
									<div className="relative mb-8">
										<div className="relative mx-auto h-40 w-40 overflow-hidden transition-all duration-300 group-hover:scale-105">
											<img
												src={type.image}
												alt={type.title}
												className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
											/>
										</div>
									</div>

									{/* Content */}
									<div className="flex h-full flex-1 flex-col text-center sm:text-left">
										<h3
											className="mb-3 text-2xl leading-tight font-bold transition-colors duration-300"
											style={{
												color: brandColor
											}}
										>
											{type.title}
										</h3>
										<p className="mb-6 flex-1 text-base leading-relaxed font-normal text-[#396131]/80">
											{type.description}
										</p>

										{/* Features List (if provided) */}
										{type.features && type.features.length > 0 && (
											<div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-1">
												{type.features.map((feature, featureIndex) => (
													<div key={featureIndex} className="flex items-center gap-2">
														<div
															className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
															style={{ backgroundColor: brandColor }}
														></div>
														<span className="text-xs font-normal text-[#396131]/60">{feature}</span>
													</div>
												))}
											</div>
										)}

										{/* CTA Buttons */}
										<div className="mt-auto flex gap-3 sm:flex-row lg:flex-col">
											{showModal ? (
												<LightPrimaryButton
													type="button"
													onClick={(e) => handleViewDetails(e, type)}
													className="w-full justify-center"
													secondaryIcon={
														<ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
													}
												>
													<span className="mx-auto text-center">View Details</span>
												</LightPrimaryButton>
											) : (
												<LightSecondaryButton
													to={type.route}
													className="w-full justify-center"
													secondaryIcon={
														<ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
													}
												>
													<span className="mx-auto text-center">Learn More</span>
												</LightSecondaryButton>
											)}

											{showModal && (
												<LightSecondaryButton
													type="button"
													onClick={() => handleApplyNow(type)}
													className="w-full justify-center"
													secondaryIcon={
														<ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
													}
												>
													<span className="mx-auto text-center">Apply Now</span>
												</LightSecondaryButton>
											)}
										</div>
									</div>
								</div>
							</DarkCard>
						))}
					</div>

					{/* Call to Action */}
					{showCallToAction && (
						<div className="mt-16 text-center">
							<div className="mx-auto max-w-2xl">
								<h3 className="mb-4 text-2xl leading-tight font-bold text-[#185027] dark:text-white">
									{ctaTitle}
								</h3>
								<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
									<DarkPrimaryButton
										to={ctaPrimaryLink}
										className="justify-center"
										secondaryIcon={
											<ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
										}
									>
										{ctaPrimaryText}
									</DarkPrimaryButton>
									<DarkSecondaryButton
										to={ctaSecondaryLink}
										className="cursor-pointer"
										secondaryIcon={
											<ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
										}
									>
										{ctaSecondaryText}
									</DarkSecondaryButton>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>

			{/* Product Modal */}
			{showModal && selectedProduct && (
				<ProductModal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					loan={selectedProduct}
					brandColor={brandColor}
					showInquireButton={true}
					inquireButtonText="Inquire Now"
					inquireButtonLink="/contact-us"
					productType="loan"
				/>
			)}
		</>
	);
}
