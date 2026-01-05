import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WhyChooseUs from './WhyChooseUs';
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
	DarkHeader: ({ title, subtitle }) => (
		<div data-testid="dark-header">
			<h2>{title}</h2>
			{subtitle && <p>{subtitle}</p>}
		</div>
	)
}));

describe('WhyChooseUs Page', () => {
	const mockAboutPage = {
		why_choose_us_title: 'Why Choose Us',
		why_choose_us_subtitle: 'Reasons to choose us',
		why_choose_us_items: [
			{ text: 'Reason 1', icon: 'clock' },
			{ text: 'Reason 2', icon: 'user' }
		]
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders loading state initially', () => {
		aboutPageService.getAboutPage.mockImplementation(() => new Promise(() => {}));
		renderWithRouter(<WhyChooseUs />);

		expect(screen.getByTestId('hero-section')).toBeInTheDocument();
	});

	it('renders why choose us items from API data', async () => {
		aboutPageService.getAboutPage.mockResolvedValue(mockAboutPage);
		renderWithRouter(<WhyChooseUs />);

		await waitFor(() => {
			expect(screen.getByText('Reason 1')).toBeInTheDocument();
			expect(screen.getByText('Reason 2')).toBeInTheDocument();
		});
	});

	it('renders default items when API data is missing', async () => {
		aboutPageService.getAboutPage.mockResolvedValue({});
		renderWithRouter(<WhyChooseUs />);

		await waitFor(() => {
			expect(screen.getByText('64+ years of trusted banking')).toBeInTheDocument();
			expect(screen.getByText('Personalized, friendly service')).toBeInTheDocument();
		});
	});

	it('handles API errors gracefully', async () => {
		aboutPageService.getAboutPage.mockRejectedValue(new Error('API Error'));
		renderWithRouter(<WhyChooseUs />);

		await waitFor(() => {
			// Component shows error message on error, not default items
			expect(screen.getByText(/Failed to load|Error/i)).toBeInTheDocument();
		}, { timeout: 2000 });
	});
});

