import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons/faBuildingColumns";
import logo from "/src/assets/1vb logo_2x2.png";

import img1 from "/src/assets/about-us/1.jpg";
import img2 from "/src/assets/about-us/2.png";
import img3 from "/src/assets/about-us/3.png";
import img4 from "/src/assets/about-us/4.png";
import img5 from "/src/assets/about-us/5.jpg";
import img6 from "/src/assets/about-us/6.png";
import img7 from "/src/assets/about-us/7.jpg";
import img8 from "/src/assets/about-us/8.jpg";
import img9 from "/src/assets/about-us/9.jpg";
import { NavLink } from "react-router-dom";
import { faWheatAwn } from "@fortawesome/free-solid-svg-icons/faWheatAwn";
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
} from "@fortawesome/free-solid-svg-icons";

export default function AboutUs() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [activeSection, setActiveSection] = useState("");

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

  const services = [
    {
      name: "BRANCH NETWORKING",
      icon: faCodeBranch,
      description:
        "1VB clients will enjoy utmost convenience through inter-branch transactions such as deposit withdrawal, loan payment and check encashment. The Bank is operating on a vast network of 78 branches and branch lite units in Mindanao and certain areas in the Visayan Region.",
    },
    {
      name: "GCASH SERVICES",
      icon: faMobile,
      description:
        "The revolutionary power of mobile commerce is available to 1VB clients through the G-Cash platform. With G-Cash, clients can pay their bills, send and receive remittances, deposit money, withdraw cash, buy or transfer load conveniently without the time restrictions of conventional banking.",
    },
    {
      name: "ATM SERVICES",
      icon: faCashRegister,
      description:
        "Through the ENCASH Network Services, 1st Valley Bank provides ATM services to our clients 24/7. Interconnected with BANCNET, MEGALINK, and EXPRESSNET, 1Vas ATM services allow their holders to self-manage their withdrawal and real-time balances transactions.",
    },
  ];

  const awards = [
    {
      header: "Landbank's GOLDEN AWARD",
      description:
        "Recipient of the Landbank's GOLDEN AWARD for sustaining highly sound and profitable operations ",
    },
    {
      header: "MOST VALUED LOCAL PARTNER",
      description:
        "As recognized by the Department of Agriculture through the Philippine Crop Insurance Corporation (PCIC).",
    },
    {
      header: "MOST OUTSTANDING PARTNER",
      description: "From the People's Credit & Finance Corporation",
    },
    {
      header: "MOST OUTSTANDING PARTNER",
      description:
        "From the MFTransparency for responsible and transparent pricing",
    },
    {
      header: "3RD LARGEST RURAL BANK in the country",
      description:
        "Ranked as the 3RD LARGEST RURAL BANK in the country by the Rural Bankers Association of the Philippines (RBAP), and association whose goal is to promote rural development ",
    },
  ];

  const corporateProfile = {
    senior_management: [
      {
        name: "Nicolette Lim-Gica",
        position: "VICE PRESIDENT FOR OPERATIONS",
        image: logo,
      },
      { name: "Glenn A. Mendez", position: "CHIEF OF STAFF", image: logo },
      {
        name: "Anavic A. Sarsale",
        position: "VICE PRESIDENT FOR FINANCE",
        image: logo,
      },
      {
        name: "Alfredo F. Girbes",
        position: "BUSINESS DEVELOPMENT HEAD",
        image: logo,
      },
      {
        name: "Atty. Samuel Ryan C. Rudinas",
        position: "CHIEF LEGAL OFFICER",
        image: logo,
      },
      {
        name: "Atty. Zara Teodora D. Cabanlet",
        position: "CORPORATE SECRETARY",
        image: logo,
      },
      { name: "Vivian V. Lim", position: "HR DIRECTOR", image: logo },
      { name: "Emily E. Enad", position: "CHIEF RISK OFFICER", image: logo },
      {
        name: "Benjie Tadeo M. Abad, Jr.",
        position: "CHIEF COMPLIANCE OFFICER",
        image: logo,
      },
      {
        name: "Onisimo L. Prado",
        position: "CHIEF INTERNAL AUDITOR",
        image: logo,
      },
      { name: "Felizardo A. Enad", position: "IT DIRECTOR", image: logo },
      { name: "Annie Lisa G. Estrera", position: "CREDIT HEAD", image: logo },
      { name: "Estrella E. Florida", position: "COMPTROLLER", image: logo },
    ],
    product_management: [
      {
        name: "Bernard C. Paderes",
        position: "SMALL & MEDIUM ENTERPRISE LOANS",
        image: logo,
      },
      {
        name: "Errol C. Dioso",
        position: "SUPERVISED CREDIT",
        image: logo,
      },
      {
        name: "Muamar Carba Yap",
        position: "AGRICULTURAL LOANS",
        image: logo,
      },
      {
        name: "Andre M. Ates",
        position: "MICROFINANCE & JEWELRY LOANS",
        image: logo,
      },
      {
        name: "Jubal Y. Yu",
        position: "SALARY LOANS",
        image: logo,
      },
      {
        name: "Stella Maris S. Aranas",
        position: "DEPOSIT",
        image: logo,
      },
      {
        name: "Glenn G. Bagaloyos",
        position: "LANAO AURORA",
        image: logo,
      },
      {
        name: "Hazel O. Geromo",
        position: "MISAMIS ORIENTAL",
        image: logo,
      },
      {
        name: "Peter M. Alfon",
        position: "ZAMBOANGA SIBUGAY 1",
        image: logo,
      },
      {
        name: "Romulo P. Fiel",
        position: "VISAYAS",
        image: logo,
      },
      {
        name: "Cecil C. Palenzuela",
        position: "COTABATO DAVAO",
        image: logo,
      },
      {
        name: "Jamael M. Dangnan",
        position: "MISAMIS ORIENTAL CDO",
        image: logo,
      },
      {
        name: "Samson Cababan, Jr.",
        position: "ZAMBOANGA SIBUGAY 2",
        image: logo,
      },
      {
        name: "Frederick I. Paringit",
        position: "CARAGA DAVAO NORTH",
        image: logo,
      },
      {
        name: "Heracleo Gaan, Jr.",
        position: "BUKIDNON SOUTH",
        image: logo,
      },
      {
        name: "Christopher M. Obedencio",
        position: "BUKIDNON NORTH",
        image: logo,
      },
    ],
  };

  const annualReports = [
    {
      title: "ANNUAL REPORT 2023",
      corporate_highlights: [
        "One-Stop-Shop",
        "Personalized Services",
        "Right Financial Solutions",
      ],
      key_figures: [
        "Total Resources: ₱10.99 billion",
        "Net Income: Over ₱200 million",
        "Loan-to-Deposit Ratio: 1:1",
        "High Liquidity",
      ],
      comparative_growth: [
        "Loans: ₱7.3 billion → ₱7.4 billion",
        "Deposits: ₱7.3 billion → ₱7.4 billion",
        "Net Interest Income: ₱983.7 million",
        "Net Income: ₱224.9 million",
      ],
      path: "/",
      image: img8,
    },
    {
      title: "ANNUAL REPORT 2023",
      corporate_highlights: [
        "One-Stop-Shop",
        "Personalized Services",
        "Right Financial Solutions",
      ],
      key_figures: [
        "Total Resources: ₱10.99 billion",
        "Net Income: Over ₱200 million",
        "Loan-to-Deposit Ratio: 1:1",
        "High Liquidity",
      ],
      comparative_growth: [
        "Loans: ₱7.3 billion → ₱7.4 billion",
        "Deposits: ₱7.3 billion → ₱7.4 billion",
        "Net Interest Income: ₱983.7 million",
        "Net Income: ₱224.9 million",
      ],
      path: "/",
      image: img8,
    },
    {
      title: "ANNUAL REPORT 2023",
      corporate_highlights: [
        "One-Stop-Shop",
        "Personalized Services",
        "Right Financial Solutions",
      ],
      key_figures: [
        "Total Resources: ₱10.99 billion",
        "Net Income: Over ₱200 million",
        "Loan-to-Deposit Ratio: 1:1",
        "High Liquidity",
      ],
      comparative_growth: [
        "Loans: ₱7.3 billion → ₱7.4 billion",
        "Deposits: ₱7.3 billion → ₱7.4 billion",
        "Net Interest Income: ₱983.7 million",
        "Net Income: ₱224.9 million",
      ],
      path: "/",
      image: img8,
    },
    {
      title: "ANNUAL REPORT 2023",
      corporate_highlights: [
        "One-Stop-Shop",
        "Personalized Services",
        "Right Financial Solutions",
      ],
      key_figures: [
        "Total Resources: ₱10.99 billion",
        "Net Income: Over ₱200 million",
        "Loan-to-Deposit Ratio: 1:1",
        "High Liquidity",
      ],
      comparative_growth: [
        "Loans: ₱7.3 billion → ₱7.4 billion",
        "Deposits: ₱7.3 billion → ₱7.4 billion",
        "Net Interest Income: ₱983.7 million",
        "Net Income: ₱224.9 million",
      ],
      path: "/",
      image: img8,
    },
    {
      title: "ANNUAL REPORT 2023",
      corporate_highlights: [
        "One-Stop-Shop",
        "Personalized Services",
        "Right Financial Solutions",
      ],
      key_figures: [
        "Total Resources: ₱10.99 billion",
        "Net Income: Over ₱200 million",
        "Loan-to-Deposit Ratio: 1:1",
        "High Liquidity",
      ],
      comparative_growth: [
        "Loans: ₱7.3 billion → ₱7.4 billion",
        "Deposits: ₱7.3 billion → ₱7.4 billion",
        "Net Interest Income: ₱983.7 million",
        "Net Income: ₱224.9 million",
      ],
      path: "/",
      image: img8,
    },
    {
      title: "ANNUAL REPORT 2023",
      corporate_highlights: [
        "One-Stop-Shop",
        "Personalized Services",
        "Right Financial Solutions",
      ],
      key_figures: [
        "Total Resources: ₱10.99 billion",
        "Net Income: Over ₱200 million",
        "Loan-to-Deposit Ratio: 1:1",
        "High Liquidity",
      ],
      comparative_growth: [
        "Loans: ₱7.3 billion → ₱7.4 billion",
        "Deposits: ₱7.3 billion → ₱7.4 billion",
        "Net Interest Income: ₱983.7 million",
        "Net Income: ₱224.9 million",
      ],
      path: "/",
      image: img8,
    },
  ];

  const branchDirectories = [
    {
      image: img9,
      name: "Baroy",
      location: "Poblacion, Baroy,  Lanao del Norte",
      contact_numbers: "0917-849-6985 / 0955-512-2468 / 063-227-7142",
      email: "baroy@1vb.com.ph",
    },
    {
      image: img9,
      name: "Baroy",
      location: "Poblacion, Baroy,  Lanao del Norte",
      contact_numbers: "0917-849-6985 / 0955-512-2468 / 063-227-7142",
      email: "baroy@1vb.com.ph",
    },
    {
      image: img9,
      name: "Baroy",
      location: "Poblacion, Baroy,  Lanao del Norte",
      contact_numbers: "0917-849-6985 / 0955-512-2468 / 063-227-7142",
      email: "baroy@1vb.com.ph",
    },
    {
      image: img9,
      name: "Baroy",
      location: "Poblacion, Baroy,  Lanao del Norte",
      contact_numbers: "0917-849-6985 / 0955-512-2468 / 063-227-7142",
      email: "baroy@1vb.com.ph",
    },
    {
      image: img9,
      name: "Baroy",
      location: "Poblacion, Baroy,  Lanao del Norte",
      contact_numbers: "0917-849-6985 / 0955-512-2468 / 063-227-7142",
      email: "baroy@1vb.com.ph",
    },
    {
      image: img9,
      name: "Baroy",
      location: "Poblacion, Baroy,  Lanao del Norte",
      contact_numbers: "0917-849-6985 / 0955-512-2468 / 063-227-7142",
      email: "baroy@1vb.com.ph",
    },
  ];

  // Track scroll position
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
              "description",
              "history",
              "marketing",
              "loans",
              "deposits",
              "services",
              "awards",
              "core-values",
              "branch-management",
              "corporate-profile",
              "annual-reports",
              "branch-directory",
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
          className="px-[80px] py-[40px] bg-white rounded-[8px] drop-shadow-lg mx-[15px]"
        >
          <div className="flex items-center justify-between px-[80px] py-[60px] gap-[50px] text-[#396131] rounded-[8px]">
            <div className="flex flex-col items-start gap-[60px] w-3/5">
              <div className="flex flex-col gap-[20px]">
                <span className="font-bold text-[4rem]">About Us</span>
                <span className="font-medium text-[1rem]/[3rem]">
                  Founded in 1956, 1st Valley Bank, A Development Bank, has a
                  long and distinguished history of banking excellence. It
                  started as a rural bank operating in Northern Mindanao before
                  it grew exponentially as a development bank with 78 branches
                  and branch lites in Mindanao and certain areas in the Visayas.
                </span>
              </div>
            </div>
            <div className="w-2/5">
              <FontAwesomeIcon
                icon={faBuildingColumns}
                className="aspect-square"
                style={{ width: "416px", height: "416px" }}
              />
            </div>
          </div>
        </section>
        <section
          id="description"
          data-scroll
          className="flex justify-end mx-[10px] bg-[#396131] rounded-[8px] p-[50px] drop-shadow-lg"
        >
          <div className="flex justify-center w-1/2">
            <img
              src={img1}
              alt=""
              className="object-cover h-[600px] w-[556px] rounded-[12px]"
            />
          </div>
          <div className="flex flex-col gap-[20px] w-1/2 text-[1rem]/[3rem] text-white">
            <span>
              1st Valley Bank (1VB) is one of the largest independent
              developmental banks dedicated to fund development projects and
              businesses through the provision of loan capital. While the Bank's
              primary clients are entrepreneurs and farmers, it also serves the
              financial needs of teachers, barangay officials, regular employees
              of local government units, as well as individuals who are in need
              of fast cash.
            </span>
            <span>
              In 27 December 2019, the merger between 1st Valley Bank (1VB),
              Sugbuanon Rural Bank, Inc. (SRBI) and D'Asian Hills Bank, Inc.
              (DAHBI) has been declared as official with 1VB as the surviving
              entity. With the completion of the merger, clients can expect
              greater customer service satisfaction.
            </span>
            <span>
              1st Valley Bank ranks 3rd in terms of assets, and is considered as
              one of the fastest development banks in the country. Its audited
              financial statements show that as of December 2019, the Bank has a
              total of Php10B+ resources.
            </span>
          </div>
        </section>
        <section
          id="history"
          data-scroll
          className="flex justify-between mx-[10px] rounded-[8px] p-[50px]"
        >
          <div className="flex flex-col gap-[30px] w-1/2 text-[#396131]">
            <span className="font-bold text-[4rem]/[4rem]">Brief History</span>
            <div className="flex flex-col gap-[20px] text-[1rem]/[2.5rem]">
              <span>
                1st Valley Bank, a rapidly growing development bank in Mindanao
                and Visayas, traces its roots in the rural banking industry.
              </span>
              <span>
                1st Valley Bank was formerly known as the Rural Bank of
                Kapatagan Valley (RUBANKA) first, and then Kapatagan Valley Bank
                (KVB). It earned its license to operate on November 24,1956 and
                became the 75th rural bank in the country.
              </span>
              <span>
                On April 5, 1957, the Bank has earned its prestigious membership
                in the Rural Bank Association of the Philippines (RBAP).
              </span>
              <span>
                In April 2004, Kapatagan Valley Bank entered into a
                consolidation agreement with Rural Bank of Sinacaban. On August
                30, 2005, the Securities and Exchange Commission (SEC) issued
                the Certificate of Consolidation and Certificate of
                Incorporation to the merging institutions. This official merger
                gave birth to 1st Valley Bank.
              </span>
              <span>
                On August 1, 2013, 1st Valley Bank has progressed into a
                development bank. It seeks to provide sufficient loan capital
                for productive investment along with technical assistance to
                help guarantee success of its borrowers.
              </span>
              <span>
                Today, following the successful completion of its merger with
                SRBI and DAHBI, IVB is operating on a vast network of 78
                branches and branch lites.
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center w-1/2 h-full gap-[40px]">
            <img
              src={img2}
              alt=""
              className="object-cover h-[380px] w-[458px] rounded-[12px]"
            />
            <img
              src={img3}
              alt=""
              className="object-cover h-[380px] w-[458px] rounded-[12px]"
            />
          </div>
        </section>
        <section
          id="marketing"
          data-scroll
          className="flex flex-col mx-[10px] gap-[60px] rounded-[8px] p-[50px] bg-[#396131]"
        >
          <div className="flex gap-[50px]">
            <div className="flex flex-col items-start w-1/3">
              <img
                src={img4}
                alt=""
                className="object-cover h-[455px] w-[468px] rounded-[12px]"
              />
            </div>
            <div className="flex flex-col gap-[30px] text-white w-2/3">
              <span className="font-bold text-[3rem]/[3rem]">
                Why do business with us?
              </span>
              <div className="flex flex-col gap-[20px] text-[1rem]/[2.5rem]">
                <span>
                  There are so many reasons doing business with us will be
                  profitable for you. Our long years in the industry, 64 years
                  and counting, make us one of the most stable banks you can
                  depend.
                </span>
                <span>
                  1st Valley Bank is also known for its personalized services as
                  it treats its clients as family and friends. You can even call
                  the Bank as your lifetime friend.
                </span>
                <span>
                  You're looking for a bank that can support your financial
                  needs to grow your business? 1st Valley Bank offers a full
                  range of services. You want convenience in banking? 1st Valley
                  Bank delivers its services whenever and wherever you want it.
                  Come and experience 1st Valley Bank!
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-[50px]">
            <div className="flex flex-col gap-[20px] text-white w-3/5">
              <div className="flex flex-col">
                <span className="font-bold text-[3rem]/[5rem]">
                  At 1st Valley Bank,
                </span>
                <span className="font-bold text-[3rem]/[5rem]">
                  You're Always First
                </span>
              </div>
              <div className="flex flex-col gap-[20px] text-[1rem]/[2.5rem]">
                <span>
                  There is nothing more important for 1st Valley Bank than to
                  work with their clients to ensure that they benefit from the
                  products and services of the Bank. The Bank sees to it that
                  what they offer are financial solutions that match the needs
                  of their clients.
                </span>
                <span>
                  1st Valley Bank grows its business for its clients. Meeting
                  the needs of their clients comes first for the Bank. All
                  employees of the Bank work hard to deliver more value to the
                  Bank's clients. They know that the time of their clients is
                  valuable, and they do everything in their capacity to get
                  their work done faster to deliver the products and services
                  speedily.
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start w-2/5">
              <img
                src={img5}
                alt=""
                className="object-cover h-[507px] w-[468px] rounded-[12px]"
              />
            </div>
          </div>
        </section>
        <section
          id="loans"
          data-scroll
          className="flex flex-col items-center text-[#396131] gap-[40px] mx-[10px] "
        >
          <p className="text-[4rem] text-center font-bold">LOANS</p>
          <div className="grid grid-cols-2 gap-x-[50px] gap-y-[80px] px-[80px]">
            {loans.map((loan, index) => (
              <div className="flex gap-[40px] items-center" key={index}>
                <div className="flex justify-center items-center w-1/2">
                  <FontAwesomeIcon
                    icon={loan.logo}
                    className="aspect-square"
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
                <div className="flex flex-col justify-between h-full w-1/2 gap-[30px]">
                  <div className="flex flex-col gap-[20px]">
                    <span className="font-bold text-[1.5rem]/[1.5rem]">
                      {loan.type}
                    </span>
                    <span className="text-[1rem]/[2.5rem]">
                      {loan.description}
                    </span>
                  </div>
                  <NavLink
                    to={loan.path}
                    className="w-full text-[1rem]/[1.5rem] text-white font-bold bg-[#396131] text-center py-[10px] rounded-[10px] transition-all transform duration-300 outline-0 ease-in-out outline-[#396131] hover:outline-1 hover:bg-white hover:text-[#396131] hover:scale-105"
                  >
                    Learn More
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section
          id="deposits"
          data-scroll
          className="flex flex-col px-[50px] py-[50px] mx-[10px] gap-[85px] bg-[#396131] text-white drop-shadow-lg rounded-[8px]"
        >
          <div className="flex flex-col gap-[80px]">
            <p className="font-bold text-center text-[2rem]/[2rem]">
              1VB Deposits: Safe, Secure, and Rewarding
            </p>
            <div className="flex gap-[94px]">
              <div className="flex gap-[40px] w-1/2 h-[300px]">
                <div className="flex items-center justify-center w-1/2">
                  <FontAwesomeIcon
                    icon={faPiggyBank}
                    className="aspect-square"
                    style={{ width: "238px", height: "213px" }}
                  />
                </div>
                <div className="flex flex-col justify-between h-full w-1/2">
                  <div className="flex flex-col gap-[22px]">
                    <p className="text-[1.5rem] font-bold">Regular</p>
                    <div className="flex flex-col gap-[20px] font-bold text-[1rem]">
                      <div className="flex gap-[12px]">
                        <FontAwesomeIcon
                          icon={faPlusCircle}
                          className="aspect-square"
                          style={{ width: "26px", height: "27px" }}
                        />
                        <span>SD PLUS</span>
                      </div>
                      <div className="flex gap-[12px]">
                        <FontAwesomeIcon
                          icon={faFileInvoiceDollar}
                          className="aspect-square"
                          style={{ width: "26px", height: "27px" }}
                        />
                        <span>1ST CHECKING ACCOUNT</span>
                      </div>
                    </div>
                  </div>
                  <NavLink
                    to="/deposits/regular-savings"
                    className="w-full text-center font-bold bg-white text-[#396131] outline-0 outline-white py-[10px] rounded-[10px] transition-all transform duration-300 ease-in-out hover:outline-1 hover:text-white hover:bg-[#396131] hover:scale-105"
                  >
                    Learn More
                  </NavLink>
                </div>
              </div>
              <div className="flex gap-[40px] w-1/2 h-[300px]">
                <div className="flex items-center justify-center w-1/2">
                  <FontAwesomeIcon
                    icon={faMoneyBillTransfer}
                    className="aspect-square"
                    style={{ width: "256px", height: "205px" }}
                  />
                </div>
                <div className="flex flex-col justify-between w-1/2 h-full">
                  <div className="flex flex-col gap-[22px]">
                    <p className="text-[1.5rem] font-bold">Special</p>
                    <div className="flex flex-col gap-[20px] font-bold text-[1rem]">
                      <div className="flex gap-[12px]">
                        <FontAwesomeIcon
                          icon={faCoins}
                          className="aspect-square"
                          style={{ width: "26px", height: "27px" }}
                        />
                        <span>SSD MICRO</span>
                      </div>
                      <div className="flex gap-[12px]">
                        <FontAwesomeIcon
                          icon={faMoneyBillTrendUp}
                          className="aspect-square"
                          style={{ width: "26px", height: "27px" }}
                        />
                        <span>SSD REGULAR</span>
                      </div>
                      <div className="flex gap-[12px]">
                        <FontAwesomeIcon
                          icon={faFileInvoiceDollar}
                          className="aspect-square"
                          style={{ width: "26px", height: "27px" }}
                        />
                        <span>HANDOG SAVINGS</span>
                      </div>
                      <div className="flex gap-[12px]">
                        <FontAwesomeIcon
                          icon={faFileInvoiceDollar}
                          className="aspect-square"
                          style={{ width: "26px", height: "27px" }}
                        />
                        <span>BASIC SAVINGS</span>
                      </div>
                    </div>
                  </div>
                  <NavLink
                    to="/deposits/special-savings"
                    className="w-full text-center font-bold bg-white text-[#396131] outline-0 outline-white py-[10px] rounded-[10px] transition-all transform duration-300 ease-in-out hover:outline-1 hover:text-white hover:bg-[#396131] hover:scale-105"
                  >
                    Learn More
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[50px] w-full">
            <div className="grid grid-cols-4 gap-y-[60px] font-bold text-[1rem]">
              {depositsFeatures.map((deposit, index) => (
                <div
                  className="flex flex-col items-center gap-[30px]"
                  key={index}
                >
                  <FontAwesomeIcon
                    icon={deposit.icon}
                    className="aspect-square"
                    style={{ width: "80px", height: "71px" }}
                  />
                  <span>{deposit.feature}</span>
                </div>
              ))}
            </div>
            <NavLink
              to="/deposits"
              className="w-full text-center font-bold bg-white text-[#396131] outline-0 outline-white py-[10px] rounded-[10px] transition-all transform duration-300 ease-in-out hover:outline-1 hover:text-white hover:bg-[#396131] hover:scale-101"
            >
              Learn More
            </NavLink>
          </div>
        </section>
        <section
          id="services"
          data-scroll
          className="flex flex-col gap-[50px] p-[50px] text-[#396131]"
        >
          <p className="font-bold text-[4rem]/[4rem] text-center">SERVICES</p>
          <div className="grid grid-cols-3 gap-x-[25px]">
            {services.map((service, index) => (
              <div className="flex flex-col justify-center items-center gap-[20px]">
                <div className="flex flex-col justify-center items-center gap-[50px]">
                  <FontAwesomeIcon
                    icon={service.icon}
                    className="aspect-square"
                    style={{ width: "208px", height: "238px" }}
                  />
                  <span className="font-bold text-[1.5rem]/[1.5rem]">
                    {service.name}
                  </span>
                </div>
                <span className="text-[1rem]/[2rem]">
                  {service.description}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section
          id="awards"
          data-scroll
          className="flex flex-col gap-[30px] mx-[10px] p-[50px] text-[#396131]"
        >
          <div className="flex gap-[50px] items-center">
            <div className="flex justify-center items-start w-1/2">
              <FontAwesomeIcon
                icon={faTrophy}
                className="aspect-square"
                style={{ width: "564px", height: "501px" }}
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-[30px] w-1/2">
              <p className="text-[4rem]/[7rem] font-bold">
                AWARDS & RECOGNITION
              </p>
              <div className="flex flex-col gap-[40px]">
                <div className="flex flex-col gap-[20px]">
                  <span className="text-[2rem]/[2rem] font-bold">RATED A+</span>
                  <span className="text-[1rem]/[2rem]">
                    By PhilRatings, a pioneer domestic credit rating agency
                    recognized by the Bangko Sentral ng Pilipinas (BSP).{" "}
                  </span>
                </div>
                <div className="flex flex-col gap-[20px]">
                  <span className="text-[2rem]/[2rem] font-bold">
                    EAGLE AWARD FOR MICROFINANCE{" "}
                  </span>
                  <span className="text-[1rem]/[2rem]">
                    Bestowed by the U.S. Agency for International Development
                    through the RBAP-implemented MABS, a program that assists
                    rural banks in increasing their financial services to the
                    microenterprise sector.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-[50px] gap-y-[40px]">
            {awards.map((award, index) => (
              <div className="flex flex-col gap-[20px]" key={index}>
                <span className="text-[2rem]/[2rem] font-bold">
                  {award.header}
                </span>
                <span className="text-[1rem]/[2rem]">{award.description}</span>
              </div>
            ))}
          </div>
        </section>
        <section id="core-values" data-scroll className="flex text-[#396131]">
          <div className="flex flex-col p-[50px] gap-[30px] w-1/2">
            <div className="flex flex-col gap-[20px]">
              <span className="text-[2rem]/[4rem] font-bold">Vision</span>
              <span className="text-[1rem]/[2rem]">
                We envision to be the preferred banking institution. in
                delivering innovative and customer-centered services.{" "}
              </span>
            </div>
            <div className="flex flex-col gap-[20px]">
              <span className="text-[2rem]/[4rem] font-bold">Mission</span>
              <div className="flex flex-col gap-[20px]">
                <div className="flex items-center gap-[20px]">
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="aspect-square"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="text-[1rem]/[2rem]">
                    Be one 1st Valley Bank; be the go bank for our customers
                  </span>
                </div>
                <div className="flex items-center gap-[20px]">
                  <FontAwesomeIcon
                    icon={faUsersGear}
                    className="aspect-square"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="text-[1rem]/[2rem]">
                    Be the top employer for our staff
                  </span>
                </div>
                <div className="flex items-center gap-[20px]">
                  <FontAwesomeIcon
                    icon={faLeaf}
                    className="aspect-square"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="text-[1rem]/[2rem]">
                    Ensure delivery of high returns for our stakeholders
                  </span>
                </div>
                <div className="flex items-center gap-[20px]">
                  <FontAwesomeIcon
                    icon={faArrowUpRightDots}
                    className="aspect-square"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="text-[1rem]/[2rem]">
                    Promote development in the areas where we operate.
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[20px]">
              <span className="text-[2rem]/[4rem] font-bold">Core Values</span>
              <div className="flex flex-col gap-[20px]">
                <div className="flex items-center gap-[20px]">
                  <FontAwesomeIcon
                    icon={faHandSparkles}
                    className="aspect-square"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="text-[1rem]/[2rem]">
                    We conduct our business with integrity, transparency,
                    honesty, and the highest ethical standards.
                  </span>
                </div>
                <div className="flex items-center gap-[20px]">
                  <FontAwesomeIcon
                    icon={faHandHoldingHand}
                    className="aspect-square"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="text-[1rem]/[2rem]">
                    Treating our customers with equality, fairness, and respect
                    is foremost in our delivery of excellent banking services.
                  </span>
                </div>
                <div className="flex items-center gap-[20px]">
                  <FontAwesomeIcon
                    icon={faLightbulb}
                    className="aspect-square"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="text-[1rem]/[2rem]">
                    We develop our business through innovation, enthusiasm,
                    creativity, and our constant quest for excellence.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-1/2">
            <img
              src={img6}
              alt=""
              className="flex object-cover rounded-[15px] w-[550px] h-[680px]"
            />
          </div>
        </section>
        <section
          id="branch-management"
          data-scroll
          className="flex gap-[10px] p-[50px] text-[#396131]"
        >
          <div className="flex items-start justify-center w-1/2">
            <img
              src={img7}
              alt=""
              className="rounded-[15px] object-cover w-[562px] h-[713px]"
            />
          </div>
          <div className="flex flex-col gap-[10px] w-1/2">
            <span className="text-[2rem]/[2rem] font-bold ">
              BRANCH MANAGEMENT
            </span>
            <span className="text-[0.8rem]/[1.6rem]">
              ALFON, JAMES II JABIL, Baroy I BLISS, NERI BALANAY, Kapatagan I
              LIM, ARVIN CABAHUG, Marauding I MENDEZ, ROSERUBY LIM, Molave I
              ALIA, JOEL SARUAY, Iligan I MANLANGIT, EDSEL BEDANIA, Ozamiz City
              I CATILOC, GIA AMABELLE BACABIS, Margosatubig I ARNEJO, ARDEE
              WARREN PADILLA, Dumalinao I DAUG, JOPHET DAG-UMAN, Pagadian |
              PEPITO, GIRLIE ALBARICO, Buug I ROCAMORA, RUTH CAMATURA, Ipit I
              ADALA, RAY CEBUA, Oroquieta I MAGDULA, MIKEL RONALD LIM, Imelda I
              MONTEALTO, ARLINOVE MONARCA, Dipolog I PEREZ, JEYPE ANIBAN,
              Cagayan de Oro City I BUCOG, GLEN CUBAL, Zamboanga City I
              PATRICIO, ZANY CAPUNONG, Aglayan I SOMOSA, LARRY RAMONES, Liloy I
              MONTEALTO, JAIME JR SANIEL, Sindangan I GORRA, JONATHAN SUMASTRE,
              Gingoog I NABLO, JEFFREY MASIBA, Ozamiz City 2I MANDANTES, SHIELA
              MONDEJAR, Dumaguete City I CARBAJAL, BHEBIE JHOYE GANO-AY, Maramag
              I ANDALAY, RYAN REY HUMAGAO, Dumingag I HAYO, JOHN PAUL BARIMBAO,
              Manukan I OROCIO, MITCHEL BASTASA, Davao I SALARDA, DESIREE
              MASALTA, Aurora I TECSON, ED GLENN PATILUNA, Butuan City I
              VERGARA, REGIEL SABELLO, San Francisco I CRUZ, PERCIVAL GUERRERO,
              Bacolod I LANDICHO, HIPOLITO JR NIEPEZ, Talakag SALUNA, JOEL
              PASCO, Balingasag I GAAN, JESSIE JAMPIT, Initao I SOON, ROSALITO
              DICHOS, Bayugan PANANGLITAN, ELIEZER CALAPIZ, Bayavvan I NAMILIT,
              ELVIES BALDO, Kabankalan I JANDOMON, JOSELITO AROA, La Carlota I
              GUTANG, FILMOR MAGNO, Tagum CIELO, RAPSODE PEREZ, Guiv✓an I
              REGENCIA, RICARDO JR BONIFACIO, Koronadal I MARIBAO,WARREN
              BUENDIA, Digos I LABUCANA,RYAN JAY ZARSOSA, Kidapawan I DELA PENA,
              JESSERIE NAYBE, Camiguin I ERASMO, LEOPOLDO JR CEDER°, KaLilangan
              LLAUDER, JOFEL PATRICK MAGHINAY, KiwaLan I BALDELOVAR, EMMANUEL
              GONZALES, Calinan I PONCE, VICTORIA SUICO, Osmefia SETIOTA,WILFRID
              MONERA, Mandaue DABASOL,RENATO ASCENCION, MinglanilLa LAYAO,
              ARISTON TINGA, Bantayan (BRUCE, RICHARD GABATI, Bogo ICABILI,
              PEARL PUCOT, Balamban LINGAOLINGAO,VICTORIA CAMPO, Pinarnungahan I
              ROMANO, SHALIMAR CELDA, Opol I NACALABAN, EVERLY AMARO, Cugrnan I
              MACALAM, SHELLA ANN ABKILAN, Manolo I PINTO, RONNEL DELIMA
              ViLlanueva I LLERIN, GEORGE SEGUERA, Malaybalay I ANIBONG, JEROME
              NAVARRO, Dangcagan COLITA, VICENTE JR. PRESBETIRO, Valencia
              REPOLIDON, ROLAND MORALDE, Talisay I SERINO JOPRAY CALAMBA,
              Kabacan I OUIJADA, NICO JUNKIES REFISURA, Quezon I BATONGHINOG,
              RENE MONIES, Lantapan I MENDEZ, JEAN ARENO, SumiLao I SORENO,
              JERWIN TOTESORA., Tagbilaran I PALUGA ALLAN ROY ACERO, Tandag I
              DUHAYLUNGSOD EVAN GLEE JALANDONI, Midsayap I CAPUTOL, BOBBY
              TUGAHAN. Mlang BINAYAO, ARIS BALANDRA, CabangLasan I ESTENZO,
              VICSTER TACASAN, San Fernando BRANCH LITE UNITS, JONIEL L. GALO,
              San Miguel I EDGAR LOU G. DEMAYO, Bayog I ALBERT ALEGADO, Jimenez
              I CHESTER JULY JUGAN, Claris I JEFFREY B. TIMAGOS, CaLambe I
              DOMINGO A. PAGADOR, Mabuhay I ROXAN A. ANGHAY, Cabadbaran
            </span>
          </div>
        </section>
        <section
          id="corporate-profile"
          data-scroll
          className="flex flex-col p-[50px] gap-[30px] bg-[#396131] text-white rounded-[10px] mx-[10px] drop-shadow-lg"
        >
          <span className="text-[2.5rem] font-bold text-center">
            Corporate Profile
          </span>
          <div className="flex flex-col gap-[45px]">
            <div className="flex flex-col gap-[20px]">
              <span className="font-bold text-[1rem] text-center">
                Senior Management
              </span>
              <div className="flex flex-col gap-[20px] items-center">
                <div className="flex flex-col justify-center items-center gap-[20px]">
                  <img
                    src={logo}
                    alt=""
                    className="bg-white h-[100px] w-[100px] rounded-full"
                  />
                  <div className="flex flex-col items-center">
                    <span className="text-[1rem] font-bold">
                      Atty. Nicolas J. Lim
                    </span>
                    <span className="text-[0.9rem]">PRESIDENT</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-x-[30px] gap-y-[40px]">
                {corporateProfile.senior_management.map((officer, index) => (
                  <div
                    className="flex flex-col justify-center items-center gap-[20px]"
                    key={index}
                  >
                    <img
                      src={logo}
                      alt=""
                      className="bg-white h-[100px] w-[100px] rounded-full"
                    />
                    <div className="flex flex-col items-center">
                      <span className="text-[1rem] font-bold">
                        {officer.name}
                      </span>
                      <span className="text-[0.9rem]">{officer.position}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-[50px]">
              <span className="font-bold text-[1rem] text-center">
                Product & Area Management
              </span>
              <div className="grid grid-cols-4 gap-x-[30px] gap-y-[40px]">
                {corporateProfile.product_management.map((officer, index) => (
                  <div className="flex flex-col justify-center items-center gap-[20px]">
                    <img
                      src={logo}
                      alt=""
                      className="bg-white h-[100px] w-[100px] rounded-full"
                    />
                    <div className="flex flex-col items-center">
                      <span className="text-[1rem] font-bold">
                        {officer.name}
                      </span>
                      <span className="text-[0.9rem]">{officer.position}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id="annual-reports"
          data-scroll
          className="flex flex-col justify-center text-[#396131] gap-[40px] p-[50px]"
        >
          <span className="text-[3rem]/[3rem] font-bold text-center">
            Annual Reports
          </span>
          <div className="grid grid-cols-3 gap-y-[60px] gap-x-[20px]">
            {annualReports.map((report, index) => (
              <div className="flex flex-col gap-[20px]" key={index}>
                <div className="flex flex-col items-center gap-[20px]">
                  <img
                    src={report.image}
                    alt=""
                    className="object-cover w-full h-[277px] rounded-[15px] drop-shadow-lg bg-white"
                  />
                  <span className="font-bold text-[1.5rem]/[2.25rem] text-center">
                    {report.title}
                  </span>
                </div>
                <div className="flex flex-col px-[20px] gap-[20px]">
                  <div className="flex flex-col gap-[20px]">
                    <span className="text-[1rem]/[2rem] font-bold">
                      Corporate Highlights
                    </span>
                    <div className="flex flex-col gap-[10px]">
                      {report.corporate_highlights.map((highlight, index) => (
                        <div
                          className="flex items-center gap-[10px]"
                          key={index}
                        >
                          <div className="w-[24px] h-[24px] bg-[#396131] rounded-[5px]"></div>
                          <span className="text-[1rem]/[2rem]">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[20px]">
                    <span className="text-[1.1rem] font-bold">
                      Financial Performance
                    </span>
                    <div className="flex flex-col gap-[10px]">
                      <span className="text-[1.1rem] font-bold">
                        Key Figures
                      </span>
                      <div className="flex flex-col gap-[10px]">
                        {report.key_figures.map((figure, index) => (
                          <div
                            className="flex items-center gap-[10px]"
                            key={index}
                          >
                            <div className="w-[24px] h-[24px] bg-[#396131] rounded-[5px]"></div>
                            <span className="text-[1rem]/[2rem]">{figure}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                      <span className="text-[1.1rem] font-bold">
                        Comparative Growth
                      </span>
                      <div className="flex flex-col gap-[10px]">
                        {report.comparative_growth.map((growth, index) => (
                          <div
                            className="flex items-center gap-[10px]"
                            key={index}
                          >
                            <div className="w-[24px] h-[24px] bg-[#396131] rounded-[5px]"></div>
                            <span className="text-[1rem]/[2rem]">{growth}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <NavLink
                  to=""
                  className="w-full text-[1.1rem]/[1.1rem] text-center font-bold text-white py-[15px] bg-[#396131] rounded-[12px] transition-all transform duration-200 outline-0 outline-[#396131] hover:text-[#396131] hover:bg-white hover:outline-1 hover:scale-102"
                >
                  See Full Report
                </NavLink>
              </div>
            ))}
          </div>
        </section>
        <section
          id="branch-directory"
          data-scroll
          className="flex flex-col gap-[80px] p-[50px] text-white bg-[#396131] rounded-[10px] mx-[10px] drop-shadow-lg"
        >
          <span className="text-center font-bold text-[2.5rem]/[2.5rem]">
            Branch Directory
          </span>
          <div className="grid grid-cols-2 gap-x-[50px] gap-y-[60px]">
            {branchDirectories.map((branch, index) => (
              <div className="flex gap-[20px]" key={index}>
                <img
                  src={branch.image}
                  alt=""
                  className="w-[150px] h-[150px] rounded-[15px]"
                />
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[12px] font-bold">
                    <span className="text-[1.4rem]/[1.4rem]">
                      {branch.name}
                    </span>
                    <span className="text-[0.9rem]/[0.9rem]">
                      {branch.location}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[12px] text-[0.9rem]/[0.9rem]">
                    <span className="">{branch.contact_numbers}</span>
                    <span className="">{branch.email}</span>
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
