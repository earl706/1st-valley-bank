import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import LoanQualification from './LoanQualification';

// Mock components
vi.mock('../components/PageSkeleton', () => ({
	FormPageSkeleton: () => <div data-testid="skeleton">Loading...</div>
}));

describe('LoanQualification Page', () => {
	// Component doesn't use fake timers - use real timers
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const renderWithRouter = (component, initialEntries = ['/loan-qualification/personal-loan']) => {
		return render(
			<MemoryRouter initialEntries={initialEntries}>
				{component}
			</MemoryRouter>
		);
	};

	it('renders loading skeleton initially', () => {
		renderWithRouter(<LoanQualification />);

		expect(screen.getByTestId('skeleton')).toBeInTheDocument();
	});

	it('renders qualification form after loading', async () => {
		renderWithRouter(<LoanQualification />);

		await waitFor(() => {
			expect(screen.queryByText(/What is your age/i)).toBeInTheDocument();
		}, { timeout: 6000 });
	});

	it('renders first question', async () => {
		renderWithRouter(<LoanQualification />);

		await waitFor(() => {
			expect(screen.queryByText('What is your age?')).toBeInTheDocument();
		}, { timeout: 6000 });
	});

	it('allows selecting answer options', async () => {
		renderWithRouter(<LoanQualification />);

		await waitFor(() => {
			expect(screen.queryByText('18-25 years old')).toBeInTheDocument();
		}, { timeout: 6000 });

		const option = screen.queryByText('18-25 years old');
		if (option) {
			fireEvent.click(option);
		}
	});
});

