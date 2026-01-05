import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LightCard, DarkCard } from './Card';

describe('Card Components', () => {
	describe('LightCard', () => {
		it('renders children content', () => {
			render(<LightCard>Test Content</LightCard>);
			
			expect(screen.getByText('Test Content')).toBeInTheDocument();
		});

		it('applies default spacing classes', () => {
			const { container } = render(<LightCard>Content</LightCard>);
			const card = container.firstChild;
			
			expect(card.className).toContain('p-8');
			expect(card.className).toContain('lg:p-10');
		});

		it('uses native spacing when useNativeSpacing is true', () => {
			const { container } = render(
				<LightCard useNativeSpacing={true} className="p-4">
					Content
				</LightCard>
			);
			const card = container.firstChild;
			
			// Should have custom padding, not default
			expect(card.className).toContain('p-4');
			expect(card.className).not.toContain('p-8');
		});

		it('applies custom className', () => {
			const { container } = render(
				<LightCard className="custom-class">Content</LightCard>
			);
			const card = container.firstChild;
			
			expect(card.className).toContain('custom-class');
		});

		it('applies base light card classes', () => {
			const { container } = render(<LightCard>Content</LightCard>);
			const card = container.firstChild;
			
			expect(card.className).toContain('bg-white');
			expect(card.className).toContain('rounded-2xl');
			expect(card.className).toContain('shadow-xl');
		});

		it('forwards additional props', () => {
			const { container } = render(
				<LightCard data-testid="light-card" role="article">
					Content
				</LightCard>
			);
			
			expect(screen.getByTestId('light-card')).toBeInTheDocument();
			expect(screen.getByRole('article')).toBeInTheDocument();
		});
	});

	describe('DarkCard', () => {
		it('renders children content', () => {
			render(<DarkCard>Dark Content</DarkCard>);
			
			expect(screen.getByText('Dark Content')).toBeInTheDocument();
		});

		it('applies default spacing classes', () => {
			const { container } = render(<DarkCard>Content</DarkCard>);
			const card = container.firstChild;
			
			expect(card.className).toContain('p-8');
			expect(card.className).toContain('lg:p-10');
		});

		it('uses native spacing when useNativeSpacing is true', () => {
			const { container } = render(
				<DarkCard useNativeSpacing={true} className="p-6">
					Content
				</DarkCard>
			);
			const card = container.firstChild;
			
			// Should have custom padding, not default
			expect(card.className).toContain('p-6');
			expect(card.className).not.toContain('p-8');
		});

		it('applies custom className', () => {
			const { container } = render(
				<DarkCard className="dark-custom">Content</DarkCard>
			);
			const card = container.firstChild;
			
			expect(card.className).toContain('dark-custom');
		});

		it('applies base dark card classes', () => {
			const { container } = render(<DarkCard>Content</DarkCard>);
			const card = container.firstChild;
			
			expect(card.className).toContain('bg-[#E9F2EA]');
			expect(card.className).toContain('rounded-2xl');
			expect(card.className).toContain('border');
		});

		it('forwards additional props', () => {
			const { container } = render(
				<DarkCard data-testid="dark-card" role="complementary">
					Content
				</DarkCard>
			);
			
			expect(screen.getByTestId('dark-card')).toBeInTheDocument();
			expect(screen.getByRole('complementary')).toBeInTheDocument();
		});
	});

	describe('Card comparison', () => {
		it('applies different background colors', () => {
			const { container: lightContainer } = render(<LightCard>Light</LightCard>);
			const { container: darkContainer } = render(<DarkCard>Dark</DarkCard>);
			
			const lightCard = lightContainer.firstChild;
			const darkCard = darkContainer.firstChild;
			
			expect(lightCard.className).toContain('bg-white');
			expect(darkCard.className).toContain('bg-[#E9F2EA]');
		});

		it('both apply hover effects', () => {
			const { container: lightContainer } = render(<LightCard>Light</LightCard>);
			const { container: darkContainer } = render(<DarkCard>Dark</DarkCard>);
			
			const lightCard = lightContainer.firstChild;
			const darkCard = darkContainer.firstChild;
			
			expect(lightCard.className).toContain('hover:shadow-2xl');
			expect(darkCard.className).toContain('hover:shadow-2xl');
		});
	});
});

