import React from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopesBulk,
  faUser,
  faQuoteRight,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";

import logo from "/src/assets/1vb logo_2x2.png";
import gcash from "/src/assets/gcash-logo-png_seeklogo-522261-removebg-preview.png";
import bsp from "/src/assets/image-removebg-preview (1).png";
import ctb from "/src/assets/image-removebg-preview (2).png";
import pdic from "/src/assets/image-removebg-preview.png";
import usaid from "/src/assets/Seal_of_the_United_States_Agency_for_International_Development.svg.png";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons/faBuildingColumns";

export default function HomePage() {
  const products = [
    {
      image: logo,
      header: "Deposits",
      description:
        "Grow your savings with security and ease! 1st Valley Bank’s deposit products are built to help you reach your goals—one peso at a time.",
      path: "/deposits",
    },
    {
      image: logo,
      header: "Loans",
      description:
        "Get the support you need to start a business, grow your farm, or build your dream home with affordable loan options from 1st Valley Bank.",
      path: "/loans",
    },
    {
      image: logo,
      header: "Properties for Sale",
      description:
        "Start your next chapter—browse prime properties for sale at great prices. Your dream home or investment could be just a click away.",
      path: "/properties-for-sale",
    },
  ];

  const testimonials = [
    {
      image: logo,
      name: "Mrs. Virginia Cameros Tobiano",
      testimony:
        "Dako jud kaayo natabang ang 1st Valley Bank samoa kay tungod sa ila pagpautang samoa nakabakod mi balik. (1st Valley Bank helped us a lot that we were able to rise again.),",
    },
    {
      image: logo,
      name: "Mrs. Virginia Cameros Tobiano",
      testimony:
        "Dako jud kaayo natabang ang 1st Valley Bank samoa kay tungod sa ila pagpautang samoa nakabakod mi balik. (1st Valley Bank helped us a lot that we were able to rise again.),",
    },
    {
      image: logo,
      name: "Mrs. Virginia Cameros Tobiano",
      testimony:
        "Dako jud kaayo natabang ang 1st Valley Bank samoa kay tungod sa ila pagpautang samoa nakabakod mi balik. (1st Valley Bank helped us a lot that we were able to rise again.),",
    },
  ];

  const features = [
    {
      image: logo,
      header: "BUSINESS CONDUCT",
      description:
        "We conduct our business with integrity, transparency, honesty, and highest ethical standards.",
    },
    {
      image: logo,
      header: "CLIENT TREATMENT",
      description:
        "Treating our clients with equality, fairness, and respect is foremost in our delivery of excellent banking services.",
    },
    {
      image: logo,
      header: "BUSINESS DEVELOPMENT",
      description:
        "We develop our business through innovation, enthusiasm, creativity, and our constant quest for excellence",
    },
  ];

  return (
    <>
      <main className="hidden lg:flex flex-col gap-[100px] pb-[50px]">
        <section className="px-[50px] py-[65px] mx-[15px] drop-shadow-lg rounded-sm bg-white mb-[25px] font-poppins">
          <div className="flex mb-[25px]">
            <div className="flex gap-[20px] flex-col w-3/5 justify-center">
              <NavLink
                to="/about-us"
                className="text-center px-[20px] rounded-[5px] w-[100px] py-[5px] bg-[#396131] outline-[#396131] text-[0.55rem] font-bold outline-0 text-white mb-[20px] cursor-pointer hover:text-[#396131] hover:outline-1 hover:bg-white drop-shadow-lg transition-all duration-200 transform"
              >
                Read More
              </NavLink>
              <div className="flex flex-col">
                <span className="font-extrabold text-[4rem]/[4rem] text-[#396131]">
                  Your Satisfaction
                </span>
                <span className="font-extrabold text-[4rem]/[4rem] mb-[20px] text-[#396131]">
                  is Our Mission
                </span>
              </div>
              <span className=" text-[#396131] font-medium text-[1rem]/[2rem] w-full mb-[20px]">
                1st Valley Bank is committed to provide you with innovative and
                responsive solutions to your banking needs and requirements.
                From a multi-awarded rural bank to a development bank in
                Mindanao and Visayas, our 82 branches and branch lite units
                shall deliver you only the best services that you truly deserve.
                We will work with you all the way. As your success is our
                business, you can count on us to be your lifetime friend
              </span>
              <div className="flex gap-[20px] text-[0.8rem]">
                <NavLink
                  to="/consumer-protection/1vb-products"
                  className="bg-[#396131] rounded-[10px] text-white px-[16px] py-[8px] font-bold cursor-pointer hover:text-[#396131] hover:outline-1 hover:bg-white drop-shadow-lg transition-all duration-200 transform"
                >
                  Our Services
                </NavLink>
                <NavLink
                  to="/about-us"
                  className="bg-white rounded-[10px] text-[#396131] px-[16px] py-[8px] font-bold  cursor-pointer hover:text-white hover:outline-1 hover:bg-[#396131] drop-shadow-lg transition-all duration-200 transform"
                >
                  About Us
                </NavLink>
              </div>
            </div>
            <div className="flex items-center w-2/5">
              <div className="aspect-square">
                <img src={logo} className="h-[459px] w-[433px]" />
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col px-[50px] gap-[30px] text-[#396131]">
          <p className="text-[3rem] text-center font-bold">
            Here for Every Step of Your Journey
          </p>
          <div className="grid grid-cols-3 gap-x-[80px]">
            {products.map((product, index) => (
              <div className="flex flex-col text-center items-center gap-[17px]">
                <img
                  src={product.image}
                  alt=""
                  className="drop-shadow-lg rounded-full object-center w-[200px] h-[200px]"
                />
                <p className="font-bold text-[2rem]/[3rem]">{product.header}</p>
                <p className="text-[1.5rem]/[2.25rem]">{product.description}</p>
                <NavLink
                  to={product.path}
                  className="w-full rounded-[10px] text-center bg-[#396131] text-[1rem] text-white font-bold py-[8px] drop-shadow-lg hover:bg-white hover:text-[#396131] hover:outline-1 outline-0 outline-[#396131] tranform transition-all duration-200"
                >
                  Read More
                </NavLink>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-[50px] px-[80px] pt-[30px] text-[#396131]">
          <p className="text-[3rem] text-center font-bold">
            The 1st Valley Bank Difference
          </p>
          <div className="grid grid-cols-3 gap-x-[50px]">
            {features.map((feature, index) => (
              <div className="flex flex-col text-center items-center gap-[17px]">
                <img
                  src={feature.image}
                  alt=""
                  className="drop-shadow-lg rounded-full object-center w-[200px] h-[200px]"
                />
                <p className="font-bold text-[2rem]/[3rem]">{feature.header}</p>
                <p className="text-[1.5rem]/[2.25rem]">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="px-[15px]">
          <div className="flex items-center justify-center px-[80px] py-[60px] gap-[80px] bg-[#396131] rounded-[8px] drop-shadow-lg">
            <div className="flex flex-col items-start gap-[20px] w-3/5">
              <NavLink
                to="/newsletter"
                className="flex items-center justify-center w-[200px] py-[10px] font-bold text-center rounded-[5px] bg-white text-[#396131] text-[1rem] outline-0 outline-white transition-all transform duration-200 hover:bg-[#396131] hover:outline-1 hover:text-white"
              >
                Read More
              </NavLink>
              <span className="text-white font-bold text-[4rem]">
                Newsletter
              </span>
              <span className="text-white font-bold text-[1.5rem]/[2.25rem]">
                Stay Connected with 1st Valley Bank!
              </span>
              <span className="text-white font-medium text-[1rem]/[2rem]">
                Welcome to your monthly source of financial tips, community
                updates, new services, and exclusive offers. Whether you're
                planning, saving, or growing, we’re here to guide your journey
                every step of the way. Let’s build a brighter financial
                future—together!
              </span>
            </div>
            <div className="w-2/5">
              <FontAwesomeIcon
                icon={faEnvelopesBulk}
                className="text-white aspect-square"
                style={{ width: "409px", height: "364px" }}
              />
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-[60px] px-[15px]">
          <p className="text-[3rem] text-[#396131] text-center font-bold">
            Trusted by the Community
          </p>
          <div className="grid grid-cols-3 gap-x-[20px]">
            {testimonials.map((testimony, index) => (
              <div
                className="flex flex-col p-[30px] items-center justify-start gap-[20px] bg-white rounded-[10px] drop-shadow-lg"
                key={index}
              >
                <div className="flex items-center gap-[20px] w-full">
                  <div className="flex justify-center items-center bg-white drop-shadow-lg text-[#396131] rounded-full w-[100px] h-[100px]">
                    <img
                      src={testimony.image}
                      alt=""
                      className="object-center rounded-full"
                    />
                  </div>
                  <span className="flex font-bold text-[0.8rem]/[1.6rem] text-[#396131] w-1/3">
                    {testimony.name}
                  </span>
                  <div className="flex justify-center items-center text-[#396131] w-1/3">
                    <FontAwesomeIcon
                      icon={faQuoteRight}
                      style={{ width: "70px", height: "50px" }}
                    />
                  </div>
                </div>
                <span className="text-[0.8rem]/[1.6rem]">
                  {testimony.testimony}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="px-[15px]">
          <div className="flex items-center justify-center px-[80px] py-[60px] gap-[80px] bg-[#396131] rounded-[8px] drop-shadow-lg">
            <div className="flex flex-col items-start gap-[20px] w-3/5">
              <span className="text-white font-bold text-[4rem]/[4rem]">
                Be Our Lifetime Friend
              </span>
              <span className="text-white font-medium text-[1rem]/[2rem]">
                At 1st Valley Bank, we believe banking is more than
                transactions—it’s about building lasting relationships. When you
                choose us, you’re not just a customer; you’re part of our
                family. Together, we’ll support your dreams, celebrate
                milestones, and grow through every chapter of life. Let’s walk
                this journey side by side—today, tomorrow, and always.
              </span>
              <NavLink
                to="/contact-us"
                className="flex items-center justify-center w-[200px] py-[10px] font-bold text-center rounded-[5px] bg-white text-[#396131] text-[1rem] outline-0 outline-white transition-all transform duration-200 hover:bg-[#396131] hover:outline-1 hover:text-white"
              >
                Inquire Now
              </NavLink>
            </div>
            <div className="w-2/5">
              <FontAwesomeIcon
                icon={faHandshake}
                className="text-white aspect-square"
                style={{ width: "409px", height: "364px" }}
              />
            </div>
          </div>
        </section>
        <section className="px-[15px]">
          <div className="flex items-center justify-center px-[80px] py-[60px] gap-[80px] text-[#396131] rounded-[8px]">
            <div className="w-2/5">
              <FontAwesomeIcon
                icon={faBuildingColumns}
                className="aspect-square"
                style={{ width: "409px", height: "364px" }}
              />
            </div>
            <div className="flex flex-col items-start gap-[60px] w-3/5">
              <div className="flex flex-col gap-[20px]">
                <span className="font-bold text-[2rem]">
                  Get to Know 1st Valley Bank
                </span>
                <span className="font-medium text-[1rem]/[3rem]">
                  1st Valley Bank is a development bank in the Philippines,
                  based in Baroy, Lanao del Norte and servicing various areas in
                  Mindanao, specifically the provinces of Lanao del Norte, Lanao
                  del Sur, Misamis Occidental, Misamis Oriental, Bukidnon,
                  Zamboanga del Norte, Zamboanga del Sur and Zamboanga Sibugay.
                </span>
              </div>
              <NavLink
                to="/about-us"
                className="flex items-center justify-center w-full h-[65px] font-bold text-center rounded-[5px] bg-[#396131] text-white text-[1.5rem] outline-0 outline-[#396131] transition-all transform duration-200 hover:bg-white hover:outline-1 hover:text-[#396131]"
              >
                <span>Learn More</span>
              </NavLink>
            </div>
          </div>
        </section>
      </main>
      <main className="hidden sm:block lg:hidden">Tablet</main>
      <main className="block sm:hidden">Mobile</main>
    </>
  );
}
