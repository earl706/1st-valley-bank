import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock dependencies
vi.mock('../services/index', () => ({
	contactService: {
		submitContact: vi.fn()
	}
}));

vi.mock('../components/ContactPageMap', () => ({
	default: () => <div data-testid="contact-map">Map Component</div>
}));

vi.mock('../components/PageHeroSection', () => ({
	default: () => <div data-testid="page-hero">Hero Section</div>
}));

vi.mock('../components/Header', () => ({
	DarkHeader: () => <div data-testid="dark-header">Header</div>
}));

vi.mock('../components/PageSkeleton', () => ({
	FormPageSkeleton: () => <div data-testid="form-skeleton">Loading...</div>
}));

vi.mock('@react-google-maps/api', () => ({
	useJsApiLoader: vi.fn(() => ({
		isLoaded: true,
		loadError: null
	}))
}));

vi.mock('../analytics/ga4', () => ({
	trackEvent: vi.fn()
}));

describe('ContactUs Page', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		
		// Mock fetch for PSGC API
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ([])
		});
	});

	it('renders contact form skeleton while loading', async () => {
		// Dynamically import after mocks are set up
		const ContactUs = (await import('./ContactUs')).default;
		
		render(
			<BrowserRouter>
				<ContactUs />
			</BrowserRouter>
		);

		// Initially should show skeleton
		expect(screen.getByTestId('form-skeleton')).toBeInTheDocument();
	});

	it('renders contact form with form fields after loading', async () => {
		const ContactUs = (await import('./ContactUs')).default;
		
		render(
			<BrowserRouter>
				<ContactUs />
			</BrowserRouter>
		);

		await waitFor(() => {
			expect(screen.queryByTestId('form-skeleton')).not.toBeInTheDocument();
		}, { timeout: 3000 });

		// Check for main heading
		await waitFor(() => {
			const headings = screen.getAllByRole('heading');
			expect(headings.length).toBeGreaterThan(0);
		});
	});

	it('renders page hero section', async () => {
		const ContactUs = (await import('./ContactUs')).default;
		
		render(
			<BrowserRouter>
				<ContactUs />
			</BrowserRouter>
		);

		await waitFor(() => {
			expect(screen.getByTestId('page-hero')).toBeInTheDocument();
		});
	});

	it('renders contact map section', async () => {
		const ContactUs = (await import('./ContactUs')).default;
		
		render(
			<BrowserRouter>
				<ContactUs />
			</BrowserRouter>
		);

		await waitFor(() => {
			// Map section should render, but ContactPageMap is conditionally rendered
			// So we check for the "Location Preview" heading instead
			expect(screen.getByText('Location Preview')).toBeInTheDocument();
		});
	});

	it('loads provinces from PSGC API on mount', async () => {
		const ContactUs = (await import('./ContactUs')).default;
		
		render(
			<BrowserRouter>
				<ContactUs />
			</BrowserRouter>
		);

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining('/provinces/'),
				expect.any(Object)
			);
		});
	});
});
