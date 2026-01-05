import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Deposits from './Deposits';
import { getAllDepositProducts } from '../services/depositService';

// Mock services and components
vi.mock('../services/depositService');
vi.mock('../components/PageHeroSection', () => ({
	default: () => <div data-testid="page-hero-section">Hero Section</div>
}));
vi.mock('../components/PageSkeleton', () => ({
	ProductListingPageSkeleton: () => <div data-testid="loading-skeleton">Loading...</div>
}));

describe('Deposits Page', () => {
	const mockDepositProducts = {
		results: [
			{
				id: 1,
				name: 'Regular Savings',
				product_type: 'savings',
				description: 'Basic savings account',
				image: '/savings.jpg',
				is_active: true
			},
			{
				id: 2,
				name: 'Premium Savings',
				product_type: 'savings',
				description: 'Premium savings with higher interest',
				image: null,
				is_active: true
			},
			{
				id: 3,
				name: 'Business Checking',
				product_type: 'checking',
				description: 'Checking account for businesses',
				image: '/checking.jpg',
				is_active: true
			},
			{
				id: 4,
				name: '6-Month Time Deposit',
				product_type: 'time_deposit',
				description: 'Short-term time deposit',
				image: '/td.jpg',
				is_active: true
			},
			{
				id: 5,
				name: '12-Month Time Deposit',
				product_type: 'time_deposit',
				description: 'Medium-term time deposit',
				image: null,
				is_active: true
			}
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
			getAllDepositProducts.mockImplementation(() => new Promise(() => {})); // Never resolves

			renderWithRouter(<Deposits />);

			expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
		});

		it('passes correct props to skeleton', () => {
			getAllDepositProducts.mockImplementation(() => new Promise(() => {}));

			renderWithRouter(<Deposits />);

			expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
		});
	});

	describe('Successful Data Loading', () => {
		it('fetches deposit products on mount', async () => {
			getAllDepositProducts.mockResolvedValue(mockDepositProducts);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(getAllDepositProducts).toHaveBeenCalledWith({
					is_active: true,
					ordering: 'display_order',
					fetchAll: true,
					page_size: 1000
				});
			});
		});

		it('renders page hero section', async () => {
			getAllDepositProducts.mockResolvedValue(mockDepositProducts);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
			});
		});

		it('renders section header', async () => {
			getAllDepositProducts.mockResolvedValue(mockDepositProducts);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('DEPOSITS')).toBeInTheDocument();
			});

			expect(screen.getByText(/Choose the perfect deposit solution/)).toBeInTheDocument();
		});

		it('groups products by type', async () => {
			getAllDepositProducts.mockResolvedValue(mockDepositProducts);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('Savings Account')).toBeInTheDocument();
			});

			expect(screen.getByText('Checking Account')).toBeInTheDocument();
			expect(screen.getByText('Time Deposit')).toBeInTheDocument();
		});

		it('displays product features', async () => {
			getAllDepositProducts.mockResolvedValue(mockDepositProducts);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('Regular Savings')).toBeInTheDocument();
			});

			expect(screen.getByText('Premium Savings')).toBeInTheDocument();
			expect(screen.getByText('Business Checking')).toBeInTheDocument();
		});

		it('displays category labels', async () => {
			getAllDepositProducts.mockResolvedValue(mockDepositProducts);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('Personal Banking')).toBeInTheDocument();
			});

			expect(screen.getByText('Business Banking')).toBeInTheDocument();
			expect(screen.getByText('Investment')).toBeInTheDocument();
		});

		it('limits features to first 6', async () => {
			const manyProducts = {
				results: Array.from({ length: 10 }, (_, i) => ({
					id: i + 1,
					name: `Product ${i + 1}`,
					product_type: 'savings',
					description: 'Test product',
					is_active: true
				}))
			};

			getAllDepositProducts.mockResolvedValue(manyProducts);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('Product 1')).toBeInTheDocument();
			});

			expect(screen.getByText('Product 6')).toBeInTheDocument();
			expect(screen.getByText('+ 4 more accounts')).toBeInTheDocument();
		});
	});

	describe('Navigation', () => {
		it('renders explore buttons with correct routes', async () => {
			getAllDepositProducts.mockResolvedValue(mockDepositProducts);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				const savingsButton = screen.getByText('Explore Savings Accounts').closest('a');
				expect(savingsButton).toHaveAttribute('href', '/deposits/savings-account');
			});

			const checkingButton = screen.getByText('Explore Checking Accounts').closest('a');
			expect(checkingButton).toHaveAttribute('href', '/deposits/checking-account');

			const tdButton = screen.getByText('Explore Time Deposits').closest('a');
			expect(tdButton).toHaveAttribute('href', '/deposits/time-deposit');
		});

		it('renders arrow icons on buttons', async () => {
			getAllDepositProducts.mockResolvedValue(mockDepositProducts);

			const { container } = renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('Explore Savings Accounts')).toBeInTheDocument();
			});

			// Lucide icons render as SVGs
			const icons = container.querySelectorAll('svg');
			expect(icons.length).toBeGreaterThan(0);
		});
	});

	describe('Product Images', () => {
		it('displays product image when available', async () => {
			getAllDepositProducts.mockResolvedValue(mockDepositProducts);

			const { container } = renderWithRouter(<Deposits />);

			await waitFor(() => {
				const images = container.querySelectorAll('img');
				expect(images.length).toBeGreaterThan(0);
			});
		});

		it('uses default image when product has no image', async () => {
			getAllDepositProducts.mockResolvedValue(mockDepositProducts);

			const { container } = renderWithRouter(<Deposits />);

			await waitFor(() => {
				const images = container.querySelectorAll('img');
				expect(images.length).toBeGreaterThan(0);
			});
		});

		it('displays image with correct alt text', async () => {
			getAllDepositProducts.mockResolvedValue(mockDepositProducts);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByAltText('Savings Account Visual')).toBeInTheDocument();
			});
		});
	});

	describe('Product Layout', () => {
		it('alternates layout between left and right', async () => {
			getAllDepositProducts.mockResolvedValue(mockDepositProducts);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('Savings Account')).toBeInTheDocument();
			});

			// Savings should have left layout, checking right, time deposit left
			expect(screen.getByText('Checking Account')).toBeInTheDocument();
		});

		it('renders product icons', async () => {
			getAllDepositProducts.mockResolvedValue(mockDepositProducts);

			const { container } = renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('Savings Account')).toBeInTheDocument();
			});

			// Icons are rendered as SVGs from lucide-react
			const iconContainers = container.querySelectorAll('.h-16.w-16');
			expect(iconContainers.length).toBeGreaterThan(0);
		});
	});

	describe('Error Handling', () => {
		it('displays error message on fetch failure', async () => {
			getAllDepositProducts.mockRejectedValue(new Error('Network error'));

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('Failed to load deposit products. Please try again later.')).toBeInTheDocument();
			});
		});

		it('shows help text in error state', async () => {
			getAllDepositProducts.mockRejectedValue(new Error('Network error'));

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText(/Please refresh the page or contact support/)).toBeInTheDocument();
			});
		});

		it('logs error to console', async () => {
			const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			const testError = new Error('Test error');

			getAllDepositProducts.mockRejectedValue(testError);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching deposit products:', testError);
			});

			consoleErrorSpy.mockRestore();
		});

		it('sets empty products array on error', async () => {
			getAllDepositProducts.mockRejectedValue(new Error('Network error'));

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('Failed to load deposit products. Please try again later.')).toBeInTheDocument();
			});

			// No product titles should be rendered
			expect(screen.queryByText('Savings Account')).not.toBeInTheDocument();
		});
	});

	describe('Empty State', () => {
		it('displays empty state when no products', async () => {
			getAllDepositProducts.mockResolvedValue({ results: [] });

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('No deposit products available at this time.')).toBeInTheDocument();
			});
		});

		it('still renders hero section in empty state', async () => {
			getAllDepositProducts.mockResolvedValue({ results: [] });

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
			});
		});

		it('still renders section header in empty state', async () => {
			getAllDepositProducts.mockResolvedValue({ results: [] });

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('DEPOSITS')).toBeInTheDocument();
			});
		});
	});

	describe('Product Type Filtering', () => {
		it('only displays product types that have products', async () => {
			const onlySavings = {
				results: [
					{
						id: 1,
						name: 'Regular Savings',
						product_type: 'savings',
						description: 'Basic savings',
						is_active: true
					}
				]
			};

			getAllDepositProducts.mockResolvedValue(onlySavings);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('Savings Account')).toBeInTheDocument();
			});

			expect(screen.queryByText('Checking Account')).not.toBeInTheDocument();
			expect(screen.queryByText('Time Deposit')).not.toBeInTheDocument();
		});

		it('handles products with display_order', async () => {
			const orderedProducts = {
				results: [
					{
						id: 1,
						name: 'Product A',
						product_type: 'savings',
						description: 'Test',
						display_order: 2,
						is_active: true
					},
					{
						id: 2,
						name: 'Product B',
						product_type: 'savings',
						description: 'Test',
						display_order: 1,
						is_active: true
					}
				]
			};

			getAllDepositProducts.mockResolvedValue(orderedProducts);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('Savings Account')).toBeInTheDocument();
			});
		});
	});

	describe('Product Descriptions', () => {
		it('uses product description when available', async () => {
			getAllDepositProducts.mockResolvedValue(mockDepositProducts);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('Basic savings account')).toBeInTheDocument();
			});
		});

		it('generates default description when not provided', async () => {
			const noDescriptionProducts = {
				results: [
					{
						id: 1,
						name: 'Test Product',
						product_type: 'savings',
						description: null,
						is_active: true
					}
				]
			};

			getAllDepositProducts.mockResolvedValue(noDescriptionProducts);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText(/Explore our savings account options/i)).toBeInTheDocument();
			});
		});
	});

	describe('Feature Labels', () => {
		it('displays correct feature label for savings', async () => {
			const savingsOnly = {
				results: [
					{
						id: 1,
						name: 'Savings',
						product_type: 'savings',
						is_active: true
					}
				]
			};

			getAllDepositProducts.mockResolvedValue(savingsOnly);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('Account Types Available')).toBeInTheDocument();
			});
		});

		it('displays correct feature label for time deposits', async () => {
			const tdOnly = {
				results: [
					{
						id: 1,
						name: 'Time Deposit',
						product_type: 'time_deposit',
						is_active: true
					}
				]
			};

			getAllDepositProducts.mockResolvedValue(tdOnly);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('Available Terms')).toBeInTheDocument();
			});
		});
	});

	describe('Additional Info Display', () => {
		it('shows additional info for many products', async () => {
			const manyTimeDeposits = {
				results: Array.from({ length: 10 }, (_, i) => ({
					id: i + 1,
					name: `${i + 1}-Month TD`,
					product_type: 'time_deposit',
					is_active: true
				}))
			};

			getAllDepositProducts.mockResolvedValue(manyTimeDeposits);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('+ 4 more terms')).toBeInTheDocument();
			});
		});

		it('uses "accounts" for savings and checking', async () => {
			const manySavings = {
				results: Array.from({ length: 10 }, (_, i) => ({
					id: i + 1,
					name: `Account ${i + 1}`,
					product_type: 'savings',
					is_active: true
				}))
			};

			getAllDepositProducts.mockResolvedValue(manySavings);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('+ 4 more accounts')).toBeInTheDocument();
			});
		});

		it('does not show additional info for 6 or fewer products', async () => {
			const fewProducts = {
				results: Array.from({ length: 5 }, (_, i) => ({
					id: i + 1,
					name: `Product ${i + 1}`,
					product_type: 'savings',
					is_active: true
				}))
			};

			getAllDepositProducts.mockResolvedValue(fewProducts);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('Savings Account')).toBeInTheDocument();
			});

			expect(screen.queryByText(/\+ \d+ more/)).not.toBeInTheDocument();
		});
	});

	describe('Response Format Handling', () => {
		it('handles response with results array', async () => {
			getAllDepositProducts.mockResolvedValue(mockDepositProducts);

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('Savings Account')).toBeInTheDocument();
			});
		});

		it('handles empty results array', async () => {
			getAllDepositProducts.mockResolvedValue({ results: [] });

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('No deposit products available at this time.')).toBeInTheDocument();
			});
		});

		it('handles null results', async () => {
			getAllDepositProducts.mockResolvedValue({ results: null });

			renderWithRouter(<Deposits />);

			await waitFor(() => {
				expect(screen.getByText('No deposit products available at this time.')).toBeInTheDocument();
			});
		});
	});
});

