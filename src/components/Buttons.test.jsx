import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {
	LightPrimaryButton,
	LightSecondaryButton,
	DarkPrimaryButton,
	DarkSecondaryButton
} from './Buttons';

describe('Button Components', () => {
	describe('LightPrimaryButton', () => {
		it('renders with correct text', () => {
			render(
				<BrowserRouter>
					<LightPrimaryButton>Click Me</LightPrimaryButton>
				</BrowserRouter>
			);
			expect(screen.getByText('Click Me')).toBeInTheDocument();
		});

		it('calls onClick handler when clicked', () => {
			const handleClick = vi.fn();
			render(
				<BrowserRouter>
					<LightPrimaryButton onClick={handleClick}>Submit</LightPrimaryButton>
				</BrowserRouter>
			);

			fireEvent.click(screen.getByText('Submit'));
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it('renders as Link when to prop is provided', () => {
			render(
				<BrowserRouter>
					<LightPrimaryButton to="/test">Navigate</LightPrimaryButton>
				</BrowserRouter>
			);

			const link = screen.getByText('Navigate').closest('a');
			expect(link).toHaveAttribute('href', '/test');
		});

		it('applies custom className', () => {
			render(
				<BrowserRouter>
					<LightPrimaryButton className="custom-class">Test</LightPrimaryButton>
				</BrowserRouter>
			);

			const button = screen.getByText('Test').closest('button') || screen.getByText('Test').closest('a');
			expect(button).toHaveClass('custom-class');
		});

		it('renders with icons', () => {
			const icon = <span data-testid="icon">Icon</span>;
			render(
				<BrowserRouter>
					<LightPrimaryButton primaryIcon={icon}>With Icon</LightPrimaryButton>
				</BrowserRouter>
			);

			expect(screen.getByTestId('icon')).toBeInTheDocument();
		});
	});

	describe('LightSecondaryButton', () => {
		it('renders with correct text', () => {
			render(
				<BrowserRouter>
					<LightSecondaryButton>Cancel</LightSecondaryButton>
				</BrowserRouter>
			);
			expect(screen.getByText('Cancel')).toBeInTheDocument();
		});

		it('calls onClick handler when clicked', () => {
			const handleClick = vi.fn();
			render(
				<BrowserRouter>
					<LightSecondaryButton onClick={handleClick}>Cancel</LightSecondaryButton>
				</BrowserRouter>
			);

			fireEvent.click(screen.getByText('Cancel'));
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it('renders as Link when to prop is provided', () => {
			render(
				<BrowserRouter>
					<LightSecondaryButton to="/back">Go Back</LightSecondaryButton>
				</BrowserRouter>
			);

			const link = screen.getByText('Go Back').closest('a');
			expect(link).toHaveAttribute('href', '/back');
		});
	});

	describe('DarkPrimaryButton', () => {
		it('renders with correct text', () => {
			render(
				<BrowserRouter>
					<DarkPrimaryButton>Dark Button</DarkPrimaryButton>
				</BrowserRouter>
			);
			expect(screen.getByText('Dark Button')).toBeInTheDocument();
		});

		it('calls onClick handler when clicked', () => {
			const handleClick = vi.fn();
			render(
				<BrowserRouter>
					<DarkPrimaryButton onClick={handleClick}>Dark Action</DarkPrimaryButton>
				</BrowserRouter>
			);

			fireEvent.click(screen.getByText('Dark Action'));
			expect(handleClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('DarkSecondaryButton', () => {
		it('renders with correct text', () => {
			render(
				<BrowserRouter>
					<DarkSecondaryButton>Dark Secondary</DarkSecondaryButton>
				</BrowserRouter>
			);
			expect(screen.getByText('Dark Secondary')).toBeInTheDocument();
		});

		it('calls onClick handler when clicked', () => {
			const handleClick = vi.fn();
			render(
				<BrowserRouter>
					<DarkSecondaryButton onClick={handleClick}>Dark Cancel</DarkSecondaryButton>
				</BrowserRouter>
			);

			fireEvent.click(screen.getByText('Dark Cancel'));
			expect(handleClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('Button with both icons', () => {
		it('renders both primary and secondary icons correctly', () => {
			const primaryIcon = <span data-testid="primary-icon">P</span>;
			const secondaryIcon = <span data-testid="secondary-icon">S</span>;
			render(
				<BrowserRouter>
					<LightPrimaryButton primaryIcon={primaryIcon} secondaryIcon={secondaryIcon}>
						Both Icons
					</LightPrimaryButton>
				</BrowserRouter>
			);

			expect(screen.getByTestId('primary-icon')).toBeInTheDocument();
			expect(screen.getByTestId('secondary-icon')).toBeInTheDocument();
		});
	});
});
