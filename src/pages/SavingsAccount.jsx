import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DarkCard } from '../components/Card';
import { DarkPrimaryButton, LightPrimaryButton } from '../components/Buttons';
import { ArrowLeft, Users, Building, User, DollarSign, ArrowRight } from 'lucide-react';
import PageHeroSection from '../components/PageHeroSection';
import CarouselSection from '../components/CarouselSection';
import { DarkHeader, LightHeader } from '../components/Header';
import RequirementsSection from '../components/RequirementsSection';
import { getSavingsAccounts, getProductTypeRequirements } from '../services/depositService';
import { ProductListingPageSkeleton } from '../components/PageSkeleton';

export default function SavingsAccount() {
	const [savingsAccounts, setSavingsAccounts] = useState([]);
	const [requirements, setRequirements] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [accountsResponse, requirementsData] = await Promise.all([
					getSavingsAccounts(),
					getProductTypeRequirements('savings')
				]);
				setSavingsAccounts(accountsResponse.results);
				setRequirements(requirementsData.requirements || []);
			} catch (error) {
				console.error('Error fetching savings account data:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	// Show skeleton on initial load
	if (loading && savingsAccounts.length === 0) {
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
			<main className="flex flex-col">
				<PageHeroSection pageSlug="deposits-savings-account" />
				{/* Savings Accounts Carousel */}

				<section
					id="accounts"
					data-scroll
					className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-24 text-white"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<DarkHeader
							badgeText="Categories"
							title="Savings Accounts"
							subtitle="Find the perfect savings account for your needs"
							alignment="center"
							level={2}
							className="mb-16"
						/>

						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{savingsAccounts.map((account, index) => (
								<DarkCard key={index} className="h-full" useNativeSpacing={true}>
									{/* Emphasize image: make it a top banner */}
									<div className="flex h-40 w-full items-center justify-center">
										<img
											src={account.image}
											alt={`${account.title} visual`}
											className="h-28 w-auto object-contain"
										/>
									</div>
									<div className="flex w-full flex-1 flex-col p-8">
										<h3 className="mt-2 mb-4 text-center text-2xl leading-tight font-bold text-[#396131]">
											{account.name}
										</h3>
										<p className="mb-6 text-center text-base leading-relaxed font-normal text-[#396131]/80">
											{account.description}
										</p>
										<div className="mb-6 space-y-3">
											<div className="flex justify-between">
												<span className="text-sm leading-relaxed font-normal text-[#396131]/70">
													Initial Deposit:
												</span>
												<span className="text-sm leading-relaxed font-bold text-[#396131]">
													{account.required_initial_deposit}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm leading-relaxed font-normal text-[#396131]/70">
													Minimum Balance:
												</span>
												<span className="text-sm leading-relaxed font-bold text-[#396131]">
													{account.required_monthly_adb}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm leading-relaxed font-normal text-[#396131]/70">
													Interest Rate:
												</span>
												<span className="text-sm leading-relaxed font-bold text-[#396131]">
													{account.interest_rate_below}% - {account.interest_rate_above}%
												</span>
											</div>
										</div>
										<LightPrimaryButton
											to={account.route || `/contact-us`}
											className="mt-auto flex w-full"
											secondaryIcon={
												<ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 text-white" />
											}
										>
											Open Account
										</LightPrimaryButton>
									</div>
								</DarkCard>
							))}
						</div>
					</div>
				</section>

				{/* Requirements Section */}
				{requirements.length > 0 && (
					<RequirementsSection
						requirements={requirements}
						title="Requirements"
						subtitle="What you need to open a savings account"
						badgeText="Savings Accounts"
						layout="two-column"
						showIcons={true}
					/>
				)}
			</main>
		</>
	);
}
