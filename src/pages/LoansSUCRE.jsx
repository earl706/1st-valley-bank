import { faMoneyBillWheat } from "@fortawesome/free-solid-svg-icons/faMoneyBillWheat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FlowerLotusIcon,
  MagicWandIcon,
  MoneyWavyIcon,
  ReceiptIcon,
  ShieldCheckIcon,
  ShieldStarIcon,
  SubtitlesIcon,
  UserPlusIcon,
} from "@phosphor-icons/react/dist/ssr";
import img1 from "/src/assets/loans/sucre/1.jpg";
import React from "react";
import { WheatIcon } from "lucide-react";
import { CpuIcon, LeafIcon } from "@phosphor-icons/react";

export default function LoansSUCRE() {
  const disbursedLoans = [
    {
      type: "CORN",
      logo: <WheatIcon size={70} />,
      description: "₱ 24.96M to 315 farmers",
    },
    {
      type: "RICE",
      logo: <LeafIcon size={70} />,
      description: "₱ 117.37M to 1,706 farmers",
    },
    {
      type: "SUGARCANE",
      logo: <FlowerLotusIcon size={70} />,
      description: "₱ 80.30M to 383 farmers",
    },
  ];
  const benefitsUses = [
    {
      type: "Access",
      logo: <SubtitlesIcon size={70} />,
      description:
        "Farmers can access the funds to cover expenses as the need arises",
    },
    {
      type: "Liquidity",
      logo: <MoneyWavyIcon size={70} />,
      description: "Provides operations cash flow",
    },
    {
      type: "Seasonality",
      logo: <ReceiptIcon size={70} />,
      description: "Funds seasonal expenses",
    },
    {
      type: "Risk",
      logo: <ShieldStarIcon size={70} />,
      description: "Can be a useful tool to manage agricultural risks",
    },
    {
      type: "Profitability",
      logo: <UserPlusIcon size={70} />,
      description: "Increase in profitability with high-value crops",
    },
    {
      type: "Innovation",
      logo: <CpuIcon size={70} />,
      description:
        "Ability to benefit from modernization and technological advancements in agriculture",
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
            <span className="text-[4rem]/[4rem] font-bold">Loans / SUCRE</span>
            <span className="text-[1rem]/[2rem]">
              Supervised Credit is a lending program that provides funds to
              farmers for the production of rice, corn, cacao, or sugarcane.
              This unsecured loan is also bundled with the provision of
              technical and marketing assistance to help improve the farmer's
              productivity and income.
            </span>
          </div>
          <div className="flex items-center justify-center w-1/3">
            <FontAwesomeIcon
              icon={faMoneyBillWheat}
              style={{ width: "50%", height: "auto" }}
            />
          </div>
        </section>
        <section id="description" className="px-[15px] text-white">
          <div className="flex items-center justify-center px-[80px] py-[60px] gap-[80px] bg-[#396131] rounded-[8px] drop-shadow-lg">
            <div className="flex items-center justify-center w-2/5">
              <ShieldCheckIcon className="w-[50%] h-auto" />
            </div>
            <div className="flex flex-col items-start gap-[20px] w-3/5">
              <span className="text-white font-bold text-[4rem]/[4rem]">
                Supervised Credit Loans
              </span>
              <div className="flex flex-col gap-[20px]">
                {[
                  "What sets Supervised Credit apart from traditional lending programs is its integrated support system. In addition to financial aid, the program also includes technical and marketing assistance. Technical assistance may involve training on modern farming techniques, pest and disease management, proper fertilizer application, and climate-smart agriculture practices. Marketing assistance, on the other hand, can include help with establishing market linkages, improving product quality and packaging, and understanding current market trends and pricing.",
                  "By providing both capital and capacity-building support, the program aims to increase farm productivity, reduce production risks, and enhance the overall income and livelihood of farmers.",
                  "Supervised Credit promotes inclusive and sustainable agricultural development by making financing more accessible, while also equipping farmers with the knowledge and tools necessary for long-term success.",
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
          <div className="flex flex-col gap-[50px] w-3/5">
            <span className="text-[2.5rem]/[2.5rem] font-bold">
              From Supervised Credit to Crop Loan: Sowing the Seeds of
              Innovation
            </span>
            <span className="text-[2rem]/[2rem] font-semibold">
              Bernard C. Paderes, Product Manager
            </span>
            <div className="flex flex-col gap-[20px]">
              <span className="text-[1.5rem]/[1.5rem] font-semibold">
                From Rice to Sugarcane Production Loan, Supervised Credit
                Embraces Its Rewards
              </span>
              <span className="text-[1rem]/[3rem]">
                Supervised Credit or SUCRE is now known as Crop Loan. From rice
                production loan, it now focuses on sugarcane production loan
                where it is most profitable. It ended the year 2023 with a
                Php154.202M portfolio serving 1,588 farmers.
              </span>
            </div>
          </div>
          <div className="flex justify-center w-2/5">
            <img
              src={img1}
              alt=""
              className="object-cover rounded-[12px] w-4/5 h-auto"
            />
          </div>
        </section>
        <section
          id="kinds"
          className="flex flex-col p-[50px] gap-[50px] bg-[#396131] text-white mx-[15px] rounded-[10px] drop-shadow-lg"
        >
          <div className="flex flex-col gap-[10px]">
            <span className="text-center font-bold text-[2rem]/[2rem]">
              Disbursed Loans
            </span>
            <div className="flex flex-col gap-[5px]">
              <span className="text-center text-[1rem]/[2rem]">
                1VB has disbursed a total of P229.35M for 2023, higher by
                P11.44M as compared to the 2022 disbursement of P217.98M.
              </span>
              <span className="text-center text-[1rem]/[2rem]">
                The loan was disbursed to three (3) major crops.
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-[100px] gap-y-[90px]">
            {disbursedLoans.map((loan, index) => (
              <div
                className="flex flex-col justify-between gap-[40px]"
                key={index}
              >
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
          <span className="text-[1rem]/[1rem] text-center">
            ₱ 6.69M emergency funding to 191 farmers
          </span>
        </section>
        <section
          id="product-enhancement"
          data-scroll
          className="flex text-[#396131] rounded-[8px]"
        >
          <div className="flex items-center justify-center w-2/5">
            <MagicWandIcon size={300} />
          </div>
          <div className="flex flex-col gap-[20px] py-[80px] px-[60px] w-3/5">
            <span className="text-[3rem]/[3rem] font-bold">
              PRODUCT ENHANCEMENT
            </span>
            <span className="text-[1rem]/[3rem]">
              When it was still known as supervised credit, 1VB has set a
              maximum loan amount of Php150K/farmer. With the transformation to
              Crop Loan, the ceiling has been removed. Now, there is no maximum
              loan amount thereby encouraging large-enterprising farmers to also
              benefit from the product.
            </span>
          </div>
        </section>
        <section
          id="benefits-and-uses"
          className="flex flex-col p-[50px] gap-[50px] bg-[#396131] text-white mx-[15px] rounded-[10px] drop-shadow-lg"
        >
          <span className="text-center font-bold text-[2rem]/[2rem]">
            Benefits and Uses
          </span>
          <div className="grid grid-cols-3 gap-x-[100px] gap-y-[90px]">
            {benefitsUses.map((loan, index) => (
              <div
                className="flex flex-col justify-between gap-[40px]"
                key={index}
              >
                <div className="flex flex-col items-center gap-[30px]">
                  <div className="flex">{loan.logo}</div>
                  <div className="flex flex-col gap-[20px]">
                    <span className="text-center text-[1.5rem]/[1.5rem] font-bold">
                      {loan.type}
                    </span>
                    <span className="text-[1rem]/[3rem] text-center">
                      {loan.description}
                    </span>
                  </div>
                </div>
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
