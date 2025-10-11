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
import SuccessStoriesSection from '../components/SuccessStoriesSection';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import carouselImg4 from '/src/assets/carousel/4.png';
import carouselImg5 from '/src/assets/carousel/5.png';
import carouselImg6 from '/src/assets/carousel/6.png';
import carouselImg7 from '/src/assets/carousel/7.png';

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
			image: carouselImg1,
			route: '/contact-us',
			features: []
		},
		{
			title: 'Cassava Production Loan',
			description:
				'Dedicated funding for cassava cultivation to help farmers invest in quality planting materials, equipment, and farm inputs for optimal cassava production and yield.',
			image: carouselImg2,
			route: '/contact-us',
			features: []
		},
		{
			title: 'Sugarcane Production Loan',
			description:
				'Comprehensive financing solution for sugarcane farmers covering all aspects of production from land preparation to harvest, designed to boost productivity and profitability.',
			image: carouselImg3,
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
			image: carouselImg1,
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
			image: carouselImg2,
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
			image: carouselImg3,
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
			image: carouselImg4,
			imageAlt: 'Sugarcane Production Loan',
			route: '/contact-us',
			buttonText: 'Apply Now'
		}
	];

	const sucreSuccessStories = [
		{
			name: 'Josefina Dela Torre',
			title: 'Empowered Rice Farmer',
			image: img1,
			alt: 'Photo of Josefina Dela Torre, a hardworking rice farmer, in her rice field',
			location: 'Nueva Ecija',
			description:
				'Josefina used the SUCRE loan to expand her farm and invest in better seeds, boosting her rice yield by 30%. Her success story is an inspiration to fellow farmers in Nueva Ecija who strive to improve their harvest and livelihood.',
			paragraphs: [
				'For years, Josefina worked tirelessly on her modest rice farm in Nueva Ecija, worried about unpredictable yields and limited resources. Like many farmers in her area, her income depended heavily on the weather and the quality of her inputs.',
				'Her fortunes changed when she accessed a SUCRE loan through 1st Valley Bank. With the financial support, Josefina was able to lease additional farmland and purchase high-quality rice seeds, fertilizer, and modern farming equipment.',
				'"With the SUCRE loan, I was able to expand my farmland and invest in better seeds. My yield increased by 30%, and now I am confident to plan for next season."',
				'Technical guidance provided alongside the loan taught her new farming techniques, helping her to maximize both resources and productivity.',
				'Today, Josefina no longer worries about her next harvest. She shares her knowledge with her neighbors and proudly supports her children’s education through her thriving farm.'
			]
		},
		{
			name: 'Lito Manalo',
			title: 'Sugarcane Grower',
			image: carouselImg4,
			alt: 'Photo of Lito Manalo standing in a flourishing sugarcane plantation',
			location: 'Negros Occidental',
			description:
				'Lito modernized his sugarcane farm with the help of the SUCRE loan, experiencing increased efficiency and better harvests. With 1VB’s support, he moved from traditional to tech-driven techniques.',
			paragraphs: [
				'In the heart of Negros Occidental, Lito tended to a family sugarcane plot using age-old methods passed down by his ancestors. He often dreamed of modernizing his farm but lacked the capital and technical know-how to implement his ideas.',
				'After learning about the SUCRE loan, Lito decided to take a leap of faith. The application was straightforward, and soon he received funds that let him purchase a tractor and irrigation equipment.',
				'"I never thought I could modernize my sugarcane farm, but 1VB believed in me. The ease and support throughout the process made all the difference."',
				'With regular field visits from the bank’s agriculture experts, Lito introduced new planting and harvesting techniques that reduced labor costs and improved sugarcane quality.',
				'His production doubled in just one year, and Lito now serves as a role model for other growers in his community, advocating for innovation in agriculture.'
			]
		},
		{
			name: 'Maricel Ramos',
			title: 'Cassava Entrepreneur',
			image: carouselImg2,
			alt: 'Photo of Maricel Ramos displaying fresh cassava harvest with farm crew',
			location: 'Bukidnon',
			description:
				'Maricel tapped the SUCRE program to adopt high-yield cassava varieties and purchase essential tools. Her journey demonstrates the impact of access to sustainable finance on rural livelihoods.',
			paragraphs: [
				'Bukidnon-based Maricel Ramos always knew cassava farming held promise, but her old tools and planting materials limited the family’s income. Despite her enterprising spirit, it was challenging to break out of the cycle of low yields and earnings.',
				'With the help of 1VB’s SUCRE loan, Maricel was able to buy improved cassava cuttings and much-needed processing equipment that made post-harvest handling faster and more efficient.',
				'"1VB’s SUCRE program meant I could try higher-yield planting and upgrade my equipment. My family’s livelihood is now secure."',
				'Market linkage support from the bank connected her to buyers, increasing her profits and giving her confidence for future investments.',
				'Driven by her progress, Maricel helps neighboring farmers by sharing best practices and motivating more women to take up entrepreneurial roles in agriculture.'
			]
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
				<SuccessStoriesSection
					id="sucre-success-stories"
					sectionTitle="Success Stories"
					sectionSubtitle="Hear from our SUCRE Loan beneficiaries"
					stories={sucreSuccessStories}
					brandColor="#396131"
					backgroundClassName="bg-emerald-50"
				/>
			</main>
		</>
	);
}
