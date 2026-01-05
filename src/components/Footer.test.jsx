import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';
import landingService from '../services/landingService';

vi.mock('../services/landingService');

describe('Footer Component', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		
		// Mock footer data
		landingService.getFooter.mockResolvedValue({
			data: {
				footer: {
					contact_us_title: 'Contact us',
					contact_corporate_center_title: '1st Valley Bank Corporate Center',
					contact_corporate_center_location: 'Cagayan de Oro City, Philippines',
					contact_email: 'info@firstvalleybank.com',
					contact_phone: '(088) 123-4567',
					about_text: 'Your trusted financial partner since 1978',
					copyright_text: '© 2024 First Valley Bank. All rights reserved.'
				},
				quick_links: [
					{ id: 1, label: 'About Us', url: '/about' },
					{ id: 2, label: 'Contact', url: '/contact' }
				],
				social_links: [
					{ id: 1, platform: 'Facebook', url: 'https://facebook.com/fvb', icon: 'Facebook' },
					{ id: 2, platform: 'Twitter', url: 'https://twitter.com/fvb', icon: 'Twitter' }
				]
			}
		});
	});

	it('renders footer with fetched data', async () => {
		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);

		await waitFor(() => {
			expect(screen.getByText('Contact us')).toBeInTheDocument();
		});

		expect(landingService.getFooter).toHaveBeenCalled();
	});

	it('displays contact information from API', async () => {
		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);

		await waitFor(() => {
			expect(screen.getByText(/1st Valley Bank Corporate Center/i)).toBeInTheDocument();
		});

		expect(screen.getByText(/Cagayan de Oro City, Philippines/i)).toBeInTheDocument();
	});

	it('renders scroll to top button', async () => {
		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);

		const scrollButton = await waitFor(() => 
			screen.getByLabelText('Scroll to top')
		);

		expect(scrollButton).toBeInTheDocument();
	});

	it('scrolls to top when button is clicked', async () => {
		const scrollToMock = vi.fn();
		window.scrollTo = scrollToMock;

		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);

		const scrollButton = await waitFor(() => 
			screen.getByLabelText('Scroll to top')
		);

		fireEvent.click(scrollButton);

		expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
	});

	it('handles footer data fetch error gracefully', async () => {
		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		landingService.getFooter.mockRejectedValue(new Error('API Error'));

		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);

		await waitFor(() => {
			expect(consoleErrorSpy).toHaveBeenCalled();
		});

		consoleErrorSpy.mockRestore();
	});

	it('displays loading state initially', () => {
		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);

		// Footer should still render even while loading
		expect(landingService.getFooter).toHaveBeenCalled();
	});

	it('renders quick links when provided', async () => {
		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);

		await waitFor(() => {
			expect(screen.getByText('About Us')).toBeInTheDocument();
		});

		expect(screen.getByText('Contact')).toBeInTheDocument();
	});

	it('renders with empty data gracefully', async () => {
		landingService.getFooter.mockResolvedValue({
			data: {
				footer: null,
				quick_links: [],
				social_links: []
			}
		});

		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);

		await waitFor(() => {
			expect(landingService.getFooter).toHaveBeenCalled();
		});

		// Should still render default contact section
		expect(screen.getByText('Contact us')).toBeInTheDocument();
	});
});
