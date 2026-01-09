import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';

const DEFAULT_CENTER = { lat: 12.8797, lng: 121.774 }; // Philippines centroid
const DEFAULT_ZOOM = 5;
const MAX_FIT_ZOOM = 13;
const MAP_LIBRARIES = ['places', 'maps'];
const MAP_CONTAINER_STYLE = { width: '100%', height: '100%' };

const markerColors = {
	branch: '#1f7a4d',
	atm: '#1f4d7a',
	selected: '#ffb703',
	user: '#2563eb'
};

export default function LocationsMap({
	markers = [],
	userLocation = null,
	selectedId = null,
	height = 440,
	onMarkerSelect = undefined
}) {
	const mapRef = useRef(null);
	const markerRefsRef = useRef({});
	const [activeInfoId, setActiveInfoId] = useState(null);

	const apiKey = useMemo(() => import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '', []);

	const { isLoaded, loadError } = useJsApiLoader(
		useMemo(
			() => ({
				id: 'google-maps-script',
				googleMapsApiKey: apiKey || '',
				libraries: MAP_LIBRARIES
			}),
			[apiKey]
		)
	);

	const normalizedMarkers = useMemo(
		() =>
			markers
				.filter(
					(marker) =>
						marker.latitude !== null &&
						marker.latitude !== undefined &&
						marker.longitude !== null &&
						marker.longitude !== undefined
				)
				.map((marker) => ({
					...marker,
					position: {
						lat: Number(marker.latitude),
						lng: Number(marker.longitude)
					},
					color:
						marker.id === selectedId
							? markerColors.selected
							: markerColors[marker.type] || markerColors.branch
				})),
		[markers, selectedId]
	);

	const userPoint = useMemo(() => {
		if (
			!userLocation ||
			userLocation.latitude === undefined ||
			userLocation.longitude === undefined
		) {
			return null;
		}

		return {
			...userLocation,
			id: 'user',
			position: {
				lat: Number(userLocation.latitude),
				lng: Number(userLocation.longitude)
			},
			color: markerColors.user
		};
	}, [userLocation]);

	// Helper function to create custom marker icon config
	// Based on: https://stackoverflow.com/a/59767527 by Andrii Gordiichuk
	const createMarkerIcon = useCallback(
		(opts) => {
			const defaults = {
				path: window.google?.maps?.SymbolPath?.CIRCLE || google?.maps?.SymbolPath?.CIRCLE,
				fillOpacity: 1,
				strokeColor: '#ffffff',
				strokeOpacity: 1,
				strokeWeight: 2,
				scale: 8
			};
			return Object.assign({}, defaults, opts);
		},
		[]
	);

	useEffect(() => {
		if (selectedId) {
			// Only set activeInfoId if the marker exists in normalizedMarkers or it's the user location
			const markerExists = normalizedMarkers.some((m) => m.id === selectedId);
			const isUserLocation = selectedId === 'user' && userPoint;
			if (markerExists || isUserLocation) {
				setActiveInfoId(selectedId);
			} else {
				setActiveInfoId(null);
			}
		} else {
			setActiveInfoId((prev) => (prev && prev !== 'user' ? null : prev));
		}
	}, [selectedId, normalizedMarkers, userPoint]);

	// Update marker icons when selection changes
	useEffect(() => {
		if (!isLoaded || !window.google?.maps) return;

		normalizedMarkers.forEach((marker) => {
			const markerInstance = markerRefsRef.current[marker.id];
			if (!markerInstance) return;

			const isActive = marker.id === selectedId || activeInfoId === marker.id;
			const markerColor = isActive ? markerColors.selected : marker.color;
			const markerScale = isActive ? 9 : 7;

			const iconConfig = createMarkerIcon({
				fillColor: markerColor,
				scale: markerScale
			});
			markerInstance.setIcon(iconConfig);
		});
	}, [selectedId, activeInfoId, normalizedMarkers, isLoaded, createMarkerIcon]);

	const handleMapLoad = useCallback((mapInstance) => {
		mapRef.current = mapInstance;
	}, []);

	const handleMapUnmount = useCallback(() => {
		mapRef.current = null;
	}, []);

	const handleMapClick = useCallback(() => {
		setActiveInfoId(null);
	}, []);

	const handleMarkerClick = useCallback(
		(marker) => {
			if (!marker) return;
			setActiveInfoId(marker.id);
			onMarkerSelect?.(marker);
		},
		[onMarkerSelect]
	);

	const handleUserMarkerClick = useCallback(() => {
		if (!userPoint) return;
		setActiveInfoId('user');
		onMarkerSelect?.(userPoint);
	}, [onMarkerSelect, userPoint]);

	useEffect(() => {
		const map = mapRef.current;
		if (!map || !isLoaded || !window.google?.maps) {
			return;
		}

		const points = [
			...normalizedMarkers.map((marker) => marker.position),
			...(userPoint ? [userPoint.position] : [])
		];

		if (points.length === 0) {
			map.panTo(DEFAULT_CENTER);
			map.setZoom(DEFAULT_ZOOM);
			return;
		}

		if (points.length === 1) {
			map.panTo(points[0]);
			map.setZoom(MAX_FIT_ZOOM);
			return;
		}

		const bounds = new window.google.maps.LatLngBounds();
		points.forEach((point) => bounds.extend(point));

		map.fitBounds(bounds);

		const listener = window.google.maps.event.addListenerOnce(map, 'idle', () => {
			if (map.getZoom() > MAX_FIT_ZOOM) {
				map.setZoom(MAX_FIT_ZOOM);
			}
		});

		return () => {
			window.google.maps.event.removeListener(listener);
		};
	}, [normalizedMarkers, userPoint, isLoaded]);

	if (!apiKey) {
		return (
			<div
				className="flex items-center justify-center rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-500"
				style={{ height }}
			>
				Google Maps API key missing. Set VITE_GOOGLE_MAPS_API_KEY to enable the map.
			</div>
		);
	}

	if (loadError) {
		return (
			<div
				className="flex items-center justify-center rounded-xl border border-gray-200 bg-red-50 text-sm text-red-600"
				style={{ height }}
			>
				Failed to load Google Maps.
			</div>
		);
	}

	if (!isLoaded) {
		return (
			<div
				className="flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500"
				style={{ height }}
			>
				Loading map...
			</div>
		);
	}

	const handleInfoWindowClose = () => {
		setActiveInfoId(null);
	};

	return (
		<div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm" style={{ height }}>
			<GoogleMap
				onLoad={handleMapLoad}
				onUnmount={handleMapUnmount}
				onClick={handleMapClick}
				center={DEFAULT_CENTER}
				zoom={DEFAULT_ZOOM}
				mapContainerStyle={MAP_CONTAINER_STYLE}
				options={{
					disableDefaultUI: false,
					fullscreenControl: false,
					streetViewControl: false,
					mapTypeControl: false,
					clickableIcons: true,
					styles: [
						{
							featureType: 'poi',
							stylers: [{ visibility: 'off' }]
						}
					]
				}}
			>
				{normalizedMarkers.map((marker) => {
					const isActive = marker.id === selectedId || activeInfoId === marker.id;
					const hasValidPosition =
						marker.position &&
						typeof marker.position.lat === 'number' &&
						typeof marker.position.lng === 'number' &&
						!isNaN(marker.position.lat) &&
						!isNaN(marker.position.lng);

					if (!hasValidPosition) {
						return null;
					}

					const markerColor = isActive ? markerColors.selected : marker.color;
					const markerScale = isActive ? 9 : 7;

					return (
						<Marker
							key={marker.id}
							position={marker.position}
							onLoad={(markerInstance) => {
								if (markerInstance && isLoaded && window.google?.maps) {
									// Store marker reference for updates
									markerRefsRef.current[marker.id] = markerInstance;
									
									const iconConfig = createMarkerIcon({
										fillColor: markerColor,
										scale: markerScale
									});
									markerInstance.setIcon(iconConfig);
								}
							}}
							onClick={() => handleMarkerClick(marker)}
						>
							{activeInfoId === marker.id && (
								<InfoWindow onCloseClick={handleInfoWindowClose}>
									<div style={{ maxWidth: 220 }}>
										<strong>{marker.name || 'Location'}</strong>
										{marker.address && <div>{marker.address}</div>}
										{marker.subtitle && <div style={{ color: '#4b5563' }}>{marker.subtitle}</div>}
									</div>
								</InfoWindow>
							)}
						</Marker>
					);
				})}

				{userPoint && (
					<Marker
						key={`user-${userPoint.position.lat}-${userPoint.position.lng}`}
						position={userPoint.position}
						onLoad={(markerInstance) => {
							if (markerInstance && isLoaded && window.google?.maps) {
								// Store user marker reference
								markerRefsRef.current['user'] = markerInstance;
								
								const iconConfig = createMarkerIcon({
									fillColor: markerColors.user,
									scale: 8
								});
								markerInstance.setIcon(iconConfig);
							}
						}}
						onClick={handleUserMarkerClick}
					>
						{activeInfoId === 'user' && (
							<InfoWindow onCloseClick={handleInfoWindowClose}>
								<div style={{ maxWidth: 220 }}>
									<strong>{userPoint.label || 'Your location'}</strong>
								</div>
							</InfoWindow>
						)}
					</Marker>
				)}
			</GoogleMap>
		</div>
	);
}
