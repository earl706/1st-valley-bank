import React, { useEffect, useState } from 'react';
import { LightHeader } from '../../components/Header';
import { LightCard } from '../../components/Card';
import { LightPrimaryButton } from '../../components/Buttons';
import { ArrowRight } from 'lucide-react';
import aboutPageService from '../../services/aboutPageService';
import HeroSection from '../../components/HeroSection';
import img1 from '/src/assets/carousel/1.png';

export default function Services() {
	const [aboutPage, setAboutPage] = useState(null);
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let mounted = true;
		const fetchData = async () => {
			try {
				const data = await aboutPageService.getAboutPage();
				if (!mounted) return;
				setAboutPage(data || {});
				// Adapt admin-field: 'service_features' -> frontend 'services'
				const features = Array.isArray(data?.service_features)
					? data.service_features
					: [];
				setServices(
					features.map((item) => ({
						image: item.image_url || '',
						name: item.name || '',
						description: item.description || '',
						link: item.link || '',
					}))
				);
			} catch (err) {
				setServices([]);
			}
			setLoading(false);
		};
		fetchData();
		return () => {
			mounted = false;
		};
	}, []);

	return (
		<>
			<HeroSection
				title={aboutPage?.services_section_title || 'Comprehensive Banking Solutions'}
				subtitle="Everything You Need for Your Financial Journey"
				description={
					aboutPage?.services_section_subtitle ||
					'Comprehensive financial solutions designed to meet all your banking needs.'
				}
				image={img1}
				imageAlt="1st Valley Bank Services"
				showCta={false}
				backgroundColor="from-[#EFF8F1] via-white to-green-50"
				titleColor="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
			/>
		<main className="relative min-h-screen bg-[#EFF8F1] pb-8">
			<section id="services" className="relative overflow-hidden py-16 lg:py-24">
				<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<LightHeader
						badgeText="Services"
						title={aboutPage?.services_section_title || 'Comprehensive Banking Solutions'}
						subtitle={
							aboutPage?.services_section_subtitle ||
							'Comprehensive financial solutions designed to meet all your banking needs.'
						}
					/>
					{/* Services Grid */}
					<div className="mt-8 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
						{loading ? (
							[1, 2, 3].map((k) => (
								<div
									key={k}
									className="rounded-lg bg-white/70 p-6 animate-pulse min-h-[350px]"
								>
									<div className="mb-8 h-32 w-32 rounded bg-gray-200 mx-auto"></div>
									<div className="h-6 w-2/3 rounded bg-gray-200 mb-4 mx-auto"></div>
									<div className="h-4 w-full rounded bg-gray-100 mb-2"></div>
									<div className="h-4 w-5/6 rounded bg-gray-100 mb-2"></div>
									<div className="h-10 w-full rounded bg-gray-200 mt-10"></div>
								</div>
							))
						) : services.length > 0 ? (
							services.map((service, index) => (
								<LightCard
									className="group relative flex h-full flex-col items-center text-center"
									key={index}
								>
									<div className="mb-8 lg:mb-10">
										<div className="relative inline-block">
											<div className="mx-auto flex h-32 w-32 items-center justify-center transition-all duration-500 group-hover:scale-101 lg:h-40 lg:w-40">
												<img
													src={service.image}
													alt={service.name + ' logo'}
													className="h-full w-full object-cover"
												/>
											</div>
										</div>
									</div>
									<div className="flex h-full w-full flex-col space-y-4 lg:space-y-6">
										<h3 className="text-xl leading-tight font-bold text-[#396131] transition-colors duration-300 group-hover:text-[#4a7a3f]">
											{service.name}
										</h3>
										<div className="mx-auto h-0.5 w-12 rounded-full bg-gradient-to-r from-[#396131] to-[#4a7a3f] opacity-60 transition-all duration-300 group-hover:w-16 group-hover:opacity-100"></div>
										<p className="text-base leading-relaxed font-normal text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
											{service.description}
										</p>
										<div className="mt-auto flex w-full justify-center pt-4">
											<LightPrimaryButton
												to={
													service.link ||
													service.name.toLowerCase().replace(/\s+/g, '-') ||
													'#'
												}
												secondaryIcon={
													<ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
												}
												className="w-full"
											>
												Learn More
											</LightPrimaryButton>
										</div>
									</div>
								</LightCard>
							))
						) : (
							<div className="col-span-full py-12 text-center text-gray-400 text-lg italic">
								No services available at this time.
							</div>
						)}
					</div>
				</div>
			</section>
		</main>
		</>
	);
}
