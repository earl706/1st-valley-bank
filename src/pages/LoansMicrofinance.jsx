import {
  ChartBarHorizontalIcon,
  ChartPieSliceIcon,
} from "@phosphor-icons/react/dist/ssr";
import React from "react";

export default function LoansMicrofinance() {
  return (
    <>
      <main className="flex flex-col gap-[80px] pb-[50px]">
        <section
          id="main"
          data-scroll
          className="flex flex-col-reverse lg:flex-row text-[#396131] bg-white drop-shadow-lg gap-[20px] rounded-[8px] p-[30px] lg:py-[80px] lg:px-[80px] mx-[10px]"
        >
          <div className="flex flex-col gap-[20px] lg:w-3/5">
            <span className="text-[2rem]/[2rem] lg:text-[4rem]/[4rem] font-bold">
              Loans / Microfinance
            </span>
            <span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
              Credit program that provides affordable funds to
              micro-entrepreneurs or low-income individuals who wish to start or
              expand their business but have limited or no access to financial
              services.
            </span>
          </div>
          <div className="flex items-center justify-center lg:w-2/5">
            <ChartPieSliceIcon className="w-[60%] h-auto" />
          </div>
        </section>
        <section id="description" className="px-[15px] text-white">
          <div className="flex flex-col lg:flex-row lg:px-[80px] p-[30px] lg:py-[60px] gap-[20px] lg:gap-[80px] bg-[#396131] rounded-[8px] drop-shadow-lg">
            <div className="flex items-center justify-center lg:w-2/5">
              <ChartBarHorizontalIcon className="w-[80%] h-auto" />
            </div>
            <div className="flex flex-col items-start justify-start gap-[10px] lg:gap-[20px] lg:w-3/5">
              <span className="text-white font-bold text-[1.5rem]/[1.5rem] lg:text-[3rem]/[3rem]">
                Small Business Loans
              </span>
              <span className="text-white font-bold text-[1rem]/[1.5rem] lg:text-[2rem]/[2rem]">
                Increase your income with affordable funds
              </span>
              <span className="text-white text-[0.8rem]/[2.4rem] lg:text-[1rem]/[2.25rem]">
                Micro-entrepreneurs including the micro-entrepreneurial poor
                will benefit from this loan facility. This loan product allows
                them to have access to affordable funds they can use to expand
                their micro businesses.
              </span>
              <span className="text-white text-[0.8rem]/[2.4rem]">
                Borrowers will undergo basic class on money management such as
                understanding cash flow and interest rates, importance of
                savings and how a savings account work, how to stay out of debt,
                and how to make good use of ones funds from the loan.
              </span>
              <span className="text-white text-[0.8rem]/[2.4rem]">
                Our bank offers FAME or Financial Assistance to Micro
                Entrepreneurs and MICRO Plus, a special loan program for
                existing micro-finance clients.
              </span>
              <span className="text-white text-[0.8rem]/[2.4rem]">
                Both products come with a savings component. Our account
                officers are dedicated to assist the borrowers in ensuring that
                their businesses grow profitably.
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
