import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Services from './Services';
import aboutPageService from '../../services/aboutPageService';

// Mock services and components
vi.mock('../../services/aboutPageService');
vi.mock('../../components/HeroSection', () => ({
	default: ({ title, subtitle }) => (
		<div data-testid="hero-section">
			<h1>{title}</h1>
			<p>{subtitle}</p>
		</div>
	)
}));
vi.mock('../../components/Header', () => ({
	LightHeader: ({ title, subtitle, badgeText }) => (
		<div data-testid="light-header">
			{badgeText && <span data-testid="badge">{badgeText}</span>}
			<h2>{title}</h2>
			{subtitle && <p>{subtitle}</p>}
		</div>
	)
}));
vi.mock('../../components/Card', () => ({
	LightCard: ({ children }) => <div data-testid="light-card">{children}</div>
}));
vi.mock('../../components/Buttons', () => ({
	LightPrimaryButton: ({ children, to }) => (
		<a href={to} data-testid="light-primary-button">{children}</a>
	)
}));

describe('Services Page', () => {
	const mockAboutPage = {
		services_section_title: 'Our Services',
		services_section_subtitle: 'Comprehensive solutions',
		service_features: [
			{
				name: 'Service 1',
				description: 'Description 1',
				image_url: '/service1.jpg',
				link: '/service1'
			},
			{
				name: 'Service 2',
				description: 'Description 2',
				image_url: '/service2.jpg',
				link: '/service2'
			}
		]
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders loading skeleton initially', () => {
		aboutPageService.getAboutPage.mockImplementation(() => new Promise(() => {}));
		renderWithRouter(<Services />);

		expect(screen.getByTestId('hero-section')).toBeInTheDocument();
		// Loading state is shown with skeleton cards
		expect(screen.getByTestId('light-header')).toBeInTheDocument();
	});

	it('renders services after data loads', async () => {
		aboutPageService.getAboutPage.mockResolvedValue(mockAboutPage);
		renderWithRouter(<Services />);

		await waitFor(() => {
			expect(screen.getByText('Service 1')).toBeInTheDocument();
			expect(screen.getByText('Description 1')).toBeInTheDocument();
		}, { timeout: 2000 });
	});

	it('renders services with images', async () => {
		aboutPageService.getAboutPage.mockResolvedValue(mockAboutPage);
		renderWithRouter(<Services />);

		await waitFor(() => {
			const image = screen.getByAltText('Service 1 logo');
			expect(image).toHaveAttribute('src', '/service1.jpg');
		}, { timeout: 2000 });
	});

	it('renders empty state when no services', async () => {
		aboutPageService.getAboutPage.mockResolvedValue({});
		renderWithRouter(<Services />);

		await waitFor(() => {
			expect(screen.getByTestId('light-header')).toBeInTheDocument();
		});
		// When no services, the grid still renders but empty
		expect(screen.getByTestId('light-header')).toBeInTheDocument();
	});

	it('handles API errors gracefully', async () => {
		aboutPageService.getAboutPage.mockRejectedValue(new Error('API Error'));
		renderWithRouter(<Services />);

		await waitFor(() => {
			// Should still render header
			expect(screen.getByTestId('light-header')).toBeInTheDocument();
		});
	});
});

