import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CaretDownIcon } from "@phosphor-icons/react";
import Footer from "./Footer";

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
  faAngleUp,
  faEnvelopeCircleCheck,
  faMessage,
  faPaperPlane,
  faPhone,
  faVoicemail,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ children }) {
  const [scrollY, setScrollY] = useState(0);
  // Primary navbar states
  const [activeItemHover, setActiveItemHover] = useState("");
  const [activeSubItemHover, setActiveSubItemHover] = useState("");

  // Secondary navbar states for multi-level dropdowns
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [activeSubSubDropdown, setActiveSubSubDropdown] = useState(null);

  const navigate = useNavigate();

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = window.location.pathname;

  const navbarNavigationItems = [
    { navItem: "HOME", path: "/", subItems: [] },
    {
      navItem: "CONSUMER PROTECTION",
      path: "/consumer-protection",
      subItems: [
        {
          subItem: "Privacy Policy",
          path: "/consumer-protection/privacy-policy",
        },
        { subItem: "1VB Products", path: "/consumer-protection/1vb-products" },
        {
          subItem: "Product Requirements",
          path: "/consumer-protection/product-requirements",
        },
      ],
    },
    { navItem: "ABOUT US", path: "/about-us", subItems: [] },
    { navItem: "1VB ADVISORY", path: "/1vb-advisory", subItems: [] },
    { navItem: "NEWSLETTER", path: "/newsletter", subItems: [] },
    {
      navItem: "PRODUCTS",
      path: "/consumer-protection/1vb-products",
      subItems: [],
    },
  ];

  const secondaryNavbarItems = [
    {
      navItem: "DEPOSITS",
      path: "/deposits",
      subItems: [
        {
          subItem: "Regular Savings",
          path: "/deposits/regular-savings",
          subsubItems: [
            { subItem: "SD PLUS", path: "/deposits/regular-savings" },
            {
              subItem: "1ST CHECKING ACCOUNT",
              path: "/deposits/regular-savings",
            },
          ],
        },
        {
          subItem: "Special Savings",
          path: "/deposits/special-savings",
          subsubItems: [
            { subItem: "SSD MICRO", path: "/deposits/special-savings" },
            { subItem: "SSD REGULAR", path: "/deposits/special-savings" },
            { subItem: "HANDOG SAVINGS", path: "/deposits/special-savings" },
            { subItem: "BASIC SAVINGS", path: "/deposits/special-savings" },
          ],
        },
      ],
    },
    {
      navItem: "LOANS",
      path: "/loans",
      subItems: [
        {
          subItem: "Agriculture",
          path: "/loans/agriculture",
          subsubItems: [],
        },
        {
          subItem: "Small and Medium Enterprises (SME)",
          path: "/loans/small-and-medium-enterprises",
          subsubItems: [],
        },
        {
          subItem: "Microfinance",
          path: "/loans/microfinance",
          subsubItems: [],
        },
        {
          subItem: "Supervised Credit (SUCRE)",
          path: "/loans/supervised-credit",
          subsubItems: [],
        },
        {
          subItem: "Gold & Gems",
          path: "/loans/gold-and-gems",
          subsubItems: [],
        },
        {
          subItem: "Small Business Loan (SBL)",
          path: "/loans/small-business-loan",
          subsubItems: [],
        },
        {
          subItem: "Salary",
          path: "/loans/salary",
          subsubItems: [],
        },
      ],
    },
    {
      navItem: "PROPERTIES FOR SALE",
      path: "/properties-for-sale",
      subItems: [
        {
          subItem: "Vehicles",
          path: "/properties-for-sale/vehicles",
          subsubItems: [],
        },
        {
          subItem: "Real Estate and Other Properties Acquired for Sale",
          path: "/properties-for-sale/real-estate-and-other-properties-acquired-for-sale",
          subsubItems: [],
        },
      ],
    },
  ];

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

  // Enhanced hover handlers for secondary navbar
  const handleSecondaryNavItemHover = (index) => {
    setActiveDropdown(index);
    setActiveSubDropdown(null);
    setActiveSubSubDropdown(null);
  };

  const handleSecondaryNavItemLeave = () => {
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    setActiveSubSubDropdown(null);
  };

  const handleSubItemHover = (subIndex) => {
    setActiveSubDropdown(subIndex);
    setActiveSubSubDropdown(null);
  };

  const handleSubSubItemHover = (subsubIndex) => {
    setActiveSubSubDropdown(subsubIndex);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  return (
    <>
      <div className="flex flex-col w-full h-full scroll-smooth font-poppins">
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-100">
          <div
            className="h-full bg-gradient-to-r from-[#31542B] via-[#FB3F3F] to-[#FDE900] transition-all duration-300"
            style={{
              width: `${
                (scrollY /
                  (document.documentElement.scrollHeight -
                    window.innerHeight)) *
                100
              }%`,
            }}
          />
        </div>
        <div
          className="bg-white fixed z-99 w-full"
          onMouseLeave={() => setActiveItemHover("")}
        >
          {/* Primary Navbar */}

          <div className="flex justify-end items-center h-[69px] w-full bg-[#31542B] px-[40px] py-[10px]">
            <div className="">
              <NavLink to="/">
                <img
                  src={logo}
                  className="w-[40px] h-[40px] transition-transform duration-200 hover:scale-105"
                  alt=""
                />
              </NavLink>
            </div>
            <div className="flex gap-[30px] w-full max-w-screen justify-end text-[0.5625rem] text-white items-center">
              <ul className="flex gap-[30px]">
                {navbarNavigationItems.map((navItem, index) => (
                  <li
                    key={index}
                    onMouseEnter={() => setActiveItemHover(navItem.path)}
                  >
                    <NavLink
                      to={navItem.path}
                      className={({ isActive }) =>
                        isActive
                          ? "flex flex-col items-center font-bold text-[0.5625rem] transition-all duration-200 hover:text-gray-200 transform hover:scale-105"
                          : "flex flex-col items-center font-bold text-[0.5625rem] transition-all duration-200 hover:text-gray-200 transform hover:scale-105"
                      }
                      key={index}
                    >
                      {navItem.subItems.length > 0 ? (
                        <div className="flex items-center gap-[5px]">
                          <span className="flex">{navItem.navItem}</span>

                          <FontAwesomeIcon
                            icon={faAngleUp}
                            className={
                              activeItemHover == navItem.path
                                ? "rotate-180 transition-all duration-300"
                                : "transition-all duration-300"
                            }
                          />
                        </div>
                      ) : (
                        <>{navItem.navItem}</>
                      )}
                    </NavLink>
                    <div
                      className={`${
                        navItem.path == location ||
                        activeItemHover == navItem.path
                          ? "bg-white w-full"
                          : "bg-transparent w-0"
                      } h-[3px] rounded-full transition-all duration-300 ease-in-out`}
                    ></div>

                    {/* Primary Dropdown */}
                    {activeItemHover == navItem.path &&
                      navItem.subItems.length > 0 && (
                        <div className="flex absolute w-[100vw] left-0 bg-white text-black transition-all duration-300 ease-in-out z-100 mt-[82px] text-[0.9rem] opacity-100 shadow-xl">
                          <div className="pl-[20px] pt-[20px] pr-[30px] h-full bg-[#31542B] min-w-[250px] min-h-[200px]">
                            <span className="capitalize font-bold text-white">
                              {navItem.navItem}
                            </span>
                          </div>
                          <div className="flex flex-col gap-[20px] pl-[50px] py-[10px] leading-auto">
                            {navItem.subItems.map((subItem, index) => (
                              <NavLink
                                onMouseEnter={() =>
                                  setActiveSubItemHover(subItem.path)
                                }
                                onMouseLeave={() => setActiveSubItemHover("")}
                                to={subItem.path}
                                key={index}
                                className="flex w-full items-center gap-[10px] font-bold text-[#31542B] transition-all duration-200 hover:translate-x-2"
                              >
                                <div className="w-[25px] h-[25px] rounded-[5px] bg-[#31542B] transition-all duration-200 hover:bg-[#396131]"></div>
                                <div className="flex flex-col">
                                  <span className="transition-colors duration-200 hover:text-[#396131]">
                                    {subItem.subItem}
                                  </span>
                                  <div
                                    className={`${
                                      navItem.path == location ||
                                      activeSubItemHover == subItem.path
                                        ? "bg-[#31542B] w-full"
                                        : "bg-transparent w-0"
                                    } h-[3px] rounded-full transition-all duration-300 ease-in-out`}
                                  ></div>
                                </div>
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      )}
                  </li>
                ))}
              </ul>
              <NavLink to="/contact-us">
                <span className="text-[0.875rem] bg-white text-[#396131] font-bold rounded-[10px] py-[12px] px-[20px] cursor-pointer hover:text-white hover:bg-[#396131] hover:outline-1 outline-0 outline-white transition-all duration-300 drop-shadow-lg transform hover:scale-105">
                  Contact Us
                </span>
              </NavLink>
            </div>
          </div>

          {/* Secondary Navbar with Enhanced Multi-Level Dropdowns */}
          <div
            className="flex gap-[20px] py-[15px] px-[95px] text-[14px] font-bold font-[#1E1E1E] w-full drop-shadow-lg bg-white"
            onMouseLeave={handleSecondaryNavItemLeave}
          >
            <ul className="flex gap-[30px]">
              {secondaryNavbarItems.map((navItem, index) => (
                <li
                  key={index}
                  onMouseEnter={() => {
                    handleSecondaryNavItemHover(index);
                    setActiveItemHover("");
                  }}
                >
                  <NavLink to={navItem.path} className="group" key={index}>
                    {navItem.subItems.length > 0 ? (
                      <div className="flex items-center gap-[5px] transition-all duration-200 hover:text-[#396131]">
                        {navItem.navItem}
                        <FontAwesomeIcon
                          icon={faAngleUp}
                          className={
                            activeDropdown === index
                              ? "rotate-180 transition-all duration-300"
                              : "transition-all duration-300"
                          }
                        />
                      </div>
                    ) : (
                      <span className="transition-all duration-200 hover:text-[#396131]">
                        {navItem.navItem}
                      </span>
                    )}
                    <div
                      className={`${
                        navItem.path == location || activeDropdown === index
                          ? "bg-[#1E1E1E] w-full"
                          : "bg-transparent w-0"
                      } h-[3px] rounded-full transition-all duration-300 ease-in-out`}
                    ></div>
                  </NavLink>

                  {/* Multi-Level Dropdown */}
                  {activeDropdown === index && navItem.subItems.length > 0 && (
                    <div className="absolute w-[100vw] left-0 bg-white text-black transition-all duration-300 ease-in-out z-40 mt-[16px] text-[0.9rem] opacity-100 translate-y-0 shadow-2xl">
                      <div className="flex">
                        {/* Left Sidebar for SubItems */}
                        <div className="flex flex-col bg-[#31542B] min-w-[280px] min-h-[300px]">
                          {navItem.subItems.map((subItem, subIndex) => (
                            <NavLink
                              to={subItem.path}
                              key={subIndex}
                              className="relative"
                              onMouseEnter={() => handleSubItemHover(subIndex)}
                            >
                              <button
                                onClick={() => {}}
                                className="w-full py-[15px] px-[20px] text-left leading-[1.4rem] capitalize font-bold text-white cursor-pointer hover:bg-[#396131] transition-all duration-200 hover:translate-x-2 border-l-4 border-transparent hover:border-white"
                              >
                                <div className="flex items-center justify-between">
                                  <span>{subItem.subItem}</span>
                                  {subItem.subsubItems.length > 0 && (
                                    <FontAwesomeIcon
                                      icon={faAngleRight}
                                      className="text-sm"
                                    />
                                  )}
                                </div>
                              </button>
                            </NavLink>
                          ))}
                        </div>

                        {/* Right Content Area */}
                        <div className="flex-1 p-[30px]">
                          {activeSubDropdown !== null &&
                            navItem.subItems[activeSubDropdown] && (
                              <div className="transition-all duration-300 ease-in-out">
                                <h3 className="text-[#31542B] font-bold text-lg mb-[20px] border-b-2 border-[#31542B] pb-2">
                                  {navItem.subItems[activeSubDropdown].subItem}
                                </h3>

                                {navItem.subItems[activeSubDropdown].subsubItems
                                  .length > 0 ? (
                                  <div className="grid grid-cols-2 gap-[20px]">
                                    {navItem.subItems[
                                      activeSubDropdown
                                    ].subsubItems.map(
                                      (subsubItem, subsubIndex) => (
                                        <NavLink
                                          key={subsubIndex}
                                          to={subsubItem.path}
                                          className="flex items-center gap-[15px] p-[15px] rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-[#31542B] group"
                                        >
                                          <div className="w-[12px] h-[12px] rounded-full bg-[#31542B] group-hover:bg-[#396131] transition-colors duration-200"></div>
                                          <div className="flex flex-col">
                                            <span className="font-semibold text-[#31542B] group-hover:text-[#396131] transition-colors duration-200">
                                              {subsubItem.subItem}
                                            </span>
                                            <div className="w-0 group-hover:w-full h-[2px] bg-[#396131] transition-all duration-300 ease-in-out"></div>
                                          </div>
                                        </NavLink>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <div className="text-gray-500 italic">
                                    Navigate to{" "}
                                    {
                                      navItem.subItems[activeSubDropdown]
                                        .subItem
                                    }{" "}
                                    for more information.
                                  </div>
                                )}
                              </div>
                            )}

                          {activeSubDropdown === null && (
                            <div className="text-center text-gray-400 mt-[50px]">
                              <p className="text-lg">
                                Hover over a category to see available options
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[133px]">{children}</div>

        {/* Footer remains the same */}
        <Footer />
      </div>
    </>
  );
}
