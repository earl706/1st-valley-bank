import React, { useEffect, useMemo, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const DEFAULT_CENTER = [121.774, 12.8797]; // [lng, lat]
const DEFAULT_ZOOM = 5;
const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12';

const markerColors = {
	branch: '#1f7a4d',
	atm: '#1f4d7a',
	selected: '#ffb703',
	user: '#ff6b00'
};

function buildMarkerElement(color) {
	const el = document.createElement('span');
	el.style.display = 'block';
	el.style.width = '18px';
	el.style.height = '18px';
	el.style.borderRadius = '9999px';
	el.style.background = color;
	el.style.border = '2px solid #ffffff';
	el.style.boxShadow = '0 0 0 2px rgba(0, 0, 0, 0.2)';
	return el;
}

export default function LocationsMap({
	markers = [],
	userLocation = null,
	selectedId = null,
	height = 440
}) {
	const mapContainerRef = useRef(null);
	const mapRef = useRef(null);
	const renderedMarkersRef = useRef([]);

	const accessToken = useMemo(() => import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN || '', []);

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
					lngLat: [Number(marker.longitude), Number(marker.latitude)],
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
			lngLat: [Number(userLocation.longitude), Number(userLocation.latitude)],
			color: markerColors.user
		};
	}, [userLocation]);

	useEffect(() => {
		if (mapRef.current || !mapContainerRef.current) return;

		if (!accessToken) {
			console.warn('Mapbox public token (VITE_MAPBOX_PUBLIC_TOKEN) is not configured.');
			return;
		}

		mapboxgl.accessToken = accessToken;

		mapRef.current = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: MAP_STYLE,
			center: DEFAULT_CENTER,
			zoom: DEFAULT_ZOOM
		});

		mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
	}, [accessToken]);

	useEffect(() => {
		const map = mapRef.current;
		if (!map) return;

		// Remove existing markers
		renderedMarkersRef.current.forEach((marker) => marker.remove());
		renderedMarkersRef.current = [];

		const bounds = new mapboxgl.LngLatBounds();
		let hasBounds = false;

		normalizedMarkers.forEach((marker) => {
			const element = buildMarkerElement(marker.color);
			const mapboxMarker = new mapboxgl.Marker({ element }).setLngLat(marker.lngLat).addTo(map);

			const popupHtml = `
				<div style="max-width:220px;">
					<strong>${marker.name || 'Location'}</strong><br/>
					${marker.address ? `<span>${marker.address}</span><br/>` : ''}
					${marker.subtitle ? `<span style="color:#4b5563;">${marker.subtitle}</span>` : ''}
				</div>
			`;
			mapboxMarker.setPopup(new mapboxgl.Popup({ offset: 16 }).setHTML(popupHtml));

			renderedMarkersRef.current.push(mapboxMarker);
			bounds.extend(marker.lngLat);
			hasBounds = true;
		});

		if (userPoint) {
			const element = buildMarkerElement(userPoint.color);
			const userMarker = new mapboxgl.Marker({ element }).setLngLat(userPoint.lngLat).addTo(map);
			userMarker.setPopup(
				new mapboxgl.Popup({ offset: 16 }).setHTML(
					`<div style="max-width:220px;"><strong>${
						userPoint.label || 'Your location'
					}</strong></div>`
				)
			);
			renderedMarkersRef.current.push(userMarker);
			bounds.extend(userPoint.lngLat);
			hasBounds = true;
		}

		if (hasBounds) {
			map.fitBounds(bounds, { padding: 60, maxZoom: 13, duration: 800 });
		} else {
			map.setCenter(DEFAULT_CENTER);
			map.setZoom(DEFAULT_ZOOM);
		}
	}, [normalizedMarkers, userPoint]);

	if (!accessToken) {
		return (
			<div
				className="flex items-center justify-center rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-500"
				style={{ height }}
			>
				Mapbox token missing. Set VITE_MAPBOX_PUBLIC_TOKEN to enable the map.
			</div>
		);
	}

	return (
		<div
			ref={mapContainerRef}
			className="overflow-hidden rounded-xl border border-gray-200 shadow-sm"
			style={{ height }}
		/>
	);
}
