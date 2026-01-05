import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import History from './History';
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

describe('History Page', () => {
	const mockAboutPage = {
		history_title: 'Our History',
		history_subtitle: 'Our journey',
		history_content: '<p>History content</p>'
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('shows loading state initially', () => {
		aboutPageService.getAboutPage.mockImplementation(() => new Promise(() => {}));
		renderWithRouter(<History />);

		expect(screen.getByText('Loading history...')).toBeInTheDocument();
	});

	it('renders error message on API failure', async () => {
		aboutPageService.getAboutPage.mockRejectedValue(new Error('API Error'));
		renderWithRouter(<History />);

		await waitFor(() => {
			expect(screen.getByText('Error')).toBeInTheDocument();
		});
	});

	it('renders history content after data loads', async () => {
		aboutPageService.getAboutPage.mockResolvedValue(mockAboutPage);
		renderWithRouter(<History />);

		await waitFor(() => {
			// "Our History" appears in both HeroSection and LightHeader - use getAllByText
			expect(screen.getAllByText('Our History').length).toBeGreaterThan(0);
		}, { timeout: 3000 });
	});

	it('renders default content when API data is missing', async () => {
		aboutPageService.getAboutPage.mockResolvedValue({});
		renderWithRouter(<History />);

		await waitFor(() => {
			const elements = screen.getAllByText(/1st Valley Bank \(1VB\)/);
			expect(elements.length).toBeGreaterThan(0);
		});
	});
});

