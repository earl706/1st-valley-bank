import React from 'react';
import { NavLink } from 'react-router-dom';
import {
	ArrowRight,
	Star,
	CheckCircle,
	Mail,
	Phone,
	MapPin,
	Handshake,
	Quote,
	Sparkles
} from 'lucide-react';

import img1 from '/src/assets/homepage/1.png';
import img2 from '/src/assets/homepage/2.png';
import img3 from '/src/assets/homepage/3.png';
import img4 from '/src/assets/homepage/4.png';
import img5 from '/src/assets/homepage/5.png';
import img6 from '/src/assets/homepage/6.png';
import logo from '/src/assets/logo.png';

export default function HomePage() {
	const services = [
		{
			image: img1,
			title: 'Savings & Deposits',
			description:
				'Secure your future with our comprehensive savings solutions designed to help you grow your wealth steadily.',
			features: ['High Interest Rates', 'Flexible Terms', 'Online Banking', 'Mobile App'],
			path: '/deposits',
			gradient: 'from-[#396131] to-[#4a7c3a]'
		},
		{
			image: img2,
			title: 'Loans & Credit',
			description:
				'Achieve your dreams with our flexible loan products tailored for businesses, agriculture, and personal needs.',
			features: ['Quick Approval', 'Competitive Rates', 'Flexible Payment', 'Expert Guidance'],
			path: '/loans',
			gradient: 'from-[#396131] to-[#4a7c3a]'
		},
		{
			image: img3,
			title: 'Properties',
			description:
				'Discover prime real estate and vehicle opportunities with our exclusive property listings and financing.',
			features: ['Prime Locations', 'Flexible Financing', 'Expert Valuation', 'Legal Support'],
			path: '/properties-for-sale',
			gradient: 'from-[#396131] to-[#4a7c3a]'
		}
	];

	const features = [
		{
			image: img4,
			title: 'Bank-Grade Security',
			description:
				'Your financial data is protected with industry-leading encryption and security measures.',
			stats: '99.9% Uptime'
		},
		{
			image: img5,
			title: 'Community Focused',
			description:
				'We understand local needs and provide personalized banking solutions for our community.',
			stats: '82+ Branches'
		},
		{
			image: img6,
			title: 'Growth Partner',
			description:
				'From startup to success, we support your business journey with tailored financial solutions.',
			stats: '25+ Years'
		}
	];

	const testimonials = [
		{
			name: 'Maria Santos',
			role: 'Small Business Owner',
			content:
				'1st Valley Bank helped me grow my business from a small sari-sari store to a thriving grocery chain. Their support is unmatched.',
			rating: 5,
			image: logo
		},
		{
			name: 'Juan Dela Cruz',
			role: 'Farmer',
			content:
				'The agricultural loan program gave me the capital I needed to expand my rice farm. Now I can provide for my family better.',
			rating: 5,
			image: logo
		},
		{
			name: 'Ana Rodriguez',
			role: 'Teacher',
			content:
				'Their home loan made my dream of owning a house come true. The process was smooth and the rates were very reasonable.',
			rating: 5,
			image: logo
		}
	];

	const stats = [
		{ number: '82+', label: 'Branches Nationwide' },
		{ number: '25+', label: 'Years of Service' },
		{ number: '500K+', label: 'Happy Customers' },
		{ number: '₱50B+', label: 'Assets Under Management' }
	];

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-green-50">
				{/* Background Elements */}
				<div className="absolute inset-0">
					<div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-[#396131]/20 to-[#4a7c3a]/20 blur-3xl"></div>
					<div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-green-400/20 to-[#396131]/20 blur-3xl"></div>
				</div>

				<div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
					<div className="grid items-center gap-12 lg:grid-cols-2">
						{/* Content */}
						<div className="space-y-8">
							<div className="space-y-4">
								<h1 className="text-4xl leading-tight font-bold text-gray-900 sm:text-5xl lg:text-6xl">
									Your Financial
									<span className="bg-gradient-to-r from-[#396131] to-[#4a7c3a] bg-clip-text text-transparent">
										{' '}
										Success
									</span>
									<br />
									is Our Mission
								</h1>

								<p className="max-w-2xl text-xl leading-relaxed text-gray-600">
									Experience banking that understands your dreams. From personal savings to business
									growth, we provide innovative solutions that help you achieve your financial
									goals.
								</p>
							</div>

							<div className="flex flex-col gap-4 sm:flex-row">
								<NavLink
									to="/consumer-protection/1vb-products"
									className="group inline-flex transform items-center justify-center rounded-xl bg-gradient-to-r from-[#396131] to-[#4a7c3a] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
								>
									Explore Services
									<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
								</NavLink>

								<NavLink
									to="/about-us"
									className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 px-8 py-4 font-semibold text-gray-700 transition-all duration-300 hover:border-[#396131] hover:text-[#396131]"
								>
									Learn More
								</NavLink>
							</div>
						</div>

						{/* Image */}
						<div className="relative">
							<div className="relative z-10">
								<img
									src={logo}
									alt="1st Valley Bank"
									className="mx-auto h-auto w-full max-w-lg drop-shadow-2xl"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section className="bg-white py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
							Comprehensive Banking Solutions
						</h2>
						<p className="mx-auto max-w-3xl text-xl text-gray-600">
							From personal banking to business growth, we offer a full range of financial services
							designed to meet your unique needs and help you achieve your goals.
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{services.map((service, index) => (
							<div
								key={index}
								className="group relative rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
							>
								{/* Service Image */}
								<div className="relative mb-6">
									<div className="h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#396131]/5 to-[#4a7c3a]/10">
										<img
											src={service.image}
											alt={service.title}
											className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
										/>
									</div>
									<div
										className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-xl opacity-10`}
									></div>
								</div>

								<h3 className="mb-4 text-2xl font-bold text-gray-900">{service.title}</h3>
								<p className="mb-6 leading-relaxed text-gray-600">{service.description}</p>

								<div className="mb-8 space-y-2">
									{service.features.map((feature, featureIndex) => (
										<div key={featureIndex} className="flex items-center text-sm text-gray-600">
											<CheckCircle className="mr-3 h-4 w-4 flex-shrink-0 text-[#396131]" />
											{feature}
										</div>
									))}
								</div>

								<NavLink
									to={service.path}
									className="group/btn inline-flex items-center font-semibold text-[#396131] transition-colors hover:text-[#4a7c3a]"
								>
									Learn More
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
								</NavLink>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="bg-gradient-to-br from-gray-50 to-green-50 py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
							Why Choose 1st Valley Bank?
						</h2>
						<p className="mx-auto max-w-3xl text-xl text-gray-600">
							We combine traditional banking values with modern technology to deliver exceptional
							service that puts you first.
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{features.map((feature, index) => (
							<div key={index} className="group text-center">
								<div className="relative mb-6">
									<div className="mx-auto h-32 w-32 overflow-hidden rounded-2xl bg-gradient-to-br from-[#396131]/10 to-[#4a7c3a]/20 shadow-lg transition-all duration-300 group-hover:shadow-xl">
										<img
											src={feature.image}
											alt={feature.title}
											className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
										/>
									</div>
									<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#396131]/20 to-[#4a7c3a]/20"></div>
								</div>

								<h3 className="mb-4 text-2xl font-bold text-gray-900">{feature.title}</h3>
								<p className="mb-4 leading-relaxed text-gray-600">{feature.description}</p>
								<div className="text-3xl font-bold text-[#396131]">{feature.stats}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="bg-white py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
							Trusted by Our Community
						</h2>
						<p className="mx-auto max-w-3xl text-xl text-gray-600">
							Hear from our valued customers who have experienced the difference of banking with 1st
							Valley Bank.
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{testimonials.map((testimonial, index) => (
							<div
								key={index}
								className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
							>
								<div className="mb-6 flex items-center">
									<div className="flex-shrink-0">
										<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#396131] to-[#4a7c3a]">
											<img
												src={testimonial.image}
												alt={testimonial.name}
												className="h-10 w-10 rounded-full object-cover"
											/>
										</div>
									</div>
									<div className="ml-4">
										<h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
										<p className="text-sm text-gray-600">{testimonial.role}</p>
									</div>
									<div className="ml-auto">
										<Quote className="h-8 w-8 text-[#396131]/30" />
									</div>
								</div>

								<div className="mb-4 flex">
									{[...Array(testimonial.rating)].map((_, i) => (
										<Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
									))}
								</div>

								<blockquote className="leading-relaxed text-gray-600 italic">
									"{testimonial.content}"
								</blockquote>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className="bg-gradient-to-r from-[#396131] to-[#4a7c3a] py-20">
				<div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
					<div className="space-y-8">
						<div className="inline-flex rounded-full bg-white/20 p-3 backdrop-blur-sm">
							<Mail className="h-8 w-8 text-white" />
						</div>

						<h2 className="text-3xl font-bold text-white sm:text-4xl">Stay Connected</h2>

						<p className="mx-auto max-w-2xl text-xl text-green-100">
							Get the latest financial tips, market insights, and exclusive offers delivered
							straight to your inbox.
						</p>

						<NavLink
							to="/newsletter"
							className="group inline-flex transform items-center rounded-xl bg-white px-8 py-4 font-semibold text-[#396131] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						>
							Subscribe to Newsletter
							<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
						</NavLink>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-white py-20">
				<div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
					<div className="space-y-8">
						<div className="inline-flex rounded-full bg-gradient-to-r from-[#396131] to-[#4a7c3a] p-3">
							<Handshake className="h-8 w-8 text-white" />
						</div>

						<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
							Ready to Start Your Financial Journey?
						</h2>

						<p className="mx-auto max-w-2xl text-xl text-gray-600">
							Join thousands of satisfied customers who trust 1st Valley Bank with their financial
							future. Let's build success together.
						</p>

						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<NavLink
								to="/contact-us"
								className="group inline-flex transform items-center justify-center rounded-xl bg-gradient-to-r from-[#396131] to-[#4a7c3a] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
							>
								Get Started Today
								<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
							</NavLink>

							<NavLink
								to="/about-us"
								className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 px-8 py-4 font-semibold text-gray-700 transition-all duration-300 hover:border-[#396131] hover:text-[#396131]"
							>
								Learn About Us
							</NavLink>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Info Section */}
			<section className="bg-gray-50 py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid gap-8 md:grid-cols-3">
						<div className="text-center">
							<div className="mb-4 inline-flex rounded-full bg-[#396131]/10 p-3">
								<Phone className="h-6 w-6 text-[#396131]" />
							</div>
							<h3 className="mb-2 text-lg font-semibold text-gray-900">Call Us</h3>
							<p className="text-gray-600">+63 (2) 123-4567</p>
						</div>

						<div className="text-center">
							<div className="mb-4 inline-flex rounded-full bg-[#396131]/10 p-3">
								<Mail className="h-6 w-6 text-[#396131]" />
							</div>
							<h3 className="mb-2 text-lg font-semibold text-gray-900">Email Us</h3>
							<p className="text-gray-600">info@1stvalleybank.com</p>
						</div>

						<div className="text-center">
							<div className="mb-4 inline-flex rounded-full bg-[#396131]/10 p-3">
								<MapPin className="h-6 w-6 text-[#396131]" />
							</div>
							<h3 className="mb-2 text-lg font-semibold text-gray-900">Visit Us</h3>
							<p className="text-gray-600">82+ Branches Nationwide</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
