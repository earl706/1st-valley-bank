import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Awards from './Awards';
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

describe('Awards Page', () => {
	const mockAboutPage = {
		awards_section_title: 'Awards & Recognition',
		awards_section_subtitle: 'Our achievements',
		featured_awards: [
			{ title: 'Award 1', description: 'Desc 1', icon: 'award' },
			{ title: 'Award 2', description: 'Desc 2', icon: 'trophy' }
		],
		awards: [
			{ header: 'Header 1', description: 'Award desc 1' },
			{ header: 'Header 2', description: 'Award desc 2' }
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
		renderWithRouter(<Awards />);

		expect(screen.getByTestId('hero-section')).toBeInTheDocument();
	});

	it('renders awards section after data loads', async () => {
		aboutPageService.getAboutPage.mockResolvedValue(mockAboutPage);
		renderWithRouter(<Awards />);

		await waitFor(() => {
			// Component renders title in uppercase
			expect(screen.getByText('AWARD 1')).toBeInTheDocument();
		}, { timeout: 3000 });
	});

	it('renders featured awards from API data', async () => {
		aboutPageService.getAboutPage.mockResolvedValue(mockAboutPage);
		renderWithRouter(<Awards />);

		await waitFor(() => {
			// Component renders title in uppercase (line 134: award.title?.toUpperCase())
			expect(screen.getByText('AWARD 1')).toBeInTheDocument();
		}, { timeout: 3000 });
		
		// Description appears in featured awards section - may appear multiple times
		expect(screen.getAllByText('Desc 1').length).toBeGreaterThan(0);
	});

	it('renders awards list from API data', async () => {
		aboutPageService.getAboutPage.mockResolvedValue(mockAboutPage);
		renderWithRouter(<Awards />);

		await waitFor(() => {
			expect(screen.getByText('Header 1')).toBeInTheDocument();
		});
	});

	it('renders default awards when API data is missing', async () => {
		aboutPageService.getAboutPage.mockResolvedValue({});
		renderWithRouter(<Awards />);

		await waitFor(() => {
			// Component renders default awards - "Rated A+" becomes "RATED A+" (uppercase)
			expect(screen.getByText('RATED A+')).toBeInTheDocument();
			expect(screen.getByText('Most Outstanding Rural Bank')).toBeInTheDocument();
		}, { timeout: 3000 });
	});
});

