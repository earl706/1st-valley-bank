import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
	className = ''
}) {
	// If ctaOnly is true, render only the CTA section
	if (ctaOnly && showCallToAction) {
		return (
			<section
				id={id}
				className={`relative overflow-hidden bg-gradient-to-br ${backgroundColor} py-20 ${className}`}
			>
				{/* Background Elements */}
				<div className="absolute inset-0">
					<div
						className="absolute top-0 left-0 h-96 w-96 rounded-full blur-3xl"
						style={{ backgroundColor: `${brandColor}1a` }}
					></div>
					<div
						className="absolute right-0 bottom-0 h-80 w-80 rounded-full blur-3xl"
						style={{ backgroundColor: `${brandColor}1a` }}
					></div>
				</div>

				<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					{/* Call to Action Only */}
					<div className="text-center">
						<p className="mb-6 text-lg text-gray-600">{ctaTitle}</p>
						<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
							<NavLink
								to={ctaPrimaryLink}
								className="inline-flex items-center justify-center rounded-xl px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105"
								style={{ backgroundColor: brandColor }}
								onMouseEnter={(e) => {
									const shade = brandColor === '#396131' ? '#4a7a3f' : brandColor;
									e.target.style.backgroundColor = shade;
								}}
								onMouseLeave={(e) => {
									e.target.style.backgroundColor = brandColor;
								}}
							>
								{ctaPrimaryText}
								<ArrowRight className="ml-2 h-5 w-5" />
							</NavLink>
							<NavLink
								to={ctaSecondaryLink}
								className="inline-flex items-center justify-center rounded-xl border-2 px-8 py-4 font-semibold transition-all duration-200"
								style={{
									borderColor: brandColor,
									color: brandColor
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
								{ctaSecondaryText}
							</NavLink>
						</div>
					</div>
				</div>
			</section>
		);
	}

	// If ctaOnly is true but showCallToAction is false, return null
	if (ctaOnly && !showCallToAction) {
		return null;
	}

	// Default: render the full component
	return (
		<section
			id={id}
			className={`relative overflow-hidden bg-gradient-to-br ${backgroundColor} py-20 ${className}`}
		>
			{/* Background Elements */}
			<div className="absolute inset-0">
				<div
					className="absolute top-0 left-0 h-96 w-96 rounded-full blur-3xl"
					style={{ backgroundColor: `${brandColor}1a` }}
				></div>
				<div
					className="absolute right-0 bottom-0 h-80 w-80 rounded-full blur-3xl"
					style={{ backgroundColor: `${brandColor}1a` }}
				></div>
			</div>

			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-16 text-center">
					<div
						className="mb-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
						style={{
							backgroundColor: `${brandColor}1a`,
							color: brandColor
						}}
					>
						<span
							className="h-2 w-2 animate-pulse rounded-full"
							style={{ backgroundColor: brandColor }}
						></span>
						{tagText}
					</div>

					<h2
						className="mb-6 text-4xl leading-tight font-bold md:text-5xl"
						style={{ color: brandColor }}
					>
						{sectionTitle}
					</h2>

					<p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
						{sectionSubtitle}
					</p>
				</div>

				{/* Loan Types Grid */}
				<div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
					{loanTypes.map((type, index) => (
						<div
							key={index}
							className="group relative flex h-full transform flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
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
											className="mb-3 text-xl font-bold transition-colors duration-300 lg:text-2xl"
											style={{ color: brandColor }}
										>
											{type.title}
										</h3>
										<p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600 lg:text-base">
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
														<span className="text-xs text-gray-600">{feature}</span>
													</div>
												))}
											</div>
										)}

										{/* CTA Button */}
										<div className="mt-auto">
											<NavLink
												to={type.route}
												className="group/btn inline-flex transform items-center justify-center rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:ring-4 focus:outline-none"
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
						<p className="mb-6 text-lg text-gray-600">{ctaTitle}</p>
						<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
							<NavLink
								to={ctaPrimaryLink}
								className="inline-flex items-center justify-center rounded-xl px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105"
								style={{ backgroundColor: brandColor }}
								onMouseEnter={(e) => {
									const shade = brandColor === '#396131' ? '#4a7a3f' : brandColor;
									e.target.style.backgroundColor = shade;
								}}
								onMouseLeave={(e) => {
									e.target.style.backgroundColor = brandColor;
								}}
							>
								{ctaPrimaryText}
								<ArrowRight className="ml-2 h-5 w-5" />
							</NavLink>
							<NavLink
								to={ctaSecondaryLink}
								className="inline-flex items-center justify-center rounded-xl border-2 px-8 py-4 font-semibold transition-all duration-200"
								style={{
									borderColor: brandColor,
									color: brandColor
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
								{ctaSecondaryText}
							</NavLink>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
