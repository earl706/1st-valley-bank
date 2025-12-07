import React from 'react';
import img1 from '/src/assets/loans/gold-and-gems/1.jpg';
import img3 from '/src/assets/homepage/3.png';
import PageHeroSection from '../components/PageHeroSection';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';
import SuccessStoriesSection from '../components/SuccessStoriesSection';

export default function LoansGoldAndGems() {
	// Success stories for Gold & Gems
	const goldAndGemsSuccessStories = [
		{
			img: img1,
			alt: 'Sofia with Jewelry',
			name: 'Sofia Reyes',
			location: 'Entrepreneur, Iligan City',
			description:
				'Sofia quickly got the cash she needed for a family emergency by pawning her jewelry through 1st Valley Bank’s Gold & Gems Loan.',
			route: '/success-stories/sofia-reyes',
			paragraphs: [
				'Sofia needed urgent funds for a hospital bill. With 1VB’s Gold & Gems loan, she was able to get a high appraisal on her jewelry and walked out with cash in less than an hour.',
				'"The appraisal was higher than anywhere else, and the low interest gave me peace of mind."',
				'She reclaimed her jewelry after completing easy repayments, grateful for the flexibility and security.'
			]
		},
		{
			img: img3,
			alt: 'Alvin at Jewelry Counter',
			name: 'Alvin Lim',
			location: 'Business Owner, Oroquieta',
			description:
				'Alvin used his family’s gold jewelry to take out a Gold & Gems Loan, growing his buy and sell venture with instant funds.',
			route: '/success-stories/alvin-lim',
			paragraphs: [
				'Business opportunities can’t wait. Alvin leveraged the Gold & Gems facility to inject much-needed working capital into his inventory—no collateral except his jewelry.',
				'"It was confidential, very safe, and I liked the remote payment option so I never missed a due date."'
			]
		}
	];

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
					stories={goldAndGemsSuccessStories}
					brandColor="#396131"
				/>
			</main>
		</>
	);
}
