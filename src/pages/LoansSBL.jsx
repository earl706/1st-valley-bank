import {
  StorefrontIcon,
  HandCoinsIcon,
  SubtitlesIcon,
  FolderUserIcon,
  CardholderIcon,
  HeartbeatIcon,
  GavelIcon,
  HouseLineIcon,
  TreeIcon,
  CarIcon,
  FilePlusIcon,
  ArrowsOutCardinalIcon,
} from "@phosphor-icons/react/dist/ssr";
import img1 from "/src/assets/loans/sbl/1.jpg";
import React from "react";

export default function LoansSBL() {
  const whoCanApply = [
    {
      logo: <FolderUserIcon size={100} />,
      description:
        "Entrepreneurs who are engaged in business for at least one (1) year",
    },
    {
      logo: <CardholderIcon size={100} />,
      description:
        "Willingness to pay in frequent installments of capital and interest and has clear understanding on the benefits of having a savings deposit",
    },
    {
      logo: <HeartbeatIcon size={100} />,
      description:
        "Must be at least 18 years of age but not more than 70 years old, must be in good health",
    },
    {
      logo: <GavelIcon size={100} />,
      description: "Free from or cleared from cases at the barangay or court",
    },
    {
      logo: <HouseLineIcon size={100} />,
      description:
        "A resident of the area for at least two (2) years where the branch is located",
    },
  ];

  const benefitsFeature = [
    {
      header: "Flexibility",
      logo: <TreeIcon size={100} />,
      description:
        "Up to 12 months for additional capital. Up to 24 months for business expansion. Up to 36 months vehicle financing",
    },
    {
      header: "Easy Collateral",
      logo: <CarIcon size={100} />,
      description:
        "Collaterals (land title or four (4)-wheel vehicle) are just for safe-keeping",
    },
    {
      header: "Reasonable Interest",
      logo: <FilePlusIcon size={100} />,
      description:
        "1.75% to 2.5% per month. Has context menu per month (rate depends on client's rating)",
    },
    {
      header: "Various Purpose",
      logo: <ArrowsOutCardinalIcon size={100} />,
      description:
        "Additional capital, expansion of business, purchase of new vehicle",
    },
  ];

  return (
    <>
      <main className="flex flex-col gap-[40px] lg:gap-[80px] pb-[50px]">
        <section
          id="main"
          data-scroll
          className="flex flex-col-reverse lg:flex-row text-[#396131] bg-white drop-shadow-lg mx-[10px] rounded-[8px] gap-[20px] p-[30px] lg:py-[50px]"
        >
          <div className="flex flex-col gap-[20px] lg:py-[80px] lg:px-[60px] mx-[10px] lg:w-2/3">
            <span className="text-[2rem]/[2rem] lg:text-[4rem]/[4rem] font-bold">
              Loans / SBL
            </span>
            <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[2rem]">
              These multi-purpose loans are specifically tailored for legitimate
              small businesses that require additional capital to support their
              expansion efforts. Whether the goal is to increase inventory,
              upgrade equipment, improve facilities, or boost working capital,
              these loans provide accessible financial support to help small
              enterprises grow and thrive.
            </span>
          </div>
          <div className="flex items-center justify-center lg:w-1/3">
            <StorefrontIcon className="w-[60%] h-auto" />
          </div>
        </section>
        <section id="description" className="px-[15px] text-white">
          <div className="flex flex-col lg:flex-row items-center justify-center p-[30px] gap-[20px] lg:px-[80px] lg:py-[60px] lg:gap-[80px] bg-[#396131] rounded-[8px] drop-shadow-lg">
            <div className="flex items-center justify-center w-full lg:w-2/5">
              <HandCoinsIcon className="w-[50%] h-auto" />
            </div>
            <div className="flex flex-col items-start gap-[20px] lg:w-3/5">
              <span className="text-white font-bold text-[1.5rem]/[1.5rem] lg:text-[4rem]/[4rem]">
                Small Business Loans
              </span>
              <span className="text-white text-[0.8rem]/[2.4rem]">
                Qualified clients have the opportunity to borrow amounts of up
                to Php300,000 with ease, offering a practical solution for
                immediate business needs. The loans carry a competitive interest
                rate of only 1.75% per month, calculated on a diminishing
                balance basis, making repayment more manageable over time. The
                loan term extends up to 12 months, or one full year, giving
                borrowers sufficient time to make productive use of the funds
                and gradually repay the amount borrowed.
              </span>
            </div>
          </div>
        </section>
        <section
          id="description-2"
          className="flex flex-col-reverse lg:flex-row justify-between mx-[15px] gap-[20px] lg:mx-[60px] text-[#396131]"
        >
          <div className="flex flex-col gap-[20px] lg:gap-[50px] lg:w-3/5">
            <span className="text-[1.5rem]/[2rem] lg:text-[2.5rem]/[2.5rem] font-bold">
              Small Business Loan Ends 2023 with Php385M
            </span>
            <span className="text-[1rem]/[2rem] lg:text-[2rem]/[2rem] font-semibold">
              Ervie E. Cane, Product Manager
            </span>
            <div className="flex flex-col gap-[20px]">
              <span className="text-[1rem]/[2rem] lg:text-[1.5rem]/[2rem] font-semibold">
                1VB Small Business Loan gained traction closing 2023 with a
                portfolio of Php385M
              </span>
              <span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[3rem]">
                It continues to attract the support of consumers with new
                features. Small business entrepreneurs can get as much as Php1M
                payable in 12 months, 24 months, or 36 months whichever is
                convenient for them.
              </span>
            </div>
          </div>
          <div className="flex justify-center lg:w-2/5 h-full">
            <img
              src={img1}
              alt=""
              className="object-cover aspect-square rounded-[12px] w-full lg:w-4/5"
            />
          </div>
        </section>
        <section
          id="who-can-apply"
          className="flex flex-col p-[50px] gap-[50px] bg-[#396131] text-white mx-[15px] rounded-[10px] drop-shadow-lg"
        >
          <span className="text-center font-bold text-[1.5rem]/[1.5rem] lg:text-[2rem]/[2rem]">
            Who Can Apply
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-[100px] gap-y-[40px] lg:gap-y-[90px]">
            {whoCanApply.map((loan, index) => (
              <div
                className="flex flex-col justify-between gap-[40px]"
                key={index}
              >
                <div className="flex flex-col items-center gap-[20px] lg:gap-[30px]">
                  <div className="flex">{loan.logo}</div>
                  <span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[3rem] text-center">
                    {loan.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section
          id="benefits-features"
          className="flex flex-col p-[50px] gap-[50px] text-[#396131] mx-[15px]"
        >
          <span className="text-center font-bold text-[1.5rem]/[1.5rem] lg:text-[2rem]/[2rem]">
            Benefits Features
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[100px] gap-y-[40px] lg:gap-y-[90px]">
            {benefitsFeature.map((benefit, index) => (
              <div
                className="flex flex-col justify-between gap-[40px]"
                key={index}
              >
                <div className="flex flex-col items-center gap-[30px]">
                  <div className="flex">{benefit.logo}</div>
                  <span className="text-[1rem]/[1rem] lg:text-[1.5rem]/[2rem] font-bold text-center">
                    {benefit.header}
                  </span>
                  <span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[3rem] text-center">
                    {benefit.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
