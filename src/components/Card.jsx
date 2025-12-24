import React from 'react';

// Light background card container
export function LightCard({ className = '', children, useNativeSpacing = false, ...props }) {
	const baseClasses =
		'group relative transform rounded-2xl bg-white text-[#396131] shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl';
	const defaultSpacing = 'p-8 lg:p-10';
	const classes = useNativeSpacing
		? `${baseClasses} ${className}` // use only the provided className for spacing
		: `${baseClasses} ${defaultSpacing} ${className}`; // add default spacing

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
}

// Dark background card container
export function DarkCard({ className = '', children, useNativeSpacing = false, ...props }) {
	const baseClasses =
		'group relative rounded-2xl border border-white/10 bg-[#E9F2EA]  shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl';
	const defaultSpacing = 'p-8 lg:p-10';
	const classes = useNativeSpacing
		? `${baseClasses} ${className}` // use only the provided className for spacing
		: `${baseClasses} ${defaultSpacing} ${className}`; // add default spacing

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
}
