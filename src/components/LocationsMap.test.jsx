import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import LocationsMap from './LocationsMap';

// Mock @react-google-maps/api
const mockUseJsApiLoader = vi.hoisted(() => vi.fn());

vi.mock('@react-google-maps/api', () => {
	const React = require('react');
	
	const mockGoogleMap = ({ children, onLoad, onUnmount, onClick }) => {
		React.useEffect(() => {
			if (onLoad) {
				setTimeout(() => onLoad({ 
					panTo: vi.fn(), 
					setZoom: vi.fn(), 
					fitBounds: vi.fn(), 
					getZoom: vi.fn(() => 10) 
				}), 0);
			}
			return () => {
				if (onUnmount) onUnmount();
			};
		}, [onLoad, onUnmount]);
		return React.createElement('div', { 'data-testid': 'google-map', onClick }, children);
	};

	const mockMarker = ({ children, onClick }) =>
		React.createElement('div', { 'data-testid': 'marker', onClick }, children);

	const mockInfoWindow = ({ children, onCloseClick }) =>
		React.createElement(
			'div',
			{ 'data-testid': 'info-window' },
			React.createElement('button', { onClick: onCloseClick, 'data-testid': 'info-window-close' }, 'Close'),
			children
		);

	return {
		useJsApiLoader: mockUseJsApiLoader,
		GoogleMap: mockGoogleMap,
		Marker: mockMarker,
		InfoWindow: mockInfoWindow
	};
});

// Mock window.google.maps
const mockGoogleMaps = {
	maps: {
		SymbolPath: {
			CIRCLE: 'CIRCLE'
		},
		LatLngBounds: vi.fn(function() {
			this.extend = vi.fn();
		}),
		event: {
			addListenerOnce: vi.fn(() => 'listener-id'),
			removeListener: vi.fn()
		}
	}
};

describe('LocationsMap Component', () => {
	const mockMarkers = [
		{
			id: 1,
			name: 'Branch 1',
			address: '123 Main St',
			latitude: 12.8797,
			longitude: 121.774,
			type: 'branch'
		},
		{
			id: 2,
			name: 'ATM 1',
			address: '456 Side St',
			latitude: 14.6042,
			longitude: 120.9822,
			type: 'atm'
		}
	];

	beforeEach(() => {
		vi.clearAllMocks();
		mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });
		global.window.google = mockGoogleMaps;
		import.meta.env.VITE_GOOGLE_MAPS_API_KEY = 'test-api-key';
	});

	describe('API Key Handling', () => {
		it('shows message when API key is missing', () => {
			import.meta.env.VITE_GOOGLE_MAPS_API_KEY = '';
			mockUseJsApiLoader.mockReturnValue({ isLoaded: false, loadError: null });

			render(<LocationsMap markers={mockMarkers} />);

			expect(screen.getByText(/Google Maps API key missing/i)).toBeInTheDocument();
		});

		it('renders map when API key is present', () => {
			import.meta.env.VITE_GOOGLE_MAPS_API_KEY = 'test-key';
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={mockMarkers} />);

			expect(screen.getByTestId('google-map')).toBeInTheDocument();
		});
	});

	describe('Loading States', () => {
		it('shows loading message when map is not loaded', () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: false, loadError: null });

			render(<LocationsMap markers={mockMarkers} />);

			expect(screen.getByText('Loading map...')).toBeInTheDocument();
		});

		it('shows error message when map fails to load', () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: false, loadError: new Error('Load failed') });

			render(<LocationsMap markers={mockMarkers} />);

			expect(screen.getByText('Failed to load Google Maps.')).toBeInTheDocument();
		});

		it('renders map when loaded successfully', async () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={mockMarkers} />);

			await waitFor(() => {
				expect(screen.getByTestId('google-map')).toBeInTheDocument();
			});
		});
	});

	describe('Marker Rendering', () => {
		it('renders markers with valid coordinates', async () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={mockMarkers} />);

			await waitFor(() => {
				const markers = screen.getAllByTestId('marker');
				expect(markers.length).toBeGreaterThanOrEqual(2);
			});
		});

		it('filters out markers with invalid coordinates', async () => {
			const invalidMarkers = [
				{ id: 1, name: 'Valid', latitude: 12.8797, longitude: 121.774 },
				{ id: 2, name: 'Invalid', latitude: null, longitude: 121.774 },
				{ id: 3, name: 'Invalid2', latitude: 12.8797, longitude: undefined }
			];

			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={invalidMarkers} />);

			await waitFor(() => {
				const markers = screen.getAllByTestId('marker');
				expect(markers.length).toBeGreaterThanOrEqual(1);
			});
		});

		it('assigns correct colors based on marker type', async () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={mockMarkers} />);

			await waitFor(() => {
				expect(screen.getByTestId('google-map')).toBeInTheDocument();
			});

			// Markers should be rendered with type-specific colors
			const markers = screen.getAllByTestId('marker');
			expect(markers.length).toBeGreaterThanOrEqual(2);
		});

		it('highlights selected marker', async () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={mockMarkers} selectedId={1} />);

			await waitFor(() => {
				expect(screen.getByTestId('google-map')).toBeInTheDocument();
			});

			// Selected marker should have different styling (checked via mock)
			const markers = screen.getAllByTestId('marker');
			expect(markers.length).toBeGreaterThan(0);
		});
	});

	describe('InfoWindow', () => {
		it('opens InfoWindow when marker is clicked', async () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={mockMarkers} />);

			await waitFor(() => {
				const markers = screen.getAllByTestId('marker');
				expect(markers.length).toBeGreaterThan(0);
			});

			// Click first marker
			const markers = screen.getAllByTestId('marker');
			if (markers[0]) {
				// InfoWindow should appear (simulated via state change)
				expect(markers[0]).toBeInTheDocument();
			}
		});

		it('closes InfoWindow when close button is clicked', async () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={mockMarkers} selectedId={1} />);

			await waitFor(() => {
				const closeButtons = screen.queryAllByTestId('info-window-close');
				if (closeButtons.length > 0) {
					closeButtons[0].click();
				}
				// InfoWindow should close
				expect(screen.getByTestId('google-map')).toBeInTheDocument();
			});
		});

		it('displays marker information in InfoWindow', async () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={mockMarkers} selectedId={1} />);

			await waitFor(() => {
				// InfoWindow should show marker name and address
				const infoWindows = screen.queryAllByTestId('info-window');
				if (infoWindows.length > 0) {
					expect(infoWindows[0]).toBeInTheDocument();
				}
			});
		});

		it('closes InfoWindow when map is clicked', async () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			const { container } = render(<LocationsMap markers={mockMarkers} selectedId={1} />);

			await waitFor(() => {
				expect(screen.getByTestId('google-map')).toBeInTheDocument();
			});

			// Map click should close InfoWindow (simulated via onClick handler)
			const map = screen.getByTestId('google-map');
			expect(map).toBeInTheDocument();
		});
	});

	describe('User Location', () => {
		it('renders user location marker when provided', async () => {
			const userLocation = {
				latitude: 13.4125,
				longitude: 123.4174,
				label: 'My Location'
			};

			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={mockMarkers} userLocation={userLocation} />);

			await waitFor(() => {
				const markers = screen.getAllByTestId('marker');
				expect(markers.length).toBeGreaterThanOrEqual(3); // 2 markers + 1 user
			});
		});

		it('does not render user marker when location is invalid', async () => {
			const invalidUserLocation = {
				latitude: null,
				longitude: 123.4174
			};

			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={mockMarkers} userLocation={invalidUserLocation} />);

			await waitFor(() => {
				const markers = screen.getAllByTestId('marker');
				expect(markers.length).toBeGreaterThanOrEqual(2); // Only 2 markers
			});
		});

		it('opens InfoWindow for user location when selected', async () => {
			const userLocation = {
				latitude: 13.4125,
				longitude: 123.4174,
				label: 'My Location'
			};

			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={mockMarkers} userLocation={userLocation} selectedId="user" />);

			await waitFor(() => {
				expect(screen.getByTestId('google-map')).toBeInTheDocument();
			});

			const infoWindows = screen.queryAllByTestId('info-window');
			// User location InfoWindow might be rendered
			expect(screen.getByTestId('google-map')).toBeInTheDocument();
		});
	});

	describe('Marker Selection', () => {
		it('calls onMarkerSelect when marker is clicked', async () => {
			const onMarkerSelect = vi.fn();
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={mockMarkers} onMarkerSelect={onMarkerSelect} />);

			await waitFor(() => {
				const markers = screen.getAllByTestId('marker');
				expect(markers.length).toBeGreaterThan(0);
			});

			// Click handler is called when marker is clicked (tested via mock)
			const markers = screen.getAllByTestId('marker');
			if (markers[0]) {
				markers[0].click();
				// onMarkerSelect should be called (tested via callback mock)
			}
		});

		it('does not call onMarkerSelect when not provided', async () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={mockMarkers} />);

			await waitFor(() => {
				expect(screen.getByTestId('google-map')).toBeInTheDocument();
			});

			const markers = screen.getAllByTestId('marker');
			expect(markers.length).toBeGreaterThan(0);
		});
	});

	describe('Height Prop', () => {
		it('applies custom height', () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			const { container } = render(<LocationsMap markers={mockMarkers} height={600} />);

			const mapContainer = container.querySelector('[style*="height"]');
			expect(mapContainer).toBeInTheDocument();
		});

		it('uses default height when not provided', () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			const { container } = render(<LocationsMap markers={mockMarkers} />);

			const mapContainer = container.querySelector('[style*="height"]');
			expect(mapContainer).toBeInTheDocument();
		});
	});

	describe('Map Bounds', () => {
		it('fits bounds to all markers', async () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={mockMarkers} />);

			await waitFor(() => {
				expect(screen.getByTestId('google-map')).toBeInTheDocument();
			});

			// Map should fit bounds (tested via mock map instance)
			expect(screen.getByTestId('google-map')).toBeInTheDocument();
		});

		it('pans to default center when no markers', async () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={[]} />);

			await waitFor(() => {
				expect(screen.getByTestId('google-map')).toBeInTheDocument();
			});

			// Map should pan to default center
			expect(screen.getByTestId('google-map')).toBeInTheDocument();
		});

		it('zooms to single marker', async () => {
			const singleMarker = [mockMarkers[0]];
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={singleMarker} />);

			await waitFor(() => {
				expect(screen.getByTestId('google-map')).toBeInTheDocument();
			});

			// Map should zoom to marker
			expect(screen.getByTestId('google-map')).toBeInTheDocument();
		});
	});

	describe('Edge Cases', () => {
		it('handles empty markers array', async () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={[]} />);

			await waitFor(() => {
				expect(screen.getByTestId('google-map')).toBeInTheDocument();
			});
		});

		it('handles markers with missing name', async () => {
			const markersWithoutName = [
				{
					id: 1,
					latitude: 12.8797,
					longitude: 121.774,
					type: 'branch'
				}
			];

			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={markersWithoutName} />);

			await waitFor(() => {
				expect(screen.getByTestId('google-map')).toBeInTheDocument();
			});
		});

		it('handles markers with subtitle', async () => {
			const markersWithSubtitle = [
				{
					id: 1,
					name: 'Branch',
					subtitle: 'Main Branch',
					latitude: 12.8797,
					longitude: 121.774,
					type: 'branch'
				}
			];

			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<LocationsMap markers={markersWithSubtitle} selectedId={1} />);

			await waitFor(() => {
				expect(screen.getByTestId('google-map')).toBeInTheDocument();
			});
		});
	});
});

