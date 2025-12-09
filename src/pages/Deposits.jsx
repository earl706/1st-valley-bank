import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import PageHeroSection from '../components/PageHeroSection';
import { PiggyBank, CreditCard, TrendingUp } from 'lucide-react';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import { DarkCard } from '../components/Card';
import { LightPrimaryButton } from '../components/Buttons';
import { DarkHeader } from '../components/Header';
import { getAllDepositProducts } from '../services/depositService';
import { ProductListingPageSkeleton } from '../components/PageSkeleton';

// Mapping product types to category metadata
const PRODUCT_TYPE_METADATA = {
	savings: {
		id: 'savings-account',
		title: 'Savings Account',
		category: 'Personal Banking',
		icon: PiggyBank,
		defaultImage: carouselImg1,
		route: '/deposits/savings-account',
		buttonText: 'Explore Savings Accounts',
		layout: 'left',
		featureLabel: 'Account Types Available'
	},
	checking: {
		id: 'checking-account',
		title: 'Checking Account',
		category: 'Business Banking',
		icon: CreditCard,
		defaultImage: carouselImg2,
		route: '/deposits/checking-account',
		buttonText: 'Explore Checking Accounts',
		layout: 'right',
		featureLabel: 'Account Types Available'
	},
	time_deposit: {
		id: 'time-deposit',
		title: 'Time Deposit',
		category: 'Investment',
		icon: TrendingUp,
		defaultImage: carouselImg3,
		route: '/deposits/time-deposit',
		buttonText: 'Explore Time Deposits',
		layout: 'left',
		featureLabel: 'Available Terms'
	}
};

export default function Deposits() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchDepositProducts = async () => {
			try {
				setLoading(true);
				setError(null);

				// Fetch all active deposit products (override pagination to get all)
				const response = await getAllDepositProducts({
					is_active: true,
					ordering: 'display_order',
					fetchAll: true, // Fetch all products, not just first page
					page_size: 1000 // Large page size to minimize requests
				});

				// Group products by product_type
				const productsByType = {};
				if (response.results && Array.isArray(response.results)) {
					response.results.forEach((product) => {
						const productType = product.product_type;
						if (!productsByType[productType]) {
							productsByType[productType] = [];
						}
						productsByType[productType].push(product);
					});
				}

				// Transform grouped data into products array
				const transformedProducts = Object.keys(PRODUCT_TYPE_METADATA)
					.filter((type) => productsByType[type] && productsByType[type].length > 0)
					.map((type) => {
						const metadata = PRODUCT_TYPE_METADATA[type];
						const typeProducts = productsByType[type];

						// Get features from all products of this type (product names)
						const features = typeProducts.map((p) => p.name);

						// Get description from first product or use a default
						const description =
							typeProducts[0]?.description ||
							`Explore our ${metadata.title.toLowerCase()} options designed to meet your financial needs.`;

						// Get image from first product that has one, or use default
						const image = typeProducts.find((p) => p.image)?.image || metadata.defaultImage;

						// Calculate additional info (count of products)
						const additionalInfo =
							typeProducts.length > 6
								? `+ ${typeProducts.length - 6} more ${type === 'time_deposit' ? 'terms' : 'accounts'}`
								: null;

						return {
							...metadata,
							description,
							features: features.slice(0, 6), // Show first 6 features
							additionalInfo,
							image,
							featureLabel: metadata.featureLabel
						};
					});

				setProducts(transformedProducts);
			} catch (err) {
				console.error('Error fetching deposit products:', err);
				setError('Failed to load deposit products. Please try again later.');
				// Fallback to empty array or default products if needed
				setProducts([]);
			} finally {
				setLoading(false);
			}
		};

		fetchDepositProducts();
	}, []);

	// Show skeleton on initial load
	if (loading && products.length === 0) {
		return (
			<ProductListingPageSkeleton
				showHero={true}
				showCarousel={false}
				showProductGrid={true}
				productColumns={1}
				productRows={3}
				variant="dark"
			/>
		);
	}

	return (
		<>
			<main className="flex flex-col">
				{/* Deposits Carousel Hero Section */}
				<PageHeroSection
					pageSlug="deposits"
					brandColor="#396131"
					brandGradient="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
					minHeight="min-h-[560px] lg:min-h-[640px]"
					showLearnMoreButton={true}
					learnMoreText="Learn More"
				/>
				{/* Products Showcase Section */}
				<section
					id="products"
					data-scroll
					className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-24"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						{/* Section Header */}
						<DarkHeader
							badgeText="Products"
							title="DEPOSITS"
							subtitle="Choose the perfect deposit solution for your financial goals and start building your wealth today"
							alignment="center"
							level={2}
							className="mb-16"
						/>

						{/* Products Array */}
						{error ? (
							<div className="flex min-h-[400px] items-center justify-center">
								<div className="text-center">
									<p className="text-lg text-white/90">{error}</p>
									<p className="mt-2 text-sm text-white/70">
										Please refresh the page or contact support if the problem persists.
									</p>
								</div>
							</div>
						) : products.length === 0 ? (
							<div className="flex min-h-[400px] items-center justify-center">
								<div className="text-center">
									<p className="text-lg text-white/90">
										No deposit products available at this time.
									</p>
								</div>
							</div>
						) : (
							<div className="space-y-16">
								{products.map((product, index) => {
									const IconComponent = product.icon;
									const isLeftLayout = product.layout === 'left';

									return (
										<DarkCard key={product.id}>
											<div className="grid min-h-[400px] grid-cols-1 lg:grid-cols-2">
												{/* Content Side */}
												<div
													className={`flex flex-col justify-center p-8 lg:p-12 ${isLeftLayout ? '' : 'lg:order-2'}`}
												>
													<div className="mb-6 flex items-center gap-4">
														<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#396131] to-[#4a7c3a] shadow-lg">
															<IconComponent className="h-8 w-8 text-white" />
														</div>
														<div>
															<div className="text-sm leading-tight font-semibold tracking-wider text-white uppercase">
																{product.category}
															</div>
															<h3 className="text-3xl leading-tight font-bold text-white md:text-3xl">
																{product.title}
															</h3>
														</div>
													</div>
													<p className="mb-8 text-base leading-relaxed font-normal text-white">
														{product.description}
													</p>
													<div className="mb-8">
														<h4 className="mb-4 text-2xl leading-tight font-bold tracking-wider text-white uppercase">
															{product.featureLabel}
														</h4>
														<div
															className={`grid grid-cols-1 gap-3 ${product.features.length > 3 ? 'sm:grid-cols-2' : ''}`}
														>
															{product.features.map((feature, featureIndex) => (
																<div key={featureIndex} className="flex items-center gap-3">
																	<div className="h-2 w-2 rounded-full bg-white"></div>
																	<span className="text-base leading-relaxed font-normal text-white">
																		{feature}
																	</span>
																</div>
															))}
														</div>
														{product.additionalInfo && (
															<div className="mt-3 text-base leading-relaxed font-bold text-white">
																{product.additionalInfo}
															</div>
														)}
													</div>
													<LightPrimaryButton
														to={product.route}
														className="w-fit"
														secondaryIcon={
															<ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
														}
													>
														{product.buttonText}
													</LightPrimaryButton>
												</div>
												{/* Visual Side */}
												<div
													className={`relative flex items-center justify-center p-8 lg:p-12 ${isLeftLayout ? 'lg:order-2' : 'lg:order-1'}`}
												>
													<div className="relative">
														<div className="absolute inset-0 rounded-3xl"></div>
														<img
															src={product.image}
															alt={`${product.title} Visual`}
															className="relative z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
														/>
													</div>
												</div>
											</div>
										</DarkCard>
									);
								})}
							</div>
						)}
					</div>
				</section>
			</main>
		</>
	);
}
