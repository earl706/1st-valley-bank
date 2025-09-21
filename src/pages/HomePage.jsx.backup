import React from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEnvelopesBulk,
	faUser,
	faQuoteRight,
	faHandshake
} from '@fortawesome/free-solid-svg-icons';

import img1 from '/src/assets/homepage/1.png';
import img2 from '/src/assets/homepage/2.png';
import img3 from '/src/assets/homepage/3.png';
import img4 from '/src/assets/homepage/4.png';
import img5 from '/src/assets/homepage/5.png';
import img6 from '/src/assets/homepage/6.png';

import logo from '/src/assets/logo.png';
import gcash from '/src/assets/gcash-logo-png_seeklogo-522261-removebg-preview.png';
import bsp from '/src/assets/image-removebg-preview (1).png';
import ctb from '/src/assets/image-removebg-preview (2).png';
import pdic from '/src/assets/image-removebg-preview.png';
import usaid from '/src/assets/Seal_of_the_United_States_Agency_for_International_Development.svg.png';
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons/faBuildingColumns';

export default function HomePage() {
	const sampleCards = [
		{
			id: 1,
			title: 'Forest Restoration',
			body: 'Regenerating native forests with community-led planting and monitoring.',
			img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60',
			imgAlt: 'Close-up of green forest canopy'
		},
		{
			id: 2,
			title: 'Clean Energy',
			body: 'Deploying solar microgrids and teaching local technicians to maintain them.',
			img: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=60',
			imgAlt: 'Solar panels on a rooftop'
		},
		{
			id: 3,
			title: 'Coastal Protection',
			body: 'Designing nature-based solutions to reduce erosion and improve habitats.',
			img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60',
			imgAlt: 'Waves washing a sandy shore'
		}
	];

	const products = [
		{
			image: img1,
			header: 'Deposits',
			description: 'Save securely, grow steadily. ',
			path: '/deposits'
		},
		{
			image: img2,
			header: 'Loans',
			description: 'Loans for business, farm, or home.',
			path: '/loans'
		},
		{
			image: img3,
			header: 'Properties for Sale',
			description: 'Prime properties at great prices.',
			path: '/properties-for-sale'
		}
	];

	const testimonials = [
		{
			image: logo,
			name: 'Mrs. Virginia Cameros Tobiano',
			testimony:
				'Dako jud kaayo natabang ang 1st Valley Bank samoa kay tungod sa ila pagpautang samoa nakabakod mi balik. (1st Valley Bank helped us a lot that we were able to rise again.),'
		},
		{
			image: logo,
			name: 'Mrs. Virginia Cameros Tobiano',
			testimony:
				'Dako jud kaayo natabang ang 1st Valley Bank samoa kay tungod sa ila pagpautang samoa nakabakod mi balik. (1st Valley Bank helped us a lot that we were able to rise again.),'
		},
		{
			image: logo,
			name: 'Mrs. Virginia Cameros Tobiano',
			testimony:
				'Dako jud kaayo natabang ang 1st Valley Bank samoa kay tungod sa ila pagpautang samoa nakabakod mi balik. (1st Valley Bank helped us a lot that we were able to rise again.),'
		}
	];

	const features = [
		{
			image: img4,
			header: 'BUSINESS CONDUCT',
			description:
				'We conduct our business with integrity, transparency, honesty, and highest ethical standards.'
		},
		{
			image: img5,
			header: 'CLIENT TREATMENT',
			description:
				'Treating our clients with equality, fairness, and respect is foremost in our delivery of excellent banking services.'
		},
		{
			image: img6,
			header: 'BUSINESS DEVELOPMENT',
			description:
				'We develop our business through innovation, enthusiasm, creativity, and our constant quest for excellence'
		}
	];

	return (
		<>
			<main className="flex flex-col gap-[120px] pb-[50px]">
				{/* <section
          id="main"
          className="px-[50px] py-[65px] mx-[15px] drop-shadow-lg rounded-sm bg-white mb-[25px] font-poppins"
        >
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
        </section> */}
				<section className="relative mx-4 mb-8 overflow-hidden rounded-3xl font-sans shadow-2xl shadow-emerald-900/10">
					{/* Background decoration */}
					<div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-transparent"></div>
					<div className="absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 transform rounded-full bg-emerald-100/30 blur-3xl"></div>
					<div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 transform rounded-full bg-emerald-200/20 blur-2xl"></div>

					<div className="relative w-full px-8 py-16 sm:px-12 lg:px-16 lg:py-24">
						<div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
							{/* Content Section */}
							<div className="flex-1 space-y-8 text-center lg:text-left">
								{/* CTA Badge */}
								<div className="inline-flex">
									<NavLink
										to={'/about-us'}
										className="group relative transform cursor-pointer overflow-hidden rounded-full bg-[#396131] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-emerald-700 hover:to-emerald-800 hover:shadow-xl"
									>
										<span className="relative z-10">Read More</span>
										<div className="absolute inset-0 origin-left scale-x-0 bg-white/20 transition-transform duration-300 group-hover:scale-x-100"></div>
									</NavLink>
								</div>

								{/* Main Heading */}
								<div className="space-y-2">
									<h1 className="bg-gradient-to-r from-[#396131] via-[#FB3F3F] to-[#FDE900] bg-clip-text text-5xl leading-tight font-black text-transparent sm:text-6xl lg:text-7xl">
										Your Satisfaction
									</h1>
									<h1 className="bg-gradient-to-r from-[#396131] via-[#FB3F3F] to-[#FDE900] bg-clip-text text-5xl leading-tight font-black text-transparent sm:text-6xl lg:text-7xl">
										is Our Mission
									</h1>
								</div>

								{/* Description */}
								<p className="max-w-2xl text-lg leading-relaxed text-slate-700">
									1st Valley Bank is committed to provide you with innovative and responsive
									solutions to your banking needs and requirements. From a multi-awarded rural bank
									to a development bank in Mindanao and Visayas, our 82 branches and branch lite
									units shall deliver you only the best services that you truly deserve. We will
									work with you all the way. As your success is our business, you can count on us to
									be your lifetime friend
								</p>

								{/* Action Buttons */}
								<div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
									<NavLink
										to={'/consumer-protection/1vb-products'}
										className="group relative transform cursor-pointer overflow-hidden rounded-2xl bg-[#396131] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-emerald-700 hover:to-emerald-800 hover:shadow-xl"
									>
										<span className="relative z-10 flex items-center justify-center gap-2">
											Our Services
											<svg
												className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</span>
										<div className="absolute inset-0 origin-left scale-x-0 bg-white/10 transition-transform duration-300 group-hover:scale-x-100"></div>
									</NavLink>

									<NavLink
										to={'/about-us'}
										className="group transform cursor-pointer rounded-2xl border-2 border-[#396131] bg-white/80 px-8 py-4 font-semibold text-[#396131] shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#396131]/50 hover:bg-white hover:shadow-xl"
									>
										<span className="flex items-center justify-center gap-2">
											About Us
											<svg
												className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</span>
									</NavLink>
								</div>
							</div>

							{/* Image Section */}
							<div className="flex-shrink-0 lg:w-2/5">
								<div className="group relative">
									{/* Main image container */}
									<div className="group-hover:shadow-3xl relative transform overflow-hidden rounded-3xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105">
										<img
											src={logo}
											alt="1st Valley Bank Logo"
											className="aspect-square h-full w-full object-cover transition-transform duration-700"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="flex flex-col gap-[30px] px-[50px] text-[#396131]">
					<p className="text-center text-[1.5rem] font-bold lg:text-[3rem]">
						Your Lifetime Friend in Banking
					</p>
					{/* <div className="lg:gap-y-none grid grid-cols-1 gap-y-[50px] lg:grid-cols-3 lg:gap-x-[80px]">
						{products.map((product, index) => (
							<div className="flex flex-col items-center gap-[17px] text-center">
								<div className="relative h-[200px] w-[200px] rounded-full bg-[url('./src/assets/logo.png')] bg-cover bg-center drop-shadow-lg">
									<img
										src={product.image}
										alt=""
										className="h-full w-full rounded-full object-cover"
									/>
								</div>
								<p className="text-[1.5rem]/[3rem] font-bold lg:text-[2rem]/[3rem]">
									{product.header}
								</p>
								<p className="text-[0.8rem]/[2.4rem] lg:text-[1.5rem]/[2.25rem]">
									{product.description}
								</p>
								<NavLink
									to={product.path}
									className="tranform w-full rounded-[10px] bg-[#396131] py-[8px] text-center text-[0.8rem] font-bold text-white outline-0 outline-[#396131] drop-shadow-lg transition-all duration-200 hover:bg-white hover:text-[#396131] hover:outline-1"
								>
									Read More
								</NavLink>
							</div>
						))}
					</div> */}

					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{products.map((card, index) => (
							<article
								key={card.image}
								className="group transform overflow-hidden rounded-2xl bg-white shadow-lg transition will-change-transform hover:-translate-y-1 hover:scale-[1.02]"
								role="article"
								aria-labelledby={`card-title-${index}`}
							>
								<div className="relative flex h-[200px] w-full items-center justify-center rounded-full bg-[url('./src/assets/logo.png')] bg-cover bg-center drop-shadow-lg">
									<img
										src={card.image}
										alt={card.header}
										className="h-full w-full object-contain"
										loading="lazy"
									/>
								</div>

								<div className="p-5 sm:p-6">
									<h3
										id={`card-title-${index}`}
										className="text-lg font-semibold text-[#31542B] sm:text-xl"
									>
										{card.header}
									</h3>

									<p className="mt-2 text-sm text-gray-700 sm:text-base">{card.description}</p>

									<div className="mt-4 flex items-center justify-between">
										<NavLink
											to={card.path}
											className="tranform w-full rounded-[10px] bg-[#396131] py-[8px] text-center text-[0.8rem] font-bold text-white outline-0 outline-[#396131] drop-shadow-lg transition-all duration-200 hover:bg-white hover:text-[#396131] hover:outline-1"
										>
											Read More
										</NavLink>
									</div>
								</div>
							</article>
						))}
					</div>
				</section>

				<section className="flex flex-col gap-[50px] px-[80px] pt-[30px] text-[#396131]">
					<p className="text-center text-[1.5rem]/[3rem] font-bold lg:text-[3rem]">
						The 1st Valley Bank Difference
					</p>
					<div className="grid grid-cols-1 gap-y-[50px] lg:grid-cols-3 lg:gap-x-[50px] lg:gap-y-[50px]">
						{features.map((feature, index) => (
							<div className="flex flex-col items-center gap-[17px] text-center">
								<div className="relative h-[200px] w-[200px] rounded-full bg-[url('./src/assets/logo.png')] bg-cover bg-center drop-shadow-lg">
									<img
										src={feature.image}
										alt=""
										className="h-full w-full rounded-full object-cover"
									/>
								</div>
								<p className="text-[1.5em]/[3rem] font-bold lg:text-[2rem]/[3rem]">
									{feature.header}
								</p>
								<p className="text-[0.8rem]/[2.4rem] lg:text-[1.5rem]/[2.25rem]">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</section>
				<section className="px-[15px]">
					<div className="flex flex-col-reverse items-center justify-center gap-[20px] rounded-[8px] bg-[#396131] px-[30px] py-[40px] drop-shadow-lg lg:flex-row lg:gap-[80px] lg:px-[80px] lg:py-[60px]">
						<div className="flex flex-col items-start gap-[20px] lg:w-3/5">
							<NavLink
								to="/newsletter"
								className="flex w-full transform items-center justify-center rounded-[5px] bg-white py-[10px] text-center text-[1rem] font-bold text-[#396131] outline-0 outline-white transition-all duration-200 hover:bg-[#396131] hover:text-white hover:outline-1 lg:w-[200px]"
							>
								Read More
							</NavLink>
							<span className="text-[2rem] font-bold text-white lg:text-[4rem]">Newsletter</span>
							<span className="text-[1rem]/[2rem] font-bold text-white lg:text-[1.5rem]/[2.25rem]">
								Stay Connected with 1st Valley Bank!
							</span>
							<span className="text-[0.8rem]/[1.6rem] font-medium text-white lg:text-[1rem]/[2rem]">
								Welcome to your monthly source of financial tips, community updates, new services,
								and exclusive offers. Whether you're planning, saving, or growing, we’re here to
								guide your journey every step of the way. Let’s build a brighter financial
								future—together!
							</span>
						</div>
						<div className="lg:w-2/5">
							<FontAwesomeIcon
								icon={faEnvelopesBulk}
								className="aspect-square text-white"
								style={{ width: '100%', height: 'auto' }}
							/>
						</div>
					</div>
				</section>
				<section className="flex flex-col gap-[60px] px-[15px]">
					<p className="text-center text-[1.5rem] font-bold text-[#396131] lg:text-[3rem]">
						Trusted by the Community
					</p>
					<div className="grid grid-cols-1 gap-x-[20px] gap-y-[30px] lg:grid-cols-3">
						{testimonials.map((testimony, index) => (
							<div
								className="flex flex-col items-center justify-start gap-[20px] rounded-[10px] bg-white p-[30px] drop-shadow-lg"
								key={index}
							>
								<div className="flex w-full items-center gap-[20px]">
									<div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white text-[#396131] drop-shadow-lg">
										<img src={testimony.image} alt="" className="rounded-full object-center" />
									</div>
									<span className="flex w-1/3 text-[0.8rem]/[1.6rem] font-bold text-[#396131]">
										{testimony.name}
									</span>
									<div className="flex w-1/3 items-center justify-center text-[#396131]">
										<FontAwesomeIcon
											icon={faQuoteRight}
											style={{ width: '70px', height: '50px' }}
										/>
									</div>
								</div>
								<span className="text-[0.8rem]/[1.6rem]">{testimony.testimony}</span>
							</div>
						))}
					</div>
				</section>
				<section className="px-[5px] lg:px-[15px]">
					<div className="flex flex-col-reverse gap-[30px] rounded-[8px] bg-[#396131] px-[30px] py-[40px] drop-shadow-lg lg:flex-row lg:items-center lg:justify-center lg:gap-[80px] lg:px-[80px] lg:py-[60px]">
						<div className="flex flex-col items-start gap-[20px] lg:w-3/5">
							<span className="text-[1.5rem]/[3rem] font-bold text-white lg:text-[4rem]/[4rem]">
								Be Our Lifetime Friend
							</span>
							<span className="text-[0.8rem]/[1.6rem] font-medium text-white lg:text-[1rem]/[2rem]">
								At 1st Valley Bank, we believe banking is more than transactions—it’s about building
								lasting relationships. When you choose us, you’re not just a customer; you’re part
								of our family. Together, we’ll support your dreams, celebrate milestones, and grow
								through every chapter of life. Let’s walk this journey side by side—today, tomorrow,
								and always.
							</span>
							<NavLink
								to="/contact-us"
								className="flex w-full transform items-center justify-center rounded-[5px] bg-white py-[10px] text-center text-[1rem] font-bold text-[#396131] outline-0 outline-white transition-all duration-200 hover:bg-[#396131] hover:text-white hover:outline-1 lg:w-[200px]"
							>
								Inquire Now
							</NavLink>
						</div>
						<div className="lg:w-2/5">
							<FontAwesomeIcon
								icon={faHandshake}
								className="aspect-square text-white"
								style={{ width: '100%', height: 'auto' }}
							/>
						</div>
					</div>
				</section>
				{/* <section className="px-[15px]">
					<div className="flex flex-col gap-[30px] rounded-[8px] px-[30px] py-[40px] text-[#396131] lg:flex-row lg:items-center lg:justify-center lg:gap-[80px] lg:px-[80px] lg:py-[60px]">
						<div className="flex items-center justify-center lg:w-2/5">
							<FontAwesomeIcon
								icon={faBuildingColumns}
								className="aspect-square"
								style={{ width: '80%', height: 'auto' }}
							/>
						</div>
						<div className="flex flex-col items-start gap-[30px] lg:w-3/5 lg:gap-[60px]">
							<div className="flex flex-col gap-[20px]">
								<span className="text-[1.5rem] font-bold lg:text-[2rem]">
									Get to Know 1st Valley Bank
								</span>
								<span className="text-[0.8rem]/[2.4rem] font-medium lg:text-[1rem]/[3rem]">
									1st Valley Bank is a development bank in the Philippines, based in Baroy, Lanao
									del Norte and servicing various areas in Mindanao, specifically the provinces of
									Lanao del Norte, Lanao del Sur, Misamis Occidental, Misamis Oriental, Bukidnon,
									Zamboanga del Norte, Zamboanga del Sur and Zamboanga Sibugay.
								</span>
							</div>
							<NavLink
								to="/about-us"
								className="flex h-[40px] w-full transform items-center justify-center rounded-[5px] bg-[#396131] text-center text-[0.8rem] font-bold text-white outline-0 outline-[#396131] transition-all duration-200 hover:bg-white hover:text-[#396131] hover:outline-1 lg:h-[65px] lg:text-[1.5rem]"
							>
								<span>Learn More</span>
							</NavLink>
						</div>
					</div>
				</section> */}
			</main>
			{/* <main className="hidden sm:block lg:hidden">Tablet</main>
      <main className="block sm:hidden">Mobile</main> */}
		</>
	);
}
