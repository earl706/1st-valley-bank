import React, { useState, useEffect } from 'react';
import logo from '/src/assets/logo.png';

export default function SplashScreen({ onComplete }) {
	const [isVisible, setIsVisible] = useState(true);
	const [isExiting, setIsExiting] = useState(false);
	const [progress, setProgress] = useState(0);
	const [logoScale, setLogoScale] = useState(0.8);
	const [textOpacity, setTextOpacity] = useState(0);
	const [particles, setParticles] = useState([]);

	useEffect(() => {
		// Create floating particles
		const createParticles = () => {
			const newParticles = Array.from({ length: 20 }, (_, i) => ({
				id: i,
				x: Math.random() * 100,
				y: Math.random() * 100,
				size: Math.random() * 4 + 2,
				opacity: Math.random() * 0.5 + 0.2,
				animationDelay: Math.random() * 2
			}));
			setParticles(newParticles);
		};

		createParticles();

		// Logo entrance animation
		const logoTimer = setTimeout(() => {
			setLogoScale(1);
		}, 300);

		// Text fade in animation
		const textTimer = setTimeout(() => {
			setTextOpacity(1);
		}, 800);

		// Progress bar animation
		const progressInterval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(progressInterval);
					// Start exit animation
					setTimeout(() => {
						setIsExiting(true);
						// Call onComplete after exit animation completes
						setTimeout(() => {
							onComplete();
						}, 800); // Match the transition duration
					}, 500);
					return 100;
				}
				return prev + 2;
			});
		}, 50);

		return () => {
			clearTimeout(logoTimer);
			clearTimeout(textTimer);
			clearInterval(progressInterval);
		};
	}, [onComplete]);

	return (
		<div
			className={`fixed inset-0 z-99 flex flex-col items-center justify-center bg-gradient-to-br from-[#396131] via-[#4a7c3a] to-[#5a8c4a] transition-opacity duration-700 ease-in-out ${
				isExiting ? 'opacity-0' : 'opacity-100'
			}`}
		>
			{/* Background decorative elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
				<div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
				<div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl"></div>

				{/* Floating particles */}
				{particles.map((particle) => (
					<div
						key={particle.id}
						className="absolute animate-pulse rounded-full bg-white/20"
						style={{
							left: `${particle.x}%`,
							top: `${particle.y}%`,
							width: `${particle.size}px`,
							height: `${particle.size}px`,
							opacity: particle.opacity,
							animationDelay: `${particle.animationDelay}s`,
							animationDuration: '3s'
						}}
					></div>
				))}
			</div>

			{/* Main content */}
			<div className="relative z-10 flex flex-col items-center justify-center space-y-8">
				{/* Logo with animation */}
				<div
					className="transition-transform duration-700 ease-out"
					style={{ transform: `scale(${logoScale})` }}
				>
					<div className="relative">
						<img
							src={logo}
							alt="1st Valley Bank"
							className="h-32 w-auto drop-shadow-2xl sm:h-40 lg:h-48"
						/>
						{/* Glow effect */}
						<div className="absolute inset-0 h-32 w-auto rounded-full bg-white/20 blur-xl sm:h-40 lg:h-48"></div>
					</div>
				</div>

				{/* Bank name and tagline */}
				<div
					className="text-center transition-opacity duration-700"
					style={{ opacity: textOpacity }}
				>
					<h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
						1st Valley Bank
					</h1>
					<p className="text-sm text-white/80 sm:text-base lg:text-lg">A Development Bank</p>
					<p className="mt-2 text-xs text-white/60 sm:text-sm">Your Trusted Financial Partner</p>
				</div>

				{/* Loading progress bar */}
				<div className="w-64 sm:w-80">
					<div className="mb-2 flex justify-between text-xs text-white/70">
						<span>Loading</span>
						<span>{progress}%</span>
					</div>
					<div className="h-1 overflow-hidden rounded-full bg-white/20">
						<div
							className="h-full bg-white transition-all duration-300 ease-out"
							style={{ width: `${progress}%` }}
						></div>
					</div>
				</div>

				{/* Loading dots animation */}
				<div className="flex space-x-2">
					{[0, 1, 2].map((index) => (
						<div
							key={index}
							className="h-2 w-2 animate-pulse rounded-full bg-white/60"
							style={{
								animationDelay: `${index * 0.2}s`,
								animationDuration: '1.4s'
							}}
						></div>
					))}
				</div>
			</div>

			{/* Bottom text */}
			<div
				className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center transition-opacity duration-700"
				style={{ opacity: textOpacity }}
			>
				<p className="text-xs text-white/50 sm:text-sm">
					© 2024 1st Valley Bank. All rights reserved.
				</p>
			</div>
		</div>
	);
}
