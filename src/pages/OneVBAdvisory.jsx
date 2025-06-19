import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "../components/Carousel";
import React from "react";

export default function OneVBAdvisory() {
  return (
    <>
      <main className="hidden lg:flex flex-col gap-[80px] pb-[50px]">
        <section
          id="main"
          data-scroll
          className="flex text-[#396131] bg-white drop-shadow-lg rounded-[8px] py-[80px] px-[80px] mx-[10px]"
        >
          <div className="flex flex-col gap-[20px] w-3/5">
            <span className="text-[4rem]/[4rem] font-bold">1VB Advisory</span>
            <span className="text-[1rem]/[2rem]">
              Navigate your financial journey with confidence through 1VB
              Advisory! Our expert team is here to guide you with personalized
              advice, smart strategies, and tailored solutions. Whether planning
              investments, managing loans, or growing your wealth, 1VB Advisory
              empowers you to make informed decisions and secure a brighter
              financial future. Your success, our mission!
            </span>
          </div>
          <div className="flex justify-center w-2/5">
            <FontAwesomeIcon
              icon={faNewspaper}
              style={{ width: "50%", height: "auto" }}
            />
          </div>
        </section>
        <section id="carousel" className="mx-[80px]">
          <Carousel />
        </section>
      </main>
    </>
  );
}
