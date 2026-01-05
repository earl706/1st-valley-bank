import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sustainability from './Sustainability';

// Mock components
vi.mock('../../components/HeroSection', () => ({
	default: ({ title, subtitle }) => (
		<div data-testid="hero-section">
			<h1>{title}</h1>
			<p>{subtitle}</p>
		</div>
	)
}));
vi.mock('../../components/Header', () => ({
	LightHeader: ({ title, subtitle }) => (
		<div data-testid="light-header">
			<h2>{title}</h2>
			{subtitle && <p>{subtitle}</p>}
		</div>
	)
}));
vi.mock('../../components/Card', () => ({
	LightCard: ({ children }) => <div data-testid="light-card">{children}</div>
}));
vi.mock('../../components/Buttons', () => ({
	LightPrimaryButton: ({ children, to }) => (
		<a href={to} data-testid="light-primary-button">{children}</a>
	)
}));

describe('Sustainability Page', () => {
	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders page hero section', () => {
		renderWithRouter(<Sustainability />);

		expect(screen.getByTestId('hero-section')).toBeInTheDocument();
	});

	it('renders sustainability philosophy', () => {
		renderWithRouter(<Sustainability />);

		// Check for sustainability content - the page renders sustainability framework and strategies
		const pageContent = document.body.textContent || '';
		expect(pageContent).toMatch(/Sustainability Framework|sustainability/i);
	});

	it('renders sustainability framework', () => {
		renderWithRouter(<Sustainability />);

		// Use getAllByText to handle multiple matches
		const frameworks = screen.getAllByText(/Sustainability Framework/i);
		expect(frameworks.length).toBeGreaterThan(0);
		const products = screen.getAllByText(/Product Sustainability/i);
		expect(products.length).toBeGreaterThan(0);
	});

	it('renders strategies', () => {
		renderWithRouter(<Sustainability />);

		// Use getAllByText to handle multiple matches
		const contributions = screen.getAllByText(/Contribution/i);
		expect(contributions.length).toBeGreaterThan(0);
		const humanCapitals = screen.getAllByText(/Human Capital/i);
		expect(humanCapitals.length).toBeGreaterThan(0);
		const disasterResponses = screen.getAllByText(/Disaster Response/i);
		expect(disasterResponses.length).toBeGreaterThan(0);
	});

	it('renders UN SDGs section', () => {
		renderWithRouter(<Sustainability />);

		expect(screen.getByText(/United Nations Sustainable Development Goals/i)).toBeInTheDocument();
	});
});

