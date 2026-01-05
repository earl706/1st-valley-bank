import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VehicleCard from './VehicleCard';

// Mock Modal component
vi.mock('./Modal', () => ({
	default: ({ isOpen, onClose, title, price, location, year, plateNumber }) =>
		isOpen ? (
			<div data-testid="vehicle-modal">
				<div>{title}</div>
				<div>{price}</div>
				<div>{location}</div>
				<div>{year}</div>
				<div>{plateNumber}</div>
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
		Calendar: () => <div data-testid="calendar-icon" />,
		Hash: () => <div data-testid="hash-icon" />,
		Eye: () => <div data-testid="eye-icon" />
	};
});

describe('VehicleCard Component', () => {
	const mockVehicle = {
		id: 1,
		title: '2023 Toyota Camry',
		make: 'Toyota',
		model: 'Camry',
		year: 2023,
		plate_number: 'ABC-1234',
		price: 1500000,
		location: 'Manila, Philippines',
		main_image: '/test-vehicle.jpg',
		description: 'A reliable sedan',
		additional_images: ['/vehicle1.jpg', '/vehicle2.jpg']
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders vehicle card with basic information', () => {
		render(
			<BrowserRouter>
				<VehicleCard vehicle={mockVehicle} />
			</BrowserRouter>
		);

		// VehicleCard doesn't display title in card, only in modal
		expect(screen.getByText('Manila, Philippines')).toBeInTheDocument();
		expect(screen.getByText('2023')).toBeInTheDocument();
		expect(screen.getByText('ABC-1234')).toBeInTheDocument();
		expect(screen.getByText('₱1,500,000')).toBeInTheDocument();
	});

	it('renders vehicle image', () => {
		render(
			<BrowserRouter>
				<VehicleCard vehicle={mockVehicle} />
			</BrowserRouter>
		);

		const image = screen.getByAltText('2023 Toyota Camry');
		expect(image).toHaveAttribute('src', '/test-vehicle.jpg');
	});

	it('opens modal when View Details button is clicked', async () => {
		render(
			<BrowserRouter>
				<VehicleCard vehicle={mockVehicle} />
			</BrowserRouter>
		);

		const viewButton = screen.getByText('View Details');
		fireEvent.click(viewButton);

		await waitFor(() => {
			expect(screen.getByTestId('vehicle-modal')).toBeInTheDocument();
		});

		// Title is in modal
		expect(screen.getByText('2023 Toyota Camry')).toBeInTheDocument();
		// Year appears in both card and modal, use getAllByText
		const yearElements = screen.getAllByText('2023');
		expect(yearElements.length).toBeGreaterThan(0);
	});

	it('closes modal when close button is clicked', async () => {
		render(
			<BrowserRouter>
				<VehicleCard vehicle={mockVehicle} />
			</BrowserRouter>
		);

		const viewButton = screen.getByText('View Details');
		fireEvent.click(viewButton);

		await waitFor(() => {
			expect(screen.getByTestId('vehicle-modal')).toBeInTheDocument();
		});

		const closeButton = screen.getByText('Close');
		fireEvent.click(closeButton);

		await waitFor(() => {
			expect(screen.queryByTestId('vehicle-modal')).not.toBeInTheDocument();
		});
	});

	it('handles missing image gracefully', () => {
		const vehicleWithoutImage = { ...mockVehicle, main_image: '' };
		render(
			<BrowserRouter>
				<VehicleCard vehicle={vehicleWithoutImage} />
			</BrowserRouter>
		);

		expect(screen.getByText('No Image')).toBeInTheDocument();
	});

	it('formats price correctly for large numbers', () => {
		const expensiveVehicle = { ...mockVehicle, price: 5000000 };
		render(
			<BrowserRouter>
				<VehicleCard vehicle={expensiveVehicle} />
			</BrowserRouter>
		);

		expect(screen.getByText('₱5,000,000')).toBeInTheDocument();
	});

	it('handles invalid price gracefully', () => {
		const invalidPriceVehicle = { ...mockVehicle, price: 'invalid' };
		render(
			<BrowserRouter>
				<VehicleCard vehicle={invalidPriceVehicle} />
			</BrowserRouter>
		);

		expect(screen.getByText('₱N/A')).toBeInTheDocument();
	});

	it('handles missing optional fields', () => {
		const minimalVehicle = {
			id: 2,
			title: 'Basic Vehicle',
			price: 500000,
			main_image: '/image.jpg',
			location: 'N/A',
			year: 'N/A'
		};
		render(
			<BrowserRouter>
				<VehicleCard vehicle={minimalVehicle} />
			</BrowserRouter>
		);

		// VehicleCard displays location, year, and price in card
		// N/A appears multiple times, just check that price is displayed
		expect(screen.getByText('₱500,000')).toBeInTheDocument();
	});
});

