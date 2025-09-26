import React from 'react';
import {
	faFileSignature,
	faFingerprint,
	faGem,
	faTruck,
	faUnlock
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import ConsumerProtectionPrivacyPolicy from './ConsumerProtectionPrivacyPolicy';

export default function ConsumerProtection() {
	return (
		<>
			<main className="flex flex-col gap-[40px] pb-[50px] lg:gap-[80px]">
				{/* <section
          id="main"
          data-scroll
          className="flex text-[#396131] bg-white drop-shadow-lg mx-[10px] rounded-[8px] py-[30px]"
        >
          <div className="flex flex-col gap-[20px] py-[80px] px-[60px] mx-[10px] w-3/5">
            <span className="text-[4rem]/[4rem] font-bold">
              Consumer Protection
            </span>
            <span className="text-[1rem]/[2rem]">
              At 1st Valley Bank, your trust is our priority. Our Consumer
              Protection program ensures your rights as a client are respected,
              your data is secure, and your concerns are heard. We’re committed
              to fair, transparent, and responsible banking—because protecting
              you is just as important as serving you. Let’s grow safely,
              together.
            </span>
          </div>
          <div className="flex items-center justify-center w-2/5">
            <FontAwesomeIcon
              icon={faUnlock}
              className="flex aspect-square"
              style={{ width: "60%", height: "auto" }}
            />
          </div>
        </section> */}
				{/* <section className="relative mx-4 mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 font-sans shadow-2xl shadow-emerald-900/10">
					<div className="relative px-8 py-16 sm:px-12 lg:px-16 lg:py-24">
						<div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:gap-16">
							<div className="flex-1 space-y-8 text-center lg:text-left">
								<div className="space-y-2">
									<h1 className="bg-gradient-to-r from-[#396131] via-[#FB3F3F] to-[#FDE900] bg-clip-text text-xl leading-tight font-black text-transparent sm:text-2xl lg:text-5xl">
										Consumer Protection
									</h1>
								</div>

								<p className="max-w-2xl text-lg leading-relaxed text-slate-700">
									At 1st Valley Bank, your trust is our priority. Our Consumer Protection program
									ensures your rights as a client are respected, your data is secure, and your
									concerns are heard. We’re committed to fair, transparent, and responsible
									banking—because protecting you is just as important as serving you. Let’s grow
									safely, together.
								</p>
							</div>

							<div className="flex-shrink-0 lg:w-2/5">
								<div className="group relative">
									<div className="group-hover:shadow-3xl flex transform items-center justify-center overflow-hidden rounded-3xl text-[#396131] transition-all duration-500 group-hover:-translate-y-2">
										<FontAwesomeIcon icon={faUnlock} className="text-[10rem] lg:text-[20rem]" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</section> */}
				<ConsumerProtectionPrivacyPolicy />
				{/* <section
					id="privacy-policy"
					data-scroll
					className="mx-[20px] flex flex-col gap-[30px] rounded-[8px] text-[#396131] lg:mx-[80px] lg:flex-row"
				>
					<div className="flex items-center justify-center lg:w-1/4">
						<FontAwesomeIcon
							icon={faFingerprint}
							className="flex aspect-square text-[10rem] lg:text-[20rem]"
						/>
					</div>
					<div className="flex flex-col gap-[15px] lg:w-3/4 lg:gap-[30px]">
						<div className="mx-[10px] flex flex-col gap-[20px] lg:py-[80px]">
							<span className="text-[1.5rem]/[1.5rem] font-bold lg:text-[3rem]/[3rem]">
								Privacy Policy
							</span>
							<span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
								Your privacy matters at 1st Valley Bank. Through our Consumer Protection & Privacy
								Policy, we safeguard your personal data with the highest standards of security,
								transparency, and integrity. From information collection to usage, we ensure you're
								informed and protected—because trust and privacy go hand in hand.
							</span>
						</div>
						<NavLink
							to="/consumer-protection/privacy-policy"
							className="flex h-[30px] w-full transform items-center justify-center rounded-[5px] bg-[#396131] text-center text-[0.8rem] font-bold text-white outline-0 outline-[#396131] transition-all duration-200 hover:bg-white hover:text-[#396131] hover:outline-1 lg:h-[60px] lg:rounded-[16px] lg:text-[1.5rem]"
						>
							<span>Learn More</span>
						</NavLink>
					</div>
				</section> */}
				{/* <section
					id="1vb-products"
					data-scroll
					className="mx-[10px] flex flex-col-reverse gap-[30px] rounded-[8px] bg-[#396131] p-[20px] text-white drop-shadow-lg lg:flex-row lg:px-[60px] lg:py-[90px]"
				>
					<div className="flex flex-col gap-[30px] lg:w-3/4">
						<div className="mx-[10px] flex flex-col gap-[20px] lg:py-[80px]">
							<span className="text-[1.5rem]/[1.5rem] font-bold lg:text-[3rem]/[3rem]">
								1VB Products
							</span>
							<span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
								At 1st Valley Bank, your protection starts with every product we offer. Our Consumer
								Protection: 1VB Products initiative ensures that each loan, deposit, and service is
								designed with fairness, transparency, and your best interest in mind. Know your
								rights, stay informed, and bank with confidence—because you deserve nothing less.
							</span>
						</div>
						<NavLink
							to="/consumer-protection/1vb-products"
							className="flex h-[30px] w-full transform items-center justify-center rounded-[5px] bg-white text-center text-[0.8rem] font-bold text-[#396131] outline-0 outline-white transition-all duration-200 hover:bg-[#396131] hover:text-white hover:outline-1 lg:h-[60px] lg:rounded-[16px] lg:text-[1.5rem]"
						>
							<span>Learn More</span>
						</NavLink>
					</div>
					<div className="flex items-center justify-center lg:w-1/4">
						<FontAwesomeIcon
							icon={faGem}
							className="flex aspect-square text-[10rem] lg:text-[20rem]"
						/>
					</div>
				</section>
				<section
					id="privacy-policy"
					data-scroll
					className="mx-[10px] flex flex-col gap-[20px] rounded-[8px] text-[#396131] lg:mx-[80px] lg:flex-row lg:gap-[30px]"
				>
					<div className="flex items-center justify-center lg:w-1/4">
						<FontAwesomeIcon
							icon={faFileSignature}
							className="flex aspect-square text-[10rem] lg:text-[20rem]"
						/>
					</div>
					<div className="flex flex-col gap-[10px] lg:w-3/4 lg:gap-[30px]">
						<div className="mx-[10px] flex flex-col gap-[20px] lg:py-[80px]">
							<span className="text-[1.5rem]/[1.5rem] font-bold lg:text-[3rem]/[3rem]">
								Product Requirements
							</span>
							<span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
								At 1st Valley Bank, we believe in clear, transparent banking. Our Consumer
								Protection: Product Requirements section ensures you're fully informed about what’s
								needed for each of our products, from loans to accounts. We’re here to make sure you
								know exactly what to expect, so you can make confident decisions. Bank smart, bank
								safe, bank with us!
							</span>
						</div>
						<NavLink
							to="/consumer-protection/product-requirements"
							className="flex h-[30px] w-full transform items-center justify-center rounded-[5px] bg-[#396131] text-center text-[0.8rem] font-bold text-white outline-0 outline-[#396131] transition-all duration-200 hover:bg-white hover:text-[#396131] hover:outline-1 lg:h-[60px] lg:rounded-[16px] lg:text-[1.5rem]"
						>
							<span>Learn More</span>
						</NavLink>
					</div>
				</section> */}
			</main>
			{/* <main className="hidden sm:block lg:hidden">Tablet</main>
      <main className="block sm:hidden">Mobile</main> */}
		</>
	);
}
