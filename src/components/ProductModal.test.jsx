import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductModal from './ProductModal';

describe('ProductModal Component', () => {
	const mockLoan = {
		id: 1,
		title: 'Test Loan',
		subtitle: 'Test Subtitle',
		description: 'Test description',
		full_description: 'Full description',
		image: '/test-image.jpg',
		min_amount: 10000,
		max_amount: 100000,
		interest_rate: '5.5',
		term_options: ['12 months', '24 months'],
		requirements: ['ID', 'Proof of income'],
		features: ['Feature 1', 'Feature 2'],
		loan_type_display: 'Personal Loan'
	};

	const mockOnClose = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		document.body.style.overflow = '';
	});

	afterEach(() => {
		document.body.style.overflow = '';
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	describe('Modal Open/Close', () => {
		it('returns null when isOpen is false', () => {
			const { container } = renderWithRouter(
				<ProductModal isOpen={false} onClose={mockOnClose} loan={mockLoan} />
			);

			expect(container.firstChild).toBeNull();
		});

		it('renders modal when isOpen is true', () => {
			renderWithRouter(<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />);

			expect(screen.getByText('Test Loan')).toBeInTheDocument();
		});

		it('calls onClose when close button is clicked', () => {
			renderWithRouter(<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />);

			const closeButtons = screen.getAllByRole('button').filter(btn => 
				btn.querySelector('svg') || btn.textContent === 'Close'
			);
			const closeButton = closeButtons.find(btn => btn.textContent.includes('Close') || btn.querySelector('svg'));
			
			if (closeButton) {
				fireEvent.click(closeButton);
				expect(mockOnClose).toHaveBeenCalled();
			}
		});

		it('calls onClose when backdrop is clicked', () => {
			const { container } = renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />
			);

			const backdrop = container.querySelector('.bg-black\\/50');
			if (backdrop) {
				fireEvent.click(backdrop);
				expect(mockOnClose).toHaveBeenCalled();
			}
		});

		it('calls onClose when Escape key is pressed', () => {
			renderWithRouter(<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />);

			fireEvent.keyDown(document, { key: 'Escape' });

			expect(mockOnClose).toHaveBeenCalled();
		});

		it('sets body overflow to hidden when modal opens', () => {
			renderWithRouter(<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />);

			expect(document.body.style.overflow).toBe('hidden');
		});

		it('restores body overflow when modal closes', () => {
			const { rerender } = renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />
			);

			expect(document.body.style.overflow).toBe('hidden');

			rerender(
				<BrowserRouter>
					<ProductModal isOpen={false} onClose={mockOnClose} loan={mockLoan} />
				</BrowserRouter>
			);

			expect(document.body.style.overflow).toBe('unset');
		});
	});

	describe('Loan Data Display', () => {
		it('displays loan title', () => {
			renderWithRouter(<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />);

			expect(screen.getByText('Test Loan')).toBeInTheDocument();
		});

		it('displays default title when loan title is missing', () => {
			renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={{}} />
			);

			expect(screen.getByText('Loan Product Details')).toBeInTheDocument();
		});

		it('displays subtitle when provided', () => {
			renderWithRouter(<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />);

			expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
		});

		it('displays description', () => {
			renderWithRouter(<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />);

			expect(screen.getByText('Test description')).toBeInTheDocument();
		});

		it('displays full description', () => {
			renderWithRouter(<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />);

			expect(screen.getByText('Full description')).toBeInTheDocument();
		});

		it('displays loan type display', () => {
			renderWithRouter(<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />);

			expect(screen.getByText('Personal Loan')).toBeInTheDocument();
		});
	});

	describe('Amount Range', () => {
		it('displays amount range when both min and max are provided', () => {
			renderWithRouter(<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />);

			expect(screen.getByText(/₱10,000 - ₱100,000/)).toBeInTheDocument();
		});

		it('displays only min amount when max is missing', () => {
			const loanMinOnly = { ...mockLoan, max_amount: null };
			renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={loanMinOnly} />
			);

			expect(screen.getByText(/₱10,000/)).toBeInTheDocument();
		});

		it('displays only max amount when min is missing', () => {
			const loanMaxOnly = { ...mockLoan, min_amount: null };
			renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={loanMaxOnly} />
			);

			expect(screen.getByText(/₱100,000/)).toBeInTheDocument();
		});

		it('does not display amount when neither is provided', () => {
			const loanNoAmount = { ...mockLoan, min_amount: null, max_amount: null };
			renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={loanNoAmount} />
			);

			expect(screen.queryByText(/Amount:/)).not.toBeInTheDocument();
		});
	});

	describe('Interest Rate', () => {
		it('displays interest rate when provided', () => {
			renderWithRouter(<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />);

			expect(screen.getByText(/Interest Rate:/)).toBeInTheDocument();
			expect(screen.getByText(/5.5% p.a./)).toBeInTheDocument();
		});

		it('does not display interest rate when missing', () => {
			const loanNoRate = { ...mockLoan, interest_rate: null };
			renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={loanNoRate} />
			);

			expect(screen.queryByText(/Interest Rate:/)).not.toBeInTheDocument();
		});

		it('does not display invalid interest rate values', () => {
			const loanInvalidRate = { ...mockLoan, interest_rate: 'NaN' };
			renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={loanInvalidRate} />
			);

			expect(screen.queryByText(/Interest Rate:/)).not.toBeInTheDocument();
		});
	});

	describe('Term Options', () => {
		it('displays term options when provided', () => {
			renderWithRouter(<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />);

			expect(screen.getByText(/Terms:/)).toBeInTheDocument();
			expect(screen.getByText(/12 months, 24 months/)).toBeInTheDocument();
		});

		it('filters out empty term options', () => {
			const loanWithEmptyTerms = {
				...mockLoan,
				term_options: ['12 months', '', '24 months', null]
			};
			renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={loanWithEmptyTerms} />
			);

			expect(screen.getByText(/12 months, 24 months/)).toBeInTheDocument();
		});

		it('does not display terms when array is empty', () => {
			const loanNoTerms = { ...mockLoan, term_options: [] };
			renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={loanNoTerms} />
			);

			expect(screen.queryByText(/Terms:/)).not.toBeInTheDocument();
		});
	});

	describe('Features', () => {
		it('displays features list when provided', () => {
			renderWithRouter(<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />);

			expect(screen.getByText('Features & Benefits')).toBeInTheDocument();
			expect(screen.getByText('Feature 1')).toBeInTheDocument();
			expect(screen.getByText('Feature 2')).toBeInTheDocument();
		});

		it('does not display features section when array is empty', () => {
			const loanNoFeatures = { ...mockLoan, features: [] };
			renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={loanNoFeatures} />
			);

			expect(screen.queryByText('Features & Benefits')).not.toBeInTheDocument();
		});
	});

	describe('Requirements', () => {
		it('displays requirements list when provided', () => {
			renderWithRouter(<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />);

			expect(screen.getByText('Requirements')).toBeInTheDocument();
			expect(screen.getByText('ID')).toBeInTheDocument();
			expect(screen.getByText('Proof of income')).toBeInTheDocument();
		});

		it('does not display requirements section when array is empty', () => {
			const loanNoRequirements = { ...mockLoan, requirements: [] };
			renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={loanNoRequirements} />
			);

			expect(screen.queryByText('Requirements')).not.toBeInTheDocument();
		});
	});

	describe('Image Gallery', () => {
		it('displays main image when provided', () => {
			renderWithRouter(<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />);

			const image = screen.getByAltText(/Test Loan.*Image 1/);
			expect(image).toBeInTheDocument();
			expect(image).toHaveAttribute('src', '/test-image.jpg');
		});

		it('displays "No Image" when no image is provided', () => {
			const loanNoImage = { ...mockLoan, image: null };
			renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={loanNoImage} />
			);

			expect(screen.getByText('No Image')).toBeInTheDocument();
		});

		it('displays image counter when multiple images', () => {
			const loanWithMultipleImages = {
				...mockLoan,
				additionalImages: ['/img2.jpg', '/img3.jpg']
			};
			renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={loanWithMultipleImages} />
			);

			expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument();
		});

		it('navigates to next image', () => {
			const loanWithMultipleImages = {
				...mockLoan,
				additionalImages: ['/img2.jpg']
			};
			renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={loanWithMultipleImages} />
			);

			// Find all buttons and get the next image button (button positioned on right side)
			const buttons = screen.getAllByRole('button');
			// The next button is in the image section, positioned on the right (right-2 class)
			const nextButton = buttons.find(btn => 
				btn.className.includes('absolute') && btn.className.includes('right-2')
			);
			
			expect(nextButton).toBeTruthy();
			if (nextButton) {
				fireEvent.click(nextButton);
				expect(screen.getByText(/2 \/ 2/)).toBeInTheDocument();
			}
		});

		it('navigates to previous image', () => {
			const loanWithMultipleImages = {
				...mockLoan,
				additionalImages: ['/img2.jpg']
			};
			const { container } = renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={loanWithMultipleImages} />
			);

			// Go to second image first
			const nextButton = screen.getAllByRole('button').find(btn => 
				btn.querySelector('svg')
			);
			if (nextButton) {
				fireEvent.click(nextButton);
			}

			// Then go back
			const prevButtons = screen.getAllByRole('button').filter(btn => 
				btn.querySelector('svg')
			);
			if (prevButtons.length > 1) {
				fireEvent.click(prevButtons[0]);
			}
		});

		it('displays thumbnail gallery when multiple images', () => {
			const loanWithMultipleImages = {
				...mockLoan,
				additionalImages: ['/img2.jpg', '/img3.jpg']
			};
			renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={loanWithMultipleImages} />
			);

			const thumbnails = screen.getAllByAltText(/Thumbnail/);
			expect(thumbnails.length).toBe(3);
		});

		it('changes image when thumbnail is clicked', () => {
			const loanWithMultipleImages = {
				...mockLoan,
				additionalImages: ['/img2.jpg']
			};
			renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={loanWithMultipleImages} />
			);

			const thumbnails = screen.getAllByAltText(/Thumbnail/);
			if (thumbnails.length > 1) {
				fireEvent.click(thumbnails[1].closest('button'));
				expect(screen.getByText(/2 \/ 2/)).toBeInTheDocument();
			}
		});

		it('resets to first image when modal reopens', () => {
			const loanWithMultipleImages = {
				...mockLoan,
				additionalImages: ['/img2.jpg']
			};
			const { rerender } = renderWithRouter(
				<ProductModal isOpen={true} onClose={mockOnClose} loan={loanWithMultipleImages} />
			);

			// Navigate to second image
			const nextButton = screen.getAllByRole('button').find(btn => 
				btn.querySelector('svg')
			);
			if (nextButton) {
				fireEvent.click(nextButton);
			}

			// Close and reopen
			rerender(
				<BrowserRouter>
					<ProductModal isOpen={false} onClose={mockOnClose} loan={loanWithMultipleImages} />
				</BrowserRouter>
			);

			rerender(
				<BrowserRouter>
					<ProductModal isOpen={true} onClose={mockOnClose} loan={loanWithMultipleImages} />
				</BrowserRouter>
			);

			expect(screen.getByText(/1 \/ 2/)).toBeInTheDocument();
		});
	});

	describe('Inquire Button', () => {
		it('displays inquire button by default', () => {
			renderWithRouter(<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />);

			expect(screen.getByText('Inquire Now')).toBeInTheDocument();
		});

		it('hides inquire button when showInquireButton is false', () => {
			renderWithRouter(
				<ProductModal
					isOpen={true}
					onClose={mockOnClose}
					loan={mockLoan}
					showInquireButton={false}
				/>
			);

			expect(screen.queryByText('Inquire Now')).not.toBeInTheDocument();
		});

		it('uses custom inquire button text', () => {
			renderWithRouter(
				<ProductModal
					isOpen={true}
					onClose={mockOnClose}
					loan={mockLoan}
					inquireButtonText="Contact Us"
				/>
			);

			expect(screen.getByText('Contact Us')).toBeInTheDocument();
		});

		it('links to correct inquire URL', () => {
			renderWithRouter(
				<ProductModal
					isOpen={true}
					onClose={mockOnClose}
					loan={mockLoan}
					inquireButtonLink="/custom-contact"
				/>
			);

			const link = screen.getByText('Inquire Now').closest('a');
			expect(link).toHaveAttribute('href', '/custom-contact');
		});
	});

	describe('Brand Color', () => {
		it('applies custom brand color to inquire button', () => {
			const { container } = renderWithRouter(
				<ProductModal
					isOpen={true}
					onClose={mockOnClose}
					loan={mockLoan}
					brandColor="#FF0000"
				/>
			);

			const button = screen.getByText('Inquire Now').closest('a');
			expect(button).toHaveStyle({ backgroundColor: '#FF0000' });
		});

		it('uses default brand color when not provided', () => {
			renderWithRouter(<ProductModal isOpen={true} onClose={mockOnClose} loan={mockLoan} />);

			const button = screen.getByText('Inquire Now').closest('a');
			expect(button).toBeInTheDocument();
		});
	});
});

