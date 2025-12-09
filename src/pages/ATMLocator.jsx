import React, { useMemo, useState, useEffect, useCallback } from 'react';
import PageHeroSection from '../components/PageHeroSection';
import { MapPin, MapPinned, Building2, Landmark, X, CreditCard, Globe } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { DarkCard } from '../components/Card';
import { DarkPrimaryButton } from '../components/Buttons';
import locationService from '../services/locationService';
import LocationsMap from '../components/LocationsMap';
import { ProductListingPageSkeleton, MapSkeleton } from '../components/PageSkeleton';

const PSGC_API_BASE = 'https://psgc.gitlab.io/api';

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
			<div className="relative w-full max-w-7xl rounded-xl bg-linear-to-l from-[#396131] to-[#4a7c3a] p-8 shadow-2xl">
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
	const [userLocation, setUserLocation] = useState(null);
	const [nearestATM, setNearestATM] = useState(null);
	const [locatorLoading, setLocatorLoading] = useState(false);
	const [locatorMessage, setLocatorMessage] = useState('');
	const [activeMarkerId, setActiveMarkerId] = useState(null);
	const [provinceOptions, setProvinceOptions] = useState([]);
	const [provinceLoading, setProvinceLoading] = useState(false);
	const [cityOptions, setCityOptions] = useState([]);
	const [cityLoading, setCityLoading] = useState(false);
	const [barangayOptions, setBarangayOptions] = useState([]);
	const [barangayLoading, setBarangayLoading] = useState(false);
	const [selectedProvince, setSelectedProvince] = useState('');
	const [selectedCity, setSelectedCity] = useState('');
	const [selectedBarangay, setSelectedBarangay] = useState('');
	const [addressFieldError, setAddressFieldError] = useState('');
	const [loading, setLoading] = useState(true);

	const fetchATMs = async () => {
		try {
			setLoading(true);
			const result = await locationService.getATMs({ page_size: 200 });
			if (!result.success) {
				console.error('Failed to fetch ATMs:', result.message || result.error);
				return;
			}
			const atmList = Array.isArray(result.data.results) ? result.data.results : [];
			setATMs(atmList);
			setMindanaoATMs(atmList.filter((atm) => atm.branch && atm.branch.region === 'mindanao'));
			setVisayasATMs(atmList.filter((atm) => atm.branch && atm.branch.region === 'visayas'));
			setLuzonATMs(atmList.filter((atm) => atm.branch && atm.branch.region === 'luzon'));
			setNCRATMs(atmList.filter((atm) => atm.branch && atm.branch.region === 'ncr'));
			setBranchlessATMs(atmList.filter((atm) => !atm.branch || atm.branch.region === null));
		} catch (error) {
			console.error('Failed to fetch ATMs:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchATMs();
	}, []);

	useEffect(() => {
		const controller = new AbortController();

		const loadProvinces = async () => {
			setProvinceLoading(true);
			try {
				const response = await fetch(`${PSGC_API_BASE}/provinces/`, {
					signal: controller.signal
				});
				if (!response.ok) {
					throw new Error(`Failed to load provinces: ${response.status}`);
				}
				const data = await response.json();
				const formatted = (Array.isArray(data) ? data : [])
					.map((province) => ({
						code: province.code,
						name: province.name,
						regionName: province.regionName
					}))
					.sort((a, b) => a.name.localeCompare(b.name));
				setProvinceOptions(formatted);
				setAddressFieldError('');
			} catch (error) {
				if (error.name !== 'AbortError') {
					console.error('Failed to load provinces:', error);
					setAddressFieldError('Unable to load provinces. Please refresh the page.');
				}
			} finally {
				setProvinceLoading(false);
			}
		};

		loadProvinces();

		return () => controller.abort();
	}, []);

	useEffect(() => {
		if (!selectedProvince) {
			return;
		}

		const controller = new AbortController();

		const loadCities = async () => {
			setCityLoading(true);
			try {
				const response = await fetch(
					`${PSGC_API_BASE}/provinces/${selectedProvince}/cities-municipalities/`,
					{ signal: controller.signal }
				);
				if (!response.ok) {
					throw new Error(`Failed to load cities: ${response.status}`);
				}
				const data = await response.json();
				const formatted = (Array.isArray(data) ? data : [])
					.map((city) => ({
						code: city.code,
						name: city.name,
						isCity: city.isCity
					}))
					.sort((a, b) => a.name.localeCompare(b.name));
				setCityOptions(formatted);
				setAddressFieldError('');
			} catch (error) {
				if (error.name !== 'AbortError') {
					console.error('Failed to load cities/municipalities:', error);
					setAddressFieldError(
						'Unable to load cities or municipalities for the selected province.'
					);
				}
			} finally {
				setCityLoading(false);
			}
		};

		loadCities();

		return () => controller.abort();
	}, [selectedProvince]);

	useEffect(() => {
		if (!selectedCity) {
			return;
		}

		const controller = new AbortController();

		const loadBarangays = async () => {
			setBarangayLoading(true);
			try {
				const response = await fetch(
					`${PSGC_API_BASE}/cities-municipalities/${selectedCity}/barangays/`,
					{ signal: controller.signal }
				);
				if (!response.ok) {
					throw new Error(`Failed to load barangays: ${response.status}`);
				}
				const data = await response.json();
				const formatted = (Array.isArray(data) ? data : [])
					.map((barangay) => ({
						code: barangay.code,
						name: barangay.name
					}))
					.sort((a, b) => a.name.localeCompare(b.name));
				setBarangayOptions(formatted);
				setAddressFieldError('');
			} catch (error) {
				if (error.name !== 'AbortError') {
					console.error('Failed to load barangays:', error);
					setAddressFieldError('Unable to load barangays for the selected city or municipality.');
				}
			} finally {
				setBarangayLoading(false);
			}
		};

		loadBarangays();

		return () => controller.abort();
	}, [selectedCity]);

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

	const atmMarkers = useMemo(
		() =>
			atms
				.filter(
					(atm) =>
						atm.latitude !== null &&
						atm.latitude !== undefined &&
						atm.longitude !== null &&
						atm.longitude !== undefined
				)
				.map((atm) => ({
					id: `atm-${atm.id}`,
					name: atm.name,
					address: atm.address || '',
					subtitle: atm.branch?.name ? `Branch: ${atm.branch.name}` : undefined,
					latitude: Number(atm.latitude),
					longitude: Number(atm.longitude),
					type: 'atm',
					raw: atm
				})),
		[atms]
	);

	const selectedProvinceOption = useMemo(
		() => provinceOptions.find((province) => province.code === selectedProvince) || null,
		[provinceOptions, selectedProvince]
	);

	const selectedCityOption = useMemo(
		() => cityOptions.find((city) => city.code === selectedCity) || null,
		[cityOptions, selectedCity]
	);

	const selectedBarangayOption = useMemo(
		() => barangayOptions.find((barangay) => barangay.code === selectedBarangay) || null,
		[barangayOptions, selectedBarangay]
	);

	const locatorQuery = useMemo(() => {
		if (!selectedProvinceOption || !selectedCityOption || !selectedBarangayOption) {
			return '';
		}

		return `${selectedBarangayOption.name}, ${selectedCityOption.name}, ${selectedProvinceOption.name}, Philippines`;
	}, [selectedProvinceOption, selectedCityOption, selectedBarangayOption]);

	const isLocateDisabled =
		locatorLoading ||
		provinceLoading ||
		cityLoading ||
		barangayLoading ||
		!selectedProvinceOption ||
		!selectedCityOption ||
		!selectedBarangayOption;

	const canClearLocator = Boolean(
		selectedProvince ||
			selectedCity ||
			selectedBarangay ||
			userLocation ||
			nearestATM ||
			locatorMessage
	);

	const handleProvinceChange = (event) => {
		const value = event.target.value;
		setSelectedProvince(value);
		setSelectedCity('');
		setSelectedBarangay('');
		setCityOptions([]);
		setBarangayOptions([]);
		setAddressFieldError('');
		setLocatorMessage('');
	};

	const handleCityChange = (event) => {
		const value = event.target.value;
		setSelectedCity(value);
		setSelectedBarangay('');
		setBarangayOptions([]);
		setAddressFieldError('');
		setLocatorMessage('');
	};

	const handleBarangayChange = (event) => {
		setSelectedBarangay(event.target.value);
		setAddressFieldError('');
		setLocatorMessage('');
	};

	const handleLocatorSubmit = async (event) => {
		event.preventDefault();
		if (!locatorQuery) {
			setAddressFieldError(
				'Please select a Province, City/Municipality, and Barangay to locate the nearest ATM.'
			);
			return;
		}

		setLocatorLoading(true);
		setLocatorMessage('');
		setAddressFieldError('');
		setNearestATM(null);

		try {
			const payload = {
				address: locatorQuery,
				province: selectedProvinceOption?.name || '',
				municipality: selectedCityOption?.name || '',
				barangay: selectedBarangayOption?.name || ''
			};

			const result = await locationService.findNearestATMByAddress(payload);
			if (!result.success) {
				setLocatorMessage(
					result.message || 'Unable to determine the nearest ATM. Please try again later.'
				);
				setActiveMarkerId(null);
				setUserLocation(null);
				return;
			}

			const { nearest_atm: atm, query } = result.data || {};
			if (!atm) {
				setLocatorMessage('No ATM coordinates are available to compute the nearest ATM.');
				setActiveMarkerId(null);
				setUserLocation(null);
				return;
			}

			const distanceValue = Number(atm.distance_km ?? atm.distanceKm);
			const formattedATM = {
				...atm,
				distanceKm: Number.isFinite(distanceValue) ? distanceValue : null
			};
			setNearestATM(formattedATM);

			if (
				query &&
				query.latitude !== undefined &&
				query.longitude !== undefined &&
				query.latitude !== null &&
				query.longitude !== null
			) {
				setUserLocation({
					latitude: Number(query.latitude),
					longitude: Number(query.longitude),
					label: query.address || locatorQuery
				});
			} else {
				setUserLocation(null);
			}

			const markerId = `atm-${atm.id}`;
			const markerExists = atms?.some?.((existing) => existing.id === atm.id);
			setActiveMarkerId(markerExists ? markerId : null);

			const descriptor = atm.branch?.name ? `in ${atm.branch.name}` : 'standalone location';
			let message = `Closest ATM: ${atm.name} (${descriptor})`;
			if (Number.isFinite(formattedATM.distanceKm)) {
				message += ` — ${formattedATM.distanceKm.toFixed(2)} km away.`;
			} else {
				message += '.';
			}
			setLocatorMessage(message);
		} catch (error) {
			console.error('Failed to locate ATM:', error);
			setLocatorMessage('Something went wrong while searching. Please try again later.');
			setActiveMarkerId(null);
			setUserLocation(null);
		} finally {
			setLocatorLoading(false);
		}
	};

	const handleClearLocator = () => {
		setSelectedProvince('');
		setSelectedCity('');
		setSelectedBarangay('');
		setCityOptions([]);
		setBarangayOptions([]);
		setLocatorMessage('');
		setNearestATM(null);
		setUserLocation(null);
		setActiveMarkerId(null);
		setAddressFieldError('');
	};

	const handleMarkerSelect = useCallback((marker) => {
		if (!marker || marker.id === 'user') return;
		setActiveMarkerId(marker.id);
	}, []);

	useEffect(() => {
		if (!activeMarkerId) return;
		if (!atmMarkers.some((marker) => marker.id === activeMarkerId)) {
			setActiveMarkerId(null);
		}
	}, [activeMarkerId, atmMarkers]);

	// Show skeleton on initial load
	if (loading && atms.length === 0) {
		return (
			<div className="min-h-screen bg-[#f6fbf8] pb-12">
				<ProductListingPageSkeleton
					showHero={true}
					showCarousel={false}
					showProductGrid={true}
					productColumns={3}
					productRows={3}
					variant="dark"
				/>
				<div className="bg-linear-to-l from-[#396131] to-[#4a7c3a] px-4 py-20">
					<div className="mx-auto max-w-7xl">
						<div className="mb-16 rounded-3xl bg-white/90 p-8 shadow-xl backdrop-blur">
							<MapSkeleton height="h-[420px]" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#f6fbf8] pb-12">
			<PageHeroSection pageSlug="atm-locator" />
			<div className="bg-linear-to-l from-[#396131] to-[#4a7c3a] px-4 py-20">
				<section className="mx-auto mb-16 max-w-7xl rounded-3xl bg-white/90 p-8 shadow-xl backdrop-blur">
					<div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
						<h2 className="text-2xl font-semibold text-[#396131] md:text-3xl">
							Find the closest ATM
						</h2>
						<p className="text-sm text-gray-600">
							Enter your address to locate the nearest ATM-equipped branch or stand-alone ATM.
						</p>
					</div>
					<form onSubmit={handleLocatorSubmit} className="space-y-4">
						<div className="grid gap-3 md:grid-cols-3">
							<div className="flex flex-col">
								<label className="mb-1 text-sm font-medium text-gray-700" htmlFor="province-select">
									Province
								</label>
								<select
									id="province-select"
									value={selectedProvince}
									onChange={handleProvinceChange}
									disabled={provinceLoading || locatorLoading}
									className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 shadow focus:border-[#396131] focus:ring-2 focus:ring-[#396131]/20 focus:outline-none disabled:bg-gray-100"
								>
									<option value="">Select Province</option>
									{provinceOptions.map((province) => (
										<option key={province.code} value={province.code}>
											{province.name}
										</option>
									))}
								</select>
								{provinceLoading && (
									<p className="mt-1 text-xs text-gray-500">Loading provinces…</p>
								)}
							</div>
							<div className="flex flex-col">
								<label className="mb-1 text-sm font-medium text-gray-700" htmlFor="city-select">
									City / Municipality
								</label>
								<select
									id="city-select"
									value={selectedCity}
									onChange={handleCityChange}
									disabled={!selectedProvince || cityLoading || locatorLoading}
									className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 shadow focus:border-[#396131] focus:ring-2 focus:ring-[#396131]/20 focus:outline-none disabled:bg-gray-100"
								>
									<option value="">Select City or Municipality</option>
									{cityOptions.map((city) => (
										<option key={city.code} value={city.code}>
											{city.name}
										</option>
									))}
								</select>
								{cityLoading && (
									<p className="mt-1 text-xs text-gray-500">Loading cities and municipalities…</p>
								)}
							</div>
							<div className="flex flex-col">
								<label className="mb-1 text-sm font-medium text-gray-700" htmlFor="barangay-select">
									Barangay
								</label>
								<select
									id="barangay-select"
									value={selectedBarangay}
									onChange={handleBarangayChange}
									disabled={!selectedCity || barangayLoading || locatorLoading}
									className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 shadow focus:border-[#396131] focus:ring-2 focus:ring-[#396131]/20 focus:outline-none disabled:bg-gray-100"
								>
									<option value="">Select Barangay</option>
									{barangayOptions.map((barangay) => (
										<option key={barangay.code} value={barangay.code}>
											{barangay.name}
										</option>
									))}
								</select>
								{barangayLoading && (
									<p className="mt-1 text-xs text-gray-500">Loading barangays…</p>
								)}
							</div>
						</div>
						<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<p className="text-xs text-gray-500">
								Data source: Philippine Statistics Authority (PSGC)
							</p>
							<div className="flex gap-2">
								<button
									type="submit"
									disabled={isLocateDisabled}
									className="inline-flex items-center justify-center rounded-xl bg-[#396131] px-5 py-3 text-sm font-semibold text-white shadow hover:bg-[#2e4f29] disabled:cursor-not-allowed disabled:opacity-60"
								>
									{locatorLoading ? 'Locating...' : 'Locate ATM'}
								</button>
								<button
									type="button"
									onClick={handleClearLocator}
									disabled={locatorLoading || !canClearLocator}
									className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
								>
									Clear
								</button>
							</div>
						</div>
					</form>
					{addressFieldError && <p className="mt-2 text-sm text-red-600">{addressFieldError}</p>}
					{locatorMessage && <p className="mt-4 text-sm text-gray-700">{locatorMessage}</p>}
					{nearestATM && (
						<div className="mt-4 rounded-2xl border border-gray-200 bg-white/80 p-4 text-sm text-gray-700 shadow-sm">
							<p className="text-base font-semibold text-[#396131]">{nearestATM.name}</p>
							{nearestATM.address && <p className="mt-1 text-gray-600">{nearestATM.address}</p>}
							{nearestATM.branch?.name && (
								<p className="mt-1 text-xs tracking-wide text-gray-500 uppercase">
									Branch: {nearestATM.branch.name}
								</p>
							)}
							{Number.isFinite(nearestATM.distanceKm) && (
								<p className="mt-2 text-xs text-gray-600">
									Approximately {nearestATM.distanceKm.toFixed(2)} km away
								</p>
							)}
						</div>
					)}
					<div className="mt-8 overflow-hidden rounded-3xl">
						<LocationsMap
							markers={atmMarkers}
							userLocation={userLocation}
							selectedId={activeMarkerId}
							height={420}
							onMarkerSelect={handleMarkerSelect}
						/>
					</div>
				</section>

				<div className="mb-16 text-center">
					<h1 className="mb-4 text-5xl leading-tight font-bold text-white md:text-6xl">
						ATM LOCATOR
					</h1>
					<div className="mx-auto h-1 w-24 rounded-full bg-linear-to-r from-white to-[#E9F2EA]"></div>
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
