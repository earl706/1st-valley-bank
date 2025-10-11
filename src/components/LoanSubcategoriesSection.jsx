import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductModal from './ProductModal';

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
							<NavLink
								to={ctaPrimaryLink}
								className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base leading-relaxed font-semibold text-[#396131] transition-all duration-300 hover:bg-[#edf8ee] focus:ring-4 focus:ring-blue-300 focus:outline-none"
							>
								{ctaPrimaryText}
							</NavLink>
							<NavLink
								to={ctaSecondaryLink}
								className="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-base leading-relaxed font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#396131] focus:ring-4 focus:ring-blue-300 focus:outline-none"
							>
								{ctaSecondaryText}
							</NavLink>
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
					<div className="mb-16 text-center">
						<div className="mb-4">
							<span className="inline-block rounded-full bg-white/20 px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase">
								{tagText}
							</span>
						</div>

						<h2
							className="mb-6 text-3xl leading-tight font-bold md:text-5xl"
							style={{ color: '#fff' }}
						>
							{sectionTitle}
						</h2>

						<p className="mx-auto max-w-3xl text-base leading-relaxed font-normal text-white/90">
							{sectionSubtitle}
						</p>
					</div>

					{/* Loan Types Grid */}
					<div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
						{loanTypes.map((type, index) => (
							<div
								key={index}
								className="group relative flex h-full transform flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/90 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
							>
								{/* Card gradient overlay */}
								<div
									className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
									style={{
										background: `linear-gradient(to bottom right, transparent, transparent, ${brandColor}0d)`
									}}
								></div>

								<div className="relative flex flex-1 flex-col p-8 lg:p-10">
									<div className="flex flex-1 flex-col items-center gap-6 sm:flex-row sm:items-start lg:gap-8">
										{/* Image Container */}
										<div className="relative mb-8">
											{/* Main image container */}
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
												style={{ color: brandColor }}
											>
												{type.title}
											</h3>
											<p className="mb-6 flex-1 text-base leading-relaxed font-normal text-[#185027]">
												{type.description}
											</p>

											{/* Features List (if provided) */}
											{type.features && type.features.length > 0 && (
												<div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
													{type.features.map((feature, featureIndex) => (
														<div key={featureIndex} className="flex items-center gap-2">
															<div
																className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
																style={{ backgroundColor: brandColor }}
															></div>
															<span className="text-xs font-normal text-[#185027]">{feature}</span>
														</div>
													))}
												</div>
											)}

											{/* CTA Buttons */}
											<div className="mt-auto flex gap-3 sm:flex-row lg:flex-col">
												{showModal ? (
													<button
														onClick={(e) => handleViewDetails(e, type)}
														className="group/btn inline-flex transform cursor-pointer items-center justify-center rounded-xl px-6 py-3 text-base leading-relaxed font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:ring-4 focus:outline-none"
														style={{
															backgroundColor: brandColor,
															'--tw-ring-color': `${brandColor}40`
														}}
														onMouseEnter={(e) => {
															const shade = brandColor === '#396131' ? '#4a7a3f' : brandColor;
															e.target.style.backgroundColor = shade;
														}}
														onMouseLeave={(e) => {
															e.target.style.backgroundColor = brandColor;
														}}
													>
														<span className="mr-2">View Details</span>
														<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
													</button>
												) : (
													<NavLink
														to={type.route}
														className="group/btn inline-flex transform cursor-pointer items-center justify-center rounded-xl px-6 py-3 text-base leading-relaxed font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:ring-4 focus:outline-none"
														style={{
															backgroundColor: brandColor,
															'--tw-ring-color': `${brandColor}40`
														}}
														onMouseEnter={(e) => {
															const shade = brandColor === '#396131' ? '#4a7a3f' : brandColor;
															e.target.style.backgroundColor = shade;
														}}
														onMouseLeave={(e) => {
															e.target.style.backgroundColor = brandColor;
														}}
													>
														<span className="mr-2">Learn More</span>
														<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
													</NavLink>
												)}

												{showModal && (
													<button
														onClick={() => handleApplyNow(type)}
														className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 px-6 py-3 text-base leading-relaxed font-semibold transition-all duration-300 hover:scale-105 focus:ring-4 focus:outline-none"
														style={{
															borderColor: brandColor,
															color: brandColor,
															'--tw-ring-color': `${brandColor}40`
														}}
														onMouseEnter={(e) => {
															e.target.style.backgroundColor = brandColor;
															e.target.style.color = 'white';
														}}
														onMouseLeave={(e) => {
															e.target.style.backgroundColor = 'transparent';
															e.target.style.color = brandColor;
														}}
													>
														Apply Now
													</button>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
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
									<NavLink
										to={ctaPrimaryLink}
										className="inline-flex items-center justify-center rounded-xl bg-[#396131] px-8 py-4 text-base leading-relaxed font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#4a7a3f] focus:ring-4 focus:ring-[#39613140] focus:outline-none"
									>
										{ctaPrimaryText}
									</NavLink>
									<NavLink
										to={ctaSecondaryLink}
										className="inline-flex items-center justify-center rounded-xl border-2 border-[#396131] px-8 py-4 text-base leading-relaxed font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#396131] hover:text-white focus:ring-4 focus:ring-[#39613140] focus:outline-none"
									>
										{ctaSecondaryText}
									</NavLink>
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
					title={selectedProduct.title}
					description={selectedProduct.description}
					features={selectedProduct.features || []}
					image={selectedProduct.image}
					price={selectedProduct.price}
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
