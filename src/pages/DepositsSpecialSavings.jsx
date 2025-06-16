import React, { useEffect, useState } from "react";
import {
  faCoins,
  faFilterCircleDollar,
  faHandHoldingMedical,
  faMoneyBillTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DepositsSpecialSavings() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [activeSection, setActiveSection] = useState("");
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

  const features = [
    {
      name: "SSD MICRO",
      description:
        "Contractual savings account forming part of the micro loan guarantee.",
      icon: faCoins,
    },
    {
      name: "SSD REGULAR",
      description:
        "Build-up savings that forms part of the regular loan of the clients. Initial deposit is Php300 to Php1K that builds up every loan renewal. ",
      icon: faMoneyBillTrendUp,
    },
    {
      name: "HANDOG SAVINGS",
      description:
        "Deposit program for supervised credit clients. Minimum deposit is Php500 or 1% of the loan amount. .",
      icon: faHandHoldingMedical,
    },
  ];

  return (
    <>
      <main className="hidden lg:flex flex-col gap-[120px] pb-[50px]">
        <nav className="fixed top-35 right-4 z-40 bg-black bg-opacity-50 backdrop-blur-lg rounded-2xl p-2">
          <div className="flex flex-col gap-2">
            {["main", "features", "first-checking-account"].map((section) => (
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
          <div className="flex flex-col gap-[20px] py-[80px] px-[60px] mx-[10px]">
            <div className="flex flex-col gap-[10px]">
              <span className="text-[4rem]/[4rem] font-bold">
                Deposits / Special Savings
              </span>
              <span className="text-[1.5rem]/[1.5rem] font-bold">
                Saving with a smile
              </span>
            </div>
            <span className="text-[1rem]/[2rem] w-1/2">
              Make your money work smarter with 1st Valley Bank’s Special
              Savings Deposit! Designed for security and steady growth, it’s the
              ideal place to park your cash with confidence. Whether you're
              building an emergency fund or saving for future plans, enjoy peace
              of mind and dependable returns while your savings stay within
              reach.
            </span>
          </div>
        </section>
        <section
          id="features"
          data-scroll
          className="mx-[114px] text-[#396131]"
        >
          <div className="flex flex-col gap-[40px]">
            {features.map((feature, index) => (
              <div className="flex items-center gap-[120px]" key={index}>
                <FontAwesomeIcon
                  icon={feature.icon}
                  className="flex aspect-square"
                  style={{ width: "80px", height: "80px" }}
                />
                <div className="flex flex-col gap-[20px]">
                  <span className="text-[1.5rem]/[1.5rem] font-bold">
                    {feature.name}
                  </span>
                  <span className="text-[1rem]/[3rem]">
                    {feature.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="first-checking-account" data-scroll className="mx-[15px]">
          <div className="flex flex-col justify-center gap-[70px] p-[80px] rounded-[8px] bg-[#396131] text-white drop-shadow-lg">
            <div className="flex justify-center gap-[30px]">
              <div className="flex flex-col justify-start gap-[20px] w-4/5">
                <span className="text-[1.5rem]/[3rem] font-bold">
                  BASIC SAVINGS
                </span>
                <span className="text-[1rem]/[3rem]">
                  A deposit account designed for the unbanked sector. It
                  provides holders the ability to enjoy basic banking functions.
                  Clients only need to deposit a minimum of Php100 as initial
                  savings. There is no average daily balance to maintain. Client
                  is allowed to deposit up to Php50,000.
                </span>
              </div>
              <div className="flex justify-center w-1/5">
                {" "}
                <FontAwesomeIcon
                  icon={faFilterCircleDollar}
                  className="flex aspect-square"
                  style={{ width: "250px", height: "250px" }}
                />
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
