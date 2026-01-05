import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TimeDeposit from './TimeDeposit';
import { getTimeDeposits, getProductTypeRequirements } from '../services/depositService';

// Mock services and components
vi.mock('../services/depositService');
vi.mock('../components/PageHeroSection', () => ({
	default: () => <div data-testid="page-hero-section">Hero Section</div>
}));
vi.mock('../components/RequirementsSection', () => ({
	default: ({ requirements, title }) => (
		<div data-testid="requirements-section">
			<h3>{title}</h3>
			<div data-testid="requirements-count">{requirements.length}</div>
		</div>
	)
}));
vi.mock('../components/PageSkeleton', () => ({
	ProductListingPageSkeleton: () => <div data-testid="loading-skeleton">Loading...</div>
}));

describe('TimeDeposit Page', () => {
	const mockDeposits = {
		results: [
			{
				id: 1,
				name: '6-Month Time Deposit',
				description: 'Short-term time deposit',
				image: '/td1.jpg',
				interest_rate_below: '2.5',
				interest_rate_above: '3.0',
				required_initial_deposit: '10000',
				route: '/contact-us'
			},
			{
				id: 2,
				name: '12-Month Time Deposit',
				description: 'Medium-term time deposit',
				image: '/td2.jpg',
				interest_rate_below: '3.0',
				interest_rate_above: '3.5',
				required_initial_deposit: '25000',
				route: '/contact-us'
			}
		]
	};

	const mockRequirements = {
		requirements: [
			{ id: 1, title: 'Valid ID', description: 'Government-issued ID' },
			{ id: 2, title: 'Initial Deposit', description: 'Minimum required amount' }
		]
	};

	beforeEach(() => {
		vi.clearAllMocks();
		// Mock IntersectionObserver
		global.IntersectionObserver = vi.fn(() => ({
			observe: vi.fn(),
			unobserve: vi.fn(),
			disconnect: vi.fn()
		}));
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	describe('Loading State', () => {
		it('shows loading skeleton initially', () => {
			getTimeDeposits.mockImplementation(() => new Promise(() => {}));
			getProductTypeRequirements.mockImplementation(() => new Promise(() => {}));

			renderWithRouter(<TimeDeposit />);

			expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
		});
	});

	describe('Successful Data Loading', () => {
		it('fetches deposits and requirements on mount', async () => {
			getTimeDeposits.mockResolvedValue(mockDeposits);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<TimeDeposit />);

			await waitFor(() => {
				expect(getTimeDeposits).toHaveBeenCalled();
				expect(getProductTypeRequirements).toHaveBeenCalledWith('time_deposit');
			});
		});

		it('renders page hero section', async () => {
			getTimeDeposits.mockResolvedValue(mockDeposits);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<TimeDeposit />);

			await waitFor(() => {
				expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
			});
		});

		it('renders section header', async () => {
			getTimeDeposits.mockResolvedValue(mockDeposits);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<TimeDeposit />);

			await waitFor(() => {
				expect(screen.getByText('Time Deposit')).toBeInTheDocument();
				expect(screen.getByText(/Choose the term that matches/)).toBeInTheDocument();
			});
		});

		it('displays all time deposits', async () => {
			getTimeDeposits.mockResolvedValue(mockDeposits);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<TimeDeposit />);

			await waitFor(() => {
				expect(screen.getByText('6-Month Time Deposit')).toBeInTheDocument();
				expect(screen.getByText('12-Month Time Deposit')).toBeInTheDocument();
			});
		});

		it('displays deposit details', async () => {
			getTimeDeposits.mockResolvedValue(mockDeposits);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<TimeDeposit />);

			await waitFor(() => {
				expect(screen.getByText(/2.5% - 3.0%/)).toBeInTheDocument();
				// The component renders required_initial_deposit as-is (string), so '10000' renders as '₱10000'
				expect(screen.getByText('₱10000')).toBeInTheDocument();
			});
		});

		it('renders requirements section when requirements exist', async () => {
			getTimeDeposits.mockResolvedValue(mockDeposits);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<TimeDeposit />);

			await waitFor(() => {
				expect(screen.getByTestId('requirements-section')).toBeInTheDocument();
			});
		});
	});

	describe('Error Handling', () => {
		it('handles fetch errors gracefully', async () => {
			const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			getTimeDeposits.mockRejectedValue(new Error('Network error'));
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<TimeDeposit />);

			await waitFor(() => {
				expect(consoleErrorSpy).toHaveBeenCalledWith(
					'Error fetching time deposit data:',
					expect.any(Error)
				);
			});

			consoleErrorSpy.mockRestore();
		});
	});

	describe('Scroll Behavior', () => {
		it('sets up scroll event listener', async () => {
			const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
			getTimeDeposits.mockResolvedValue(mockDeposits);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<TimeDeposit />);

			await waitFor(() => {
				expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
			});

			addEventListenerSpy.mockRestore();
		});
	});

	describe('Empty State', () => {
		it('handles empty deposits array', async () => {
			getTimeDeposits.mockResolvedValue({ results: [] });
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<TimeDeposit />);

			await waitFor(() => {
				expect(screen.getByText('Time Deposit')).toBeInTheDocument();
			});
		});
	});
});

