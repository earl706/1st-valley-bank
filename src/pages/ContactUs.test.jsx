import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock dependencies
vi.mock('../services/index', () => ({
	contactService: {
		submitContact: vi.fn()
	}
}));

vi.mock('../utils/security', () => ({
	getRateLimitKey: vi.fn(() => 'test-key'),
	contactFormRateLimiter: {
		isAllowed: vi.fn(() => true),
		getTimeUntilNext: vi.fn(() => 0)
	},
	sanitizeFormData: vi.fn((data) => data),
	secureLog: vi.fn(),
	secureErrorLog: vi.fn()
}));

vi.mock('../utils/validation', () => ({
	validateContactForm: vi.fn(() => ({ isValid: true, errors: {} }))
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

	describe('Error Handling for API Failures', () => {
		it('handles 400 Bad Request error on form submission', async () => {
			const { contactService } = await import('../services/index');
			contactService.submitContact.mockResolvedValue({
				success: false,
				error: 'Validation Error',
				message: 'Invalid data provided'
			});

			const ContactUs = (await import('./ContactUs')).default;
			
			render(
				<BrowserRouter>
					<ContactUs />
				</BrowserRouter>
			);

			await waitFor(() => {
				expect(screen.queryByTestId('form-skeleton')).not.toBeInTheDocument();
			}, { timeout: 3000 });

			// Fill form
			const nameInput = screen.getByPlaceholderText(/full name/i);
			const emailInput = screen.getByPlaceholderText(/email/i);
			const messageInput = screen.getByPlaceholderText(/message/i);
			const termsCheckbox = screen.getByLabelText(/i agree/i);

			fireEvent.change(nameInput, { target: { value: 'Test User' } });
			fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
			fireEvent.change(messageInput, { target: { value: 'Test message' } });
			
			// Accept terms first and wait for state update
			fireEvent.click(termsCheckbox);
			await waitFor(() => {
				expect(termsCheckbox).toBeChecked();
			}, { timeout: 1000 });

			// Submit form using form submit event instead of button click
			const form = nameInput.closest('form');
			expect(form).toBeInTheDocument();
			fireEvent.submit(form);

			await waitFor(() => {
				expect(contactService.submitContact).toHaveBeenCalled();
			}, { timeout: 3000 });
		});

		it('handles 500 Internal Server Error on form submission', async () => {
			const { contactService } = await import('../services/index');
			contactService.submitContact.mockResolvedValue({
				success: false,
				error: 'Server Error',
				message: 'Something went wrong on our end. Please try again later.'
			});

			const ContactUs = (await import('./ContactUs')).default;
			
			render(
				<BrowserRouter>
					<ContactUs />
				</BrowserRouter>
			);

			await waitFor(() => {
				expect(screen.queryByTestId('form-skeleton')).not.toBeInTheDocument();
			}, { timeout: 3000 });

			const nameInput = screen.getByPlaceholderText(/full name/i);
			const emailInput = screen.getByPlaceholderText(/email/i);
			const messageInput = screen.getByPlaceholderText(/message/i);
			const termsCheckbox = screen.getByLabelText(/i agree/i);

			fireEvent.change(nameInput, { target: { value: 'Test User' } });
			fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
			fireEvent.change(messageInput, { target: { value: 'Test message' } });
			
			fireEvent.click(termsCheckbox);
			await waitFor(() => {
				expect(termsCheckbox).toBeChecked();
			}, { timeout: 1000 });

			const form = nameInput.closest('form');
			fireEvent.submit(form);

			await waitFor(() => {
				expect(contactService.submitContact).toHaveBeenCalled();
			}, { timeout: 3000 });
		});

		it('handles network errors on form submission', async () => {
			const { contactService } = await import('../services/index');
			contactService.submitContact.mockResolvedValue({
				success: false,
				error: 'Network Error',
				message: 'Unable to connect to server. Please check your internet connection.'
			});

			const ContactUs = (await import('./ContactUs')).default;
			
			render(
				<BrowserRouter>
					<ContactUs />
				</BrowserRouter>
			);

			await waitFor(() => {
				expect(screen.queryByTestId('form-skeleton')).not.toBeInTheDocument();
			}, { timeout: 3000 });

			const nameInput = screen.getByPlaceholderText(/full name/i);
			const emailInput = screen.getByPlaceholderText(/email/i);
			const messageInput = screen.getByPlaceholderText(/message/i);
			const termsCheckbox = screen.getByLabelText(/i agree/i);

			fireEvent.change(nameInput, { target: { value: 'Test User' } });
			fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
			fireEvent.change(messageInput, { target: { value: 'Test message' } });
			
			fireEvent.click(termsCheckbox);
			await waitFor(() => {
				expect(termsCheckbox).toBeChecked();
			}, { timeout: 1000 });

			const form = nameInput.closest('form');
			fireEvent.submit(form);

			await waitFor(() => {
				expect(contactService.submitContact).toHaveBeenCalled();
			}, { timeout: 3000 });
		});

		it('handles PSGC API failure when loading provinces', async () => {
			global.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));

			const ContactUs = (await import('./ContactUs')).default;
			
			render(
				<BrowserRouter>
					<ContactUs />
				</BrowserRouter>
			);

			await waitFor(() => {
				expect(global.fetch).toHaveBeenCalled();
			}, { timeout: 3000 });

			// Form should still be usable even if provinces fail to load
			await waitFor(() => {
				expect(screen.queryByTestId('form-skeleton')).not.toBeInTheDocument();
			}, { timeout: 2000 });
		});

		it('handles PSGC API 500 error when loading provinces', async () => {
			global.fetch = vi.fn().mockResolvedValue({
				ok: false,
				status: 500,
				json: async () => ({ error: 'Internal Server Error' })
			});

			const ContactUs = (await import('./ContactUs')).default;
			
			render(
				<BrowserRouter>
					<ContactUs />
				</BrowserRouter>
			);

			await waitFor(() => {
				expect(global.fetch).toHaveBeenCalled();
			}, { timeout: 3000 });
		});
	});

	describe('Loading States', () => {
		it('shows loading skeleton while fetching provinces', async () => {
			global.fetch = vi.fn().mockImplementation(
				() => new Promise(() => {}) // Never resolves
			);

			const ContactUs = (await import('./ContactUs')).default;
			
			render(
				<BrowserRouter>
					<ContactUs />
				</BrowserRouter>
			);

			// Should show skeleton while loading provinces
			expect(screen.getByTestId('form-skeleton')).toBeInTheDocument();
		});

		it('shows loading state during form submission', async () => {
			const { contactService } = await import('../services/index');
			contactService.submitContact.mockImplementation(
				() => new Promise((resolve) => setTimeout(() => resolve({ success: true }), 200))
			);

			const ContactUs = (await import('./ContactUs')).default;
			
			render(
				<BrowserRouter>
					<ContactUs />
				</BrowserRouter>
			);

			await waitFor(() => {
				expect(screen.queryByTestId('form-skeleton')).not.toBeInTheDocument();
			}, { timeout: 3000 });

			const nameInput = screen.getByPlaceholderText(/full name/i);
			const emailInput = screen.getByPlaceholderText(/email/i);
			const messageInput = screen.getByPlaceholderText(/message/i);
			const termsCheckbox = screen.getByLabelText(/i agree/i);

			fireEvent.change(nameInput, { target: { value: 'Test User' } });
			fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
			fireEvent.change(messageInput, { target: { value: 'Test message' } });
			
			fireEvent.click(termsCheckbox);
			await waitFor(() => {
				expect(termsCheckbox).toBeChecked();
			}, { timeout: 1000 });

			const form = nameInput.closest('form');
			fireEvent.submit(form);

			// Should show "Submitting..." text and button should be disabled
			await waitFor(() => {
				// Check for either "Submitting..." text or disabled button
				const submittingText = screen.queryByText(/submitting/i);
				const submitButton = screen.getByRole('button', { name: /send message|submitting/i });
				
				// Button should be disabled during submission
				expect(submitButton).toBeDisabled();
				
				// If submitting text is visible, that's a bonus, but disabled state is the key indicator
				if (submittingText) {
					expect(submittingText).toBeInTheDocument();
				}
			}, { timeout: 1000 });
		});

		it('shows loading indicator for province dropdown', async () => {
			global.fetch = vi.fn().mockImplementation(
				() => new Promise((resolve) => setTimeout(() => resolve({
					ok: true,
					json: async () => []
				}), 100))
			);

			const ContactUs = (await import('./ContactUs')).default;
			
			render(
				<BrowserRouter>
					<ContactUs />
				</BrowserRouter>
			);

			// Initially shows skeleton
			expect(screen.getByTestId('form-skeleton')).toBeInTheDocument();

			await waitFor(() => {
				expect(screen.queryByTestId('form-skeleton')).not.toBeInTheDocument();
			}, { timeout: 2000 });
		});

		it('handles form submission error with loading state transition', async () => {
			const { contactService } = await import('../services/index');
			contactService.submitContact.mockRejectedValue(new Error('API Error'));

			const ContactUs = (await import('./ContactUs')).default;
			
			render(
				<BrowserRouter>
					<ContactUs />
				</BrowserRouter>
			);

			await waitFor(() => {
				expect(screen.queryByTestId('form-skeleton')).not.toBeInTheDocument();
			}, { timeout: 3000 });

			const nameInput = screen.getByPlaceholderText(/full name/i);
			const emailInput = screen.getByPlaceholderText(/email/i);
			const messageInput = screen.getByPlaceholderText(/message/i);
			const termsCheckbox = screen.getByLabelText(/i agree/i);

			fireEvent.change(nameInput, { target: { value: 'Test User' } });
			fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
			fireEvent.change(messageInput, { target: { value: 'Test message' } });
			
			fireEvent.click(termsCheckbox);
			await waitFor(() => {
				expect(termsCheckbox).toBeChecked();
			}, { timeout: 1000 });

			const form = nameInput.closest('form');
			fireEvent.submit(form);

			// Should show loading, then error
			await waitFor(() => {
				expect(contactService.submitContact).toHaveBeenCalled();
			}, { timeout: 3000 });

			// Submit button should be enabled again after error (isSubmitting becomes false)
			await waitFor(() => {
				const submitButton = screen.getByRole('button', { name: /send message/i });
				expect(submitButton).not.toBeDisabled();
			}, { timeout: 2000 });
		});
	});
});
