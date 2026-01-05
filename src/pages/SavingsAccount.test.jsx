import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SavingsAccount from './SavingsAccount';
import { getSavingsAccounts, getProductTypeRequirements } from '../services/depositService';

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

describe('SavingsAccount Page', () => {
	const mockAccounts = {
		results: [
			{
				id: 1,
				name: 'Regular Savings',
				description: 'Basic savings account',
				image: '/savings1.jpg',
				required_initial_deposit: '₱500',
				required_monthly_adb: '₱1,000',
				interest_rate_below: '0.5',
				interest_rate_above: '1.5',
				route: '/contact-us'
			},
			{
				id: 2,
				name: 'Premium Savings',
				description: 'Premium savings account',
				image: '/savings2.jpg',
				required_initial_deposit: '₱5,000',
				required_monthly_adb: '₱10,000',
				interest_rate_below: '1.0',
				interest_rate_above: '2.5',
				route: '/contact-us'
			}
		]
	};

	const mockRequirements = {
		requirements: [
			{ id: 1, title: 'Valid ID', description: 'Government-issued ID' },
			{ id: 2, title: 'Proof of Address', description: 'Utility bill or similar' }
		]
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	describe('Loading State', () => {
		it('shows loading skeleton initially', () => {
			getSavingsAccounts.mockImplementation(() => new Promise(() => {}));
			getProductTypeRequirements.mockImplementation(() => new Promise(() => {}));

			renderWithRouter(<SavingsAccount />);

			expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
		});
	});

	describe('Successful Data Loading', () => {
		it('fetches accounts and requirements on mount', async () => {
			getSavingsAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<SavingsAccount />);

			await waitFor(() => {
				expect(getSavingsAccounts).toHaveBeenCalled();
				expect(getProductTypeRequirements).toHaveBeenCalledWith('savings');
			});
		});

		it('renders page hero section', async () => {
			getSavingsAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<SavingsAccount />);

			await waitFor(() => {
				expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
			});
		});

		it('renders section header', async () => {
			getSavingsAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<SavingsAccount />);

			await waitFor(() => {
				expect(screen.getByText('Savings Accounts')).toBeInTheDocument();
				expect(screen.getByText(/Find the perfect savings account/)).toBeInTheDocument();
			});
		});

		it('displays all savings accounts', async () => {
			getSavingsAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<SavingsAccount />);

			await waitFor(() => {
				expect(screen.getByText('Regular Savings')).toBeInTheDocument();
				expect(screen.getByText('Premium Savings')).toBeInTheDocument();
			});
		});

		it('displays account details', async () => {
			getSavingsAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<SavingsAccount />);

			await waitFor(() => {
				expect(screen.getByText('₱500')).toBeInTheDocument();
				expect(screen.getByText('₱1,000')).toBeInTheDocument();
				expect(screen.getByText(/0.5% - 1.5%/)).toBeInTheDocument();
			});
		});

		it('displays account images', async () => {
			getSavingsAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<SavingsAccount />);

			await waitFor(() => {
				const images = screen.getAllByAltText(/visual/);
				expect(images.length).toBeGreaterThan(0);
			});
		});

		it('renders requirements section when requirements exist', async () => {
			getSavingsAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<SavingsAccount />);

			await waitFor(() => {
				expect(screen.getByTestId('requirements-section')).toBeInTheDocument();
				expect(screen.getByText('Requirements')).toBeInTheDocument();
			});
		});

		it('does not render requirements section when empty', async () => {
			getSavingsAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue({ requirements: [] });

			renderWithRouter(<SavingsAccount />);

			await waitFor(() => {
				expect(screen.queryByTestId('requirements-section')).not.toBeInTheDocument();
			});
		});
	});

	describe('Navigation', () => {
		it('renders Open Account buttons with correct routes', async () => {
			getSavingsAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<SavingsAccount />);

			await waitFor(() => {
				const buttons = screen.getAllByText('Open Account');
				expect(buttons.length).toBeGreaterThan(0);
			});

			const links = screen.getAllByRole('link');
			const openAccountLinks = links.filter(link => 
				link.textContent.includes('Open Account')
			);
			expect(openAccountLinks.length).toBeGreaterThan(0);
		});
	});

	describe('Error Handling', () => {
		it('handles fetch errors gracefully', async () => {
			const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			getSavingsAccounts.mockRejectedValue(new Error('Network error'));
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<SavingsAccount />);

			await waitFor(() => {
				expect(consoleErrorSpy).toHaveBeenCalledWith(
					'Error fetching savings account data:',
					expect.any(Error)
				);
			});

			consoleErrorSpy.mockRestore();
		});

		it('sets empty arrays on error', async () => {
			getSavingsAccounts.mockRejectedValue(new Error('Network error'));
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<SavingsAccount />);

			await waitFor(() => {
				expect(screen.queryByText('Regular Savings')).not.toBeInTheDocument();
			});
		});
	});

	describe('Account Details Display', () => {
		it('displays initial deposit requirement', async () => {
			getSavingsAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<SavingsAccount />);

			await waitFor(() => {
				// Multiple accounts render this label, use getAllByText
				const labels = screen.getAllByText('Initial Deposit:');
				expect(labels.length).toBeGreaterThan(0);
			});
		});

		it('displays minimum balance requirement', async () => {
			getSavingsAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<SavingsAccount />);

			await waitFor(() => {
				// Multiple accounts render this label, use getAllByText
				const labels = screen.getAllByText('Minimum Balance:');
				expect(labels.length).toBeGreaterThan(0);
			});
		});

		it('displays interest rate range', async () => {
			getSavingsAccounts.mockResolvedValue(mockAccounts);
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<SavingsAccount />);

			await waitFor(() => {
				// Multiple accounts render this label, use getAllByText
				const labels = screen.getAllByText('Interest Rate:');
				expect(labels.length).toBeGreaterThan(0);
			});
		});
	});

	describe('Empty State', () => {
		it('handles empty accounts array', async () => {
			getSavingsAccounts.mockResolvedValue({ results: [] });
			getProductTypeRequirements.mockResolvedValue(mockRequirements);

			renderWithRouter(<SavingsAccount />);

			await waitFor(() => {
				expect(screen.getByText('Savings Accounts')).toBeInTheDocument();
			});

			expect(screen.queryByText('Regular Savings')).not.toBeInTheDocument();
		});
	});
});

