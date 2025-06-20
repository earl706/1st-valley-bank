import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons/faBuildingColumns";
import logo from "/src/assets/logo.png";

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
import CorporateProfile from "../components/CorporateProfile";
import {
  faArrowUpRightDots,
  faBreadSlice,
  faBuilding,
  faBuildingFlag,
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
  faSeedling,
  faTractor,
  faTrophy,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";

export default function AboutUs() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [activeSection, setActiveSection] = useState("");

  const [imageLoaded1, setImageLoaded1] = useState(false);
  const [imageLoaded2, setImageLoaded2] = useState(false);
  const [imageLoaded3, setImageLoaded3] = useState(false);
  const [imageLoaded4, setImageLoaded4] = useState(false);

  // Sample images - replace with your actual img2 and img3
  // const img2 =
  //   "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=458&h=380&fit=crop";
  // const img3 =
  //   "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=458&h=380&fit=crop";

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
      <main className="flex flex-col gap-[80px] lg:gap-[120px] pb-[50px]">
        <nav className="fixed top-35 right-4 z-40 bg-white/50 backdrop-blur-lg rounded-2xl p-2">
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
          className="px-[20px] py-[40px] lg:px-[80px] lg:py-[40px] bg-white rounded-[8px] drop-shadow-lg mx-[5px] lg:mx-[15px]"
        >
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-[20px] lg:gap-[50px] text-[#396131] rounded-[8px]">
            <div className="flex flex-col items-start gap-[20px] lg:gap-[60px] lg:w-3/5">
              <div className="flex flex-col gap-[20px]">
                <span className="font-bold text-[2rem] lg:text-[4rem]">
                  About Us
                </span>
                <span className="font-medium text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
                  Founded in 1956, 1st Valley Bank, A Development Bank, has a
                  long and distinguished history of banking excellence. It
                  started as a rural bank operating in Northern Mindanao before
                  it grew exponentially as a development bank with 78 branches
                  and branch lites in Mindanao and certain areas in the Visayas.
                </span>
              </div>
            </div>
            <div className="lg:w-2/5">
              <FontAwesomeIcon
                icon={faBuildingColumns}
                className="aspect-square"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </section>
        <section
          id="description"
          data-scroll
          className="flex lg:flex-row flex-col justify-end mx-[10px] bg-[#396131] gap-[20px] rounded-[8px] p-[20px] lg:p-[80px] drop-shadow-lg"
        >
          <div className="flex justify-center lg:w-1/2">
            <img
              src={img1}
              alt=""
              className="object-cover h-[600px] w-[556px] rounded-[12px]"
            />
          </div>
          <div className="flex flex-col gap-[10px] lg:gap-[20px] lg:w-1/2 text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem] text-white">
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
          className="flex lg:flex-row flex-col-reverse justify-between mx-[10px] gap-[30px] lg:gap-none rounded-[8px] p-[20px] lg:p-[50px]"
        >
          <div className="flex flex-col gap-[10px] lg:gap-[30px] lg:w-1/2 text-[#396131]">
            <span className="font-bold text-[1.5rem]/[3rem] lg:text-[4rem]/[4rem]">
              Brief History
            </span>
            <div className="flex flex-col gap-[10px] lg:gap-[20px] text-[0.8rem]/[2.4rem] lg:text-[1rem]/[2.5rem]">
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
          <div className="flex lg:flex-col items-center lg:w-1/2 h-full gap-[10px] lg:gap-[40px]">
            <img
              src={img2}
              alt=""
              className="object-cover w-[200px] h-[180px] lg:h-[380px] lg:w-[458px] rounded-[12px]"
            />
            <img
              src={img3}
              alt=""
              className="object-cover w-[200px] h-[180px] lg:h-[380px] lg:w-[458px] rounded-[12px]"
            />
          </div>
        </section>
        <section
          id="marketing"
          data-scroll
          className="flex flex-col mx-[10px] gap-[60px] rounded-[8px] p-[20px] lg:p-[50px] bg-[#396131]"
        >
          <div className="flex lg:flex-row flex-col gap-[50px]">
            <div className="flex flex-col items-start lg:w-1/3">
              <img
                src={img4}
                alt=""
                className="object-cover h-[455px] w-[468px] rounded-[12px]"
              />
            </div>
            <div className="flex flex-col gap-[30px] text-white lg:w-2/3">
              <span className="font-bold text-[1.5rem]/[3rem] lg:text-[3rem]/[3rem]">
                Why do business with us?
              </span>
              <div className="flex flex-col gap-[10px] lg:gap-[20px] text-[0.8rem]/[2.4rem] lg:text-[1rem]/[2.5rem]">
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
          <div className="flex flex-col-reverse lg:flex-row gap-[30px] lg:gap-[50px]">
            <div className="flex flex-col gap-[20px] text-white lg:w-3/5">
              <div className="flex flex-col">
                <span className="font-bold text-[1.5rem]/[3rem] lg:text-[3rem]/[5rem]">
                  At 1st Valley Bank,
                </span>
                <span className="font-bold text-[1.5rem]/[3rem] lg:text-[3rem]/[5rem]">
                  You're Always First
                </span>
              </div>
              <div className="flex flex-col gap-[10px] lg:gap-[20px] text-[0.8rem]/[2.4rem] lg:text-[1rem]/[2.5rem]">
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
            <div className="flex flex-col items-start lg:w-2/5">
              <img
                src={img5}
                alt=""
                className="object-cover h-[507px] w-[468px] rounded-[12px]"
              />
            </div>
          </div>
        </section>

        {/* <section
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
        </section> */}

        <section
          id="loans"
          data-scroll
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
        {/* <section
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
        </section> */}
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
        {/* <section
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
        </section> */}
        <section
          id="services"
          data-scroll
          className="relative py-16 lg:py-24 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0 bg-gradient-to-br from-[#396131]/5 via-transparent to-[#396131]/10"></div>
            <div className="absolute top-20 right-20 w-40 h-40 bg-[#396131]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-32 left-16 w-32 h-32 bg-[#396131]/15 rounded-full blur-2xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#396131] mb-6">
                SERVICES
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#396131] to-[#4a7a3f] mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive financial solutions designed to meet all your
                banking needs
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100 p-8 lg:p-10"
                >
                  {/* Card gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#396131]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#396131]/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative text-center">
                    {/* Icon Container */}
                    <div className="mb-8 lg:mb-10">
                      <div className="relative inline-block">
                        <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto bg-gradient-to-br from-[#396131] to-[#4a7a3f] rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          <FontAwesomeIcon
                            icon={service.icon}
                            className="text-white text-4xl lg:text-5xl"
                          />
                        </div>
                        {/* Floating ring animation */}
                        {/* <div className="absolute -inset-4 bg-gradient-to-br from-[#396131]/20 to-[#4a7a3f]/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm scale-110 group-hover:scale-125"></div> */}
                        {/* Pulse effect */}
                        {/* <div className="absolute -inset-2 bg-[#396131]/10 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div> */}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 lg:space-y-6">
                      <h3 className="text-xl lg:text-2xl font-bold text-[#396131] group-hover:text-[#4a7a3f] transition-colors duration-300">
                        {service.name}
                      </h3>

                      <div className="w-12 h-0.5 bg-gradient-to-r from-[#396131] to-[#4a7a3f] mx-auto rounded-full opacity-60 group-hover:opacity-100 group-hover:w-16 transition-all duration-300"></div>

                      <p className="text-gray-600 leading-relaxed text-sm lg:text-base group-hover:text-gray-700 transition-colors duration-300">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* <section
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
        </section> */}
        <section
          id="awards"
          data-scroll
          className="relative py-16 lg:py-24 overflow-hidden"
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-24">
              {/* Trophy Icon */}
              <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
                <div className="relative group">
                  {/* Main trophy container */}
                  <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-[#396131] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all duration-700">
                    <FontAwesomeIcon
                      icon={faTrophy}
                      className="text-white text-8xl sm:text-9xl lg:text-[10rem] filter drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#396131] mb-8 leading-tight">
                  AWARDS & RECOGNITION
                </h2>
                <div className="w-24 h-1 bg-[#396131] mx-auto lg:mx-0 rounded-full mb-10"></div>

                {/* Featured Awards */}
                <div className="space-y-8 lg:space-y-10">
                  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100 hover:border-amber-200">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#396131] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-lg">A+</span>
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-[#396131] mb-3 group-hover:text-amber-700 transition-colors duration-300">
                          RATED A+
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                          By PhilRatings, a pioneer domestic credit rating
                          agency recognized by the Bangko Sentral ng Pilipinas
                          (BSP).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100 hover:border-amber-200">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#396131] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon
                          icon={faTrophy}
                          className="text-white text-lg"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-[#396131] mb-3 group-hover:text-amber-700 transition-colors duration-300">
                          EAGLE AWARD FOR MICROFINANCE
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                          Bestowed by the U.S. Agency for International
                          Development through the RBAP-implemented MABS, a
                          program that assists rural banks in increasing their
                          financial services to the microenterprise sector.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Awards Grid */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-amber-100">
              <div className="text-center mb-10 lg:mb-12">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#396131] mb-4">
                  More Achievements
                </h3>
                <div className="w-16 h-0.5 bg-[#396131] mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                {awards.map((award, index) => (
                  <div
                    key={index}
                    className="group bg-white/80 rounded-2xl p-6 lg:p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-amber-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#396131] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon
                          icon={faTrophy}
                          className="text-white text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg lg:text-xl font-bold text-[#396131] mb-3 group-hover:text-amber-700 transition-colors duration-300 leading-tight">
                          {award.header}
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                          {award.description}
                        </p>
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* <section id="core-values" data-scroll className="flex text-[#396131]">
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
        </section> */}
        <section
          id="core-values"
          className="relative py-16 lg:py-24 overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 left-16 w-40 h-40 bg-gradient-to-br from-green-400/15 to-teal-400/15 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-emerald-300/10 to-green-400/10 rounded-full blur-xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-24">
              {/* Bank Icon */}
              <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
                <div className="relative group">
                  {/* Main bank container */}
                  <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-[#396131] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all duration-700">
                    <FontAwesomeIcon
                      icon={faLightbulb}
                      className="text-white text-[7rem] lg:text-[10rem]"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#396131] mb-8 leading-tight">
                  VISION & MISSION
                </h2>
                <div className="w-24 h-1 bg-[#396131] mx-auto lg:mx-0 rounded-full mb-10"></div>

                {/* Featured Vision */}
                <div className="space-y-8 lg:space-y-10">
                  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100 hover:border-emerald-200">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#396131] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <div className="w-10 h-10 bg-[#396131] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <FontAwesomeIcon
                            icon={faLightbulb}
                            className="text-white text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-[#396131] mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                          VISION
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                          We envision to be the preferred banking institution in
                          delivering innovative and customer-centered services.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white/80 rounded-2xl p-6 lg:p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-amber-200">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#396131] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon
                          icon={faLeaf}
                          className="text-white text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg lg:text-xl font-bold text-[#396131] mb-3 group-hover:text-amber-700 transition-colors duration-300 leading-tight">
                          MISSION
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                          Committed to delivering exceptional banking services
                          while fostering growth for our customers, employees,
                          stakeholders, and communities.
                        </p>
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission & Core Values Grid */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-emerald-100">
              <div className="text-center mb-10 lg:mb-12">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#396131] mb-4">
                  Our Mission Points
                </h3>
                <div className="w-16 h-0.5 bg-[#396131] mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-12">
                {[
                  [
                    "Customer First",
                    "Be one 1st Valley Bank; be the go-to bank for our customers",
                    faBuildingFlag,
                  ],
                  [
                    "Top Employer",
                    "Be the top employer for our staff",
                    faUsersGear,
                  ],
                  [
                    "High Returns",
                    "Ensure delivery of high returns for our stakeholders",
                    faSeedling,
                  ],
                  [
                    "Community Development",
                    "Promote development in the areas where we operate",
                    faArrowUpRightDots,
                  ],
                ].map((point, index) => (
                  <div
                    key={index}
                    className="group bg-white/80 rounded-2xl p-6 lg:p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-emerald-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#396131] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon
                          icon={point[2]}
                          className="text-white text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg lg:text-xl font-bold text-[#396131] mb-3 group-hover:text-emerald-700 transition-colors duration-300 leading-tight">
                          {point[0]}
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                          {point[1]}
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>

              {/* Core Values Section */}
              <div className="text-center mb-10">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#396131] mb-4">
                  Core Values
                </h3>
                <div className="w-16 h-0.5 bg-[#396131] mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                {[
                  [
                    "Integrity & Transparency",
                    "We conduct our business with integrity, transparency, honesty, and the highest ethical standards.",
                    faHandSparkles,
                  ],
                  [
                    "Equality & Respect",
                    "Treating our customers with equality, fairness, and respect is foremost in our delivery of excellent banking services.",
                    faHandHoldingHand,
                  ],
                  [
                    "Innovation & Excellence",
                    "We develop our business through innovation, enthusiasm, creativity, and our constant quest for excellence.",
                    faLightbulb,
                  ],
                ].map((value, index) => (
                  <div
                    key={index}
                    className="group bg-white/80 rounded-2xl p-6 lg:p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-emerald-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#396131] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon
                          icon={value[2]}
                          className="text-white text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg lg:text-xl font-bold text-[#396131] mb-3 group-hover:text-emerald-700 transition-colors duration-300 leading-tight">
                          {value[0]}
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                          {value[1]}
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id="branch-management"
          data-scroll
          className="flex flex-col lg:flex-row gap-[10px] p-[20px] lg:p-[50px] text-[#396131]"
        >
          <div className="flex items-start justify-center lg:w-1/2">
            <img
              src={img7}
              alt=""
              className="rounded-[15px] object-cover w-[562px] h-[350px] lg:h-[713px]"
            />
          </div>
          <div className="flex flex-col gap-[10px] lg:w-1/2">
            <span className="text-[1.5rem] lg:text-[2rem]/[2rem] font-bold ">
              BRANCH MANAGEMENT
            </span>
            <span className="text-[0.563rem] lg:text-[0.8rem]/[1.6rem]">
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
          className="flex flex-col p-[20px] lg:p-[50px] gap-[30px] bg-[#396131] text-white rounded-[10px] mx-[10px] drop-shadow-lg"
        >
          <span className="text-[1.5rem]/[3rem] lg:text-[2.5rem] font-bold text-center">
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
                    <span className="text-[0.8rem]/[1.2rem] lg:text-[1rem] font-bold text-center">
                      Atty. Nicolas J. Lim
                    </span>
                    <span className="text-[0.6rem]/[1.2rem]">PRESIDENT</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-[15px] gap-y-[20px] lg:gap-x-[30px] lg:gap-y-[40px] text-center">
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
                      <span className="text-[0.8rem]/[1.2rem] lg:text-[1rem] font-bold">
                        {officer.name}
                      </span>
                      <span className="text-[0.6rem]/[1.2rem] lg:text-[0.9rem]">
                        {officer.position}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-[50px]">
              <span className="font-bold text-[1rem] text-center">
                Product & Area Management
              </span>
              <div className="grid grid-cols-2 g:grid-cols-4 gap-x-[30px] gap-y-[40px] text-center">
                {corporateProfile.product_management.map((officer, index) => (
                  <div className="flex flex-col justify-center items-center gap-[20px]">
                    <img
                      src={logo}
                      alt=""
                      className="bg-white h-[100px] w-[100px] rounded-full"
                    />
                    <div className="flex flex-col items-center">
                      <span className="text-[0.8rem]/[1.2rem] lg:text-[1rem] font-bold">
                        {officer.name}
                      </span>
                      <span className="text-[0.6rem]/[1.2rem] lg:text-[0.9rem]">
                        {officer.position}
                      </span>
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
          className="flex flex-col justify-center text-[#396131] gap-[40px] p-[20px] lg:p-[50px]"
        >
          <span className="text-[1.5rem] lg:text-[3rem]/[3rem] font-bold text-center">
            Annual Reports
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-[10px] gap-y-[30px] lg:gap-y-[60px] lg:gap-x-[20px]">
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
          className="flex flex-col gap-[40px] lg:gap-[80px] p-[20px] lg:p-[50px] text-white bg-[#396131] rounded-[10px] mx-[10px] drop-shadow-lg"
        >
          <span className="text-center font-bold text-[1.5rem]/[2.5rem] lg:text-[2.5rem]/[2.5rem]">
            Branch Directory
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[50px] gap-y-[30px] lg:gap-y-[60px]">
            {branchDirectories.map((branch, index) => (
              <div className="flex gap-[20px]" key={index}>
                <img
                  src={branch.image}
                  alt=""
                  className="w-[150px] h-[150px] rounded-[15px]"
                />
                <div className="flex flex-col gap-[10px] lg:gap-[20px]">
                  <div className="flex flex-col gap-[12px] font-bold">
                    <span className="text-[1rem]/[1rem] lg:text-[1.4rem]/[1.4rem]">
                      {branch.name}
                    </span>
                    <span className="text-[0.8rem]/[0.8rem] lg:text-[0.9rem]/[0.9rem]">
                      {branch.location}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[12px] text-[0.8rem]/[0.8rem] lg:text-[0.9rem]/[0.9rem]">
                    <span className="">{branch.contact_numbers}</span>
                    <span className="">{branch.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
