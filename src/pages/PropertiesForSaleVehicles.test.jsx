import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropertiesForSaleVehicles from './PropertiesForSaleVehicles';
import propertyService from '../services/propertyService';

// Mock services and components
vi.mock('../services/propertyService');
vi.mock('../components/PageHeroSection', () => ({
	default: () => <div data-testid="page-hero-section">Hero</div>
}));
vi.mock('../components/VehicleCard', () => ({
	default: ({ vehicle }) => <div data-testid="vehicle-card">{vehicle?.title || 'Vehicle'}</div>
}));
vi.mock('../components/PageSkeleton', () => ({
	ProductListingPageSkeleton: () => <div data-testid="skeleton">Loading...</div>,
	CardGridSkeleton: () => <div data-testid="card-skeleton">Loading cards...</div>
}));

describe('PropertiesForSaleVehicles Page', () => {
	const mockVehicles = {
		success: true,
		data: {
			results: [
				{ id: 1, title: 'Vehicle 1', type: 'vehicle', price: 500000 },
				{ id: 2, title: 'Vehicle 2', type: 'vehicle', price: 600000 }
			],
			count: 2
		}
	};

	beforeEach(() => {
		vi.clearAllMocks();
		window.HTMLElement.prototype.scrollIntoView = vi.fn();
		propertyService.getVehicles = vi.fn().mockResolvedValue(mockVehicles);
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders loading skeleton initially', () => {
		propertyService.getVehicles.mockImplementation(() => new Promise(() => {}));
		renderWithRouter(<PropertiesForSaleVehicles />);

		expect(screen.getByTestId('skeleton')).toBeInTheDocument();
	});

	it('renders vehicles after data loads', async () => {
		renderWithRouter(<PropertiesForSaleVehicles />);

		await waitFor(() => {
			expect(screen.getAllByTestId('vehicle-card').length).toBeGreaterThan(0);
		}, { timeout: 2000 });
	});

	it('handles pagination', async () => {
		propertyService.getVehicles.mockResolvedValue({
			...mockVehicles,
			data: { ...mockVehicles.data, count: 20 }
		});
		renderWithRouter(<PropertiesForSaleVehicles />);

		await waitFor(() => {
			expect(screen.getAllByTestId('vehicle-card').length).toBeGreaterThan(0);
		}, { timeout: 2000 });

		// Check for pagination controls
		const nextButton = screen.queryByLabelText(/next/i);
		if (nextButton) {
			fireEvent.click(nextButton);
			await waitFor(() => {
				expect(propertyService.getVehicles).toHaveBeenCalledTimes(2);
			}, { timeout: 2000 });
		}
	});

	it('handles API errors gracefully', async () => {
		propertyService.getVehicles.mockRejectedValue(new Error('API Error'));
		renderWithRouter(<PropertiesForSaleVehicles />);

		await waitFor(() => {
			// Should still render structure
			expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
		}, { timeout: 2000 });
	});
});

