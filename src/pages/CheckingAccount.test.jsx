import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CheckingAccount from './CheckingAccount';
import { getCheckingAccounts, getProductTypeRequirements } from '../services/depositService';

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

describe('CheckingAccount Page', () => {
	const mockAccounts = {
		results: [
			{
				id: 1,
				name: 'Business Checking',
				description: 'Business checking account',
				image: '/checking1.jpg',
				route: '/contact-us'
			},
			{
				id: 2,
				name: 'Personal Checking',
				description: 'Personal checking account',
				image: '/checking2.jpg',
				route: '/contact-us'
			}
		]
	};

	const mockRequirements = {
		requirements: [
			{ id: 1, title: 'Business Registration', description: 'DTI or SEC registration' },
			{ id: 2, title: 'Valid ID', description: 'Government-issued ID' }
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
			getCheckingAccounts.mockImplementation(() => new Promise(() => {}));
			getProductTypeRequirements.mockImplementation(() => new Promise(() => {}));

			renderWithRouter(<CheckingAccount />);

			expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
		});
	});

	describe('Successful Data Loading', () => {
		it('fetches accounts and requirements on mount', async () => {
			getCheckingAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<CheckingAccount />);

			await waitFor(() => {
				expect(getCheckingAccounts).toHaveBeenCalled();
				expect(getProductTypeRequirements).toHaveBeenCalledWith('checking');
			});
		});

		it('renders page hero section', async () => {
			getCheckingAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<CheckingAccount />);

			await waitFor(() => {
				expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
			});
		});

		it('renders section header', async () => {
			getCheckingAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<CheckingAccount />);

			await waitFor(() => {
				expect(screen.getByText('Checking Accounts')).toBeInTheDocument();
				expect(screen.getByText(/Choose the checking account/)).toBeInTheDocument();
			});
		});

		it('displays all checking accounts', async () => {
			getCheckingAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<CheckingAccount />);

			await waitFor(() => {
				expect(screen.getByText('Business Checking')).toBeInTheDocument();
				expect(screen.getByText('Personal Checking')).toBeInTheDocument();
			});
		});

		it('renders requirements section when requirements exist', async () => {
			getCheckingAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<CheckingAccount />);

			await waitFor(() => {
				expect(screen.getByTestId('requirements-section')).toBeInTheDocument();
			});
		});
	});

	describe('Error Handling', () => {
		it('handles fetch errors gracefully', async () => {
			const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			getCheckingAccounts.mockRejectedValue(new Error('Network error'));
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<CheckingAccount />);

			await waitFor(() => {
				expect(consoleErrorSpy).toHaveBeenCalledWith(
					'Error fetching checking account data:',
					expect.any(Error)
				);
			});

			consoleErrorSpy.mockRestore();
		});
	});

	describe('Scroll Behavior', () => {
		it('sets up scroll event listener', async () => {
			const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
			getCheckingAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<CheckingAccount />);

			await waitFor(() => {
				expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
			});

			addEventListenerSpy.mockRestore();
		});
	});

	describe('Empty State', () => {
		it('handles empty accounts array', async () => {
			getCheckingAccounts.mockResolvedValue({ results: [] });
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<CheckingAccount />);

			await waitFor(() => {
				expect(screen.getByText('Checking Accounts')).toBeInTheDocument();
			});
		});
	});
});

