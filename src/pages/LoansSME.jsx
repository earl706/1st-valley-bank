import {
  FarmIcon,
  CellTowerIcon,
  TractorIcon,
  LockKeyOpenIcon,
  CashRegisterIcon,
  ArrowsOutCardinalIcon,
  TrendUpIcon,
  TrayArrowUpIcon,
} from "@phosphor-icons/react/dist/ssr";
import { LucideChartCandlestick } from "lucide-react";
import img1 from "/src/assets/loans/sme/1.jpg";
import React from "react";
import { NavLink } from "react-router-dom";

export default function LoansSME() {
  const smallBusinessLoans = [
    {
      type: "TERM LOAN",
      logo: <LucideChartCandlestick size={70} />,
      description:
        "This is for long-term investments such as construction, renovation/improvement, acquiring new assets, equipment and/or vehicle for business use. This product is fully secured by a collateral in a form of real estate or vehicle/equipment.",
    },
    {
      type: "CREDIT LINE",
      logo: <CellTowerIcon size={70} />,
      description:
        "This is for short-term needs such as for working or additional capitalization for their business. This product is fully secured by collateral in a form of real estate vehicle/equipment.",
    },
    {
      type: "CHATTEL FINANCING",
      logo: <TractorIcon size={70} />,
      description:
        "This is for the acquisition of trucks and heavy equipment and/or vehicle for their business use. This product is fully secured by the unit to be financed or with additional real estate collateral.",
    },
    {
      type: "UNSECURED",
      logo: <LockKeyOpenIcon size={70} />,
      description:
        "This is for short-term needs such as for working or additional capitalization for their business. Collaterals in the form of real estate or vehicle/equipment are for safe- keeping only.",
    },
    {
      type: "BILLS/CHECK REDISCOUNTING",
      logo: <CashRegisterIcon size={70} />,
      description:
        "This is for bridging the gap between their immediate cash needs and the clearing of their postdated checks for their cashflow.",
    },
  ];

  return (
    <>
      <main className="hidden lg:flex flex-col gap-[80px] pb-[50px]">
        <section
          id="main"
          data-scroll
          className="flex text-[#396131] bg-white drop-shadow-lg mx-[10px] rounded-[8px] py-[50px]"
        >
          <div className="flex flex-col gap-[20px] py-[80px] px-[60px] mx-[10px] w-2/3">
            <span className="text-[4rem]/[4rem] font-bold">Loans / SME</span>
            <span className="text-[1rem]/[2rem]">
              Loan facility that funds small and medium enterprises engaged in
              legitimate wholesale or retail businesses. Funds can be used for
              (a) financing business expansion, (b) purchasing new heavy
              equipment or vehicle, (c) constructing new warehouse or building,
              (d) trade check discounting.
            </span>
          </div>
          <div className="flex items-center justify-center w-1/3">
            <TractorIcon className="w-[60%] h-auto" />
          </div>
        </section>
        <section id="description" className="px-[15px] text-white">
          <div className="flex items-center justify-center px-[80px] py-[60px] gap-[80px] bg-[#396131] rounded-[8px] drop-shadow-lg">
            <div className="flex items-center justify-center w-2/5">
              <FarmIcon className="w-[50%] h-auto" />
            </div>
            <div className="flex flex-col items-start gap-[20px] w-3/5">
              <span className="text-white font-bold text-[4rem]/[4rem]">
                SME Loans
              </span>
              <div className="flex flex-col gap-[20px]">
                {[
                  "Borrowers may choose between secured and unsecured SME loans. With secured SME, the borrower has to submit a collateral, usually land title, to secure the loan. The advantage of this type of loan is that borrowers enjoy lower interest rates.",
                  "Another option is the unsecured SME loan where collateral is not required but only hypothecation of assets as may be necessary.",
                  "Borrowers will experience utmost convenience and greater accessibility through the Bank's vast network of 78 branches and branch lite units.",
                ].map((paragraph, index) => (
                  <span
                    className="text-white text-[0.8rem]/[2.4rem]"
                    key={index}
                  >
                    {paragraph}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id="description-2"
          className="flex justify-between mx-[60px] text-[#396131]"
        >
          <div className="flex flex-col gap-[50px] w-2/3">
            <span className="text-[2.5rem]/[2.5rem] font-bold">
              SME BRINGS YOUR BUSINESS TO SUCCESS!
            </span>
            <span className="text-[2rem]/[2rem] font-semibold">
              Bernard C. Paderes, Product Manager
            </span>
            <div className="flex flex-col gap-[20px]">
              <span className="text-[1.5rem]/[1.5rem] font-semibold">
                SMALL TO MEDIUM IN SIZE, BIG IN RESULTS
              </span>
              <span className="text-[1rem]/[3rem]">
                In spite of the many challenges, 1VB SME product manages to be
                the force to reckon with. In 2023, SME grew to a Php862.24M
                portfolio or 24.23% against 2022. Certainly, this product
                remains to be the frontrunner among the push products of the
                Bank.
              </span>
            </div>
          </div>
          <div className="flex justify-center w-1/3">
            <img
              src={img1}
              alt=""
              className="object-cover rounded-[12px] w-4/5 h-full"
            />
          </div>
        </section>
        <section
          id="kinds"
          className="flex flex-col p-[50px] gap-[40px] bg-[#396131] text-white mx-[15px] rounded-[10px] drop-shadow-lg"
        >
          <span className="text-center font-bold text-[2rem]/[2rem]">
            Kinds of SME Loans
          </span>
          <div className="grid grid-cols-3 gap-x-[100px] gap-y-[90px]">
            {smallBusinessLoans.map((loan, index) => (
              <div className="flex flex-col justify-between gap-[40px]">
                <div className="flex flex-col items-center gap-[30px]">
                  <div className="flex">{loan.logo}</div>
                  <div className="flex flex-col gap-[20px]">
                    <span className="text-center text-[1.5rem]/[1.5rem] font-bold">
                      {loan.type}
                    </span>
                    <span className="text-[1rem]/[3rem]">
                      {loan.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section
          id="feats"
          className="flex gap-[80px] justify-center text-[#396131] mx-[50px]"
        >
          {[
            {
              icon: <ArrowsOutCardinalIcon size={70} />,
              header: "Growth",
              description:
                "24.23% portfolio growth against 2022 with delinquency ratio of only 2.51%",
            },
            {
              icon: <TrayArrowUpIcon size={70} />,
              header: "Growth",
              description:
                "SME remains to be the biggest growth contributor among the push products of 1VB",
            },
            {
              icon: <TrendUpIcon size={70} />,
              header: "Growth",
              description:
                "The product enjoys an 11-year streak in portfolio increase",
            },
          ].map((feat, index) => (
            <div className="flex flex-col gap-[20px] w-1/3" key={index}>
              <div className="flex flex-col justify-center items-center gap-[20px]">
                {feat.icon}
                <span className="text-[1.5rem]/[1.5rem] font-bold">
                  {feat.header}
                </span>
              </div>
              <span className="text-[1rem]/[3rem] text-center">
                {feat.description}
              </span>
            </div>
          ))}
        </section>
      </main>
      <main className="hidden sm:block lg:hidden">Tablet</main>
      <main className="block sm:hidden">Mobile</main>
    </>
  );
}
