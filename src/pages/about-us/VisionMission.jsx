import React, { useState, useEffect } from 'react';
import aboutPageService from '../../services/aboutPageService';
import {
	Clock,
	User,
	HandCoins,
	Smartphone,
	Lightbulb,
	Leaf,
	Handshake,
	Shield,
	Users,
	Users2,
	Building,
	Building2,
	Sprout,
	Trophy
} from 'lucide-react';
import carouselImg5 from '../../assets/carousel/5.png';
import carouselImg6 from '../../assets/carousel/6.png';
import { DarkHeader, LightHeader } from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import { DetailPageSkeleton } from '../../components/PageSkeleton';

// Utility icon mapping for lucide-react (matching AboutUs.jsx)
const lucideIconMap = {
	calendar: Clock,
	user: User,
	users: Users,
	lightbulb: Lightbulb,
	heart: HandCoins,
	'trending-up': Smartphone,
	award: Trophy,
	star: Trophy,
	handshake: Handshake,
	trophy: Trophy,
	smile: HandCoins,
	shield: Shield,
	leaf: Leaf,
	building: Building,
	'building-flag': Building2,
	'users-gear': Users2,
	seedling: Sprout,
	'arrow-up-right-dots': Smartphone,
};
const getLucideIcon = (iconName) => lucideIconMap[iconName] || Lightbulb;

export default function VisionMission() {
	const [aboutPage, setAboutPage] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;
		(async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await aboutPageService.getAboutPage();
				if (mounted) {
					setAboutPage(data);
					setLoading(false);
				}
			} catch (err) {
				if (mounted) {
					setError(
						err?.message || 'Failed to load Vision & Mission data. Please try again later.'
					);
					setLoading(false);
				}
			}
		})();
		return () => {
			mounted = false;
		};
	}, []);

	if (loading) {
		return (
			<>
				<HeroSection
					title="Vision & Mission"
					subtitle="Our Guiding Principles"
					description="Discover the values and aspirations that drive 1st Valley Bank forward."
					image={carouselImg5}
					imageAlt="Vision & Mission"
					showCta={false}
					backgroundColor="from-[#E9F2EA] via-white to-green-50"
					titleColor="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
				/>
				<main className="flex flex-col">
					<DetailPageSkeleton showHero={false} showContent={true} contentSections={2} />
				</main>
			</>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center bg-white">
				<h1 className="text-2xl font-bold text-[#396131] mb-2">Vision & Mission</h1>
				<p className="text-red-600">{error}</p>
			</div>
		);
	}

	return (
		<>
			<HeroSection
				title="Vision & Mission"
				subtitle={aboutPage?.vision_mission_title || "Our Vision, Mission & Values"}
				description={aboutPage?.vision_mission_subtitle || "Guiding Principles That Drive Us"}
				image={carouselImg5}
				imageAlt="Vision & Mission"
				showCta={false}
				backgroundColor="from-[#E9F2EA] via-white to-green-50"
				titleColor="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
			/>
			<main className="flex flex-col">
				{/* Vision & Mission Full Section with Mission Points & Core Values */}
				<section id="core-values" className="relative bg-white lg:bg-[#E9F2EA] py-8 lg:py-12">
					<div className="mx-auto max-w-5xl px-2 sm:px-4">
						<LightHeader
							badgeText="Vision & Mission"
							title={aboutPage?.vision_mission_title || 'Our Vision, Mission & Values'}
							subtitle={
								aboutPage?.vision_mission_subtitle ||
								'Guided by a clear vision, a resolute mission, and enduring core values.'
							}
						/>
						{/* Vision & Mission - Compact Modern Layout */}
						<div className="flex flex-col-reverse items-center gap-8 md:flex-row md:gap-10">
							{/* Content */}
							<div className="flex-1 text-center md:text-left">
								<div className="flex flex-col gap-4">
									<div className="flex items-start gap-3 p-4">
										<div className="flex h-9 w-9 items-center justify-center">
											<Lightbulb className="h-7 w-7 text-[#396131]" />
										</div>
										<div>
											<span className="mb-1 block text-2xl leading-tight font-bold text-[#396131]">
												Vision
											</span>
											<p className="text-base leading-relaxed font-normal text-gray-700">
												{aboutPage?.vision_text ||
													'We envision to be the preferred banking institution in delivering innovative and customer-centered services.'}
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3 p-4">
										<div className="flex h-9 w-9 items-center justify-center">
											<Leaf className="h-7 w-7 text-[#396131]" />
										</div>
										<div>
											<span className="mb-1 block text-2xl leading-tight font-bold text-[#396131]">
												Mission
											</span>
											<p className="text-base leading-relaxed font-normal text-gray-700">
												{aboutPage?.mission_text ||
													'Committed to delivering exceptional banking services while fostering growth for our customers, employees, stakeholders, and communities.'}
											</p>
										</div>
									</div>
								</div>
							</div>
							{/* Icon */}
							<div className="flex flex-1 justify-center md:justify-end">
								<div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#396131] shadow-lg md:h-40 md:w-40">
									<Lightbulb className="h-20 w-20 text-5xl text-white md:h-28 md:w-28 md:text-7xl" />
								</div>
							</div>
						</div>
						{/* Mission Points & Core Values - Modern Grid */}
						<div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
							{/* Mission Points */}
							<div className="flex flex-col gap-4 p-5">
								<h3 className="mb-2 text-center text-xl leading-tight font-bold text-[#396131]">
									Mission Points
								</h3>
								<div className="flex flex-col gap-3">
									{aboutPage?.mission_points?.length
										? aboutPage.mission_points.map((point, idx) => {
												const IconComponent = getLucideIcon(point.icon || 'lightbulb');
												return (
													<div key={idx} className="flex items-start gap-3 p-3">
														<div className="flex h-8 w-8 items-center justify-center rounded">
															<IconComponent className="h-5 w-5 text-[#396131]" />
														</div>
														<div>
															<span className="block text-base leading-tight font-semibold text-[#396131]">
																{point.title || ''}
															</span>
															<p className="text-sm leading-relaxed font-normal text-gray-700">
																{point.description || ''}
															</p>
														</div>
													</div>
												);
											})
										: [
												[
													'Customer First',
													'Be one 1st Valley Bank; be the go-to bank for our customers',
													'building-flag'
												],
												['Top Employer', 'Be the top employer for our staff', 'users-gear'],
												[
													'High Returns',
													'Ensure delivery of high returns for our stakeholders',
													'seedling'
												],
												[
													'Community Development',
													'Promote development in the areas where we operate',
													'arrow-up-right-dots'
												]
											].map((point, idx) => {
												const IconComponent = getLucideIcon(point[2]);
												return (
													<div key={idx} className="flex items-start gap-3 p-3">
														<div className="flex h-8 w-8 items-center justify-center rounded">
															<IconComponent className="h-5 w-5 text-[#396131]" />
														</div>
														<div>
															<span className="block text-base leading-tight font-semibold text-[#396131]">
																{point[0]}
															</span>
															<p className="text-sm leading-relaxed font-normal text-gray-700">
																{point[1]}
															</p>
														</div>
													</div>
												);
											})}
								</div>
							</div>
							{/* Core Values */}
							<div className="flex flex-col gap-4 p-5">
								<h3 className="mb-2 text-center text-xl leading-tight font-bold text-[#396131]">
									Core Values
								</h3>
								<div className="flex flex-col gap-3">
									{aboutPage?.core_values?.length
										? aboutPage.core_values.map((value, idx) => {
												const IconComponent = getLucideIcon(value.icon || 'lightbulb');
												return (
													<div
														key={idx}
														className="flex items-start gap-3 rounded-lg bg-white/80 p-3"
													>
														<div className="flex h-8 w-8 items-center justify-center rounded">
															<IconComponent className="h-5 w-5 text-[#396131]" />
														</div>
														<div>
															<span className="block text-base leading-tight font-semibold text-[#396131]">
																{value.title || ''}
															</span>
															<p className="text-sm leading-relaxed font-normal text-gray-700">
																{value.description || ''}
															</p>
														</div>
													</div>
												);
											})
										: [
												[
													'Integrity & Transparency',
													'We conduct our business with integrity, transparency, honesty, and the highest ethical standards.',
													'handshake'
												],
												[
													'Equality & Respect',
													'Treating our customers with equality, fairness, and respect is foremost in our delivery of excellent banking services.',
													'handshake'
												],
												[
													'Innovation & Excellence',
													'We develop our business through innovation, enthusiasm, creativity, and our constant quest for excellence.',
													'lightbulb'
												]
											].map((value, idx) => {
												const IconComponent = getLucideIcon(value[2]);
												return (
													<div
														key={idx}
														className="flex items-start gap-3 rounded-lg bg-white/80 p-3"
													>
														<div className="flex h-8 w-8 items-center justify-center rounded">
															<IconComponent className="h-5 w-5 text-[#396131]" />
														</div>
														<div>
															<span className="block text-base leading-tight font-semibold text-[#396131]">
																{value[0]}
															</span>
															<p className="text-sm leading-relaxed font-normal text-gray-700">
																{value[1]}
															</p>
														</div>
													</div>
												);
											})}
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
