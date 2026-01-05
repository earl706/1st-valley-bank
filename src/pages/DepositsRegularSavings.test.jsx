import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DepositsRegularSavings from './DepositsRegularSavings';

// Mock IntersectionObserver before any imports that use it
beforeAll(() => {
	// Ensure IntersectionObserver is properly mocked
	global.IntersectionObserver = class IntersectionObserver {
		constructor() {
			this.observe = vi.fn();
			this.unobserve = vi.fn();
			this.disconnect = vi.fn();
		}
	};
});

describe('DepositsRegularSavings Page', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		// Mock scrollIntoView
		window.HTMLElement.prototype.scrollIntoView = vi.fn();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders main section', () => {
		renderWithRouter(<DepositsRegularSavings />);

		expect(screen.getByText('Deposits / Regular Savings')).toBeInTheDocument();
		expect(screen.getByText('Saving with a smile')).toBeInTheDocument();
	});

	it('renders navigation dots', async () => {
		renderWithRouter(<DepositsRegularSavings />);

		await waitFor(() => {
			// Navigation dots are rendered as buttons in the nav element
			const navElement = document.querySelector('nav');
			expect(navElement).toBeInTheDocument();
			const navButtons = navElement?.querySelectorAll('button') || [];
			expect(navButtons.length).toBeGreaterThanOrEqual(3); // Navigation dots
		}, { timeout: 500 });
	});

	it('scrolls to section when nav button is clicked', async () => {
		renderWithRouter(<DepositsRegularSavings />);

		await waitFor(() => {
			const navElement = document.querySelector('nav');
			expect(navElement).toBeInTheDocument();
		}, { timeout: 500 });

		const navElement = document.querySelector('nav');
		const navButtons = navElement?.querySelectorAll('button') || [];
		if (navButtons.length > 0) {
			fireEvent.click(navButtons[0]);
			expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
		}
	});

	it('renders SD Plus section', async () => {
		renderWithRouter(<DepositsRegularSavings />);

		// Wait for component to render with IntersectionObserver
		await waitFor(() => {
			// Check for section content
			const section = document.getElementById('sd-plus');
			expect(section).toBeInTheDocument();
		}, { timeout: 500 });
	});
});

