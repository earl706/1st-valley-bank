import {
  faArrowUpRightDots,
  faBreadSlice,
  faBuilding,
  faCashRegister,
  faCodeBranch,
  faCoins,
  faCommentsDollar,
  faCreditCard,
  faFileInvoiceDollar,
  faGem,
  faGraduationCap,
  faHandHoldingHand,
  faHandsHoldingChild,
  faHandSparkles,
  faHouseLaptop,
  faLeaf,
  faLightbulb,
  faMagnifyingGlassDollar,
  faMobile,
  faMoneyBillTransfer,
  faMoneyBillTrendUp,
  faMoneyBillWheat,
  faNetworkWired,
  faPhone,
  faPiggyBank,
  faPlusCircle,
  faSackDollar,
  faTractor,
  faTrophy,
  faUsersGear,
  faWheatAwn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

export default function ConsumerProtection1VBProducts() {
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

  const depositsFeatures = [
    { feature: "Regular Savings", icon: faPiggyBank },
    { feature: "ATM Savings", icon: faCreditCard },
    { feature: "Kiddie & Teen Savings", icon: faHandsHoldingChild },
    { feature: "Basic Deposit", icon: faMoneyBillTransfer },
    { feature: "Payroll Servicing Deposit", icon: faSackDollar },
    { feature: "Student ATM Savings", icon: faGraduationCap },
    { feature: "Special Savings Deposit", icon: faMagnifyingGlassDollar },
  ];

  return (
    <>
      <main className="hidden lg:flex flex-col gap-[80px] pb-[50px]">
        <section
          id="main"
          className="flex text-[#396131] bg-white drop-shadow-lg mx-[10px] rounded-[8px] py-[50px]"
        >
          <div className="flex flex-col gap-[20px] py-[80px] px-[60px] mx-[10px] w-3/5">
            <div className="flex flex-col gap-[20px]">
              <span className="text-[4rem]/[4rem] font-bold">
                Consumer Protection
              </span>
              <span className="text-[3rem]/[3rem] font-semibold">
                1VB Products
              </span>
            </div>
            <span className="text-[1rem]/[2rem]">
              At 1st Valley Bank, your protection starts with every product we
              offer. Our Consumer Protection: 1VB Products initiative ensures
              that each loan, deposit, and service is designed with fairness,
              transparency, and your best interest in mind. Know your rights,
              stay informed, and bank with confidence—because you deserve
              nothing less.
            </span>
          </div>
          <div className="flex items-center justify-center w-2/5">
            <FontAwesomeIcon
              icon={faGem}
              className="flex aspect-square"
              style={{ width: "60%", height: "auto" }}
            />
          </div>
        </section>
        <section
          id="loans"
          className="relative py-16 lg:py-24  overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0 bg-gradient-to-br from-[#396131]/5 via-transparent to-[#396131]/10"></div>
          </div>

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
        <section
          id="deposits"
          data-scroll
          className="relative py-16 lg:py-20 mx-4 sm:mx-6 lg:mx-8 rounded-3xl bg-gradient-to-br from-[#396131] to-[#2d4a26] text-white shadow-2xl overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 left-16 w-24 h-24 bg-white/15 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Section Header */}
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight">
                1VB Deposits: Safe, Secure, and Rewarding
              </h2>
              <div className="w-24 h-1 bg-white/80 mx-auto rounded-full"></div>
            </div>

            {/* Main Deposit Types */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20">
              {/* Regular Deposits */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8 h-full">
                  {/* Icon Container */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                      <FontAwesomeIcon
                        icon={faPiggyBank}
                        className="text-white text-4xl lg:text-5xl"
                      />
                    </div>
                    <div className="absolute -inset-2 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between h-full text-center sm:text-left">
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
                        Regular
                      </h3>
                      <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                        <div className="flex items-center justify-center sm:justify-start gap-3">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <FontAwesomeIcon
                              icon={faPlusCircle}
                              className="text-white text-sm"
                            />
                          </div>
                          <span className="font-semibold text-sm lg:text-base">
                            SD PLUS
                          </span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-3">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <FontAwesomeIcon
                              icon={faFileInvoiceDollar}
                              className="text-white text-sm"
                            />
                          </div>
                          <span className="font-semibold text-sm lg:text-base">
                            1ST CHECKING ACCOUNT
                          </span>
                        </div>
                      </div>
                    </div>
                    <NavLink
                      to="/deposits/regular-savings"
                      className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#396131] font-bold rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/25 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group/btn"
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

              {/* Special Deposits */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8 h-full">
                  {/* Icon Container */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                      <FontAwesomeIcon
                        icon={faMoneyBillTransfer}
                        className="text-white text-4xl lg:text-5xl"
                      />
                    </div>
                    <div className="absolute -inset-2 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between h-full text-center sm:text-left">
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
                        Special
                      </h3>
                      <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                        <div className="flex items-center justify-center sm:justify-start gap-3">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <FontAwesomeIcon
                              icon={faCoins}
                              className="text-white text-sm"
                            />
                          </div>
                          <span className="font-semibold text-sm lg:text-base">
                            SSD MICRO
                          </span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-3">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <FontAwesomeIcon
                              icon={faMoneyBillTrendUp}
                              className="text-white text-sm"
                            />
                          </div>
                          <span className="font-semibold text-sm lg:text-base">
                            SSD REGULAR
                          </span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-3">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <FontAwesomeIcon
                              icon={faFileInvoiceDollar}
                              className="text-white text-sm"
                            />
                          </div>
                          <span className="font-semibold text-sm lg:text-base">
                            HANDOG SAVINGS
                          </span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-3">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <FontAwesomeIcon
                              icon={faFileInvoiceDollar}
                              className="text-white text-sm"
                            />
                          </div>
                          <span className="font-semibold text-sm lg:text-base">
                            BASIC SAVINGS
                          </span>
                        </div>
                      </div>
                    </div>
                    <NavLink
                      to="/deposits/special-savings"
                      className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#396131] font-bold rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/25 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group/btn"
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

            {/* Features Grid */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-8 lg:mb-10">
                {depositsFeatures.map((deposit, index) => (
                  <div
                    key={index}
                    className="group flex flex-col items-center text-center gap-3 lg:gap-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                      <FontAwesomeIcon
                        icon={deposit.icon}
                        className="text-white text-2xl lg:text-3xl"
                      />
                    </div>
                    <span className="font-semibold text-sm lg:text-base leading-tight">
                      {deposit.feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Main CTA */}
              <div className="text-center">
                <NavLink
                  to="/deposits"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#396131] font-bold text-lg rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/25 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group/btn"
                >
                  <span className="mr-2">Learn More About All Deposits</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1"
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
        </section>
      </main>
      <main className="hidden sm:block lg:hidden">Tablet</main>
      <main className="block sm:hidden">Mobile</main>
    </>
  );
}
