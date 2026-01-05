import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoanQualificationResults from './LoanQualificationResults';

// Mock components
vi.mock('../components/PageSkeleton', () => ({
	DetailPageSkeleton: () => <div data-testid="skeleton">Loading...</div>
}));

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return {
		...actual,
		useNavigate: () => mockNavigate
	};
});

describe('LoanQualificationResults Page', () => {
	const mockResult = {
		qualified: true,
		score: 85,
		message: 'You are qualified for this loan',
		recommendations: ['Recommendation 1', 'Recommendation 2']
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const renderWithRouter = (component, state = { result: mockResult, loanType: 'personal-loan' }) => {
		return render(
			<MemoryRouter initialEntries={[{ pathname: '/loan-qualification-results', state }]}>
				{component}
			</MemoryRouter>
		);
	};

	it('renders loading skeleton initially', () => {
		renderWithRouter(<LoanQualificationResults />);

		expect(screen.getByTestId('skeleton')).toBeInTheDocument();
	});

	it('renders qualified result after loading', async () => {
		renderWithRouter(<LoanQualificationResults />);

		await waitFor(() => {
			expect(screen.queryByText('QUALIFIED')).toBeInTheDocument();
			expect(screen.queryByText('85%')).toBeInTheDocument();
		}, { timeout: 6000 });
	});

	it('renders not qualified result', async () => {
		const notQualifiedResult = {
			...mockResult,
			qualified: false,
			score: 45
		};
		renderWithRouter(<LoanQualificationResults />, { result: notQualifiedResult, loanType: 'personal-loan' });

		await waitFor(() => {
			expect(screen.queryByText('NOT QUALIFIED')).toBeInTheDocument();
		}, { timeout: 6000 });
	});

	it('renders recommendations when available', async () => {
		renderWithRouter(<LoanQualificationResults />);

		await waitFor(() => {
			expect(screen.queryByText('Recommendations')).toBeInTheDocument();
			expect(screen.queryByText('Recommendation 1')).toBeInTheDocument();
		}, { timeout: 6000 });
	});

	it('shows no results message when result is missing', async () => {
		renderWithRouter(<LoanQualificationResults />, {});

		await waitFor(() => {
			expect(screen.queryByText(/No Results Found|no results/i)).toBeInTheDocument();
		}, { timeout: 6000 });
	});
});

