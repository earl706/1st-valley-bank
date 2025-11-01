import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import {
	MapPin,
	MapPinned,
	Building2,
	Landmark,
	X,
	CreditCard,
	Contact2,
	Globe
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { DarkCard } from '../components/Card';
import { DarkPrimaryButton } from '../components/Buttons';
import locationService from '../services/locationService';

function ATMCard({ icon: Icon, name, address, onContact, atm }) {
	return (
		<DarkCard className="group relative flex flex-col items-start gap-4">
			{atm.is_24_hours && (
				<p className="absolute top-3 right-3 rounded bg-green-100 px-1 py-0.5 text-xs leading-tight font-normal text-green-700 lg:text-xs">
					<CreditCard className="inline h-4 w-4" /> 24 hours
				</p>
			)}
			<div className="flex w-full items-start gap-4">
				<span className="rounded-lg border border-white/10 bg-white/10 p-2">
					<Icon className="h-6 w-6 text-white transition group-hover:scale-110" />
				</span>
				<div>
					<h4 className="flex items-center gap-2 text-xl leading-tight font-bold text-white">
						{atm.name}
					</h4>
					<p className="text-base leading-relaxed font-normal text-white/80">{atm.address}</p>
				</div>
			</div>
		</DarkCard>
	);
}

// Shows all ATMs for a section in a modal
function AllATMsModal({ title, atms, icon: Icon, onContact, onClose }) {
	return (
		<div className="fixed inset-0 z-99 flex items-center justify-center bg-black/40">
			<button
				onClick={onClose}
				aria-label="Close"
				className="absolute top-4 right-4 cursor-pointer rounded-full bg-white/10 p-2 transition hover:bg-white/20"
			>
				<X className="h-5 w-5 text-white" />
			</button>
			<div className="relative w-full max-w-7xl rounded-xl bg-gradient-to-l from-[#396131] to-[#4a7c3a] p-8 shadow-2xl">
				<h2 className="mb-6 flex items-center gap-2 text-3xl leading-tight font-bold text-white md:text-5xl">
					<Icon className="h-6 w-6 text-white" />
					{title}
				</h2>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					{atms.map((atm, idx) => (
						<ATMCard
							key={atm.name || idx}
							icon={Icon}
							name={atm.name}
							address={atm.address}
							atm={atm}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default function ATMLocator() {
	const [atms, setATMs] = useState([]);
	const [visibleModal, setVisibleModal] = useState(null); // 'mindanao', 'visayas', 'regional', 'branchless', or null
	const [mindanaoATMs, setMindanaoATMs] = useState([]);
	const [visayasATMs, setVisayasATMs] = useState([]);
	const [luzonATMs, setLuzonATMs] = useState([]);
	const [ncrATMs, setNCRATMs] = useState([]);
	const [branchlessATMs, setBranchlessATMs] = useState([]);

	const fetchATMs = async () => {
		try {
			const response = await locationService.getATMs({ page_size: 100 });
			setATMs(response.data);
			setMindanaoATMs(
				response.data.filter((atm) => atm.branch && atm.branch.region === 'mindanao')
			);
			setVisayasATMs(response.data.filter((atm) => atm.branch && atm.branch.region === 'visayas'));
			setLuzonATMs(response.data.filter((atm) => atm.branch && atm.branch.region === 'luzon'));
			setNCRATMs(response.data.filter((atm) => atm.branch && atm.branch.region === 'ncr'));
			setBranchlessATMs(response.data.filter((atm) => !atm.branch || atm.branch.region === null));
		} catch (error) {
			console.error('Failed to fetch ATMs:', error);
		}
	};

	useEffect(() => {
		fetchATMs();
	}, []);

	const modalProps = {
		mindanao: {
			title: 'All Mindanao Branches with ATM',
			atms: mindanaoATMs,
			icon: MapPin
		},
		visayas: {
			title: 'All Visayas Branches with ATM',
			atms: visayasATMs,
			icon: MapPin
		},
		luzon: {
			title: 'All Luzon Branches with ATM',
			atms: luzonATMs,
			icon: MapPin
		},
		ncr: {
			title: 'All NCR Branches with ATM',
			atms: ncrATMs,
			icon: MapPin
		},
		branchless: {
			title: 'All Branchless ATM Locations',
			atms: branchlessATMs,
			icon: Globe
		}
	};

	const renderPreviewATMs = (atms, Icon) =>
		atms
			.slice(0, 3)
			.map((atm) => (
				<ATMCard key={atm.name} icon={Icon} name={atm.name} address={atm.address} atm={atm} />
			));

	return (
		<div className="min-h-screen bg-[#f6fbf8] pb-12">
			<HeroSection
				title="ATM Locator"
				subtitle="Find ATM-equipped branches in Mindanao, Visayas, the regions, and branchless locations"
				bgColor="#396131"
				textColor="#fff"
			/>
			<div className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] px-4 py-20">
				<div className="mb-16 text-center">
					<h1 className="mb-4 text-5xl leading-tight font-bold text-white md:text-6xl">
						ATM LOCATOR
					</h1>
					<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-white to-[#E9F2EA]"></div>
					<p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed font-normal text-gray-200">
						See which branches and stand-alone locations offer ATM facilities – across Mindanao,
						Visayas, the regions, and more.
					</p>
				</div>
				<section className="mx-auto max-w-7xl space-y-20">
					{/* Mindanao Section */}
					<section>
						<div className="mb-5 flex items-center justify-between">
							<h2 className="flex items-center gap-2 text-3xl leading-tight font-bold text-white md:text-5xl">
								<MapPinned className="h-7 w-7 text-white" />
								Mindanao ATMs
							</h2>
							{mindanaoATMs && mindanaoATMs.length > 3 && (
								<DarkPrimaryButton
									className="px-8 py-4 text-base"
									onClick={() => setVisibleModal('mindanao')}
									type="button"
								>
									See All
								</DarkPrimaryButton>
							)}
						</div>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							{renderPreviewATMs(mindanaoATMs, MapPin)}
						</div>
					</section>
					{/* Visayas Section */}
					<section>
						<div className="mb-5 flex items-center justify-between">
							<h2 className="flex items-center gap-2 text-3xl leading-tight font-bold text-white md:text-5xl">
								<MapPinned className="h-7 w-7 text-white" />
								Visayas ATMs
							</h2>
							{visayasATMs && visayasATMs.length > 3 && (
								<DarkPrimaryButton
									className="px-8 py-4 text-base"
									onClick={() => setVisibleModal('visayas')}
									type="button"
								>
									See All
								</DarkPrimaryButton>
							)}
						</div>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							{renderPreviewATMs(visayasATMs, MapPin)}
						</div>
					</section>
					{/* Luzon Section */}
					<section>
						<div className="mb-5 flex items-center justify-between">
							<h2 className="flex items-center gap-2 text-3xl leading-tight font-bold text-white md:text-5xl">
								<MapPinned className="h-7 w-7 text-white" />
								Luzon ATMs
							</h2>
							{luzonATMs && luzonATMs.length > 3 && (
								<DarkPrimaryButton
									className="px-8 py-4 text-base"
									onClick={() => setVisibleModal('luzon')}
									type="button"
								>
									See All
								</DarkPrimaryButton>
							)}
						</div>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							{renderPreviewATMs(luzonATMs, MapPin)}
						</div>
					</section>
					{/* NCR Section */}
					<section>
						<div className="mb-5 flex items-center justify-between">
							<h2 className="flex items-center gap-2 text-3xl leading-tight font-bold text-white md:text-5xl">
								<MapPinned className="h-7 w-7 text-white" />
								NCR ATMs
							</h2>
							{ncrATMs && ncrATMs.length > 3 && (
								<DarkPrimaryButton
									className="px-8 py-4 text-base"
									onClick={() => setVisibleModal('ncr')}
									type="button"
								>
									See All
								</DarkPrimaryButton>
							)}
						</div>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							{renderPreviewATMs(ncrATMs, MapPin)}
						</div>
					</section>
					{/* Branchless/Standalone ATMs Section */}
					{branchlessATMs && branchlessATMs.length > 0 && (
						<section>
							<div className="mb-5 flex items-center justify-between">
								<h2 className="flex items-center gap-2 text-3xl leading-tight font-bold text-white md:text-5xl">
									<Globe className="h-7 w-7 text-white" />
									Branchless ATM Locations
								</h2>
								{branchlessATMs.length > 3 && (
									<DarkPrimaryButton
										className="px-8 py-4 text-base"
										onClick={() => setVisibleModal('branchless')}
										type="button"
									>
										See All
									</DarkPrimaryButton>
								)}
							</div>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
								{renderPreviewATMs(branchlessATMs, Globe)}
							</div>
						</section>
					)}
				</section>
				{visibleModal && (
					<AllATMsModal
						{...modalProps[visibleModal]}
						onContact={undefined}
						onClose={() => setVisibleModal(null)}
					/>
				)}
			</div>
		</div>
	);
}
