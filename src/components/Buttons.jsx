import React from 'react';
import { Link } from 'react-router-dom';

// Helper: detect both icons present
function hasBothIcons(primaryIcon, secondaryIcon) {
	return Boolean(primaryIcon) && Boolean(secondaryIcon);
}

function ButtonBase({ to, primaryIcon, secondaryIcon, children, className, ...rest }) {
	const hasBoth = hasBothIcons(primaryIcon, secondaryIcon);

	// Choose layout based on icon presence
	const content = hasBoth ? (
		// Both icons: Left-anchored primaryIcon+text, right-anchored secondaryIcon
		<div className="flex w-full items-center justify-between">
			<span className="flex min-w-0 items-center justify-start">
				{primaryIcon && <span className="flex flex-shrink-0 items-center">{primaryIcon}</span>}
				<span className="flex items-center truncate">{children}</span>
			</span>
			{secondaryIcon && (
				<span className="ml-auto flex flex-shrink-0 items-center transition-transform duration-300 group-hover:translate-x-1">
					{secondaryIcon}
				</span>
			)}
		</div>
	) : (
		// Otherwise: Center everything
		<span className="flex w-full items-center justify-center">
			{primaryIcon && <span className="mr-2 flex items-center">{primaryIcon}</span>}
			<span className="flex items-center">{children}</span>
			{secondaryIcon && <span className="ml-2 flex items-center">{secondaryIcon}</span>}
		</span>
	);

	const joinedClassName = [
		className,
		'flex' // Ensure "flex" for w-full justification
	]
		.filter(Boolean)
		.join(' ');

	if (to) {
		return (
			<Link to={to} className={joinedClassName} {...rest}>
				{content}
			</Link>
		);
	}
	return (
		<button type="button" className={joinedClassName} {...rest}>
			{content}
		</button>
	);
}

export function LightPrimaryButton(props) {
	return (
		<ButtonBase
			{...props}
			className={`group inline-flex transform cursor-pointer items-center rounded-xl bg-[#396131] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
				props.className || ''
			}`}
		/>
	);
}

export function LightSecondaryButton(props) {
	return (
		<ButtonBase
			{...props}
			className={`group inline-flex transform cursor-pointer items-center rounded-xl border border-[#396131]/30 bg-transparent px-8 py-4 text-base font-semibold text-[#396131] shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
				props.className || ''
			}`}
		/>
	);
}

export function DarkPrimaryButton(props) {
	return (
		<ButtonBase
			{...props}
			className={`group inline-flex transform cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/10 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
				props.className || ''
			}`}
		/>
	);
}

export function DarkSecondaryButton(props) {
	return (
		<ButtonBase
			{...props}
			className={`group inline-flex transform cursor-pointer items-center justify-center rounded-xl border border-white/30 bg-transparent px-8 py-4 text-base font-semibold text-white/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
				props.className || ''
			}`}
		/>
	);
}
