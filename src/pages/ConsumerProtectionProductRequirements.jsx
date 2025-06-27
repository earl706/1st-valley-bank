import {
  faBreadSlice,
  faCheckSquare,
  faCommentsDollar,
  faFileInvoiceDollar,
  faFileSignature,
  faFilterCircleDollar,
  faGem,
  faHandsHoldingChild,
  faLaptopHouse,
  faMagnifyingGlassDollar,
  faMoneyBillTransfer,
  faMoneyBillWheat,
  faPlusCircle,
  faTractor,
  faWheatAwn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CaretDownIcon,
  CashRegisterIcon,
  CellTowerIcon,
  GrainsIcon,
} from "@phosphor-icons/react";
import {
  BarnIcon,
  ChecksIcon,
  FarmIcon,
  FlowerLotusIcon,
  HandCoinsIcon,
  LockKeyOpenIcon,
  ShieldPlusIcon,
  TractorIcon,
} from "@phosphor-icons/react/dist/ssr";
import { LucideChartCandlestick } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

export default function ConsumerProtectionProductRequirements() {
  const depositProducts = [
    {
      type: "SAVINGS DEPOSIT",
      logo: faMagnifyingGlassDollar,
      description:
        "A passbook- based regular savings account. One of the best ways to park cash, it earns an interest rate of .50% per annum.",
    },
    {
      type: "KIDS AND TEENS SAVINGS",
      logo: faHandsHoldingChild,
      description:
        "Specially designed for teens and kids. We see this as a great way to introduce the value of saving money to kids and to teach teens how to budget money.",
    },
    {
      type: "BASIC SAVINGS",
      logo: faFilterCircleDollar,
      description:
        "Our own little way to accommodate the un-banked and to provide them access to financial services.",
    },
    {
      type: "SAVINGS DEPOSIT PLUS",
      logo: faPlusCircle,
      description:
        "Gives depositors higher returns for their money. It can earn up to 5.5% annually if the account is locked for five (5) years and one (1) day.",
    },
    {
      type: "1ST CHECKING ACCOUNT",
      logo: faFileInvoiceDollar,
      description:
        "the quickest way to access money for either personal or business needs. It's a demand deposit that can earn up to 0.50% per annum. For personal account, initial deposit required is Php5K, while for corporate or business account. initial deposit is Php10K. Our loan products are usually tied up with 1st Checking Account. This product has the power to lower the cost of our loans. All applications for the 1st Checking Account are subject to careful evaluation.",
    },
  ];

  const supervisedCreditProducts = [
    {
      type: "RICE & CORN",
      logo: <GrainsIcon size={300} />,
      description:
        "Grow more with confidence! The 1VB Supervised Credit Loan for Rice & Corn gives farmers access to funds, plus expert support in production and marketing. Pay in full after harvest or in installments—flexible, guided, and built to boost your yields and income.",
    },
    {
      type: "SUGARCANE",
      logo: <FlowerLotusIcon size={300} />,
      description:
        "Boost your harvest with 1VB’s Supervised Credit Loan for Sugarcane! Designed for sugarcane farmers, this loan offers funding plus expert technical and marketing support. Enjoy flexible repayment terms—lump sum or installment—tailored to your crop cycle. Grow smart, earn more with 1VB.",
    },
    {
      type: "SUCRE PLUS",
      logo: <FarmIcon size={300} />,
      description:
        "SUCRE PLUS by 1VB is a premium Supervised Credit Loan for sugarcane farmers seeking higher yields and bigger returns. Get enhanced funding support, expert agri-advice, and flexible payment terms aligned with your harvest. Level up your farming with SUCRE PLUS—grow better, earn more!",
    },
    {
      type: "SUCRE A-PLUS",
      logo: <ShieldPlusIcon size={300} />,
      description:
        "SUCRE A-PLUS is 1VB’s advanced loan program for high-performing sugarcane farmers. Enjoy bigger loan amounts, personalized technical support, and flexible repayment options. Designed to maximize productivity and profit, SUCRE A-PLUS helps you take your farm to the next level.",
    },
  ];

  const agricultureLoans = [
    {
      type: "AGRI SECURED",
      logo: <BarnIcon size={200} />,
      description:
        "This product intends to help farmers in cultivating, improving and expanding their farm land or other related activities. This product is fully secured by a collateral in the form of a real estate (land title) or vehicle/equipment.",
    },
    {
      type: "INDIVIDUAL SECURED",
      logo: <HandCoinsIcon size={200} />,
      description:
        "This product is for clients seeking financial assistance for personal purposes, either for house renovation, house construction, placement fee or medical expenses. This product is fully secured by a collateral in the form of a real estate (land title) or vehicle/equipment.",
    },
    {
      type: "CHATTEL FINANCING",
      logo: <TractorIcon size={200} />,
      description:
        "This product enables farmers to procure farm equipment (harvester, tractor, trucks) for greater yield and further agricultural activities. This product is fully secured by the unit to be financed or with additional real estate collateral such as a land title.",
    },
  ];

  const smallBusinessLoans = [
    {
      type: "TERM LOAN",
      logo: <LucideChartCandlestick size={200} />,
      description:
        "This is for long-term investments such as construction, renovation/improvement, acquiring new assets, equipment and/or vehicle for business use. This product is fully secured by a collateral in a form of real estate or vehicle/equipment.",
    },
    {
      type: "CREDIT LINE",
      logo: <CellTowerIcon size={200} />,
      description:
        "This is for short-term needs such as for working or additional capitalization for their business. This product is fully secured by collateral in a form of real estate vehicle/equipment.",
    },
    {
      type: "CHATTEL FINANCING",
      logo: <TractorIcon size={200} />,
      description:
        "This is for the acquisition of trucks and heavy equipment and/or vehicle for their business use. This product is fully secured by the unit to be financed or with additional real estate collateral.",
    },
    {
      type: "UNSECURED",
      logo: <LockKeyOpenIcon size={200} />,
      description:
        "This is for short-term needs such as for working or additional capitalization for their business. Collaterals in the form of real estate or vehicle/equipment are for safe- keeping only.",
    },
    {
      type: "BILLS/CHECK REDISCOUNTING",
      logo: <CashRegisterIcon size={200} />,
      description:
        "This is for bridging the gap between their immediate cash needs and the clearing of their postdated checks for their cashflow.",
    },
  ];

  return (
    <>
      <main className="flex flex-col gap-[40px] lg:gap-[80px] pb-[50px]">
        <section
          id="main"
          className="flex flex-col-reverse lg:flex-row text-[#396131] gap-[40px] lg:gap-0 bg-white drop-shadow-lg mx-[5px] p-[20px] lg:mx-[10px] rounded-[8px] lg:py-[50px]"
        >
          <div className="flex flex-col gap-[20px] lg:py-[80px] lg:px-[60px] lg:mx-[10px] lg:w-3/5">
            <div className="flex flex-col gap-[20px]">
              <span className="text-[2rem]/[2rem] lg:text-[4rem]/[4rem] font-bold">
                Consumer Protection
              </span>
              <span className="text-[1.5rem]/[1.5rem] lg:text-[3rem]/[3rem] font-semibold">
                Product Requirements
              </span>
            </div>
            <span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
              At 1st Valley Bank, your protection starts with every product we
              offer. Our Consumer Protection: 1VB Products initiative ensures
              that each loan, deposit, and service is designed with fairness,
              transparency, and your best interest in mind. Know your rights,
              stay informed, and bank with confidence—because you deserve
              nothing less.
            </span>
          </div>
          <div className="flex items-center justify-center lg:w-2/5">
            <FontAwesomeIcon
              icon={faFileSignature}
              className="flex aspect-square text-[7.5rem] lg:text-[23rem]"
            />
          </div>
        </section>
        <section
          id="salary-loans"
          data-scroll
          className="flex flex-col gap-[80px] mx-[40px] lg:mx-[80px] text-[#396131]"
        >
          <div className="flex flex-col lg:flex-row gap-[20px]">
            <div className="flex items-center justify-center lg:w-2/5">
              <FontAwesomeIcon
                icon={faCommentsDollar}
                className="flex aspect-square text-[7.5rem] lg:text-[23rem]"
              />
            </div>
            <div className="flex flex-col justify-between gap-[30px] lg:w-3/5">
              <div className="flex flex-col gap-[20px]">
                <span className="text-[2rem]/[2rem] lg:text-[3rem]/[3rem] font-bold">
                  Salary Loans
                </span>
                <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
                  These loans offered to salaried individuals may it be private
                  or government employees, generally require a memorandum of
                  agreement between the company and of the government agency.
                  This agreement is for the purpose of implementing an automatic
                  payroll deduction system (APDS), so that individuals availing
                  of this product do not need to go to the bank to repay their
                  loan. We may also require post-dated cheques (PDCs) or an ATM
                  card in the absence of a memorandum of agreement.
                </span>
              </div>
              <NavLink
                to="/loans/salary"
                className="flex items-center justify-center w-full h-[30px] lg:h-[60px] font-bold text-center rounded-[5px] lg:rounded-[16px] bg-[#396131] text-white text-[0.8rem]/[1.6rem] lg:text-[1.5rem] outline-0 outline-[#396131] transition-all transform duration-200 hover:bg-white hover:outline-1 hover:text-[#396131]"
              >
                <span>Learn More</span>
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-[60px]">
            <div className="flex flex-col gap-[30px] lg:w-1/2">
              <span className="text-[1.5rem]/[2.25rem] text-center lg:text-left font-bold">
                Salary-based general purpose consumption loans categories
              </span>
              <div className="flex flex-col gap-[20px]">
                {[
                  ["ATM.", "ATM Loan and other salary loans"],
                  ["DepEd APDS.", "DepEd Teachers"],
                  [
                    "Barangay Loans.",
                    "Elected and appointed barangay officials",
                  ],
                  ["LGU.", "Local government employees and elected officials"],
                ].map((statement, index) => (
                  <div
                    key={index}
                    className="flex items-start lg:items-center gap-[20px]"
                  >
                    <FontAwesomeIcon
                      icon={faCheckSquare}
                      className="flex aspect-square text-[1.5rem]"
                    />
                    <span className="text-[0.8rem]">
                      {" "}
                      <b>{statement[0]}</b> {statement[1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-[30px] lg:w-1/2">
              <span className="text-[1.5rem]/[1.5rem] font-bold">
                General Requirements
              </span>
              <div className="flex flex-col gap-[20px]">
                {[
                  "Employment/Service Record",
                  "Valid IDs",
                  "Payroll/Pay Slip",
                ].map((statement, index) => (
                  <div key={index} className="flex items-center gap-[20px]">
                    <FontAwesomeIcon
                      icon={faCheckSquare}
                      className="flex aspect-square text-[1.5rem]"
                    />
                    <span className="font-bold text-[0.8rem] lg:text-[1rem]">
                      {statement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id="savings-deposit"
          className="flex flex-col bg-[#396131] text-white mx-[15px] rounded-[8px] gap-[80px] p-[20px] lg:px-[60px] lg:py-[80px] drop-shadow-lg"
        >
          <div className="flex flex-col-reverse lg:flex-row gap-[20px]">
            <div className="flex flex-col justify-between gap-[20px] lg:w-3/5">
              <div className="flex flex-col gap-[20px]">
                <span className="text-[2rem]/[2rem] lg:text-[3rem]/[3rem] font-bold">
                  Savings Deposit
                </span>
                <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
                  Our deposit products have registered a growth of 11.82% in
                  2021 with high- cost deposits outnumbering low-cost deposits
                  by a slight margin only or 6.0% difference.
                </span>
              </div>
              <NavLink
                to="/loans/salary"
                className="flex items-center justify-center w-full h-[30px] lg:h-[60px] font-bold text-center rounded-[5px] lg:rounded-[16px] text-[#396131] bg-white text-[0.8rem] lg:text-[1.5rem] outline-0 outline-white transition-all transform duration-200 hover:text-white hover:outline-1 hover:bg-[#396131]"
              >
                <span>Learn More</span>
              </NavLink>
            </div>
            <div className="flex items-center justify-center lg:w-2/5">
              <FontAwesomeIcon
                icon={faMoneyBillTransfer}
                className="flex aspect-square"
                style={{ width: "70%", height: "auto" }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[40px] lg:gap-[80px]">
            <span className="font-bold text-white text-[2rem]/[2rem] text-center">
              Our Deposit Products
            </span>
            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 text-white">
              {depositProducts.map((product, index) => {
                const isLast = index === depositProducts.length - 1;
                const isOddCount = depositProducts.length % 2 !== 0;
                const colSpanClass = isLast && isOddCount ? "col-span-2" : "";
                return (
                  <div
                    key={index}
                    className={`group relative ${colSpanClass} bg-white/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100`}
                  >
                    {/* Card gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#396131]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative p-8 lg:p-10">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8">
                        {/* Icon Container */}
                        <div className="flex-shrink-0 relative">
                          <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-[#396131] to-[#4a7a3f] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <FontAwesomeIcon
                              icon={product.logo}
                              className="text-white text-3xl lg:text-4xl"
                            />
                          </div>
                          {/* Decorative ring */}
                          <div className="absolute -inset-2 bg-gradient-to-br from-[#396131]/20 to-[#4a7a3f]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="text-xl lg:text-2xl font-bold mb-3  transition-colors duration-300">
                            {product.type}
                          </h3>
                          <p className="leading-relaxed mb-6 text-sm lg:text-base">
                            {product.description}
                          </p>

                          {/* CTA Button */}
                          <NavLink
                            to={""}
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
                );
              })}
            </div>
            <div className="lg:hidden grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 text-white">
              {depositProducts.map((product, index) => {
                return (
                  <div
                    key={index}
                    className={`group relative bg-white/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100`}
                  >
                    {/* Card gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#396131]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative p-8 lg:p-10">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8">
                        {/* Icon Container */}
                        <div className="flex-shrink-0 relative">
                          <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-[#396131] to-[#4a7a3f] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <FontAwesomeIcon
                              icon={product.logo}
                              className="text-white text-3xl lg:text-4xl"
                            />
                          </div>
                          {/* Decorative ring */}
                          <div className="absolute -inset-2 bg-gradient-to-br from-[#396131]/20 to-[#4a7a3f]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="text-xl lg:text-2xl font-bold mb-3  transition-colors duration-300">
                            {product.type}
                          </h3>
                          <p className="leading-relaxed mb-6 text-sm lg:text-base">
                            {product.description}
                          </p>

                          {/* CTA Button */}
                          <NavLink
                            to={""}
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
                );
              })}
            </div>
          </div>
        </section>
        <section
          id="sucre-loans"
          data-scroll
          className="flex flex-col gap-[80px] mx-[40px] lg:mx-[80px] text-[#396131]"
        >
          <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[20px]">
            <div className="flex items-center justify-center lg:w-2/5">
              <FontAwesomeIcon
                icon={faMoneyBillWheat}
                className="flex aspect-square text-[7.5rem] lg:text-[23rem]"
              />
            </div>
            <div className="flex flex-col justify-between lg:w-3/5 gap-[20px]">
              <div className="flex flex-col gap-[20px]">
                <span className="text-[1.5rem]/[1.5rem] lg:text-[3rem]/[3rem] font-bold">
                  Supervised Credit (SUCRE)
                </span>
                <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
                  A set of loan products that aims to provide farmers not only
                  with financial assistance, but also to help educate them of
                  the modern farming methods and technology. This is why 1st
                  Valley Bank employs the services of agricultural specialists
                  and assigns them for this purpose. Through the product, the
                  Bank aims to fulfill its mission of becoming the partner of
                  the government for countryside development.
                </span>
              </div>
              <NavLink
                to="/loans/supervised-credit"
                className="flex items-center justify-center w-full h-[30px] lg:h-[60px] font-bold text-center rounded-[5px] lg:rounded-[16px] bg-[#396131] text-white text-[0.8rem] lg:text-[1.5rem] outline-0 outline-[#396131] transition-all transform duration-200 hover:bg-white hover:outline-1 hover:text-[#396131]"
              >
                <span>Learn More</span>
              </NavLink>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[40px] gap-y-[40px] lg:gap-y-[80px]">
            {supervisedCreditProducts.map((product, index) => (
              <div className="flex flex-col lg:flex-row gap-[20px]">
                <div
                  className="flex items-center justify-center lg:w-1/2"
                  key={index}
                >
                  {product.logo}
                </div>
                <div className="flex flex-col justify-between gap-[30px] lg:w-1/2">
                  <div className="flex flex-col gap-[10px]">
                    <span className="font-bold text-center lg:text-left text-[1.5rem]/[1.5rem]">
                      {product.type}
                    </span>
                    <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
                      {product.description}
                    </span>
                  </div>
                  <NavLink
                    to="/loans/supervised-credit"
                    className="flex items-center justify-center w-full h-[30px] lg:h-[40px] font-bold text-center rounded-[5px] lg:rounded-[10px] bg-[#396131] text-white text-[0.8rem] lg:text-[1rem] outline-0 outline-[#396131] transition-all transform duration-200 hover:bg-white hover:outline-1 hover:text-[#396131]"
                  >
                    <span>Learn More</span>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section
          id="agriculture-loans"
          className="flex flex-col gap-[80px] mx-[15px] bg-[#396131] text-white px-[30px] py-[40px] lg:px-[60px] lg:py-[80px] rounded-[8px] drop-shadow-lg"
        >
          <div className="flex flex-col-reverse lg:flex-row gap-[30px] lg:gap-[20px]">
            <div className="flex flex-col justify-between lg:w-3/5 gap-[20px]">
              <div className="flex flex-col gap-[20px]">
                <span className="text-[1.5rem]/[1.5rem] lg:text-[3rem]/[3rem] font-bold">
                  Agriculture & Agrarian Reform Loans
                </span>
                <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
                  Agriculture and Agrarian Reform (Agri-Agra) loans are secured
                  lending products that provide financial assistance to farmers
                  engaged in agricultural and/or agrarian reform activities.
                  Farmers can use these funds to expand or diversify farming
                  activities resulting in an increase in their income.
                </span>
              </div>
              <NavLink
                to="/loans/agriculture"
                className="flex items-center justify-center w-full h-[30px] lg:h-[60px] font-bold text-center rounded-[5px] lg:rounded-[16px] text-[#396131] bg-white text-[0.8rem] lg:text-[1.5rem] outline-0 outline-white transition-all transform duration-200 hover:text-white hover:outline-1 hover:bg-[#396131]"
              >
                <span>Learn More</span>
              </NavLink>
            </div>
            <div className="flex items-center justify-center lg:w-2/5">
              <FontAwesomeIcon
                icon={faWheatAwn}
                className="flex aspect-square"
                style={{ width: "50%", height: "auto" }}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[20px]">
            {agricultureLoans.map((loan, index) => (
              <div className="flex flex-col justify-between gap-[40px]">
                <div className="flex flex-col items-center gap-[30px]">
                  <div className="flex">{loan.logo}</div>
                  <div className="flex flex-col gap-[20px]">
                    <span className="text-center text-[1rem]/[1rem] lg:text-[1.5rem]/[1.5rem] font-bold">
                      {loan.type}
                    </span>
                    <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
                      {loan.description}
                    </span>
                  </div>
                </div>
                <NavLink
                  to="/loans/salary"
                  className="flex items-center justify-center w-full h-[30px] lg:h-[40px] font-bold text-center rounded-[5px] lg:rounded-[10px] text-[#396131] bg-white text-[0.8rem] lg:text-[1rem] outline-0 outline-white transition-all transform duration-200 hover:text-white hover:outline-1 hover:bg-[#396131]"
                >
                  <span>Learn More</span>
                </NavLink>
              </div>
            ))}
          </div>
          <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[10px]">
            <div className="flex flex-col gap-[40px] lg:w-1/2">
              <span className="text-[1rem]/[1rem] lg:text-[2rem]/[2rem] font-bold">
                Financial Documents
              </span>
              <div className="flex flex-col gap-[20px]">
                {[
                  "Proof of Income",
                  "Three (3) Months Latest Payslip/Payroll - if employed",
                  "Three (3) Months Latest Sales Journal if business",
                  "Two (2) Latest Cropping PESADA - if with farm",
                  "Three (3) Months Latest SOA/Proof of Remittance-if allotment",
                  "Three (3) Months Latest Bank Statement",
                  "List of Assets",
                  "Business Permit",
                  "Latest ITR & FS - Php 3 million and above loan",
                ].map((requirement, index) => (
                  <div className="flex items-center gap-[20px]" key={index}>
                    <ChecksIcon size={30} />
                    <span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
                      {requirement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-[40px] lg:w-1/2">
              <div className="flex flex-col gap-[40px]">
                <span className="text-[1rem]/[1rem] lg:text-[2rem]/[2rem] font-bold">
                  Personal/Client's Information
                </span>
                <div className="flex flex-col gap-[20px]">
                  {["Two (2) Valid IDs (Spouses)", "Proof of Billing"].map(
                    (requirement, index) => (
                      <div className="flex items-center gap-[20px]" key={index}>
                        <ChecksIcon size={30} />
                        <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[2rem]">
                          {requirement}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-[40px]">
                <span className="text-[1rem]/[1rem] lg:text-[2rem]/[2rem] font-bold">
                  Collateral Requirements
                </span>
                <div className="flex flex-col gap-[20px]">
                  {[
                    "Certified True Copy of Land Title",
                    "Tax Declaration",
                    "Tax Clearance/RPT",
                    "Sketch Plan",
                    "Price Quotation, if financing",
                    "Copy of OR/CR, if vehicle",
                    "Certificate of Ownership, if equipment",
                  ].map((requirement, index) => (
                    <div className="flex items-center gap-[20px]" key={index}>
                      <ChecksIcon size={30} />
                      <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[2rem]">
                        {requirement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="gems-sbl-microfinance-loans"
          className="flex flex-col gap-[40px] lg:gap-[80px] mx-[15px] lg:mx-[80px] text-[#396131]"
        >
          <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[20px]">
            <div className="grid grid-cols-2 gap-y-[20px] lg:w-2/5">
              {[faLaptopHouse, faGem, faBreadSlice].map((icon, index) => {
                const isLast = index === 3 - 1;
                const isOddCount = 3 % 2 !== 0;
                const colSpanClass = isLast && isOddCount ? "col-span-2" : "";
                return (
                  <div className={`flex justify-center ${colSpanClass}`}>
                    <FontAwesomeIcon
                      icon={icon}
                      className="flex items-center"
                      style={{
                        width: isLast && isOddCount ? "25%" : "50%",
                        height: "auto",
                      }}
                      key={index}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col justify-between lg:w-3/5 gap-[20px] lg:gap-0">
              <div className="flex flex-col gap-[20px]">
                <span className="text-[1.5rem]/[1.5rem] lg:text-[3rem]/[3rem] font-bold">
                  SBL, Gold & Gems, and Microfinance
                </span>
                <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
                  At 1st Valley Bank, transparency matters. We make it easy to
                  understand what you need to apply for Small Business Loans,
                  Gold & Gems Loans, and Microfinance. From basic documents to
                  key qualifications, we’ve laid it all out—clear, simple, and
                  customer-first—so you can move forward with confidence and
                  clarity.
                </span>
              </div>
              <NavLink
                to="/loans"
                className="flex items-center justify-center w-full h-[30px] lg:h-[60px] font-bold text-center rounded-[5px] lg:rounded-[16px] bg-[#396131] text-white text-[0.8rem] lg:text-[1.5rem] outline-0 outline-[#396131] transition-all transform duration-200 hover:bg-white hover:outline-1 hover:text-[#396131]"
              >
                <span>Learn More</span>
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col gap-[40px]">
            <div className="flex flex-col gap-[20px]">
              <span className="text-[1.5rem]/[1.5rem] lg:text-[3rem]/[3rem] font-bold">
                Small Business Loans (SBL)
              </span>
              <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
                Small Business Loans (SBL) are for entrepreneurs who need funds
                to expand their business, procure equipment or vehicle, or to
                use as working capital. When they meet the requirements, they
                can get as much as P1M payable in 12 months 24 months, or 36
                months, whichever is applicable.
              </span>
            </div>
            <div className="flex flex-col gap-[30px]">
              <span className="text-[1rem]/[1rem] lg:text-[1.5rem]/[1.5rem] font-bold">
                Basic Requirements
              </span>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[20px] gap-x-[10px]">
                {[
                  "Latest Business Permit",
                  "Sales Journal",
                  "List of Assets",
                  "Photocopy of Valid IDs",
                  "Statement of Account latest three (3) months",
                  "Latest 2x2 Picture",
                  "Certified Thru Copy of the land title, as applicable",
                  "Picture of the Vehicle - for SBL Vehicle Financing",
                  "Picture of Business/Establishment",
                  "OR/CR of the Vehicle to Finance for SBL Vehicle Financing",
                ].map((requirement, index) => (
                  <div className="flex items-center gap-[20px]" key={index}>
                    <ChecksIcon size={30} />
                    <span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
                      {requirement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[40px]">
            <div className="flex flex-col gap-[20px]">
              <span className="text-[1.5rem]/[1.5rem] lg:text-[2rem]/[2rem] font-bold">
                Gold and Gems Loans
              </span>
              <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
                For all those who need quick cash and have authentic jewelry
                item/s to submit as collateral.
              </span>
            </div>
            <div className="flex flex-col lg:flex-row gap-[30px] lg:gap-[10px]">
              <div className="flex flex-col gap-[30px] lg:w-1/2">
                <span className="text-[1rem]/[1rem] lg:text-[1.5rem]/[1.5rem] font-bold">
                  Basic Requirements
                </span>
                <div className="flex flex-col gap-[20px]">
                  {[
                    "Photocopy of Valid IDs",
                    "Latest 2x2 Picture",
                    "Genuine Jewelry Item/s",
                  ].map((requirement, index) => (
                    <div className="flex items-center gap-[20px]" key={index}>
                      <ChecksIcon size={30} />
                      <span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
                        {requirement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-[30px] lg:w-1/2">
                <span className="text-[1rem]/[1rem] lg:text-[1.5rem]/[1.5rem] font-bold">
                  For Buyouts
                </span>
                <div className="flex flex-col gap-[20px]">
                  {[
                    "Photocopy of Valid IDs",
                    "Pawn ticket or Promissory Note of Pledged Items to buy-out",
                    "Proof of Income",
                    "Statement of Checking Account (latest three (3) months",
                    "List of Assets",
                    "Latest 2x2 Picture",
                  ].map((requirement, index) => (
                    <div className="flex items-center gap-[20px]" key={index}>
                      <ChecksIcon size={30} />
                      <span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
                        {requirement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[40px]">
            <div className="flex flex-col gap-[20px]">
              <span className="text-[1.5rem]/[1.5rem] lg:text-[2rem]/[2rem] font-bold">
                Microfinance Loans
              </span>
              <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
                For micro entrepreneurs who wish to expand their business. They
                can get affordable funds that they can repay easily and
                conveniently. They will also receive technical assistance to
                ensure the profitable growth of their business.
              </span>
            </div>
            <div className="flex flex-col gap-[50px]">
              <div className="flex flex-col lg:flex-col gap-[30px] lg:gap-[10px]">
                <div className="flex flex-col gap-[30px] lg:w-1/2">
                  <span className="text-[1rem]/[1rem] lg:text-[1.5rem]/[1.5rem] font-bold">
                    Basic Requirements
                  </span>
                  <div className="flex flex-col gap-[20px]">
                    {[
                      "Photocopy of business permit or barangay permit",
                      "Picture of business/inventory",
                      "Proof of income",
                      "Cash flow statement",
                      "Proof of ownership/certification - original copy",
                      "Picture of items on undertaking, if any",
                    ].map((requirement, index) => (
                      <div className="flex items-center gap-[20px]" key={index}>
                        <ChecksIcon size={30} />
                        <span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
                          {requirement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[30px] lg:w-1/2">
                  <span className="text-[1rem]/[1rem] lg:text-[1.5rem]/[1.5rem] font-bold">
                    Requirements for Co-Makers
                  </span>
                  <div className="flex flex-col gap-[20px]">
                    {["Cash Flow", "Proof of Income"].map(
                      (requirement, index) => (
                        <div
                          className="flex items-center gap-[20px]"
                          key={index}
                        >
                          <ChecksIcon size={30} />
                          <span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
                            {requirement}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[30px]">
                <span className="text-[1rem]/[1rem] lg:text-[1.5rem]/[1.5rem] font-bold">
                  Existing Client/Renewal
                </span>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[20px] gap-x-[10px]">
                  {[
                    "Photocopy of the updated business permit or barangay permit",
                    "Bank statement - deposit",
                    "Picture of business/inventory",
                    "Proof of ownership/certification - original copy",
                    "Proof of income",
                    "Picture of items on undertaking, if any",
                    "Bank statement - loan",
                    "Documents of co-makers",
                  ].map((requirement, index) => (
                    <div className="flex items-center gap-[20px]" key={index}>
                      <ChecksIcon size={30} />
                      <span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
                        {requirement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="sme-loans"
          className="flex flex-col gap-[80px] px-[20px] py-[30px] lg:px-[60px] lg:py-[80px] bg-[#396131] mx-[15px] text-white rounded-[8px]"
        >
          <div className="flex flex-col-reverse gap-[30px] lg:gap-[20px]">
            <div className="flex flex-col justify-between lg:w-3/5 gap-[20px] lg:gap-0">
              <div className="flex flex-col gap-[20px]">
                <span className="text-[1.5rem]/[2.25rem] lg:text-[3rem]/[3rem] font-bold">
                  Small and Medium Enterprise Loans (SME)
                </span>
                <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
                  As the best-selling product of the Bank, our SME loans provide
                  entrepreneurs with the funds they need for (1) growth and
                  expansion of their business, (2) purchase of trucks and heavy
                  equipment, (3) construction of warehouse and building, and (4)
                  trade check discounting for their continued cash flow.
                </span>
              </div>
              <NavLink
                to="/loans/small-and-medium-enterprises"
                className="flex items-center justify-center w-full h-[30px] lg:h-[60px] font-bold text-center rounded-[5px] lg:rounded-[16px] text-[#396131] bg-white text-[0.8rem] lg:text-[1.5rem] outline-0 outline-white transition-all transform duration-200 hover:text-white hover:outline-1 hover:bg-[#396131]"
              >
                <span>Learn More</span>
              </NavLink>
            </div>
            <div className="flex items-center justify-center lg:w-2/5">
              <FontAwesomeIcon
                icon={faTractor}
                className="flex aspect-square"
                style={{ width: "50%", height: "auto" }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-[20px] gap-y-[80px]">
            {smallBusinessLoans.map((loan, index) => (
              <div className="flex flex-col justify-between gap-[40px]">
                <div className="flex flex-col items-center gap-[30px]">
                  <div className="flex">{loan.logo}</div>
                  <div className="flex flex-col gap-[20px]">
                    <span className="text-center text-[1rem]/[1rem] lg:text-[1.5rem]/[1.5rem] font-bold">
                      {loan.type}
                    </span>
                    <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
                      {loan.description}
                    </span>
                  </div>
                </div>
                <NavLink
                  to="/loans/small-and-medium-enterprises"
                  className="flex items-center justify-center w-full h-[30px] lg:h-[40px] font-bold text-center rounded-[5px] lg:rounded-[10px] text-[#396131] bg-white text-[0.8rem] lg:text-[1rem] outline-0 outline-white transition-all transform duration-200 hover:text-white hover:outline-1 hover:bg-[#396131]"
                >
                  <span>Learn More</span>
                </NavLink>
              </div>
            ))}
          </div>
          <div className="flex flex-col lg:flex-col gap-[30px] lg:gap-[10px]">
            <div className="flex flex-col gap-[40px] lg:w-1/2">
              <span className="text-[1rem]/[1rem] lg:text-[2rem]/[2rem] font-bold">
                Financial Documents
              </span>
              <div className="flex flex-col gap-[20px]">
                {[
                  "Proof of Income",
                  "Three (3) Months Latest Payslip/Payroll - if employed",
                  "Three (3) Months Latest Sales Journal if business",
                  "Two (2) Latest Cropping PESADA - if with farm",
                  "Three (3) Months Latest SOA/Proof of Remittance-if allotment",
                  "Three (3) Months Latest Bank Statement",
                  "List of Assets",
                  "Business Permit",
                  "Latest ITR & FS - Php 3 million and above loan",
                ].map((requirement, index) => (
                  <div className="flex items-center gap-[20px]" key={index}>
                    <ChecksIcon size={30} />
                    <span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
                      {requirement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-[40px] lg:w-1/2">
              <div className="flex flex-col gap-[40px]">
                <span className="text-[1rem]/[1rem] lg:text-[2rem]/[2rem] font-bold">
                  Personal/Client's Information
                </span>
                <div className="flex flex-col gap-[20px]">
                  {["Two (2) Valid IDs (Spouses)", "Proof of Billing"].map(
                    (requirement, index) => (
                      <div className="flex items-center gap-[20px]" key={index}>
                        <ChecksIcon size={30} />
                        <span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
                          {requirement}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-[40px]">
                <span className="text-[1rem]/[1rem] lg:text-[2rem]/[2rem] font-bold">
                  Collateral Requirements
                </span>
                <div className="flex flex-col gap-[20px]">
                  {[
                    "Certified True Copy of Land Title",
                    "Tax Declaration",
                    "Tax Clearance/RPT",
                    "Sketch Plan",
                    "Price Quotation, if financing",
                    "Copy of OR/CR, if vehicle",
                    "Certificate of Ownership, if equipment",
                  ].map((requirement, index) => (
                    <div className="flex items-center gap-[20px]" key={index}>
                      <ChecksIcon size={30} />
                      <span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
                        {requirement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
