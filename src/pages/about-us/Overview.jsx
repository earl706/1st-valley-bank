import React, { useEffect, useState } from 'react';
import aboutPageService from '../../services/aboutPageService';
import PageHeroSection from '../../components/PageHeroSection';
import { DarkHeader } from '../../components/Header';
import carouselImg4 from '/src/assets/carousel/4.png';
import { sanitizeHTML } from '../../utils/security';

const Overview = () => {
	const [aboutPage, setAboutPage] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			try {
				const data = await aboutPageService.getAboutPage();
				if (isMounted) {
					setAboutPage(data);
				}
			} catch (err) {
				if (isMounted) {
					setAboutPage(null);
				}
			} finally {
				if (isMounted) setLoading(false);
			}
		};
		fetchData();
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<>
			<PageHeroSection
				pageSlug="about-us"
				brandColor="#396131"
				brandGradient="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
				minHeight="min-h-[560px] lg:min-h-[640px]"
				showLearnMoreButton={true}
				learnMoreText="Learn More"
			/>
			<main className="flex flex-col min-h-[50vh] bg-white">
				<section
					id="overview"
					data-scroll
					className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-12"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<DarkHeader
							badgeText="Bank Overview"
							title={
								aboutPage?.overview_title || 'About 1st Valley Bank'
							}
							subtitle={
								aboutPage?.overview_subtitle ||
								'One of the largest independent development banks dedicated to funding development projects and businesses in the Philippines.'
							}
						/>
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-2/5">
								<div className="flex h-auto w-full items-center justify-center">
									<img
										src={aboutPage?.overview_image || carouselImg4}
										alt="1st Valley Bank Building"
										className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
									/>
								</div>
							</div>
							<div className="flex-1">
								{aboutPage?.overview_content ? (
									<div
										className="text-base leading-relaxed font-normal text-white/90"
										dangerouslySetInnerHTML={{
											__html: sanitizeHTML(aboutPage.overview_content.replace(/\n/g, '<br />'))
										}}
									/>
								) : (
									<>
										<p className="mb-4 text-base leading-relaxed font-normal text-white/90">
											<strong>1st Valley Bank (1VB)</strong> is one of the largest independent
											developmental banks dedicated to funding development projects and businesses
											through the provision of loan capital. While the Bank's primary clients are
											entrepreneurs and farmers, it also serves the financial needs of teachers,
											barangay officials, regular employees of local government units, as well as
											individuals who are in need of fast cash.
										</p>
										<p className="mb-4 text-base leading-relaxed font-normal text-white/90">
											On <strong>27 December 2019</strong>, the merger between 1st Valley Bank
											(1VB), Sugbuanon Rural Bank, Inc. (SRBI), and D'Asian Hills Bank, Inc. (DAHBI)
											was declared official, with 1VB as the surviving entity. With the completion
											of the merger, clients can expect greater customer service satisfaction.
										</p>
										<p className="text-base leading-relaxed font-normal text-white/90">
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
			</main>
		</>
	);
};

export default Overview;
