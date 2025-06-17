import React from "react";
import img1 from "/src/assets/consumer-protection/privacy-policy/1.jpg";
import img2 from "/src/assets/consumer-protection/privacy-policy/2.jpg";

import { Unlock } from "lucide-react";
import {
  faAsterisk,
  faBabyCarriage,
  faFileSignature,
  faFingerprint,
  faGem,
  faInfoCircle,
  faLaptopCode,
  faLock,
  faQrcode,
  faServer,
  faTruck,
  faUnlock,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function ConsumerProtectionPrivacyPolicy() {
  return (
    <>
      <main className="hidden lg:flex flex-col gap-[80px] pb-[50px]">
        <section
          id="main"
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
        <section
          id="application-privacy"
          data-scroll
          className="flex text-[#396131] rounded-[8px]"
        >
          <div className="flex items-center justify-center w-2/5">
            <FontAwesomeIcon
              icon={faLock}
              className="flex aspect-square"
              style={{ width: "60%", height: "auto" }}
            />
          </div>
          <div className="flex flex-col gap-[20px] py-[80px] px-[60px] w-3/5">
            <span className="text-[3rem]/[3rem] font-bold">
              Application Privacy Statement
            </span>
            <span className="text-[1rem]/[3rem]">
              This privacy statement (“Privacy Statement”) applies to the
              treatment of personally identifiable information submitted by, or
              otherwise obtained from, you in connection with the associated
              application (“Application”). The Application is provided by 1st
              Valley Bank, a Development Bank Inc. (1st Valley Bank) (and may be
              provided by 1st Valley Bank on behalf of a 1st Valley Bank
              licensor or partner (“Application Partner”). By using or otherwise
              accessing the Application, you acknowledge that you accept the
              practices and policies outlined in this Privacy Statement.
            </span>
          </div>
        </section>
        <section id="user-data" className="text-white">
          <div className="flex gap-[80px] bg-[#396131] p-[70px] mx-[20px] rounded-[8px] drop-shadow-lg">
            <div className="flex flex-col gap-[30px] w-3/5">
              <span className="text-[4rem]/[4rem] font-bold">User Data</span>
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[20px]">
                  <span className="text-[2rem]/[2rem] font-bold">
                    Personal Information
                  </span>
                  <span className="text-[2rem]/[2rem] font-bold">
                    You Provide to Us
                  </span>
                  <span className="text-[1rem]/[3rem]">
                    We may receive and store any information you submit to the
                    Application (or otherwise authorize us to obtain – such as,
                    from (for example) your Facebook account). The types of
                    personal information collected may include your full name,
                    email address, gender, IP address, browser information,
                    username, demographic information, and any other information
                    necessary for us to provide the Application services.
                  </span>
                </div>
                <div className="flex flex-col gap-[20px]">
                  <span className="text-[2rem]/[2rem] font-bold">
                    Personal Information
                  </span>
                  <span className="text-[2rem]/[2rem] font-bold">
                    Collected Automatically
                  </span>
                  <span className="text-[1rem]/[3rem]">
                    We receive and store certain types of usage related
                    information whenever you interact with Application. For
                    example, 1st Valley Bank may automatically receive and
                    record information regarding your computer’s IP address,
                    browser information, Facebook user ID, Facebook Page fan
                    status, and URLs accessed. Such information may be shared in
                    aggregate (non-personally identifiable) form with our
                    partners.
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-2/5">
              <img
                src={img1}
                alt=""
                className="object-cover w-[291px] h-[726px] rounded-[16px]"
              />
            </div>
          </div>
        </section>
        <section id="it-collection">
          <div className="flex gap-[35px] text-[#396131] mx-[80px]">
            <div className="flex justify-center w-2/5">
              <img
                src={img2}
                alt=""
                className="object-cover w-[291px] h-[726px] rounded-[16px]"
              />
            </div>
            <div className="flex flex-col gap-[30px] w-3/5">
              <div className="flex flex-col gap-[20px]">
                <span className="text-[3rem]/[4rem] font-bold">
                  How Does 1st Valley Bank Use The Information IT Collects?
                </span>
                <span className="text-[2rem]/[4rem] font-semibold">
                  1st Valley Bank Uses The Information Described In This Privacy
                  Statement
                </span>
              </div>
              <div className="flex flex-col gap-[20px]">
                {[
                  "Internally, to analyze, develop and improve its products and services",
                  "To contact you regarding an offer of services",
                  "As set forth below in the “Will 1st Valley Bank Share any of the personal information it Collects” section below",
                ].map((statement, index) => (
                  <div key={index} className="flex items-center gap-[20px]">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="flex aspect-square"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <span className="text-[1rem]/[1rem]">{statement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id="partner-treatment"
          data-scroll
          className="text-white rounded-[8px] mx-[10px]"
        >
          <div className="flex bg-[#396131] p-[80px] gap-[80px] rounded-[8px]">
            <div className="flex flex-col gap-[30px] py-[80px] px-[60px] w-3/5">
              <span className="text-[3rem]/[5rem] font-bold">
                Application Partner Treatment Of Personal Information
              </span>
              <span className="text-[1rem]/[3rem]">
                1st Valley Bank may provide personal information to the
                applicable Application Partner. The Application Partner’s use of
                your personal information is subject to the Application
                Partner’s separate privacy policy – and not this Privacy
                Statement. The Application Partner’s privacy policy is linked to
                from within the Partner’s Facebook application
              </span>
            </div>
            <div className="flex items-center justify-center w-2/5">
              <FontAwesomeIcon
                icon={faQrcode}
                className="flex aspect-square"
                style={{ width: "60%", height: "auto" }}
              />
            </div>
          </div>
        </section>
        <section id="it-sharing">
          <div className="flex gap-[30px] mx-[20px] text-[#396131]">
            <div className="w-2/5">
              {" "}
              <img src={img2} alt="" className="h-[1377px] rounded-[16px]" />
            </div>
            <div className="flex flex-col gap-[40px] w-3/5">
              <div className="flex flex-col gap-[20px]">
                <span className="text-[3rem]/[4rem] font-bold">
                  Will 1st Valley Bank Share Any Of The Personal Information IT
                  Receives?
                </span>
                <span className="text-[1rem]/[3rem] ">
                  Personal information about our users is an integral part of
                  our business. We neither rent nor sell your personal
                  information to anyone (with the exception of sharing your
                  information with an applicable Application Partner – see the
                  “Application Partner Treatment” section above). We share your
                  personal information only as described below.
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-[20px] gap-y-[50px]">
                {[
                  [
                    "Protection of 1st Valley Bank and Others",
                    "We may release personal information when we believe in good faith that release is necessary to comply with the law; enforce or apply our conditions of use and other agreements; or protect the rights, property, or safety of 1st Valley Bank, our employees, our users, or others. This includes exchanging information with other companies and organizations for fraud protection and credit risk reduction",
                  ],
                  [
                    "Business Transfers",
                    "In some cases, we may choose to buy or sell assets. In these types of transactions, customer information is typically one of the business assets that are transferred. Moreover, if 1st Valley Bank, or substantially all of its assets were acquired, or in the unlikely event that 1st Valley Bank goes out of business or enters bankruptcy, user information would be one of the assets that is transferred or acquired by a third party. You acknowledge that such transfers may occur, and that any acquirer of 1st Valley Bank may continue to use your personal information as set forth in this policy",
                  ],
                  [
                    "Agents",
                    "We employ other companies and people to perform tasks on our behalf and need to share your information with them to provide products or services to you. Unless we tell you differently, 1st Valley Bank’s agents do not have any right to use personal information we share with them beyond what is necessary to assist us. You hereby consent to our sharing of personal information for the above purposes",
                  ],
                  [
                    "With Your Consent",
                    "Except as set forth above, you will be notified when your personal information may be shared with third parties, and will be able to prevent the sharing of this information",
                  ],
                ].map((statement, index) => (
                  <div className="flex flex-col gap-[20px]" key={index}>
                    <div className="flex gap-[20px]">
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="flex aspect-square"
                        style={{ width: "35px", height: "35px" }}
                      />
                      <span className="text-[1.5rem]/[2rem] font-bold">
                        {statement[0]}
                      </span>
                    </div>
                    <span className="text-[1rem]/[3rem]">{statement[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id="conditions-of-use"
          data-scroll
          className="text-white rounded-[8px] mx-[10px]"
        >
          <div className="flex bg-[#396131] p-[80px] gap-[50px] rounded-[8px]">
            <div className="flex flex-col gap-[30px] py-[80px] px-[60px] w-3/5">
              <span className="text-[3rem]/[5rem] font-bold">
                Conditions Of Use
              </span>
              <span className="text-[1rem]/[3rem]">
                If you decide to use or otherwise access the Application, your
                use/access and any possible dispute over privacy is subject to
                this Privacy Statement and our Terms of Use, including
                limitations on damages, arbitration of disputes, and application
                of California state law
              </span>
            </div>
            <div className="flex items-center justify-center w-2/5">
              <FontAwesomeIcon
                icon={faAsterisk}
                className="flex aspect-square"
                style={{ width: "60%", height: "auto" }}
              />
            </div>
          </div>
        </section>
        <section
          id="third-party-applications"
          data-scroll
          className="flex text-[#396131] rounded-[8px]"
        >
          <div className="flex items-center justify-center w-2/5">
            <FontAwesomeIcon
              icon={faLaptopCode}
              className="flex aspect-square"
              style={{ width: "60%", height: "auto" }}
            />
          </div>
          <div className="flex flex-col gap-[20px] py-[80px] px-[60px] w-3/5">
            <span className="text-[3rem]/[3rem] font-bold">
              Third Party Application/Websites
            </span>
            <span className="text-[1rem]/[3rem]">
              The Application may permit you to link to other applications or
              websites. Such third party applications/websites are not under 1st
              Valley Bank’s control, and such links do not constitute an
              endorsement by 1st Valley Bank of those other
              applications/websites or the services offered through them. The
              privacy and security practices of such third party
              application/websites linked to the Application are not covered by
              this Privacy Statement, and 1st Valley Bank is not responsible for
              the privacy or security practices or the content of such websites
            </span>
          </div>
        </section>
        <section
          id="conditions-of-use"
          data-scroll
          className="text-white rounded-[8px] mx-[10px]"
        >
          <div className="flex bg-[#396131] p-[80px] gap-[50px] rounded-[8px]">
            <div className="flex flex-col items-start gap-[30px] w-1/2">
              <div className="flex flex-col gap-[30px]">
                <span className="text-[3rem]/[5rem] font-bold">
                  What Personal Information Can I Access?
                </span>
                <span className="text-[1rem]/[3rem]">
                  1st Valley Bank allows you to access the following information
                  about you for the purpose of viewing, and in certain
                  situations, updating that information. This list may change in
                  the event the Application changes
                </span>
              </div>
              <div className="flex flex-col gap-[20px]">
                {[
                  "Account and user profile information",
                  "User e-mail address, if applicable",
                  "Facebook profile information, if applicable",
                  "User preferences",
                  "Application specific data",
                ].map((statement, index) => (
                  <div className="flex items-center font-semibold gap-[20px]">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="flex aspect-square"
                      style={{ width: "30px", height: "30px" }}
                    />
                    <span className="text-[1rem]/[1rem]">{statement}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center w-1/2">
              <FontAwesomeIcon
                icon={faServer}
                className="flex aspect-square"
                style={{ width: "70%", height: "auto" }}
              />
            </div>
          </div>
        </section>
        <section
          id="children-use"
          data-scroll
          className="flex text-[#396131] rounded-[8px]"
        >
          <div className="flex items-center justify-center w-2/5">
            <FontAwesomeIcon
              icon={faBabyCarriage}
              className="flex aspect-square"
              style={{ width: "50%", height: "auto" }}
            />
          </div>
          <div className="flex flex-col gap-[20px] py-[80px] px-[60px] w-3/5">
            <span className="text-[3rem]/[3rem] font-bold">
              Can Children Use The Application?
            </span>
            <span className="text-[1rem]/[3rem]">
              Our site and the services available through 1st Valley Bank are
              not intended for children under the age of 13. 1st Valley Bank
              does not knowingly or specifically collect information about
              children under the age of 13 and believes that children of any age
              should get their parents’ consent before giving out any personal
              information. We encourage you to participate in your child’s web
              experience.
            </span>
          </div>
        </section>
        <section
          id="privacy-changes-statement"
          data-scroll
          className="text-white rounded-[8px] mx-[10px]"
        >
          <div className="flex bg-[#396131] p-[80px] gap-[50px] rounded-[8px]">
            <div className="flex flex-col gap-[30px] w-3/5">
              <span className="text-[3rem]/[5rem] font-bold">
                Changes To This Privacy Statement
              </span>
              <span className="text-[1rem]/[3rem]">
                1st Valley Bank may amend this Privacy Statement from time to
                time. Use of information we collect now is subject to the
                Privacy Statement in effect at the time such information is
                used. If we make changes in the way we use personal information,
                we will notify you by posting an announcement on our Site or
                sending you an email. Users are bound by any changes to the
                Privacy Statement when he or she uses or otherwise accesses the
                Application after such changes have been first posted.
              </span>
            </div>
            <div className="flex items-center justify-center w-2/5">
              <FontAwesomeIcon
                icon={faUpload}
                className="flex aspect-square"
                style={{ width: "50%", height: "auto" }}
              />
            </div>
          </div>
        </section>
      </main>
      <main className="hidden sm:block lg:hidden">Tablet</main>
      <main className="block sm:hidden">Mobile</main>
    </>
  );
}
