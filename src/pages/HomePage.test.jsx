import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import landingService from '../services/landingService';
import newsletterService from '../services/newsletterService';

// Mock services and components
vi.mock('../services/landingService');
vi.mock('../services/newsletterService');
vi.mock('../analytics/ga4', () => ({
	trackEvent: vi.fn()
}));
vi.mock('../components/PageHeroSection', () => ({
	default: () => <div data-testid="page-hero-section">Hero</div>
}));
vi.mock('../components/Header', () => ({
	LightHeader: ({ title }) => <div data-testid="light-header">{title}</div>,
	DarkHeader: ({ title }) => <div data-testid="dark-header">{title}</div>
}));
vi.mock('../components/Card', () => ({
	LightCard: ({ children }) => <div data-testid="light-card">{children}</div>,
	DarkCard: ({ children }) => <div data-testid="dark-card">{children}</div>
}));
vi.mock('../components/Buttons', () => ({
	LightPrimaryButton: ({ children, onClick }) => <button onClick={onClick}>{children}</button>,
	DarkPrimaryButton: ({ children }) => <button>{children}</button>,
	LightSecondaryButton: ({ children }) => <button>{children}</button>,
	DarkSecondaryButton: ({ children }) => <button>{children}</button>
}));
vi.mock('../components/PageSkeleton', () => ({
	HeroSectionSkeleton: () => <div data-testid="hero-skeleton">Loading...</div>,
	CardGridSkeleton: () => <div data-testid="card-skeleton">Loading...</div>,
	SectionHeaderSkeleton: () => <div data-testid="header-skeleton">Loading...</div>,
	NewsletterPageSkeleton: () => <div data-testid="newsletter-skeleton">Loading...</div>
}));
vi.mock('./Newsletter', () => ({
	NewsletterGrid: ({ data }) => (
		<div data-testid="newsletter-grid">
			{data?.results?.length > 0 && <div data-testid="newsletter-count">{data.results.length} newsletters</div>}
		</div>
	)
}));

describe('HomePage', () => {
	const mockPageData = {
		hero_sections: [
			{ title: 'Hero 1', subtitle: 'Subtitle 1', description: 'Desc 1' }
		],
		testimonials: [
			{ id: 1, name: 'John Doe', content: 'Great service', role: 'Customer', rating: 5, image: '/test.jpg' }
		],
		faqs: [
			{ question: 'FAQ 1?', answer: 'Answer 1' }
		],
		services: [
			{ id: 1, title: 'Service 1', description: 'Service desc 1', image: '/service1.jpg' }
		]
	};

	const mockNewsletters = {
		success: true,
		data: {
			results: [{ id: 1, title: 'Newsletter 1' }],
			count: 1
		}
	};

	beforeEach(() => {
		vi.clearAllMocks();
		landingService.getLandingPageFull = vi.fn().mockResolvedValue({ data: mockPageData });
		newsletterService.getNewsletters = vi.fn().mockResolvedValue(mockNewsletters);
		newsletterService.subscribe = vi.fn().mockResolvedValue({ success: true });
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders loading skeleton initially', () => {
		landingService.getLandingPageFull.mockImplementation(() => new Promise(() => {}));
		renderWithRouter(<HomePage />);

		expect(screen.getByTestId('hero-skeleton')).toBeInTheDocument();
	});

	it('renders page content after data loads', async () => {
		renderWithRouter(<HomePage />);

		await waitFor(() => {
			expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
		}, { timeout: 2000 });
	});

	it('renders testimonials section', async () => {
		renderWithRouter(<HomePage />);

		await waitFor(() => {
			expect(screen.getByText('John Doe')).toBeInTheDocument();
		}, { timeout: 2000 });
	});

	it('renders FAQs section with accordion functionality', async () => {
		renderWithRouter(<HomePage />);

		await waitFor(() => {
			expect(screen.getByText('FAQ 1?')).toBeInTheDocument();
		}, { timeout: 2000 });

		const faqButton = screen.getByText('FAQ 1?');
		fireEvent.click(faqButton);

		await waitFor(() => {
			expect(screen.getByText('Answer 1')).toBeInTheDocument();
		});
	});

	it('renders services section', async () => {
		renderWithRouter(<HomePage />);

		await waitFor(() => {
			expect(screen.getByText('Service 1')).toBeInTheDocument();
		}, { timeout: 2000 });
	});

	it('renders newsletter section', async () => {
		renderWithRouter(<HomePage />);

		await waitFor(() => {
			expect(screen.getByTestId('newsletter-grid')).toBeInTheDocument();
		}, { timeout: 2000 });
	});

	it('handles newsletter subscription', async () => {
		renderWithRouter(<HomePage />);

		await waitFor(() => {
			const emailInput = screen.getByPlaceholderText(/email/i);
			expect(emailInput).toBeInTheDocument();
		}, { timeout: 2000 });

		const emailInput = screen.getByPlaceholderText(/email/i);
		const form = emailInput.closest('form');
		
		fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
		
		// Component form doesn't have onSubmit, button has onClick that calls handleSubmit
		// Need to trigger the button click or form submit
		const submitButton = screen.getByRole('button', { name: /subscribe/i });
		if (submitButton) {
			fireEvent.click(submitButton);
		} else if (form) {
			fireEvent.submit(form);
		}

		await waitFor(() => {
			// Component calls newsletterService.subscribe
			expect(newsletterService.subscribe).toHaveBeenCalledWith('test@example.com');
		}, { timeout: 3000 });
	});

	it('handles API errors gracefully', async () => {
		landingService.getLandingPageFull.mockRejectedValue(new Error('API Error'));
		renderWithRouter(<HomePage />);

		await waitFor(() => {
			// Should still render structure
			expect(screen.getByTestId('hero-skeleton')).toBeInTheDocument();
		});
	});
});

