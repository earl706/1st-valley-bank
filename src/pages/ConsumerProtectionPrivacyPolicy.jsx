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
			{/* Reading Progress Bar */}
			<div className="fixed top-0 left-0 z-50 h-1 w-full bg-gray-200">
				<div
					className="h-full bg-[#396131] transition-all duration-300"
					style={{ width: `${readingProgress}%` }}
				/>
			</div>

			{/* Floating Table of Contents */}
			{/* <div className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 transform xl:block">
				<div className="rounded-xl border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur-sm">
					<h3 className="mb-4 text-sm font-bold text-[#396131]">Contents</h3>
					<nav className="space-y-2">
						{tableOfContents.map((item, index) => (
							<button
								key={index}
								onClick={() => scrollToSection(item.id)}
								className={`flex w-full items-center gap-2 rounded-lg p-2 text-left text-xs transition-all duration-200 hover:bg-[#396131]/10 ${
									activeSection === item.id
										? 'bg-[#396131]/20 text-[#396131]'
										: 'text-gray-600 hover:text-[#396131]'
								}`}
							>
								<item.icon className="h-3 w-3" />
								<span className="truncate">{item.title}</span>
							</button>
						))}
					</nav>
				</div>
			</div> */}

			<main className="relative">
				{/* Hero Section */}
				<section
					id="hero"
					data-section
					className="relative flex min-h-screen items-center justify-center overflow-hidden"
					style={{
						background: 'linear-gradient(135deg, #396131 0%, #2d4a26 100%)'
					}}
				>
					{/* Background Pattern */}
					<div className="absolute inset-0">
						<div className="absolute inset-0 bg-black/20" />
						<div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
						<div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
						<div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/3 blur-3xl" />
					</div>

					<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid items-center gap-12 lg:grid-cols-2">
							{/* Content */}
							<div className="text-white">
								<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
									<Shield className="h-4 w-4" />
									Consumer Protection
								</div>

								<h1 className="mb-6 text-5xl leading-tight font-bold lg:text-7xl">
									Privacy
									<span className="block text-white/90">Policy</span>
								</h1>

								<p className="mb-8 text-xl leading-relaxed text-white/80 lg:text-2xl">
									Your privacy matters at 1st Valley Bank. Through our comprehensive Consumer
									Protection & Privacy Policy, we safeguard your personal data with the highest
									standards of security, transparency, and integrity.
								</p>

								<div className="flex flex-col gap-4 sm:flex-row">
									<button
										onClick={() => scrollToSection('application-privacy')}
										className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-[#396131] shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100"
									>
										Read Full Policy
										<ChevronRight className="ml-2 h-5 w-5" />
									</button>
									<NavLink
										to="/consumer-protection"
										className="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-[#396131]"
									>
										Back to Consumer Protection
									</NavLink>
								</div>
							</div>

							{/* Visual */}
							<div className="relative">
								<div className="relative z-10 rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
									<div className="flex h-80 items-center justify-center">
										<Fingerprint className="h-48 w-48 text-white/80" />
									</div>
								</div>

								{/* Floating elements */}
								<div className="absolute -top-4 -right-4 animate-pulse rounded-full bg-white p-4 shadow-lg">
									<Lock className="h-6 w-6 text-[#396131]" />
								</div>
								<div className="absolute -bottom-4 -left-4 animate-pulse rounded-full bg-white p-4 shadow-lg delay-1000">
									<Shield className="h-6 w-6 text-[#396131]" />
								</div>
							</div>
						</div>
					</div>

					{/* Scroll indicator */}
					<div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce text-white">
						<div className="flex flex-col items-center gap-2">
							<span className="text-sm">Scroll to explore</span>
							<ArrowUp className="h-5 w-5 rotate-180" />
						</div>
					</div>
				</section>

				{/* Application Privacy Statement */}
				<section id="application-privacy" data-section className="bg-white py-20">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid items-center gap-12 lg:grid-cols-2">
							<div className="relative">
								<div className="flex h-80 items-center justify-center rounded-3xl bg-gradient-to-br from-[#396131]/10 to-[#396131]/20 p-8">
									<Lock className="h-32 w-32 text-[#396131]" />
								</div>

								{/* Decorative elements */}
								<div className="absolute -top-6 -left-6 rounded-full bg-[#396131] p-3 shadow-lg">
									<Shield className="h-6 w-6 text-white" />
								</div>
								<div className="absolute -right-6 -bottom-6 rounded-full bg-gray-600 p-3 shadow-lg">
									<FileText className="h-6 w-6 text-white" />
								</div>
							</div>

							<div>
								<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#396131]/10 px-4 py-2 text-sm font-semibold text-[#396131]">
									<Info className="h-4 w-4" />
									Legal Framework
								</div>

								<h2 className="mb-6 text-4xl font-bold text-[#396131] lg:text-5xl">
									Application Privacy Statement
								</h2>

								<div className="prose prose-lg max-w-none">
									<p className="mb-6 text-xl leading-relaxed text-gray-600">
										This privacy statement applies to the treatment of personally identifiable
										information submitted by, or otherwise obtained from, you in connection with our
										application services.
									</p>

									<div className="rounded-r-lg border-l-4 border-[#396131] bg-[#396131]/5 p-6">
										<p className="font-medium text-[#396131]">
											The Application is provided by 1st Valley Bank, a Development Bank Inc., and
											may be provided on behalf of our licensed partners. By using our services, you
											acknowledge and accept the practices outlined in this Privacy Statement.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* User Data Collection */}
				<section
					id="user-data"
					data-section
					className="py-20 text-white"
					style={{
						background: 'linear-gradient(135deg, #396131 0%, #2d4a26 100%)'
					}}
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid items-center gap-12 lg:grid-cols-5">
							<div className="lg:col-span-3">
								<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
									<Database className="h-4 w-4" />
									Data Collection
								</div>

								<h2 className="mb-8 text-4xl font-bold lg:text-5xl">User Data</h2>

								<div className="space-y-8">
									{/* Personal Information You Provide */}
									<div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
										<h3 className="mb-4 flex items-center gap-3 text-2xl font-bold">
											<UserCheck className="h-6 w-6" />
											Personal Information You Provide
										</h3>
										<p className="leading-relaxed text-white/80">
											We receive and store information you submit to our application, including your
											full name, email address, gender, IP address, browser information, username,
											demographic information, and any other data necessary to provide our services.
										</p>
									</div>

									{/* Automatically Collected Information */}
									<div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
										<h3 className="mb-4 flex items-center gap-3 text-2xl font-bold">
											<Globe className="h-6 w-6" />
											Information Collected Automatically
										</h3>
										<p className="leading-relaxed text-white/80">
											We automatically receive and record usage information when you interact with
											our application, including IP address, browser information, Facebook user ID,
											page fan status, and URLs accessed. This information may be shared in
											aggregate form with our partners.
										</p>
									</div>
								</div>
							</div>

							<div className="lg:col-span-2">
								<div className="relative">
									<img
										src={img1}
										alt="Data Protection"
										className="h-auto w-full rounded-2xl shadow-2xl"
									/>
									<div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 to-transparent" />
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Information Usage */}
				<section id="information-usage" data-section className="bg-white py-20">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid items-start gap-12 lg:grid-cols-2">
							<div className="relative">
								<img
									src={img2}
									alt="Information Usage"
									className="h-auto w-full rounded-2xl shadow-xl"
								/>

								{/* Overlay card */}
								<div className="absolute -right-6 -bottom-6 max-w-xs rounded-xl border border-gray-200 bg-white p-6 shadow-xl">
									<div className="mb-2 flex items-center gap-3">
										<CheckCircle className="h-5 w-5 text-green-500" />
										<span className="font-semibold text-[#396131]">Secure Processing</span>
									</div>
									<p className="text-sm text-gray-600">
										Your data is processed with bank-grade security standards.
									</p>
								</div>
							</div>

							<div>
								<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
									<FileText className="h-4 w-4" />
									Data Usage
								</div>

								<h2 className="mb-6 text-4xl font-bold text-[#396131] lg:text-5xl">
									How We Use Your Information
								</h2>

								<p className="mb-8 text-xl leading-relaxed text-gray-600">
									1st Valley Bank uses the collected information in the following ways:
								</p>

								<div className="space-y-6">
									{[
										{
											icon: <FileText className="h-5 w-5" />,
											title: 'Internal Analysis',
											description: 'To analyze, develop and improve our products and services'
										},
										{
											icon: <Users className="h-5 w-5" />,
											title: 'Customer Contact',
											description:
												'To contact you regarding offers and services that may interest you'
										},
										{
											icon: <Shield className="h-5 w-5" />,
											title: 'Legal Compliance',
											description: 'As outlined in our information sharing policies below'
										}
									].map((item, index) => (
										<div
											key={index}
											className="flex gap-4 rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:border-[#396131] hover:shadow-md"
										>
											<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#396131]/10 text-[#396131]">
												{item.icon}
											</div>
											<div>
												<h3 className="mb-1 font-semibold text-[#396131]">{item.title}</h3>
												<p className="text-gray-600">{item.description}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Partner Treatment */}
				<section id="partner-treatment" data-section className="bg-gray-50 py-20">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid items-center gap-12 lg:grid-cols-2">
							<div>
								<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#396131]/10 px-4 py-2 text-sm font-semibold text-[#396131]">
									<QrCode className="h-4 w-4" />
									Partnership Policy
								</div>

								<h2 className="mb-6 text-4xl font-bold text-[#396131] lg:text-5xl">
									Application Partner Treatment
								</h2>

								<div className="prose prose-lg max-w-none">
									<p className="mb-6 text-xl leading-relaxed text-gray-600">
										1st Valley Bank may provide personal information to applicable Application
										Partners. Each partner's use of your personal information is subject to their
										separate privacy policy, not this Privacy Statement.
									</p>

									<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
										<p className="font-medium text-[#396131]">
											Application Partner privacy policies are linked from within their respective
											applications and platforms.
										</p>
									</div>
								</div>
							</div>

							<div className="relative">
								<div className="flex h-80 items-center justify-center rounded-3xl border border-[#396131]/20 bg-[#396131]/10 p-12">
									<QrCode className="h-32 w-32 text-[#396131]" />
								</div>

								{/* Floating badges */}
								<div className="absolute -top-4 -left-4 animate-pulse rounded-full bg-[#396131] p-3 shadow-lg">
									<Users className="h-5 w-5 text-white" />
								</div>
								<div className="absolute -right-4 -bottom-4 animate-pulse rounded-full bg-gray-600 p-3 shadow-lg delay-500">
									<Globe className="h-5 w-5 text-white" />
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Information Sharing */}
				<section id="information-sharing" data-section className="bg-white py-20">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-16 text-center">
							<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
								<Users className="h-4 w-4" />
								Sharing Policy
							</div>

							<h2 className="mb-6 text-4xl font-bold text-[#396131] lg:text-5xl">
								Information Sharing Policy
							</h2>

							<p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
								Personal information about our users is integral to our business. We neither rent
								nor sell your personal information to anyone, with limited exceptions as described
								below.
							</p>
						</div>

						<div className="grid gap-8 md:grid-cols-2">
							{[
								{
									icon: <Shield className="h-6 w-6" />,
									title: 'Protection of 1st Valley Bank and Others',
									description:
										'We may release personal information when necessary to comply with law, enforce agreements, or protect rights, property, and safety of our organization, employees, users, and others.',
									bgColor: 'bg-[#396131]/5',
									borderColor: 'border-[#396131]/20',
									iconBg: 'bg-[#396131]/10',
									iconColor: 'text-[#396131]'
								},
								{
									icon: <FileText className="h-6 w-6" />,
									title: 'Business Transfers',
									description:
										'In cases of asset transactions, mergers, or acquisitions, customer information may be transferred as a business asset to ensure service continuity.',
									bgColor: 'bg-blue-50',
									borderColor: 'border-blue-200',
									iconBg: 'bg-blue-100',
									iconColor: 'text-blue-600'
								},
								{
									icon: <Users className="h-6 w-6" />,
									title: 'Service Agents',
									description:
										'We employ other companies to perform tasks on our behalf. These agents only use your information as necessary to assist us in providing services.',
									bgColor: 'bg-purple-50',
									borderColor: 'border-purple-200',
									iconBg: 'bg-purple-100',
									iconColor: 'text-purple-600'
								},
								{
									icon: <CheckCircle className="h-6 w-6" />,
									title: 'With Your Consent',
									description:
										'Except as outlined above, you will be notified when personal information may be shared with third parties and can prevent such sharing.',
									bgColor: 'bg-green-50',
									borderColor: 'border-green-200',
									iconBg: 'bg-green-100',
									iconColor: 'text-green-600'
								}
							].map((item, index) => (
								<div
									key={index}
									className={`${item.bgColor} border ${item.borderColor} rounded-xl p-6 transition-all duration-200 hover:shadow-lg`}
								>
									<div
										className={`h-12 w-12 ${item.iconBg} flex items-center justify-center rounded-lg ${item.iconColor} mb-4`}
									>
										{item.icon}
									</div>
									<h3 className="mb-3 text-xl font-bold text-[#396131]">{item.title}</h3>
									<p className="leading-relaxed text-gray-600">{item.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Third Party Applications */}
				<section id="third-party" data-section className="bg-gray-50 py-20">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid items-center gap-12 lg:grid-cols-2">
							<div className="relative">
								<div className="flex h-80 items-center justify-center rounded-3xl border border-[#396131]/20 bg-[#396131]/10 p-12">
									<Laptop className="h-32 w-32 text-[#396131]" />
								</div>

								{/* Floating badges */}
								<div className="absolute -top-4 -right-4 animate-pulse rounded-full bg-[#396131] p-3 shadow-lg">
									<Globe className="h-5 w-5 text-white" />
								</div>
							</div>

							<div>
								<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#396131]/10 px-4 py-2 text-sm font-semibold text-[#396131]">
									<Laptop className="h-4 w-4" />
									External Links
								</div>

								<h2 className="mb-6 text-4xl font-bold text-[#396131] lg:text-5xl">
									Third Party Applications/Websites
								</h2>

								<p className="text-xl leading-relaxed text-gray-600">
									The Application may permit you to link to other applications or websites. Such
									third party applications/websites are not under 1st Valley Bank's control, and
									such links do not constitute an endorsement by 1st Valley Bank of those other
									applications/websites or the services offered through them. The privacy and
									security practices of such third party application/websites linked to the
									Application are not covered by this Privacy Statement, and 1st Valley Bank is not
									responsible for the privacy or security practices or the content of such websites.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Personal Information Access */}
				<section
					id="personal-access"
					data-section
					className="py-20 text-white"
					style={{
						background: 'linear-gradient(135deg, #396131 0%, #2d4a26 100%)'
					}}
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid items-center gap-12 lg:grid-cols-2">
							<div>
								<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
									<Eye className="h-4 w-4" />
									Data Access
								</div>

								<h2 className="mb-6 text-4xl font-bold lg:text-5xl">
									What Personal Information Can I Access?
								</h2>

								<p className="mb-8 text-xl leading-relaxed text-white/80">
									1st Valley Bank allows you to access the following information about you for the
									purpose of viewing, and in certain situations, updating that information. This
									list may change in the event the Application changes.
								</p>

								<div className="space-y-4">
									{[
										'Account and user profile information',
										'User e-mail address, if applicable',
										'Facebook profile information, if applicable',
										'User preferences',
										'Application specific data'
									].map((item, index) => (
										<div key={index} className="flex items-center gap-3 text-white/90">
											<CheckCircle className="h-5 w-5 text-white" />
											<span className="font-medium">{item}</span>
										</div>
									))}
								</div>
							</div>

							<div className="flex items-center justify-center">
								<div className="rounded-full border border-white/20 bg-white/10 p-16 backdrop-blur-sm">
									<Server className="h-32 w-32 text-white/80" />
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Children Policy */}
				<section id="children-policy" data-section className="bg-white py-20">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid items-center gap-12 lg:grid-cols-2">
							<div className="relative">
								<div className="flex h-80 items-center justify-center rounded-3xl border border-[#396131]/20 bg-[#396131]/10 p-12">
									<Baby className="h-32 w-32 text-[#396131]" />
								</div>

								{/* Floating badge */}
								<div className="absolute -top-4 -right-4 animate-pulse rounded-full bg-[#396131] p-3 shadow-lg">
									<Shield className="h-5 w-5 text-white" />
								</div>
							</div>

							<div>
								<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#396131]/10 px-4 py-2 text-sm font-semibold text-[#396131]">
									<Baby className="h-4 w-4" />
									Child Protection
								</div>

								<h2 className="mb-6 text-4xl font-bold text-[#396131] lg:text-5xl">
									Can Children Use The Application?
								</h2>

								<p className="text-xl leading-relaxed text-gray-600">
									Our site and the services available through 1st Valley Bank are not intended for
									children under the age of 13. 1st Valley Bank does not knowingly or specifically
									collect information about children under the age of 13 and believes that children
									of any age should get their parents' consent before giving out any personal
									information. We encourage you to participate in your child's web experience.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Privacy Statement Changes */}
				<section id="privacy-changes" data-section className="bg-gray-50 py-20">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid items-center gap-12 lg:grid-cols-2">
							<div>
								<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#396131]/10 px-4 py-2 text-sm font-semibold text-[#396131]">
									<Upload className="h-4 w-4" />
									Updates & Changes
								</div>

								<h2 className="mb-6 text-4xl font-bold text-[#396131] lg:text-5xl">
									Changes To This Privacy Statement
								</h2>

								<p className="text-xl leading-relaxed text-gray-600">
									1st Valley Bank may amend this Privacy Statement from time to time. Use of
									information we collect now is subject to the Privacy Statement in effect at the
									time such information is used. If we make changes in the way we use personal
									information, we will notify you by posting an announcement on our Site or sending
									you an email. Users are bound by any changes to the Privacy Statement when he or
									she uses or otherwise accesses the Application after such changes have been first
									posted.
								</p>
							</div>

							<div className="flex items-center justify-center">
								<div className="rounded-full border border-[#396131]/20 bg-[#396131]/10 p-16">
									<Upload className="h-32 w-32 text-[#396131]" />
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section
					className="py-20 text-white"
					style={{
						background: 'linear-gradient(135deg, #396131 0%, #2d4a26 100%)'
					}}
				>
					<div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
						<h2 className="mb-6 text-4xl font-bold lg:text-5xl">
							Questions About Our Privacy Policy?
						</h2>
						<p className="mx-auto mb-8 max-w-3xl text-xl text-white/80">
							If you have any questions about this Privacy Statement or our data handling practices,
							please don't hesitate to contact us.
						</p>
						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<NavLink
								to="/contact-us"
								className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-[#396131] shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100"
							>
								Contact Us
								<ArrowRight className="ml-2 h-5 w-5" />
							</NavLink>
							<NavLink
								to="/consumer-protection"
								className="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-[#396131]"
							>
								Consumer Protection Hub
							</NavLink>
						</div>
					</div>
				</section>

				{/* Back to Top Button */}
				<button
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					className={`fixed right-8 bottom-8 z-40 rounded-full bg-[#396131] p-3 text-white shadow-lg transition-all duration-200 hover:scale-110 hover:bg-[#2d4a26] ${
						scrollY > 400
							? 'translate-y-0 opacity-100'
							: 'pointer-events-none translate-y-4 opacity-0'
					}`}
				>
					<ArrowUp className="h-6 w-6" />
				</button>
			</main>
		</>
	);
}
