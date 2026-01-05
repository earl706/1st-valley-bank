import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ConsumerProtection1VBProducts from './ConsumerProtection1VBProducts';

// Mock components
vi.mock('../components/PageHeroSection', () => ({
	default: () => <div data-testid="page-hero-section">Hero</div>
}));
vi.mock('../components/Header', () => ({
	LightHeader: ({ title }) => <div data-testid="light-header">{title}</div>
}));
vi.mock('../components/Card', () => ({
	LightCard: ({ children }) => <div data-testid="light-card">{children}</div>
}));
vi.mock('../components/Buttons', () => ({
	LightPrimaryButton: ({ children, to }) => (
		<a href={to} data-testid="light-primary-button">{children}</a>
	)
}));

describe('ConsumerProtection1VBProducts Page', () => {
	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders loan products section', () => {
		renderWithRouter(<ConsumerProtection1VBProducts />);

		// Check for loan products text (may appear multiple times)
		const agriculture = screen.getAllByText(/AGRICULTURE|Agriculture/i);
		const goldGems = screen.getAllByText(/GOLD.*GEMS|Gold.*Gems/i);
		const salary = screen.getAllByText(/SALARY|Salary/i);
		
		// At least one should be present
		expect(agriculture.length > 0 || goldGems.length > 0 || salary.length > 0).toBe(true);
	});

	it('renders deposit products section', () => {
		renderWithRouter(<ConsumerProtection1VBProducts />);

		// Check for deposit products (may appear multiple times)
		const regularSavings = screen.getAllByText(/Regular Savings|regular savings/i);
		const atmSavings = screen.getAllByText(/ATM Savings|atm savings/i);
		
		// At least one should be present
		expect(regularSavings.length > 0 || atmSavings.length > 0).toBe(true);
	});

	it('renders loan product links', () => {
		renderWithRouter(<ConsumerProtection1VBProducts />);

		// Check for loan product links - component uses NavLink, not LightPrimaryButton
		// Look for links with href containing '/loans/'
		const allLinks = document.querySelectorAll('a[href*="/loans/"]');
		expect(allLinks.length).toBeGreaterThan(0);
	});
});

