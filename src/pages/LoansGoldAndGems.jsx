import React, { useState, useEffect } from 'react';
import img1 from '/src/assets/loans/gold-and-gems/1.jpg';
import img3 from '/src/assets/homepage/3.png';
import PageHeroSection from '../components/PageHeroSection';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';
import SuccessStoriesSection from '../components/SuccessStoriesSection';
import successStoriesService from '../services/successStoriesService';
import { ProductListingPageSkeleton } from '../components/PageSkeleton';

export default function LoansGoldAndGems() {
	const [successStories, setSuccessStories] = useState([]);
	const [loading, setLoading] = useState(true);

	const getSuccessStories = async () => {
		try {
			const response = await successStoriesService.getByLoanType('gold_gems');
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
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getSuccessStories();
	}, []);

	// Show skeleton on initial load
	if (loading && successStories.length === 0) {
		return (
			<ProductListingPageSkeleton
				showHero={true}
				showCarousel={false}
				showProductGrid={true}
				productColumns={3}
				productRows={2}
				variant="dark"
			/>
		);
	}

	return (
		<>
			<PageHeroSection pageSlug="loans-gold-gems" />
			<main className="flex flex-col pb-[50px]">
				<LoanSubcategoriesSection
					id="gold-and-gems-types"
					sectionTitle="Gold & Gems Loan Types"
					sectionSubtitle="Choose the gold & gems loan that best fits your needs"
					tagText="Loan Categories"
					loanTypes={[]}
					ctaOnly={true}
					ctaTitle="Need help choosing the right Gold & Gems loan for you?"
					ctaPrimaryText="Get Expert Consultation"
					ctaSecondaryText="View All Loans"
				/>
				<SuccessStoriesSection
					id="gold-and-gems-success-stories"
					title="Gold & Gems Success Stories"
					subtitle="Read real stories from clients who secured what they needed—fast"
					stories={successStories}
					brandColor="#396131"
				/>
			</main>
		</>
	);
}
