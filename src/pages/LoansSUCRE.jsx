import img1 from '/src/assets/loans/sucre/1.jpg';
import React, { useState, useEffect } from 'react';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';
import PageHeroSection from '../components/PageHeroSection';
import CarouselSection from '../components/CarouselSection';
import SuccessStoriesSection from '../components/SuccessStoriesSection';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import carouselImg4 from '/src/assets/carousel/4.png';
import loanService from '../services/loanService';
import successStoriesService from '../services/successStoriesService';

export default function LoansSUCRE() {
	const [sucreTypes, setSucreTypes] = useState([]);
	const [successStories, setSuccessStories] = useState([]);
	const [loading, setLoading] = useState(true);

	const getSucreTypes = async () => {
		try {
			const response = await loanService.getByType('sucre');
			setSucreTypes(response.results);
		} catch (error) {
			console.error('Failed to fetch SUCRE types:', error);
			setSucreTypes([]);
		} finally {
			setLoading(false);
		}
	};

	const getSuccessStories = async () => {
		try {
			const response = await successStoriesService.getByLoanType('sucre');
			if (response.success && response.data.results) {
				const transformed = response.data.results.map((story) => ({
					img: story.image || img1,
					alt: story.alt_text || story.name,
					name: story.name,
					location: story.location,
					description: story.description,
					route: story.route,
					pdf_file: story.pdf_file || null
				}));
				setSuccessStories(transformed);
			}
		} catch (error) {
			console.error('Failed to fetch success stories:', error);
			setSuccessStories([]);
		}
	};

	useEffect(() => {
		getSucreTypes();
		getSuccessStories();
	}, []);

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

	return (
		<>
			<main className="flex flex-col pb-[50px]">
				<PageHeroSection
					pageSlug="loans-sucre"
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
					loanTypes={sucreTypes}
				/>
				<SuccessStoriesSection
					id="sucre-success-stories"
					sectionTitle="Success Stories"
					sectionSubtitle="Hear from our SUCRE Loan beneficiaries"
					stories={successStories}
					brandColor="#396131"
					backgroundClassName="bg-emerald-50"
				/>
			</main>
		</>
	);
}
