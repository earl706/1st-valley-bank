// import React from "react";
// import { NavLink } from "react-router-dom";

// import gcash from "/src/assets/gcash-logo-png_seeklogo-522261-removebg-preview.png";
// import bsp from "/src/assets/image-removebg-preview (1).png";
// import ctb from "/src/assets/image-removebg-preview (2).png";
// import pdic from "/src/assets/image-removebg-preview.png";
// import usaid from "/src/assets/Seal_of_the_United_States_Agency_for_International_Development.svg.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFacebook,
//   faGoogle,
//   faLinkedin,
//   faSkype,
//   faYoutube,
// } from "@fortawesome/free-brands-svg-icons";
// import {
//   faEnvelopeCircleCheck,
//   faPhone,
// } from "@fortawesome/free-solid-svg-icons";

// export default function Footer() {
//   const footerNavigationItems = [
//     { navItem: "Home", link: "/" },
//     { navItem: "Deposits", link: "/deposits" },
//     { navItem: "About Us", link: "/about-us" },
//     { navItem: "Loans", link: "/loans" },
//     { navItem: "Properties for Sale", link: "/properties-for-sale" },
//     { navItem: "1VB Advisory", link: "/1vb-advisory" },
//     { navItem: "Consumer Protection", link: "/consumer-protection" },
//     { navItem: "Newsletter", link: "/newsletter" },
//   ];

//   const footerAgenciesNavigationItems = [
//     { image: usaid, link: "" },
//     { image: ctb, link: "" },
//     { image: gcash, link: "" },
//     { image: pdic, link: "" },
//   ];

//   const footerSocMedLinks = [
//     { link: "", icon: faFacebook },
//     { link: "", icon: faSkype },
//     { link: "", icon: faGoogle },
//     { link: "", icon: faLinkedin },
//     { link: "", icon: faYoutube },
//   ];

//   return (
//     <>
//       <footer className="flex flex-col w-full bg-[#21441B] px-[20px] py-[10px] gap-[20px]">
//         <div className="flex gap-[40px] items-center w-full px-[50px] pt-[30px] h">
//           <div className="w-1/4">
//             <img
//               src={logo}
//               alt=""
//               className="h-[172px] w-[172px] transition-transform duration-200 hover:scale-105"
//             />
//           </div>
//           <div className="flex flex-col items-stretch w-1/4 h-full">
//             <div className="flex items-center gap-[10px] h-1/2">
//               <img src={bsp} alt="" className="w-[50px] h-[50px]" />
//               <span className="text-[0.6rem]/[1.2rem] text-white text-center">
//                 1st Valley Bank, Inc., A Development Bank is regulated by the
//                 Bangko Sentral ng Pilipinas (www.bsp.gov.ph). Deposits are
//                 insured by PDIC up to P1 million per depositor.
//               </span>
//             </div>
//             <div className="flex items-end justify-between text-white text-[12px] font-thin w-full h-1/2">
//               {footerAgenciesNavigationItems.map((navItem, index) => (
//                 <NavLink
//                   to={navItem.link}
//                   className="hover:font-semibold transition-all duration-200"
//                 >
//                   <img
//                     src={navItem.image}
//                     alt=""
//                     className="w-[50px] h-[50px] transition-transform duration-200 hover:scale-110"
//                   />
//                 </NavLink>
//               ))}
//             </div>
//           </div>
//           <div className="flex flex-col mr-[100px] w-1/4">
//             <div className="font-bold text-white text-[16px] mb-[20px]">
//               Links
//             </div>
//             <ul className="grid grid-cols-2 gap-[20px] text-white text-[12px] font-thin">
//               {footerNavigationItems.map((navItem, index) => (
//                 <li key={index} className="">
//                   <NavLink
//                     to={navItem.link}
//                     className="hover:font-semibold transition-all duration-200 mr-[30px] hover:text-gray-300"
//                   >
//                     <span>{navItem.navItem}</span>
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="flex flex-col gap-[20px] w-1/4">
//             <span className="font-bold text-white">Contact Us</span>
//             <div className="flex gap-[15px] items-center text-[14px] transition-all duration-200 hover:text-gray-300">
//               <div className="flex items-center justify-center w-[30px] h-[30px] text-gray-300">
//                 <FontAwesomeIcon icon={faPhone} className="w-full h-full" />
//               </div>
//               <span className="text-white">+63917 820 8542</span>
//             </div>
//             <div className="flex gap-[15px] items-center text-[14px] mb-[20px]">
//               <div className="flex items-center justify-center w-[30px] h-[30px] text-gray-300">
//                 <FontAwesomeIcon
//                   icon={faEnvelopeCircleCheck}
//                   className="w-full h-full"
//                 />
//               </div>
//               <input
//                 type="text"
//                 className="text-white bg-transparent border-b-[1px] border-white focus:outline-0 focus:border-gray-300 py-[3px] transition-all duration-200"
//                 placeholder="Email"
//               />
//             </div>
//             <div className="flex items-center gap-[25px]">
//               {footerSocMedLinks.map((navItem, index) => (
//                 <div
//                   key={index}
//                   className="flex item-center justify-center w-[50px] h-[50px] text-gray-300 hover:text-gray-400 transition-all duration-200 cursor-pointer transform hover:scale-110"
//                 >
//                   <FontAwesomeIcon
//                     icon={navItem.icon}
//                     className="w-full h-full"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="font-bold text-center w-full text-white py-[20px] text-[16px]">
//           Copyright © 2025 - 1st Valley Bank Inc. - All rights reserved
//         </div>
//       </footer>
//     </>
//   );
// }

import React, { useState } from "react";
import logo from "/src/assets/1vb logo_2x2.png";
import { NavLink } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ExternalLink,
  ChevronUp,
  Shield,
  Building2,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Mock data - replace with your actual data
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

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const handleEmailSubmit = () => {
    if (email && email.includes("@")) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#31542B] text-white">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300 hover:scale-110 z-20 drop-shadow-lg"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info & Logo */}
          <div className="space-y-6">
            <div className="group cursor-pointer">
              <img
                src={logo}
                className="w-32 h-32 bg-white/10 p-2 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-opacity-20 group-hover:scale-105"
              />
              <h3 className="text-xl font-bold mb-3">1st Valley Bank</h3>
            </div>

            <p className="text-sm text-gray-200 leading-relaxed">
              Your trusted partner in financial growth and prosperity. Building
              stronger communities through innovative banking solutions.
            </p>

            {/* Regulatory Info */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/20">
              <div className="flex items-start gap-3 mb-2">
                <Shield className="w-4 h-4 text-green-300 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-200 leading-relaxed">
                  Regulated by Bangko Sentral ng Pilipinas (BSP)
                </p>
              </div>
              <p className="text-xs text-gray-200">
                Deposits insured by PDIC up to ₱1 million per depositor
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {footerNavigationItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.link}
                    className="group flex items-center text-sm text-gray-200 hover:text-white transition-all duration-200"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {item.navItem}
                    </span>
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Contact Us</h3>

            <div className="space-y-4">
              {/* Phone */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-green-600/30 rounded-lg flex items-center justify-center group-hover:bg-green-600/50 transition-colors duration-200">
                  <Phone className="w-4 h-4 text-green-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-300">Phone</p>
                  <a
                    href="tel:+639178208542"
                    className="text-sm font-medium hover:text-green-300 transition-colors duration-200"
                  >
                    +63 917 820 8542
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-blue-600/30 rounded-lg flex items-center justify-center group-hover:bg-blue-600/50 transition-colors duration-200">
                  <Mail className="w-4 h-4 text-blue-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-300">Email</p>
                  <a
                    href="mailto:info@1stvalleybank.com"
                    className="text-sm font-medium hover:text-blue-300 transition-colors duration-200"
                  >
                    info@1stvalleybank.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-purple-600/30 rounded-lg flex items-center justify-center group-hover:bg-purple-600/50 transition-colors duration-200">
                  <MapPin className="w-4 h-4 text-purple-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-300">Address</p>
                  <p className="text-sm font-medium">Cagayan de Oro City</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Stay Connected</h3>

            {/* Newsletter */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/20">
              <h4 className="font-semibold mb-2 text-sm">Newsletter</h4>
              <p className="text-xs text-gray-200 mb-4">
                Get updates and financial tips
              </p>

              <div className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-sm placeholder-gray-300 text-white focus:outline-none focus:border-green-400 focus:bg-opacity-20 transition-all duration-200"
                />
                <button
                  onClick={handleEmailSubmit}
                  disabled={isSubscribed}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-green-500 disabled:to-green-600 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 disabled:scale-100"
                >
                  {isSubscribed ? "Subscribed!" : "Subscribe"}
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-4 text-sm">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-white/10 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    >
                      <IconComponent className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Agencies & Links */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium">Regulated by:</span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold">BSP</span>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold">PDIC</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-300">
              <NavLink
                to="/consumer-protection/privacy-policy"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </NavLink>
              <span>•</span>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Terms
              </a>
              <span>•</span>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-white/20">
          <p className="text-sm text-gray-300">
            Copyright © 2025 1st Valley Bank Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
