import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoansGoldAndGems from './LoansGoldAndGems';
import successStoriesService from '../services/successStoriesService';

// Mock services and components
vi.mock('../services/successStoriesService');
vi.mock('../components/PageHeroSection', () => ({
	default: () => <div data-testid="page-hero-section">Hero</div>
}));
vi.mock('../components/LoanSubcategoriesSection', () => ({
	default: ({ sectionTitle, ctaTitle }) => (
		<div data-testid="loan-subcategories-section">
			<h2>{sectionTitle}</h2>
			<p>{ctaTitle}</p>
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

describe('LoansGoldAndGems Page', () => {
	const mockSuccessStories = {
		success: true,
		data: {
			results: [
				{
					id: 1,
					name: 'Story 1',
					location: 'Manila',
					description: 'Test story',
					image: '/story1.jpg'
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

	it('renders loading skeleton initially', () => {
		successStoriesService.getByLoanType.mockImplementation(() => new Promise(() => {}));
		renderWithRouter(<LoansGoldAndGems />);

		expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
	});

	it('renders page content after data loads', async () => {
		successStoriesService.getByLoanType.mockResolvedValue(mockSuccessStories);
		renderWithRouter(<LoansGoldAndGems />);

		await waitFor(() => {
			expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
			expect(screen.getByTestId('loan-subcategories-section')).toBeInTheDocument();
		}, { timeout: 2000 });
	});

	it('renders success stories section', async () => {
		successStoriesService.getByLoanType.mockResolvedValue(mockSuccessStories);
		renderWithRouter(<LoansGoldAndGems />);

		await waitFor(() => {
			expect(screen.getByTestId('success-stories-section')).toBeInTheDocument();
			expect(screen.getByText('Gold & Gems Success Stories')).toBeInTheDocument();
		}, { timeout: 2000 });
	});

	it('handles API errors gracefully', async () => {
		successStoriesService.getByLoanType.mockRejectedValue(new Error('API Error'));
		renderWithRouter(<LoansGoldAndGems />);

		await waitFor(() => {
			// Should still render structure
			expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
		});
	});
});

