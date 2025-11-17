import React, { useMemo } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = { height: '600px', width: '100%' };
const defaultCenter = { lat: 7.4399999, lng: 124.9200001 };

export default function ContactPageMap({ lat, lon }) {
	const apiKey = useMemo(() => import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '', []);
	const libraries = useMemo(() => ['places', 'maps'], []);

	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-maps-script',
		googleMapsApiKey: apiKey || '',
		libraries
	});

	const latitude = Number(lat);
	const longitude = Number(lon);
	const hasCoordinates = Number.isFinite(latitude) && Number.isFinite(longitude);
	const center = hasCoordinates ? { lat: latitude, lng: longitude } : defaultCenter;

	const markerIcon = useMemo(() => {
		if (!isLoaded || !window.google?.maps?.SymbolPath) {
			return undefined;
		}
		return {
			path: window.google.maps.SymbolPath.CIRCLE,
			scale: 10,
			fillColor: '#396131',
			fillOpacity: 1,
			strokeColor: '#ffffff',
			strokeWeight: 3
		};
	}, [isLoaded]);

	if (!apiKey) {
		return (
			<div className="flex h-[600px] items-center justify-center rounded-2xl border border-gray-200 bg-gray-100 text-sm text-gray-500">
				Google Maps API key missing. Set VITE_GOOGLE_MAPS_API_KEY to display the map.
			</div>
		);
	}

	if (loadError) {
		return (
			<div className="flex h-[600px] items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-sm text-red-600">
				Failed to load Google Maps.
			</div>
		);
	}

	if (!isLoaded) {
		return (
			<div className="flex h-[600px] items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-500">
				Loading map…
			</div>
		);
	}

	return (
		<GoogleMap
			center={center}
			zoom={hasCoordinates ? 16 : 5}
			mapContainerStyle={containerStyle}
			options={{
				disableDefaultUI: false,
				fullscreenControl: false,
				streetViewControl: false,
				mapTypeControl: false,
				clickableIcons: false,
				styles: [
					{
						featureType: 'poi',
						stylers: [{ visibility: 'off' }]
					}
				]
			}}
		>
			{hasCoordinates && <Marker position={center} icon={markerIcon} />}
		</GoogleMap>
	);
}
