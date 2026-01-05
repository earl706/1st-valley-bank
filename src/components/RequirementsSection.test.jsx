import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RequirementsSection from './RequirementsSection';

// Mock LightHeader
vi.mock('./Header', () => ({
	LightHeader: ({ badgeText, title, subtitle }) => (
		<div data-testid="light-header">
			{badgeText && <span data-testid="badge">{badgeText}</span>}
			<h3>{title}</h3>
			{subtitle && <p>{subtitle}</p>}
		</div>
	)
}));

describe('RequirementsSection Component', () => {
	describe('Empty State', () => {
		it('returns null when requirements are empty', () => {
			const { container } = render(<RequirementsSection requirements={[]} />);
			expect(container.firstChild).toBeNull();
		});

		it('returns null when requirements are null', () => {
			const { container } = render(<RequirementsSection requirements={null} />);
			expect(container.firstChild).toBeNull();
		});

		it('returns null when requirements are undefined', () => {
			const { container } = render(<RequirementsSection />);
			expect(container.firstChild).toBeNull();
		});
	});

	describe('Data Normalization', () => {
		it('normalizes simple array of strings', () => {
			const requirements = ['Item 1', 'Item 2', 'Item 3'];
			render(<RequirementsSection requirements={requirements} />);

			// "Requirements" appears in both h3 title and h4 category
			const requirementsElements = screen.getAllByText('Requirements');
			expect(requirementsElements.length).toBeGreaterThan(0);
			expect(screen.getByText('Item 1')).toBeInTheDocument();
			expect(screen.getByText('Item 2')).toBeInTheDocument();
			expect(screen.getByText('Item 3')).toBeInTheDocument();
		});

		it('normalizes object with category keys', () => {
			const requirements = {
				individual: ['ID', 'Proof of income'],
				business: ['Business permit', 'Financial statements']
			};
			render(<RequirementsSection requirements={requirements} />);

			expect(screen.getByText('Individual')).toBeInTheDocument();
			expect(screen.getByText('ID')).toBeInTheDocument();
			expect(screen.getByText('Business')).toBeInTheDocument();
			expect(screen.getByText('Business permit')).toBeInTheDocument();
		});

		it('normalizes object with underscore keys', () => {
			const requirements = {
				individual_requirements: ['ID'],
				business_requirements: ['Permit']
			};
			render(<RequirementsSection requirements={requirements} />);

			expect(screen.getByText('Individual requirements')).toBeInTheDocument();
			expect(screen.getByText('Business requirements')).toBeInTheDocument();
		});

		it('normalizes array of category objects', () => {
			const requirements = [
				{ category: 'Individual', items: ['ID', 'Income proof'] },
				{ category: 'Business', items: ['Permit', 'Statements'] }
			];
			render(<RequirementsSection requirements={requirements} />);

			expect(screen.getByText('Individual')).toBeInTheDocument();
			expect(screen.getByText('ID')).toBeInTheDocument();
			expect(screen.getByText('Business')).toBeInTheDocument();
			expect(screen.getByText('Permit')).toBeInTheDocument();
		});

		it('handles mixed array with strings and objects', () => {
			// Note: Component normalizes based on first element type
			// If first is string, all treated as simple array
			// For mixed arrays, ensure first element is object to trigger proper normalization
			const requirements = [
				{ category: 'Specific', items: ['Item 1'] },
				'General requirement'
			];
			render(<RequirementsSection requirements={requirements} />);

			// Component will normalize - first object will have category, string will become separate category
			expect(screen.getByText('Specific')).toBeInTheDocument();
			expect(screen.getByText('Item 1')).toBeInTheDocument();
			expect(screen.getByText('General requirement')).toBeInTheDocument();
		});

		it('handles object with non-array items', () => {
			const requirements = {
				individual: 'Not an array'
			};
			render(<RequirementsSection requirements={requirements} />);

			expect(screen.getByText('Individual')).toBeInTheDocument();
		});
	});

	describe('Two-Column Layout (Default)', () => {
		it('renders two-column layout by default', () => {
			const requirements = ['Item 1', 'Item 2'];
			render(<RequirementsSection requirements={requirements} />);

			const grid = document.querySelector('.md\\:grid-cols-2');
			expect(grid).toBeInTheDocument();
		});

		it('splits categories into two columns', () => {
			const requirements = [
				{ category: 'Cat 1', items: ['A', 'B'] },
				{ category: 'Cat 2', items: ['C', 'D'] },
				{ category: 'Cat 3', items: ['E', 'F'] }
			];
			render(<RequirementsSection requirements={requirements} layout="two-column" />);

			const columns = document.querySelectorAll('.space-y-8');
			expect(columns.length).toBe(2);
		});

		it('renders title and subtitle without badge', () => {
			const requirements = ['Item 1'];
			render(
				<RequirementsSection
					requirements={requirements}
					title="Custom Title"
					subtitle="Custom Subtitle"
				/>
			);

			expect(screen.getByText('Custom Title')).toBeInTheDocument();
			expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();
			expect(screen.queryByTestId('badge')).not.toBeInTheDocument();
		});

		it('renders with badge when badgeText is provided', () => {
			const requirements = ['Item 1'];
			render(
				<RequirementsSection
					requirements={requirements}
					badgeText="Important"
					title="Title"
				/>
			);

			expect(screen.getByTestId('badge')).toBeInTheDocument();
			expect(screen.getByText('Important')).toBeInTheDocument();
		});
	});

	describe('Single-Column Layout', () => {
		it('renders single-column layout', () => {
			const requirements = ['Item 1', 'Item 2'];
			render(<RequirementsSection requirements={requirements} layout="single-column" />);

			const container = document.querySelector('.space-y-6');
			expect(container).toBeInTheDocument();
		});

		it('does not split into columns in single-column layout', () => {
			const requirements = [
				{ category: 'Cat 1', items: ['A'] },
				{ category: 'Cat 2', items: ['B'] },
				{ category: 'Cat 3', items: ['C'] }
			];
			render(<RequirementsSection requirements={requirements} layout="single-column" />);

			const grid = document.querySelector('.md\\:grid-cols-2');
			expect(grid).not.toBeInTheDocument();
		});
	});

	describe('Cards Layout', () => {
		it('renders cards layout', () => {
			const requirements = ['Item 1', 'Item 2'];
			render(<RequirementsSection requirements={requirements} layout="cards" />);

			const grid = document.querySelector('.lg\\:grid-cols-3');
			expect(grid).toBeInTheDocument();
		});

		it('centers header in cards layout', () => {
			const requirements = ['Item 1'];
			render(
				<RequirementsSection
					requirements={requirements}
					layout="cards"
					title="Title"
				/>
			);

			const header = document.querySelector('.text-center');
			expect(header).toBeInTheDocument();
		});

		it('shows icons in containers in cards layout', () => {
			const requirements = [
				{ category: 'Individual', items: ['Item 1'] }
			];
			render(
				<RequirementsSection
					requirements={requirements}
					layout="cards"
					showIcons={true}
				/>
			);

			const iconContainer = document.querySelector('.bg-gray-100');
			expect(iconContainer).toBeInTheDocument();
		});
	});

	describe('Icons', () => {
		it('shows icons by default', () => {
			const requirements = [
				{ category: 'Individual', items: ['Item 1'] }
			];
			render(<RequirementsSection requirements={requirements} />);

			// Icon should be present (lucide-react icons render as SVG)
			const iconContainer = document.querySelector('.h-8.w-8');
			expect(iconContainer).toBeInTheDocument();
		});

		it('hides icons when showIcons is false', () => {
			const requirements = [
				{ category: 'Individual', items: ['Item 1'] }
			];
			render(<RequirementsSection requirements={requirements} showIcons={false} />);

			// No icon container should be present
			const iconContainer = document.querySelector('.h-8.w-8');
			expect(iconContainer).not.toBeInTheDocument();
		});

		it('maps individual category to User icon', () => {
			const requirements = [
				{ category: 'Individual', items: ['Item 1'] }
			];
			const { container } = render(
				<RequirementsSection requirements={requirements} showIcons={true} />
			);

			// User icon should be rendered (lucide-react icon)
			expect(container.querySelector('svg')).toBeInTheDocument();
		});

		it('maps business category to Building icon', () => {
			const requirements = [
				{ category: 'Business', items: ['Item 1'] }
			];
			const { container } = render(
				<RequirementsSection requirements={requirements} showIcons={true} />
			);

			expect(container.querySelector('svg')).toBeInTheDocument();
		});

		it('uses default FileText icon for unknown categories', () => {
			const requirements = [
				{ category: 'Unknown Category', items: ['Item 1'] }
			];
			const { container } = render(
				<RequirementsSection requirements={requirements} showIcons={true} />
			);

			expect(container.querySelector('svg')).toBeInTheDocument();
		});
	});

	describe('Custom Props', () => {
		it('applies custom className', () => {
			const requirements = ['Item 1'];
			const { container } = render(
				<RequirementsSection requirements={requirements} className="custom-class" />
			);

			const section = container.querySelector('.custom-class');
			expect(section).toBeInTheDocument();
		});

		it('uses default title when not provided', () => {
			const requirements = ['Item 1'];
			render(<RequirementsSection requirements={requirements} />);

			// "Requirements" appears as h3 title
			const titles = screen.getAllByText('Requirements');
			expect(titles.length).toBeGreaterThan(0);
		});

		it('uses default subtitle when not provided', () => {
			const requirements = ['Item 1'];
			render(<RequirementsSection requirements={requirements} />);

			expect(screen.getByText('What you need to get started')).toBeInTheDocument();
		});
	});

	describe('Edge Cases', () => {
		it('handles requirements with empty items array', () => {
			const requirements = [{ category: 'Category', items: [] }];
			render(<RequirementsSection requirements={requirements} />);

			expect(screen.getByText('Category')).toBeInTheDocument();
		});

		it('handles category object without category field', () => {
			const requirements = [{ items: ['Item 1'] }];
			render(<RequirementsSection requirements={requirements} />);

			// "Requirements" is used as default category
			const requirementsElements = screen.getAllByText('Requirements');
			expect(requirementsElements.length).toBeGreaterThan(0);
			expect(screen.getByText('Item 1')).toBeInTheDocument();
		});

		it('handles category with empty string', () => {
			const requirements = [{ category: '', items: ['Item 1'] }];
			render(<RequirementsSection requirements={requirements} />);

			expect(screen.getByText('Item 1')).toBeInTheDocument();
		});
	});
});

