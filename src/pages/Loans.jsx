import { faBank, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Loans() {
  return (
    <>
      <main className="hidden lg:flex flex-col gap-[80px] pb-[50px]">
        <section
          id="main"
          data-scroll
          className="flex text-[#396131] bg-white drop-shadow-lg mx-[10px] rounded-[8px] py-[50px]"
        >
          <div className="flex flex-col gap-[20px] py-[80px] px-[60px] mx-[10px] w-2/3">
            <span className="text-[4rem]/[4rem] font-bold">Loans</span>
            <span className="text-[1rem]/[2rem]">
              Fuel your dreams with 1st Valley Bank Loans! Whether you’re
              growing a business, investing in agriculture, or managing daily
              needs, our flexible loan options come with competitive rates and
              easy terms. Experience fast approval, personalized support, and
              financial solutions designed to help you succeed. Your goals are
              within reach—let’s make them happen!
            </span>
          </div>
          <div className="flex items-center justify-center w-1/3">
            <FontAwesomeIcon
              icon={faBank}
              className="flex aspect-square"
              style={{ width: "60%", height: "auto" }}
            />
          </div>
        </section>
        <section id="loans" className="mx-[60px]"></section>
      </main>
      <main className="hidden sm:block lg:hidden">Tablet</main>
      <main className="block sm:hidden">Mobile</main>
    </>
  );
}
