import React from "react";
import { faBank, faHandshake } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BarnIcon, UserCircleCheckIcon } from "@phosphor-icons/react";
import { LeafIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import img1 from "/src/assets/loans/agriculture/1.jpg";
import img2 from "/src/assets/loans/agriculture/2.jpg";
import { ShieldCheckIcon, ShovelIcon } from "@phosphor-icons/react/dist/ssr";

export default function LoansAgriculture() {
  return (
    <>
      <main className="hidden lg:flex flex-col gap-[80px] pb-[50px]">
        <section
          id="main"
          data-scroll
          className="flex text-[#396131] bg-white drop-shadow-lg mx-[10px] rounded-[8px] py-[50px]"
        >
          <div className="flex flex-col gap-[20px] py-[80px] px-[60px] mx-[10px] w-2/3">
            <span className="text-[4rem]/[4rem] font-bold">
              Loans / Agriculture
            </span>
            <span className="text-[1rem]/[2rem]">
              These loans are meant to boost agricultural productivity by
              providing sufficient funds that farmers need to finance their
              activities efficiently. Farmers can use the funds for multiple
              purposes such as to buy farm equipment, purchase agricultural
              supplies, cover land costs, make land improvements or repairs,
              cover operating costs, grow the business, market the products to
              the vendors and the public, or rebuild following a natural
              disaster or pandemic.
            </span>
          </div>
          <div className="flex items-center justify-center w-1/3">
            <BarnIcon className="w-[60%] h-auto" />
          </div>
        </section>
        <section id="description" className="px-[15px] text-white">
          <div className="flex items-center justify-center px-[80px] py-[60px] gap-[80px] bg-[#396131] rounded-[8px] drop-shadow-lg">
            <div className="flex items-center justify-center w-2/5">
              <LeafIcon className="w-[50%] h-auto" />
            </div>
            <div className="flex flex-col items-start gap-[20px] w-3/5">
              <span className="text-white font-bold text-[4rem]/[4rem]">
                Agricultural Loans
              </span>
              <span className="text-white text-[0.8rem]/[2.4rem]">
                Farmers may borrow from Php100K up payable within five (5)
                years. Interest rate starts at 12% per annum on a diminishing
                balance. Co-makers are not necessary, but clients will have to
                submit collateral to enjoy lower interests and to secure the
                loan. The cost of an agricultural production is usually steep.
                Taking an agricultural loans from us is one of the best
                solutions.
              </span>
            </div>
          </div>
        </section>
        <section className="flex mx-[60px] justify-between text-[#396131]">
          <div className="flex flex-col gap-[50px] w-3/5">
            <span className="text-[2.5rem]/[3rem] font-semibold">
              AGRICULTURAL LOANS SURPASS PROJECTED GROWTH
            </span>
            <span className="text-[2rem]/[2rem] font-semibold">
              Muabar Carba, Product Manager
            </span>
            <div className="flex flex-col gap-[50px]">
              <div className="flex flex-col gap-[10px]">
                <span className="text-[1.5rem]/[1.5rem] font-semibold">
                  Portfolio Grows to PHP 204.89M
                </span>
                <span className="text-[1rem]/[3rem]">
                  With strategic marketing, persistent effort, and brilliant
                  performance, this product achieved an unprecedented growth of
                  Php204.89M in 2023 or 24.46M higher than Php180.43M growth in
                  2022.
                </span>
              </div>
              <div className="flex flex-col gap-[10px]">
                <span className="text-[1.5rem]/[1.5rem] font-semibold">
                  Agricultural Loans
                </span>
                <span className="text-[1rem]/[3rem]">
                  Agricultural loans, including agrarian reform loans, are
                  secured lending products that provide financial assistance to
                  farmers engaged in agrarian reform or agricultural activities.
                  1VB provides these farmers with additional funds necessary to
                  expand or to diversify their activities resulting with an
                  increase in their income.
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-2/5">
            <img
              src={img1}
              alt=""
              className="object-cover rounded-[12px] w-2/3 h-full"
            />
          </div>
        </section>
        <section
          id="kinds"
          className="flex flex-col gap-[40px] p-[50px] bg-[#396131] rounded-[8px] mx-[15px] drop-shadow-lg text-white"
        >
          <span className="text-[2rem]/[2rem] text-center font-bold">
            Kinds of Agricultural Loans
          </span>
          <div className="grid grid-cols-3 gap-x-[100px] text-center">
            {[
              {
                icon: <ShieldCheckIcon size={150} />,
                header: "AGRI SECURED",
                description:
                  "Intends to help farmers in cultivating, improvement and expansion of their farm land or other related activities",
              },
              {
                icon: <UserCircleCheckIcon size={150} />,
                header: "INDIVIDUAL SECURED",
                description:
                  "For clients who seeks financial assistance for personal purposes, either house renovation, house construction, placement fee or medical expenses",
              },
              {
                icon: <ShovelIcon size={150} />,
                header: "CHATTEL FINANCING",
                description:
                  "Intends to help farmers in procuring farm equipment for greater yield and further agricultural activities",
              },
            ].map((kind, index) => (
              <div className="flex flex-col gap-[20px]" key={index}>
                <div className="flex flex-col items-center gap-[20px]">
                  {kind.icon}
                  <span className="text-[1.5rem]/[1.5rem] font-bold">
                    {kind.header}
                  </span>
                </div>
                <span className="text-[1rem]/[3rem] ">{kind.description}</span>
              </div>
            ))}
          </div>
        </section>
        <section
          id="story"
          className="flex justify-between mx-[60px] text-[#396131]"
        >
          <div className="flex flex-col gap-[40px] w-3/5">
            <div className="flex flex-col">
              <span className="text-[2rem]/[2rem] font-bold">
                Fall 7 Times, Stand 8 Times
              </span>
              <span className="text-[1.5rem]/[1.5rem]">
                The Caneros Success Story
              </span>
            </div>
            <div className="flex flex-col gap-[20px]">
              {[
                "The Caneros is a humble family from Digos, Davao del Sur whose source of living is their banana plantation. They were able to live a normal and happy life, send their kids to school, and expand their plantation as well. Then came their nightmare in 2018- the Panama disease, a destructive disease of bananas caused by the soil-inhabiting fungus species.",
                "Suffering from devastating losses, the Caneros were forced to sell their properties. They were in the brink of hopelessness seeing their future crumble before their eyes.",
                "With the remaining land that they have, their faith in God, they did their best to recover from the tragedy. It was during this time that 1VB Digos introduce them our Agri Secured Loan with scheme tailor-fitted for banana growers. Through this product, the Caneros obtained the funds they need to rehabilitate their plantation. They were able to expand their plantation from 1.5 has to 7 has.",
                "'Dako jud kaayo natabang ang 1st Valley Bank samoa kay tungod sa ila pagpautang samoa nakabakod mi balik.' (1st Valley Bank helped us a lot that we were able to rise again.), said Mrs. Virginia Cameros Tobiano.",
              ].map((paragraph, index) => (
                <span className="text-[1rem]/[3rem]" key={index}>
                  {paragraph}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center w-2/5">
            <img
              src={img2}
              alt=""
              className="object-cover rounded-[12px] w-4/5 h-full"
            />
          </div>
        </section>
      </main>
      <main className="hidden sm:block lg:hidden">Tablet</main>
      <main className="block sm:hidden">Mobile</main>
    </>
  );
}
