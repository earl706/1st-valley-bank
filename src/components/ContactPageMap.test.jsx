import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactPageMap from './ContactPageMap';

// Mock @react-google-maps/api using vi.hoisted
const { mockUseJsApiLoader, mockGoogleMap, mockMarker } = vi.hoisted(() => ({
	mockUseJsApiLoader: vi.fn(),
	mockGoogleMap: ({ children, center, zoom, mapContainerStyle, options }) => {
		return React.createElement('div', { 
			'data-testid': 'google-map',
			'data-center-lat': center.lat,
			'data-center-lng': center.lng,
			'data-zoom': zoom
		}, children);
	},
	mockMarker: ({ position, icon }) => {
		return React.createElement('div', { 
			'data-testid': 'marker',
			'data-lat': position.lat,
			'data-lng': position.lng,
			'data-has-icon': !!icon
		});
	}
}));

vi.mock('@react-google-maps/api', () => ({
	useJsApiLoader: (options) => mockUseJsApiLoader(options),
	GoogleMap: mockGoogleMap,
	Marker: mockMarker
}));

describe('ContactPageMap Component', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		import.meta.env.VITE_GOOGLE_MAPS_API_KEY = 'test-api-key';
		global.window = {
			google: {
				maps: {
					SymbolPath: {
						CIRCLE: 'CIRCLE'
					}
				}
			}
		};
	});

	describe('API Key Handling', () => {
		it('shows message when API key is missing', () => {
			import.meta.env.VITE_GOOGLE_MAPS_API_KEY = '';
			mockUseJsApiLoader.mockReturnValue({ isLoaded: false, loadError: null });

			render(<ContactPageMap />);

			expect(screen.getByText(/Google Maps API key missing/i)).toBeInTheDocument();
		});

		it('renders map when API key is provided', () => {
			import.meta.env.VITE_GOOGLE_MAPS_API_KEY = 'test-api-key';
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<ContactPageMap />);

			expect(screen.getByTestId('google-map')).toBeInTheDocument();
		});
	});

	describe('Loading States', () => {
		it('shows loading message when map is not loaded', () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: false, loadError: null });

			render(<ContactPageMap />);

			expect(screen.getByText(/Loading map/i)).toBeInTheDocument();
		});

		it('shows error message when loadError occurs', () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: false, loadError: new Error('Load failed') });

			render(<ContactPageMap />);

			expect(screen.getByText(/Failed to load Google Maps/i)).toBeInTheDocument();
		});
	});

	describe('Map Configuration', () => {
		it('uses default center when coordinates are not provided', () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<ContactPageMap />);

			const map = screen.getByTestId('google-map');
			expect(map).toHaveAttribute('data-center-lat', '7.4399999');
			expect(map).toHaveAttribute('data-center-lng', '124.9200001');
		});

		it('uses provided coordinates when valid', () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<ContactPageMap lat="10.123" lon="123.456" />);

			const map = screen.getByTestId('google-map');
			expect(map).toHaveAttribute('data-center-lat', '10.123');
			expect(map).toHaveAttribute('data-center-lng', '123.456');
		});

		it('uses default zoom (5) when coordinates are not provided', () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<ContactPageMap />);

			const map = screen.getByTestId('google-map');
			expect(map).toHaveAttribute('data-zoom', '5');
		});

		it('uses zoom 16 when coordinates are provided', () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<ContactPageMap lat="10.123" lon="123.456" />);

			const map = screen.getByTestId('google-map');
			expect(map).toHaveAttribute('data-zoom', '16');
		});
	});

	describe('Marker Rendering', () => {
		it('renders marker when valid coordinates are provided', () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<ContactPageMap lat="10.123" lon="123.456" />);

			const marker = screen.getByTestId('marker');
			expect(marker).toBeInTheDocument();
			expect(marker).toHaveAttribute('data-lat', '10.123');
			expect(marker).toHaveAttribute('data-lng', '123.456');
			expect(marker).toHaveAttribute('data-has-icon', 'true');
		});

		it('does not render marker when coordinates are not provided', () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<ContactPageMap />);

			expect(screen.queryByTestId('marker')).not.toBeInTheDocument();
		});

		it('does not render marker when coordinates are invalid', () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<ContactPageMap lat="invalid" lon="invalid" />);

			expect(screen.queryByTestId('marker')).not.toBeInTheDocument();
		});

		it('creates marker icon when map is loaded', () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<ContactPageMap lat="10.123" lon="123.456" />);

			const marker = screen.getByTestId('marker');
			expect(marker).toHaveAttribute('data-has-icon', 'true');
		});

		it('does not create marker icon when map is not loaded', () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: false, loadError: null });

			render(<ContactPageMap lat="10.123" lon="123.456" />);

			// Marker should not render when map is not loaded
			expect(screen.queryByTestId('marker')).not.toBeInTheDocument();
		});
	});

	describe('useJsApiLoader Configuration', () => {
		it('passes correct configuration to useJsApiLoader', () => {
			mockUseJsApiLoader.mockReturnValue({ isLoaded: true, loadError: null });

			render(<ContactPageMap />);

			expect(mockUseJsApiLoader).toHaveBeenCalledWith(
				expect.objectContaining({
					id: 'google-maps-script',
					googleMapsApiKey: 'test-api-key',
					libraries: ['places', 'maps']
				})
			);
		});
	});
});

