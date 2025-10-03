import { ChartBarHorizontalIcon, ChartPieSliceIcon } from '@phosphor-icons/react/dist/ssr';
import React from 'react';
import HeroSection from '../components/HeroSection';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';
import carouselImg1 from '/src/assets/carousel/1.png';

export default function LoansMicrofinance() {
	return (
		<>
			<main className="flex flex-col">
				<HeroSection
					id="main"
					title="Microfinance"
					description="Credit program that provides affordable funds to micro-entrepreneurs or low-income individuals who wish to start or expand their business but have limited or no access to financial services."
					image={carouselImg1}
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
