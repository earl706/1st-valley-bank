import React, { useEffect, useState } from 'react';
import {
	faCoins,
	faFilterCircleDollar,
	faHandHoldingMedical,
	faMoneyBillTrendUp
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DepositsSpecialSavings() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');
	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		const observers = [];

		const createObserver = (threshold = 0.1) => {
			return new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						setIsVisible((prev) => ({
							...prev,
							[entry.target.id]: entry.isIntersecting
						}));

						if (entry.isIntersecting) {
							setActiveSection(entry.target.id);
						}
					});
				},
				{ threshold, rootMargin: '-50px 0px' }
			);
		};

		const observer = createObserver();
		const elements = document.querySelectorAll('[data-scroll]');
		elements.forEach((el) => observer.observe(el));
		observers.push(observer);

		return () => observers.forEach((obs) => obs.disconnect());
	}, []);

	const scrollToSection = (id) => {
		document.getElementById(id)?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	};

	const features = [
		{
			name: 'SSD MICRO',
			description: 'Contractual savings account forming part of the micro loan guarantee.',
			icon: faCoins
		},
		{
			name: 'SSD REGULAR',
			description:
				'Build-up savings that forms part of the regular loan of the clients. Initial deposit is Php300 to Php1K that builds up every loan renewal. ',
			icon: faMoneyBillTrendUp
		},
		{
			name: 'HANDOG SAVINGS',
			description:
				'Deposit program for supervised credit clients. Minimum deposit is Php500 or 1% of the loan amount.',
			icon: faHandHoldingMedical
		}
	];

	return (
		<>
			<main className="flex flex-col gap-[60px] pb-[50px] lg:gap-[120px]">
				<nav className="bg-opacity-50 fixed top-35 right-4 z-40 rounded-2xl bg-black p-2 backdrop-blur-lg">
					<div className="flex flex-col gap-2">
						{['main', 'features', 'first-checking-account'].map((section) => (
							<button
								key={section}
								onClick={() => scrollToSection(section)}
								className={`h-3 w-3 rounded-full transition-all duration-300 ${
									activeSection === section
										? 'scale-125 cursor-pointer bg-[#396131]'
										: 'cursor-pointer bg-gray-500 hover:bg-gray-300'
								}`}
							/>
						))}
					</div>
				</nav>

				<section
					id="main"
					data-scroll
					className="mx-[10px] rounded-[8px] bg-white text-[#396131] drop-shadow-lg"
				>
					<div className="mx-[10px] flex flex-col gap-[20px] px-[20px] py-[30px] lg:px-[60px] lg:py-[80px]">
						<div className="flex flex-col gap-[10px]">
							<span className="text-[2rem]/[2rem] font-bold lg:text-[4rem]/[4rem]">
								Deposits / Special Savings
							</span>
							<span className="text-[1rem]/[1rem] font-bold lg:text-[1.5rem]/[1.5rem]">
								Saving with a smile
							</span>
						</div>
						<span className="text-[0.8rem]/[1.6rem] lg:w-1/2 lg:text-[1rem]/[2rem]">
							Make your money work smarter with 1st Valley Bank’s Special Savings Deposit! Designed
							for security and steady growth, it’s the ideal place to park your cash with
							confidence. Whether you're building an emergency fund or saving for future plans,
							enjoy peace of mind and dependable returns while your savings stay within reach.
						</span>
					</div>
				</section>
				<section id="features" data-scroll className="mx-[20px] text-[#396131] lg:mx-[114px]">
					<div className="flex flex-col gap-[20px] lg:gap-[40px]">
						{features.map((feature, index) => (
							<div
								className="flex items-start gap-[20px] lg:items-center lg:gap-[120px]"
								key={index}
							>
								<FontAwesomeIcon
									icon={feature.icon}
									className="flex aspect-square"
									style={{ width: '80px', height: '80px' }}
								/>
								<div className="flex flex-col gap-[20px]">
									<span className="text-[1rem]/[1rem] font-bold lg:text-[1.5rem]/[1.5rem]">
										{feature.name}
									</span>
									<span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
										{feature.description}
									</span>
								</div>
							</div>
						))}
					</div>
				</section>
				<section id="first-checking-account" data-scroll className="mx-[15px]">
					<div className="flex flex-col justify-center gap-[70px] rounded-[8px] bg-[#396131] px-[30px] py-[40px] text-white drop-shadow-lg lg:p-[80px]">
						<div className="flex flex-col-reverse justify-center gap-[20px] lg:flex-row lg:gap-[30px]">
							<div className="flex flex-col justify-start gap-[20px] lg:w-4/5">
								<span className="text-[1rem]/[1rem] font-bold lg:text-[1.5rem]/[3rem]">
									BASIC SAVINGS
								</span>
								<span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[3rem]">
									A deposit account designed for the unbanked sector. It provides holders the
									ability to enjoy basic banking functions. Clients only need to deposit a minimum
									of Php100 as initial savings. There is no average daily balance to maintain.
									Client is allowed to deposit up to Php50,000.
								</span>
							</div>
							<div className="flex justify-center lg:w-1/5">
								{' '}
								<FontAwesomeIcon
									icon={faFilterCircleDollar}
									className="flex aspect-square"
									style={{ width: '250px', height: '250px' }}
								/>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
