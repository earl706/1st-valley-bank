import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExpand,
  faUpDownLeftRight,
  faPiggyBank,
  faCreditCard,
  faHandsHoldingChild,
  faMoneyBillTransfer,
  faSackDollar,
  faGraduationCap,
  faMagnifyingGlassDollar,
  faBuildingUser,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Deposits() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [activeSection, setActiveSection] = useState("");

  const features = [
    {
      name: "Regular Savings",
      icon: faPiggyBank,
      description:
        "This account is for individuals eighteen (18) years old and above whose purpose is for personal savings.",
    },
    {
      name: "Kiddie & Teen Savings",
      icon: faCreditCard,
      description:
        "The Kiddie and Teen Savings are offered to children ages 8 to 17 years. If the account holder reaches the age of eighteen (18), he/she has the option to close the account or open a new regular account.",
    },
    {
      name: "Basic Deposit",
      icon: faHandsHoldingChild,
      description:
        "Designed for individuals eighteen (18) years old and above, this account aims to promote financial inclusion to the unserved and underserved individuals and micro-entrepreneurs.",
    },
    {
      name: "Payroll Servicing Deposit",
      icon: faMoneyBillTransfer,
      description:
        "This account is for private employers who wish to avail of the Bank's ATM payroll services for the salaries and other benefits of its employees. The opening and maintenance of the accounts shall be based on the Memorandum of Agreement (MOA) entered into by and between the bank.",
    },
    {
      name: "Student ATM Savings",
      icon: faSackDollar,
      description:
        "This account is designed for kids and teens aged 7 to 19 years old. It has a low initial deposit of P100 and the minimum balance to earn interest is only P500. The account offers an interest rate of 1.00% per annum, higher than a regular savings account.",
    },
    {
      name: "Special Savings Deposit",
      icon: faGraduationCap,
      description:
        "This account is designed for kids and teens aged 7 to 19 years old. It has a low initial deposit of P100 and the minimum balance to earn interest is only P500. The account offers an interest rate of 1.00% per annum, higher than a regular savings account.",
    },
    {
      name: "ATM Savings",
      icon: faMagnifyingGlassDollar,
      description:
        "This account is for individuals eighteen (18) years old and above. ATM is convenient banking and enables cashless purchases.",
    },
  ];

  const savingsDeposit = [
    {
      account: "Regular Savings",
      required_initial_deposit: "1,000.00",
      required_monthly_ADB: "1,000.00",
      required_monthly_ADB_to_earn_interest: "1,000.00",
      interest_rate_per_annum_below: "0.10",
      interest_rate_per_annum_above: "0.15",
    },
    {
      account: "Kids & Teens Savings Account",
      required_initial_deposit: "100.00",
      required_monthly_ADB: "500.00",
      required_monthly_ADB_to_earn_interest: "500.00",
      interest_rate_per_annum_below: "0.10",
      interest_rate_per_annum_above: "0.15",
    },
    {
      account: "Basic Deposit",
      required_initial_deposit: "100.00",
      required_monthly_ADB: "NONE",
      required_monthly_ADB_to_earn_interest: "500.00",
      interest_rate_per_annum_below: "0.10",
      interest_rate_per_annum_above: "0.15",
    },
    {
      account: "ATM Savings",
      required_initial_deposit: "1,000.00",
      required_monthly_ADB: "1,000.00",
      required_monthly_ADB_to_earn_interest: "1,000.00",
      interest_rate_per_annum_below: "0.10",
      interest_rate_per_annum_above: "0.15",
    },
    {
      account: "ATM Payroll Services ",
      required_initial_deposit: "Based on Agreement",
      required_monthly_ADB: "1,000.00",
      required_monthly_ADB_to_earn_interest: "1,000.00",
      interest_rate_per_annum_below: "0.10",
      interest_rate_per_annum_above: "0.15",
    },
    {
      account: "ATM Payroll Services ",
      required_initial_deposit: "Based on Agreement",
      required_monthly_ADB: "Based on Agreement",
      required_monthly_ADB_to_earn_interest: "100.00",
      interest_rate_per_annum_below: "0.10",
      interest_rate_per_annum_above: "0.15",
    },
  ];

  const checkingCurrentAccount = [
    {
      account: "Personal",
      required_initial_deposit: "5,000.00",
      required_monthly_ADB: "10,000.00",
      required_monthly_ADB_to_earn_interest: "10,000.00",
      interest_rate_per_annum_below: "0.10",
      interest_rate_per_annum_above: "0.15",
    },
    {
      account: "Corporate",
      required_initial_deposit: "10,000.00",
      required_monthly_ADB: "10,000.00",
      required_monthly_ADB_to_earn_interest: "10,000.00",
      interest_rate_per_annum_below: "0.10",
      interest_rate_per_annum_above: "0.15",
    },
  ];

  const terms = [
    {
      term: "3 Months",
      initial_amount: "5,000.00",
      interest_per_annum: "4.00% gross(renewal) 4.50% gross(new)",
    },
    {
      term: "3 Months",
      initial_amount: "5,000.00",
      interest_per_annum: "4.75% gross(renewal) 4.50% gross(new)",
    },
    {
      term: "1 Year",
      initial_amount: "50,000.00",
      interest_per_annum: "6.00% gross(renewal) 4.50% gross(new)",
    },
    {
      term: "5 Years and 1 Day Annually",
      initial_amount: "50,000.00",
      interest_per_annum:
        "6.0% net-interest credited to savings account annually",
    },
    {
      term: "5 Years and 1 Day",
      initial_amount: "50,000.00",
      interest_per_annum: "6.0% net credited upon maturity",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers = [];

    const createObserver = (threshold = 0.1) => {
      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting,
            }));

            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold, rootMargin: "-50px 0px" }
      );
    };

    const observer = createObserver();
    const elements = document.querySelectorAll("[data-scroll]");
    elements.forEach((el) => observer.observe(el));
    observers.push(observer);

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <main className="hidden lg:flex flex-col gap-[120px] pb-[50px]">
        <nav className="fixed top-35 right-4 z-40 bg-black bg-opacity-50 backdrop-blur-lg rounded-2xl p-2">
          <div className="flex flex-col gap-2">
            {[
              "main",
              "header",
              "features",
              "requirements",
              "savings-deposit",
              "checking-current-deposit",
            ].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSection === section
                    ? "bg-[#396131] scale-125 cursor-pointer"
                    : "bg-gray-500 hover:bg-gray-300 cursor-pointer"
                }`}
              />
            ))}
          </div>
        </nav>

        <section
          id="main"
          data-scroll
          className="text-[#396131] bg-white drop-shadow-lg mx-[10px] rounded-[8px]"
        >
          <div className="flex flex-col gap-[20px] w-1/2 py-[80px] px-[60px] mx-[10px]">
            <div className="flex flex-col gap-[10px]">
              <span className="text-[4rem]/[4rem] font-bold">Deposits</span>
              <span className="text-[1.5rem]/[1.5rem] font-bold">
                Saving with a smile
              </span>
            </div>
            <span className="text-[1rem]/[2rem]">
              This savings account offers an annual interest rate that is 0.5%
              higher than what most banks typically provide. It stands out as a
              wise and practical option for individuals looking to securely park
              their cash while earning a slightly better return compared to
              conventional savings accounts, making it a smart financial
              decision
            </span>
          </div>
        </section>
        <section id="header" data-scroll className="mx-[40px]">
          <div className="flex flex-col justify-center gap-[70px] px-[40px] text-[#396131]">
            <span className="text-[2.5rem]/[2.5rem] font-bold text-center">
              Deposit Portfolio Now at Php 7.5B
            </span>
            <div className="flex justify-center gap-[30px]">
              <div className="flex justify-center w-2/5">
                {" "}
                <FontAwesomeIcon
                  icon={faUpDownLeftRight}
                  className="flex aspect-square"
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
              <div className="flex flex-col justify-start gap-[20px] w-3/5">
                <span className="text-[1.5rem]/[3rem] font-bold">
                  Stella Maris Aranas, Product Manager
                </span>
                <span className="text-[1rem]/[2rem]">
                  1VB Deposit has grown bigger with a portfolio increase of
                  784.063 million. It is now at Php7.5B with a good mix of low
                  and high-cost deposit. 40 ATMs have been deployed
                  strategically enabling 1VB consumers to experience convenient
                  banking.
                </span>
              </div>
            </div>
          </div>
        </section>
        <section id="features" data-scroll className="text-white">
          <div className="grid grid-cols-3 bg-[#396131] gap-x-[100px] gap-y-[50px] px-[60px] py-[80px]">
            {features.map((feature, index) => (
              <div className="flex flex-col justify-start items-center gap-[30px]">
                <FontAwesomeIcon
                  icon={feature.icon}
                  className="flex aspect-square"
                  style={{ width: "100px", height: "80px" }}
                />
                <span className="font-bold text-[1rem]/[1rem]">
                  {feature.name}
                </span>
                <span className="text-[1rem]/[2rem] text-center">
                  {feature.description}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section id="requirements" data-scroll className="text-[#396131]">
          <div className="flex justify-center gap-[175px] mx-[80px]">
            <div className="flex flex-col gap-[40px] w-1/2">
              <div className="flex flex-col items-center gap-[50px]">
                <FontAwesomeIcon
                  icon={faBuildingUser}
                  className="flex aspect-square"
                  style={{ width: "100px", height: "80px" }}
                />
                <span className="text-[1.5rem]/[1.5rem] font-bold text-center">
                  Requirements for Account Opening-Corporate
                </span>
              </div>
              <div className="flex flex-col gap-[30px]">
                {[
                  "SEC Certificate of Registration",
                  "Notarized Secretary Certificate",
                  "Articles Of Incorporation & By-Laws",
                  "Notarized Board Resolution to open an account with 1vb, election of officers and authorized signatories",
                  "Two Valid IDs of Signatories",
                  "Three recent 2x2 picture of Signatories",
                  "Business Permit",
                  "General Information Sheet",
                ].map((requirement, index) => (
                  <div className="flex items-center gap-[30px]" key={index}>
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className="flex aspect-square"
                      style={{ width: "30px", height: "30px" }}
                    />
                    <span className="text-[0.9rem]/[0.9rem]">
                      {requirement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-[40px] w-1/2">
              <div className="flex flex-col items-center gap-[50px]">
                <FontAwesomeIcon
                  icon={faUser}
                  className="flex aspect-square"
                  style={{ width: "100px", height: "80px" }}
                />
                <span className="text-[1.5rem]/[1.5rem] font-bold text-center">
                  Requirements for Account Opening-Corporate
                </span>
              </div>
              <div className="flex flex-col gap-[30px]">
                {[
                  "Colored photocopy of 2 Valid IDs",
                  "Three pieces 2x2 pictures",
                  "If you have business - Business Permit, DTI Permit",
                ].map((requirement, index) => (
                  <div className="flex items-center gap-[30px]" key={index}>
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className="flex aspect-square"
                      style={{ width: "30px", height: "30px" }}
                    />
                    <span className="text-[0.9rem]/[0.9rem]">
                      {requirement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id="savings-deposit"
          data-scroll
          className="flex flex-col gap-[40px]"
        >
          <span className="text-center text-[#396131] text-[2rem]/[2rem] font-bold">
            Types of Savings Deposit
          </span>
          <div className="flex flex-col bg-[#396131] text-white gap-[30px] p-[40px]">
            <span className="text-center font-bold text-[1.5rem]/[1.5rem]">
              Savings Deposit
            </span>
            <div className="rounded-lg shadow-sm border border-gray-200/20 overflow-hidden">
              <table className="w-full">
                <thead className="border-b border-gray-200/20 text-[1rem]/[1rem] font-bold">
                  <tr>
                    <th className="px-6 py-6 text-left tracking-wider">
                      Account Type
                    </th>
                    <th className="px-6 py-6 text-left tracking-wider">
                      Required Initial Deposit
                    </th>
                    <th className="px-6 py-6 text-left tracking-wider">
                      Required Minimum Monthly ADB
                    </th>
                    <th className="px-6 py-6 text-left tracking-wider">
                      Required ADB To Earn Interest
                    </th>
                    <th className="px-6 py-6 text-left tracking-wider">
                      <div className="flex flex-col">
                        <span>Interest Rate Per Annum </span>
                        <span className="text-[0.8rem]/[0.8rem] font-normal">
                          Below 5M ADB
                        </span>
                      </div>
                    </th>
                    <th className="px-6 py-6 text-left tracking-wider">
                      <div className="flex flex-col">
                        <span>Interest Rate Per Annum </span>
                        <span className="text-[0.8rem]/[0.8rem] font-normal">
                          Below 5M ADB
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {savingsDeposit.map((row, index) => (
                    <tr
                      key={index}
                      className="transition-colors duration-150 text-white text-[0.9rem]/[0.9rem]"
                    >
                      <td className="px-6 py-10 whitespace-nowrap font-bold">
                        {row.account}
                      </td>
                      <td className="px-6 py-10 whitespace-nowrap">
                        {row.required_initial_deposit}
                      </td>
                      <td className="px-6 py-10 whitespace-nowrap">
                        {row.required_monthly_ADB}
                      </td>
                      <td className="px-6 py-10 whitespace-nowrap">
                        {row.required_monthly_ADB_to_earn_interest}
                      </td>
                      <td className="px-6 py-10 whitespace-nowrap">
                        {row.interest_rate_per_annum_below}
                      </td>
                      <td className="px-6 py-10 whitespace-nowrap">
                        {row.interest_rate_per_annum_above}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section
          id="checking-current-deposit"
          data-scroll
          className="flex flex-col gap-[40px]"
        >
          <div className="flex flex-col text-[#396131] bg-white gap-[30px] p-[40px]">
            <span className="text-center font-bold text-[1.5rem]/[1.5rem]">
              Checking/Current Account
            </span>
            <div className="flex flex-col gap-[50px]">
              <div className="rounded-lg shadow-sm border border-[#396131]/20 overflow-hidden">
                <table className="w-full">
                  <thead className="border-b border-[#396131]/20 text-[1rem]/[1rem] font-bold">
                    <tr>
                      <th className="px-6 py-6 text-left tracking-wider">
                        Account Type
                      </th>
                      <th className="px-6 py-6 text-left tracking-wider">
                        Required Initial Deposit
                      </th>
                      <th className="px-6 py-6 text-left tracking-wider">
                        Required Minimum Monthly ADB
                      </th>
                      <th className="px-6 py-6 text-left tracking-wider">
                        Required ADB To Earn Interest
                      </th>
                      <th className="px-6 py-6 text-left tracking-wider">
                        <div className="flex flex-col">
                          <span>Interest Rate Per Annum </span>
                          <span className="text-[0.8rem]/[0.8rem] font-normal">
                            Below 5M ADB
                          </span>
                        </div>
                      </th>
                      <th className="px-6 py-6 text-left tracking-wider">
                        <div className="flex flex-col">
                          <span>Interest Rate Per Annum </span>
                          <span className="text-[0.8rem]/[0.8rem] font-normal">
                            Below 5M ADB
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {checkingCurrentAccount.map((row, index) => (
                      <tr
                        key={index}
                        className="transition-colors duration-150 text-[#396131] text-[0.9rem]/[0.9rem]"
                      >
                        <td className="px-6 py-10 whitespace-nowrap font-bold">
                          {row.account}
                        </td>
                        <td className="px-6 py-10 whitespace-nowrap">
                          {row.required_initial_deposit}
                        </td>
                        <td className="px-6 py-10 whitespace-nowrap">
                          {row.required_monthly_ADB}
                        </td>
                        <td className="px-6 py-10 whitespace-nowrap">
                          {row.required_monthly_ADB_to_earn_interest}
                        </td>
                        <td className="px-6 py-10 whitespace-nowrap">
                          {row.interest_rate_per_annum_below}
                        </td>
                        <td className="px-6 py-10 whitespace-nowrap">
                          {row.interest_rate_per_annum_above}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="rounded-lg shadow-sm border border-[#396131]/20 overflow-hidden">
                <table className="w-full">
                  <thead className="border-b border-[#396131]/20 text-[1rem]/[1rem] font-bold">
                    <tr>
                      <th className="px-6 py-6 text-left tracking-wider">
                        Terms
                      </th>
                      <th className="px-6 py-6 text-left tracking-wider">
                        Initial Amount
                      </th>
                      <th className="px-6 py-6 text-left tracking-wider">
                        Interest Rate Per Annum
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {terms.map((row, index) => (
                      <tr
                        key={index}
                        className="transition-colors duration-150 text-[#396131] text-[0.9rem]/[0.9rem]"
                      >
                        <td className="px-6 py-10 whitespace-nowrap font-bold">
                          {row.term}
                        </td>
                        <td className="px-6 py-10 whitespace-nowrap">
                          {row.initial_amount}
                        </td>
                        <td className="px-6 py-10 whitespace-nowrap">
                          {row.interest_per_annum}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
