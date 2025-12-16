import React from 'react';
import {
	ArrowRight,
	Mail,
	Phone,
	MapPin,
	ChevronDown,
} from 'lucide-react';
import { LightHeader } from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import img1 from '/src/assets/carousel/1.png';
import img2 from '/src/assets/carousel/2.png';
import img3 from '/src/assets/carousel/3.png';
import img4 from '/src/assets/carousel/4.png';
import img5 from '/src/assets/carousel/5.png';
import img6 from '/src/assets/carousel/6.png';
import { LightCard } from '../../components/Card';
import { LightPrimaryButton } from '../../components/Buttons';

// Static data for Sustainability page (unchanged)
const staticSustainabilityData = {
	is_active: true,
	philosophy_title: "1st Valley Bank Sustainability Philosophy",
	philosophy_content: "We seek to achieve strategic resilience by incorporating sustainability principles in the way we do business and in everything we do — from making business decisions to assessing relationships to creating products.\n\nAt 1st Valley Bank, sustainability is not just a commitment; it's a fundamental part of our identity. We believe that responsible banking practices contribute to long-term value creation for our stakeholders, communities, and the environment.",
	framework_image: img1,
	framework_image_mobile: img2,
	sustainability_report_pdf: null,
	sustainability_report_title: "Read the latest 1st Valley Bank Sustainability Report",
	energy_transition_title: "1st Valley Bank Energy Transition Finance Statement",
	energy_transition_content: "1st Valley Bank recognizes that the banking industry plays a critical role in the Philippines' committed transition to a low-carbon economy, a transition that will require providing access to affordable, reliable, sustainable and clean energy.\n\nWe are committed to supporting renewable energy projects, energy efficiency initiatives, and sustainable infrastructure development that aligns with national climate goals.",
	energy_transition_pdf: null,
	energy_transition_image: img3, // placeholder
	framework_title: "Sustainability Framework",
	framework_description: "The Bank's Sustainability Framework defines the strategies that serve as guideposts in its journey towards sustainability. Our framework encompasses five key pillars: Product Sustainability, Sustainability Contribution, Human Capital Sustainability, Disaster Response Sustainability, and Governance-based Sustainability.",
	strategies: [
		{
			title: "Product Sustainability ",
			description: "We create products and services that support sustainable development goals and evolving customer needs.",
			content: "",
			image_url: img1, // placeholder
			products: [
				{
					title: "Green Loans",
					description: "Financing for renewable energy, energy efficiency, and sustainable agriculture.",
					link: "/loans"
				},
				{
					title: "ESG Investment Products",
					description: "Investments prioritizing environmental, social, and governance factors.",
					link: "/deposits"
				},
				{
					title: "Digital Banking Solutions",
					description: "Paperless services reduce environmental impact and boost accessibility.",
					link: "/services"
				}
			],
			sdg_image_url: img2 // placeholder
		},
		{
			title: "Contribution",
			description: "We advance national goals through financial inclusion and impact financing for infrastructure and resilience.",
			content: "## Economic Impact\n\n1st Valley Bank supports the Philippine economic development goals through financial inclusion and impact financing in renewable energy, infrastructure, eco-friendly solutions, green facilities, and disaster resilience initiatives.\n\nWe contribute to the country's sustained economic growth through delivering various banking products and services that help create a dynamic business environment, promote local and foreign investments, and accelerate economic activities.",
			image_url: img3, // placeholder
			sdg_image_url: img4 // placeholder
		},
		{
			title: "Human Capital ",
			description: "We develop leaders with a sustainability mindset who excel through innovation and customer focus.",
			content: "",
			image_url: img5, // placeholder
			sdg_image_url: img6 // placeholder
		},
		{
			title: "Disaster Response ",
			description: "We support relief, rehabilitation, and recovery for disaster-stricken communities.",
			content: "## Scaling and Mainstreaming Financial Inclusion\n\nThrough our disaster response initiatives, we provide financial assistance, emergency loans, and support services to communities affected by natural disasters, helping them rebuild and recover more quickly.",
			image_url: img2, // placeholder
			sdg_image_url: img3 // placeholder
		},
		{
			title: "Governance-based ",
			description: "We continually improve governance for sustained performance anchored on accountability and integrity.",
			content: "## Good Governance to Create a Sustainable Future\n\nCorporate governance in 1st Valley Bank is about effective oversight, strict compliance with regulations, and sustainable value creation to promote the best interest of its various stakeholders.\n\nThe Bank endeavors to contribute to the country's sustained growth by financing economic activities that nurture the environment, empower Filipino consumers, and promote the best interest of the Bank's various stakeholders.",
			image_url: img4, // placeholder
			sdg_image_url: img5 // placeholder
		}
	],
	un_compact_title: "Supporting the United Nations Sustainable Development Goals (SDGs)",
	un_compact_description: "1st Valley Bank acknowledges that the sustainable development goals (SDGs) are integrated in nature. In its approach, it has mapped its contributions to national economic development across the targets of the SDGs.",
	un_compact_principles: [
		"Corporate governance",
		"Climate-friendly solutions and opportunities for business",
		"Access to clean, renewable, and reliable energy sources and services",
		"The adoption of instruments that help quantify, manage, and report on the carbon footprint of its businesses",
		"The responsibility to protect the dignity of every person and uphold human rights",
		"The recognition of the role of women in achieving economic growth and poverty reduction",
		"The elimination of all forms of forced and compulsory labor, and child labor"
	],
	contact_title: "Contact the 1st Valley Bank Sustainability Office",
	contact_content: "Inquiries regarding Sustainability at 1st Valley Bank, ESG data, and sustainability reports should be coursed through the Sustainability Office.",
	contact_address: "1st Valley Bank Sustainability Office\nMain Office Building\nCagayan de Oro City\nPhilippines",
	contact_phone: "+63 (88) 123-4567",
	contact_email: "sustainability@1stvalleybank.com.ph"
};

// Strategies Card Layout
function StrategyCard({ strategy, highlight, sustainabilityReportPdf, sustainabilityReportTitle }) {
	return (
		<div
			className={`relative bg-white rounded-2xl shadow-md border border-[#e5ede4] flex flex-col h-full transition-transform hover:scale-[1.025] duration-250 py-8`}
		>
			{strategy.image_url && (
				<div className="w-full">
					<img
						className="rounded-t-2xl object-cover w-full"
						src={strategy.image_url}
						alt={strategy.title}
					/>
				</div>
			)}

			<div className="flex flex-col flex-1 p-6 md:p-8">
				<h3 className="text-xl font-bold text-[#38622d] flex items-center gap-2 mb-2">
					{strategy.title}
				</h3>
				{strategy.description && (
					<p className="mb-3 text-base leading-relaxed text-gray-800 whitespace-pre-line font-medium tracking-wide">
						{strategy.description}
					</p>
				)}

				{/* SDG image, if present */}
				{strategy.sdg_image_url && (
					<div className="absolute bottom-4 right-4">
						<img
							src={strategy.sdg_image_url}
							alt="SDG illustration"
							className="h-10 w-auto opacity-80 max-w-[96px]"
						/>
					</div>
				)}
			</div>
		</div>
	);
}

// Main Export
export default function Sustainability() {
	const page = staticSustainabilityData;

	return (
		<>
			{/* Hero */}
			<HeroSection
				title="Sustainability"
				subtitle="Championing a Greener and More Equitable Tomorrow"
				description="At 1st Valley Bank, sustainability is at the core of our business. We drive economic, environmental, and social impact for a brighter future, supporting communities, the environment, and long-term growth."
				image={img1}
				imageAlt="1st Valley Bank Sustainability"
				ctaText=""
				ctaLink=""
				showCta={false}
				backgroundColor="from-[#E9F2EA] via-[#e6faef] to-[#f9fff7]"
				titleColor="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
				className="min-h-[560px] lg:min-h-[640px]"
			/>

			<div className="relative bg-gradient-to-br from-[#E9F2EA] via-[#e6faef] to-[#f9fff7]">
				{/* Energy Transition */}
				<section
					id="energy-transition"
					data-scroll
					className="bg-white py-12"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="max-w-4xl mx-auto">
							<LightHeader
								badgeText="Energy Transition"
								title={
									page?.energy_transition_title ||
									"1st Valley Bank Energy Transition Finance Statement"
								}
								subtitle=""
							/>
						</div>
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex w-full shrink-0 items-center justify-center lg:w-2/5">
								<div className="flex h-auto w-full items-center justify-center">
									<img
										src={page?.energy_transition_image || img1}
										alt="Energy Transition"
										className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
									/>
								</div>
							</div>
							<div className="flex-1">
								{page?.energy_transition_content ? (
									<div
										className="text-base leading-relaxed font-normal text-gray-700"
										dangerouslySetInnerHTML={{
											__html: page.energy_transition_content.replace(/\n/g, '<br />')
										}}
									/>
								) : (
									<p className="mb-4 text-base leading-relaxed font-normal text-gray-700">
										1st Valley Bank recognizes that the banking industry plays a critical role in the Philippines' committed transition to a low-carbon economy, a transition that will require providing access to affordable, reliable, sustainable and clean energy.
									</p>
								)}
								{page?.energy_transition_pdf && (
									<div className="mt-6">
										<a
											href={page.energy_transition_pdf}
											target="_blank"
											rel="noopener noreferrer"
										>
											<LightPrimaryButton
												secondaryIcon={
													<ArrowRight className="ml-2 h-4 w-4" />
												}
											>
												{page?.energy_transition_pdf_title ||
													"Read the 1st Valley Bank Energy Transition Finance Statement"}
											</LightPrimaryButton>
										</a>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>

				{/* Framework */}
				<section
					id="framework"
					data-scroll
					className="bg-[#F4F8F4] py-12"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="max-w-4xl mx-auto">
							<LightHeader
								badgeText="Framework"
								title={
									page?.framework_title ||
									"Sustainability Framework"
								}
								subtitle=""
							/>
						</div>
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex-1">
								{page?.framework_description ? (
									<p className="mb-4 text-base leading-relaxed font-normal text-gray-700">
										{page.framework_description}
									</p>
								) : (
									<p className="mb-4 text-base leading-relaxed font-normal text-gray-700">
										The Bank's Sustainability Framework defines the strategies that serve as guideposts in its journey towards sustainability.
									</p>
								)}
								{page?.framework_pdf && (
									<div className="mt-6">
										<a
											href={page.framework_pdf}
											target="_blank"
											rel="noopener noreferrer"
										>
											<LightPrimaryButton
												secondaryIcon={
													<ArrowRight className="ml-2 h-4 w-4" />
												}
											>
												{page.framework_pdf_title || "Read the Sustainability Framework"}
											</LightPrimaryButton>
										</a>
									</div>
								)}
							</div>
							<div className="flex w-full shrink-0 items-center justify-center lg:w-2/5">
								<div className="flex h-auto w-full items-center justify-center">
									<img
										src={page.framework_image || img1}
										alt={page.framework_image_alt || "Sustainability Framework"}
										className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* --- Redesigned Strategies Section --- */}
				{Array.isArray(page?.strategies) && page.strategies.length > 0 && (
					<section className="bg-white py-14">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<LightHeader
								badgeText="Strategies"
								title="Our Sustainability Strategies"
								subtitle="Five pillars lead our journey toward a more sustainable bank and future."
								alignment="left"
								className="mb-12"
							/>

							<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
								{page.strategies.map((strategy, idx) => (
									<StrategyCard
										key={strategy.title || idx}
										strategy={strategy}
										highlight={idx === 0}
										sustainabilityReportPdf={idx === 0 ? page.sustainability_report_pdf : undefined}
										sustainabilityReportTitle={idx === 0 ? page.sustainability_report_title : undefined}
									/>
								))}
							</div>
						</div>
					</section>
				)}
				{/* --- End redesigned Strategies --- */}

				{/* UN SDGs Support */}
				<section className="bg-[#F4F8F4] py-12">
					<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
						<LightHeader
							badgeText="UN SDGs"
							title={page?.un_compact_title || 'Supporting the United Nations Sustainable Development Goals (SDGs)'}
							subtitle={page?.un_compact_description || null}
							alignment="center"
						/>
						{page?.strategies && Array.isArray(page.strategies) && page.strategies.length > 0 ? (
							<div>
								<div className="grid grid-cols-3 gap-4">
									{page.strategies
										.filter((strategy) => strategy.sdg_image_url)
										.map((strategy, i) => (
											<div key={strategy.title || i} className="w-full flex flex-col items-center bg-white rounded-xl border border-[#e5ede4] shadow p-6">
												<img
													src={strategy.sdg_image_url}
													alt={`${strategy.title} SDGs`}
													className="mb-4 h-[54px] w-auto"
												/>
												<div className="text-sm text-gray-700 font-semibold text-center mb-2">{strategy.title}</div>
											</div>
										))}
								</div>
							</div>
						) : (
							<p className="text-center text-gray-600">SDG information will be available soon.</p>
						)}
					</div>
				</section>

				{/* UN Global Compact Principles */}
				<section className="bg-gradient-to-b from-[#f6faf6] to-white py-16 relative">
					<div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#e7faee] to-transparent pointer-events-none" />
					<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
						<LightHeader
							badgeText="UN Global Compact"
							title="Alignment to the United Nations Global Compact Principles"
							subtitle="1st Valley Bank supports the principles of the United Nations Global Compact. The Bank upholds:"
							alignment="center"
						/>
						<div className="mt-8">
							{page?.un_compact_principles && Array.isArray(page.un_compact_principles) && page.un_compact_principles.length > 0 ? (
								<div className="grid md:grid-cols-2 gap-6">
									{page.un_compact_principles.map((principle, idx) => (
										<div key={idx} className="flex items-start bg-[#f4f8f4] rounded-xl shadow-sm border border-[#d8ead7] px-6 py-4 gap-4">
											<div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#e9f7ee] text-[#396131] font-bold text-lg shadow-sm shrink-0">
												{idx + 1}
											</div>
											<div className="text-gray-800 text-base font-medium leading-snug">{principle}</div>
										</div>
									))}
								</div>
							) : (
								<div className="grid md:grid-cols-2 gap-6">
									{[
										"Corporate governance",
										"Climate-friendly solutions and opportunities for business",
										"Access to clean, renewable, and reliable energy sources and services",
										"The adoption of instruments that help quantify, manage, and report on the carbon footprint of its businesses",
										"The responsibility to protect the dignity of every person and uphold human rights",
										"The recognition of the role of women in achieving economic growth and poverty reduction",
										"The elimination of all forms of forced and compulsory labor, and child labor"
									].map((principle, idx) => (
										<div key={idx} className="flex items-start bg-[#f4f8f4] rounded-xl shadow-sm border border-[#d8ead7] px-6 py-4 gap-4">
											<div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#e9f7ee] text-[#396131] font-bold text-lg shadow-sm shrink-0">
												{idx + 1}
											</div>
											<div className="text-gray-800 text-base font-medium leading-snug">{principle}</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</section>

				
			</div>
		</>
	);
}
