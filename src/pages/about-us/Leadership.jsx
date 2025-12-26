import React, { useEffect, useState, useMemo, memo, useRef, useLayoutEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { ChevronDown } from 'lucide-react';
import landingService from '../../services/landingService';
import { DarkHeader } from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import img1 from '/src/assets/carousel/1.png';

// Custom hook for responsive breakpoint detection
const useMediaQuery = (query) => {
	const getMatch = () =>
		typeof window !== 'undefined' && window.matchMedia
			? window.matchMedia(query).matches
			: false;

	const [matches, setMatches] = useState(getMatch);

	useEffect(() => {
		if (typeof window === 'undefined' || !window.matchMedia) return;
		const mql = window.matchMedia(query);
		const onChange = (e) => setMatches(e.matches);

		setMatches(mql.matches);

		if (mql.addEventListener) mql.addEventListener('change', onChange);
		else mql.addListener(onChange);

		return () => {
			if (mql.removeEventListener) mql.removeEventListener('change', onChange);
			else mql.removeListener(onChange);
		};
	}, [query]);

	return matches;
};

// Uniform card dimensions for org chart
const CARD_WIDTH = 'w-[200px] sm:w-[230px] md:w-[260px]';
const CARD_HEIGHT = 'h-[90px] sm:h-[105px] md:h-[120px]';

// Helper to get visual variant from hierarchy_level (from API)
const getVariantFromLevel = (hierarchyLevel) => {
	switch (hierarchyLevel) {
		case 0: return 'president';  // President/CEO
		case 1: return 'evp';        // C-Suite Officer
		default: return 'default';   // Senior/Junior Officer
	}
};

// Optimized officer card component with uniform dimensions
const OfficerCard = memo(({ officer }) => {
	// Visual variants for hierarchy distinction (same size, different styling)
	const variants = {
		president: {
			borderClass: 'border-2 border-white/60',
			bgClass: 'bg-gradient-to-br from-white/30 via-white/20 to-white/15',
			shadowClass: 'shadow-2xl',
		},
		evp: {
			borderClass: 'border-2 border-white/40',
			bgClass: 'bg-gradient-to-br from-white/20 via-white/15 to-white/10',
			shadowClass: 'shadow-xl',
		},
		default: {
			borderClass: 'border border-white/25',
			bgClass: 'bg-gradient-to-br from-white/12 via-white/10 to-white/8',
			shadowClass: 'shadow-md',
		}
	};

	// Use hierarchy_level from API to determine variant
	const variant = getVariantFromLevel(officer.hierarchy_level);
	const style = variants[variant] || variants.default;

	return (
		<div className="flex flex-col items-center">
			<div
				className={`${CARD_WIDTH} ${CARD_HEIGHT} ${style.bgClass} ${style.borderClass} ${style.shadowClass} group relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-white/60 backdrop-blur-sm overflow-hidden`}
			>
				{/* Content */}
				<div className="relative z-10 w-full flex flex-col items-center justify-center h-full">
					<span className="text-lg sm:text-xl md:text-2xl font-medium leading-tight text-white/90 text-center line-clamp-3">
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

// Memoized recursive node component for organizational chart
const OrgNode = memo(({ node, isRoot = false }) => {
	const hasChildren = node.children && node.children.length > 0;

	const label = useMemo(() => (
		<OfficerCard officer={node} />
	), [node]);

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

// Uniform card dimensions for mobile
const MOBILE_CARD_WIDTH = 'w-full';
const MOBILE_CARD_HEIGHT = 'min-h-[60px]';

// Mobile accordion card with uniform dimensions
const MobileOfficerCard = memo(({ officer }) => {
	const variants = {
		president: {
			borderClass: 'border-2 border-white/60',
			bgClass: 'bg-gradient-to-br from-white/30 via-white/20 to-white/15',
			shadowClass: 'shadow-2xl',
		},
		evp: {
			borderClass: 'border-2 border-white/40',
			bgClass: 'bg-gradient-to-br from-white/20 via-white/15 to-white/10',
			shadowClass: 'shadow-xl',
		},
		default: {
			borderClass: 'border border-white/25',
			bgClass: 'bg-gradient-to-br from-white/12 via-white/10 to-white/8',
			shadowClass: 'shadow-md',
		}
	};

	// Use hierarchy_level from API to determine variant
	const variant = getVariantFromLevel(officer.hierarchy_level);
	const style = variants[variant] || variants.default;

	return (
		<div
			className={`${MOBILE_CARD_WIDTH} ${MOBILE_CARD_HEIGHT} ${style.bgClass} ${style.borderClass} ${style.shadowClass} p-3 rounded-xl transition-all duration-300 hover:shadow-2xl hover:border-white/60 backdrop-blur-sm text-center flex items-center justify-center`}
		>
			<span className="text-xs font-medium leading-tight text-white/90 line-clamp-3">
				{officer.position}
			</span>
		</div>
	);
});

MobileOfficerCard.displayName = 'MobileOfficerCard';

// Mobile layout: Accordion-by-manager with grid of direct reports
const OrgChartMobile = memo(({ root }) => {
	const kids = root?.children || [];

	return (
		<div className="space-y-4 w-full">
			{/* Root node (President) */}
			<div className="flex justify-center px-4">
				<div className="w-full max-w-[280px]">
					<MobileOfficerCard officer={root} />
				</div>
			</div>

			{/* Connecting line from president */}
			{kids.length > 0 && (
				<div className="flex justify-center">
					<div className="w-px h-6 bg-white/40"></div>
				</div>
			)}

			{/* C-Suite managers as accordions */}
			{kids.length > 0 && (
				<div className="space-y-3 px-2">
					{kids.map((mgr) => {
						const reports = mgr.children || [];
						return (
							<details
								key={mgr.id || mgr.position}
								className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm group"
							>
								<summary className="cursor-pointer list-none p-3 select-none">
									<div className="flex items-center justify-between gap-3">
										<div className="flex-1">
											<MobileOfficerCard officer={mgr} />
										</div>
										<div className="flex flex-col items-center gap-1 pr-2">
											<ChevronDown 
												size={18} 
												className="text-white/60 transition-transform group-open:rotate-180" 
											/>
											{reports.length > 0 && (
												<span className="text-[10px] text-white/50">
													{reports.length} report{reports.length > 1 ? 's' : ''}
												</span>
											)}
										</div>
									</div>
								</summary>

								{reports.length > 0 && (
									<div className="px-3 pb-3 pt-1">
										{/* Connecting line */}
										<div className="flex justify-center mb-2">
											<div className="w-px h-4 bg-white/30"></div>
										</div>
										{/* Grid of direct reports */}
										<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
											{reports.map((rep) => (
												<MobileOfficerCard 
													key={rep.id || rep.position} 
													officer={rep} 
												/>
											))}
										</div>
									</div>
								)}
							</details>
						);
					})}
				</div>
			)}
		</div>
	);
});

OrgChartMobile.displayName = 'OrgChartMobile';

// Desktop layout: Auto-fit tree with scale transform
const OrgChartDesktop = memo(({ root }) => {
	const containerRef = useRef(null);
	const treeRef = useRef(null);
	const [scale, setScale] = useState(1);
	const [treeHeight, setTreeHeight] = useState('auto');

	// Auto-fit: measure tree dimensions and scale to fit container
	useLayoutEffect(() => {
		const container = containerRef.current;
		const tree = treeRef.current;
		if (!container || !tree) return;

		const updateScale = () => {
			// Reset scale to measure true dimensions
			tree.style.transform = 'scale(1)';
			
			const containerWidth = container.offsetWidth;
			const treeWidth = tree.scrollWidth;
			const treeNaturalHeight = tree.scrollHeight;

			let newScale = 1;
			if (treeWidth > containerWidth) {
				// Scale down to fit, with a minimum scale of 0.4
				newScale = Math.max(0.4, containerWidth / treeWidth);
			}

			setScale(newScale);
			// Adjust container height to match scaled tree height
			setTreeHeight(treeNaturalHeight * newScale);
			
			// Re-apply scale
			tree.style.transform = `scale(${newScale})`;
		};

		// Initial calculation (with small delay to ensure tree is rendered)
		const timeoutId = setTimeout(updateScale, 50);

		// Recalculate on resize
		const resizeObserver = new ResizeObserver(() => {
			requestAnimationFrame(updateScale);
		});
		resizeObserver.observe(container);

		return () => {
			clearTimeout(timeoutId);
			resizeObserver.disconnect();
		};
	}, [root]);

	return (
		<>
			<style>{`
				.org-chart-desktop { width: max-content; }
				.org-chart-desktop ul { background: transparent; padding-top: 16px; }
				.org-chart-desktop li::before, .org-chart-desktop li::after { border-color: rgba(255,255,255,0.4) !important; }
				.org-chart-desktop ul ul::before { border-color: rgba(255,255,255,0.4) !important; }
			`}</style>

			<div 
				ref={containerRef} 
				className="w-full overflow-visible relative"
				style={{ height: treeHeight }}
			>
				<div
					ref={treeRef}
					className="org-chart-desktop absolute left-1/2 top-0 transition-transform duration-300 ease-out"
					style={{
						transform: `scale(${scale})`,
						transformOrigin: 'top center',
						marginLeft: '-50%',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<OrgNode node={root} isRoot={true} />
				</div>
			</div>

		</>
	);
});

OrgChartDesktop.displayName = 'OrgChartDesktop';

// Main responsive org chart wrapper - accepts pre-built tree from API
const OrgChartCustom = memo(({ treeData }) => {
	const isDesktop = useMediaQuery('(min-width: 1024px)');

	if (!treeData) return null;

	return (
		<div className="w-full py-4 sm:py-6 md:py-8">
			{isDesktop ? (
				<OrgChartDesktop root={treeData} />
			) : (
				<OrgChartMobile root={treeData} />
			)}
		</div>
	);
});

OrgChartCustom.displayName = 'OrgChartCustom';

const Leadership = () => {
	const [orgChartData, setOrgChartData] = useState(null);
	const [productManagement, setProductManagement] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const mountedRef = { current: true };
		
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			
			try {
				// Fetch both org chart (pre-built tree) and product management (flat list) in parallel
				const [orgChartResponse, officersResponse] = await Promise.all([
					landingService.getOfficerOrgChart(),
					landingService.getProductAreaManagementOfficers({ management_level: 'product_area' })
				]);

				if (mountedRef.current) {
					// Org chart comes pre-built from the API
					setOrgChartData(orgChartResponse.data.org_chart);
					
					// Product officers - filter and sort (in case API doesn't filter by management_level)
					const productOfficers = (officersResponse.data || [])
						.filter((officer) => officer.management_level === 'product_area')
						.sort((a, b) => {
							const orderA = a.display_order ?? 0;
							const orderB = b.display_order ?? 0;
							if (orderA !== orderB) return orderA - orderB;
							return (a.name || '').localeCompare(b.name || '');
						});
					
					setProductManagement(productOfficers);
					setLoading(false);
				}
			} catch (err) {
				console.error('Error fetching leadership data:', err);
				if (mountedRef.current) {
					setError('Failed to load leadership information. Please try again later.');
					setOrgChartData(null);
					setProductManagement([]);
					setLoading(false);
				}
			}
		};
		
		fetchData();
		return () => {
			mountedRef.current = false;
		};
	}, []);

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
							<div className=" h-1 bg-white/40 mx-auto w-24 rounded-full"></div>
						</div>
						{orgChartData ? (
							<div className="w-auto mt-6 sm:mt-8 pb-8 sm:pb-12">
								{/* Responsive org chart - pre-built tree from API */}
								<OrgChartCustom treeData={orgChartData} />
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
					{/* <div className="flex flex-col gap-8 mt-16">
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
										className="bg-white/12 border border-white/25 p-4 shadow-md group relative flex flex-col items-center justify-center gap-2 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-white/60 backdrop-blur-sm overflow-hidden mx-auto
											w-[160px] h-[80px] sm:w-[180px] sm:h-[90px] md:w-[200px] md:h-[100px]" // uniform width and height at each breakpoint
									>
										<div className="relative z-10 w-full flex flex-col items-center justify-center h-full">
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
					</div> */}
				</div>
			</section>
		</>
	);
};

export default Leadership;
