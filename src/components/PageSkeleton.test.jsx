import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
	HeroSectionSkeleton,
	CardSkeleton,
	CardGridSkeleton,
	CarouselSkeleton,
	TableSkeleton,
	FormSkeleton,
	FormFieldSkeleton,
	MapSkeleton,
	SectionHeaderSkeleton,
	ContentSectionSkeleton,
	ProductListingPageSkeleton,
	DetailPageSkeleton,
	FormPageSkeleton,
	NewsletterPageSkeleton,
	GenericPageSkeleton
} from './PageSkeleton';

describe('PageSkeleton Components', () => {
	describe('HeroSectionSkeleton', () => {
		it('renders hero skeleton with default props', () => {
			const { container } = render(<HeroSectionSkeleton />);
			const skeleton = container.querySelector('.min-h-\\[560px\\]');
			expect(skeleton).toBeInTheDocument();
		});

		it('renders hero skeleton with button when showButton is true', () => {
			render(<HeroSectionSkeleton showButton={true} />);
			const container = document.querySelector('.min-h-\\[560px\\]');
			expect(container).toBeInTheDocument();
		});

		it('renders hero skeleton without button when showButton is false', () => {
			render(<HeroSectionSkeleton showButton={false} />);
			const container = document.querySelector('.min-h-\\[560px\\]');
			expect(container).toBeInTheDocument();
		});

		it('applies custom minHeight', () => {
			render(<HeroSectionSkeleton minHeight="min-h-[800px]" />);
			const container = document.querySelector('.min-h-\\[800px\\]');
			expect(container).toBeInTheDocument();
		});
	});

	describe('CardSkeleton', () => {
		it('renders dark variant card skeleton', () => {
			render(<CardSkeleton variant="dark" />);
			const card = document.querySelector('.bg-gray-700');
			expect(card).toBeInTheDocument();
		});

		it('renders light variant card skeleton', () => {
			render(<CardSkeleton variant="light" />);
			const card = document.querySelector('.bg-white');
			expect(card).toBeInTheDocument();
		});

		it('renders card with image when showImage is true', () => {
			render(<CardSkeleton showImage={true} />);
			const image = document.querySelector('.h-48');
			expect(image).toBeInTheDocument();
		});

		it('renders card without image when showImage is false', () => {
			const { container } = render(<CardSkeleton showImage={false} />);
			const image = container.querySelector('.h-48');
			expect(image).not.toBeInTheDocument();
		});

		it('renders card with button when showButton is true', () => {
			render(<CardSkeleton showButton={true} />);
			const button = document.querySelector('.h-10');
			expect(button).toBeInTheDocument();
		});
	});

	describe('CardGridSkeleton', () => {
		it('renders grid with default columns and rows', () => {
			render(<CardGridSkeleton />);
			const grid = document.querySelector('.grid');
			expect(grid).toBeInTheDocument();
		});

		it('renders grid with custom columns', () => {
			render(<CardGridSkeleton columns={4} />);
			const grid = document.querySelector('.lg\\:grid-cols-4');
			expect(grid).toBeInTheDocument();
		});

		it('renders grid with custom rows', () => {
			render(<CardGridSkeleton rows={5} />);
			const cards = document.querySelectorAll('.animate-pulse');
			expect(cards.length).toBeGreaterThanOrEqual(5);
		});
	});

	describe('CarouselSkeleton', () => {
		it('renders carousel skeleton with default slides', () => {
			render(<CarouselSkeleton />);
			const carousel = document.querySelector('.overflow-hidden');
			expect(carousel).toBeInTheDocument();
		});

		it('renders carousel with custom number of slides', () => {
			render(<CarouselSkeleton slides={5} />);
			const slides = document.querySelectorAll('.min-w-full');
			expect(slides.length).toBe(5);
		});

		it('renders arrows when showArrows is true', () => {
			render(<CarouselSkeleton showArrows={true} />);
			const arrows = document.querySelectorAll('.absolute.top-1\\/2');
			expect(arrows.length).toBe(2);
		});

		it('renders dots when showDots is true', () => {
			render(<CarouselSkeleton showDots={true} />);
			const dotsContainer = document.querySelector('.flex.justify-center.gap-2');
			expect(dotsContainer).toBeInTheDocument();
		});
	});

	describe('TableSkeleton', () => {
		it('renders table skeleton with default props', () => {
			render(<TableSkeleton />);
			const table = document.querySelector('table');
			expect(table).toBeInTheDocument();
		});

		it('renders table with custom columns and rows', () => {
			render(<TableSkeleton columns={7} rows={10} />);
			const headers = document.querySelectorAll('th');
			expect(headers.length).toBe(7);
			const rows = document.querySelectorAll('tbody tr');
			expect(rows.length).toBe(10);
		});

		it('renders header when showHeader is true', () => {
			render(<TableSkeleton showHeader={true} />);
			const header = document.querySelector('thead');
			expect(header).toBeInTheDocument();
		});

		it('renders without header when showHeader is false', () => {
			const { container } = render(<TableSkeleton showHeader={false} />);
			const header = container.querySelector('thead');
			expect(header).not.toBeInTheDocument();
		});
	});

	describe('FormFieldSkeleton', () => {
		it('renders form field skeleton with default props', () => {
			render(<FormFieldSkeleton />);
			const field = document.querySelector('.space-y-2');
			expect(field).toBeInTheDocument();
		});

		it('renders label when showLabel is true', () => {
			render(<FormFieldSkeleton showLabel={true} />);
			const skeleton = document.querySelector('.w-24.h-4');
			expect(skeleton).toBeInTheDocument();
		});

		it('renders input when showInput is true', () => {
			render(<FormFieldSkeleton showInput={true} />);
			const input = document.querySelector('.h-10');
			expect(input).toBeInTheDocument();
		});

		it('renders helper text when showHelper is true', () => {
			render(<FormFieldSkeleton showHelper={true} />);
			const skeletons = document.querySelectorAll('.animate-pulse');
			expect(skeletons.length).toBeGreaterThan(1);
		});
	});

	describe('FormSkeleton', () => {
		it('renders form skeleton with default props', () => {
			render(<FormSkeleton />);
			const form = document.querySelector('.max-w-2xl');
			expect(form).toBeInTheDocument();
		});

		it('renders form with custom number of fields', () => {
			render(<FormSkeleton fields={10} />);
			const fields = document.querySelectorAll('.space-y-2');
			expect(fields.length).toBe(10);
		});

		it('renders title when showTitle is true', () => {
			render(<FormSkeleton showTitle={true} />);
			const title = document.querySelector('.mb-6');
			expect(title).toBeInTheDocument();
		});

		it('renders buttons when showButton is true', () => {
			render(<FormSkeleton showButton={true} />);
			const buttons = document.querySelectorAll('.h-10');
			expect(buttons.length).toBeGreaterThan(0);
		});
	});

	describe('MapSkeleton', () => {
		it('renders map skeleton with default height', () => {
			render(<MapSkeleton />);
			const map = document.querySelector('.h-96');
			expect(map).toBeInTheDocument();
		});

		it('renders map skeleton with custom height', () => {
			render(<MapSkeleton height="h-[600px]" />);
			const map = document.querySelector('.h-\\[600px\\]');
			expect(map).toBeInTheDocument();
		});
	});

	describe('SectionHeaderSkeleton', () => {
		it('renders section header skeleton with default props', () => {
			render(<SectionHeaderSkeleton />);
			const header = document.querySelector('.flex.flex-col');
			expect(header).toBeInTheDocument();
		});

		it('renders badge when showBadge is true', () => {
			render(<SectionHeaderSkeleton showBadge={true} />);
			const badge = document.querySelector('.rounded-full');
			expect(badge).toBeInTheDocument();
		});

		it('renders subtitle when showSubtitle is true', () => {
			render(<SectionHeaderSkeleton showSubtitle={true} />);
			const skeletons = document.querySelectorAll('.animate-pulse');
			expect(skeletons.length).toBeGreaterThan(1);
		});

		it('applies center alignment', () => {
			render(<SectionHeaderSkeleton alignment="center" />);
			const header = document.querySelector('.text-center');
			expect(header).toBeInTheDocument();
		});
	});

	describe('ContentSectionSkeleton', () => {
		it('renders content section skeleton', () => {
			render(<ContentSectionSkeleton />);
			const section = document.querySelector('section');
			expect(section).toBeInTheDocument();
		});

		it('renders header when showHeader is true', () => {
			render(<ContentSectionSkeleton showHeader={true} />);
			const header = document.querySelector('.flex.flex-col');
			expect(header).toBeInTheDocument();
		});

		it('renders cards when showCards is true', () => {
			render(<ContentSectionSkeleton showCards={true} />);
			const grid = document.querySelector('.grid');
			expect(grid).toBeInTheDocument();
		});
	});

	describe('ProductListingPageSkeleton', () => {
		it('renders product listing page skeleton', () => {
			render(<ProductListingPageSkeleton />);
			const main = document.querySelector('main');
			expect(main).toBeInTheDocument();
		});

		it('renders hero when showHero is true', () => {
			render(<ProductListingPageSkeleton showHero={true} />);
			const hero = document.querySelector('.min-h-\\[560px\\]');
			expect(hero).toBeInTheDocument();
		});

		it('renders carousel when showCarousel is true', () => {
			render(<ProductListingPageSkeleton showCarousel={true} />);
			const carousel = document.querySelector('.overflow-hidden');
			expect(carousel).toBeInTheDocument();
		});

		it('renders product grid when showProductGrid is true', () => {
			render(<ProductListingPageSkeleton showProductGrid={true} />);
			const grid = document.querySelector('.grid');
			expect(grid).toBeInTheDocument();
		});
	});

	describe('DetailPageSkeleton', () => {
		it('renders detail page skeleton', () => {
			render(<DetailPageSkeleton />);
			const main = document.querySelector('main');
			expect(main).toBeInTheDocument();
		});

		it('renders content sections', () => {
			render(<DetailPageSkeleton contentSections={3} />);
			const sections = document.querySelectorAll('.mb-12');
			expect(sections.length).toBe(3);
		});
	});

	describe('FormPageSkeleton', () => {
		it('renders form page skeleton', () => {
			render(<FormPageSkeleton />);
			const main = document.querySelector('main');
			expect(main).toBeInTheDocument();
		});

		it('renders form when showForm is true', () => {
			render(<FormPageSkeleton showForm={true} />);
			const form = document.querySelector('.max-w-2xl');
			expect(form).toBeInTheDocument();
		});

		it('renders map when showMap is true', () => {
			render(<FormPageSkeleton showMap={true} />);
			const map = document.querySelector('.h-full');
			expect(map).toBeInTheDocument();
		});
	});

	describe('NewsletterPageSkeleton', () => {
		it('renders newsletter page skeleton', () => {
			render(<NewsletterPageSkeleton />);
			const main = document.querySelector('main');
			expect(main).toBeInTheDocument();
		});

		it('renders grid when showGrid is true', () => {
			render(<NewsletterPageSkeleton showGrid={true} />);
			const grid = document.querySelector('.grid');
			expect(grid).toBeInTheDocument();
		});
	});

	describe('GenericPageSkeleton', () => {
		it('renders generic page skeleton', () => {
			render(<GenericPageSkeleton />);
			const main = document.querySelector('main');
			expect(main).toBeInTheDocument();
		});

		it('renders children when provided', () => {
			render(
				<GenericPageSkeleton>
					<div data-testid="child">Child Content</div>
				</GenericPageSkeleton>
			);
			expect(screen.getByTestId('child')).toBeInTheDocument();
		});

		it('applies custom className', () => {
			render(<GenericPageSkeleton className="custom-class" />);
			const main = document.querySelector('main.custom-class');
			expect(main).toBeInTheDocument();
		});
	});
});

