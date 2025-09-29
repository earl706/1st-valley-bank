import { ChartBarHorizontalIcon, ChartPieSliceIcon } from '@phosphor-icons/react/dist/ssr';
import React from 'react';
import HeroSection from '../components/HeroSection';
import img from '/src/assets/homepage/heroSectionImage.png';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';

export default function LoansMicrofinance() {
	return (
		<>
			<main className="flex flex-col">
				<HeroSection
					id="main"
					title="Microfinance"
					description="Credit program that provides affordable funds to micro-entrepreneurs or low-income individuals who wish to start or expand their business but have limited or no access to financial services."
					image={img}
					imageAlt="Microfinance Icon"
					className="mx-[10px]"
					ctaText="Apply Now"
					ctaLink="/contact-us"
				/>
				<LoanSubcategoriesSection
					id="gold-and-gems-types"
					sectionTitle="Microfinance"
					sectionSubtitle="Choose the Microfinance loan that best fits your needs"
					tagText="Loan Categories"
					loanTypes={[]}
					ctaOnly={true}
					ctaTitle="Need help choosing the right Gold & Gems loan for you?"
					ctaPrimaryText="Get Expert Consultation"
					ctaSecondaryText="View All Loans"
				/>
			</main>
		</>
	);
}
