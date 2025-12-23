import React, { useState } from "react";

import HeroSection from "../../components/HeroSection";
import { LightHeader, DarkHeader } from "../../components/Header";
import {LightCard, DarkCard} from "../../components/Card";
import img1 from '/src/assets/carousel/1.png';

import PageHeroSection from '../../components/PageHeroSection';

// Utility: Render icon image or icon classname
function renderIcon(icon, alt = "") {
	if (!icon) return null;
	if (icon.startsWith("http") || icon.startsWith("/")) {
		return (
			<img
				src={icon}
				alt={alt}
				className="mx-auto mb-3 h-10 w-10 object-contain"
				loading="lazy"
			/>
		);
	}
	return <i className={icon + " text-2xl text-[#396131] mb-2"} aria-hidden="true"></i>;
}

// Section wrapper for consistency
function Section({ id, badge, title, subtitle, children, className = "" }) {
	return (
		<section id={id} className={`py-10 md:py-14 ${className}`}>
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				{badge && (
					<span className="mb-2 inline-block rounded-full bg-[#4a7c3a]/20 px-3.5 py-1 text-xs font-semibold text-[#396131] tracking-wide uppercase">
						{badge}
					</span>
				)}
				{title && (
					<h2 className="mb-3 text-2xl md:text-3xl lg:text-4xl font-bold text-[#396131]">{title}</h2>
				)}
				{subtitle && (
					<p className="mb-8 max-w-2xl text-gray-700 md:text-lg">{subtitle}</p>
				)}
				{children}
			</div>
		</section>
	);
}

// Contact/application form (simple mailto, can be upgraded to actual form later)
function ContactSection({ title, content, email, phone }) {
	return (
		<section id="apply" className="bg-white py-10 md:py-14">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<LightHeader
					badgeText={"Contact Us"}
					title={title || "Apply or contact us"}
					subtitle={null}
				/>
				{content && <p className="mb-4 text-gray-700">{content}</p>}
				<ul className="mb-6 text-base space-y-2">
					{email && (
						<li>
							<strong>Email:</strong>{" "}
							<a
								href={`mailto:${email}`}
								className="text-[#396131] hover:underline"
							>{email}</a>
						</li>
					)}
					{phone && (
						<li>
							<strong>Phone:</strong>{" "}
							<a href={`tel:${phone}`} className="text-[#396131] hover:underline">{phone}</a>
						</li>
					)}
				</ul>
				{email && (
					<a
						href={`mailto:${email}`}
						className="inline-block rounded-md bg-[#396131] px-6 py-2 font-semibold text-white shadow hover:bg-[#4a7c3a] transition"
					>
						Send us your application
					</a>
				)}
			</div>
		</section>
	);
}

// Static data for Careers page
const staticCareersData = {
	is_active: true,
	overview_title: "Join Our Team",
	overview_subtitle: "Build Your Future with 1st Valley Bank",
	overview_content: "At 1st Valley Bank, we believe that our people are our greatest asset. We're looking for talented, passionate individuals who share our commitment to excellence, integrity, and customer service.\n\nJoin a team that values growth, innovation, and making a positive impact in the communities we serve. Whether you're starting your career or looking for your next opportunity, 1st Valley Bank offers a supportive environment where you can thrive and make a difference.",
	overview_image: img1,
	why_work_title: "Why Work With Us",
	why_work_subtitle: "Experience the 1st Valley Bank Difference",
	why_work_items: [
		{
			title: "Career Growth Opportunities",
			description: "We invest in our employees' professional development through training programs, mentorship, and clear career advancement paths.",
			icon: "trending-up"
		},
		{
			title: "Competitive Compensation & Benefits",
			description: "Enjoy competitive salaries, comprehensive health benefits, retirement plans, and performance-based incentives.",
			icon: "award"
		},
		{
			title: "Work-Life Balance",
			description: "We understand the importance of balancing work and personal life, offering flexible schedules and wellness programs.",
			icon: "calendar"
		},
		{
			title: "Inclusive & Diverse Culture",
			description: "Join a workplace that celebrates diversity, promotes inclusion, and values every team member's unique contributions.",
			icon: "users"
		},
		{
			title: "Impact & Purpose",
			description: "Be part of an organization that makes a real difference in people's lives and communities across the Philippines.",
			icon: "heart"
		},
		{
			title: "Innovation & Technology",
			description: "Work with cutting-edge banking technology and be part of digital transformation initiatives.",
			icon: "lightbulb"
		}
	],
	job_categories: [
		{
			category: "Banking Operations",
			jobs: [
				{
					title: "Branch Manager",
					description: "Lead and manage branch operations, ensuring excellent customer service and achieving business targets.",
					location: "Cagayan de Oro",
					type: "Full-time"
				},
				{
					title: "Teller",
					description: "Handle customer transactions, provide banking services, and maintain accurate records.",
					location: "Multiple Locations",
					type: "Full-time"
				},
				{
					title: "Customer Service Representative",
					description: "Assist customers with inquiries, account management, and provide solutions to their banking needs.",
					location: "Multiple Locations",
					type: "Full-time"
				}
			]
		},
		{
			category: "Finance & Accounting",
			jobs: [
				{
					title: "Financial Analyst",
					description: "Analyze financial data, prepare reports, and support strategic decision-making.",
					location: "Head Office",
					type: "Full-time"
				},
				{
					title: "Accountant",
					description: "Manage financial records, prepare statements, and ensure compliance with accounting standards.",
					location: "Head Office",
					type: "Full-time"
				}
			]
		},
		{
			category: "Information Technology",
			jobs: [
				{
					title: "Software Developer",
					description: "Develop and maintain banking applications, digital platforms, and IT systems.",
					location: "Head Office",
					type: "Full-time"
				},
				{
					title: "IT Support Specialist",
					description: "Provide technical support, troubleshoot issues, and maintain IT infrastructure.",
					location: "Head Office",
					type: "Full-time"
				}
			]
		},
		{
			category: "Risk & Compliance",
			jobs: [
				{
					title: "Risk Analyst",
					description: "Assess and manage financial risks, develop risk management strategies, and ensure regulatory compliance.",
					location: "Head Office",
					type: "Full-time"
				}
			]
		}
	],
	application_process_title: "Application Process",
	application_process_steps: [
		{
			step: 1,
			title: "Submit Your Application",
			description: "Complete our online application form and upload your resume and cover letter."
		},
		{
			step: 2,
			title: "Initial Screening",
			description: "Our HR team will review your application and qualifications. Shortlisted candidates will be contacted."
		},
		{
			step: 3,
			title: "Interview",
			description: "Selected candidates will be invited for an interview with the hiring manager and team members."
		},
		{
			step: 4,
			title: "Assessment",
			description: "Depending on the role, you may be asked to complete skills assessments or practical exercises."
		},
		{
			step: 5,
			title: "Background Check",
			description: "We conduct reference checks and background verification for final candidates."
		},
		{
			step: 6,
			title: "Job Offer",
			description: "Successful candidates will receive a job offer with details about compensation, benefits, and start date."
		}
	],
	benefits_title: "Benefits & Perks",
	benefits_items: [
		{
			title: "Health Insurance",
			description: "Comprehensive health, dental, and vision insurance coverage for you and your dependents.",
			icon: "heart"
		},
		{
			title: "Retirement Plan",
			description: "Competitive retirement savings plan with employer matching contributions.",
			icon: "trending-up"
		},
		{
			title: "Paid Time Off",
			description: "Generous vacation days, sick leave, and paid holidays to help you maintain work-life balance.",
			icon: "calendar"
		},
		{
			title: "Training & Development",
			description: "Access to professional development programs, workshops, and educational opportunities.",
			icon: "lightbulb"
		},
		{
			title: "Employee Discounts",
			description: "Special rates on bank products and services, plus discounts with partner merchants.",
			icon: "award"
		},
		{
			title: "Wellness Programs",
			description: "Health and wellness initiatives including fitness programs, mental health support, and wellness activities.",
			icon: "heart"
		}
	],
	contact_title: "Apply Now",
	contact_content: "Ready to join our team? Send us your application or reach out to our Human Resources department for more information about current openings and career opportunities.\n\nWe welcome applications from qualified candidates who share our values and commitment to excellence. 1st Valley Bank is an equal opportunity employer.",
	contact_email: "careers@1stvalleybank.com.ph",
	contact_phone: "+63 (88) 123-4567"
};


const Careers = () => {
	const page = staticCareersData;

	return (
		<main className="min-h-[800px] w-full flex flex-col">
			{/* Hero Section with overview */}
			<HeroSection
				title={page.overview_title}
				subtitle={page.overview_subtitle}
				description={page.overview_content}
				image={page.overview_image}
				imageAlt="Careers at 1st Valley Bank"
				showCta={false}
			/>

			{/* Overview Section */}
			{page?.overview_title && (
				<section className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-12">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<DarkHeader
							badgeText="Careers"
							title={page.overview_title}
							subtitle={page.overview_subtitle}
						/>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="flex flex-col justify-center">
								{page.overview_content && (
									<p className="mb-6 text-base text-white/80 leading-relaxed">
										{page.overview_content}
									</p>
								)}
							</div>
							{page.overview_image && (
								<div className="flex items-center justify-center">
									<img
										src={page.overview_image}
										alt="Careers at 1st Valley Bank"
										className="w-full max-w-lg "
									/>
								</div>
							)}
						</div>
					</div>
				</section>
			)}

			{/* Why work with us */}
			<section id="why-work-with-us" className="bg-white py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<LightHeader
						badgeText="Why Join Us"
						title={page.why_work_title || "Why Work With Us"}
						subtitle={page.why_work_subtitle}
					/>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{Array.isArray(page.why_work_items) && page.why_work_items.length > 0
							? page.why_work_items.map((item, idx) => (
									<div key={idx} className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg border border-[#e0e9dc]/60 bg-[#396131]">
										{renderIcon(item.icon, item.title)}
										<h4 className="mt-2 mb-1 text-lg font-semibold text-white">{item.title}</h4>
										{item.description && (
											<p className="text-[#e0e9dc] text-sm">{item.description}</p>
										)}
									</div>
								))
							: (
								<div className="col-span-3 text-center text-gray-500">We foster growth, teamwork, and purpose-driven impact.</div>
							)}
					</div>
				</div>
			</section>

			{/* Open positions / Job Categories */}
			<section id="job-listings" className="bg-[#396131] py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<DarkHeader
						badgeText="Careers"
						title="Open Positions"
						subtitle="Explore our current job openings and find your next career move."
						className="text-white"
						titleClassName="text-white"
						subtitleClassName="text-white/80"
					/>
					{Array.isArray(page.job_categories) && page.job_categories.length > 0 ? (
						<div className="space-y-8">
							{page.job_categories.map((category, catIdx) => (
								<div key={catIdx}>
									<h3 className="mb-4 text-2xl font-bold text-[#396131]">
										{category.category || "Job Openings"}
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
										{Array.isArray(category.jobs) && category.jobs.length > 0 ? (
											category.jobs.map((job, jobIdx) => (
												<DarkCard
													key={jobIdx}
													className="flex flex-col h-full rounded-xl border border-[#396131]/20 shadow-lg text-[#29321a] bg-white"
												>
													<h5 className="mb-1 text-xl font-bold text-[#396131]">{job.title}</h5>
													{job.location && (
														<div className="mb-2 text-sm font-medium text-[#47521d]">
															📍 {job.location}
														</div>
													)}
													{job.type && (
														<div className="mb-2 text-xs font-medium text-[#396131]">
															{job.type}
														</div>
													)}
													{job.description && (
														<p className="mb-3 text-sm flex-1 text-gray-700">{job.description}</p>
													)}
													{job.link && (
														<a
															href={job.link}
															target="_blank"
															rel="noopener noreferrer"
															className="mt-auto text-[#1e88e5] font-semibold hover:underline hover:text-[#1450a3] transition"
														>
															View Details
														</a>
													)}
												</DarkCard>
											))
										) : (
											<div className="col-span-full text-gray-600 py-4 text-center">
												No positions available in this category.
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-white/70 py-6 text-center">
							No positions currently open. Please check back soon.
						</div>
					)}
				</div>
			</section>

			{/* Application process section */}
			<section id="application-process" className="bg-gradient-to-tr from-[#ecf5ec] via-[#f7faf7] to-[#e9f3de] py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<LightHeader
						badgeText="How to Apply"
						title={page.application_process_title || "Application Process"}
						subtitle={page.application_process_subtitle}
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-5xl py-2 text-gray-800">
						{Array.isArray(page.application_process_steps) && page.application_process_steps.length > 0 ? (
							page.application_process_steps.map((step, idx) => (
								<div key={idx} className="flex items-start space-x-3 bg-white/80 rounded-xl shadow p-5 border border-[#dbead9]">
									<div className="flex-shrink-0">
										<div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#396131] text-white font-bold">
											{step.step || idx + 1}
										</div>
									</div>
									<div>
										<div className="font-semibold text-[#396131] mb-1 text-base">{step.title}</div>
										{step.description && (
											<p className="text-sm">{step.description}</p>
										)}
									</div>
								</div>
							))
						) : (
							<div className="col-span-full text-center text-gray-600 bg-white/60 rounded-xl p-6 border border-[#e0e9dc]">
								Submit your application, our HR will reach out if you're shortlisted.
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Benefits section */}
			<section id="benefits" className="py-16" style={{ backgroundColor: '#396131' }}>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<DarkHeader
						badgeText="Benefits"
						title={page.benefits_title || "Benefits & Perks"}
						subtitle={page.benefits_subtitle}
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
						{Array.isArray(page.benefits_items) && page.benefits_items.length > 0
							? page.benefits_items.map((item, idx) => (
									<LightCard
										key={idx}
										className="flex flex-col items-center text-center rounded-xl"
									>
										{renderIcon(item.icon, item.title)}
										<h5 className="mt-1 mb-1 text-lg font-bold text-white">{item.title}</h5>
										{item.description && (
											<p className="text-gray-100 text-sm">{item.description}</p>
										)}
									</LightCard>
								))
							: (
								<div className="col-span-3 text-center text-gray-300">Great benefits await our team members.</div>
							)}
					</div>
				</div>
			</section>

			{/* Contact/Application form section */}
			<ContactSection
				title={page.contact_title}
				content={page.contact_content}
				email={page.contact_email}
				phone={page.contact_phone}
			/>
		</main>
	);
};

export default Careers;