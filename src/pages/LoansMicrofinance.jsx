import { ChartBarHorizontalIcon, ChartPieSliceIcon } from '@phosphor-icons/react/dist/ssr';
import React from 'react';
import HeroSection from '../components/HeroSection';
import img from '/src/assets/homepage/heroSectionImage.png';

export default function LoansMicrofinance() {
	return (
		<>
			<main className="flex flex-col gap-[80px] pb-[50px]">
				<HeroSection
					id="main"
					title="Loans / Microfinance"
					description="Credit program that provides affordable funds to micro-entrepreneurs or low-income individuals who wish to start or expand their business but have limited or no access to financial services."
					image={img}
					imageAlt="Microfinance Icon"
					className="mx-[10px]"
				/>
				<section id="description" className="px-[15px] text-white">
					<div className="flex flex-col gap-[20px] rounded-[8px] bg-[#396131] p-[30px] drop-shadow-lg lg:flex-row lg:gap-[80px] lg:px-[80px] lg:py-[60px]">
						<div className="flex items-center justify-center lg:w-2/5">
							<ChartBarHorizontalIcon className="h-auto w-[80%]" />
						</div>
						<div className="flex flex-col items-start justify-start gap-[10px] lg:w-3/5 lg:gap-[20px]">
							<span className="text-[1.5rem]/[1.5rem] font-bold text-white lg:text-[3rem]/[3rem]">
								Small Business Loans
							</span>
							<span className="text-[1rem]/[1.5rem] font-bold text-white lg:text-[2rem]/[2rem]">
								Increase your income with affordable funds
							</span>
							<span className="text-[0.8rem]/[2.4rem] text-white lg:text-[1rem]/[2.25rem]">
								Micro-entrepreneurs including the micro-entrepreneurial poor will benefit from this
								loan facility. This loan product allows them to have access to affordable funds they
								can use to expand their micro businesses.
							</span>
							<span className="text-[0.8rem]/[2.4rem] text-white">
								Borrowers will undergo basic class on money management such as understanding cash
								flow and interest rates, importance of savings and how a savings account work, how
								to stay out of debt, and how to make good use of ones funds from the loan.
							</span>
							<span className="text-[0.8rem]/[2.4rem] text-white">
								Our bank offers FAME or Financial Assistance to Micro Entrepreneurs and MICRO Plus,
								a special loan program for existing micro-finance clients.
							</span>
							<span className="text-[0.8rem]/[2.4rem] text-white">
								Both products come with a savings component. Our account officers are dedicated to
								assist the borrowers in ensuring that their businesses grow profitably.
							</span>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
