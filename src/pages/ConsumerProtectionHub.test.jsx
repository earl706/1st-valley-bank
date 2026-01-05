import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ConsumerProtectionHub from './ConsumerProtectionHub';

// Mock components
vi.mock('../components/HeroSection', () => ({
	default: ({ title, subtitle }) => (
		<div data-testid="hero-section">
			<h1>{title}</h1>
			<p>{subtitle}</p>
		</div>
	)
}));
vi.mock('../components/PageSkeleton', () => ({
	DetailPageSkeleton: () => <div data-testid="skeleton">Loading...</div>,
	CardGridSkeleton: () => <div data-testid="card-skeleton">Loading cards...</div>
}));

describe('ConsumerProtectionHub Page', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders loading skeleton initially', () => {
		renderWithRouter(<ConsumerProtectionHub />);

		expect(screen.getByTestId('skeleton')).toBeInTheDocument();
	});

	it('renders content after loading', async () => {
		renderWithRouter(<ConsumerProtectionHub />);

		await waitFor(() => {
			expect(screen.queryByTestId('hero-section')).toBeInTheDocument();
		}, { timeout: 6000 });
	});

	it('renders protection resources', async () => {
		renderWithRouter(<ConsumerProtectionHub />);

		await waitFor(() => {
			expect(screen.queryByText('Privacy Policy')).toBeInTheDocument();
			expect(screen.queryByText('1VB Products')).toBeInTheDocument();
			expect(screen.queryByText('Product Requirements')).toBeInTheDocument();
		}, { timeout: 6000 });
	});

	it('renders key features', async () => {
		renderWithRouter(<ConsumerProtectionHub />);

		await waitFor(() => {
			expect(screen.queryByText(/Data Security/i)).toBeInTheDocument();
		}, { timeout: 6000 });
	});
});

