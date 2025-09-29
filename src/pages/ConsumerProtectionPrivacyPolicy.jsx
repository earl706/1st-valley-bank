import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
	Shield,
	Lock,
	Fingerprint,
	Database,
	FileText,
	QrCode,
	Laptop,
	Upload,
	Server,
	Baby,
	Star,
	Info,
	ChevronRight,
	Eye,
	UserCheck,
	Globe,
	Users,
	ArrowUp,
	CheckCircle,
	ArrowRight
} from 'lucide-react';
import img1 from '/src/assets/consumer-protection/privacy-policy/1.jpg';
import img2 from '/src/assets/consumer-protection/privacy-policy/2.jpg';
import img from '/src/assets/homepage/heroSectionImage.png';
import HeroSection from '../components/HeroSection';

export default function ConsumerProtectionPrivacyPolicy() {
	const [scrollY, setScrollY] = useState(0);
	const [activeSection, setActiveSection] = useState('');
	const [readingProgress, setReadingProgress] = useState(0);

	// Scroll tracking
	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			const progress = Math.min((scrollTop / docHeight) * 100, 100);

			setScrollY(scrollTop);
			setReadingProgress(progress);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Intersection observer for active section tracking
	useEffect(() => {
		const observers = [];
		const elements = document.querySelectorAll('[data-section]');

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ threshold: 0.3, rootMargin: '-100px 0px' }
		);

		elements.forEach((el) => observer.observe(el));
		observers.push(observer);

		return () => observers.forEach((obs) => obs.disconnect());
	}, []);

	// Table of contents data
	const tableOfContents = [
		{ id: 'hero', title: 'Privacy Policy Overview', icon: Shield },
		{ id: 'application-privacy', title: 'Application Privacy Statement', icon: Lock },
		{ id: 'user-data', title: 'User Data Collection', icon: Database },
		{ id: 'information-usage', title: 'Information Usage', icon: FileText },
		{ id: 'partner-treatment', title: 'Partner Information Treatment', icon: QrCode },
		{ id: 'information-sharing', title: 'Information Sharing Policy', icon: Users },
		{ id: 'conditions-of-use', title: 'Conditions of Use', icon: Star },
		{ id: 'third-party', title: 'Third Party Applications', icon: Laptop },
		{ id: 'personal-access', title: 'Personal Information Access', icon: Eye },
		{ id: 'children-policy', title: 'Children Usage Policy', icon: Baby },
		{ id: 'privacy-changes', title: 'Privacy Statement Changes', icon: Upload }
	];

	// Scroll to section
	const scrollToSection = (sectionId) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	return (
		<>
			<main className="relative">
				<HeroSection
					title="Consumer Protection"
					subtitle="Privacy Policy"
					description="Your privacy matters at 1st Valley Bank. Through our comprehensive Consumer
									Protection & Privacy Policy, we safeguard your personal data with the highest
									standards of security, transparency, and integrity."
					features={[]}
					image={img}
					imageAlt="Gold & Gems"
				/>

				<section id="application-privacy" data-section className="bg-white py-12">
					<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-1/3">
								<div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-[#396131]/20 bg-[#396131]/5">
									<Lock className="h-20 w-20 text-[#396131]" />
								</div>
							</div>
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<Info className="h-4 w-4 text-[#396131]" />
									<span className="text-base font-semibold text-[#396131]">Legal Framework</span>
								</div>
								<h2 className="mb-4 text-2xl font-bold text-[#396131]">
									Application Privacy Statement
								</h2>
								<p className="mb-4 text-base text-gray-700">
									This statement covers how we handle your personal information in connection with
									our application services.
								</p>
								<div className="rounded-lg border-l-4 border-[#396131] bg-[#396131]/5 p-4">
									<p className="text-base font-medium text-[#396131]">
										By using our services, you accept the practices in this Privacy Statement.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* User Data Collection */}
				<section id="user-data" data-section className="bg-[#396131]/5 py-12">
					<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<Database className="h-4 w-4 text-[#396131]" />
									<span className="text-base font-semibold text-[#396131]">Data Collection</span>
								</div>
								<h2 className="mb-4 text-2xl font-bold text-[#396131]">User Data</h2>
								<div className="space-y-6">
									<div className="rounded-lg border border-[#396131]/10 p-4">
										<h3 className="mb-2 flex items-center gap-2 text-xl font-semibold text-[#396131]">
											<UserCheck className="h-5 w-5" />
											Personal Information You Provide
										</h3>
										<p className="text-base text-gray-700">
											We collect and store information you provide, such as your name, email, and
											other details needed to deliver our services.
										</p>
									</div>
									<div className="rounded-lg border border-[#396131]/10 p-4">
										<h3 className="mb-2 flex items-center gap-2 text-xl font-semibold text-[#396131]">
											<Globe className="h-5 w-5" />
											Information Collected Automatically
										</h3>
										<p className="text-base text-gray-700">
											We automatically collect usage data (such as IP address, browser info, and
											visited URLs) when you use our application. This may be shared in aggregate
											with partners.
										</p>
									</div>
								</div>
							</div>
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-1/3">
								<div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-[#396131]/20 bg-white">
									<Database className="h-20 w-20 text-[#396131]" />
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Information Usage */}
				<section id="information-usage" data-section className="bg-white py-12">
					<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-1/3">
								<div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-[#396131]/20 bg-[#396131]/5">
									<FileText className="h-20 w-20 text-[#396131]" />
								</div>
							</div>
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<FileText className="h-4 w-4 text-[#396131]" />
									<span className="text-base font-semibold text-[#396131]">Data Usage</span>
								</div>
								<h2 className="mb-4 text-2xl font-bold text-[#396131]">
									How We Use Your Information
								</h2>
								<p className="mb-4 text-base text-gray-700">
									1st Valley Bank uses the collected information in the following ways:
								</p>
								<div className="space-y-4">
									{[
										{
											icon: <FileText className="h-5 w-5 text-[#396131]" />,
											title: 'Internal Analysis',
											description: 'To analyze, develop and improve our products and services'
										},
										{
											icon: <Users className="h-5 w-5 text-[#396131]" />,
											title: 'Customer Contact',
											description:
												'To contact you regarding offers and services that may interest you'
										},
										{
											icon: <Shield className="h-5 w-5 text-[#396131]" />,
											title: 'Legal Compliance',
											description: 'As outlined in our information sharing policies below'
										}
									].map((item, index) => (
										<div key={index} className="flex gap-3 p-3">
											<div className="flex h-8 w-8 items-center justify-center rounded bg-[#396131]/10 text-[#396131]">
												{item.icon}
											</div>
											<div>
												<h3 className="mb-1 text-base font-semibold text-[#396131]">
													{item.title}
												</h3>
												<p className="text-base text-gray-700">{item.description}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Partner Treatment */}
				<section id="partner-treatment" data-section className="bg-[#396131]/5 py-12">
					<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<QrCode className="h-4 w-4 text-[#396131]" />
									<span className="text-base font-semibold text-[#396131]">Partnership Policy</span>
								</div>
								<h2 className="mb-4 text-2xl font-bold text-[#396131]">
									Application Partner Treatment
								</h2>
								<p className="mb-4 text-base text-gray-700">
									1st Valley Bank may provide personal information to applicable Application
									Partners. Each partner's use of your personal information is subject to their
									separate privacy policy, not this Privacy Statement.
								</p>
								<div className="rounded-lg border border-[#396131]/10 bg-white p-4">
									<p className="text-base font-medium text-[#396131]">
										Application Partner privacy policies are linked from within their respective
										applications and platforms.
									</p>
								</div>
							</div>
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-1/3">
								<div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-[#396131]/20 bg-white">
									<QrCode className="h-20 w-20 text-[#396131]" />
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Information Sharing */}
				<section id="information-sharing" data-section className="bg-white py-12">
					<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
						<div className="mb-10 text-center">
							<div className="mb-3 flex items-center justify-center gap-2">
								<Users className="h-4 w-4 text-[#396131]" />
								<span className="text-base font-semibold text-[#396131]">Sharing Policy</span>
							</div>
							<h2 className="mb-3 text-2xl font-bold text-[#396131]">Information Sharing Policy</h2>
							<p className="mx-auto max-w-2xl text-base text-gray-700">
								Personal information about our users is integral to our business. We neither rent
								nor sell your personal information to anyone, with limited exceptions as described
								below.
							</p>
						</div>
						<div className="grid gap-6 md:grid-cols-2">
							{[
								{
									icon: <Shield className="h-6 w-6" />,
									title: 'Protection of 1st Valley Bank and Others',
									description:
										'We may share information to comply with laws or protect rights and safety.'
								},
								{
									icon: <FileText className="h-6 w-6" />,
									title: 'Business Transfers',
									description: 'Customer information may be transferred in business transactions.'
								},
								{
									icon: <Users className="h-6 w-6" />,
									title: 'Service Agents',
									description: 'We share information with agents who help us provide services.'
								},
								{
									icon: <CheckCircle className="h-6 w-6" />,
									title: 'With Your Consent',
									description:
										'You will be notified and can opt out before we share your information.'
								}
							].map((item, index) => (
								<div key={index} className="flex flex-col items-start p-4">
									<div className="mb-2 flex h-10 w-10 items-center justify-center rounded bg-[#396131]/10 text-[#396131]">
										{item.icon}
									</div>
									<h3 className="mb-1 text-lg font-bold text-[#396131]">{item.title}</h3>
									<p className="text-base text-gray-700">{item.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Third Party Applications */}
				<section id="third-party" data-section className="bg-[#396131]/5 py-12">
					<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-1/3">
								<div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-[#396131]/20 bg-white">
									<Laptop className="h-20 w-20 text-[#396131]" />
								</div>
							</div>
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<Laptop className="h-4 w-4 text-[#396131]" />
									<span className="text-base font-semibold text-[#396131]">External Links</span>
								</div>
								<h2 className="mb-4 text-2xl font-bold text-[#396131]">
									Third Party Applications/Websites
								</h2>
								<p className="text-base text-gray-700">
									The Application may link to third party sites not controlled by 1st Valley Bank.
									We are not responsible for their content or privacy practices.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Personal Information Access */}
				<section id="personal-access" data-section className="bg-white py-12">
					<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<Eye className="h-4 w-4 text-[#396131]" />
									<span className="text-base font-semibold text-[#396131]">Data Access</span>
								</div>
								<h2 className="mb-4 text-2xl font-bold text-[#396131]">
									What Personal Information Can I Access?
								</h2>
								<p className="mb-4 text-base text-gray-700">
									You can view and update the following personal information. This list may change
									as the Application evolves.
								</p>
								<ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
									{[
										'Account/profile info',
										'Email address',
										'Facebook info',
										'Preferences',
										'App data'
									].map((item, index) => (
										<li key={index} className="flex items-center gap-2 text-[#396131]">
											<CheckCircle className="h-4 w-4" />
											<span className="text-base font-medium">{item}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-1/3">
								<div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-[#396131]/20 bg-[#396131]/5">
									<Server className="h-20 w-20 text-[#396131]" />
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Children Policy */}
				<section id="children-policy" data-section className="bg-[#396131]/5 py-12">
					<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-1/3">
								<div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-[#396131]/20 bg-white">
									<Baby className="h-20 w-20 text-[#396131]" />
								</div>
							</div>
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<Baby className="h-4 w-4 text-[#396131]" />
									<span className="text-base font-semibold text-[#396131]">Child Protection</span>
								</div>
								<h2 className="mb-4 text-2xl font-bold text-[#396131]">
									Can Children Use The Application?
								</h2>
								<p className="text-base text-gray-700">
									1st Valley Bank does not knowingly collect information from children under 13.
									Parental consent is advised for minors.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Privacy Statement Changes */}
				<section id="privacy-changes" data-section className="bg-white py-12">
					<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<Upload className="h-4 w-4 text-[#396131]" />
									<span className="text-base font-semibold text-[#396131]">Updates & Changes</span>
								</div>
								<h2 className="mb-4 text-2xl font-bold text-[#396131]">
									Changes To This Privacy Statement
								</h2>
								<p className="text-base text-gray-700">
									1st Valley Bank may update this Privacy Statement at any time. Changes will be
									posted here or emailed to you. Continued use of our services means you accept the
									updated policy.
								</p>
							</div>
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-1/3">
								<div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-[#396131]/20 bg-[#396131]/5">
									<Upload className="h-20 w-20 text-[#396131]" />
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="bg-[#396131] py-12">
					<div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
						<h2 className="mb-4 text-2xl font-bold text-white">
							Questions About Our Privacy Policy?
						</h2>
						<p className="mx-auto mb-6 max-w-2xl text-base text-white/90">
							If you have any questions about this Privacy Statement or our data handling practices,
							please don't hesitate to contact us.
						</p>
						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<NavLink
								to="/contact-us"
								className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-[#396131] shadow transition-all duration-200 hover:scale-105 hover:bg-gray-100"
							>
								Contact Us
								<ArrowRight className="ml-2 h-5 w-5" />
							</NavLink>
							<NavLink
								to="/consumer-protection-hub"
								className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-white hover:text-[#396131]"
							>
								Consumer Protection Hub
							</NavLink>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
