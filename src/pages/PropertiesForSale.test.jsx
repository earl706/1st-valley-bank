import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropertiesForSale from './PropertiesForSale';
import propertyService from '../services/propertyService';

// Mock services and components
vi.mock('../services/propertyService');
vi.mock('../components/PageHeroSection', () => ({
	default: () => <div data-testid="page-hero-section">Hero</div>
}));
vi.mock('../components/VehicleCard', () => ({
	default: ({ vehicle }) => <div data-testid="vehicle-card">{vehicle?.title || 'Vehicle'}</div>
}));
vi.mock('../components/PropertyCard', () => ({
	default: ({ property }) => <div data-testid="property-card">{property?.title || 'Property'}</div>
}));
vi.mock('../components/PageSkeleton', () => ({
	ProductListingPageSkeleton: () => <div data-testid="skeleton">Loading...</div>,
	CardGridSkeleton: () => <div data-testid="card-skeleton">Loading cards...</div>,
	SectionHeaderSkeleton: () => <div data-testid="header-skeleton">Loading header...</div>
}));

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
	observe: () => null,
	unobserve: () => null,
	disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

describe('PropertiesForSale Page', () => {
	const mockVehicles = {
		success: true,
		data: {
			results: [
				{ id: 1, title: 'Vehicle 1', type: 'vehicle' },
				{ id: 2, title: 'Vehicle 2', type: 'vehicle' }
			],
			count: 2
		}
	};

	const mockRealEstate = {
		success: true,
		data: {
			results: [
				{ id: 1, title: 'Property 1', type: 'real_estate' },
				{ id: 2, title: 'Property 2', type: 'real_estate' }
			],
			count: 2
		}
	};

	beforeEach(() => {
		vi.clearAllMocks();
		window.HTMLElement.prototype.scrollIntoView = vi.fn();
		propertyService.getVehicles = vi.fn().mockResolvedValue(mockVehicles);
		propertyService.getRealEstate = vi.fn().mockResolvedValue(mockRealEstate);
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders loading skeleton initially', () => {
		propertyService.getVehicles.mockImplementation(() => new Promise(() => {}));
		propertyService.getRealEstate.mockImplementation(() => new Promise(() => {}));
		renderWithRouter(<PropertiesForSale />);

		expect(screen.getByTestId('skeleton')).toBeInTheDocument();
	});

	it('renders vehicles after data loads', async () => {
		renderWithRouter(<PropertiesForSale />);

		await waitFor(() => {
			expect(screen.getAllByTestId('vehicle-card').length).toBeGreaterThan(0);
		}, { timeout: 2000 });
	});

	it('renders real estate after data loads', async () => {
		renderWithRouter(<PropertiesForSale />);

		await waitFor(() => {
			expect(screen.getAllByTestId('property-card').length).toBeGreaterThan(0);
		}, { timeout: 2000 });
	});

	it('handles API errors gracefully', async () => {
		propertyService.getVehicles.mockRejectedValue(new Error('API Error'));
		propertyService.getRealEstate.mockRejectedValue(new Error('API Error'));
		renderWithRouter(<PropertiesForSale />);

		await waitFor(() => {
			// Should still render structure
			expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
		}, { timeout: 2000 });
	});
});

