import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "/src/assets/1vb logo_2x2.png";
import gcash from "/src/assets/gcash-logo-png_seeklogo-522261-removebg-preview.png";
import bsp from "/src/assets/image-removebg-preview (1).png";
import ctb from "/src/assets/image-removebg-preview (2).png";
import pdic from "/src/assets/image-removebg-preview.png";
import usaid from "/src/assets/Seal_of_the_United_States_Agency_for_International_Development.svg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faLinkedin,
  faSignalMessenger,
  faSkype,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faAngleDown,
  faAngleRight,
  faArrowRight,
  faEnvelopeCircleCheck,
  faMessage,
  faPaperPlane,
  faPhone,
  faVoicemail,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ children }) {
  const footerNavigationItems = [
    { navItem: "Home", link: "/" },
    { navItem: "Deposits", link: "/deposits" },
    { navItem: "About Us", link: "/about-us" },
    { navItem: "Loans", link: "/loans" },
    { navItem: "Properties for Sale", link: "/properties-for-sale" },
    { navItem: "1VB Advisory", link: "/1vb-advisory" },
    { navItem: "Consumer Protection", link: "/consumer-protection" },
    { navItem: "Newsletter", link: "/newsletter" },
  ];

  const footerAgenciesNavigationItems = [
    { image: bsp, link: "" },
    { image: usaid, link: "" },
    { image: ctb, link: "" },
    { image: gcash, link: "" },
    { image: pdic, link: "" },
  ];

  const footerSocMedLinks = [
    { link: "", icon: faFacebook },
    { link: "", icon: faSkype },
    { link: "", icon: faGoogle },
    { link: "", icon: faLinkedin },
    { link: "", icon: faYoutube },
  ];

  return (
    <>
      <div className="bg-[#D9D9D9] pb-[80px]">
        <div className="flex justify-end items-center h-[69px] w-full bg-[#396131] px-[40px] py-[10px]">
          <div className="w-1/2">
            <img
              src={logo}
              className="w-[40px] h-[40px]"
              // width={41}
              // height={50}
              alt=""
            />
          </div>
          <div className="flex gap-[45px] justify-end w-1/2 text-[10px] text-[#D9D9D9] items-center">
            <span className="">1VB ADVISORY</span>
            <span className="">NEWSLETTER</span>
            <span className="">PRODUCTS</span>
            <span className="text-[12px] bg-[#FB3F3F] text-[#FFFFFF] font-bold rounded-[10px] py-[12px] px-[20px] cursor-pointer">
              Contact Us
            </span>
          </div>
        </div>
        <div className="flex gap-[20px] py-[15px] px-[95px] text-[14px] font-bold font-[#1E1E1E] w-full drop-shadow-lg bg-white mb-[16px] cursor-pointer">
          <span className="">DEPOSITS</span>
          <span className="">LOANS</span>
          <span className="">PROPERTIES FOR SALE</span>
        </div>
        <div className="">{children}</div>
      </div>

      <footer className="w-full bg-[#5F5F5F]">
        <div className="flex w-full flex-col px-[50px] pt-[30px]">
          <div className="flex justify-between items-start border-b-[1px] pb-[20px] border-white">
            <img src={logo} alt="" className="h-[172px] w-[172px] " />
            <div className="flex flex-col mr-[100px]">
              <div className="font-bold text-white text-[16px] mb-[20px]">
                Links
              </div>
              <ul className="grid grid-cols-2 gap-[20px] text-white text-[12px] font-thin">
                {footerNavigationItems.map((navItem, index) => (
                  <li key={index} className="">
                    <NavLink
                      to={navItem.link}
                      className="hover:font-semibold transition-all mr-[30px]"
                    >
                      <span>{navItem.navItem}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="grid grid-cols-2 gap-[25px] text-white text-[12px] font-thin">
              {footerAgenciesNavigationItems.map((navItem, index) => (
                <li key={index} className="mr-[25px]">
                  <NavLink
                    to={navItem.link}
                    className="hover:font-semibold transition-all"
                  >
                    <img
                      src={navItem.image}
                      alt=""
                      className="w-[50px] h-[50px]"
                    />
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-[20px]">
              <span className="font-bold text-white">Contact Us</span>
              <div className="flex gap-[15px] items-center text-[14px]">
                <div className="flex items-center justify-center w-[30px] h-[30px] text-gray-300">
                  <FontAwesomeIcon icon={faPhone} className="w-full h-full" />
                </div>
                <span className="text-white">+63917 820 8542</span>
              </div>
              <div className="flex gap-[15px] items-center text-[14px] mb-[20px]">
                <div className="flex items-center justify-center w-[30px] h-[30px] text-gray-300">
                  <FontAwesomeIcon
                    icon={faEnvelopeCircleCheck}
                    className="w-full h-full"
                  />
                </div>
                <input
                  type="text"
                  className="text-white border-b-[1px] border-white focus:outline-0 py-[3px]"
                  placeholder="Email"
                />
              </div>
              <div className="flex items-center gap-[25px]">
                {footerSocMedLinks.map((navItem, index) => (
                  <div
                    key={index}
                    className="flex item-center justify-center w-[50px] h-[50px] text-gray-300 hover:text-gray-400 transition-all cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={navItem.icon}
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="font-bold text-center w-full text-white py-[20px] text-[16px]">
          Copyright © 2025 - 1st Valley Bank Inc. - All rights reserved
        </div>
      </footer>
    </>
  );
}
