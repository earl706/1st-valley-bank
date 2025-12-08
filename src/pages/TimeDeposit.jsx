import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
	ArrowLeft,
	TrendingUp,
	Calendar,
	DollarSign,
	Clock,
	Shield,
	ArrowRight
} from 'lucide-react';
import PageHeroSection from '../components/PageHeroSection';
import CarouselSection from '../components/CarouselSection';
import img from '/src/assets/homepage/heroSectionImage.png';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import carouselImg4 from '/src/assets/carousel/4.png';
import { DarkCard } from '../components/Card';
import { DarkPrimaryButton } from '../components/Buttons';
import { DarkHeader, LightHeader } from '../components/Header';
import RequirementsSection from '../components/RequirementsSection';
import { getTimeDeposits, getProductTypeRequirements } from '../services/depositService';

export default function TimeDeposit() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');

	const [timeDeposits, setTimeDeposits] = useState([]);
	const [requirements, setRequirements] = useState([]);

	useEffect(() => {
		getTimeDeposits().then((response) => {
			console.log('Time Deposits:', response);
			setTimeDeposits(response.results);
		});
		getProductTypeRequirements('time_deposit').then((data) => {
			setRequirements(data.requirements || []);
		});
	}, []);

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

	return (
		<>
			<main className="flex flex-col">
				<PageHeroSection pageSlug="deposits-time-deposit" />

				{/* Deposits Section */}
				<section
					id="deposits"
					data-scroll
					className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-24 text-white"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<DarkHeader
							badgeText="Categories"
							title="Time Deposit"
							subtitle="Choose the term that matches your investment goals"
							alignment="center"
							level={2}
							className="mb-16"
						/>
						<div className="grid gap-2 lg:grid-cols-4">
							{timeDeposits.map((deposit, index) => (
								<DarkCard key={index} useNativeSpacing={true} className="flex flex-col p-4">
									<div className="mb-2 flex items-center justify-center">
										<img
											src={deposit.image}
											alt={`${deposit.title} visual`}
											className="h-44 w-44 object-contain lg:h-56 lg:w-56"
										/>
									</div>
									<div className="flex flex-1 flex-col">
										<div className="mb-4 flex items-center justify-between">
											<div>
												<h3 className="text-xl leading-snug font-bold text-white">
													{deposit.name}
												</h3>
												<p className="text-xs leading-snug font-normal text-white/80">
													Term Period
												</p>
											</div>
											<div className="text-right">
												<div className="text-xl leading-snug font-bold text-[#aee3b7]">
													{deposit.interest_rate_below}% - {deposit.interest_rate_above}%
												</div>
												<div className="text-xs leading-snug font-normal text-white/80">
													Interest Rate
												</div>
											</div>
										</div>

										<p className="mb-4 text-sm leading-relaxed font-normal text-white/80">
											{deposit.description}
										</p>

										<div className="mb-4 rounded-lg bg-white/10 p-3">
											<div className="text-xs leading-snug font-normal text-white/80">
												Minimum Initial Amount
											</div>
											<div className="text-lg leading-snug font-bold text-white">
												₱{deposit.required_initial_deposit}
											</div>
										</div>

										<DarkPrimaryButton
											to={deposit.route || `/contact-us`}
											className="mt-auto w-full"
											secondaryIcon={
												<ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
											}
										>
											Open Account
										</DarkPrimaryButton>
									</div>
								</DarkCard>
							))}
						</div>
					</div>
				</section>

				{/* Requirements Section */}
				{requirements.length > 0 && (
					<RequirementsSection
						requirements={requirements}
						title="Requirements"
						subtitle="What you need to open a time deposit account"
						badgeText="Time Deposit"
						layout="two-column"
						showIcons={true}
					/>
				)}
			</main>
		</>
	);
}
