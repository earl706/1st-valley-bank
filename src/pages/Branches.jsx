import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { MapPinned, Building2, Landmark, X, CreditCard, ArrowRight, Clock, Calendar } from 'lucide-react';
import PageHeroSection from '../components/PageHeroSection';
import { DarkCard } from '../components/Card';
import { DarkPrimaryButton } from '../components/Buttons';
import { DarkHeader } from '../components/Header';
import locationService from '../services/locationService';
import LocationsMap from '../components/LocationsMap';
import { ProductListingPageSkeleton, MapSkeleton } from '../components/PageSkeleton';

const PSGC_API_BASE = 'https://psgc.gitlab.io/api';

// Format operating hours into a summary string (e.g., "Mon-Fri: 9:00-17:00, Sat: 9:00-12:00")
const formatOperatingHoursSummary = (operatingHours) => {
	if (!operatingHours || typeof operatingHours !== 'object') return '';

	const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
	const dayAbbr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	// Filter out days with no hours or closed (represented as "-" or empty)
	const daysWithHours = dayOrder
		.map((day, index) => ({
			day,
			abbr: dayAbbr[index],
			index,
			hours: operatingHours[day]
		}))
		.filter((item) => item.hours && item.hours !== '-' && item.hours.trim() !== '');

	if (daysWithHours.length === 0) return '';

	// Group consecutive days with the same hours
	const groups = [];
	let currentGroup = {
		startIndex: daysWithHours[0].index,
		endIndex: daysWithHours[0].index,
		hours: daysWithHours[0].hours,
		startAbbr: daysWithHours[0].abbr,
		endAbbr: daysWithHours[0].abbr
	};

	for (let i = 1; i < daysWithHours.length; i++) {
		const current = daysWithHours[i];
		const prev = daysWithHours[i - 1];

		// If same hours and consecutive days, extend current group
		if (current.hours === currentGroup.hours && current.index === prev.index + 1) {
			currentGroup.endIndex = current.index;
			currentGroup.endAbbr = current.abbr;
		} else {
			// Save current group and start new one
			groups.push(currentGroup);
			currentGroup = {
				startIndex: current.index,
				endIndex: current.index,
				hours: current.hours,
				startAbbr: current.abbr,
				endAbbr: current.abbr
			};
		}
	}
	groups.push(currentGroup);

	// Format groups into string
	const formattedGroups = groups.map((group) => {
		if (group.startIndex === group.endIndex) {
			return `${group.startAbbr}: ${group.hours}`;
		} else {
			return `${group.startAbbr}-${group.endAbbr}: ${group.hours}`;
		}
	});

	return formattedGroups.join(', ');
};

// Helper function to check if a branch is open Monday-Saturday
const isOpenMonSat = (operatingHours) => {
	if (!operatingHours || typeof operatingHours !== 'object') return false;

	const daysToCheck = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	return !daysToCheck.some(
		(day) =>
			operatingHours[day] === ""
	);
};

// Helper function to check if a branch is open Monday-Friday ONLY (closed on Saturday)
const isOpenMonFriOnly = (operatingHours) => {
	if (!operatingHours || typeof operatingHours !== 'object') return false;

	const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
	const hasAllWeekdays =
		days.every((day) => operatingHours[day] && operatingHours[day].trim() !== "" && operatingHours[day] !== "-");
	const saturday = operatingHours['saturday'];
	const sunday = operatingHours['sunday'];
	const isSatClosed = (!saturday || saturday.trim() === '' || saturday === "-");
	// some banks include "-" for closed
	return hasAllWeekdays && isSatClosed;
};

function BranchCard({ icon: Icon, name, address, onContact, atm, atms = [], operatingHours }) {
	// Determine if branch has ATM (use legacy atm prop or check atms array)
	const hasATM = atm || atms.length > 0;

	return (
		<DarkCard className="relative flex flex-col items-start gap-4">
			{hasATM && (
				<p className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded bg-green-100 px-2 py-0.5 text-xs leading-relaxed font-normal text-green-700">
					<CreditCard className="inline h-4 w-4" /> ATM
				</p>
			)}
			<div className="flex w-full items-start gap-4">
				<span className="rounded-lg border border-white/10 bg-white/10 p-2">
					<Icon className="h-6 w-6 text-white transition group-hover:scale-110" />
				</span>
				<div className="flex-1">
					<h4 className="flex items-center gap-2 text-xl leading-tight font-bold text-white">
						{name}
					</h4>
					<p className="text-base leading-relaxed font-normal text-white/80">{address}</p>
					{/* ATM Information Section */}
					{atms.length > 0 && (
						<div className="mt-3 space-y-2">
							{atms.map((atmItem, idx) => (
								<div
									key={atmItem.id || idx}
									className="flex items-start gap-2 rounded-lg border border-white/20 bg-white/10 p-2.5 backdrop-blur-sm"
								>
									<div className="flex-1">
										<p className="text-sm leading-tight font-semibold text-white">
											{atmItem.name}
										</p>
										{atmItem.is_24_hours && (
											<p className="mt-1.5 flex items-center gap-1 rounded bg-green-100/20 px-1.5 py-0.5 text-xs leading-tight font-normal text-green-300">
												<CreditCard className="h-3 w-3" /> 24 hours
											</p>
										)}
									</div>
								</div>
							))}
						</div>
					)}
					{/* Operating Hours Section */}
					{formatOperatingHoursSummary(operatingHours) && (
						<div className="mt-3 flex items-start gap-2">
							<Clock className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
							<p className="text-sm leading-relaxed font-normal text-white/80">
								{formatOperatingHoursSummary(operatingHours)}
							</p>
						</div>
					)}
				</div>
			</div>
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
				className="absolute top-8 right-8 inline-flex transform cursor-pointer items-center justify-center rounded-full bg-white p-2 text-base font-semibold text-red-600 shadow-lg transition-all duration-300 hover:scale-110"
			>
				<X className="h-6 w-6 " />
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
							atms={branch.atms || []}
							operatingHours={branch.operating_hours}
							onContact={() => onContact(branch.name)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

// New reusable component for "Find the closest ATM"
function ClosestATMSection({ allATMs }) {
	const [locatorLoading, setLocatorLoading] = useState(false);
	const [locatorMessage, setLocatorMessage] = useState('');
	const [userLocation, setUserLocation] = useState(null);
	const [nearestATM, setNearestATM] = useState(null);
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
	const [selectedOperatingHours, setSelectedOperatingHours] = useState('');
	const [addressFieldError, setAddressFieldError] = useState('');

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
			selectedOperatingHours ||
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

	const handleOperatingHoursChange = (event) => {
		setSelectedOperatingHours(event.target.value);
		setAddressFieldError('');
		setLocatorMessage('');
	};

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
			const markerExists = allATMs?.some?.((existing) => existing.id === atm.id);
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
		setSelectedOperatingHours('');
		setCityOptions([]);
		setBarangayOptions([]);
		setLocatorMessage('');
		setNearestATM(null);
		setUserLocation(null);
		setActiveMarkerId(null);
		setAddressFieldError('');
	};

	const atmMarkers = useMemo(
		() =>
			allATMs
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
		[allATMs]
	);

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

	return (
		<section className="rounded-3xl bg-white/90 p-8 shadow-xl backdrop-blur">
			<div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
				<h2 className="text-2xl font-semibold text-[#396131] md:text-3xl">
					Find the closest ATM
				</h2>
				<p className="text-sm text-gray-600">
					Enter your address to locate the nearest ATM-equipped branch or stand-alone ATM.
				</p>
			</div>
			<form onSubmit={handleLocatorSubmit} className="space-y-4">
				<div className="grid gap-3 md:grid-cols-4">
					<div className="flex flex-col">
						<label className="mb-1 text-sm font-medium text-gray-700" htmlFor="atm-province-select">
							Province
						</label>
						<select
							id="atm-province-select"
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
						{provinceLoading && <p className="mt-1 text-xs text-gray-500">Loading provinces…</p>}
					</div>
					<div className="flex flex-col">
						<label className="mb-1 text-sm font-medium text-gray-700" htmlFor="atm-city-select">
							City / Municipality
						</label>
						<select
							id="atm-city-select"
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
						<label className="mb-1 text-sm font-medium text-gray-700" htmlFor="atm-barangay-select">
							Barangay
						</label>
						<select
							id="atm-barangay-select"
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
						{barangayLoading && <p className="mt-1 text-xs text-gray-500">Loading barangays…</p>}
					</div>
					<div className="flex flex-col">
						<label className="mb-1 text-sm font-medium text-gray-700" htmlFor="atm-operating-hours-select">
							Operating Hours
						</label>
						<select
							id="atm-operating-hours-select"
							value={selectedOperatingHours}
							onChange={handleOperatingHoursChange}
							disabled={locatorLoading}
							className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 shadow focus:border-[#396131] focus:ring-2 focus:ring-[#396131]/20 focus:outline-none disabled:bg-gray-100"
						>
							<option value="">Select Operating Hours</option>
							<option value="monday-friday">Monday-Friday 8:00 AM to 5:00 PM</option>
							<option value="monday-saturday">Monday-Saturday 8:00 AM to 5:00 PM</option>
						</select>
					</div>
				</div>
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
	);
}

// New reusable component for "Find the closest branch"
function ClosestBranchSection({ allBranches }) {
	const [locatorLoading, setLocatorLoading] = useState(false);
	const [locatorMessage, setLocatorMessage] = useState('');
	const [userLocation, setUserLocation] = useState(null);
	const [nearestBranch, setNearestBranch] = useState(null);
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
	const [hasAtm, setHasAtm] = useState(false);
	const [addressFieldError, setAddressFieldError] = useState('');

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
			hasAtm ||
			userLocation ||
			nearestBranch ||
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

	const handleHasAtmChange = (event) => {
		setHasAtm(event.target.checked);
		setAddressFieldError('');
		setLocatorMessage('');
	};

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

	const handleLocatorSubmit = async (event) => {
		event.preventDefault();
		if (!locatorQuery) {
			setAddressFieldError(
				'Please select a Province, City/Municipality, and Barangay to locate the nearest branch.'
			);
			return;
		}

		setLocatorLoading(true);
		setLocatorMessage('');
		setAddressFieldError('');
		setNearestBranch(null);

		try {
			const payload = {
				address: locatorQuery,
				province: selectedProvinceOption?.name || '',
				municipality: selectedCityOption?.name || '',
				barangay: selectedBarangayOption?.name || '',
				has_atm: hasAtm || undefined
			};

			const result = await locationService.findNearestBranchByAddress(payload);
			console.log(result)
			if (!result.success) {
				setLocatorMessage(
					result.message || 'Unable to determine the nearest branch. Please try again later.'
				);
				setActiveMarkerId(null);
				setUserLocation(null);
				return;
			}

			const { nearest_branch: branch, query } = result.data || {};
			if (!branch) {
				setLocatorMessage('No branch coordinates are available to compute the nearest branch.');
				setActiveMarkerId(null);
				setUserLocation(null);
				return;
			}

			const distanceValue = Number(branch.distance_km ?? branch.distanceKm);
			const formattedBranch = {
				...branch,
				distanceKm: Number.isFinite(distanceValue) ? distanceValue : null
			};
			setNearestBranch(formattedBranch);

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

			const markerId = `branch-${branch.id}`;
			const markerExists = allBranches?.some?.((existingBranch) => existingBranch.id === branch.id);
			setActiveMarkerId(markerExists ? markerId : null);

			const regionLabel =
				branch.region_display ||
				(typeof branch.region === 'string' ? branch.region.toUpperCase() : null);

			let message = `Closest branch: ${branch.name}${regionLabel ? ` (${regionLabel})` : ''}`;
			if (Number.isFinite(formattedBranch.distanceKm)) {
				message += ` — ${formattedBranch.distanceKm.toFixed(2)} km away.`;
			} else {
				message += '.';
			}
			setLocatorMessage(message);
		} catch (error) {
			console.error('Failed to locate address:', error);
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
		setHasAtm(false);
		setCityOptions([]);
		setBarangayOptions([]);
		setLocatorMessage('');
		setNearestBranch(null);
		setUserLocation(null);
		setActiveMarkerId(null);
		setAddressFieldError('');
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
					type: 'branch',
					raw: branch
				})),
		[allBranches]
	);

	const handleMarkerSelect = useCallback((marker) => {
		if (!marker || marker.id === 'user') return;
		setActiveMarkerId(marker.id);
	}, []);

	useEffect(() => {
		if (!activeMarkerId) return;
		if (!branchMarkers.some((marker) => marker.id === activeMarkerId)) {
			setActiveMarkerId(null);
		}
	}, [activeMarkerId, branchMarkers]);

	return (
		<section className="rounded-3xl bg-white/90 p-8 shadow-xl backdrop-blur">
			<div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
				<h2 className="text-2xl font-semibold text-[#396131] md:text-3xl">
					Find the closest branch
				</h2>
				<p className="text-sm text-gray-600">
					Enter your address to locate the nearest 1st Valley Bank branch.
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
						{provinceLoading && <p className="mt-1 text-xs text-gray-500">Loading provinces…</p>}
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
						{barangayLoading && <p className="mt-1 text-xs text-gray-500">Loading barangays…</p>}
					</div>
					<div className="flex flex-col justify-end ">
						<label className="flex items-center gap-2 cursor-pointer" htmlFor="has-atm-checkbox">
							<input
								id="has-atm-checkbox"
								type="checkbox"
								checked={hasAtm}
								onChange={handleHasAtmChange}
								disabled={locatorLoading}
								className="h-4 w-4 rounded border-gray-300 text-[#396131] focus:ring-2 focus:ring-[#396131]/20 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
							/>
							<span className="text-sm font-medium text-gray-700">
								Show only branches with ATM
							</span>
						</label>
					</div>
				</div>
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex gap-2">
						<button
							type="submit"
							disabled={isLocateDisabled}
							className="inline-flex items-center justify-center rounded-xl bg-[#396131] px-5 py-3 text-sm font-semibold text-white shadow hover:bg-[#2e4f29] disabled:cursor-not-allowed disabled:opacity-60"
						>
							{locatorLoading ? 'Locating...' : 'Locate branch'}
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
			{nearestBranch && (
				<div className="mt-4 rounded-2xl border border-gray-200 bg-white/80 p-4 text-sm text-gray-700 shadow-sm">
					<p className="text-base font-semibold text-[#396131] flex items-center gap-2">
						{nearestBranch.name}
						{nearestBranch.has_atm !== undefined && (
							<span
								className={`ml-2 px-2 py-0.5 rounded-md text-xs font-medium ${
									nearestBranch.has_atm
										? "bg-green-100 text-green-800 border border-green-200"
										: "bg-gray-100 text-gray-500 border border-gray-200"
								}`}
								title={nearestBranch.has_atm ? "ATM Available" : "No ATM at this branch"}
							>
								{nearestBranch.has_atm ? "ATM Available" : "No ATM"}
							</span>
						)}
					</p>
					{nearestBranch.address && <p className="mt-1 text-gray-600">{nearestBranch.address}</p>}
					<p className="mt-2 text-xs tracking-wide text-gray-500 uppercase">
						Region: {nearestBranch.region_display || nearestBranch.region}
						{Number.isFinite(nearestBranch.distanceKm) && (
							<span className="ml-2 text-gray-600 normal-case">
								Approximately {nearestBranch.distanceKm.toFixed(2)} km away
							</span>
						)}
					</p>
					{nearestBranch.operating_hours && typeof nearestBranch.operating_hours === "object" && (
						<div className="mt-3">
							<p className="font-semibold text-xs text-gray-700 uppercase mb-1">Operating Hours:</p>
							<table className="text-xs text-gray-700">
								<tbody>
									{["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => {
										const hours = nearestBranch.operating_hours[day];
										return (
											<tr key={day}>
												<td className="pr-4 capitalize">{day}:</td>
												<td>{hours && hours.trim() ? hours : <span className="text-gray-400">Closed</span>}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					)}
				</div>
			)}
			<div className="mt-8 overflow-hidden rounded-3xl">
				<LocationsMap
					markers={branchMarkers}
					userLocation={userLocation}
					selectedId={activeMarkerId}
					height={420}
					onMarkerSelect={handleMarkerSelect}
				/>
			</div>
		</section>
	);
}

export default function Branches() {
	const [branches, setBranches] = useState([]);
	const [atms, setATMs] = useState([]);
	const [visibleModal, setVisibleModal] = useState(null); // 'monSat', 'monFri', 'mindanao', 'visayas', 'luzon', 'ncr', or null
	const [mindanaoBranches, setMindanaoBranches] = useState([]);
	const [visayasBranches, setVisayasBranches] = useState([]);
	const [luzonBranches, setLuzonBranches] = useState([]);
	const [regionalCenters, setRegionalCenters] = useState([]);
	const [monSatBranches, setMonSatBranches] = useState([]);
	const [monFriBranches, setMonFriBranches] = useState([]); // New State
	const [allBranches, setAllBranches] = useState([]);
	const [loading, setLoading] = useState(true);

	// Helper function to enrich branches with their associated ATMs
	const enrichBranchesWithATMs = (branches, atms) => {
		return branches.map((branch) => ({
			...branch,
			atms: atms.filter((atm) => atm.branch?.id === branch.id)
		}));
	};

	const fetchBranches = async () => {
		try {
			setLoading(true);
			// Fetch branches and ATMs in parallel
			const [branchesResult, atmsResult] = await Promise.all([
				locationService.getBranches({ page: 1, page_size: 200 }),
				locationService.getATMs({ page_size: 200 })
			]);

			if (!branchesResult.success) {
				console.error('Failed to fetch branches:', branchesResult.message || branchesResult.error);
				return;
			}

			const branchList = Array.isArray(branchesResult.data) ? branchesResult.data : [];
			const atmList = Array.isArray(atmsResult.data?.results)
				? atmsResult.data.results
				: Array.isArray(atmsResult.data)
					? atmsResult.data
					: [];

			setATMs(atmList);

			// Enrich branches with their ATMs
			const enrichedBranches = enrichBranchesWithATMs(branchList, atmList);

			setBranches(enrichedBranches);
			setAllBranches(enrichedBranches);
			setMindanaoBranches(enrichedBranches.filter((branch) => branch.region === 'mindanao'));
			setVisayasBranches(enrichedBranches.filter((branch) => branch.region === 'visayas'));
			setLuzonBranches(enrichedBranches.filter((branch) => branch.region === 'luzon'));
			setRegionalCenters(enrichedBranches.filter((branch) => branch.region === 'ncr'));
			setMonSatBranches(enrichedBranches.filter((branch) => isOpenMonSat(branch.operating_hours)));
			setMonFriBranches(enrichedBranches.filter((branch) =>
				isOpenMonFriOnly(branch.operating_hours)
			));
		} catch (error) {
			console.error('Failed to fetch branches:', error);
		} finally {
			setLoading(false);
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
		monSat: {
			title: 'Branches Open Monday-Saturday',
			branches: monSatBranches,
			icon: Calendar
		},
		monFri: {
			title: 'Branches Open Monday-Friday',
			branches: monFriBranches,
			icon: Calendar
		},
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
					atms={branch.atms || []}
					operatingHours={branch.operating_hours}
					onContact={() => handleContact(branch.name)}
				/>
			));

	// Show skeleton on initial load
	if (loading && branches.length === 0) {
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
						<div className="mb-8 rounded-3xl bg-white/90 p-8 shadow-xl backdrop-blur">
							<MapSkeleton height="h-[420px]" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#f6fbf8] pb-12">
			<PageHeroSection pageSlug="branches" />
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
					{/* Monday-Saturday Branches Section */}
					<section>
						<div className="mb-5 flex items-center justify-between">
							<h2 className="flex items-center gap-2 text-2xl font-bold text-white">
								<Calendar className="h-6 w-6 text-white" />
								Branches Open Monday-Saturday
							</h2>
							{monSatBranches.length > 0 && (
								<DarkPrimaryButton onClick={() => setVisibleModal('monSat')}>
									<span className="flex items-center">
										See All
										<ArrowRight className="ml-3 h-5 w-5" />
									</span>
								</DarkPrimaryButton>
							)}
						</div>
					</section>
					{/* Monday-Friday Only Branches Section */}
					<section>
						<div className="mb-5 flex items-center justify-between">
							<h2 className="flex items-center gap-2 text-2xl font-bold text-white">
								<Calendar className="h-6 w-6 text-white" />
								Branches Open Monday-Friday
							</h2>
							{monFriBranches.length > 0 && (
								<DarkPrimaryButton onClick={() => setVisibleModal('monFri')}>
									<span className="flex items-center">
										See All
										<ArrowRight className="ml-3 h-5 w-5" />
									</span>
								</DarkPrimaryButton>
							)}
						</div>
					</section>

					{/* Mindanao Section */}
					{/* <section>
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
					</section> */}
					{/* Visayas Section */}
					{/* <section>
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
					</section> */}

					{/* Regional Section */}
					{/* <section>
						<div className="mb-5 flex items-center justify-between">
							<h2 className="flex items-center gap-2 text-2xl font-bold text-white">
								<Landmark className="h-6 w-6 text-white" />
								Head Offices
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
					</section> */}

					<ClosestBranchSection allBranches={allBranches} />
					
					{/* ATM Locator Section */}
					{/* <ClosestATMSection allATMs={atms} /> */}
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
