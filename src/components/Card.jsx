import React from 'react';

// Light background card container
export function LightCard({ className = '', children, useNativeSpacing = false, ...props }) {
	const baseClasses =
		'group relative transform rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl';
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
		'group relative flex flex-col rounded-2xl border border-white/10 bg-white/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl';
	const defaultSpacing = 'p-8';
	const classes = useNativeSpacing
		? `${baseClasses} ${className}` // use only the provided className for spacing
		: `${baseClasses} ${defaultSpacing} ${className}`; // add default spacing

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
}
