import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropertyCard from './PropertyCard';

// Mock Modal component
vi.mock('./Modal', () => ({
	default: ({ isOpen, onClose, title, price, location }) =>
		isOpen ? (
			<div data-testid="property-modal">
				<div>{title}</div>
				<div>{price}</div>
				<div>{location}</div>
				<button onClick={onClose}>Close</button>
			</div>
		) : null
}));

// Mock icons
vi.mock('lucide-react', async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...actual,
		MapPin: () => <div data-testid="map-pin-icon" />,
		Hash: () => <div data-testid="hash-icon" />,
		Eye: () => <div data-testid="eye-icon" />,
		Ruler: () => <div data-testid="ruler-icon" />
	};
});

describe('PropertyCard Component', () => {
	const mockProperty = {
		id: 1,
		title: 'Beautiful House',
		property_code: 'PROP-001',
		property_type: 'real_estate',
		property_type_display: 'Real Estate',
		price: 5000000,
		location: 'Manila, Philippines',
		area: 150,
		main_image: '/test-image.jpg',
		description: 'A beautiful house in the city',
		additional_images: ['/image1.jpg', '/image2.jpg']
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders property card with basic information', () => {
		render(
			<BrowserRouter>
				<PropertyCard property={mockProperty} />
			</BrowserRouter>
		);

		expect(screen.getByText('Beautiful House')).toBeInTheDocument();
		expect(screen.getByText('Manila, Philippines')).toBeInTheDocument();
		expect(screen.getByText('PROP-001')).toBeInTheDocument();
		expect(screen.getByText('150 sqm')).toBeInTheDocument();
		expect(screen.getByText('₱5,000,000')).toBeInTheDocument();
	});

	it('renders property image', () => {
		render(
			<BrowserRouter>
				<PropertyCard property={mockProperty} />
			</BrowserRouter>
		);

		const image = screen.getByAltText('Property PROP-001');
		expect(image).toHaveAttribute('src', '/test-image.jpg');
	});

	it('opens modal when View Details button is clicked', async () => {
		render(
			<BrowserRouter>
				<PropertyCard property={mockProperty} />
			</BrowserRouter>
		);

		const viewButton = screen.getByText('View Details');
		fireEvent.click(viewButton);

		await waitFor(() => {
			expect(screen.getByTestId('property-modal')).toBeInTheDocument();
		});

		expect(screen.getByText('Beautiful House - PROP-001')).toBeInTheDocument();
	});

	it('closes modal when close button is clicked', async () => {
		render(
			<BrowserRouter>
				<PropertyCard property={mockProperty} />
			</BrowserRouter>
		);

		const viewButton = screen.getByText('View Details');
		fireEvent.click(viewButton);

		await waitFor(() => {
			expect(screen.getByTestId('property-modal')).toBeInTheDocument();
		});

		const closeButton = screen.getByText('Close');
		fireEvent.click(closeButton);

		await waitFor(() => {
			expect(screen.queryByTestId('property-modal')).not.toBeInTheDocument();
		});
	});

	it('handles missing property code gracefully', () => {
		const propertyWithoutCode = { ...mockProperty, property_code: null };
		render(
			<BrowserRouter>
				<PropertyCard property={propertyWithoutCode} />
			</BrowserRouter>
		);

		expect(screen.getByText('Beautiful House')).toBeInTheDocument();
		expect(screen.queryByText('PROP-001')).not.toBeInTheDocument();
	});

	it('handles missing area gracefully', () => {
		const propertyWithoutArea = { ...mockProperty, area: null };
		render(
			<BrowserRouter>
				<PropertyCard property={propertyWithoutArea} />
			</BrowserRouter>
		);

		expect(screen.getByText('Beautiful House')).toBeInTheDocument();
		expect(screen.queryByText('150 sqm')).not.toBeInTheDocument();
	});

	it('formats price correctly for large numbers', () => {
		const expensiveProperty = { ...mockProperty, price: 50000000 };
		render(
			<BrowserRouter>
				<PropertyCard property={expensiveProperty} />
			</BrowserRouter>
		);

		expect(screen.getByText('₱50,000,000')).toBeInTheDocument();
	});

	it('handles invalid price gracefully', () => {
		const invalidPriceProperty = { ...mockProperty, price: 'invalid' };
		render(
			<BrowserRouter>
				<PropertyCard property={invalidPriceProperty} />
			</BrowserRouter>
		);

		expect(screen.getByText('₱N/A')).toBeInTheDocument();
	});

	it('uses property_type_display if title is missing', () => {
		const propertyWithoutTitle = { ...mockProperty, title: null };
		render(
			<BrowserRouter>
				<PropertyCard property={propertyWithoutTitle} />
			</BrowserRouter>
		);

		expect(screen.getByText('Real Estate')).toBeInTheDocument();
	});

	it('displays loading state while image is loading', () => {
		render(
			<BrowserRouter>
				<PropertyCard property={mockProperty} />
			</BrowserRouter>
		);

		// Image should be present but might not be loaded yet
		const image = screen.getByAltText('Property PROP-001');
		expect(image).toBeInTheDocument();
	});
});

