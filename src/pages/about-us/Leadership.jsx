import React, { useEffect, useState } from 'react';
import landingService from '../../services/landingService';
import { DarkHeader } from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import logo from '/src/assets/logo.png';
import img1 from '/src/assets/carousel/1.png';
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';

// Officer card with dynamic styling based on hierarchy level
const OfficerCard = ({ officer, variant = 'default' }) => {
	const variants = {
		president: {
			cardClass: 'bg-gradient-to-br from-white/25 to-white/15 border-2 border-white/40 p-6 min-w-[200px] max-w-[280px] shadow-xl',
			textClass: 'text-lg font-bold'
		},
		evp: {
			cardClass: 'bg-white/15 border border-white/30 p-5 min-w-[180px] max-w-[240px] shadow-lg',
			textClass: 'text-base font-semibold'
		},
		vp: {
			cardClass: 'bg-white/12 border border-white/25 p-4 min-w-[160px] max-w-[220px] shadow-md',
			textClass: 'text-sm font-semibold'
		},
		default: {
			cardClass: 'bg-white/10 border border-white/20 p-4 min-w-[140px] max-w-[200px] shadow-md',
			textClass: 'text-xs font-medium'
		}
	};

	const style = variants[variant] || variants.default;

	return (
		<div
			className={`
				group flex flex-col items-center justify-center gap-2 rounded-xl 
				transition-all duration-300 hover:shadow-xl hover:scale-105
				${style.cardClass}
			`}
		>
			<span className={`leading-tight text-white text-center break-words ${style.textClass}`}>
				{officer.position}
			</span>
		</div>
	);
};

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

// Helper to determine officer hierarchy level based on position title
function getOfficerLevel(position) {
	if (!position) return { level: 99, variant: 'default', label: 'Other' };
	const pos = position.toLowerCase();
	
	// Level 0: President/CEO
	if (/\b(president)\b/i.test(pos) && !/vice/i.test(pos)) {
		return { level: 0, variant: 'president', label: 'President' };
	}
	
	// Level 1: C-Suite Officers (Chief positions)
	if (/\b(chief|ceo|cfo|cto|coo|cio|cmo|cpo|cso|clo)\b/i.test(pos)) {
		return { level: 1, variant: 'evp', label: 'C-Suite Officer' };
	}
	
	// Level 2: Senior Officers (VPs, Directors, Heads, etc.)
	return { level: 2, variant: 'default', label: 'Senior Officer' };
}

// Organize officers into hierarchical structure
function organizeSeniorManagement(officers) {
	if (!officers || officers.length === 0) return {};

	// Sort officers by level, then display_order, then name
	const sorted = [...officers].sort((a, b) => {
		const levelA = getOfficerLevel(a.position).level;
		const levelB = getOfficerLevel(b.position).level;
		if (levelA !== levelB) return levelA - levelB;
		
		const orderA = a.display_order ?? 0;
		const orderB = b.display_order ?? 0;
		if (orderA !== orderB) return orderA - orderB;
		
		return (a.name || '').localeCompare(b.name || '');
	});

	// Group by hierarchy level
	const hierarchy = {};
	sorted.forEach(officer => {
		const { level, variant } = getOfficerLevel(officer.position);
		if (!hierarchy[level]) {
			hierarchy[level] = [];
		}
		hierarchy[level].push({ ...officer, variant });
	});

	return hierarchy;
}

// Convert hierarchy to react-orgchart data structure
function convertToOrgChartData(hierarchy) {
	if (!hierarchy || Object.keys(hierarchy).length === 0) return null;

	// President (Level 0)
	const president = hierarchy[0] && hierarchy[0][0];
	if (!president) return null;

	const root = {
		name: president.position,
		variant: president.variant,
		officer: president,
		children: []
	};

	// C-Suite Officers (Level 1)
	const cSuiteOfficers = hierarchy[1] || [];
	
	if (cSuiteOfficers.length > 0) {
		// Senior Officers (Level 2)
		const seniorOfficers = hierarchy[2] || [];
		const officersPerCSuite = Math.ceil(seniorOfficers.length / cSuiteOfficers.length);

		cSuiteOfficers.forEach((officer, index) => {
			const cSuiteNode = {
				name: officer.position,
				variant: officer.variant,
				officer: officer,
				children: []
			};

			// Distribute senior officers under C-Suite
			const start = index * officersPerCSuite;
			const end = Math.min(start + officersPerCSuite, seniorOfficers.length);
			const assignedOfficers = seniorOfficers.slice(start, end);

			assignedOfficers.forEach(seniorOfficer => {
				cSuiteNode.children.push({
					name: seniorOfficer.position,
					variant: seniorOfficer.variant,
					officer: seniorOfficer
				});
			});

			root.children.push(cSuiteNode);
		});
	} else {
		// If no C-Suite, put Senior Officers directly under President
		const seniorOfficers = hierarchy[2] || [];
		seniorOfficers.forEach(officer => {
			root.children.push({
				name: officer.position,
				variant: officer.variant,
				officer: officer
			});
		});
	}

	return root;
}

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

	if (loading) return <LoadingSkeleton />;
	if (error)
		return (
			<div className="flex flex-col min-h-[40vh] items-center justify-center text-white bg-gradient-to-l from-[#396131] to-[#4a7c3a]">
				<p className="mb-4 text-2xl font-bold">Leadership</p>
				<p className="text-red-200">{error}</p>
			</div>
		);

	// Organize senior management into hierarchical levels
	const hierarchy = organizeSeniorManagement(seniorManagement);
	const hierarchyLevels = Object.keys(hierarchy).sort((a, b) => Number(a) - Number(b));
	const orgChartData = convertToOrgChartData(hierarchy);

	// Custom node component for OrgChart
	const NodeComponent = ({ node }) => {
		return <OfficerCard officer={node.officer} variant={node.variant} />;
	};

	return (
		<>
			<style>{`
				.orgchart-container .orgchart {
					background: transparent;
				}
				.orgchart-container .orgchart .node {
					background: transparent;
					border: none;
					padding: 0;
				}
				.orgchart-container .orgchart .node:before,
				.orgchart-container .orgchart .node:after,
				.orgchart-container .orgchart .lines .downLine,
				.orgchart-container .orgchart .lines .leftLine,
				.orgchart-container .orgchart .lines .rightLine,
				.orgchart-container .orgchart .lines .topLine {
					background-color: rgba(255, 255, 255, 0.3);
					border-color: rgba(255, 255, 255, 0.3);
				}
				.orgchart-container .orgchart .lines {
					border-color: rgba(255, 255, 255, 0.3);
				}
			`}</style>
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

				{/* Senior Management Org Chart Section */}
				<div className="flex flex-col gap-8 mt-10">
					<span className="text-center text-xl leading-tight font-bold tracking-wider text-white/80 uppercase">
						Senior Management
					</span>
					{orgChartData ? (
						<div className="w-full mt-6 pb-8 overflow-x-auto">
							<div className="mx-auto flex justify-center min-w-max orgchart-container">
								<OrgChart 
									tree={orgChartData}
									NodeComponent={NodeComponent}
								/>
							</div>
						</div>
					) : (
						<p className="text-center text-white/70 py-8">
							No senior management information available.
						</p>
					)}
				</div>



					{/* Product & Area Management Section */}
					<div className="flex flex-col gap-8 mt-14">
						<span className="text-center text-xl leading-tight font-bold tracking-wider text-white/80 uppercase">
							Product &amp; Area Management
						</span>
						{productManagement.length > 0 ? (
							<div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-5 text-center md:grid-cols-3 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-6">
								{productManagement.map((officer, i) => (
									<OfficerCard officer={officer} key={officer.id || i} />
								))}
							</div>
						) : (
							<p className="text-center text-white/70 py-8">
								No product or area management information available.
							</p>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default Leadership;
