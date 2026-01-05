import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Careers from './Careers';

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
	),
	DarkHeader: ({ title }) => (
		<div data-testid="dark-header">
			<h2>{title}</h2>
		</div>
	)
}));
vi.mock('../../components/Card', () => ({
	LightCard: ({ children }) => <div data-testid="light-card">{children}</div>,
	DarkCard: ({ children }) => <div data-testid="dark-card">{children}</div>
}));
vi.mock('../../components/Buttons', () => ({
	LightPrimaryButton: ({ children, to }) => (
		<a href={to} data-testid="light-primary-button">{children}</a>
	)
}));
vi.mock('../../components/PageHeroSection', () => ({
	default: () => <div data-testid="page-hero-section">Hero</div>
}));

describe('Careers Page', () => {
	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders page hero section', () => {
		renderWithRouter(<Careers />);

		expect(screen.getByTestId('hero-section')).toBeInTheDocument();
	});

	it('renders overview section', () => {
		renderWithRouter(<Careers />);

		// These texts appear multiple times - use getAllByText
		expect(screen.getAllByText(/Join Our Team/i).length).toBeGreaterThan(0);
		expect(screen.getByText(/Build Your Future/i)).toBeInTheDocument();
	});

	it('renders why work with us section', () => {
		renderWithRouter(<Careers />);

		// Why Work With Us title is rendered
		const whyWorkTitles = screen.getAllByText(/Why Work With Us/i);
		expect(whyWorkTitles.length).toBeGreaterThan(0);
		
		// Career Growth Opportunities is in the why_work_items array
		expect(screen.getByText(/Career Growth Opportunities/i)).toBeInTheDocument();
	});

	it('renders contact section', () => {
		renderWithRouter(<Careers />);

		// Contact section uses "Apply Now" as title
		expect(screen.getByText('Apply Now')).toBeInTheDocument();
	});
});

