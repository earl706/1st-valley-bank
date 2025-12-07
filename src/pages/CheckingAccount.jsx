import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Building, User, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';
import { DarkCard } from '../components/Card';
import { DarkPrimaryButton } from '../components/Buttons';
import PageHeroSection from '../components/PageHeroSection';
import CarouselSection from '../components/CarouselSection';
import { DarkHeader, LightHeader } from '../components/Header';
import { getCheckingAccounts } from '../services/depositService';

export default function CheckingAccount() {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState({});
	const [activeSection, setActiveSection] = useState('');

	const [checkingAccounts, setCheckingAccounts] = useState([]);

	useEffect(() => {
		getCheckingAccounts().then((response) => {
			setCheckingAccounts(response.results);
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
				<PageHeroSection pageSlug="deposits-checking-account" />

				{/* Accounts Section */}
				<section
					id="accounts"
					data-scroll
					className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-24 text-white"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<DarkHeader
							badgeText="Categories"
							title="Checking Accounts"
							subtitle="Choose the checking account that fits your needs"
							alignment="center"
							level={2}
							className="mb-16"
						/>

						<div className="grid gap-8 lg:grid-cols-3">
							{checkingAccounts.map((account, index) => (
								<DarkCard
									key={index}
									className="flex flex-col p-8 lg:gap-8"
									useNativeSpacing={true}
								>
									<div className="mb-6 flex items-center justify-center">
										<img
											src={account.image}
											alt={`${account.title} visual`}
											className="h-48 w-auto object-contain lg:h-64"
										/>
									</div>
									<div className="flex h-full flex-col">
										<h3 className="mb-4 text-2xl leading-tight font-bold text-white">
											{account.name}
										</h3>
										<p className="mb-6 text-base leading-relaxed font-normal text-white/80">
											{account.description}
										</p>
										<div className="mb-6 space-y-3">
											<div className="flex justify-between">
												<span className="text-sm leading-relaxed font-normal text-white/70">
													Initial Deposit:
												</span>
												<span className="text-sm leading-relaxed font-bold text-white">
													₱{Number(account.required_initial_deposit).toLocaleString()}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm leading-relaxed font-normal text-white/70">
													Minimum Balance:
												</span>
												<span className="text-sm leading-relaxed font-bold text-white">
													{account.required_monthly_adb}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm leading-relaxed font-normal text-white/70">
													Interest Rate:
												</span>
												<span className="text-sm leading-relaxed font-bold text-white">
													{account.interest_rate_below}% - {account.interest_rate_above}% p.a.
												</span>
											</div>
										</div>

										<NavLink to={account.route || `/contact-us`} className="mt-auto">
											<DarkPrimaryButton className="flex w-full items-center justify-center gap-3">
												<span className="text-center text-white">Open Account</span>
												<ArrowRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
											</DarkPrimaryButton>
										</NavLink>
									</div>
								</DarkCard>
							))}
						</div>
					</div>
				</section>

				{/* Requirements Section */}
				<section id="requirements" data-scroll className="border-gray-200 bg-white text-gray-900">
					<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
						<LightHeader
							badgeText="Checking Accounts"
							title="Requirements"
							subtitle="What you need to open a checking account"
							alignment="left"
							level={3}
						/>
						<div className="grid gap-8 md:grid-cols-2">
							<div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
								<div className="mb-6 flex items-center gap-4">
									<User className="h-8 w-8 text-gray-400" />
									<h3 className="text-xl leading-tight font-bold">Individual Requirements</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Colored photocopy of 2 Valid IDs
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Three pieces 2x2 pictures
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Proof of income (payslip, ITR, etc.)
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Initial deposit amount
										</span>
									</li>
								</ul>
							</div>
							<div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
								<div className="mb-6 flex items-center gap-4">
									<Building className="h-8 w-8 text-gray-400" />
									<h3 className="text-xl leading-tight font-bold">Business Requirements</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											SEC Certificate of Registration
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Articles of Incorporation
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Board Resolution for account opening
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Valid IDs of authorized signatories
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">Business Permit</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
										<span className="text-base leading-relaxed font-normal">
											Financial statements (if applicable)
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
