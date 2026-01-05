import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CorporateProfile from './CorporateProfile';

describe('CorporateProfile Component', () => {
	it('renders corporate profile section', () => {
		render(<CorporateProfile />);

		const section = document.querySelector('#corporate-profile');
		expect(section).toBeInTheDocument();
	});

	it('renders main header with title and subtitle', () => {
		render(<CorporateProfile />);

		expect(screen.getByText('Corporate Profile')).toBeInTheDocument();
		expect(screen.getByText(/Meet our distinguished leadership team/i)).toBeInTheDocument();
	});

	it('renders executive leadership section', () => {
		render(<CorporateProfile />);

		expect(screen.getByText('EXECUTIVE LEADERSHIP')).toBeInTheDocument();
		expect(screen.getByText('Atty. Nicolas J. Lim')).toBeInTheDocument();
		expect(screen.getByText('PRESIDENT')).toBeInTheDocument();
	});

	it('renders senior management section with all officers', () => {
		render(<CorporateProfile />);

		expect(screen.getByText('SENIOR MANAGEMENT')).toBeInTheDocument();
		expect(screen.getByText('Maria Santos Rodriguez')).toBeInTheDocument();
		expect(screen.getByText('VICE PRESIDENT')).toBeInTheDocument();
		expect(screen.getByText('John Michael Chen')).toBeInTheDocument();
		expect(screen.getByText('CHIEF FINANCIAL OFFICER')).toBeInTheDocument();
		expect(screen.getByText('Sarah Elizabeth Johnson')).toBeInTheDocument();
		expect(screen.getByText('CHIEF OPERATING OFFICER')).toBeInTheDocument();
		expect(screen.getByText('David Antonio Cruz')).toBeInTheDocument();
		expect(screen.getByText('EXECUTIVE DIRECTOR')).toBeInTheDocument();
	});

	it('renders product and area management section with all officers', () => {
		render(<CorporateProfile />);

		expect(screen.getByText('PRODUCT & AREA MANAGEMENT')).toBeInTheDocument();
		expect(screen.getByText('Jennifer Marie Lopez')).toBeInTheDocument();
		expect(screen.getByText('PRODUCT MANAGER')).toBeInTheDocument();
		expect(screen.getByText('Robert James Kim')).toBeInTheDocument();
		expect(screen.getByText('AREA MANAGER - NORTH')).toBeInTheDocument();
		expect(screen.getByText('Lisa Anne Thompson')).toBeInTheDocument();
		expect(screen.getByText('AREA MANAGER - SOUTH')).toBeInTheDocument();
		expect(screen.getByText('Michael Peter Garcia')).toBeInTheDocument();
		expect(screen.getByText('REGIONAL DIRECTOR')).toBeInTheDocument();
	});

	it('renders president card with special styling', () => {
		render(<CorporateProfile />);

		const presidentCard = screen.getByText('Atty. Nicolas J. Lim').closest('.col-span-full');
		expect(presidentCard).toBeInTheDocument();
	});

	it('renders officer cards with images', () => {
		render(<CorporateProfile />);

		const images = document.querySelectorAll('img[alt*="Maria"], img[alt*="John"], img[alt*="Sarah"], img[alt*="David"]');
		expect(images.length).toBeGreaterThan(0);
	});

	it('renders decorative background elements', () => {
		render(<CorporateProfile />);

		const backgroundGradient = document.querySelector('.bg-gradient-to-br.from-emerald-900');
		expect(backgroundGradient).toBeInTheDocument();
	});

	it('renders floating particles effect', () => {
		render(<CorporateProfile />);

		const particles = document.querySelectorAll('.animate-pulse.bg-white\\/20');
		expect(particles.length).toBe(20);
	});

	it('renders section headers with icons', () => {
		render(<CorporateProfile />);

		// All section headers should be present
		expect(screen.getByText('Corporate Profile')).toBeInTheDocument();
		expect(screen.getByText('EXECUTIVE LEADERSHIP')).toBeInTheDocument();
		expect(screen.getByText('SENIOR MANAGEMENT')).toBeInTheDocument();
		expect(screen.getByText('PRODUCT & AREA MANAGEMENT')).toBeInTheDocument();
	});

	it('applies responsive grid classes', () => {
		const { container } = render(<CorporateProfile />);

		// Find grid by looking for the section containing SENIOR MANAGEMENT
		const seniorSection = screen.getByText('SENIOR MANAGEMENT').closest('.mb-20');
		const grid = seniorSection?.querySelector('.grid');
		expect(grid).toBeInTheDocument();
		expect(grid).toHaveClass('grid-cols-1');
	});
});

