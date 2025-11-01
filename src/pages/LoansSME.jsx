import {
	FarmIcon,
	CellTowerIcon,
	TractorIcon,
	LockKeyOpenIcon,
	CashRegisterIcon
} from '@phosphor-icons/react/dist/ssr';
import { LucideChartCandlestick, TrendingUp, ArrowUpRight, Target } from 'lucide-react';
import img1 from '/src/assets/loans/sme/1.jpg';
import img2 from '/src/assets/homepage/2.png';
import img3 from '/src/assets/homepage/3.png';
import img4 from '/src/assets/homepage/4.png';
import img5 from '/src/assets/homepage/5.png';
import img6 from '/src/assets/homepage/6.png';
import HeroSection from '../components/HeroSection';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';
import CarouselSection from '../components/CarouselSection';
import SuccessStoriesSection from '../components/SuccessStoriesSection';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import carouselImg4 from '/src/assets/carousel/4.png';
import carouselImg5 from '/src/assets/carousel/5.png';
import carouselImg6 from '/src/assets/carousel/6.png';
import carouselImg7 from '/src/assets/carousel/7.png';
import loanService from '../services/loanService';

export default function LoansSME() {
	const [smeTypes, setSmeTypes] = useState([]);
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

	useEffect(() => {
		getSmeTypes();
	}, []);

	/* const smeTypes = [
		{
			title: 'SME Secured Loan',
			description:
				'A secured loan option for established businesses requiring collateral such as real estate or equipment. Offers competitive interest rates and flexible terms for business growth and expansion.',

			features: ['feature 1', 'feature 2', 'feature 3'],
			requirements: ['requirement 1', 'requirement 2', 'requirement 3'],
			term_options: ['6 months', '12 months'],
			interest_rate: '6.5% - 8.5%',
			min_amount: 10000,
			max_amount: 100000,
			interest_rate_below: 6.5,
			interest_rate_above: 8.5,
			term_min_months: 6,
			image: carouselImg7,
			route: '/contact-us'
		},
		{
			title: 'SME Chattel Financing',
			description:
				'Specialized financing for the acquisition of movable assets like vehicles, machinery, and equipment. The financed asset serves as collateral for the loan.',

			features: ['feature 1', 'feature 2', 'feature 3'],
			requirements: ['requirement 1', 'requirement 2', 'requirement 3'],
			term_options: ['6 months', '12 months'],
			interest_rate: '6.5% - 8.5%',
			min_amount: 10000,
			max_amount: 100000,
			interest_rate_below: 6.5,
			interest_rate_above: 8.5,
			term_min_months: 6,
			image: carouselImg7,
			route: '/contact-us'
		},
		{
			title: 'Check Rediscounting',
			description:
				'A financing facility that allows businesses to convert their post-dated checks into immediate cash flow. Perfect for bridging short-term liquidity gaps.',

			features: ['feature 1', 'feature 2', 'feature 3'],
			requirements: ['requirement 1', 'requirement 2', 'requirement 3'],
			term_options: ['6 months', '12 months'],
			interest_rate: '6.5% - 8.5%',
			min_amount: 10000,
			max_amount: 100000,
			interest_rate_below: 6.5,
			interest_rate_above: 8.5,
			term_min_months: 6,
			image: carouselImg7,
			route: '/contact-us'
		},
		{
			title: 'Back to Back Loan',
			description:
				'A loan arrangement backed by deposits or securities held by the bank. Provides financing while maintaining your existing investments and earning potential.',

			features: ['feature 1', 'feature 2', 'feature 3'],
			requirements: ['requirement 1', 'requirement 2', 'requirement 3'],
			term_options: ['6 months', '12 months'],
			interest_rate: '6.5% - 8.5%',
			min_amount: 10000,
			max_amount: 100000,
			interest_rate_below: 6.5,
			interest_rate_above: 8.5,
			term_min_months: 6,
			image: carouselImg7,
			route: '/contact-us'
		}
	];
	*/
	const smallBusinessLoans = [
		{
			type: 'TERM LOAN',
			logo: <LucideChartCandlestick size={70} />,
			description:
				'This is for long-term investments such as construction, renovation/improvement, acquiring new assets, equipment and/or vehicle for business use. This product is fully secured by a collateral in a form of real estate or vehicle/equipment.'
		},
		{
			type: 'CREDIT LINE',
			logo: <CellTowerIcon size={70} />,
			description:
				'This is for short-term needs such as for working or additional capitalization for their business. This product is fully secured by collateral in a form of real estate vehicle/equipment.'
		},
		{
			type: 'CHATTEL FINANCING',
			logo: <TractorIcon size={70} />,
			description:
				'This is for the acquisition of trucks and heavy equipment and/or vehicle for their business use. This product is fully secured by the unit to be financed or with additional real estate collateral.'
		},
		{
			type: 'UNSECURED',
			logo: <LockKeyOpenIcon size={70} />,
			description:
				'This is for short-term needs such as for working or additional capitalization for their business. Collaterals in the form of real estate or vehicle/equipment are for safe- keeping only.'
		},
		{
			type: 'BILLS/CHECK REDISCOUNTING',
			logo: <CashRegisterIcon size={70} />,
			description:
				'This is for bridging the gap between their immediate cash needs and the clearing of their postdated checks for their cashflow.'
		}
	];

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

	// SME success stories data
	const smeSuccessStories = [
		{
			img: img1,
			alt: 'Golden Sunrise Eatery',
			name: 'Jenny Uy',
			location: 'Owner, Golden Sunrise Eatery, Iligan',
			description:
				'Jenny transformed her small carinderia into a thriving family eatery thanks to an SME Chattel Financing loan from 1st Valley Bank.',
			route: '/success-stories/golden-sunrise-eatery',
			paragraphs: [
				"Running a carinderia was never easy for Jenny Uy until she accessed 1st Valley Bank's SME Chattel Financing. With new kitchen equipment and a delivery van, she was able to serve more customers and expand into catering services.",
				'"1st Valley Bank understood my needs and offered flexible payment terms. My family business is now thriving more than ever."',
				'Jenny has since opened a second branch and employs 7 staff from her local community.'
			]
		},
		{
			img: img2,
			alt: 'TechParts Distributor',
			name: 'Rodolfo Sarmiento',
			location: 'Proprietor, TechParts Distributor, CDO',
			description:
				'Rodolfo scaled up his electronics parts distribution business, improving inventory and logistics with an SME Term Loan.',
			route: '/success-stories/techparts-distributor',
			paragraphs: [
				'Rodolfo saw demand surging for affordable electronics parts in Northern Mindanao, but cash flow was tight. A Term Loan from 1st Valley Bank let him bulk-purchase inventory and upgrade his warehouse.',
				'He reports, "The bank became a real partner. Now I can deliver bigger orders to clients on time, and revenues have doubled since last year."'
			]
		},
		{
			img: img3,
			alt: 'Moments Flower Shop',
			name: 'Clarissa Bustamante',
			location: 'Owner, Moments Flower Shop, Pagadian',
			description:
				'Clarissa turned her passion for flowers into a full-service shop with upgraded delivery and cool storage, thanks to SME financing.',
			route: '/success-stories/moments-flower-shop',
			paragraphs: [
				'Clarissa operated her flower stall in the public market for years. Through 1st Valley Bank and an SME loan, she bought her first delivery motorcycle and invested in a small cold room, extending product freshness.',
				'"Customers now rely on us for weddings, anniversaries and even online orders. This loan was a game changer!"'
			]
		}
	];

	return (
		<>
			<CarouselSection
				id="sme-carousel"
				slides={smeSlides}
				autoPlay={true}
				autoPlayInterval={6000}
				backgroundColor="from-purple-50 via-white to-indigo-50"
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
				stories={smeSuccessStories}
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
