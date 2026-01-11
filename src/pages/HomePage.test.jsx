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
vi.mock('../utils/security', () => ({
	getRateLimitKey: vi.fn(() => 'test-key'),
	newsletterRateLimiter: {
		isAllowed: vi.fn(() => true),
		getTimeUntilNext: vi.fn(() => 0)
	},
	sanitizeEmail: vi.fn((email) => email),
	secureLog: vi.fn(),
	secureErrorLog: vi.fn()
}));
vi.mock('../utils/validation', () => ({
	validateNewsletterEmail: vi.fn(() => ({ isValid: true, errors: {} }))
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
	LightPrimaryButton: ({ children, onClick, disabled, ...props }) => <button onClick={onClick} disabled={disabled} {...props}>{children}</button>,
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
		results: [{ id: 1, title: 'Newsletter 1' }],
		count: 1
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
			// Should show error message after loading completes
			expect(screen.getByText('Failed to load page data. Please try again later.')).toBeInTheDocument();
		}, { timeout: 3000 });
		
		// Loading skeleton should be gone
		expect(screen.queryByTestId('hero-skeleton')).not.toBeInTheDocument();
	});

	describe('Error Handling for API Failures', () => {
		it('displays error message on page data fetch failure', async () => {
			landingService.getLandingPageFull.mockRejectedValue(new Error('Network error'));
			renderWithRouter(<HomePage />);

			await waitFor(() => {
				expect(screen.getByText('Failed to load page data. Please try again later.')).toBeInTheDocument();
			}, { timeout: 3000 });
			
			expect(screen.queryByTestId('hero-skeleton')).not.toBeInTheDocument();
		});

		it('handles 400 Bad Request error', async () => {
			const error = new Error('Bad Request');
			error.response = { status: 400, data: { error: 'Invalid request' } };
			landingService.getLandingPageFull.mockRejectedValue(error);

			renderWithRouter(<HomePage />);

			await waitFor(() => {
				expect(screen.getByText('Failed to load page data. Please try again later.')).toBeInTheDocument();
			}, { timeout: 3000 });

			expect(landingService.getLandingPageFull).toHaveBeenCalled();
			expect(screen.queryByTestId('hero-skeleton')).not.toBeInTheDocument();
		});

		it('handles 404 Not Found error', async () => {
			const error = new Error('Not Found');
			error.response = { status: 404, data: { error: 'Resource not found' } };
			landingService.getLandingPageFull.mockRejectedValue(error);

			renderWithRouter(<HomePage />);

			await waitFor(() => {
				expect(screen.getByText('Failed to load page data. Please try again later.')).toBeInTheDocument();
			}, { timeout: 3000 });

			expect(landingService.getLandingPageFull).toHaveBeenCalled();
			expect(screen.queryByTestId('hero-skeleton')).not.toBeInTheDocument();
		});

		it('handles 500 Internal Server Error', async () => {
			const error = new Error('Internal Server Error');
			error.response = { status: 500, data: { error: 'Server error' } };
			landingService.getLandingPageFull.mockRejectedValue(error);

			renderWithRouter(<HomePage />);

			await waitFor(() => {
				expect(screen.getByText('Failed to load page data. Please try again later.')).toBeInTheDocument();
			}, { timeout: 3000 });

			expect(landingService.getLandingPageFull).toHaveBeenCalled();
			// Page should still render hero section even with error
			await waitFor(() => {
				expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
			});
		});

		it('handles network errors (no response)', async () => {
			const error = new Error('Network Error');
			error.request = {}; // Simulate network error
			landingService.getLandingPageFull.mockRejectedValue(error);

			renderWithRouter(<HomePage />);

			await waitFor(() => {
				expect(screen.getByText('Failed to load page data. Please try again later.')).toBeInTheDocument();
			}, { timeout: 3000 });

			expect(landingService.getLandingPageFull).toHaveBeenCalled();
			expect(screen.queryByTestId('hero-skeleton')).not.toBeInTheDocument();
		});

		it('handles timeout errors', async () => {
			const error = new Error('Request timeout');
			error.code = 'ECONNABORTED';
			landingService.getLandingPageFull.mockRejectedValue(error);

			renderWithRouter(<HomePage />);

			await waitFor(() => {
				expect(screen.getByText('Failed to load page data. Please try again later.')).toBeInTheDocument();
			}, { timeout: 3000 });

			expect(landingService.getLandingPageFull).toHaveBeenCalled();
		});

		it('handles malformed response data', async () => {
			// Simulate successful response but with unexpected data structure
			landingService.getLandingPageFull.mockResolvedValue({ 
				data: null // Unexpected null data
			});

			renderWithRouter(<HomePage />);

			await waitFor(() => {
				expect(landingService.getLandingPageFull).toHaveBeenCalled();
			}, { timeout: 3000 });

			// Page should handle unexpected data structure gracefully
			// Should not show error message for null data, but should handle safely
			await waitFor(() => {
				expect(screen.queryByTestId('hero-skeleton')).not.toBeInTheDocument();
			});
		});

		it('sets empty arrays as fallback on error', async () => {
			landingService.getLandingPageFull.mockRejectedValue(new Error('API Error'));
			renderWithRouter(<HomePage />);

			await waitFor(() => {
				expect(screen.getByText('Failed to load page data. Please try again later.')).toBeInTheDocument();
			}, { timeout: 3000 });

			// Services section should render but be empty (no services displayed)
			expect(screen.getByText('Your Lifetime Friend in Banking')).toBeInTheDocument();
		});

		it('logs error to console on fetch failure', async () => {
			const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			const testError = new Error('Test error');
			landingService.getLandingPageFull.mockRejectedValue(testError);
			
			renderWithRouter(<HomePage />);
			
			await waitFor(() => {
				expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching page data:', testError);
			}, { timeout: 3000 });
			
			consoleErrorSpy.mockRestore();
		});
	});

	describe('Loading States', () => {
		it('shows loading skeleton while fetching page data', () => {
			// Create a promise that doesn't resolve immediately
			landingService.getLandingPageFull.mockImplementation(
				() => new Promise(() => {}) // Never resolves, keeps loading
			);

			renderWithRouter(<HomePage />);

			// Should show skeleton while loading (there may be multiple, so use query)
			expect(screen.queryByTestId('hero-skeleton')).toBeInTheDocument();
			expect(screen.queryAllByTestId('card-skeleton').length).toBeGreaterThan(0);
		});

		it('hides loading skeleton after data loads successfully', async () => {
			renderWithRouter(<HomePage />);
			
			// Initially may show skeleton
			await waitFor(() => {
				expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
			}, { timeout: 3000 });

			// After data loads, skeleton should be gone
			await waitFor(() => {
				expect(screen.queryByTestId('hero-skeleton')).not.toBeInTheDocument();
			}, { timeout: 1000 });
		});

		it('hides loading skeleton after error occurs', async () => {
			landingService.getLandingPageFull.mockRejectedValue(new Error('API Error'));
			renderWithRouter(<HomePage />);

			// Initially shows skeleton
			expect(screen.getByTestId('hero-skeleton')).toBeInTheDocument();

			// After error, skeleton should be gone and error message shown
			await waitFor(() => {
				expect(screen.queryByTestId('hero-skeleton')).not.toBeInTheDocument();
				expect(screen.getByText('Failed to load page data. Please try again later.')).toBeInTheDocument();
			}, { timeout: 3000 });
		});

		it('shows loading state for newsletter section while fetching', async () => {
			// Make newsletter fetch take time
			newsletterService.getNewsletters.mockImplementation(
				() => new Promise(() => {}) // Never resolves, keeps loading
			);

			renderWithRouter(<HomePage />);

			// Wait for page to load first
			await waitFor(() => {
				expect(screen.queryByTestId('hero-skeleton')).not.toBeInTheDocument();
			}, { timeout: 3000 });

			// Newsletter section should show loading state
			await waitFor(() => {
				expect(screen.getByTestId('newsletter-loading')).toBeInTheDocument();
			});
		});

		it('hides newsletter loading state after data loads successfully', async () => {
			newsletterService.getNewsletters.mockResolvedValue({ 
				results: [{ id: 1, title: 'Newsletter 1' }] 
			});

			renderWithRouter(<HomePage />);

			await waitFor(() => {
				expect(screen.queryByTestId('newsletter-loading')).not.toBeInTheDocument();
				expect(screen.getByTestId('newsletter-grid')).toBeInTheDocument();
			}, { timeout: 3000 });
		});

		it('handles newsletter fetch error and displays error message', async () => {
			newsletterService.getNewsletters.mockRejectedValue(new Error('Network error'));

			renderWithRouter(<HomePage />);

			await waitFor(() => {
				expect(screen.getByTestId('newsletter-error')).toBeInTheDocument();
				expect(screen.getByText('Failed to load newsletters. Please try again later.')).toBeInTheDocument();
			}, { timeout: 3000 });

			// Should not show loading or grid after error
			expect(screen.queryByTestId('newsletter-loading')).not.toBeInTheDocument();
			expect(screen.queryByTestId('newsletter-grid')).not.toBeInTheDocument();
		});

		it('shows loading state during newsletter subscription', async () => {
			// Make subscribe take some time
			newsletterService.subscribe.mockImplementation(
				() => new Promise((resolve) => setTimeout(() => resolve({ success: true }), 100))
			);

			renderWithRouter(<HomePage />);

			await waitFor(() => {
				const emailInput = screen.getByPlaceholderText(/email/i);
				expect(emailInput).toBeInTheDocument();
			}, { timeout: 2000 });

			const emailInput = screen.getByPlaceholderText(/email/i);
			const submitButton = screen.getByRole('button', { name: /subscribe/i });

			fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
			fireEvent.click(submitButton);

			// Should show "Submitting..." text during submission and button should be disabled
			await waitFor(() => {
				const submittingButton = screen.getByRole('button', { name: /submitting/i });
				expect(submittingButton).toBeInTheDocument();
				expect(submittingButton).toBeDisabled();
			}, { timeout: 1000 });
		});

		it('hides loading state after newsletter subscription completes', async () => {
			newsletterService.subscribe.mockResolvedValue({ success: true });

			renderWithRouter(<HomePage />);

			await waitFor(() => {
				const emailInput = screen.getByPlaceholderText(/email/i);
				expect(emailInput).toBeInTheDocument();
			}, { timeout: 2000 });

			const emailInput = screen.getByPlaceholderText(/email/i);
			const submitButton = screen.getByRole('button', { name: /subscribe/i });

			fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
			fireEvent.click(submitButton);

			// Wait for submission to complete
			await waitFor(() => {
				expect(screen.queryByText(/submitting/i)).not.toBeInTheDocument();
			}, { timeout: 3000 });

			// Button should be enabled again
			expect(submitButton).not.toBeDisabled();
		});

		it('handles loading state when newsletter subscription API fails', async () => {
			newsletterService.subscribe.mockRejectedValue(new Error('API Error'));

			renderWithRouter(<HomePage />);

			await waitFor(() => {
				const emailInput = screen.getByPlaceholderText(/email/i);
				expect(emailInput).toBeInTheDocument();
			}, { timeout: 2000 });

			const emailInput = screen.getByPlaceholderText(/email/i);
			const submitButton = screen.getByRole('button', { name: /subscribe/i });

			fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
			fireEvent.click(submitButton);

			// Should show loading first, then error message
			await waitFor(() => {
				expect(newsletterService.subscribe).toHaveBeenCalled();
			}, { timeout: 3000 });

			// Error should be displayed after submission fails
			await waitFor(() => {
				expect(screen.getByText(/error|failed/i)).toBeInTheDocument();
			}, { timeout: 2000 });

			// Loading state should be cleared
			expect(screen.queryByText(/submitting/i)).not.toBeInTheDocument();
		});

		it('handles newsletter subscription with error response', async () => {
			newsletterService.subscribe.mockResolvedValue({ 
				success: false, 
				error: 'Email already subscribed',
				message: 'This email is already in our list'
			});

			renderWithRouter(<HomePage />);

			await waitFor(() => {
				const emailInput = screen.getByPlaceholderText(/email/i);
				expect(emailInput).toBeInTheDocument();
			}, { timeout: 2000 });

			const emailInput = screen.getByPlaceholderText(/email/i);
			const submitButton = screen.getByRole('button', { name: /subscribe/i });

			fireEvent.change(emailInput, { target: { value: 'existing@example.com' } });
			fireEvent.click(submitButton);

			await waitFor(() => {
				expect(newsletterService.subscribe).toHaveBeenCalledWith('existing@example.com');
			}, { timeout: 3000 });

			// Should display error message from response
			await waitFor(() => {
				expect(screen.getByText(/already subscribed|failed/i)).toBeInTheDocument();
			}, { timeout: 2000 });
		});

		it('handles newsletter fetch with empty results', async () => {
			newsletterService.getNewsletters.mockResolvedValue({ results: [] });

			renderWithRouter(<HomePage />);

			await waitFor(() => {
				expect(screen.queryByTestId('newsletter-loading')).not.toBeInTheDocument();
				expect(screen.queryByTestId('newsletter-error')).not.toBeInTheDocument();
			}, { timeout: 3000 });

			// Newsletter grid should not render when results are empty (component handles gracefully)
			// The NewsletterGrid component only renders when there are results
			expect(screen.queryByTestId('newsletter-grid')).not.toBeInTheDocument();
		});
	});
});

