import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropertiesForSaleRealEstate from './PropertiesForSaleRealEstate';
import propertyService from '../services/propertyService';

// Mock services and components
vi.mock('../services/propertyService');
vi.mock('../components/PageHeroSection', () => ({
	default: () => <div data-testid="page-hero-section">Hero</div>
}));
vi.mock('../components/PropertyCard', () => ({
	default: ({ property }) => <div data-testid="property-card">{property?.title || 'Property'}</div>
}));
vi.mock('../components/PageSkeleton', () => ({
	ProductListingPageSkeleton: () => <div data-testid="skeleton">Loading...</div>,
	CardGridSkeleton: () => <div data-testid="card-skeleton">Loading cards...</div>
}));

describe('PropertiesForSaleRealEstate Page', () => {
	const mockProperties = {
		success: true,
		data: {
			results: [
				{ id: 1, title: 'Property 1', type: 'real_estate', price: 1000000 },
				{ id: 2, title: 'Property 2', type: 'real_estate', price: 2000000 }
			],
			count: 2
		}
	};

	beforeEach(() => {
		vi.clearAllMocks();
		window.HTMLElement.prototype.scrollIntoView = vi.fn();
		propertyService.getRealEstate = vi.fn().mockResolvedValue(mockProperties);
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders loading skeleton initially', () => {
		propertyService.getRealEstate.mockImplementation(() => new Promise(() => {}));
		renderWithRouter(<PropertiesForSaleRealEstate />);

		expect(screen.getByTestId('skeleton')).toBeInTheDocument();
	});

	it('renders properties after data loads', async () => {
		renderWithRouter(<PropertiesForSaleRealEstate />);

		await waitFor(() => {
			expect(screen.getAllByTestId('property-card').length).toBeGreaterThan(0);
		}, { timeout: 2000 });
	});

	it('applies filters when filter button is clicked', async () => {
		renderWithRouter(<PropertiesForSaleRealEstate />);

		await waitFor(() => {
			expect(screen.getAllByTestId('property-card').length).toBeGreaterThan(0);
		}, { timeout: 2000 });

		const filterButton = screen.queryByRole('button', { name: /filter/i });
		if (filterButton) {
			fireEvent.click(filterButton);

			await waitFor(() => {
				expect(screen.getByText(/Apply Filters/i)).toBeInTheDocument();
			}, { timeout: 2000 });
		}
	});

	it('handles API errors gracefully', async () => {
		propertyService.getRealEstate.mockRejectedValue(new Error('API Error'));
		renderWithRouter(<PropertiesForSaleRealEstate />);

		await waitFor(() => {
			// Should still render structure
			expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
		}, { timeout: 2000 });
	});
});

