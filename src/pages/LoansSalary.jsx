import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons/faCommentsDollar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img1 from "/src/assets/loans/salary/1.png";
import img2 from "/src/assets/loans/salary/2.jpg";
import React from "react";
import {
  HandArrowDownIcon,
  IdentificationCardIcon,
} from "@phosphor-icons/react/dist/ssr";

export default function LoansSalary() {
  return (
    <>
      <main className="hidden lg:flex flex-col gap-[80px] pb-[50px]">
        <section
          id="main"
          data-scroll
          className="flex text-[#396131] bg-white drop-shadow-lg rounded-[8px] py-[80px] px-[80px] mx-[10px]"
        >
          <div className="flex flex-col gap-[20px] w-3/5">
            <span className="text-[4rem]/[4rem] font-bold">Loans / Salary</span>
            <span className="text-[1rem]/[2rem]">
              Need extra funds before payday? 1st Valley Bank’s Salary Loan
              offers fast, convenient, and affordable financing for employed
              individuals. Enjoy low interest rates, quick approval, and
              flexible payment terms. Whether it’s for bills, emergencies, or
              personal needs—get the support you need, right when you need it.
            </span>
          </div>
          <div className="flex justify-center w-2/5">
            <FontAwesomeIcon
              icon={faCommentsDollar}
              style={{ width: "50%", height: "auto" }}
            />
          </div>
        </section>
        <section id="description" className="px-[15px] text-white">
          <div className="flex px-[80px] py-[60px] gap-[80px] bg-[#396131] rounded-[8px] drop-shadow-lg">
            <div className="flex justify-center w-2/5">
              <img
                src={img1}
                alt=""
                className="object-cover rounded-[12px] w-[80%] h-auto"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-[50px] w-3/5">
              <div className="flex flex-col gap-[20px]">
                <span className="text-white font-bold text-[3rem]/[3rem]">
                  BARANGAY LOANS
                </span>
                <span className="text-white text-[0.8rem]/[2.4rem]">
                  This loan is granted to elected barangay officials such as the
                  chairman and kagawads and to appointed barangay staff such as
                  the treasurer and secretary.
                </span>
                <span className="text-white text-[0.8rem]/[2.4rem]">
                  Barangay officials with monthly honorarium of more than Phpl5K
                  may avail a loan amount of up to Php300K, while those with
                  monthly honorarium of less than Phpl5K may avail an amount of
                  up to Php25OK payable in 32 months. However, the figures are
                  variable as these are dependent on the conditions of the
                  election.
                </span>
              </div>
              <div className="flex flex-col gap-[20px]">
                <span className="text-white font-bold text-[3rem]/[3rem]">
                  LGU LOANS
                </span>
                <span className="text-white text-[0.8rem]/[2.4rem]">
                  Employees of local government units that have entered into a
                  memorandum agreement with 1VBDB may apply for our LGU salary
                  loan.
                </span>
                <span className="text-white text-[0.8rem]/[2.4rem]">
                  Qualified LGU employees may borrow up to Php700K for their
                  repeat loan, and up to Php450K for their initial loan. This is
                  payable within three (3) years, but the term may depend on
                  other factors such as age and status of employment, i.e.
                  permanent, casual, and if elected or co-terminus.
                </span>
                <span className="text-white text-[0.8rem]/[2.4rem]">
                  Payment is collected monthly and though payroll deduction.
                  This loan requires the borrowers to maintain a savings account
                  with the bank.
                </span>
              </div>
            </div>
          </div>
        </section>
        <section
          id="types"
          data-scroll
          className="flex flex-col gap-[30px] text-[#396131] px-[60px] mx-[10px]"
        >
          <div className="flex">
            <div className="flex flex-col gap-[20px] w-3/5">
              <span className="text-[4rem]/[4rem] font-bold">APDS LOANS</span>
              <span className="text-[1rem]/[2rem]">
                Automatic Payroll Deduction is the type of salary loan available
                to public school teachers with permanent appointment issued by
                the Department of Education (DepEd). Qualified teachers may
                borrow up to Php6O0K payable in three (3) years through monthly
                amortization. The amount representing the monthly amortization
                is deducted automatically from the payroll.
              </span>
            </div>
            <div className="flex justify-center w-2/5">
              <HandArrowDownIcon style={{ width: "50%", height: "auto" }} />
            </div>
          </div>
          <div className="flex">
            <div className="flex justify-center w-2/5">
              <IdentificationCardIcon
                style={{ width: "50%", height: "auto" }}
              />
            </div>
            <div className="flex flex-col gap-[20px] w-3/5">
              <span className="text-[4rem]/[4rem] font-bold">
                ATM + BONUS LOANS
              </span>
              <span className="text-[1rem]/[2rem]">
                ATM plus Bonus loans are bundled salary loans available to
                public school teachers with permanent appointment from DepEd. It
                is similar to automatic payroll deduction salary (APDS) loan;
                only, instead of the amortization being automatically deducted
                in the payroll, teachers have to leave their ATM card and PIN in
                the custody of 1VBDB.
              </span>
              <span className="text-[1rem]/[2rem]">
                Teachers who have availed the ATM loan may also borrow
                additional money through the Bonus Loan. Payment is charged
                against the Bonus compensation of the teachers and effected
                through their ATM. This is why teachers must have to qualify for
                the ATM loan first before they can be eligible for the Bonus
                loan.
              </span>
            </div>
          </div>
        </section>
        <section id="product-manager" className="px-[15px] text-white">
          <div className="flex px-[80px] py-[60px] bg-[#396131] rounded-[8px] drop-shadow-lg">
            <div className="flex justify-center w-2/5">
              <img
                src={img2}
                alt=""
                className="object-cover rounded-[12px] w-[80%] h-auto"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-[70px] w-3/5">
              <div className="flex flex-col gap-[20px]">
                <span className="text-[3rem]/[3rem] font-bold">
                  Salary Loans That Put a Smile on Your Face
                </span>
                <span className="text-[2rem]/[2rem] font-bold">
                  Juba! Y. Yu, Product Manager{" "}
                </span>
              </div>
              <div className="flex flex-col gap-[20px]">
                <span className="text-[1.5rem]/[1.5rem] font-bold">
                  More than 1.5B Increase in Just 3 Months!
                </span>
                <span className="text-[1rem]/[3rem]">
                  Salary loans beefed up 1VB's loan performance with a whopping
                  Php1.5B increase in barely three (3) months, a feat that has
                  never been done in the past ten (10) years.
                </span>
              </div>
              <span className="text-[1rem]/[3rem]">
                This loan provides Dep-Ed teachers and eligible personnel with
                the funds they need to augment their salaries. Dep-Ed loans are
                under the APDS (automatic payroll deduction scheme) to make it
                convenient for borrowers to pay their dues without having to
                leave their classrooms or offices.
              </span>
              <span className="text-[1rem]/[3rem]">
                Convenient and accessible, the LGU and Barangay Loans serve the
                financial needs of elected or appointed officials, as well as
                regular staff of local government units (LGUs) and barangays.
                Payments are made through automatic payroll deduction.
              </span>
              <div className="flex flex-col gap-[20px]">
                <span className="text-[1.5rem]/[1.5rem] font-bold">
                  ATM & Bonus Loans
                </span>
                <span className="text-[1rem]/[3rem]">
                  Through this loan product, regular employees of Dep-ed, local
                  government units and private institutions may borrow funds
                  from the bank. Repayment is chargeable against their automated
                  teller machine (ATM) payroll account.
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <main className="hidden sm:block lg:hidden">Tablet</main>
      <main className="block sm:hidden">Mobile</main>
    </>
  );
}
