import React from "react";

import { Unlock } from "lucide-react";
import {
  faFileSignature,
  faFingerprint,
  faGem,
  faLock,
  faTruck,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function ConsumerProtectionPrivacyPolicy() {
  return (
    <>
      <main className="hidden lg:flex flex-col gap-[80px] pb-[50px]">
        <section
          id="main"
          data-scroll
          className="flex text-[#396131] bg-white drop-shadow-lg mx-[10px] rounded-[8px] py-[50px]"
        >
          <div className="flex flex-col gap-[20px] py-[80px] px-[60px] mx-[10px] w-3/5">
            <div className="flex flex-col gap-[20px]">
              <span className="text-[4rem]/[4rem] font-bold">
                Consumer Protection
              </span>
              <span className="text-[3rem]/[3rem] font-bold">
                Privacy Policy
              </span>
            </div>
            <span className="text-[1rem]/[2rem]">
              Your privacy matters at 1st Valley Bank. Through our Consumer
              Protection & Privacy Policy, we safeguard your personal data with
              the highest standards of security, transparency, and integrity.
              From information collection to usage, we ensure you're informed
              and protected—because trust and privacy go hand in hand.
            </span>
          </div>
          <div className="flex items-center justify-center w-2/5">
            <FontAwesomeIcon
              icon={faFingerprint}
              className="flex aspect-square"
              style={{ width: "60%", height: "auto" }}
            />
          </div>
        </section>
        <section
          id="main"
          data-scroll
          className="relative flex text-[#396131] bg-gradient-to-br from-white via-green-50/30 to-emerald-50/40 shadow-2xl mx-4 rounded-2xl py-16 overflow-hidden group"
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-teal-400 to-green-500 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex w-full">
            {/* Text Content */}
            <div className="flex flex-col gap-8 py-20 px-16 mx-4 w-3/5 transform group-hover:translate-x-2 transition-transform duration-700 ease-out">
              <span className="text-[4rem]/[4rem] font-bold bg-gradient-to-r from-[#396131] via-emerald-700 to-teal-700 bg-clip-text text-transparent drop-shadow-sm">
                Consumer Protection
              </span>
              <div className="relative">
                <span className="text-lg/[2rem] text-gray-700 font-medium tracking-wide leading-relaxed">
                  At 1st Valley Bank, your trust is our priority. Our Consumer
                  Protection program ensures your rights as a client are
                  respected, your data is secure, and your concerns are heard.
                  We're committed to fair, transparent, and responsible
                  banking—because protecting you is just as important as serving
                  you. Let's grow safely, together.
                </span>
                {/* Accent line */}
                <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-[#396131] to-emerald-500 rounded-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-1000 ease-out"></div>
              </div>
            </div>

            {/* Icon Container */}
            <div className="flex items-center justify-center w-2/5 relative">
              {/* Animated background circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 border-2 border-emerald-200/40 rounded-full animate-pulse"></div>
                <div className="absolute w-64 h-64 border-2 border-green-300/30 rounded-full animate-ping animation-delay-1000"></div>
                <div className="absolute w-48 h-48 bg-gradient-to-r from-emerald-100/50 to-green-100/50 rounded-full blur-xl"></div>
              </div>

              {/* Main Icon */}
              <div className="relative z-10 p-12 bg-gradient-to-br from-white/80 to-emerald-50/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/40 group-hover:scale-105 group-hover:rotate-3 transition-all duration-700 ease-out">
                <Unlock
                  className="w-48 h-48 text-[#396131] drop-shadow-lg group-hover:text-emerald-600 transition-colors duration-500"
                  strokeWidth={1.5}
                />

                {/* Shine effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-16 right-16 w-4 h-4 bg-emerald-400 rounded-full animate-bounce animation-delay-500 opacity-60"></div>
              <div className="absolute bottom-20 left-12 w-3 h-3 bg-green-500 rounded-full animate-bounce animation-delay-1000 opacity-40"></div>
              <div className="absolute top-32 left-8 w-2 h-2 bg-teal-400 rounded-full animate-bounce animation-delay-1500 opacity-50"></div>
            </div>
          </div>

          {/* Bottom gradient border */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#396131] to-transparent"></div>
        </section>
      </main>
      <main className="hidden sm:block lg:hidden">Tablet</main>
      <main className="block sm:hidden">Mobile</main>
    </>
  );
}
