import { faMoneyBillWheat } from '@fortawesome/free-solid-svg-icons/faMoneyBillWheat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	FlowerLotusIcon,
	MagicWandIcon,
	MoneyWavyIcon,
	ReceiptIcon,
	ShieldCheckIcon,
	ShieldStarIcon,
	SubtitlesIcon,
	UserPlusIcon
} from '@phosphor-icons/react/dist/ssr';
import img1 from '/src/assets/loans/sucre/1.jpg';
import img2 from '/src/assets/homepage/2.png';
import img from '/src/assets/homepage/heroSectionImage.png';

import React from 'react';
import { WheatIcon } from 'lucide-react';
import { CpuIcon, LeafIcon } from '@phosphor-icons/react';
import HeroSection from '../components/HeroSection';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';
import CarouselSection from '../components/CarouselSection';

export default function LoansSUCRE() {
	const disbursedLoans = [
		{
			type: 'CORN',
			logo: <WheatIcon size={70} />,
			description: '₱ 24.96M to 315 farmers'
		},
		{
			type: 'RICE',
			logo: <LeafIcon size={70} />,
			description: '₱ 117.37M to 1,706 farmers'
		},
		{
			type: 'SUGARCANE',
			logo: <FlowerLotusIcon size={70} />,
			description: '₱ 80.30M to 383 farmers'
		}
	];
	const benefitsUses = [
		{
			type: 'Access',
			logo: <SubtitlesIcon size={70} />,
			description: 'Farmers can access the funds to cover expenses as the need arises'
		},
		{
			type: 'Liquidity',
			logo: <MoneyWavyIcon size={70} />,
			description: 'Provides operations cash flow'
		},
		{
			type: 'Seasonality',
			logo: <ReceiptIcon size={70} />,
			description: 'Funds seasonal expenses'
		},
		{
			type: 'Risk',
			logo: <ShieldStarIcon size={70} />,
			description: 'Can be a useful tool to manage agricultural risks'
		},
		{
			type: 'Profitability',
			logo: <UserPlusIcon size={70} />,
			description: 'Increase in profitability with high-value crops'
		},
		{
			type: 'Innovation',
			logo: <CpuIcon size={70} />,
			description:
				'Ability to benefit from modernization and technological advancements in agriculture'
		}
	];

	const sucreLoanTypes = [
		{
			title: 'Rice Production Loan',
			description:
				'Specialized financing for rice farmers to support planting, cultivation, and harvest activities. Get the funding you need to maximize your rice production with competitive rates and flexible terms.',
			image: img,
			route: '/contact-us',
			features: []
		},
		{
			title: 'Cassava Production Loan',
			description:
				'Dedicated funding for cassava cultivation to help farmers invest in quality planting materials, equipment, and farm inputs for optimal cassava production and yield.',
			image: img,
			route: '/contact-us',
			features: []
		},
		{
			title: 'Sugarcane Production Loan',
			description:
				'Comprehensive financing solution for sugarcane farmers covering all aspects of production from land preparation to harvest, designed to boost productivity and profitability.',
			image: img,
			route: '/contact-us',
			features: []
		}
	];

	// Carousel slides combining hero and loan types
	const sucreLoanSlides = [
		{
			title: 'Supervised Credit',
			subtitle: 'Grow More with Guided Loans',
			description:
				"Supervised Credit is a lending program that provides funds to farmers for the production of rice, corn, cacao, or sugarcane. This unsecured loan is also bundled with the provision of technical and marketing assistance to help improve the farmer's productivity and income.",
			features: [],
			image: img,
			showButton: false,
			imageAlt: 'Supervised Credit Overview',
			route: '/contact-us',
			buttonText: 'Apply Now'
		},
		{
			title: 'Rice Production Loan',
			subtitle: 'Specialized financing for rice farmers',
			description:
				'Support your rice planting, cultivation, and harvest activities. Get the funding you need to maximize your rice production with competitive rates and flexible terms.',
			features: [],
			image: img,
			imageAlt: 'Rice Production Loan',
			route: '/contact-us',
			buttonText: 'Apply Now'
		},
		{
			title: 'Cassava Production Loan',
			subtitle: 'Dedicated funding for cassava cultivation',
			description:
				'Help farmers invest in quality planting materials, equipment, and farm inputs for optimal cassava production and yield.',
			features: [],
			image: img,
			imageAlt: 'Cassava Production Loan',
			route: '/contact-us',
			buttonText: 'Apply Now'
		},
		{
			title: 'Sugarcane Production Loan',
			subtitle: 'Comprehensive financing solution',
			description:
				'Comprehensive financing solution for sugarcane farmers covering all aspects of production from land preparation to harvest, designed to boost productivity and profitability.',
			features: [],
			image: img,
			imageAlt: 'Sugarcane Production Loan',
			route: '/contact-us',
			buttonText: 'Apply Now'
		}
	];

	return (
		<>
			<main className="flex flex-col pb-[50px]">
				<CarouselSection
					id="sucre-carousel"
					slides={sucreLoanSlides}
					autoPlay={true}
					autoPlayInterval={6000}
					backgroundColor="from-green-50 via-white to-emerald-50"
					brandColor="#396131"
					brandGradient="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
					showLearnMoreButton={true}
					learnMoreText="Apply Now"
				/>
				<LoanSubcategoriesSection
					id="sucre-loan-types"
					sectionTitle="SUCRE Loan Types"
					sectionSubtitle="Choose the agricultural loan that matches your farming needs"
					tagText="Loan Types"
					loanTypes={sucreLoanTypes}
					brandColor="#396131"
				/>

				{/* <section
					id="kinds"
					className="mx-[15px] flex flex-col gap-[50px] rounded-[10px] p-[30px] text-[#396131] lg:p-[50px]"
				>
					<div className="flex flex-col gap-[10px]">
						<span className="text-center text-[1.5rem]/[1.5rem] font-bold lg:text-[2rem]/[2rem]">
							Disbursed Loans
						</span>
						<div className="flex flex-col gap-[5px]">
							<span className="text-center text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
								1VB has disbursed a total of P229.35M for 2023, higher by P11.44M as compared to the
								2022 disbursement of P217.98M.
							</span>
							<span className="text-center text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
								The loan was disbursed to three (3) major crops.
							</span>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-x-[100px] gap-y-[30px] lg:grid-cols-3 lg:gap-y-[90px]">
						{disbursedLoans.map((loan, index) => (
							<div className="flex flex-col justify-between gap-[40px]" key={index}>
								<div className="flex flex-col items-center gap-[30px]">
									<div className="flex">{loan.logo}</div>
									<div className="flex flex-col gap-[20px]">
										<span className="text-center text-[1rem]/[1rem] font-bold lg:text-[1.5rem]/[1.5rem]">
											{loan.type}
										</span>
										<span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[3rem]">
											{loan.description}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
					<span className="text-center text-[0.8rem]/[1.6rem] lg:text-[1rem]/[1rem]">
						₱ 6.69M emergency funding to 191 farmers
					</span>
				</section> */}
				{/* <section
					id="product-enhancement"
					data-scroll
					className="flex flex-col rounded-[8px] text-[#396131] lg:flex-row"
				>
					<div className="flex items-center justify-center lg:w-2/5">
						<MagicWandIcon size={300} />
					</div>
					<div className="flex flex-col gap-[20px] p-[30px] lg:w-3/5 lg:px-[60px] lg:py-[80px]">
						<span className="text-[1rem]/[1rem] font-bold lg:text-[3rem]/[3rem]">
							PRODUCT ENHANCEMENT
						</span>
						<span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[3rem]">
							When it was still known as supervised credit, 1VB has set a maximum loan amount of
							Php150K/farmer. With the transformation to Crop Loan, the ceiling has been removed.
							Now, there is no maximum loan amount thereby encouraging large-enterprising farmers to
							also benefit from the product.
						</span>
					</div>
				</section>
				<section
					id="benefits-and-uses"
					className="mx-[15px] flex flex-col gap-[50px] rounded-[10px] bg-[#396131] p-[30px] text-white drop-shadow-lg lg:p-[50px]"
				>
					<span className="text-center text-[1.5rem]/[1.5rem] font-bold lg:text-[2rem]/[2rem]">
						Benefits and Uses
					</span>
					<div className="grid grid-cols-2 gap-x-[50px] gap-y-[40px] lg:grid-cols-3 lg:gap-x-[100px] lg:gap-y-[90px]">
						{benefitsUses.map((loan, index) => (
							<div className="flex flex-col justify-between gap-[40px]" key={index}>
								<div className="flex flex-col items-center gap-[30px]">
									<div className="flex">{loan.logo}</div>
									<div className="flex flex-col gap-[20px]">
										<span className="text-center text-[1rem]/[1rem] font-bold lg:text-[1.5rem]/[1.5rem]">
											{loan.type}
										</span>
										<span className="text-center text-[0.8rem]/[1.6rem] lg:text-[1rem]/[3rem]">
											{loan.description}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</section> */}
			</main>
		</>
	);
}
