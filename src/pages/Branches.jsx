import React, { useMemo, useState, useEffect } from 'react';
import {
	MapPinned,
	Building2,
	Landmark,
	X,
	CreditCard,
	ArrowRight,
	MapPin,
	Search
} from 'lucide-react';
import HeroSection from '../components/HeroSection';
import { DarkCard } from '../components/Card';
import { DarkPrimaryButton } from '../components/Buttons';
import { DarkHeader } from '../components/Header';
import locationService from '../services/locationService';
import LocationsMap from '../components/LocationsMap';
import { findNearestLocation } from '../utils/geo';

function BranchCard({ icon: Icon, name, address, onContact, atm }) {
	return (
		<DarkCard className="relative flex flex-col items-start gap-4">
			{atm && (
				<p className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded bg-green-100 px-2 py-0.5 text-xs leading-relaxed font-normal text-green-700">
					<CreditCard className="inline h-4 w-4" /> ATM
				</p>
			)}
			<div className="flex w-full items-start gap-4">
				<span className="rounded-lg border border-white/10 bg-white/10 p-2">
					<Icon className="h-6 w-6 text-white transition group-hover:scale-110" />
				</span>
				<div>
					<h4 className="flex items-center gap-2 text-xl leading-tight font-bold text-white">
						{name}
					</h4>
					<p className="text-base leading-relaxed font-normal text-white/80">{address}</p>
				</div>
			</div>
			<DarkPrimaryButton
				to="/contact-us"
				className="mt-auto"
				aria-label={`Contact ${name}`}
				secondaryIcon={<ArrowRight className="ml-3 h-5 w-5" />}
			>
				Contact Us
			</DarkPrimaryButton>
		</DarkCard>
	);
}

// Shows all branches for a section in a modal
function AllBranchesModal({ title, branches, icon: Icon, onContact, onClose }) {
	return (
		<div className="fixed inset-0 z-99 flex items-center justify-center bg-black/40">
			<button
				onClick={onClose}
				aria-label="Close"
				className="absolute top-6 right-6 inline-flex transform cursor-pointer items-center justify-center rounded-full bg-white/10 p-2 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-110"
			>
				<X className="h-5 w-5 text-white" />
			</button>
			<div className="relative max-h-[80vh] w-full max-w-7xl overflow-y-auto rounded-xl bg-linear-to-l from-[#396131] to-[#4a7c3a] p-8 shadow-2xl">
				<h2 className="mb-6 flex items-center gap-2 text-3xl leading-tight font-bold text-white md:text-5xl">
					<Icon className="h-8 w-8 text-white" />
					{title}
				</h2>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					{branches.map((branch, idx) => (
						<BranchCard
							key={branch.name || idx}
							icon={Icon}
							name={branch.name}
							address={branch.address}
							atm={branch.has_atm}
							onContact={() => onContact(branch.name)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default function Branches() {
	const [branches, setBranches] = useState([]);
	const [visibleModal, setVisibleModal] = useState(null); // 'mindanao', 'visayas', 'regional', or null
	const [mindanaoBranches, setMindanaoBranches] = useState([]);
	const [visayasBranches, setVisayasBranches] = useState([]);
	const [luzonBranches, setLuzonBranches] = useState([]);
	const [regionalCenters, setRegionalCenters] = useState([]);
	const [allBranches, setAllBranches] = useState([]);
	const [locatorQuery, setLocatorQuery] = useState('');
	const [locatorLoading, setLocatorLoading] = useState(false);
	const [locatorMessage, setLocatorMessage] = useState('');
	const [userLocation, setUserLocation] = useState(null);
	const [nearestBranch, setNearestBranch] = useState(null);

	const fetchBranches = async () => {
		try {
			const result = await locationService.getBranches({ page: 1, page_size: 200 });
			if (!result.success) {
				console.error('Failed to fetch branches:', result.message || result.error);
				return;
			}
			const branchList = Array.isArray(result.data) ? result.data : [];
			setBranches(branchList);
			setAllBranches(branchList);
			setMindanaoBranches(branchList.filter((branch) => branch.region === 'mindanao'));
			setVisayasBranches(branchList.filter((branch) => branch.region === 'visayas'));
			setLuzonBranches(branchList.filter((branch) => branch.region === 'luzon'));
			setRegionalCenters(branchList.filter((branch) => branch.region === 'ncr'));
		} catch (error) {
			console.error('Failed to fetch branches:', error);
		}
	};

	useEffect(() => {
		fetchBranches({ region: 'mindanao' });
	}, []);

	const handleLocatorSubmit = async (event) => {
		event.preventDefault();
		if (!locatorQuery.trim()) {
			setLocatorMessage('Please enter an address to locate the nearest branch.');
			return;
		}

		setLocatorLoading(true);
		setLocatorMessage('');
		setNearestBranch(null);

		try {
			const result = await locationService.searchPlaces(locatorQuery, { limit: 5 });
			if (!result.success) {
				setLocatorMessage(result.message || 'Unable to search for that address.');
				return;
			}

			const [firstMatch] = result.data || [];
			if (!firstMatch) {
				setLocatorMessage('No matches found for that address. Please refine your search.');
				return;
			}

			const userPoint = {
				latitude: Number(firstMatch.latitude),
				longitude: Number(firstMatch.longitude),
				label: firstMatch.place_name
			};
			setUserLocation(userPoint);

			const nearest = findNearestLocation(userPoint, allBranches);
			if (nearest) {
				setNearestBranch(nearest);
				setLocatorMessage(
					`Closest branch: ${nearest.name} (${nearest.region?.toUpperCase() || 'Regional'}) — ${nearest.distanceKm.toFixed(
						2
					)} km away.`
				);
			} else {
				setLocatorMessage('No branch coordinates are available to compute the nearest branch.');
			}
		} catch (error) {
			console.error('Failed to locate address:', error);
			setLocatorMessage('Something went wrong while searching. Please try again later.');
		} finally {
			setLocatorLoading(false);
		}
	};

	const handleClearLocator = () => {
		setLocatorQuery('');
		setLocatorMessage('');
		setNearestBranch(null);
		setUserLocation(null);
	};

	const branchMarkers = useMemo(
		() =>
			allBranches
				.filter(
					(branch) =>
						branch.latitude !== null &&
						branch.latitude !== undefined &&
						branch.longitude !== null &&
						branch.longitude !== undefined
				)
				.map((branch) => ({
					id: `branch-${branch.id}`,
					name: branch.name,
					address: branch.address || '',
					subtitle: branch.region ? branch.region.toUpperCase() : '',
					latitude: Number(branch.latitude),
					longitude: Number(branch.longitude),
					type: 'branch'
				})),
		[allBranches]
	);

	const handleContact = (branchName) => {
		// This is a stub for "Contact Us" - does nothing here
		alert(`Contact us about: ${branchName}`);
	};

	const modalProps = {
		mindanao: {
			title: 'Mindanao Branches',
			branches: mindanaoBranches,
			icon: Building2
		},
		visayas: {
			title: 'Visayas Branches',
			branches: visayasBranches,
			icon: Building2
		},
		luzon: {
			title: 'Luzon Branches',
			branches: luzonBranches,
			icon: Landmark
		},
		ncr: {
			title: 'Regional & National Centers',
			branches: regionalCenters,
			icon: Landmark
		}
	};

	const renderPreviewBranches = (branches, Icon) =>
		branches
			.slice(0, 3)
			.map((branch) => (
				<BranchCard
					key={branch.name}
					icon={Icon}
					name={branch.name}
					address={branch.address}
					atm={branch.has_atm}
					onContact={() => handleContact(branch.name)}
				/>
			));

	return (
		<div className="min-h-screen bg-[#f6fbf8] pb-12">
			<HeroSection
				title="Bank Branches"
				subtitle="Find us across Mindanao, Visayas, and the regions"
				bgColor="#396131"
				textColor="#fff"
			/>
			<div className="bg-linear-to-l from-[#396131] to-[#4a7c3a] px-4 py-20">
				<DarkHeader
					badgeText="Our Network"
					title="Branches"
					subtitle="Find a branch or regional office near you. Serving Mindanao, Visayas, and the entire nation."
					alignment="center"
					level={2}
					className="mb-16"
				/>
				<section className="mx-auto max-w-7xl space-y-20">
					{/* Mindanao Section */}
					<section>
						<div className="mb-5 flex items-center justify-between">
							<h2 className="flex items-center gap-2 text-2xl font-bold text-white">
								<MapPinned className="h-6 w-6 text-white" />
								Mindanao Branches
							</h2>
							{mindanaoBranches.length > 3 && (
								<DarkPrimaryButton onClick={() => setVisibleModal('mindanao')}>
									<span className="flex items-center">
										See All
										<ArrowRight className="ml-3 h-5 w-5" />
									</span>
								</DarkPrimaryButton>
							)}
						</div>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							{mindanaoBranches.length === 0 ? (
								<div className="col-span-3 py-8 text-center text-white/80">
									No branches in Mindanao.
								</div>
							) : (
								renderPreviewBranches(mindanaoBranches, Building2)
							)}
						</div>
					</section>
					{/* Visayas Section */}
					<section>
						<div className="mb-5 flex items-center justify-between">
							<h2 className="flex items-center gap-2 text-2xl font-bold text-white">
								<MapPinned className="h-6 w-6 text-white" />
								Visayas Branches
							</h2>
							{visayasBranches.length > 3 && (
								<DarkPrimaryButton onClick={() => setVisibleModal('visayas')} type="button">
									<span className="flex items-center">
										See All
										<ArrowRight className="ml-3 h-5 w-5" />
									</span>
								</DarkPrimaryButton>
							)}
						</div>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							{visayasBranches.length === 0 ? (
								<div className="col-span-3 py-8 text-center text-white/80">
									No branches in Visayas.
								</div>
							) : (
								renderPreviewBranches(visayasBranches, Building2)
							)}
						</div>
					</section>
					{/* Luzon Section */}
					<section>
						<div className="mb-5 flex items-center justify-between">
							<h2 className="flex items-center gap-2 text-2xl font-bold text-white">
								<Landmark className="h-6 w-6 text-white" />
								Luzon Branches
							</h2>
							{luzonBranches.length > 3 && (
								<DarkPrimaryButton onClick={() => setVisibleModal('luzon')} type="button">
									<span className="flex items-center">
										See All
										<ArrowRight className="ml-3 h-5 w-5" />
									</span>
								</DarkPrimaryButton>
							)}
						</div>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							{luzonBranches.length === 0 ? (
								<div className="col-span-3 py-8 text-center text-white/80">
									No branches in Luzon.
								</div>
							) : (
								renderPreviewBranches(luzonBranches, Landmark)
							)}
						</div>
					</section>
					{/* Regional Section */}
					<section>
						<div className="mb-5 flex items-center justify-between">
							<h2 className="flex items-center gap-2 text-2xl font-bold text-white">
								<Landmark className="h-6 w-6 text-white" />
								Regional & National Centers
							</h2>
							{regionalCenters.length > 3 && (
								<DarkPrimaryButton onClick={() => setVisibleModal('ncr')} type="button">
									<span className="flex items-center">
										See All
										<ArrowRight className="ml-3 h-5 w-5" />
									</span>
								</DarkPrimaryButton>
							)}
						</div>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							{regionalCenters.length === 0 ? (
								<div className="col-span-3 py-8 text-center text-white/80">
									No regional or national centers found.
								</div>
							) : (
								renderPreviewBranches(regionalCenters, Landmark)
							)}
						</div>
					</section>

					<section className="rounded-3xl bg-white/90 p-8 shadow-xl backdrop-blur">
						<div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
							<h2 className="text-2xl font-semibold text-[#396131] md:text-3xl">
								Find the closest branch
							</h2>
							<p className="text-sm text-gray-600">
								Enter your address to locate the nearest 1st Valley Bank branch.
							</p>
						</div>
						<form onSubmit={handleLocatorSubmit} className="flex flex-col gap-3 md:flex-row">
							<div className="relative flex-1">
								<Search className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
								<input
									type="text"
									value={locatorQuery}
									onChange={(event) => setLocatorQuery(event.target.value)}
									placeholder="Street, city, or landmark..."
									disabled={locatorLoading}
									className="w-full rounded-xl border border-gray-200 bg-white px-10 py-3 text-sm text-gray-700 shadow focus:border-[#396131] focus:ring-2 focus:ring-[#396131]/20 focus:outline-none disabled:bg-gray-100"
								/>
							</div>
							<div className="flex gap-2">
								<button
									type="submit"
									disabled={locatorLoading}
									className="inline-flex items-center justify-center rounded-xl bg-[#396131] px-5 py-3 text-sm font-semibold text-white shadow hover:bg-[#2e4f29] disabled:cursor-not-allowed disabled:opacity-60"
								>
									{locatorLoading ? 'Locating...' : 'Locate branch'}
								</button>
								<button
									type="button"
									onClick={handleClearLocator}
									disabled={locatorLoading || (!userLocation && !nearestBranch && !locatorMessage)}
									className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
								>
									Clear
								</button>
							</div>
						</form>
						{locatorMessage && <p className="mt-4 text-sm text-gray-700">{locatorMessage}</p>}
						<div className="mt-8 overflow-hidden rounded-3xl">
							<LocationsMap
								markers={branchMarkers}
								userLocation={userLocation}
								selectedId={nearestBranch ? `branch-${nearestBranch.id}` : null}
								height={420}
							/>
						</div>
					</section>
				</section>
				{visibleModal && (
					<AllBranchesModal
						{...modalProps[visibleModal]}
						onContact={handleContact}
						onClose={() => setVisibleModal(null)}
					/>
				)}
			</div>
		</div>
	);
}
