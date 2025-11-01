import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import CarouselSection from '../components/CarouselSection';
import { PiggyBank, CreditCard, TrendingUp } from 'lucide-react';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import { DarkCard } from '../components/Card';
import { LightPrimaryButton } from '../components/Buttons';
import { DarkHeader } from '../components/Header';

export default function Deposits() {
	const slides = [
		{
			title: 'Savings Account',
			subtitle: 'Building your financial future',
			description:
				'Choose from 9 different savings account types tailored to meet your specific financial goals and life stage.',
			features: [
				'Regular Savings',
				'Kiddie and Teens Savings',
				'SSD Regular Savings',
				'SSD Microfinance Savings',
				'SD Handog Savings',
				'Basic Deposit Account',
				'Payroll Served',
				'ATM Savings',
				'Student ATM Savings'
			],
			image: carouselImg1,
			imageAlt: 'Savings Account',
			route: '/deposits/savings-account'
		},
		{
			title: 'Checking Account',
			subtitle: 'Convenient business banking',
			description:
				'Professional checking solutions designed for businesses and individuals who need frequent transactions and check-writing capabilities.',
			features: [
				'Personal Checking Account',
				'Business/Corporate Checking Account',
				'Premium Checking Account'
			],
			image: carouselImg2,
			imageAlt: 'Checking Account',
			route: '/deposits/checking-account'
		},
		{
			title: 'Time Deposit',
			subtitle: 'Higher returns, guaranteed',
			description:
				'Secure your future with fixed-term deposits offering competitive interest rates and guaranteed returns on your investment.',
			features: [
				'SD Plus 3 Months',
				'SD Plus 6 Months',
				'SD Plus 1 Year',
				'SD Plus 5 Years and 1 Day'
			],
			image: carouselImg3,
			imageAlt: 'Time Deposit',
			route: '/deposits/time-deposit'
		}
	];

	const products = [
		{
			id: 'savings-account',
			title: 'Savings Account',
			category: 'Personal Banking',
			description:
				'Choose from 9 different savings account types tailored to meet your specific financial goals and life stage. From regular savings to specialized accounts for students and kids.',
			features: [
				'Regular Savings',
				'Kiddie & Teens Savings',
				'SSD Regular Savings',
				'SSD Microfinance Savings',
				'SD Hendog Savings',
				'Basic Deposit Account'
			],
			additionalInfo: '+ 3 more specialized accounts',
			icon: PiggyBank,
			image: carouselImg1,
			route: '/deposits/savings-account',
			buttonText: 'Explore Savings Accounts',
			layout: 'left' // content left, visual right
		},
		{
			id: 'checking-account',
			title: 'Checking Account',
			category: 'Business Banking',
			description:
				'Professional checking solutions designed for businesses and individuals who need frequent transactions and check-writing capabilities. Perfect for daily business operations.',
			features: [
				'Personal Checking Account',
				'Business/Corporate Checking Account',
				'Premium Checking Account'
			],
			additionalInfo: null,
			icon: CreditCard,
			image: carouselImg2,
			route: '/deposits/checking-account',
			buttonText: 'Explore Checking Accounts',
			layout: 'right' // visual left, content right
		},
		{
			id: 'time-deposit',
			title: 'Time Deposit',
			category: 'Investment',
			description:
				'Secure your future with fixed-term deposits offering competitive interest rates and guaranteed returns on your investment. Higher yields for your savings.',
			features: [
				'SD Plus 3 Months',
				'SD Plus 6 Months',
				'SD Plus 1 Year',
				'SD Plus 5 Years and 1 Day'
			],
			additionalInfo: null,
			icon: TrendingUp,
			image: carouselImg3,
			route: '/deposits/time-deposit',
			buttonText: 'Explore Time Deposits',
			layout: 'left' // content left, visual right
		}
	];

	return (
		<>
			<main className="flex flex-col">
				{/* Deposits Carousel Hero Section */}
				<CarouselSection
					id="main"
					slides={slides}
					autoPlay={true}
					autoPlayInterval={5000}
					backgroundColor="from-slate-50 via-white to-green-50"
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
						{(() => {
							return (
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
																{product.id === 'time-deposit'
																	? 'Available Terms'
																	: 'Account Types Available'}
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
							);
						})()}
					</div>
				</section>
			</main>
		</>
	);
}
