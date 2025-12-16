import React, { useEffect, useState } from 'react';
import landingService from '../../services/landingService';
import { DarkHeader } from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import logo from '/src/assets/logo.png';
import img1 from '/src/assets/carousel/1.png';


// Card for senior/product management officer (excerpted from AboutUs.jsx)
const OfficerCard = ({ officer }) => (
	<div
		className="group flex flex-col items-center justify-center gap-2 rounded-xl bg-white/10 p-2 shadow-md transition-all duration-300 hover:bg-white/20 hover:shadow-lg"
	>
		<img
			src={officer.image || logo}
			alt={officer.name}
			className="h-12 w-12 rounded-full bg-white object-cover shadow transition-transform duration-300 group-hover:scale-105"
		/>
		<div className="flex flex-col items-center">
			<span className="text-base leading-tight font-semibold text-white">
				{officer.name}
			</span>
			<span className="text-xs font-medium tracking-wide text-white/70 uppercase group-hover:text-white">
				{officer.position}
			</span>
		</div>
	</div>
);

// Card for the president, mimicking AboutUs.jsx
const PresidentCard = ({ president }) => (
	<div className="flex flex-col items-center gap-3">
		<div className="relative flex flex-col items-center justify-center gap-2">
			<div className="relative">
				<img
					src={president.image || logo}
					alt={president.name}
					className="h-20 w-20 rounded-full bg-white object-cover shadow-lg transition-transform duration-300 hover:scale-105"
				/>
			</div>
			<div className="flex flex-col items-center">
				<span className="text-center text-xl font-bold tracking-tight text-white">
					{president.name}
				</span>
				<span className="text-xs font-medium tracking-wide text-white/80 uppercase">
					{president.position}
				</span>
			</div>
		</div>
	</div>
);

// Skeleton loader, styled per AboutUs.jsx loading UI
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

// Main Leadership page (standalone)
const Leadership = () => {
	const [president, setPresident] = useState(null);
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
					// Filter by management level (senior or product_area) and sort by display_order
					const seniorOfficers = data.data
						.filter((officer) => officer.management_level === 'senior')
						.sort((a, b) => {
							// Sort by display_order first, then by name
							const orderA = a.display_order ?? 0;
							const orderB = b.display_order ?? 0;
							if (orderA !== orderB) {
								return orderA - orderB;
							}
							return (a.name || '').localeCompare(b.name || '');
						});
					const productOfficers = data.data
						.filter((officer) => officer.management_level === 'product_area')
						.sort((a, b) => {
							// Sort by display_order first, then by name
							const orderA = a.display_order ?? 0;
							const orderB = b.display_order ?? 0;
							if (orderA !== orderB) {
								return orderA - orderB;
							}
							return (a.name || '').localeCompare(b.name || '');
						});

					setPresident(seniorOfficers[0] || null);
					setSeniorManagement(seniorOfficers);
					setProductManagement(productOfficers);
					setLoading(false);
				}
			} catch (err) {
				console.error('Error fetching officers:', err);
				if (mountedRef.current) {
					setError('Failed to load leadership information. Please try again later.');
					setPresident(null);
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
				{/* Senior Management */}
				<div className="flex flex-col gap-8 mt-10">
					<span className="text-center text-xl leading-tight font-bold tracking-wider text-white/80 uppercase">
						Senior Management
					</span>
					{president && <PresidentCard president={president} />}
					{seniorManagement.length > 0 && (
						<div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-5 text-center md:grid-cols-3 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-6">
							{seniorManagement
								.filter((officer) => !president || officer.id !== president.id)
								.map((officer, i) => (
									<OfficerCard officer={officer} key={officer.id || i} />
								))}
						</div>
					)}
					{!president && seniorManagement.length === 0 && (
						<p className="text-center text-white/70 py-8">
							No senior management information available.
						</p>
					)}
				</div>

				{/* Product & Area Management */}
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
