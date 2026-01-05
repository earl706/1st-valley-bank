import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ConsumerProtectionProductRequirements from './ConsumerProtectionProductRequirements';

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

describe('ConsumerProtectionProductRequirements Page', () => {
	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders deposit products section', () => {
		renderWithRouter(<ConsumerProtectionProductRequirements />);

		// Component renders deposit products (may appear multiple times)
		const savingsDeposit = screen.getAllByText(/SAVINGS DEPOSIT/i);
		const kidsTeens = screen.getAllByText(/KIDS AND TEENS SAVINGS|KIDS.*TEENS/i);
		
		// At least one deposit product should be present
		expect(savingsDeposit.length > 0 || kidsTeens.length > 0).toBe(true);
	});

	it('renders supervised credit products section', () => {
		renderWithRouter(<ConsumerProtectionProductRequirements />);

		// Component renders supervised credit products (may appear multiple times)
		const riceCorn = screen.getAllByText(/RICE.*CORN|RICE & CORN/i);
		const sugarcane = screen.getAllByText(/SUGARCANE/i);
		
		// At least one supervised credit product should be present
		expect(riceCorn.length > 0 || sugarcane.length > 0).toBe(true);
	});

	it('renders agriculture loans section', () => {
		renderWithRouter(<ConsumerProtectionProductRequirements />);

		// Check for agriculture loan types (may be in different sections)
		const pageContent = document.body.textContent || '';
		expect(pageContent).toMatch(/RICE|CORN|SUGARCANE|AGRI/i);
	});
});

