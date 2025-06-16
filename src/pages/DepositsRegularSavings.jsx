import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExpand,
  faPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function DepositsRegularSavings() {
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

  return (
    <>
      <main className="hidden lg:flex flex-col gap-[120px] pb-[50px]">
        <nav className="fixed top-35 right-4 z-40 bg-black bg-opacity-50 backdrop-blur-lg rounded-2xl p-2">
          <div className="flex flex-col gap-2">
            {["main", "sd-plus", "first-checking-account"].map((section) => (
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
                Deposits / Regular Savings
              </span>
              <span className="text-[1.5rem]/[1.5rem] font-bold">
                Saving with a smile
              </span>
            </div>
            <span className="text-[1rem]/[2rem] w-1/2">
              This savings account offers an annual interest rate that is 0.5%
              higher than what most banks typically provide. It stands out as a
              wise and practical option for individuals looking to securely park
              their cash while earning a slightly better return compared to
              conventional savings accounts, making it a smart financial
              decision
            </span>
          </div>
        </section>
        <section id="sd-plus" data-scroll className="mx-[40px]">
          <div className="flex flex-col justify-center gap-[70px] px-[80px] text-[#396131]">
            <div className="flex justify-center gap-[30px]">
              <div className="flex justify-center w-1/5">
                {" "}
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  className="flex aspect-square"
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
              <div className="flex flex-col justify-start gap-[20px] w-4/5">
                <span className="text-[1.5rem]/[3rem] font-bold">SD PLUS</span>
                <span className="text-[1rem]/[3rem]">
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
        <section id="first-checking-account" data-scroll className="mx-[15px]">
          <div className="flex flex-col justify-center gap-[70px] p-[80px] rounded-[8px] bg-[#396131] text-white drop-shadow-lg">
            <div className="flex justify-center gap-[30px]">
              <div className="flex flex-col justify-start gap-[20px] w-4/5">
                <span className="text-[1.5rem]/[3rem] font-bold">
                  1ST CHECKING ACCOUNT
                </span>
                <span className="text-[1rem]/[3rem]">
                  1st Checking Account is a demand deposit that earns interest
                  and comes with a passbook. It can be a personal account or a
                  business account. It can also be tied up with ones loan
                  account with us. This demand deposit allows clients to enjoy
                  lower loan interest rates. All applications for account
                  opening are subject to evaluation.
                </span>
              </div>
              <div className="flex justify-center w-1/5">
                {" "}
                <FontAwesomeIcon
                  icon={faPlusCircle}
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
