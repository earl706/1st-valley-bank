import React, { useEffect, useState } from 'react';
import aboutPageService from '../../services/aboutPageService';
import { LightHeader } from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import carouselImg4 from '/src/assets/carousel/4.png';

const History = () => {
	const [aboutPage, setAboutPage] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;
		const fetchPage = async () => {
			try {
				const data = await aboutPageService.getAboutPage();
				if (mounted) {
					setAboutPage(data);
					setLoading(false);
				}
			} catch (err) {
				if (mounted) {
					setError(
						err?.message ||
							'Failed to load about page data. Please try again later.'
					);
					setLoading(false);
				}
			}
		};
		fetchPage();
		return () => {
			mounted = false;
		};
	}, []);

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[50vh] bg-white text-[#396131]">
				<div className="text-xl font-semibold">Loading history...</div>
			</div>
		);
	}
	if (error) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[50vh] bg-white text-[#396131]">
				<div className="text-xl font-semibold mb-2">Error</div>
				<div>{error}</div>
			</div>
		);
	}
	return (
		<>
			<HeroSection
				title={aboutPage?.history_title || 'Our Roots'}
				subtitle={aboutPage?.history_subtitle || "A Legacy of Trust and Growth"}
				description={
					aboutPage?.history_subtitle ||
					"Explore the origins and milestones that shaped 1st Valley Bank's growth from its humble beginnings to present-day achievements."
				}
				image={carouselImg4}
				imageAlt="1st Valley Bank History"
				showCta={false}
				backgroundColor="from-[#E9F2EA] via-white to-green-50"
				titleColor="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
			/>
		<section id="history" data-scroll className="bg-white py-12 min-h-[50vh]">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<LightHeader
					badgeText="Brief History"
					title={aboutPage?.history_title || 'Our Roots'}
					subtitle={
						aboutPage?.history_subtitle ||
						"Explore the origins and milestones that shaped 1st Valley Bank's growth from its humble beginnings to present-day achievements."
					}
				/>
				<div className="flex flex-col-reverse items-center gap-8 lg:flex-row">
					<div className="flex-1">
						{aboutPage?.history_content ? (
							<div
								className="text-base leading-relaxed font-normal text-gray-700"
								dangerouslySetInnerHTML={{
									__html: aboutPage.history_content.replace(/\n/g, '<br />')
								}}
							/>
						) : (
							<>
								<p className="mb-4 text-base leading-relaxed font-normal text-gray-700">
									<strong>1st Valley Bank (1VB)</strong> is one of the largest independent
									developmental banks dedicated to funding development projects and businesses
									through the provision of loan capital. While the Bank's primary clients are
									entrepreneurs and farmers, it also serves the financial needs of teachers,
									barangay officials, regular employees of local government units, as well as
									individuals who are in need of fast cash.
								</p>
								<p className="mb-4 text-base leading-relaxed font-normal text-gray-700">
									On <strong>27 December 2019</strong>, the merger between 1st Valley Bank
									(1VB), Sugbuanon Rural Bank, Inc. (SRBI), and D'Asian Hills Bank, Inc. (DAHBI)
									was declared official, with 1VB as the surviving entity. With the completion
									of the merger, clients can expect greater customer service satisfaction.
								</p>
								<p className="text-base leading-relaxed font-normal text-gray-700">
									1st Valley Bank ranks <strong>3rd in terms of assets</strong> and is
									considered one of the fastest-growing development banks in the country. Its
									audited financial statements show that as of December 2019, the Bank has a
									total of Php10B+ in resources.
								</p>
							</>
						)}
					</div>
				</div>
			</div>
		</section>
		</>
	);
};

export default History;
