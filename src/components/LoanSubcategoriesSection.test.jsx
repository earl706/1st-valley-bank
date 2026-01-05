import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import LoanSubcategoriesSection from './LoanSubcategoriesSection';

// Mock ProductModal
vi.mock('./ProductModal', () => ({
	default: ({ isOpen, onClose, loan }) => {
		if (!isOpen) return null;
		return (
			<div data-testid="product-modal">
				<button onClick={onClose} data-testid="modal-close">Close</button>
				<div data-testid="modal-loan-title">{loan?.title}</div>
			</div>
		);
	}
}));

// Mock Buttons
vi.mock('./Buttons', () => ({
	DarkPrimaryButton: ({ children, to, onClick }) => (
		<a href={to} onClick={onClick} data-testid="dark-primary-button">
			{children}
		</a>
	),
	DarkSecondaryButton: ({ children, to, onClick }) => (
		<a href={to} onClick={onClick} data-testid="dark-secondary-button">
			{children}
		</a>
	),
	LightPrimaryButton: ({ children, onClick }) => (
		<button onClick={onClick} data-testid="light-primary-button">
			{children}
		</button>
	),
	LightSecondaryButton: ({ children, to, onClick }) => (
		<a href={to} onClick={onClick} data-testid="light-secondary-button">
			{children}
		</a>
	)
}));

// Mock Header
vi.mock('./Header', () => ({
	DarkHeader: ({ title, subtitle, badgeText }) => (
		<div data-testid="dark-header">
			{badgeText && <span data-testid="badge">{badgeText}</span>}
			<h2>{title}</h2>
			{subtitle && <p>{subtitle}</p>}
		</div>
	)
}));

// Mock Card
vi.mock('./Card', () => ({
	DarkCard: ({ children, className }) => (
		<div data-testid="dark-card" className={className}>
			{children}
		</div>
	)
}));

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return {
		...actual,
		useNavigate: () => mockNavigate
	};
});

describe('LoanSubcategoriesSection Component', () => {
	const mockLoanTypes = [
		{
			id: 1,
			title: 'Personal Loan',
			description: 'Flexible personal loan options',
			image: '/loan1.jpg',
			features: ['Fast approval', 'Low rates'],
			route: '/loans/personal'
		},
		{
			id: 2,
			title: 'Business Loan',
			description: 'Grow your business',
			image: '/loan2.jpg',
			features: ['Flexible terms', 'Quick funding'],
			route: '/loans/business'
		}
	];

	beforeEach(() => {
		vi.clearAllMocks();
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	describe('Rendering', () => {
		it('renders loan subcategories section', () => {
			renderWithRouter(<LoanSubcategoriesSection loanTypes={mockLoanTypes} />);

			expect(screen.getByTestId('dark-header')).toBeInTheDocument();
			expect(screen.getByText('Loan Types')).toBeInTheDocument();
		});

		it('renders all loan types', () => {
			renderWithRouter(<LoanSubcategoriesSection loanTypes={mockLoanTypes} />);

			expect(screen.getByText('Personal Loan')).toBeInTheDocument();
			expect(screen.getByText('Business Loan')).toBeInTheDocument();
			expect(screen.getByText('Flexible personal loan options')).toBeInTheDocument();
		});

		it('renders loan type images', () => {
			renderWithRouter(<LoanSubcategoriesSection loanTypes={mockLoanTypes} />);

			const images = screen.getAllByAltText(/Personal Loan|Business Loan/);
			expect(images.length).toBe(2);
		});

		it('renders features when provided', () => {
			renderWithRouter(<LoanSubcategoriesSection loanTypes={mockLoanTypes} />);

			expect(screen.getByText('Fast approval')).toBeInTheDocument();
			expect(screen.getByText('Low rates')).toBeInTheDocument();
		});

		it('renders custom title and subtitle', () => {
			renderWithRouter(
				<LoanSubcategoriesSection
					loanTypes={mockLoanTypes}
					sectionTitle="Custom Title"
					sectionSubtitle="Custom Subtitle"
				/>
			);

			expect(screen.getByText('Custom Title')).toBeInTheDocument();
			expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();
		});

		it('renders CTA section when showCallToAction is true', () => {
			renderWithRouter(
				<LoanSubcategoriesSection loanTypes={mockLoanTypes} showCallToAction={true} />
			);

			expect(screen.getByText('Need help choosing the right loan for you?')).toBeInTheDocument();
			expect(screen.getByText('Get Expert Consultation')).toBeInTheDocument();
		});

		it('does not render CTA section when showCallToAction is false', () => {
			renderWithRouter(
				<LoanSubcategoriesSection loanTypes={mockLoanTypes} showCallToAction={false} />
			);

			expect(screen.queryByText('Need help choosing the right loan for you?')).not.toBeInTheDocument();
		});
	});

	describe('CTA Only Mode', () => {
		it('renders only CTA when ctaOnly is true', () => {
			renderWithRouter(<LoanSubcategoriesSection ctaOnly={true} showCallToAction={true} />);

			expect(screen.getByText('Need help choosing the right loan for you?')).toBeInTheDocument();
			expect(screen.queryByTestId('dark-header')).not.toBeInTheDocument();
		});

		it('renders custom CTA title in ctaOnly mode', () => {
			renderWithRouter(
				<LoanSubcategoriesSection
					ctaOnly={true}
					showCallToAction={true}
					ctaTitle="Custom CTA Title"
				/>
			);

			expect(screen.getByText('Custom CTA Title')).toBeInTheDocument();
		});

		it('renders CTA buttons with correct links in ctaOnly mode', () => {
			renderWithRouter(
				<LoanSubcategoriesSection
					ctaOnly={true}
					showCallToAction={true}
					ctaPrimaryLink="/primary"
					ctaSecondaryLink="/secondary"
				/>
			);

			const primaryButton = screen.getByText('Get Expert Consultation').closest('a');
			const secondaryButton = screen.getByText('View All Loans').closest('a');
			expect(primaryButton).toHaveAttribute('href', '/primary');
			expect(secondaryButton).toHaveAttribute('href', '/secondary');
		});
	});

	describe('Modal Functionality', () => {
		it('opens modal when View Details button is clicked', async () => {
			renderWithRouter(<LoanSubcategoriesSection loanTypes={mockLoanTypes} showModal={true} />);

			const viewDetailsButtons = screen.getAllByText('View Details');
			fireEvent.click(viewDetailsButtons[0]);

			await waitFor(() => {
				expect(screen.getByTestId('product-modal')).toBeInTheDocument();
				expect(screen.getByTestId('modal-loan-title')).toHaveTextContent('Personal Loan');
			});
		});

		it('closes modal when close button is clicked', async () => {
			renderWithRouter(<LoanSubcategoriesSection loanTypes={mockLoanTypes} showModal={true} />);

			const viewDetailsButtons = screen.getAllByText('View Details');
			fireEvent.click(viewDetailsButtons[0]);

			await waitFor(() => {
				expect(screen.getByTestId('product-modal')).toBeInTheDocument();
			});

			const closeButton = screen.getByTestId('modal-close');
			fireEvent.click(closeButton);

			await waitFor(() => {
				expect(screen.queryByTestId('product-modal')).not.toBeInTheDocument();
			});
		});

		it('renders Learn More link when showModal is false', () => {
			renderWithRouter(<LoanSubcategoriesSection loanTypes={mockLoanTypes} showModal={false} />);

			const learnMoreLinks = screen.getAllByText('Learn More');
			expect(learnMoreLinks.length).toBe(2);
			expect(learnMoreLinks[0].closest('a')).toHaveAttribute('href', '/loans/personal');
		});

		it('does not render Apply Now button when showModal is false', () => {
			renderWithRouter(<LoanSubcategoriesSection loanTypes={mockLoanTypes} showModal={false} />);

			expect(screen.queryByText('Apply Now')).not.toBeInTheDocument();
		});
	});

	describe('Apply Now Functionality', () => {
		it('navigates to loan qualification when Apply Now is clicked', () => {
			renderWithRouter(<LoanSubcategoriesSection loanTypes={mockLoanTypes} showModal={true} />);

			const applyButtons = screen.getAllByText('Apply Now');
			fireEvent.click(applyButtons[0]);

			expect(mockNavigate).toHaveBeenCalledWith('/loan-qualification/personal-loan');
		});

		it('handles loan type titles with spaces in navigation', () => {
			const loanWithSpaces = [
				{
					...mockLoanTypes[0],
					title: 'Salary Loan Type'
				}
			];
			renderWithRouter(
				<LoanSubcategoriesSection loanTypes={loanWithSpaces} showModal={true} />
			);

			const applyButtons = screen.getAllByText('Apply Now');
			fireEvent.click(applyButtons[0]);

			expect(mockNavigate).toHaveBeenCalledWith('/loan-qualification/salary-loan-type');
		});
	});

	describe('Edge Cases', () => {
		it('renders empty state gracefully', () => {
			renderWithRouter(<LoanSubcategoriesSection loanTypes={[]} />);

			expect(screen.getByTestId('dark-header')).toBeInTheDocument();
			const cards = screen.queryAllByTestId('dark-card');
			expect(cards.length).toBe(0);
		});

		it('handles loan type without features', () => {
			const loanWithoutFeatures = [
				{
					id: 3,
					title: 'Simple Loan',
					description: 'Basic loan',
					image: '/loan3.jpg'
				}
			];
			renderWithRouter(<LoanSubcategoriesSection loanTypes={loanWithoutFeatures} />);

			expect(screen.getByText('Simple Loan')).toBeInTheDocument();
			expect(screen.getByText('Basic loan')).toBeInTheDocument();
		});

		it('handles loan type without image', () => {
			const loanWithoutImage = [
				{
					id: 4,
					title: 'No Image Loan',
					description: 'Loan without image'
				}
			];
			renderWithRouter(<LoanSubcategoriesSection loanTypes={loanWithoutImage} />);

			expect(screen.getByText('No Image Loan')).toBeInTheDocument();
		});
	});

	describe('Custom Props', () => {
		it('applies custom className', () => {
			const { container } = renderWithRouter(
				<LoanSubcategoriesSection loanTypes={mockLoanTypes} className="custom-class" />
			);

			const section = container.querySelector('#loan-subcategories.custom-class');
			expect(section).toBeInTheDocument();
		});

		it('applies custom brandColor', () => {
			renderWithRouter(
				<LoanSubcategoriesSection loanTypes={mockLoanTypes} brandColor="#ff0000" />
			);

			const title = screen.getByText('Personal Loan');
			expect(title).toHaveStyle({ color: '#ff0000' });
		});

		it('uses custom id', () => {
			const { container } = renderWithRouter(
				<LoanSubcategoriesSection loanTypes={mockLoanTypes} id="custom-id" />
			);

			const section = container.querySelector('#custom-id');
			expect(section).toBeInTheDocument();
		});

		it('renders custom CTA text', () => {
			renderWithRouter(
				<LoanSubcategoriesSection
					loanTypes={mockLoanTypes}
					showCallToAction={true}
					ctaPrimaryText="Custom Primary"
					ctaSecondaryText="Custom Secondary"
				/>
			);

			expect(screen.getByText('Custom Primary')).toBeInTheDocument();
			expect(screen.getByText('Custom Secondary')).toBeInTheDocument();
		});
	});
});

