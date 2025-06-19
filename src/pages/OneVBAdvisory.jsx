import React from "react";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "../components/Carousel";

export default function OneVBAdvisory() {
  return (
    <>
      <main className="flex flex-col gap-[40px] lg:gap-[80px] pb-[50px]">
        <section
          id="main"
          data-scroll
          className="flex flex-col-reverse lg:flex-row text-[#396131] bg-white drop-shadow-lg rounded-[8px] p-[20px] gap-[20px] lg:gap-[40px] lg:py-[80px] lg:px-[80px] mx-[10px]"
        >
          <div className="flex flex-col gap-[10px] lg:gap-[20px] lg:w-3/5">
            <span className="text-[2rem]/[4rem] lg:text-[4rem]/[4rem] font-bold">
              1VB Advisory
            </span>
            <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[2rem]">
              Navigate your financial journey with confidence through 1VB
              Advisory! Our expert team is here to guide you with personalized
              advice, smart strategies, and tailored solutions. Whether planning
              investments, managing loans, or growing your wealth, 1VB Advisory
              empowers you to make informed decisions and secure a brighter
              financial future. Your success, our mission!
            </span>
          </div>
          <div className="flex justify-center lg:w-2/5">
            <FontAwesomeIcon
              icon={faNewspaper}
              className="text-[10rem] lg:text-[20rem]"
            />
          </div>
        </section>
        <section id="carousel" className="lg:mx-auto">
          <Carousel />
        </section>
      </main>
    </>
  );
}
