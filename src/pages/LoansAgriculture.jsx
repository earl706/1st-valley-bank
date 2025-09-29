import React from 'react';
import { faBank, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BarnIcon, UserCircleCheckIcon } from '@phosphor-icons/react';
import { LeafIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import img1 from '/src/assets/loans/agriculture/1.jpg';
import img2 from '/src/assets/loans/agriculture/2.jpg';
import { ShieldCheckIcon, ShovelIcon } from '@phosphor-icons/react/dist/ssr';
import CarouselSection from '../components/CarouselSection';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';
import img from '/src/assets/homepage/heroSectionImage.png';
import SuccessStoriesSection from '../components/SuccessStoriesSection';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import carouselImg4 from '/src/assets/carousel/4.png';

export default function LoansAgriculture() {
	// Agriculture loan types for LoanSubcategoriesSection
	const agricultureLoanTypes = [
		{
			title: 'Agri-Secured',
			description:
				'Intends to help farmers in cultivating, improvement and expansion of their farm land or other related activities. Perfect for established agricultural operations.',
			features: [],
			image: carouselImg1,
			route: '/contact-us'
		},
		{
			title: 'Individual Secured',
			description:
				'For clients who seek financial assistance for personal purposes, either house renovation, house construction, placement fee or medical expenses.',
			features: [],
			image: carouselImg2,
			route: '/contact-us'
		},
		{
			title: 'Chattel Financing',
			description:
				'Intends to help farmers in procuring farm equipment for greater yield and further agricultural activities. Equipment serves as collateral.',
			features: [],
			image: carouselImg3,
			route: '/contact-us'
		}
	];

	// Carousel slides combining hero and agriculture loan types
	const agricultureSlides = [
		{
			title: 'Agricultural Loans',
			subtitle: 'Boost Your Farm Productivity',
			description:
				'Agricultural loans provide farmers with funds to buy equipment, supplies, improve land, cover costs, or recover from setbacks—helping boost productivity and growth.',
			features: [],
			image: carouselImg1,
			imageAlt: 'Agricultural Loans Overview',
			route: '/contact-us',
			buttonText: 'Apply Now',
			showButton: false
		},
		{
			title: 'Agri-Secured',
			subtitle: 'Farm land cultivation and expansion',
			description:
				'Intends to help farmers in cultivating, improvement and expansion of their farm land or other related activities. Perfect for established agricultural operations looking to grow and improve their farming capabilities.',
			features: [],
			image: carouselImg2,
			imageAlt: 'Agri-Secured Loan',
			route: '/contact-us',
			buttonText: 'Apply Now'
		},
		{
			title: 'Individual Secured',
			subtitle: 'Personal financial assistance',
			description:
				'For clients who seek financial assistance for personal purposes, either house renovation, house construction, placement fee or medical expenses. Flexible terms for various personal needs.',
			features: [],
			image: carouselImg3,
			imageAlt: 'Individual Secured Loan',
			route: '/contact-us',
			buttonText: 'Apply Now'
		},
		{
			title: 'Chattel Financing',
			subtitle: 'Farm equipment procurement',
			description:
				'Intends to help farmers in procuring farm equipment for greater yield and further agricultural activities. The financed equipment serves as collateral for the loan.',
			features: [],
			image: carouselImg4,
			imageAlt: 'Chattel Financing',
			route: '/contact-us',
			buttonText: 'Apply Now'
		}
	];

	// Agriculture success stories data
	const agricultureSuccessStories = [
		{
			img: img2,
			alt: 'Caneros Family',
			name: 'Caneros Family',
			location: 'Banana Growers, Digos',
			description:
				'Recovered from crop loss with the Agri Secured Loan, expanding their plantation and rebuilding their lives.',
			route: '/success-stories/caneros'
		},
		{
			img: img2,
			alt: 'Santos Family',
			name: 'Santos Family',
			location: 'Rice Farmers, Bukidnon',
			description:
				'Used Chattel Financing to purchase new equipment, increasing their rice yield and income.',
			route: '/success-stories/santos'
		},
		{
			img: img2,
			alt: 'Lopez Family',
			name: 'Lopez Family',
			location: 'Vegetable Growers, Misamis',
			description: "Accessed Individual Secured Loan for farm expansion and children's education.",
			route: '/success-stories/lopez'
		}
	];

	return (
		<>
			<main className="flex flex-col">
				<CarouselSection
					id="agriculture-carousel"
					slides={agricultureSlides}
					autoPlay={true}
					autoPlayInterval={6000}
					backgroundColor="from-green-50 via-white to-emerald-50"
					brandColor="#396131"
					brandGradient="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
					showLearnMoreButton={true}
					learnMoreText="Apply Now"
				/>

				<LoanSubcategoriesSection
					id="agriculture-loan-types"
					sectionTitle="Agricultural Loan Types"
					sectionSubtitle="Choose the agricultural loan that best fits your farming needs and goals"
					tagText="Loan Categories"
					loanTypes={agricultureLoanTypes}
					ctaTitle="Need help choosing the right agricultural loan for your farm?"
					ctaPrimaryText="Get Expert Consultation"
					ctaSecondaryText="View All Loans"
				/>
				{/* <section id="description" className="px-[15px] text-white">
					<div className="flex flex-col items-center justify-center gap-[20px] rounded-[8px] bg-[#396131] p-[20px] drop-shadow-lg lg:flex-row lg:gap-[80px] lg:px-[80px] lg:py-[60px]">
						<div className="flex items-center justify-center lg:w-2/5">
							<LeafIcon className="h-auto w-[10rem] lg:w-[60%]" />
						</div>
						<div className="flex flex-col items-start gap-[20px] lg:w-3/5">
							<span className="text-[1.5rem]/[1.5rem] font-bold text-white lg:text-[4rem]/[4rem]">
								Agricultural Loans
							</span>
							<span className="text-[0.8rem]/[2.4rem] text-white lg:text-[1rem]/[2rem]">
								Farmers may borrow from Php100K up payable within five (5) years. Interest rate
								starts at 12% per annum on a diminishing balance. Co-makers are not necessary, but
								clients will have to submit collateral to enjoy lower interests and to secure the
								loan. The cost of an agricultural production is usually steep. Taking an
								agricultural loans from us is one of the best solutions.
							</span>
						</div>
					</div>
				</section> */}
				{/* <section className="mx-[20px] flex flex-col-reverse justify-between gap-[20px] text-[#396131] lg:mx-[60px] lg:flex-row">
					<div className="flex flex-col gap-[20px] lg:w-3/5 lg:gap-[50px]">
						<span className="text-[1.5rem]/[2.25rem] font-semibold lg:text-[2.5rem]/[3rem]">
							AGRICULTURAL LOANS SURPASS PROJECTED GROWTH
						</span>
						<span className="text-[1rem]/[1rem] font-semibold lg:text-[2rem]/[2rem]">
							Muabar Carba, Product Manager
						</span>
						<div className="flex flex-col gap-[50px]">
							<div className="flex flex-col gap-[10px]">
								<span className="text-[1rem]/[1rem] font-semibold lg:text-[1.5rem]/[1.5rem]">
									Portfolio Grows to PHP 204.89M
								</span>
								<span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[3rem]">
									With strategic marketing, persistent effort, and brilliant performance, this
									product achieved an unprecedented growth of Php204.89M in 2023 or 24.46M higher
									than Php180.43M growth in 2022.
								</span>
							</div>
							<div className="flex flex-col gap-[10px]">
								<span className="text-[1rem]/[1rem] font-semibold lg:text-[1.5rem]/[1.5rem]">
									Agricultural Loans
								</span>
								<span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[3rem]">
									Agricultural loans, including agrarian reform loans, are secured lending products
									that provide financial assistance to farmers engaged in agrarian reform or
									agricultural activities. 1VB provides these farmers with additional funds
									necessary to expand or to diversify their activities resulting with an increase in
									their income.
								</span>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-center lg:w-2/5">
						<img src={img1} alt="" className="h-full w-2/3 rounded-[12px] object-cover" />
					</div>
				</section> */}
				{/* <section
					id="kinds"
					className="mx-[15px] flex flex-col gap-[20px] rounded-[8px] bg-[#396131] p-[30px] text-white drop-shadow-lg lg:gap-[40px] lg:p-[50px]"
				>
					<span className="text-center text-[1.5rem]/[1.5rem] font-bold lg:text-[2rem]/[2rem]">
						Kinds of Agricultural Loans
					</span>
					<div className="grid grid-cols-1 gap-x-[100px] gap-y-[30px] text-center lg:grid-cols-3">
						{[
							{
								icon: <ShieldCheckIcon size={150} />,
								header: 'AGRI SECURED',
								description:
									'Intends to help farmers in cultivating, improvement and expansion of their farm land or other related activities'
							},
							{
								icon: <UserCircleCheckIcon size={150} />,
								header: 'INDIVIDUAL SECURED',
								description:
									'For clients who seeks financial assistance for personal purposes, either house renovation, house construction, placement fee or medical expenses'
							},
							{
								icon: <ShovelIcon size={150} />,
								header: 'CHATTEL FINANCING',
								description:
									'Intends to help farmers in procuring farm equipment for greater yield and further agricultural activities'
							}
						].map((kind, index) => (
							<div className="flex flex-col gap-[20px]" key={index}>
								<div className="flex flex-col items-center gap-[20px]">
									{kind.icon}
									<span className="text-[1rem]/[1rem] font-bold lg:text-[1.5rem]/[1.5rem]">
										{kind.header}
									</span>
								</div>
								<span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
									{kind.description}
								</span>
							</div>
						))}
					</div>
				</section> */}
				{/*
					Refactored to use an array and map. Enhanced button design. Each story has a `route` attribute.
				*/}
				<SuccessStoriesSection
					id="agri-success-stories"
					title="Agricultural Success Stories"
					subtitle="Real stories from our clients who have grown with our agricultural loans."
					stories={agricultureSuccessStories}
					brandColor="#396131"
				/>
			</main>
		</>
	);
}
