import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OneVBAdvisory from './OneVBAdvisory';
import advisoryService from '../services/advisoryService';

// Mock services and components
vi.mock('../services/advisoryService');
vi.mock('../components/PageHeroSection', () => ({
	default: () => <div data-testid="page-hero-section">Hero</div>
}));
vi.mock('../components/PageSkeleton', () => ({
	CardGridSkeleton: () => <div data-testid="skeleton">Loading...</div>
}));

describe('OneVBAdvisory Page', () => {
	const mockGallery = {
		success: true,
		data: {
			results: [
				{
					id: 1,
					title: 'Image 1',
					image: '/img1.jpg',
					thumbnail: '/thumb1.jpg',
					alt_text: 'Alt 1'
				},
				{
					id: 2,
					title: 'Image 2',
					image: '/img2.jpg',
					thumbnail: '/thumb2.jpg',
					alt_text: 'Alt 2'
				}
			]
		}
	};

	beforeEach(() => {
		vi.clearAllMocks();
		advisoryService.getGallery = vi.fn().mockResolvedValue(mockGallery);
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders loading skeleton initially', () => {
		advisoryService.getGallery.mockImplementation(() => new Promise(() => {}));
		renderWithRouter(<OneVBAdvisory />);

		expect(screen.getByTestId('skeleton')).toBeInTheDocument();
	});

	it('renders gallery images after data loads', async () => {
		renderWithRouter(<OneVBAdvisory />);

		await waitFor(() => {
			const images = screen.getAllByAltText(/Alt 1|Alt 2/);
			expect(images.length).toBeGreaterThan(0);
		});
	});

	it('opens image modal when image is clicked', async () => {
		renderWithRouter(<OneVBAdvisory />);

		await waitFor(() => {
			const images = screen.getAllByAltText(/Alt 1|Alt 2/);
			expect(images.length).toBeGreaterThan(0);
		}, { timeout: 2000 });

		const firstImage = screen.getByAltText('Alt 1');
		fireEvent.click(firstImage);

		await waitFor(() => {
			// Modal should open showing full-size image - close button is an X icon button
			// Find by looking for button containing X icon or check for modal backdrop
			const modal = document.querySelector('.fixed.inset-0');
			expect(modal).toBeInTheDocument();
			// Check for close button (X icon) - it's a button with X inside
			const closeButton = modal?.querySelector('button');
			expect(closeButton).toBeInTheDocument();
		}, { timeout: 2000 });
	});

	it('closes image modal when close button is clicked', async () => {
		renderWithRouter(<OneVBAdvisory />);

		await waitFor(() => {
			const images = screen.getAllByAltText(/Alt 1|Alt 2/);
			expect(images.length).toBeGreaterThan(0);
		}, { timeout: 2000 });

		const firstImage = screen.getByAltText('Alt 1');
		fireEvent.click(firstImage);

		await waitFor(() => {
			// Modal should be open
			const modal = document.querySelector('.fixed.inset-0');
			expect(modal).toBeInTheDocument();
		}, { timeout: 2000 });

		// Find close button (button with X icon inside)
		const modal = document.querySelector('.fixed.inset-0');
		const closeButton = modal?.querySelector('button');
		if (closeButton) {
			fireEvent.click(closeButton);

			await waitFor(() => {
				// Modal should close
				const closedModal = document.querySelector('.fixed.inset-0');
				expect(closedModal).not.toBeInTheDocument();
			}, { timeout: 2000 });
		}
	});

	it('handles API errors gracefully', async () => {
		advisoryService.getGallery.mockRejectedValue(new Error('API Error'));
		renderWithRouter(<OneVBAdvisory />);

		await waitFor(() => {
			// Should still render structure
			expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
		});
	});
});

