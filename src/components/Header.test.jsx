import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LightHeader, DarkHeader } from './Header';

describe('Header Components', () => {
	describe('LightHeader', () => {
		it('renders with all props', () => {
			render(
				<LightHeader
					badgeText="Our Services"
					title="Banking Solutions"
					subtitle="Comprehensive financial services for your needs"
				/>
			);

			expect(screen.getByText('Our Services')).toBeInTheDocument();
			expect(screen.getByText('Banking Solutions')).toBeInTheDocument();
			expect(screen.getByText('Comprehensive financial services for your needs')).toBeInTheDocument();
		});

		it('renders badge with correct styling', () => {
			const { container } = render(
				<LightHeader
					badgeText="Featured"
					title="Title"
					subtitle="Subtitle"
				/>
			);

			// Find the badge by its distinct classes
			const badge = container.querySelector('.bg-\\[\\#396131\\]\\/10');
			expect(badge).toBeInTheDocument();
			expect(badge).toHaveClass('text-[#396131]');
			expect(badge?.textContent).toContain('Featured');
		});

		it('renders title with correct styling', () => {
			render(
				<LightHeader
					badgeText="Badge"
					title="Main Title"
					subtitle="Subtitle"
				/>
			);

			const title = screen.getByText('Main Title');
			expect(title).toHaveClass('text-[#185027]');
			expect(title).toHaveClass('font-bold');
		});

		it('renders subtitle with correct styling', () => {
			render(
				<LightHeader
					badgeText="Badge"
					title="Title"
					subtitle="This is a subtitle"
				/>
			);

			const subtitle = screen.getByText('This is a subtitle');
			expect(subtitle).toHaveClass('text-gray-700');
		});

		it('handles long text content', () => {
			const longTitle = 'This is a very long title that should still render correctly';
			const longSubtitle = 'This is a very long subtitle with lots of text that should wrap properly and maintain readability';

			render(
				<LightHeader
					badgeText="Long Content"
					title={longTitle}
					subtitle={longSubtitle}
				/>
			);

			expect(screen.getByText(longTitle)).toBeInTheDocument();
			expect(screen.getByText(longSubtitle)).toBeInTheDocument();
		});

		it('handles special characters in text', () => {
			render(
				<LightHeader
					badgeText="Special & Characters"
					title="Title with symbols"
					subtitle="Subtitle with quotes"
				/>
			);

			expect(screen.getByText('Special & Characters')).toBeInTheDocument();
			expect(screen.getByText('Title with symbols')).toBeInTheDocument();
			expect(screen.getByText('Subtitle with quotes')).toBeInTheDocument();
		});
	});

	describe('DarkHeader', () => {
		it('renders with all props', () => {
			render(
				<DarkHeader
					badgeText="Our Mission"
					title="Empowering Communities"
					subtitle="Building a better future together"
				/>
			);

			expect(screen.getByText('Our Mission')).toBeInTheDocument();
			expect(screen.getByText('Empowering Communities')).toBeInTheDocument();
			expect(screen.getByText('Building a better future together')).toBeInTheDocument();
		});

		it('renders badge with correct dark styling', () => {
			const { container } = render(
				<DarkHeader
					badgeText="Featured"
					title="Title"
					subtitle="Subtitle"
				/>
			);

			// Find the badge by its distinct classes
			const badge = container.querySelector('.bg-\\[\\#9FE870\\]\\/10');
			expect(badge).toBeInTheDocument();
			expect(badge).toHaveClass('text-white');
			expect(badge?.textContent).toContain('Featured');
		});

		it('renders title with white color', () => {
			render(
				<DarkHeader
					badgeText="Badge"
					title="Dark Title"
					subtitle="Subtitle"
				/>
			);

			const title = screen.getByText('Dark Title');
			expect(title).toHaveClass('text-white');
			expect(title).toHaveClass('font-bold');
		});

		it('renders subtitle with light gray color', () => {
			render(
				<DarkHeader
					badgeText="Badge"
					title="Title"
					subtitle="Dark subtitle"
				/>
			);

			const subtitle = screen.getByText('Dark subtitle');
			expect(subtitle).toHaveClass('text-gray-300');
		});

		it('handles empty strings gracefully', () => {
			const { container } = render(
				<DarkHeader
					badgeText=""
					title=""
					subtitle=""
				/>
			);

			// Component should still render without errors
			// Check for the main container structure
			const mainDiv = container.querySelector('.mb-16.text-center');
			expect(mainDiv).toBeInTheDocument();
		});

		it('renders decorative elements', () => {
			const { container } = render(
				<DarkHeader
					badgeText="Test"
					title="Test Title"
					subtitle="Test Subtitle"
				/>
			);

			// Check for decorative dot in badge
			const badge = screen.getByText('Test').parentElement;
			const dot = badge?.querySelector('.h-2.w-2.rounded-full');
			expect(dot).toBeInTheDocument();

			// Check for decorative line
			const line = container.querySelector('.h-1.w-24.rounded-full');
			expect(line).toBeInTheDocument();
		});
	});

	describe('Component Comparison', () => {
		it('LightHeader and DarkHeader have different color schemes', () => {
			const { container: lightContainer } = render(
				<LightHeader
					badgeText="Light"
					title="Light Title"
					subtitle="Light Subtitle"
				/>
			);

			const { container: darkContainer } = render(
				<DarkHeader
					badgeText="Dark"
					title="Dark Title"
					subtitle="Dark Subtitle"
				/>
			);

			const lightTitle = screen.getByText('Light Title');
			const darkTitle = screen.getByText('Dark Title');

			expect(lightTitle).toHaveClass('text-[#185027]');
			expect(darkTitle).toHaveClass('text-white');
		});

		it('both components share similar structure', () => {
			const { container: lightContainer } = render(
				<LightHeader
					badgeText="Test"
					title="Test"
					subtitle="Test"
				/>
			);

			const { container: darkContainer } = render(
				<DarkHeader
					badgeText="Test"
					title="Test"
					subtitle="Test"
				/>
			);

			// Both should have the same basic structure
			expect(lightContainer.querySelector('.mb-16')).toBeInTheDocument();
			expect(darkContainer.querySelector('.mb-16')).toBeInTheDocument();
		});
	});
});

