import {
  faBank,
  faUnlock,
  faWheatAwn,
  faGem,
  faHouseLaptop,
  faCommentsDollar,
  faBreadSlice,
  faTractor,
  faMoneyBillWheat,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Loans() {
  const loans = [
    {
      type: "AGRICULTURE",
      logo: faWheatAwn,
      description:
        "Sow success with 1st Valley Bank Agri Loans—fast funds, low rates, and support to help your farm thrive!",
      path: "/loans/agriculture",
    },
    {
      type: "GOLD & GEMS",
      logo: faGem,
      description:
        "Turn your gold and gems into quick cash! Secure, hassle-free loans with low rates to meet your urgent financial needs",
      path: "/loans/gold-and-gems",
    },
    {
      type: "MICROFINANCE",
      logo: faHouseLaptop,
      description:
        "Start small, dream big! Get fast, affordable microfinance loans to jumpstart and grow your small business with confidence",
      path: "/loans/microfinance",
    },
    {
      type: "SALARY",
      logo: faCommentsDollar,
      description:
        "Need cash before payday? Get quick approval, low rates, and flexible terms with 1st Valley Bank’s Salary Loans today!",
      path: "/loans/salary",
    },
    {
      type: "SBL",
      logo: faBreadSlice,
      description:
        "Fuel your business growth with easy-access loans. Upgrade, expand, or boost working capital hassle-free and fast",
      path: "/loans/small-business-loan",
    },
    {
      type: "SME",
      logo: faTractor,
      description:
        "Take your SME to the next level with flexible financing, competitive rates, and support designed for business success",
      path: "/loans/small-and-medium-enterprises",
    },
    {
      type: "SUCRE",
      logo: faMoneyBillWheat,
      description:
        "Grow your farm smarter! Agri loans with funds, technical help, and flexible repayment to boost your harvest and income",
      path: "/loans/supervised-credit",
    },
  ];

  return (
    <>
      <main className="flex flex-col gap-[80px] pb-[50px]">
        <section
          id="main"
          data-scroll
          className="flex flex-col-reverse lg:flex-row text-[#396131] gap-[20px] lg:gap-auto bg-white drop-shadow-lg mx-[5px] rounded-[8px] py-[20px] lg:py-[50px]"
        >
          <div className="flex flex-col gap-[20px] p-[20px] lg:py-[80px] lg:px-[60px] mx-[10px] lg:w-2/3">
            <span className="text-[2rem]/[2rem] lg:text-[4rem]/[4rem] font-bold">
              Loans
            </span>
            <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[2rem]">
              Fuel your dreams with 1st Valley Bank Loans! Whether you’re
              growing a business, investing in agriculture, or managing daily
              needs, our flexible loan options come with competitive rates and
              easy terms. Experience fast approval, personalized support, and
              financial solutions designed to help you succeed. Your goals are
              within reach—let’s make them happen!
            </span>
          </div>
          <div className="flex items-center justify-center lg:w-1/3">
            <FontAwesomeIcon
              icon={faBank}
              className="flex aspect-square"
              style={{ width: "60%", height: "auto" }}
            />
          </div>
        </section>
        <section id="loans" className="">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#396131] mb-4">
                LOANS
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#396131] to-[#4a7a3f] mx-auto rounded-full"></div>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our comprehensive loan solutions designed to meet your
                financial needs
              </p>
            </div>

            {/* Loans Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {loans.map((loan, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                >
                  {/* Card gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#396131]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative p-8 lg:p-10">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8">
                      {/* Icon Container */}
                      <div className="flex-shrink-0 relative">
                        <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-[#396131] to-[#4a7a3f] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <FontAwesomeIcon
                            icon={loan.logo}
                            className="text-white text-3xl lg:text-4xl"
                          />
                        </div>
                        {/* Decorative ring */}
                        <div className="absolute -inset-2 bg-gradient-to-br from-[#396131]/20 to-[#4a7a3f]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl lg:text-2xl font-bold text-[#396131] mb-3 group-hover:text-[#4a7a3f] transition-colors duration-300">
                          {loan.type}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-6 text-sm lg:text-base">
                          {loan.description}
                        </p>

                        {/* CTA Button */}
                        <NavLink
                          to={loan.path}
                          className="inline-flex items-center justify-center px-6 py-3 bg-[#396131] text-white font-semibold rounded-xl hover:bg-[#4a7a3f] focus:outline-none focus:ring-4 focus:ring-[#396131]/25 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group/btn"
                        >
                          <span className="mr-2">Learn More</span>
                          <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
