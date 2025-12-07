import { ChartBarHorizontalIcon, ChartPieSliceIcon } from '@phosphor-icons/react/dist/ssr';
import React from 'react';
import PageHeroSection from '../components/PageHeroSection';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';
import SuccessStoriesSection from '../components/SuccessStoriesSection';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';

export default function LoansMicrofinance() {
	const microfinanceSuccessStories = [
		{
			name: 'Maria Santos',
			title: 'Sari-Sari Store Owner',
			image: carouselImg2,
			alt: 'Maria Santos standing in front of her sari-sari store',
			location: 'Cagayan de Oro City',
			description:
				'Maria used microfinance to steadily expand her home-based sari-sari store, transforming it into a neighborhood staple and securing her family’s future.',
			paragraphs: [
				'Maria Santos started with just a handful of goods and a small wooden shelf outside her home. The profits were small, barely enough to cover the school fees of her two children.',
				'She faced frequent shortages and could not buy supplies in bulk, which made her prices less competitive. Wanting to grow, she turned to her local microfinance program.',
				'With an affordable loan, Maria was able to stock more products and even add a small refrigerator for drinks and ice cream. Customers began shopping more often and word of mouth spread.',
				'Regular repayments helped build her credit, and soon she was eligible for a second, larger loan. This funded renovations, including improved signage and a small covered seating area.',
				'Now, Maria is a resource in her community—not just for her products, but as an inspiration for other aspiring women entrepreneurs.'
			]
		},
		{
			name: 'Joel de la Cruz',
			title: 'Motorcycle Mechanic & Entrepreneur',
			image: carouselImg3,
			alt: 'Joel working at his outdoor motorcycle repair stall',
			location: 'Iligan City',
			description:
				'A small loan helped Joel establish his own roadside motorcycle repair stall, providing stable income and the confidence to someday expand into a full workshop.',
			paragraphs: [
				'Joel was well-known for fixing bikes in his barangay but always had to borrow tools from friends and work outside, rain or shine.',
				'When he learned about microfinance loans tailored for self-employed individuals, Joel attended a financial literacy seminar and decided to apply.',
				'The funds allowed him to purchase a starter set of quality tools and a used tent for cover, so he could work even during sudden downpours.',
				'Business picked up as word got out, and loyal clients told their friends. Joel kept records, paid his loan faithfully, and started saving for the next step.',
				'Today, Joel dreams of opening a real shop and hiring an assistant—opportunities made possible because microfinance gave him his first break.'
			]
		},
		{
			name: 'Leah Villanueva',
			title: 'Street Food Vendor',
			image: carouselImg1,
			alt: 'Leah preparing skewers at her lively street food cart',
			location: 'Malaybalay City',
			description:
				'A microfinance loan allowed Leah to turn her street food stall from a single cart into a thriving business, letting her support her family and pay for her children’s college education.',
			paragraphs: [
				'Before joining a microfinance group, Leah sold barbecue skewers and snacks from a makeshift cart, struggling to keep up with daily expenses.',
				'Through community networking, she learned about a loan product that required only a small group guarantee and offered flexible repayments.',
				'Her first loan went into buying a new cart and adding new street food varieties, which noticeably increased her daily customers.',
				'Thanks to repeat borrowing and prompt repayments, Leah accessed larger loans for bulk ingredients, lowering her costs and boosting her profits.',
				'Now, Leah has hired two neighbors, serves busy office areas at lunchtime, and is proud to have sent her eldest child to college—all through her hard work and a single microfinance opportunity.'
			]
		}
	];

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
					stories={microfinanceSuccessStories}
					brandColor="#396131"
					backgroundClassName="bg-emerald-50"
				/>
			</main>
		</>
	);
}
