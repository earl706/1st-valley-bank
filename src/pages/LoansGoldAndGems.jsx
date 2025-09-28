import {
	CreditCardIcon,
	DetectiveIcon,
	MoneyWavyIcon,
	PlusMinusIcon,
	ProjectorScreenChartIcon,
	ShareNetworkIcon,
	SketchLogoIcon,
	TrendDownIcon,
	TrendUpIcon
} from '@phosphor-icons/react/dist/ssr';
import img1 from '/src/assets/loans/gold-and-gems/1.jpg';
import img3 from '/src/assets/homepage/3.png';
import React from 'react';
import { ShieldCheckIcon } from '@phosphor-icons/react';
import HeroSection from '../components/HeroSection';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';

export default function LoansGoldAndGems() {
	const advantages = [
		{
			logo: <TrendUpIcon size={100} />,
			description: 'High Appraisal'
		},
		{
			logo: <TrendDownIcon size={100} />,
			description: 'Lowest Interest Rate'
		},
		{
			logo: <ProjectorScreenChartIcon size={100} />,
			description: 'Longer Term'
		},
		{
			logo: <ShareNetworkIcon size={100} />,
			description: 'Flexible Repayment Term'
		},
		{
			logo: <PlusMinusIcon size={100} />,
			description: 'No Service Charge'
		},
		{
			logo: <ShieldCheckIcon size={100} />,
			description: 'Safety'
		},
		{
			logo: <DetectiveIcon size={100} />,
			description: 'Confidentiality'
		},
		{
			logo: <CreditCardIcon size={100} />,
			description: 'Remote Payment'
		}
	];

	return (
		<>
			<HeroSection
				title="Gold & Gems"
				subtitle="Secure Quick Cash"
				description="Individual borrowers may pledge their genuine pieces of jewelry for instant cash for personal purposes. This is through the Gold & Gems jewelry loan. Interest rates are most affordable, and the term is guaranteed to be flexible."
				features={[]}
				image={img3}
				imageAlt="Gold & Gems"
				ctaText="Apply Now"
				ctaLink="/contact-us"
			/>
			<main className="flex flex-col pb-[50px]">
				{/* <section id="description" className="px-[15px] text-white">
					<div className="flex flex-col rounded-[8px] bg-[#396131] p-[30px] drop-shadow-lg lg:flex-row lg:gap-[80px] lg:px-[80px] lg:py-[60px]">
						<div className="flex justify-center lg:w-2/5">
							<MoneyWavyIcon className="h-auto w-[50%]" />
						</div>
						<div className="flex flex-col items-start justify-start gap-[20px] lg:w-3/5 lg:gap-[50px]">
							<div className="flex flex-col gap-[20px]">
								<span className="text-[1.5rem]/[1.5rem] font-bold text-white lg:text-[3rem]/[3rem]">
									Gold & Gems
								</span>
								<span className="text-[0.8rem]/[2.4rem] text-white">
									Individual borrowers may pledge their genuine pieces of jewelry for instant cash
									for personal purposes. This is through the Gold & Gems jewelry loan. Interest
									rates are most affordable, and the term is guaranteed to be flexible.
								</span>
							</div>
							<div className="flex flex-col gap-[20px]">
								<span className="text-[1.5rem]/[1.5rem] font-bold text-white lg:text-[3rem]/[3rem]">
									Jewelry Loan
								</span>
								<span className="text-[0.8rem]/[2.4rem] text-white">
									For quick cash, borrowers may find their emergency fix in 1VB's jewelry business
									loan. All clients need are authentic jewelry items. Clients may exchange these
									items for cash that they can use to expand their businesses.
								</span>
							</div>
						</div>
					</div>
				</section> */}

				<section
					id="advantages"
					className="relative overflow-hidden bg-gradient-to-br from-[#396131] to-[#2d4a26] py-20"
				>
					<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-16 text-center">
							<h2 className="mb-6 text-4xl leading-tight font-bold text-white md:text-5xl">
								Advantages
							</h2>
						</div>

						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
							{advantages.map((advantage, index) => (
								<div
									key={index}
									className="group relative rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/15"
								>
									<div className="text-center">
										{/* Icon */}
										<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl text-white transition-transform duration-300 group-hover:scale-110">
											{advantage.logo}
										</div>

										{/* Description */}
										<p className="text-sm leading-relaxed text-white/80">{advantage.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
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
			</main>
		</>
	);
}
