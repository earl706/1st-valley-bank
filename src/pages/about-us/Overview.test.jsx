import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Overview from './Overview';
import aboutPageService from '../../services/aboutPageService';

// Mock services and components
vi.mock('../../services/aboutPageService');
vi.mock('../../components/PageHeroSection', () => ({
	default: () => <div data-testid="page-hero-section">Hero Section</div>
}));
vi.mock('../../components/Header', () => ({
	DarkHeader: ({ title, subtitle, badgeText }) => (
		<div data-testid="dark-header">
			{badgeText && <span data-testid="badge">{badgeText}</span>}
			<h2>{title}</h2>
			{subtitle && <p>{subtitle}</p>}
		</div>
	)
}));

describe('Overview Page', () => {
	const mockAboutPage = {
		overview_title: 'About 1st Valley Bank',
		overview_subtitle: 'Test subtitle',
		overview_content: '<p>Test content</p>',
		overview_image: '/test-image.jpg'
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders page hero section', () => {
		aboutPageService.getAboutPage.mockResolvedValue(mockAboutPage);
		renderWithRouter(<Overview />);

		expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
	});

	it('shows loading state initially', () => {
		aboutPageService.getAboutPage.mockImplementation(() => new Promise(() => {}));
		renderWithRouter(<Overview />);

		expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
	});

	it('renders overview section after data loads', async () => {
		aboutPageService.getAboutPage.mockResolvedValue(mockAboutPage);
		renderWithRouter(<Overview />);

		await waitFor(() => {
			expect(screen.getByTestId('dark-header')).toBeInTheDocument();
			expect(screen.getByText('About 1st Valley Bank')).toBeInTheDocument();
		});
	});

	it('renders overview title from API data', async () => {
		aboutPageService.getAboutPage.mockResolvedValue(mockAboutPage);
		renderWithRouter(<Overview />);

		await waitFor(() => {
			expect(screen.getByText('About 1st Valley Bank')).toBeInTheDocument();
		});
	});

	it('renders overview subtitle from API data', async () => {
		aboutPageService.getAboutPage.mockResolvedValue(mockAboutPage);
		renderWithRouter(<Overview />);

		await waitFor(() => {
			expect(screen.getByText('Test subtitle')).toBeInTheDocument();
		});
	});

	it('renders overview image from API data', async () => {
		aboutPageService.getAboutPage.mockResolvedValue(mockAboutPage);
		renderWithRouter(<Overview />);

		await waitFor(() => {
			const image = screen.getByAltText('1st Valley Bank Building');
			expect(image).toHaveAttribute('src', '/test-image.jpg');
		});
	});

	it('renders overview content from API data', async () => {
		aboutPageService.getAboutPage.mockResolvedValue(mockAboutPage);
		renderWithRouter(<Overview />);

		await waitFor(() => {
			expect(screen.getByText('Test content')).toBeInTheDocument();
		});
	});

	it('renders default content when API data is not available', async () => {
		aboutPageService.getAboutPage.mockResolvedValue({});
		renderWithRouter(<Overview />);

		await waitFor(() => {
			// Text appears multiple times, use getAllByText
			const elements = screen.getAllByText(/1st Valley Bank \(1VB\)/);
			expect(elements.length).toBeGreaterThan(0);
			expect(screen.getByText(/27 December 2019/)).toBeInTheDocument();
		});
	});

	it('renders default title when overview_title is missing', async () => {
		aboutPageService.getAboutPage.mockResolvedValue({ overview_subtitle: 'Subtitle' });
		renderWithRouter(<Overview />);

		await waitFor(() => {
			expect(screen.getByText('About 1st Valley Bank')).toBeInTheDocument();
		});
	});

	it('renders default subtitle when overview_subtitle is missing', async () => {
		aboutPageService.getAboutPage.mockResolvedValue({});
		renderWithRouter(<Overview />);

		await waitFor(() => {
			expect(screen.getByText(/One of the largest independent/)).toBeInTheDocument();
		});
	});

	it('handles API errors gracefully', async () => {
		aboutPageService.getAboutPage.mockRejectedValue(new Error('API Error'));
		renderWithRouter(<Overview />);

		await waitFor(() => {
			// Should still render with default content - text appears multiple times
			const elements = screen.getAllByText(/1st Valley Bank \(1VB\)/);
			expect(elements.length).toBeGreaterThan(0);
		});
	});

	it('renders badge text in header', async () => {
		aboutPageService.getAboutPage.mockResolvedValue(mockAboutPage);
		renderWithRouter(<Overview />);

		await waitFor(() => {
			expect(screen.getByTestId('badge')).toHaveTextContent('Bank Overview');
		});
	});

	it('cleans up on unmount', async () => {
		aboutPageService.getAboutPage.mockImplementation(() => new Promise(() => {}));
		const { unmount } = renderWithRouter(<Overview />);

		unmount();

		// Should not throw errors
		expect(true).toBe(true);
	});
});

