import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
	Shield,
	Lock,
	FileText,
	AlertCircle,
	ChevronRight,
	Phone,
	Mail,
	MapPin,
	Clock,
	CheckCircle,
	Info,
	ArrowRight,
	BookOpen,
	Users,
	Award,
	Scale
} from 'lucide-react';
import {
	faShield,
	faFingerprint,
	faGem,
	faFileSignature,
	faHeadset,
	faScaleBalanced,
	faLock,
	faUserShield
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeroSection from '../components/HeroSection';
import img from '/src/assets/homepage/heroSectionImage.png';
import { DetailPageSkeleton, CardGridSkeleton } from '../components/PageSkeleton';

export default function ConsumerProtectionHub() {
	const [scrollY, setScrollY] = useState(0);
	const [loading, setLoading] = useState(true);

	// Simulate brief loading for static content
	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 300);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Show skeleton on initial load
	if (loading) {
		return <DetailPageSkeleton showHero={true} showContent={true} contentSections={4} />;
	}

	const protectionResources = [
		{
			icon: faFingerprint,
			title: 'Privacy Policy',
			description:
				'Your privacy matters at 1st Valley Bank. Learn how we safeguard your personal data with the highest standards of security, transparency, and integrity.',
			link: '/consumer-protection/privacy-policy',
			color: 'from-blue-500 to-blue-600',
			bgColor: 'bg-blue-50',
			borderColor: 'border-blue-200'
		},
		{
			icon: faGem,
			title: '1VB Products',
			description:
				'Explore our consumer protection initiative for each loan, deposit, and service. Know your rights and bank with confidence.',
			link: '/consumer-protection/1vb-products',
			color: 'from-green-500 to-green-600',
			bgColor: 'bg-green-50',
			borderColor: 'border-green-200'
		},
		{
			icon: faFileSignature,
			title: 'Product Requirements',
			description:
				'Stay fully informed about the requirements for each of our products, from loans to accounts. Make confident decisions with clear information.',
			link: '/consumer-protection/product-requirements',
			color: 'from-purple-500 to-purple-600',
			bgColor: 'bg-purple-50',
			borderColor: 'border-purple-200'
		}
	];

	const keyFeatures = [
		{
			icon: Shield,
			title: 'Data Security',
			description: 'State-of-the-art encryption and security measures to protect your information'
		},
		{
			icon: Scale,
			title: 'Fair Practices',
			description: 'Transparent and ethical banking practices in all our services'
		},
		{
			icon: Users,
			title: 'Customer Rights',
			description: 'Clear guidelines on your rights as our valued customer'
		},
		{
			icon: Award,
			title: 'Compliance',
			description: 'Full adherence to BSP regulations and consumer protection laws'
		}
	];

	const contactInfo = [
		{
			icon: Phone,
			title: 'Call Us',
			details: '(049) 562-8000',
			description: 'Mon-Fri: 8:00 AM - 5:00 PM'
		},
		{
			icon: Mail,
			title: 'Email Us',
			details: 'info@1stvalleybank.com',
			description: 'We respond within 24 hours'
		},
		{
			icon: MapPin,
			title: 'Visit Us',
			details: 'Batangas City',
			description: 'Multiple branches available'
		}
	];

	return (
		<main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
			{/* Hero Section */}
			<HeroSection
				title="Consumer Protection Hub"
				subtitle="Your Trust, Our Priority"
				description="At 1st Valley Bank, we're committed to protecting your rights, securing your data, and ensuring transparent, fair banking practices. Explore our comprehensive consumer protection resources below."
				image={img}
				imageAlt="Consumer Protection"
				showCta={false}
				backgroundColor="from-slate-50 via-white to-green-50"
				titleColor="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
			/>

			{/* Main Content */}
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
				{/* Introduction Section */}
				<section className="mb-16 text-center">
					<div className="mx-auto max-w-3xl">
						<div className="mb-6 inline-flex items-center justify-center rounded-full bg-[#396131]/10 p-4">
							<FontAwesomeIcon icon={faShield} className="h-12 w-12 text-[#396131]" />
						</div>
						<h2 className="mb-4 text-3xl font-bold text-[#396131] lg:text-4xl">
							Banking You Can Trust
						</h2>
						<p className="text-lg leading-relaxed text-slate-700">
							We believe in clear, transparent banking that puts you first. Our Consumer Protection
							Hub provides everything you need to understand your rights, protect your data, and
							make informed banking decisions.
						</p>
					</div>
				</section>

				{/* Key Features Grid */}
				<section className="mb-16">
					<h3 className="mb-8 text-center text-2xl font-bold text-[#396131] lg:text-3xl">
						Our Commitment to You
					</h3>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						{keyFeatures.map((feature, index) => (
							<div
								key={index}
								className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
							>
								<div className="mb-4 inline-flex rounded-lg bg-[#396131]/10 p-3">
									<feature.icon className="h-6 w-6 text-[#396131]" />
								</div>
								<h4 className="mb-2 font-semibold text-slate-900">{feature.title}</h4>
								<p className="text-sm text-slate-600">{feature.description}</p>
							</div>
						))}
					</div>
				</section>

				{/* Protection Resources Cards */}
				<section className="mb-16">
					<h3 className="mb-8 text-center text-2xl font-bold text-[#396131] lg:text-3xl">
						Explore Our Resources
					</h3>
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{protectionResources.map((resource, index) => (
							<NavLink
								key={index}
								to={resource.link}
								className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
							>
								{/* Background Gradient */}
								<div
									className={`absolute inset-0 bg-gradient-to-br ${resource.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
								></div>

								{/* Content */}
								<div className="relative">
									{/* Icon */}
									<div
										className={`mb-6 inline-flex rounded-2xl ${resource.bgColor} p-4 transition-all duration-300 group-hover:scale-110`}
									>
										<FontAwesomeIcon icon={resource.icon} className="h-10 w-10 text-[#396131]" />
									</div>

									{/* Title */}
									<h4 className="mb-3 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#396131]">
										{resource.title}
									</h4>

									{/* Description */}
									<p className="mb-6 leading-relaxed text-slate-600">{resource.description}</p>

									{/* CTA */}
									<div className="flex items-center font-semibold text-[#396131] transition-all duration-300 group-hover:gap-2">
										<span>Learn More</span>
										<ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
									</div>
								</div>

								{/* Border Animation */}
								<div
									className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${resource.color} scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100`}
								></div>
							</NavLink>
						))}
					</div>
				</section>

				{/* Important Information Banner */}
				<section className="mb-16">
					<div className="rounded-2xl border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50 p-8 shadow-sm">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 rounded-full bg-yellow-400/20 p-3">
								<Info className="h-6 w-6 text-yellow-700" />
							</div>
							<div className="flex-1">
								<h4 className="mb-2 text-lg font-bold text-yellow-900">Know Your Rights</h4>
								<p className="mb-4 leading-relaxed text-yellow-800">
									As a 1st Valley Bank customer, you have the right to:
								</p>
								<ul className="space-y-2 text-yellow-800">
									<li className="flex items-start gap-2">
										<CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-yellow-600" />
										<span>Transparent disclosure of all fees and charges</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-yellow-600" />
										<span>Privacy and security of your personal information</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-yellow-600" />
										<span>Fair treatment and respectful service</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-yellow-600" />
										<span>Access to complaint resolution mechanisms</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* Contact Section */}
				<section className="mb-16">
					<div className="rounded-2xl bg-gradient-to-br from-[#396131] to-[#4a7c3a] p-8 text-white shadow-xl lg:p-12">
						<div className="mb-8 text-center">
							<h3 className="mb-3 text-2xl font-bold lg:text-3xl">Need Help?</h3>
							<p className="text-green-100">
								Our consumer protection team is here to assist you with any concerns or questions.
							</p>
						</div>

						<div className="grid gap-6 md:grid-cols-3">
							{contactInfo.map((contact, index) => (
								<div
									key={index}
									className="rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
								>
									<div className="mb-4 inline-flex rounded-lg bg-white/20 p-3">
										<contact.icon className="h-6 w-6" />
									</div>
									<h4 className="mb-2 font-semibold">{contact.title}</h4>
									<p className="mb-1 text-lg font-bold text-green-100">{contact.details}</p>
									<p className="text-sm text-green-200">{contact.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* BSP Compliance Notice */}
				<section>
					<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 rounded-full bg-slate-100 p-3">
								<FontAwesomeIcon icon={faScaleBalanced} className="h-6 w-6 text-[#396131]" />
							</div>
							<div className="flex-1">
								<h4 className="mb-2 font-bold text-slate-900">BSP Regulated & Compliant</h4>
								<p className="text-sm leading-relaxed text-slate-600">
									1st Valley Bank is regulated by the Bangko Sentral ng Pilipinas (BSP) and fully
									complies with all consumer protection regulations. For concerns that remain
									unresolved, you may contact the BSP Financial Consumer Protection Department at{' '}
									<a
										href="tel:1-800-1-BSP-FCPD"
										className="font-semibold text-[#396131] hover:underline"
									>
										1-800-1-BSP-FCPD (1-800-1-277-3273)
									</a>{' '}
									or email{' '}
									<a
										href="mailto:consumeraffairs@bsp.gov.ph"
										className="font-semibold text-[#396131] hover:underline"
									>
										consumeraffairs@bsp.gov.ph
									</a>
									.
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}
