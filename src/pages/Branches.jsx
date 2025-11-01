import React, { useState, useEffect } from 'react';
import { MapPinned, Building2, Landmark, X, CreditCard, ArrowRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import { Link } from 'react-router-dom';
import { DarkCard } from '../components/Card';
import { DarkPrimaryButton } from '../components/Buttons';
import { DarkHeader } from '../components/Header';
import locationService from '../services/locationService';

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
			<div className="relative max-h-[80vh] w-full max-w-7xl overflow-y-auto rounded-xl bg-gradient-to-l from-[#396131] to-[#4a7c3a] p-8 shadow-2xl">
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
							atm={branch.atm}
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

	const fetchBranches = async () => {
		try {
			const response = await locationService.getBranches({ page: 1, page_size: 100 });
			console.log(response.data);
			setMindanaoBranches(response.data.filter((branch) => branch.region === 'mindanao'));
			setVisayasBranches(response.data.filter((branch) => branch.region === 'visayas'));
			setLuzonBranches(response.data.filter((branch) => branch.region === 'luzon'));
			setRegionalCenters(response.data.filter((branch) => branch.region === 'ncr'));
		} catch (error) {
			console.error('Failed to fetch branches:', error);
		}
	};

	useEffect(() => {
		fetchBranches({ region: 'mindanao' });
	}, []);

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
					atm={branch.atm}
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
			<div className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] px-4 py-20">
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
							{renderPreviewBranches(mindanaoBranches, Building2)}
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
							{renderPreviewBranches(visayasBranches, Building2)}
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
							{renderPreviewBranches(luzonBranches, Landmark)}
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
							{renderPreviewBranches(regionalCenters, Landmark)}
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
