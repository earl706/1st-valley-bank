import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DepositsSpecialSavings from './DepositsSpecialSavings';

// Mock IntersectionObserver
beforeAll(() => {
	global.IntersectionObserver = class IntersectionObserver {
		constructor() {
			this.observe = vi.fn();
			this.unobserve = vi.fn();
			this.disconnect = vi.fn();
		}
	};
});

describe('DepositsSpecialSavings Page', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		window.HTMLElement.prototype.scrollIntoView = vi.fn();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders main section', () => {
		renderWithRouter(<DepositsSpecialSavings />);

		expect(screen.getByText('Deposits / Special Savings')).toBeInTheDocument();
	});

	it('renders special savings features', () => {
		renderWithRouter(<DepositsSpecialSavings />);

		// Features are rendered immediately
		expect(screen.getByText('SSD MICRO')).toBeInTheDocument();
		expect(screen.getByText('SSD REGULAR')).toBeInTheDocument();
		expect(screen.getByText('HANDOG SAVINGS')).toBeInTheDocument();
	});

	it('renders navigation dots', () => {
		renderWithRouter(<DepositsSpecialSavings />);

		const navElement = document.querySelector('nav');
		expect(navElement).toBeInTheDocument();
		const navButtons = navElement?.querySelectorAll('button') || [];
		expect(navButtons.length).toBeGreaterThanOrEqual(3);
	});
});

