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
import React from 'react';
import { ShieldCheckIcon } from '@phosphor-icons/react';

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
			<main className="flex flex-col gap-[40px] pb-[50px] lg:gap-[80px]">
				<section
					id="main"
					data-scroll
					className="mx-[10px] flex flex-col-reverse rounded-[8px] bg-white p-[20px] text-[#396131] drop-shadow-lg lg:flex-row lg:px-[80px] lg:py-[80px]"
				>
					<div className="flex flex-col gap-[20px] lg:w-3/5">
						<span className="text-[2rem]/[2rem] font-bold lg:text-[4rem]/[4rem]">
							Loans / Gold & Gems
						</span>
						<span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
							Secure quick cash with 1st Valley Bank’s Gold and Gems Loan—a hassle-free lending
							solution using your valuable jewelry as collateral. Enjoy low interest rates, fast
							approval, and flexible terms. Perfect for urgent needs or personal expenses. Your
							treasures stay safe while your finances stay strong.
						</span>
					</div>
					<div className="flex justify-center lg:w-2/5">
						<SketchLogoIcon className="h-auto w-[50%]" />
					</div>
				</section>
				<section id="description" className="px-[15px] text-white">
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
				</section>
				<section
					id="description-2"
					className="mx-[20px] flex flex-col-reverse justify-between gap-[20px] text-[#396131] lg:mx-[60px] lg:flex-row lg:gap-0"
				>
					<div className="flex flex-col gap-[50px] lg:w-3/5">
						<span className="text-[1.5rem]/[1.5rem] font-bold lg:text-[2.5rem]/[2.5rem]">
							Gold & Gems Loan Shines Bright
						</span>
						<span className="text-[1rem]/[1rem] font-semibold lg:text-[2rem]/[2rem]">
							Andre M. Ates, Product Manager
						</span>
						{[
							{
								header: '2023: Turnaround Year for Gold & Gems',
								description:
									'After the 3-year drought for Gold and Gems, where portfolio decreased, the product has recovered successfully with a 40M increase in 2023, its turnaround year. The increase was a result of the following: higher appraisal rate, innovative features, and concerted effort of the Gold & Gems team. '
							},
							{
								header: 'Why Choose 1st Valley Bank',
								description:
									'Several good reasons. Foremost is that aside from the advantages, one is assured that the Bank wants the borrower to regain possession of the item/s submitted as pledge. '
							},
							{
								header: 'Jewelry Business Loan',
								description:
									"This loan grants business funds to anyone with authentic jewelry pieces to submit as collateral. It's the fastest way to get credit. Just convert your idle jewelry pieces. Let them shine and sparkle in times of need."
							}
						].map((part, index) => (
							<div className="flex flex-col gap-[10px] lg:gap-[20px]" key={index}>
								<span className="text-[1rem]/[1rem] font-semibold lg:text-[1.5rem]/[2rem]">
									{part.header}
								</span>
								<span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
									{part.description}
								</span>
							</div>
						))}
					</div>
					<div className="flex justify-center lg:w-2/5">
						<img src={img1} alt="" className="h-full w-full rounded-[12px] object-cover lg:w-4/5" />
					</div>
				</section>
				<section
					id="who-can-apply"
					className="mx-[15px] flex flex-col gap-[50px] rounded-[10px] bg-[#396131] p-[30px] text-white drop-shadow-lg lg:p-[50px]"
				>
					<span className="text-center text-[1.5rem]/[1.5rem] font-bold lg:text-[2rem]/[2rem]">
						Advantages
					</span>
					<div className="grid grid-cols-2 gap-x-[1.25rem] gap-y-[1.25rem] lg:grid-cols-4 lg:gap-y-[50px]">
						{advantages.map((loan, index) => (
							<div className="flex flex-col items-center gap-[10px]" key={index}>
								<div className="flex">{loan.logo}</div>
								<span className="text-center text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
									{loan.description}
								</span>
							</div>
						))}
					</div>
				</section>
			</main>
		</>
	);
}
