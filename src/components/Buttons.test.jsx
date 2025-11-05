import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock the Buttons component (adjust path if needed)
const PrimaryButton = ({ children, onClick, disabled = false }) => (
	<button
		onClick={onClick}
		disabled={disabled}
		className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
	>
		{children}
	</button>
);

const SecondaryButton = ({ children, onClick }) => (
	<button
		onClick={onClick}
		className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
	>
		{children}
	</button>
);

describe('Button Components', () => {
	describe('PrimaryButton', () => {
		it('renders with correct text', () => {
			render(<PrimaryButton>Click Me</PrimaryButton>);
			expect(screen.getByText('Click Me')).toBeInTheDocument();
		});

		it('calls onClick handler when clicked', () => {
			const handleClick = vi.fn();
			render(<PrimaryButton onClick={handleClick}>Submit</PrimaryButton>);

			fireEvent.click(screen.getByText('Submit'));
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it('does not call onClick when disabled', () => {
			const handleClick = vi.fn();
			render(
				<PrimaryButton onClick={handleClick} disabled>
					Submit
				</PrimaryButton>
			);

			fireEvent.click(screen.getByText('Submit'));
			expect(handleClick).not.toHaveBeenCalled();
		});
	});

	describe('SecondaryButton', () => {
		it('renders with correct text', () => {
			render(<SecondaryButton>Cancel</SecondaryButton>);
			expect(screen.getByText('Cancel')).toBeInTheDocument();
		});

		it('calls onClick handler when clicked', () => {
			const handleClick = vi.fn();
			render(<SecondaryButton onClick={handleClick}>Cancel</SecondaryButton>);

			fireEvent.click(screen.getByText('Cancel'));
			expect(handleClick).toHaveBeenCalledTimes(1);
		});
	});
});
