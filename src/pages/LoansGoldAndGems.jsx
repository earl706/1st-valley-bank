import {
  CreditCardIcon,
  DetectiveIcon,
  MoneyWavyIcon,
  PlusMinusIcon,
  ProjectorScreenChartIcon,
  ShareNetworkIcon,
  SketchLogoIcon,
  TrendDownIcon,
  TrendUpIcon,
} from "@phosphor-icons/react/dist/ssr";
import img1 from "/src/assets/loans/gold-and-gems/1.jpg";
import React from "react";
import { ShieldCheckIcon } from "@phosphor-icons/react";

export default function LoansGoldAndGems() {
  const advantages = [
    {
      logo: <TrendUpIcon size={100} />,
      description: "High Appraisal",
    },
    {
      logo: <TrendDownIcon size={100} />,
      description: "Lowest Interest Rate",
    },
    {
      logo: <ProjectorScreenChartIcon size={100} />,
      description: "Longer Term",
    },
    {
      logo: <ShareNetworkIcon size={100} />,
      description: "Flexible Repayment Term",
    },
    {
      logo: <PlusMinusIcon size={100} />,
      description: "No Service Charge",
    },
    {
      logo: <ShieldCheckIcon size={100} />,
      description: "Safety",
    },
    {
      logo: <DetectiveIcon size={100} />,
      description: "Confidentiality",
    },
    {
      logo: <CreditCardIcon size={100} />,
      description: "Remote Payment",
    },
  ];

  return (
    <>
      <main className="hidden lg:flex flex-col gap-[80px] pb-[50px]">
        <section
          id="main"
          data-scroll
          className="flex text-[#396131] bg-white drop-shadow-lg rounded-[8px] py-[80px] px-[80px] mx-[10px]"
        >
          <div className="flex flex-col gap-[20px] w-3/5">
            <span className="text-[4rem]/[4rem] font-bold">
              Loans / Gold & Gems
            </span>
            <span className="text-[1rem]/[2rem]">
              Secure quick cash with 1st Valley Bank’s Gold and Gems Loan—a
              hassle-free lending solution using your valuable jewelry as
              collateral. Enjoy low interest rates, fast approval, and flexible
              terms. Perfect for urgent needs or personal expenses. Your
              treasures stay safe while your finances stay strong.
            </span>
          </div>
          <div className="flex justify-center w-2/5">
            <SketchLogoIcon className="w-[50%] h-auto" />
          </div>
        </section>
        <section id="description" className="px-[15px] text-white">
          <div className="flex px-[80px] py-[60px] gap-[80px] bg-[#396131] rounded-[8px] drop-shadow-lg">
            <div className="flex justify-center w-2/5">
              <MoneyWavyIcon className="w-[50%] h-auto" />
            </div>
            <div className="flex flex-col items-start justify-start gap-[50px] w-3/5">
              <div className="flex flex-col gap-[20px]">
                <span className="text-white font-bold text-[3rem]/[3rem]">
                  Gold & Gems
                </span>
                <span className="text-white text-[0.8rem]/[2.4rem]">
                  Individual borrowers may pledge their genuine pieces of
                  jewelry for instant cash for personal purposes. This is
                  through the Gold & Gems jewelry loan. Interest rates are most
                  affordable, and the term is guaranteed to be flexible.
                </span>
              </div>
              <div className="flex flex-col gap-[20px]">
                <span className="text-white font-bold text-[3rem]/[3rem]">
                  Jewelry Loan
                </span>
                <span className="text-white text-[0.8rem]/[2.4rem]">
                  For quick cash, borrowers may find their emergency fix in
                  1VB's jewelry business loan. All clients need are authentic
                  jewelry items. Clients may exchange these items for cash that
                  they can use to expand their businesses.
                </span>
              </div>
            </div>
          </div>
        </section>
        <section
          id="description-2"
          className="flex justify-between mx-[60px] text-[#396131]"
        >
          <div className="flex flex-col gap-[50px] w-3/5">
            <span className="text-[2.5rem]/[2.5rem] font-bold">
              Small Business Loan Ends 2023 with Php385M
            </span>
            <span className="text-[2rem]/[2rem] font-semibold">
              Ervie E. Cane, Product Manager
            </span>
            {[
              {
                header: "2023: Turnaround Year for Gold & Gems",
                description:
                  "After the 3-year drought for Gold and Gems, where portfolio decreased, the product has recovered successfully with a 40M increase in 2023, its turnaround year. The increase was a result of the following: higher appraisal rate, innovative features, and concerted effort of the Gold & Gems team. ",
              },
              {
                header: "Why Choose 1st Valley Bank",
                description:
                  "Several good reasons. Foremost is that aside from the advantages, one is assured that the Bank wants the borrower to regain possession of the item/s submitted as pledge. ",
              },
              {
                header: "Jewelry Business Loan",
                description:
                  "This loan grants business funds to anyone with authentic jewelry pieces to submit as collateral. It's the fastest way to get credit. Just convert your idle jewelry pieces. Let them shine and sparkle in times of need.",
              },
            ].map((part, index) => (
              <div className="flex flex-col gap-[20px]" key={index}>
                <span className="text-[1.5rem]/[2rem] font-semibold">
                  {part.header}
                </span>
                <span className="text-[1rem]/[3rem]">{part.description}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center w-2/5 h-full">
            <img
              src={img1}
              alt=""
              className="object-cover aspect-square rounded-[12px] w-4/5 h-full"
            />
          </div>
        </section>
        <section
          id="who-can-apply"
          className="flex flex-col p-[50px] gap-[50px] bg-[#396131] text-white mx-[15px] rounded-[10px] drop-shadow-lg"
        >
          <span className="text-center font-bold text-[2rem]/[2rem]">
            Advantages
          </span>
          <div className="grid grid-cols-4 gap-x-[20px] gap-y-[50px]">
            {advantages.map((loan, index) => (
              <div
                className="flex flex-col items-center gap-[10px]"
                key={index}
              >
                <div className="flex">{loan.logo}</div>
                <span className="text-[1rem]/[3rem] text-center">
                  {loan.description}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <main className="hidden sm:block lg:hidden">Tablet</main>
      <main className="block sm:hidden">Mobile</main>
    </>
  );
}
