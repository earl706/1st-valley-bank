import React from "react";
import {
  faFileSignature,
  faFingerprint,
  faGem,
  faTruck,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function ConsumerProtection() {
  return (
    <>
      <main className="flex flex-col gap-[80px] pb-[50px]">
        {/* <section
          id="main"
          data-scroll
          className="flex text-[#396131] bg-white drop-shadow-lg mx-[10px] rounded-[8px] py-[30px]"
        >
          <div className="flex flex-col gap-[20px] py-[80px] px-[60px] mx-[10px] w-3/5">
            <span className="text-[4rem]/[4rem] font-bold">
              Consumer Protection
            </span>
            <span className="text-[1rem]/[2rem]">
              At 1st Valley Bank, your trust is our priority. Our Consumer
              Protection program ensures your rights as a client are respected,
              your data is secure, and your concerns are heard. We’re committed
              to fair, transparent, and responsible banking—because protecting
              you is just as important as serving you. Let’s grow safely,
              together.
            </span>
          </div>
          <div className="flex items-center justify-center w-2/5">
            <FontAwesomeIcon
              icon={faUnlock}
              className="flex aspect-square"
              style={{ width: "60%", height: "auto" }}
            />
          </div>
        </section> */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 mx-4 rounded-3xl shadow-2xl shadow-emerald-900/10 mb-8 font-sans">
          <div className="relative px-8 sm:px-12 lg:px-16 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Content Section */}
              <div className="flex-1 space-y-8 text-center lg:text-left">
                {/* Main Heading */}
                <div className="space-y-2">
                  <h1 className="text-xl sm:text-2xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#396131] via-[#FB3F3F] to-[#FDE900] leading-tight">
                    Consumer Protection
                  </h1>
                </div>

                {/* Description */}
                <p className="text-lg text-slate-700 leading-relaxed max-w-2xl">
                  At 1st Valley Bank, your trust is our priority. Our Consumer
                  Protection program ensures your rights as a client are
                  respected, your data is secure, and your concerns are heard.
                  We’re committed to fair, transparent, and responsible
                  banking—because protecting you is just as important as serving
                  you. Let’s grow safely, together.
                </p>
              </div>

              {/* Image Section */}
              <div className="flex-shrink-0 lg:w-2/5">
                <div className="relative group">
                  {/* Main image container */}
                  <div className="flex justify-center items-center overflow-hidden rounded-3xl  text-[#396131] group-hover:shadow-3xl transition-all duration-500 transform group-hover:-translate-y-2">
                    <FontAwesomeIcon
                      icon={faUnlock}
                      className="flex aspect-square"
                      style={{ width: "60%", height: "auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="privacy-policy"
          data-scroll
          className="flex text-[#396131] mx-[80px] rounded-[8px] gap-[30px]"
        >
          <div className="flex items-center justify-center w-1/4">
            <FontAwesomeIcon
              icon={faFingerprint}
              className="flex aspect-square"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="flex flex-col gap-[30px] w-3/4">
            <div className="flex flex-col gap-[20px] py-[80px] mx-[10px]">
              <span className="text-[3rem]/[3rem] font-bold">
                Privacy Policy
              </span>
              <span className="text-[1rem]/[3rem]">
                Your privacy matters at 1st Valley Bank. Through our Consumer
                Protection & Privacy Policy, we safeguard your personal data
                with the highest standards of security, transparency, and
                integrity. From information collection to usage, we ensure
                you're informed and protected—because trust and privacy go hand
                in hand.
              </span>
            </div>
            <NavLink
              to="/consumer-protection/privacy-policy"
              className="flex items-center justify-center w-full h-[60px] font-bold text-center rounded-[16px] bg-[#396131] text-white text-[1.5rem] outline-0 outline-[#396131] transition-all transform duration-200 hover:bg-white hover:outline-1 hover:text-[#396131]"
            >
              <span>Learn More</span>
            </NavLink>
          </div>
        </section>
        <section
          id="1vb-products"
          data-scroll
          className="flex bg-[#396131] text-white mx-[10px] drop-shadow-lg rounded-[8px] gap-[30px] px-[60px] py-[90px]"
        >
          <div className="flex flex-col gap-[30px] w-3/4">
            <div className="flex flex-col gap-[20px] py-[80px] mx-[10px]">
              <span className="text-[3rem]/[3rem] font-bold">1VB Products</span>
              <span className="text-[1rem]/[3rem]">
                At 1st Valley Bank, your protection starts with every product we
                offer. Our Consumer Protection: 1VB Products initiative ensures
                that each loan, deposit, and service is designed with fairness,
                transparency, and your best interest in mind. Know your rights,
                stay informed, and bank with confidence—because you deserve
                nothing less.
              </span>
            </div>
            <NavLink
              to="/consumer-protection/1vb-products"
              className="flex items-center justify-center w-full h-[60px] font-bold text-center rounded-[16px] text-[#396131] bg-white text-[1.5rem] outline-0 outline-white transition-all transform duration-200 hover:text-white hover:outline-1 hover:bg-[#396131]"
            >
              <span>Learn More</span>
            </NavLink>
          </div>
          <div className="flex items-center justify-center w-1/4">
            <FontAwesomeIcon
              icon={faGem}
              className="flex aspect-square"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </section>
        <section
          id="privacy-policy"
          data-scroll
          className="flex text-[#396131] mx-[80px] rounded-[8px] gap-[30px]"
        >
          <div className="flex items-center justify-center w-1/4">
            <FontAwesomeIcon
              icon={faFileSignature}
              className="flex aspect-square"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="flex flex-col gap-[30px] w-3/4">
            <div className="flex flex-col gap-[20px] py-[80px] mx-[10px]">
              <span className="text-[3rem]/[3rem] font-bold">
                Product Requirements
              </span>
              <span className="text-[1rem]/[3rem]">
                At 1st Valley Bank, we believe in clear, transparent banking.
                Our Consumer Protection: Product Requirements section ensures
                you're fully informed about what’s needed for each of our
                products, from loans to accounts. We’re here to make sure you
                know exactly what to expect, so you can make confident
                decisions. Bank smart, bank safe, bank with us!
              </span>
            </div>
            <NavLink
              to="/consumer-protection/product-requirements"
              className="flex items-center justify-center w-full h-[60px] font-bold text-center rounded-[16px] bg-[#396131] text-white text-[1.5rem] outline-0 outline-[#396131] transition-all transform duration-200 hover:bg-white hover:outline-1 hover:text-[#396131]"
            >
              <span>Learn More</span>
            </NavLink>
          </div>
        </section>
      </main>
      {/* <main className="hidden sm:block lg:hidden">Tablet</main>
      <main className="block sm:hidden">Mobile</main> */}
    </>
  );
}
