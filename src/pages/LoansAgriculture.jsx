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
			route: '/success-stories/caneros',
			paragraphs: [
				'The Caneros is a humble family from Digos, Davao del Sur whose source of living is their banana plantation. They were able to live a normal and happy life, send their kids to school, and expand their plantation as well. Then came their nightmare in 2018—the Panama disease, a destructive disease of bananas caused by the soil-inhabiting fungus species.',
				'Suffering from devastating losses, the Caneros were forced to sell their properties. They were on the brink of hopelessness, seeing their future crumble before their eyes.',
				'With the remaining land that they had and their faith in God, they did their best to recover from the tragedy. It was during this time that 1VB Digos introduced them to our Agri Secured Loan with a scheme tailor-fitted for banana growers. Through this product, the Caneros obtained the funds they needed to rehabilitate their plantation. They were able to expand their plantation from 1.5 hectares to 7 hectares.',
				'"Dako jud kaayo natabang ang 1st Valley Bank samoa kay tungod sa ila pagpautang samoa nakabakod mi balik." (1st Valley Bank helped us a lot that we were able to rise again.), said Mrs. Virginia Cameros Tobiano.'
			]
		},
		{
			img: img2,
			alt: 'Santos Family',
			name: 'Santos Family',
			location: 'Rice Farmers, Bukidnon',
			description:
				'Used Chattel Financing to purchase new equipment, increasing their rice yield and income.',
			route: '/success-stories/santos',
			paragraphs: [
				'The Santos family, rice farmers from Bukidnon, faced challenges in keeping up with modern farming techniques due to outdated equipment. Their yields were limited, and income was barely enough to sustain their needs.',
				'Through Chattel Financing, they were able to purchase new farm equipment, which significantly improved their productivity and efficiency in the field.',
				'With increased rice yield and better income, the Santos family was able to provide more for their household and invest further in their farm’s future.'
			]
		},
		{
			img: img2,
			alt: 'Lopez Family',
			name: 'Lopez Family',
			location: 'Vegetable Growers, Misamis',
			description: "Accessed Individual Secured Loan for farm expansion and children's education.",
			route: '/success-stories/lopez',
			paragraphs: [
				'The Lopez family from Misamis has been growing vegetables for years, but dreamed of expanding their farm and supporting their children’s education.',
				'With the help of the Individual Secured Loan, they were able to acquire additional land and invest in better seeds and tools.',
				'The increased harvest not only improved their livelihood but also enabled them to send their children to school, fulfilling their aspirations for a brighter future.'
			]
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
