import {
	FarmIcon,
	CellTowerIcon,
	TractorIcon,
	LockKeyOpenIcon,
	CashRegisterIcon
} from '@phosphor-icons/react/dist/ssr';
import { TrendingUp, ArrowUpRight, Target } from 'lucide-react';
import img1 from '/src/assets/loans/sme/1.jpg';
import img2 from '/src/assets/homepage/2.png';
import img3 from '/src/assets/homepage/3.png';
import img4 from '/src/assets/homepage/4.png';
import img5 from '/src/assets/homepage/5.png';
import img6 from '/src/assets/homepage/6.png';
import PageHeroSection from '../components/PageHeroSection';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';
import SuccessStoriesSection from '../components/SuccessStoriesSection';
import React, { useState, useEffect } from 'react';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import carouselImg4 from '/src/assets/carousel/4.png';
import carouselImg5 from '/src/assets/carousel/5.png';
import carouselImg6 from '/src/assets/carousel/6.png';
import carouselImg7 from '/src/assets/carousel/7.png';
import loanService from '../services/loanService';
import successStoriesService from '../services/successStoriesService';

export default function LoansSME() {
	const [smeTypes, setSmeTypes] = useState([]);
	const [successStories, setSuccessStories] = useState([]);
	const [loading, setLoading] = useState(true);

	const getSmeTypes = async () => {
		try {
			const response = await loanService.getByType('sme');
			setSmeTypes(response.results);
		} catch (error) {
			console.error('Failed to fetch SME types:', error);
			setSmeTypes([]);
		} finally {
			setLoading(false);
		}
	};

	const getSuccessStories = async () => {
		try {
			const response = await successStoriesService.getByLoanType('sme');
			if (response.success && response.data) {
				const transformed = response.data.map((story) => ({
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
		getSmeTypes();
		getSuccessStories();
	}, []);

	// Carousel slides combining hero and SME loan types
	const smeSlides = [
		{
			title: 'Small and Medium Enterprise Loan',
			subtitle: 'Boost Your Business Today',
			description:
				'Loan facility that funds small and medium enterprises engaged in legitimate wholesale or retail businesses. Funds can be used for financing business expansion, purchasing new heavy equipment or vehicle, constructing new warehouse or building, and trade check discounting.',
			features: [],
			image: carouselImg1,
			imageAlt: 'SME Loan Overview',
			route: '/contact-us',
			buttonText: 'Apply Now',
			showButton: false
		},
		{
			title: 'SME Secured Loan',
			subtitle: 'Collateral-based financing',
			description:
				'A secured loan option for established businesses requiring collateral such as real estate or equipment. Offers competitive interest rates and flexible terms for business growth and expansion.',
			features: [],
			image: carouselImg2,
			imageAlt: 'SME Secured Loan',
			route: '/contact-us',
			buttonText: 'Apply Now'
		},
		{
			title: 'SME Chattel Financing',
			subtitle: 'Equipment and vehicle financing',
			description:
				'Specialized financing for the acquisition of movable assets like vehicles, machinery, and equipment. The financed asset serves as collateral for the loan.',
			features: [],
			image: carouselImg3,
			imageAlt: 'SME Chattel Financing',
			route: '/contact-us',
			buttonText: 'Apply Now'
		},
		{
			title: 'Check Rediscounting',
			subtitle: 'Convert checks to cash flow',
			description:
				'A financing facility that allows businesses to convert their post-dated checks into immediate cash flow. Perfect for bridging short-term liquidity gaps.',
			features: [],
			image: carouselImg4,
			imageAlt: 'Check Rediscounting',
			route: '/contact-us',
			buttonText: 'Apply Now'
		},
		{
			title: 'Back to Back Loan',
			subtitle: 'Deposit-backed financing',
			description:
				'A loan arrangement backed by deposits or securities held by the bank. Provides financing while maintaining your existing investments and earning potential.',
			features: [],
			image: carouselImg5,
			imageAlt: 'Back to Back Loan',
			route: '/contact-us',
			buttonText: 'Apply Now'
		}
	];

	return (
		<>
			<PageHeroSection
				pageSlug="loans-sme"
				brandColor="#396131"
				brandGradient="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
				minHeight="min-h-[600px] lg:min-h-[700px]"
				showLearnMoreButton={true}
				learnMoreText="Apply Now"
			/>

			{/* SME Subcategories */}
			<LoanSubcategoriesSection
				id="sme-types"
				sectionTitle="SME Loan Types"
				sectionSubtitle="Choose the SME loan that best fits your business needs and growth strategy"
				tagText="Loan Categories"
				loanTypes={smeTypes}
				ctaTitle="Need help choosing the right SME loan for your business?"
				ctaPrimaryText="Get Expert Consultation"
				ctaSecondaryText="View All Loans"
			/>

			<SuccessStoriesSection
				id="sme-success-stories"
				title="SME Success Stories"
				subtitle="Discover how our SME loan clients achieved their goals"
				stories={successStories}
				brandColor="#396131"
			/>

			<main className="flex flex-col gap-[80px] pb-[50px]">
				<section id="features" className="relative overflow-hidden bg-white py-20">
					{/* Background Elements */}
					{/* Removed gradient background and overlays for pure white bg */}

					<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-16 text-center">
							<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#396131]/10 px-6 py-3 text-sm font-semibold text-[#396131]">
								<span className="h-2 w-2 animate-pulse rounded-full bg-[#396131]"></span>
								Performance Metrics
							</div>

							<h2 className="mb-6 text-4xl leading-tight font-bold text-[#396131] md:text-5xl">
								SME Loan Performance
							</h2>

							<p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-700">
								Proven track record of success and growth in supporting small and medium enterprises
							</p>
						</div>

						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
							{[
								{
									icon: Target,
									metric: '24.23%',
									header: 'Portfolio Growth',
									description:
										'Impressive growth against 2022 with a delinquency ratio of only 2.51%',
									color: 'from-green-500 to-emerald-600'
								},
								{
									icon: ArrowUpRight,
									metric: '#1',
									header: 'Top Contributor',
									description: 'SME remains the biggest growth contributor among 1VB push products',
									color: 'from-blue-500 to-cyan-600'
								},
								{
									icon: TrendingUp,
									metric: '11 Years',
									header: 'Consistent Growth',
									description: 'The product enjoys an unbroken streak of portfolio increase',
									color: 'from-purple-500 to-violet-600'
								}
							].map((feature, index) => (
								<div
									key={index}
									className="group relative rounded-2xl border border-gray-200 bg-gray-50 p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-gray-100"
								>
									<div className="text-center">
										{/* Icon */}
										<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#396131]/10 transition-transform duration-300 group-hover:scale-110">
											<feature.icon className="h-10 w-10 text-[#396131]" />
										</div>

										{/* Title */}
										<h3 className="mb-3 text-xl font-bold text-[#396131]">{feature.header}</h3>

										{/* Description */}
										<p className="text-sm leading-relaxed text-gray-700">{feature.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
