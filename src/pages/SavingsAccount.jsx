import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DarkCard } from '../components/Card';
import { DarkPrimaryButton } from '../components/Buttons';
import { ArrowLeft, Users, Building, User, DollarSign, ArrowRight } from 'lucide-react';
import PageHeroSection from '../components/PageHeroSection';
import CarouselSection from '../components/CarouselSection';
import { DarkHeader, LightHeader } from '../components/Header';
import { getSavingsAccounts } from '../services/depositService';

export default function SavingsAccount() {
	const [savingsAccounts, setSavingsAccounts] = useState([]);

	useEffect(() => {
		getSavingsAccounts().then((response) => {
			setSavingsAccounts(response.results);
		});
	}, []);

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
										<h3 className="mt-2 mb-4 text-center text-2xl leading-tight font-bold text-white">
											{account.name}
										</h3>
										<p className="mb-6 text-center text-base leading-relaxed font-normal text-white/80">
											{account.description}
										</p>
										<div className="mb-6 space-y-3">
											<div className="flex justify-between">
												<span className="text-sm leading-relaxed font-normal text-white/70">
													Initial Deposit:
												</span>
												<span className="text-sm leading-relaxed font-bold text-white">
													{account.required_initial_deposit}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm leading-relaxed font-normal text-white/70">
													Minimum Balance:
												</span>
												<span className="text-sm leading-relaxed font-bold text-white">
													{account.required_monthly_adb}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm leading-relaxed font-normal text-white/70">
													Interest Rate:
												</span>
												<span className="text-sm leading-relaxed font-bold text-white">
													{account.interest_rate_below}% - {account.interest_rate_above}%
												</span>
											</div>
										</div>
										<DarkPrimaryButton
											to={account.route || `/contact-us`}
											className="mt-auto flex w-full"
											secondaryIcon={
												<ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
											}
										>
											Open Account
										</DarkPrimaryButton>
									</div>
								</DarkCard>
							))}
						</div>
					</div>
				</section>

				{/* Requirements Section */}
				<section id="requirements" data-scroll className="bg-white text-gray-900">
					<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
						<LightHeader
							badgeText="Savings Accounts"
							title="Requirements"
							subtitle="What you need to open a savings account"
							alignment="left"
							level={3}
						/>

						<div className="grid gap-8 md:grid-cols-2">
							<div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
								<div className="mb-6 flex items-center gap-4">
									<User className="h-8 w-8 text-gray-400" />
									<h3 className="text-2xl leading-tight font-bold">Individual Requirements</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Colored photocopy of 2 Valid IDs
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Three pieces 2x2 pictures
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											If you have business - Business Permit, DTI Permit
										</span>
									</li>
								</ul>
							</div>

							<div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
								<div className="mb-6 flex items-center gap-4">
									<Building className="h-8 w-8 text-gray-400" />
									<h3 className="text-2xl leading-tight font-bold">Corporate Requirements</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											SEC Certificate of Registration
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Notarized Secretary Certificate
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Articles Of Incorporation & By-Laws
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Notarized Board Resolution
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Two Valid IDs of Signatories
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">Business Permit</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
