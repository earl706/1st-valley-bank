import React, { useState } from 'react';
import { MapPinned, Building2, Landmark, X, CreditCard, ArrowRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import { Link } from 'react-router-dom';

const mindanaoBranches = [
	{
		name: 'Davao Branch',
		address: '123 J.P. Laurel Ave, Davao City',
		atm: false
	},
	{
		name: 'Cagayan de Oro Branch',
		address: '456 CM Recto Ave, CDO',
		atm: true
	},
	{
		name: 'General Santos Branch',
		address: '789 Santiago Blvd, GenSan',
		atm: false
	},
	{
		name: 'Butuan Branch',
		address: '101 J.C. Aquino Ave, Butuan City',
		atm: false
	},
	{
		name: 'Tagum Branch',
		address: '201 Apokon Rd, Tagum City',
		atm: false
	},
	{
		name: 'Iligan Branch',
		address: '301 Quezon Ave, Iligan City',
		atm: true
	}
];

const visayasBranches = [
	{
		name: 'Cebu Branch',
		address: '101 Ayala Center, Cebu City',
		atm: false
	},
	{
		name: 'Bacolod Branch',
		address: '202 Lacson St, Bacolod',
		atm: false
	},
	{
		name: 'Iloilo Branch',
		address: '303 Delgado St, Iloilo City',
		atm: false
	},
	{
		name: 'Dumaguete Branch',
		address: '404 Perdices St, Dumaguete',
		atm: false
	},
	{
		name: 'Tacloban Branch',
		address: '505 Real St, Tacloban City',
		atm: false
	},
	{
		name: 'Ormoc Branch',
		address: '606 Bonifacio St, Ormoc City',
		atm: false
	}
];

const regionalCenters = [
	{
		name: 'Head Office (National)',
		address: '555 Main Ave, Manila',
		atm: false
	},
	{
		name: 'Regional Center North',
		address: '888 North Ave, Quezon City',
		atm: false
	},
	{
		name: 'Regional Center South',
		address: '999 South St, Makati City',
		atm: false
	}
];

function BranchCard({ icon: Icon, name, address, onContact, atm }) {
	return (
		<div className="group relative flex flex-col items-start gap-4 rounded-xl border border-white/10 bg-white/10 p-5 shadow transition hover:shadow-md">
			{atm && (
				<p className="absolute top-3 right-3 flex items-center gap-1 rounded bg-green-100 px-2 py-0.5 text-xs leading-relaxed font-normal text-green-700">
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
			<Link
				to="/contact-us"
				className="group mt-auto inline-flex transform items-center justify-center rounded-xl border border-white/10 bg-white/10 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
				aria-label={`Contact ${name}`}
			>
				<span className="flex items-center">
					Contact Us
					<ArrowRight className="ml-3 h-5 w-5" />
				</span>
			</Link>
		</div>
	);
}

// Shows all branches for a section in a modal
function AllBranchesModal({ title, branches, icon: Icon, onContact, onClose }) {
	return (
		<div className="fixed inset-0 z-99 flex items-center justify-center bg-black/40">
			<div className="relative w-full max-w-7xl rounded-xl bg-gradient-to-l from-[#396131] to-[#4a7c3a] p-8 shadow-2xl">
				<button
					onClick={onClose}
					aria-label="Close"
					className="group absolute top-6 right-6 inline-flex transform cursor-pointer items-center justify-center text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-110"
				>
					<X className="h-5 w-5 text-white" />
				</button>
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
	const [visibleModal, setVisibleModal] = useState(null); // 'mindanao', 'visayas', 'regional', or null

	const handleContact = (branchName) => {
		// This is a stub for "Contact Us" - does nothing here
		alert(`Contact us about: ${branchName}`);
	};

	const modalProps = {
		mindanao: {
			title: 'All Mindanao Branches',
			branches: mindanaoBranches,
			icon: Building2
		},
		visayas: {
			title: 'All Visayas Branches',
			branches: visayasBranches,
			icon: Building2
		},
		regional: {
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
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">BRANCHES</h2>
					<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-white to-[#E9F2EA]"></div>
					<p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200">
						Find a branch or regional office near you – serving Mindanao, Visayas, and the entire
						nation.
					</p>
				</div>
				<section className="mx-auto max-w-7xl space-y-20">
					{/* Mindanao Section */}
					<section>
						<div className="mb-5 flex items-center justify-between">
							<h2 className="flex items-center gap-2 text-2xl font-bold text-white">
								<MapPinned className="h-6 w-6 text-white" />
								Mindanao Branches
							</h2>
							{mindanaoBranches.length > 3 && (
								<button
									className="group inline-flex transform cursor-pointer items-center rounded-xl border border-white/10 bg-white/10 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
									onClick={() => setVisibleModal('mindanao')}
									type="button"
								>
									<span className="flex items-center">
										See All
										<ArrowRight className="ml-3 h-5 w-5" />
									</span>
								</button>
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
								<button
									className="group inline-flex transform cursor-pointer items-center rounded-xl border border-white/10 bg-white/10 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
									onClick={() => setVisibleModal('visayas')}
									type="button"
								>
									<span className="flex items-center">
										See All
										<ArrowRight className="ml-3 h-5 w-5" />
									</span>
								</button>
							)}
						</div>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							{renderPreviewBranches(visayasBranches, Building2)}
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
								<button
									className="group inline-flex transform items-center rounded-xl bg-[#396131] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
									onClick={() => setVisibleModal('regional')}
									type="button"
								>
									<span className="flex items-center">
										See All
										<ArrowRight className="ml-3 h-5 w-5" />
									</span>
								</button>
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
