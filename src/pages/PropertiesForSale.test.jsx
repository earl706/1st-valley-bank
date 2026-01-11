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

	describe('Error Handling for API Failures', () => {
		it('handles 400 Bad Request error for vehicles', async () => {
			const error = new Error('Bad Request');
			error.response = { status: 400, data: { error: 'Invalid request' } };
			propertyService.getVehicles.mockRejectedValue(error);
			propertyService.getRealEstate.mockResolvedValue(mockRealEstate);

			renderWithRouter(<PropertiesForSale />);

			await waitFor(() => {
				expect(propertyService.getVehicles).toHaveBeenCalled();
			}, { timeout: 3000 });

			// Page should still render (real estate might still load)
			expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
		});

		it('handles 404 Not Found error for real estate', async () => {
			const error = new Error('Not Found');
			error.response = { status: 404, data: { error: 'Resource not found' } };
			propertyService.getVehicles.mockResolvedValue(mockVehicles);
			propertyService.getRealEstate.mockRejectedValue(error);

			renderWithRouter(<PropertiesForSale />);

			await waitFor(() => {
				expect(propertyService.getRealEstate).toHaveBeenCalled();
			}, { timeout: 3000 });
		});

		it('handles 500 Internal Server Error', async () => {
			const error = new Error('Internal Server Error');
			error.response = { status: 500, data: { error: 'Server error' } };
			propertyService.getVehicles.mockRejectedValue(error);
			propertyService.getRealEstate.mockRejectedValue(error);

			renderWithRouter(<PropertiesForSale />);

			await waitFor(() => {
				expect(propertyService.getVehicles).toHaveBeenCalled();
				expect(propertyService.getRealEstate).toHaveBeenCalled();
			}, { timeout: 3000 });

			// Page should handle server error gracefully without crashing
			expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
		});

		it('handles network errors (no response)', async () => {
			const error = new Error('Network Error');
			error.request = {}; // Simulate network error
			propertyService.getVehicles.mockRejectedValue(error);
			propertyService.getRealEstate.mockRejectedValue(error);

			renderWithRouter(<PropertiesForSale />);

			await waitFor(() => {
				expect(propertyService.getVehicles).toHaveBeenCalled();
			}, { timeout: 3000 });
		});

		it('handles timeout errors', async () => {
			const error = new Error('Request timeout');
			error.code = 'ECONNABORTED';
			propertyService.getVehicles.mockRejectedValue(error);
			propertyService.getRealEstate.mockRejectedValue(error);

			renderWithRouter(<PropertiesForSale />);

			await waitFor(() => {
				expect(propertyService.getVehicles).toHaveBeenCalled();
			}, { timeout: 3000 });
		});

		it('handles service returning success:false', async () => {
			propertyService.getVehicles.mockResolvedValue({
				success: false,
				message: 'Failed to load vehicles',
				error: 'Service error'
			});
			propertyService.getRealEstate.mockResolvedValue({
				success: false,
				message: 'Failed to load properties',
				error: 'Service error'
			});

			renderWithRouter(<PropertiesForSale />);

			await waitFor(() => {
				expect(propertyService.getVehicles).toHaveBeenCalled();
				expect(propertyService.getRealEstate).toHaveBeenCalled();
			}, { timeout: 3000 });

			// Page should handle service errors gracefully
			expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
		});
	});

	describe('Loading States', () => {
		it('shows loading skeleton while fetching vehicles and real estate', () => {
			propertyService.getVehicles.mockImplementation(() => new Promise(() => {}));
			propertyService.getRealEstate.mockImplementation(() => new Promise(() => {}));
			renderWithRouter(<PropertiesForSale />);

			// Should show skeleton while loading
			expect(screen.getByTestId('skeleton')).toBeInTheDocument();
		});

		it('hides loading skeleton after both APIs load successfully', async () => {
			renderWithRouter(<PropertiesForSale />);

			// Wait for data to load
			await waitFor(() => {
				expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
			}, { timeout: 3000 });

			// Both sections should render
			expect(screen.getAllByTestId('vehicle-card').length).toBeGreaterThan(0);
			expect(screen.getAllByTestId('property-card').length).toBeGreaterThan(0);
		});

		it('handles loading state when one API fails and one succeeds', async () => {
			propertyService.getVehicles.mockRejectedValue(new Error('API Error'));
			propertyService.getRealEstate.mockResolvedValue(mockRealEstate);

			renderWithRouter(<PropertiesForSale />);

			await waitFor(() => {
				expect(propertyService.getVehicles).toHaveBeenCalled();
				expect(propertyService.getRealEstate).toHaveBeenCalled();
			}, { timeout: 3000 });

			// Skeleton should disappear after both calls complete
			await waitFor(() => {
				expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
			}, { timeout: 2000 });
		});

		it('shows loading state transition from skeleton to content', async () => {
			propertyService.getVehicles.mockImplementation(
				() => new Promise((resolve) => 
					setTimeout(() => resolve(mockVehicles), 100)
				)
			);
			propertyService.getRealEstate.mockImplementation(
				() => new Promise((resolve) => 
					setTimeout(() => resolve(mockRealEstate), 100)
				)
			);

			renderWithRouter(<PropertiesForSale />);

			// Initially shows skeleton
			expect(screen.getByTestId('skeleton')).toBeInTheDocument();

			// After loading completes, skeleton disappears and content appears
			await waitFor(() => {
				expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
				expect(screen.getAllByTestId('vehicle-card').length).toBeGreaterThan(0);
			}, { timeout: 2000 });
		});
	});
});

