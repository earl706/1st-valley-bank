import React from 'react';
import { User, Building, DollarSign, Shield, FileText } from 'lucide-react';
import { LightHeader } from './Header';

/**
 * RequirementsSection Component
 *
 * Displays requirements for deposit/loan products in a flexible format.
 * Supports both simple arrays and categorized requirements.
 *
 * @param {Object} props
 * @param {Array|Object} props.requirements - Requirements data. Can be:
 *   - Simple array: ["Item 1", "Item 2"]
 *   - Categorized array: [{category: "Individual", items: [...]}, ...]
 *   - Categorized object: {individual: [...], business: [...]}
 * @param {string} props.title - Section title (default: "Requirements")
 * @param {string} props.subtitle - Section subtitle
 * @param {string} props.badgeText - Badge text for header
 * @param {string} props.layout - Layout type: "two-column" | "single-column" | "cards" (default: "two-column")
 * @param {boolean} props.showIcons - Whether to show category icons (default: true)
 * @param {string} props.className - Additional CSS classes
 */
export default function RequirementsSection({
	requirements = [],
	title = 'Requirements',
	subtitle = 'What you need to get started',
	badgeText = null,
	layout = 'two-column',
	showIcons = true,
	className = ''
}) {
	// Icon mapping for common categories
	const categoryIcons = {
		individual: User,
		'individual requirements': User,
		business: Building,
		'business requirements': Building,
		corporate: Building,
		'corporate requirements': Building,
		investment: DollarSign,
		'investment requirements': DollarSign,
		'terms & conditions': Shield,
		'terms and conditions': Shield,
		default: FileText
	};

	// Normalize requirements data to a consistent format
	const normalizeRequirements = (reqs) => {
		if (!reqs || (Array.isArray(reqs) && reqs.length === 0)) {
			return [];
		}

		// If it's a simple array of strings
		if (Array.isArray(reqs) && typeof reqs[0] === 'string') {
			return [{ category: 'Requirements', items: reqs }];
		}

		// If it's an object with keys like {individual: [...], business: [...]}
		if (!Array.isArray(reqs) && typeof reqs === 'object') {
			return Object.entries(reqs).map(([category, items]) => ({
				category: category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' '),
				items: Array.isArray(items) ? items : []
			}));
		}

		// If it's an array of category objects
		if (Array.isArray(reqs)) {
			return reqs.map((item) => {
				if (typeof item === 'string') {
					return { category: 'Requirements', items: [item] };
				}
				if (typeof item === 'object' && item.items) {
					return {
						category: item.category || 'Requirements',
						items: Array.isArray(item.items) ? item.items : []
					};
				}
				return { category: 'Requirements', items: [] };
			});
		}

		return [];
	};

	const normalizedReqs = normalizeRequirements(requirements);

	if (normalizedReqs.length === 0) {
		return null;
	}

	const getIcon = (categoryName) => {
		const normalized = categoryName.toLowerCase();
		for (const [key, icon] of Object.entries(categoryIcons)) {
			if (normalized.includes(key)) {
				return icon;
			}
		}
		return categoryIcons.default;
	};

	// Render single column layout
	if (layout === 'single-column') {
		return (
			<section id="requirements" data-scroll className={`bg-white text-gray-900 ${className}`}>
				<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
					{badgeText && (
						<LightHeader
							badgeText={badgeText}
							title={title}
							subtitle={subtitle}
							alignment="left"
							level={3}
						/>
					)}
					{!badgeText && (
						<div className="mb-8">
							<h3 className="mb-2 text-2xl leading-tight font-bold text-gray-900">{title}</h3>
							{subtitle && <p className="text-base leading-relaxed text-gray-600">{subtitle}</p>}
						</div>
					)}
					<div className="space-y-6">
						{normalizedReqs.map((category, index) => {
							const IconComponent = showIcons ? getIcon(category.category) : null;
							return (
								<div key={index} className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
									{category.category && (
										<div className="mb-6 flex items-center gap-4">
											{IconComponent && <IconComponent className="h-8 w-8 text-gray-400" />}
											<h4 className="text-xl leading-tight font-bold">{category.category}</h4>
										</div>
									)}
									<ul className="space-y-4">
										{category.items.map((item, itemIndex) => (
											<li key={itemIndex} className="flex items-start gap-3">
												<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
												<span className="text-base leading-relaxed font-normal">{item}</span>
											</li>
										))}
									</ul>
								</div>
							);
						})}
					</div>
				</div>
			</section>
		);
	}

	// Render two-column layout (default)
	if (layout === 'two-column') {
		// Split categories into two columns
		const midPoint = Math.ceil(normalizedReqs.length / 2);
		const leftColumn = normalizedReqs.slice(0, midPoint);
		const rightColumn = normalizedReqs.slice(midPoint);

		return (
			<section id="requirements" data-scroll className={`bg-white text-gray-900 ${className}`}>
				<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
					{badgeText && (
						<LightHeader
							badgeText={badgeText}
							title={title}
							subtitle={subtitle}
							alignment="left"
							level={3}
						/>
					)}
					{!badgeText && (
						<div className="mb-8">
							<h3 className="mb-2 text-2xl leading-tight font-bold text-gray-900">{title}</h3>
							{subtitle && <p className="text-base leading-relaxed text-gray-600">{subtitle}</p>}
						</div>
					)}
					<div className="grid gap-8 md:grid-cols-2">
						{[leftColumn, rightColumn].map((column, colIndex) => (
							<div key={colIndex} className="space-y-8">
								{column.map((category, index) => {
									const IconComponent = showIcons ? getIcon(category.category) : null;
									return (
										<div key={index} className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
											{category.category && (
												<div className="mb-6 flex items-center gap-4">
													{IconComponent && <IconComponent className="h-8 w-8 text-gray-400" />}
													<h4 className="text-xl leading-tight font-bold">{category.category}</h4>
												</div>
											)}
											<ul className="space-y-4">
												{category.items.map((item, itemIndex) => (
													<li key={itemIndex} className="flex items-start gap-3">
														<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
														<span className="text-base leading-relaxed font-normal">{item}</span>
													</li>
												))}
											</ul>
										</div>
									);
								})}
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	// Render cards layout
	if (layout === 'cards') {
		return (
			<section id="requirements" data-scroll className={`bg-white text-gray-900 ${className}`}>
				<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
					{badgeText && (
						<LightHeader
							badgeText={badgeText}
							title={title}
							subtitle={subtitle}
							alignment="center"
							level={3}
						/>
					)}
					{!badgeText && (
						<div className="mb-8 text-center">
							<h3 className="mb-2 text-2xl leading-tight font-bold text-gray-900">{title}</h3>
							{subtitle && <p className="text-base leading-relaxed text-gray-600">{subtitle}</p>}
						</div>
					)}
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{normalizedReqs.map((category, index) => {
							const IconComponent = showIcons ? getIcon(category.category) : null;
							return (
								<div
									key={index}
									className="rounded-2xl border border-gray-100 bg-gray-50 p-8 transition-all duration-300 hover:shadow-lg"
								>
									{category.category && (
										<div className="mb-6 flex items-center gap-4">
											{IconComponent && (
												<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
													<IconComponent className="h-6 w-6 text-gray-600" />
												</div>
											)}
											<h4 className="text-xl leading-tight font-bold">{category.category}</h4>
										</div>
									)}
									<ul className="space-y-3">
										{category.items.map((item, itemIndex) => (
											<li key={itemIndex} className="flex items-start gap-3">
												<div className="mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
												<span className="text-sm leading-relaxed font-normal">{item}</span>
											</li>
										))}
									</ul>
								</div>
							);
						})}
					</div>
				</div>
			</section>
		);
	}

	return null;
}
