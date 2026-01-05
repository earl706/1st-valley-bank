import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoansAgriculture from './LoansAgriculture';
import loanService from '../services/loanService';
import successStoriesService from '../services/successStoriesService';

// Mock services and components
vi.mock('../services/loanService');
vi.mock('../services/successStoriesService');
vi.mock('../components/PageHeroSection', () => ({
	default: () => <div data-testid="page-hero-section">Hero Section</div>
}));
vi.mock('../components/LoanSubcategoriesSection', () => ({
	default: ({ sectionTitle, loanTypes }) => (
		<div data-testid="loan-subcategories-section">
			<h2>{sectionTitle}</h2>
			<div data-testid="loan-types-count">{loanTypes.length}</div>
		</div>
	)
}));
vi.mock('../components/SuccessStoriesSection', () => ({
	default: ({ title, stories }) => (
		<div data-testid="success-stories-section">
			<h2>{title}</h2>
			<div data-testid="stories-count">{stories.length}</div>
		</div>
	)
}));
vi.mock('../components/PageSkeleton', () => ({
	ProductListingPageSkeleton: () => <div data-testid="loading-skeleton">Loading...</div>
}));

describe('LoansAgriculture Page', () => {
	const mockLoanTypes = {
		results: [
			{
				id: 1,
				title: 'Agriculture Type 1',
				description: 'Description 1'
			},
			{
				id: 2,
				title: 'Agriculture Type 2',
				description: 'Description 2'
			}
		]
	};

	const mockSuccessStories = {
		success: true,
		data: {
			results: [
				{
					id: 1,
					name: 'Story 1',
					location: 'Location 1',
					description: 'Description',
					image: '/story1.jpg',
					route: '/stories/1'
				}
			]
		}
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	describe('Loading State', () => {
		it('shows loading skeleton initially', () => {
			loanService.getByType.mockImplementation(() => new Promise(() => {}));
			successStoriesService.getByLoanType.mockImplementation(() => new Promise(() => {}));

			renderWithRouter(<LoansAgriculture />);

			expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
		});
	});

	describe('Successful Data Loading', () => {
		it('fetches loan types and success stories on mount', async () => {
			loanService.getByType.mockResolvedValue(mockLoanTypes);
			successStoriesService.getByLoanType.mockResolvedValue(mockSuccessStories);

			renderWithRouter(<LoansAgriculture />);

			await waitFor(() => {
				expect(loanService.getByType).toHaveBeenCalledWith('agriculture');
				expect(successStoriesService.getByLoanType).toHaveBeenCalledWith('agriculture');
			});
		});

		it('renders page hero section', async () => {
			loanService.getByType.mockResolvedValue(mockLoanTypes);
			successStoriesService.getByLoanType.mockResolvedValue(mockSuccessStories);

			renderWithRouter(<LoansAgriculture />);

			await waitFor(() => {
				expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
			});
		});

		it('renders loan subcategories section', async () => {
			loanService.getByType.mockResolvedValue(mockLoanTypes);
			successStoriesService.getByLoanType.mockResolvedValue(mockSuccessStories);

			renderWithRouter(<LoansAgriculture />);

			await waitFor(() => {
				expect(screen.getByTestId('loan-subcategories-section')).toBeInTheDocument();
				expect(screen.getByText('Agricultural Loan Types')).toBeInTheDocument();
			});
		});

		it('renders success stories section', async () => {
			loanService.getByType.mockResolvedValue(mockLoanTypes);
			successStoriesService.getByLoanType.mockResolvedValue(mockSuccessStories);

			renderWithRouter(<LoansAgriculture />);

			await waitFor(() => {
				expect(screen.getByTestId('success-stories-section')).toBeInTheDocument();
				expect(screen.getByText('Agricultural Success Stories')).toBeInTheDocument();
			});
		});

		it('passes correct loan types count', async () => {
			loanService.getByType.mockResolvedValue(mockLoanTypes);
			successStoriesService.getByLoanType.mockResolvedValue(mockSuccessStories);

			renderWithRouter(<LoansAgriculture />);

			await waitFor(() => {
				const countElement = screen.getByTestId('loan-types-count');
				expect(countElement).toHaveTextContent('2');
			});
		});
	});

	describe('Error Handling', () => {
		it('handles loan types fetch error', async () => {
			const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			loanService.getByType.mockRejectedValue(new Error('Network error'));
			successStoriesService.getByLoanType.mockResolvedValue(mockSuccessStories);

			renderWithRouter(<LoansAgriculture />);

			await waitFor(() => {
				expect(consoleErrorSpy).toHaveBeenCalledWith(
					'Failed to fetch Agriculture types:',
					expect.any(Error)
				);
			});

			consoleErrorSpy.mockRestore();
		});

		it('handles success stories fetch error', async () => {
			const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			loanService.getByType.mockResolvedValue(mockLoanTypes);
			successStoriesService.getByLoanType.mockRejectedValue(new Error('Network error'));

			renderWithRouter(<LoansAgriculture />);

			await waitFor(() => {
				expect(consoleErrorSpy).toHaveBeenCalledWith(
					'Failed to fetch success stories:',
					expect.any(Error)
				);
			});

			consoleErrorSpy.mockRestore();
		});

		it('sets empty arrays on error', async () => {
			loanService.getByType.mockRejectedValue(new Error('Error'));
			successStoriesService.getByLoanType.mockRejectedValue(new Error('Error'));

			renderWithRouter(<LoansAgriculture />);

			await waitFor(() => {
				expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
			});
		});
	});

	describe('Empty State', () => {
		it('handles empty loan types', async () => {
			loanService.getByType.mockResolvedValue({ results: [] });
			successStoriesService.getByLoanType.mockResolvedValue(mockSuccessStories);

			renderWithRouter(<LoansAgriculture />);

			await waitFor(() => {
				const countElement = screen.getByTestId('loan-types-count');
				expect(countElement).toHaveTextContent('0');
			});
		});

		it('handles empty success stories', async () => {
			loanService.getByType.mockResolvedValue(mockLoanTypes);
			successStoriesService.getByLoanType.mockResolvedValue({ success: true, data: { results: [] } });

			renderWithRouter(<LoansAgriculture />);

			await waitFor(() => {
				const countElement = screen.getByTestId('stories-count');
				expect(countElement).toHaveTextContent('0');
			});
		});
	});
});

