import React from 'react';

// Header for light backgrounds
export function LightHeader({ badgeText, title, subtitle }) {
	return (
		<div className="mb-16 text-center">
			<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#396131]/10 px-6 py-3 text-sm font-semibold text-[#396131]">
				<span className="h-2 w-2 rounded-full bg-[#396131]" />
				{badgeText}
			</div>
			<h2 className="mb-6 text-4xl leading-tight font-bold text-[#185027] md:text-5xl">{title}</h2>
			<div className="mx-auto mb-6 h-1 w-24 rounded-full bg-[#396131]" />
			<p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-700">{subtitle}</p>
		</div>
	);
}

// Header for dark backgrounds
export function DarkHeader({ badgeText, title, subtitle }) {
	return (
		<div className="mb-16 text-center">
			<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#9FE870]/10 px-6 py-3 text-sm font-semibold text-white">
				<span className="h-2 w-2 rounded-full bg-white" />
				{badgeText}
			</div>
			<h2 className="mb-6 text-4xl leading-tight font-bold text-white md:text-5xl">{title}</h2>
			<div className="mx-auto mb-6 h-1 w-24 rounded-full bg-white" />
			<p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-300">{subtitle}</p>
		</div>
	);
}
