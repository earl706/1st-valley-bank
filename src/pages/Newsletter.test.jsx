import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Newsletter from './Newsletter';
import newsletterService from '../services/newsletterService';

// Mock services and components
vi.mock('../services/newsletterService');
vi.mock('../components/PageHeroSection', () => ({
	default: () => <div data-testid="page-hero-section">Hero</div>
}));
vi.mock('../components/CarouselSection', () => ({
	default: ({ slides }) => (
		<div data-testid="carousel-section">
			{slides?.length > 0 && <div data-testid="carousel-slides">{slides.length} slides</div>}
		</div>
	)
}));
vi.mock('../components/Card', () => ({
	LightCard: ({ children, onClick }) => (
		<div data-testid="light-card" onClick={onClick}>{children}</div>
	),
	DarkCard: ({ children }) => <div data-testid="dark-card">{children}</div>
}));
vi.mock('../components/Buttons', () => ({
	DarkPrimaryButton: ({ children }) => <button>{children}</button>,
	LightPrimaryButton: ({ children }) => <button>{children}</button>
}));
vi.mock('../components/PageSkeleton', () => ({
	NewsletterPageSkeleton: () => <div data-testid="skeleton">Loading...</div>
}));

describe('Newsletter Page', () => {
	const mockNewsletters = {
		results: [
			{
				id: 1,
				title: 'Newsletter 1',
				subtitle: 'Subtitle 1',
				description: 'Description 1',
				image: '/news1.jpg',
				pdf: '/news1.pdf',
				published_date: '2025-01-01'
			}
		],
		count: 1
	};

	beforeEach(() => {
		vi.clearAllMocks();
		newsletterService.getNewsletters = vi.fn().mockResolvedValue(mockNewsletters);
		newsletterService.incrementViewCount = vi.fn().mockResolvedValue({ success: true });
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders page hero section', async () => {
		renderWithRouter(<Newsletter />);

		await waitFor(() => {
			expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
		}, { timeout: 2000 });
	});

	it('renders newsletters after data loads', async () => {
		renderWithRouter(<Newsletter />);

		await waitFor(() => {
			expect(screen.getAllByTestId('light-card').length).toBeGreaterThan(0);
		}, { timeout: 2000 });
	});

	it('handles API errors gracefully', async () => {
		newsletterService.getNewsletters.mockRejectedValue(new Error('API Error'));
		renderWithRouter(<Newsletter />);

		await waitFor(() => {
			// Should still render structure
			expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
		}, { timeout: 2000 });
	});
});

