import React, { useEffect, useState, useMemo, memo, useCallback } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { ChevronDown, ChevronUp } from 'lucide-react';
import landingService from '../../services/landingService';
import { DarkHeader } from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import logo from '/src/assets/logo.png';
import img1 from '/src/assets/carousel/1.png';

// Optimized officer card component with responsive design
const OfficerCard = memo(({ officer, collapsed, onCollapse, childrenCount = 0 }) => {
	// Responsive variants based on screen size and hierarchy level
	const variants = {
		president: {
			cardClass: 'bg-gradient-to-br from-white/30 via-white/20 to-white/15 border-2 border-white/50 p-3 sm:p-4 md:p-5 min-w-[140px] sm:min-w-[180px] md:min-w-[200px] max-w-[160px] sm:max-w-[240px] md:max-w-[280px] shadow-2xl',
			positionClass: 'text-xs sm:text-sm md:text-base font-semibold',
		},
		evp: {
			cardClass: 'bg-gradient-to-br from-white/20 via-white/15 to-white/10 border-2 border-white/40 p-2.5 sm:p-3 md:p-4 min-w-[120px] sm:min-w-[160px] md:min-w-[180px] max-w-[140px] sm:max-w-[200px] md:max-w-[240px] shadow-xl',
			positionClass: 'text-xs sm:text-sm font-semibold',
		},
		default: {
			cardClass: 'bg-gradient-to-br from-white/12 via-white/10 to-white/8 border border-white/25 p-2 sm:p-2.5 md:p-3 min-w-[100px] sm:min-w-[140px] md:min-w-[160px] max-w-[120px] sm:max-w-[160px] md:max-w-[200px] shadow-md',
			positionClass: 'text-[10px] sm:text-xs font-medium',
		}
	};

	const variant = officer.variant || 'default';
	const style = variants[variant] || variants.default;

	return (
		<div className="flex flex-col items-center">
			<div
				className={`${style.cardClass} group relative flex flex-col items-center justify-center gap-1 rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-white/60 backdrop-blur-sm overflow-hidden cursor-pointer`}
			>
				{/* Content */}
				<div className="relative z-10 w-full flex flex-col items-center px-1 sm:px-2">
					<span className={`${style.positionClass} leading-tight text-white/90 text-center break-words`}>
						{officer.position}
					</span>
				</div>
			</div>
		</div>
	);
});

OfficerCard.displayName = 'OfficerCard';

// Skeleton loader
const LoadingSkeleton = () => (
	<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-16 px-4">
		<div className="mb-10 h-6 w-40 animate-pulse rounded bg-white/20" />
		<div className="mb-6 h-8 w-80 animate-pulse rounded bg-white/20" />
		<div className="mb-4 h-4 w-56 animate-pulse rounded bg-white/20" />
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8 w-full max-w-2xl">
			{Array.from({ length: 4 }).map((_, i) => (
				<div key={i} className="h-36 rounded-xl bg-white/10 animate-pulse" />
			))}
		</div>
	</div>
);

// Optimized helper to determine officer hierarchy level (memoized pattern)
const getOfficerLevel = (() => {
	const cache = new Map();
	
	return (position) => {
		if (!position) return { level: 99, variant: 'default', label: 'Other' };
		
		// Check cache first
		if (cache.has(position)) {
			return cache.get(position);
		}
		
		const pos = position.toLowerCase();
		let result;

		// Level 0: President/CEO
		if (/\b(president)\b/i.test(pos) && !/vice/i.test(pos)) {
			result = { level: 0, variant: 'president', label: 'President' };
		}
		// Level 1: C-Suite Officers (Chief positions)
		else if (/\b(chief|ceo|cfo|cto|coo|cio|cmo|cpo|cso|clo)\b/i.test(pos)) {
			result = { level: 1, variant: 'evp', label: 'C-Suite Officer' };
		}
		// Level 2: Senior Officers (VPs, Directors, Heads, etc.)
		else {
			result = { level: 2, variant: 'default', label: 'Senior Officer' };
		}
		
		cache.set(position, result);
		return result;
	};
})();

// Optimized function to organize officers into hierarchical structure
const organizeSeniorManagement = (officers) => {
	if (!officers || officers.length === 0) return {};

	// Pre-process officers with level information (single pass)
	const officersWithLevel = officers.map(officer => ({
		...officer,
		...getOfficerLevel(officer.position)
	}));

	// Sort officers by level, then display_order, then name
	const sorted = [...officersWithLevel].sort((a, b) => {
		if (a.level !== b.level) return a.level - b.level;
		const orderA = a.display_order ?? 0;
		const orderB = b.display_order ?? 0;
		if (orderA !== orderB) return orderA - orderB;
		return (a.name || '').localeCompare(b.name || '');
	});

	// Group by hierarchy level in single pass
	const hierarchy = {};
	sorted.forEach((officer) => {
		if (!hierarchy[officer.level]) {
			hierarchy[officer.level] = [];
		}
		hierarchy[officer.level].push(officer);
	});

	return hierarchy;
};

// Optimized tree structure converter with memoization support
const convertToTreeData = (hierarchy) => {
	if (!hierarchy || !hierarchy[0] || hierarchy[0].length === 0) return null;

	const president = hierarchy[0][0];
	const cSuites = hierarchy[1] || [];
	const seniors = hierarchy[2] || [];

	// Build tree structure efficiently
	const root = {
		id: president.id,
		name: president.name,
		position: president.position,
		variant: president.variant,
		children: []
	};

	if (cSuites.length > 0) {
		// Distribute seniors evenly among C-Suites
		const officersPerCSuite = Math.ceil(seniors.length / cSuites.length);
		
		root.children = cSuites.map((cSuite, index) => {
			const start = index * officersPerCSuite;
			const end = Math.min(start + officersPerCSuite, seniors.length);
			const assignedSeniors = seniors.slice(start, end);

			return {
				id: cSuite.id,
				name: cSuite.name,
				position: cSuite.position,
				variant: cSuite.variant,
				children: assignedSeniors.map(senior => ({
					id: senior.id,
					name: senior.name,
					position: senior.position,
					variant: senior.variant,
					children: []
				}))
			};
		});
	} else if (seniors.length > 0) {
		// If no C-Suite, put seniors directly under President
		root.children = seniors.map(senior => ({
			id: senior.id,
			name: senior.name,
			position: senior.position,
			variant: senior.variant,
			children: []
		}));
	}

	return root;
};

// Memoized recursive node component for organizational chart
const OrgNode = memo(({ node, isRoot = false }) => {
	const [collapsed, setCollapsed] = useState(false);
	const hasChildren = node.children && node.children.length > 0 && !collapsed;

	const handleCollapse = useCallback(() => {
		setCollapsed(prev => !prev);
	}, []);

	const label = useMemo(() => (
		<OfficerCard
			officer={node}
			collapsed={collapsed}
			onCollapse={handleCollapse}
			childrenCount={node.children ? node.children.length : 0}
		/>
	), [node, collapsed, handleCollapse]);

	const children = useMemo(() => {
		if (!hasChildren || !node.children) return null;
		return node.children.map((child) => (
			<OrgNode key={child.id || child.position} node={child} isRoot={false} />
		));
	}, [hasChildren, node.children]);

	if (isRoot) {
		return (
			<Tree
				label={label}
				lineWidth="1px"
				lineColor="rgba(255, 255, 255, 0.4)"
				lineBorderRadius="8px"
			>
				{children}
			</Tree>
		);
	}

	return (
		<TreeNode label={label}>
			{children}
		</TreeNode>
	);
});

OrgNode.displayName = 'OrgNode';

// Optimized organizational chart component wrapper with responsive styles
const OrgChartCustom = memo(({ hierarchy }) => {
	const treeData = useMemo(() => convertToTreeData(hierarchy), [hierarchy]);

	if (!treeData) return null;

	return (
		<>
			<style>{`
				.org-chart {
					display: inline-block;
					width: 100%;
					max-width: 100%;
				}
				.org-chart ul {
					background: transparent;
					padding-top: 15px;
				}
				.org-chart li::before,
				.org-chart li::after {
					border-color: rgba(255, 255, 255, 0.4) !important;
				}
				.org-chart ul ul::before {
					border-color: rgba(255, 255, 255, 0.4) !important;
				}

			`}</style>
			<div className="w-full py-4 sm:py-6 md:py-8">
				<div className="overflow-x-auto overflow-y-visible -mx-4 px-4 sm:mx-auto sm:px-0">
					<div className="inline-block min-w-full">
						<div className="flex justify-center org-chart">
							<OrgNode node={treeData} isRoot={true} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
});

OrgChartCustom.displayName = 'OrgChartCustom';

const Leadership = () => {
	const [seniorManagement, setSeniorManagement] = useState([]);
	const [productManagement, setProductManagement] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const mountedRef = { current: true };
		const fetchProductAreaManagementOfficers = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await landingService.getProductAreaManagementOfficers();
				if (mountedRef.current) {
					const seniorOfficers = data.data
						.filter((officer) => officer.management_level === 'senior')
						.sort((a, b) => {
							const orderA = a.display_order ?? 0;
							const orderB = b.display_order ?? 0;
							if (orderA !== orderB) return orderA - orderB;
							return (a.name || '').localeCompare(b.name || '');
						});
					const productOfficers = data.data
						.filter((officer) => officer.management_level === 'product_area')
						.sort((a, b) => {
							const orderA = a.display_order ?? 0;
							const orderB = b.display_order ?? 0;
							if (orderA !== orderB) return orderA - orderB;
							return (a.name || '').localeCompare(b.name || '');
						});

					setSeniorManagement(seniorOfficers);
					setProductManagement(productOfficers);
					setLoading(false);
				}
			} catch (err) {
				console.error('Error fetching officers:', err);
				if (mountedRef.current) {
					setError('Failed to load leadership information. Please try again later.');
					setSeniorManagement([]);
					setProductManagement([]);
					setLoading(false);
				}
			}
		};
		fetchProductAreaManagementOfficers();
		return () => {
			mountedRef.current = false;
		};
	}, []);
	const hierarchy = useMemo(
		() => organizeSeniorManagement(seniorManagement),
		[seniorManagement]
	);

	if (loading) return <LoadingSkeleton />;
	if (error)
		return (
			<div className="flex flex-col min-h-[40vh] items-center justify-center text-white bg-gradient-to-l from-[#396131] to-[#4a7c3a]">
				<p className="mb-4 text-2xl font-bold">Leadership</p>
				<p className="text-red-200">{error}</p>
			</div>
		);

	return (
		<>
			<HeroSection
				title="Meet Our Leadership"
				subtitle="Corporate Leadership"
				description="Discover our experienced management team dedicated to driving our success."
				image={img1}
				imageAlt="1st Valley Bank Leadership"
				showCta={false}
				backgroundColor="from-[#E9F2EA] via-white to-green-50"
				titleColor="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
			/>
			<section
				id="corporate-profile"
				data-scroll
				className="relative flex flex-col gap-6 bg-gradient-to-l from-[#396131] to-[#4a7c3a] p-4 text-white shadow-2xl ring-1 ring-emerald-900/10 backdrop-blur-md sm:p-6 md:p-8 lg:p-10 xl:p-12"
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<DarkHeader
						badgeText="Corporate Profile"
						title="Meet Our Leadership"
						subtitle="Discover our experienced management team dedicated to driving our success."
					/>

					{/* Senior Management Org Chart Section - Responsive */}
					<div className="flex flex-col gap-6 sm:gap-8 mt-8 sm:mt-10 w-full">
						<div className="text-center">
							<span className="text-xl sm:text-2xl md:text-3xl leading-tight font-bold tracking-wide text-white uppercase mb-2 block px-4">
								Senior Management
							</span>
							<div className=" h-1 bg-white/40 mx-auto rounded-full"></div>
						</div>
						{hierarchy && hierarchy[0] && hierarchy[0].length > 0 ? (
							<div className="w-full mt-6 sm:mt-8 pb-8 sm:pb-12">
								{/* Responsive org chart with optimized rendering */}
								<OrgChartCustom hierarchy={hierarchy} />
							</div>
						) : (
							<div className="text-center py-8 sm:py-12">
								<p className="text-white/70 text-base sm:text-lg px-4">
									No senior management information available.
								</p>
							</div>
						)}
					</div>

					{/* Product & Area Management Section */}
					<div className="flex flex-col gap-8 mt-16">
						<div className="text-center">
							<span className="text-2xl md:text-3xl leading-tight font-bold tracking-wide text-white uppercase mb-2 block">
								Product &amp; Area Management
							</span>
							<div className="w-24 h-1 bg-white/40 mx-auto rounded-full"></div>
						</div>
						{productManagement.length > 0 ? (
							<div className="mt-8 grid grid-cols-2 gap-3 text-center md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
								{productManagement.map((officer, i) => (
									<div
										key={officer.id || i}
										className="bg-white/12 border border-white/25 p-4 min-w-[160px] max-w-[220px] shadow-md group relative flex flex-col items-center justify-center gap-2 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-white/60 backdrop-blur-sm overflow-hidden mx-auto"
									>
										<div className="relative z-10 w-full flex flex-col items-center">
											<span className="leading-tight text-white/90 text-center break-words text-xs">
												{officer.position}
											</span>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-12">
								<p className="text-white/70 text-lg">
									No product or area management information available.
								</p>
							</div>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default Leadership;
