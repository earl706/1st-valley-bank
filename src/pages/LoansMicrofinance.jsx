import { ChartBarHorizontalIcon, ChartPieSliceIcon } from '@phosphor-icons/react/dist/ssr';
import React, { useState, useEffect } from 'react';
import PageHeroSection from '../components/PageHeroSection';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';
import SuccessStoriesSection from '../components/SuccessStoriesSection';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import successStoriesService from '../services/successStoriesService';

export default function LoansMicrofinance() {
	const [successStories, setSuccessStories] = useState([]);

	const getSuccessStories = async () => {
		try {
			const response = await successStoriesService.getByLoanType('microfinance');
			if (response.success && response.data) {
				const transformed = response.data.map((story) => ({
					img: story.image || carouselImg2,
					alt: story.alt_text || story.name,
					name: story.name,
					location: story.location,
					description: story.description,
					route: story.route
				}));
				setSuccessStories(transformed);
			}
		} catch (error) {
			console.error('Failed to fetch success stories:', error);
			setSuccessStories([]);
		}
	};

	useEffect(() => {
		getSuccessStories();
	}, []);

	return (
		<>
			<main className="flex flex-col">
				<PageHeroSection pageSlug="loans-microfinance" />
				<LoanSubcategoriesSection
					id="microfinance-types"
					sectionTitle="Microfinance"
					sectionSubtitle="Choose the Microfinance loan that best fits your needs"
					tagText="Loan Categories"
					loanTypes={[]}
					ctaOnly={true}
					ctaTitle="Need help choosing the right Microfinance loan for you?"
					ctaPrimaryText="Get Expert Consultation"
					ctaSecondaryText="View All Loans"
				/>
				<SuccessStoriesSection
					id="microfinance-success-stories"
					sectionTitle="Success Stories"
					sectionSubtitle="See how microfinance changes lives"
					stories={successStories}
					brandColor="#396131"
					backgroundClassName="bg-emerald-50"
				/>
			</main>
		</>
	);
}
