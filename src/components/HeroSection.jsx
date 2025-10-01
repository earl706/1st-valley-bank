import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import carouselImg1 from '/src/assets/carousel/1.png';

export default function HeroSection({
	title,
	subtitle,
	description,
	features = [],
	image,
	imageAlt = '',
	ctaText = 'Learn More',
	ctaLink,
	showCta = true,
	backgroundColor = 'from-slate-50 via-white to-green-50',
	titleColor = 'from-[#396131] via-[#4a7c3a] to-[#5a8c4a]',
	className = ''
}) {
	return (
		<section
			className={`relative overflow-hidden bg-gradient-to-br ${backgroundColor} ${className}`}
		>
			{/* Background Elements */}
			<div className="absolute inset-0">
				<div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-[#396131]/20 to-[#4a7c3a]/20 blur-3xl"></div>
				<div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-green-400/20 to-[#396131]/20 blur-3xl"></div>
			</div>

			{/* Hero Content */}
			<div className="max-w-8xl relative mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
				<div className="mx-8 grid min-h-[560px] items-center gap-12 lg:mx-16 lg:min-h-[640px] lg:grid-cols-2">
					{/* Image/Visual */}
					<div className="relative order-0 flex h-full items-center justify-center lg:order-1">
						<div className="relative z-10">
							{carouselImg1 && (
								<img
									src={carouselImg1}
									alt={imageAlt}
									className="mx-auto h-auto w-full max-w-2xl transform drop-shadow-lg transition-all duration-700 hover:scale-110 hover:drop-shadow-2xl"
								/>
							)}
						</div>
					</div>

					{/* Content */}
					<div className="order-1 flex h-full flex-col justify-center space-y-8 lg:order-0">
						<div className="space-y-4">
							{/* Title */}
							<h1 className="text-2xl leading-tight font-bold text-gray-900 sm:text-3xl lg:text-4xl">
								{title && (
									<span
										className={`block bg-gradient-to-r ${titleColor} bg-clip-text text-3xl leading-tight font-black text-transparent sm:text-4xl lg:text-5xl`}
									>
										{title}
									</span>
								)}
								{subtitle && (
									<span
										className={`block bg-gradient-to-r ${titleColor} bg-clip-text text-lg leading-tight font-bold text-transparent sm:text-xl lg:text-2xl`}
									>
										{subtitle}
									</span>
								)}
							</h1>

							{/* Description */}
							{description && (
								<p className="max-w-2xl text-base leading-relaxed text-gray-600">{description}</p>
							)}

							{/* Features List */}
							{features.length > 0 && (
								<div className="pt-4">
									<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
										{features.map((feature, index) => (
											<div key={index} className="flex items-center gap-2">
												<div className="h-2 w-2 rounded-full bg-[#396131]"></div>
												<span className="text-xs text-gray-700">{feature}</span>
											</div>
										))}
									</div>
								</div>
							)}

							{/* CTA Button */}
							{showCta && ctaLink && (
								<div className="pt-6">
									<NavLink
										to={ctaLink}
										className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#396131] to-[#4a7c3a] px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
									>
										{ctaText}
										<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
									</NavLink>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
