import React, { useState, useEffect } from 'react';
import img2 from '/src/assets/loans/agriculture/2.jpg';
import PageHeroSection from '../components/PageHeroSection';
import CarouselSection from '../components/CarouselSection';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';
import SuccessStoriesSection from '../components/SuccessStoriesSection';
import RequirementsSection from '../components/RequirementsSection';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import carouselImg4 from '/src/assets/carousel/4.png';
import loanService from '../services/loanService';
import successStoriesService from '../services/successStoriesService';

export default function LoansAgriculture() {
	const [agricultureTypes, setAgricultureTypes] = useState([]);
	const [successStories, setSuccessStories] = useState([]);
	const [loading, setLoading] = useState(true);

	const getAgricultureTypes = async () => {
		try {
			const response = await loanService.getByType('agriculture');
			setAgricultureTypes(response.results);
		} catch (error) {
			console.error('Failed to fetch Agriculture types:', error);
			setAgricultureTypes([]);
		} finally {
			setLoading(false);
		}
	};

	const getSuccessStories = async () => {
		try {
			const response = await successStoriesService.getByLoanType('agriculture');
			if (response.success && response.data.results) {
				const transformed = response.data.results.map((story) => ({
					img: story.image || img2,
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
		getAgricultureTypes();
		getSuccessStories();
	}, []);

	return (
		<>
			<main className="flex flex-col">
				<PageHeroSection
					pageSlug="loans-agriculture"
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
					loanTypes={agricultureTypes}
					ctaTitle="Need help choosing the right agricultural loan for your farm?"
					ctaPrimaryText="Get Expert Consultation"
					ctaSecondaryText="View All Loans"
				/>
				{agricultureTypes.length > 0 && agricultureTypes[0]?.requirements && (
					<RequirementsSection
						requirements={agricultureTypes[0].requirements}
						title="Requirements"
						subtitle="What you need to apply for an agricultural loan"
						badgeText="Agricultural Loans"
						layout="two-column"
						showIcons={true}
					/>
				)}
				<SuccessStoriesSection
					id="agri-success-stories"
					title="Agricultural Success Stories"
					subtitle="Real stories from our clients who have grown with our agricultural loans."
					stories={successStories}
					brandColor="#396131"
				/>
			</main>
		</>
	);
}
