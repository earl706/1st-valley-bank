import React from 'react';
import {
	ArrowRight,
	Users,
	CreditCard,
	Heart,
	Scale,
	Home,
	Calendar,
	Car,
	Percent,
	Target
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';
import CarouselSection from '../components/CarouselSection';
import img1 from '/src/assets/homepage/1.png';
import img2 from '/src/assets/homepage/2.png';
import img3 from '/src/assets/homepage/3.png';
import img4 from '/src/assets/homepage/4.png';
import img5 from '/src/assets/homepage/5.png';
import img6 from '/src/assets/homepage/6.png';

import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import carouselImg4 from '/src/assets/carousel/4.png';
import carouselImg5 from '/src/assets/carousel/5.png';
import carouselImg6 from '/src/assets/carousel/6.png';
import carouselImg7 from '/src/assets/carousel/7.png';

export default function LoansSBL() {
	// Small Business Loan subcategories data
	const sblTypes = [
		{
			id: 1,
			title: 'Collateral',
			description:
				'Secure your business loan with collateral for better terms and higher loan amounts. Land titles or four-wheel vehicles can be used as collateral.',
			features: [],
			image: carouselImg1,
			route: '/loans/sbl/collateral'
		},
		{
			id: 2,
			title: 'Without Collateral',
			description:
				'Get a business loan without collateral based on your business performance and creditworthiness. Perfect for established businesses with good track records.',
			features: [],
			image: carouselImg2,
			route: '/loans/sbl/without-collateral'
		}
	];

	const whoCanApply = [
		{
			icon: Users,
			title: 'Business Experience',
			description: 'Entrepreneurs who are engaged in business for at least one (1) year'
		},
		{
			icon: CreditCard,
			title: 'Payment Commitment',
			description:
				'Willingness to pay in frequent installments of capital and interest and has clear understanding on the benefits of having a savings deposit'
		},
		{
			icon: Heart,
			title: 'Age & Health',
			description:
				'Must be at least 18 years of age but not more than 70 years old, must be in good health'
		},
		{
			icon: Scale,
			title: 'Legal Standing',
			description: 'Free from or cleared from cases at the barangay or court'
		},
		{
			icon: Home,
			title: 'Residency',
			description: 'A resident of the area for at least two (2) years where the branch is located'
		}
	];

	const benefitsFeature = [
		{
			icon: Calendar,
			header: 'Flexible Terms',
			description:
				'Up to 12 months for additional capital. Up to 24 months for business expansion. Up to 36 months vehicle financing'
		},
		{
			icon: Car,
			header: 'Easy Collateral',
			description: 'Collaterals (land title or four (4)-wheel vehicle) are just for safe-keeping'
		},
		{
			icon: Percent,
			header: 'Competitive Interest',
			description:
				"1.75% to 2.5% per month on diminishing balance (rate depends on client's rating)"
		},
		{
			icon: Target,
			header: 'Various Purposes',
			description: 'Additional capital, expansion of business, purchase of new vehicle'
		}
	];

	// Carousel slides combining hero and SBL loan types
	const sblSlides = [
		{
			title: 'Small Business Loan',
			subtitle: 'Grow with Flexible Loans',
			description:
				'Borrow up to ₱300,000 with ease at just 1.75% monthly interest on a diminishing balance. Enjoy flexible terms of up to 12 months, giving you time to grow your business and repay conveniently.',
			features: [],
			image: carouselImg3,
			imageAlt: 'Small Business Loan Overview',
			route: '/contact-us',
			buttonText: 'Apply Now',
			showButton: false
		},
		{
			title: 'Collateral',
			subtitle: 'Secure better terms with collateral',
			description:
				'Secure your business loan with collateral for better terms and higher loan amounts. Land titles or four-wheel vehicles can be used as collateral for enhanced loan conditions.',
			features: [],
			image: carouselImg1,
			imageAlt: 'Collateral',
			route: '/contact-us',
			buttonText: 'Apply Now'
		},
		{
			title: 'Non-Collateral',
			subtitle: 'Business loan without collateral',
			description:
				'Get a business loan without collateral based on your business performance and creditworthiness. Perfect for established businesses with good track records and proven cash flow.',
			features: [],
			image: carouselImg2,
			imageAlt: 'Non-Collateral SBL',
			route: '/contact-us',
			buttonText: 'Apply Now'
		}
	];

	return (
		<>
			<CarouselSection
				id="sbl-carousel"
				slides={sblSlides}
				autoPlay={true}
				autoPlayInterval={6000}
				backgroundColor="from-green-50 via-white to-emerald-50"
				brandColor="#396131"
				brandGradient="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
				minHeight="min-h-[600px] lg:min-h-[700px]"
				showLearnMoreButton={true}
				learnMoreText="Apply Now"
			/>
			<LoanSubcategoriesSection
				id="sbl-types"
				sectionTitle="Small Business Loan Types"
				sectionSubtitle="Choose the small business loan that best fits your business needs and security preference"
				tagText="Loan Categories"
				loanTypes={sblTypes}
				ctaTitle="Need help choosing the right small business loan for you?"
				ctaPrimaryText="Get Expert Consultation"
				ctaSecondaryText="View All Loans"
			/>
			<main className="flex flex-col pb-[50px]">
				{/* SBL Subcategories */}

				<section id="who-can-apply" className="relative overflow-hidden bg-white py-20">
					{/* Background Elements */}
					<div className="pointer-events-none absolute inset-0">
						<div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#396131]/5 blur-3xl"></div>
						<div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#396131]/5 blur-3xl"></div>
					</div>

					<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-16 text-center">
							<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#396131]/10 px-6 py-3 text-sm font-semibold text-[#396131]">
								<span className="h-2 w-2 animate-pulse rounded-full bg-[#396131]"></span>
								Eligibility Requirements
							</div>

							<h2 className="mb-6 text-4xl leading-tight font-bold text-[#185027] md:text-5xl">
								Who Can Apply?
							</h2>

							<p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-700">
								Check if you meet our requirements for Small Business Loan approval
							</p>
						</div>

						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
							{whoCanApply.map((requirement, index) => (
								<div
									key={index}
									className="group relative rounded-2xl border border-[#396131]/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
								>
									<div className="text-center">
										{/* Icon */}
										<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#396131]/10 transition-transform duration-300 group-hover:scale-110">
											{React.createElement(requirement.icon, {
												className: 'w-10 h-10 text-[#396131]'
											})}
										</div>

										{/* Title */}
										<h3 className="mb-3 text-xl font-bold text-[#185027]">{requirement.title}</h3>

										{/* Description */}
										<p className="text-sm leading-relaxed text-gray-700">
											{requirement.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				<section
					id="benefits-features"
					className="relative overflow-hidden bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-20"
				>
					<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-16 text-center">
							<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white">
								<span className="h-2 w-2 animate-pulse rounded-full bg-white"></span>
								Why Choose Us
							</div>

							<h2 className="mb-6 text-4xl leading-tight font-bold text-white md:text-5xl">
								Benefits & Features
							</h2>

							<p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/80">
								Discover the advantages of our Small Business Loan program
							</p>
						</div>

						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
							{benefitsFeature.map((benefit, index) => (
								<div
									key={index}
									className="group relative rounded-3xl border border-white/10 bg-white/10 p-8 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
								>
									{/* Gradient overlay */}
									<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

									<div className="relative text-center">
										{/* Icon Container */}
										<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#396131] to-[#4a7c3a] shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
											{React.createElement(benefit.icon, {
												className: 'w-10 h-10 text-white'
											})}
										</div>

										{/* Title */}
										<h3 className="mb-4 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-[#e0ffda]">
											{benefit.header}
										</h3>

										{/* Description */}
										<p className="leading-relaxed text-white/80">{benefit.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
