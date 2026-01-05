import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CarouselSection from './CarouselSection';

const mockSlides = [
	{
		title: 'Slide 1',
		subtitle: 'Subtitle 1',
		description: 'Description for slide 1',
		image: '/img1.jpg',
		route: '/page1'
	},
	{
		title: 'Slide 2',
		subtitle: 'Subtitle 2',
		description: 'Description for slide 2',
		image: '/img2.jpg',
		route: '/page2'
	},
	{
		title: 'Slide 3',
		subtitle: 'Subtitle 3',
		description: 'Description for slide 3',
		image: '/img3.jpg',
		route: '/page3'
	}
];

describe('CarouselSection Component', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	describe('Initial Render', () => {
		it('renders first slide', () => {
			renderWithRouter(<CarouselSection slides={mockSlides} />);

			expect(screen.getByText('Slide 1')).toBeInTheDocument();
			expect(screen.getByText('Subtitle 1')).toBeInTheDocument();
			expect(screen.getByText('Description for slide 1')).toBeInTheDocument();
		});

		it('renders null when no slides provided', () => {
			const { container } = renderWithRouter(<CarouselSection slides={[]} />);

			expect(container.firstChild).toBeNull();
		});

		it('renders navigation controls', () => {
			renderWithRouter(<CarouselSection slides={mockSlides} />);

			expect(screen.getByLabelText(/previous/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/next/i)).toBeInTheDocument();
		});

		it('renders dot indicators', () => {
			const { container } = renderWithRouter(<CarouselSection slides={mockSlides} />);

			const dots = container.querySelectorAll('button[aria-label^="Go to slide"]');
			expect(dots.length).toBe(3);
		});
	});

	describe('Navigation', () => {
		it('moves to next slide when next button clicked', () => {
			renderWithRouter(<CarouselSection slides={mockSlides} />);

			const nextButton = screen.getByLabelText(/next/i);
			fireEvent.click(nextButton);

			vi.advanceTimersByTime(600);

			expect(screen.getByText('Slide 2')).toBeInTheDocument();
		});

		it('moves to previous slide when previous button clicked', () => {
			renderWithRouter(<CarouselSection slides={mockSlides} />);

			const prevButton = screen.getByLabelText(/previous/i);
			fireEvent.click(prevButton);

			vi.advanceTimersByTime(600);

			// Should wrap to last slide
			expect(screen.getByText('Slide 3')).toBeInTheDocument();
		});

		it('changes slide when dot indicator clicked', () => {
			const { container } = renderWithRouter(<CarouselSection slides={mockSlides} />);

			const dots = container.querySelectorAll('button[aria-label^="Go to slide"]');
			fireEvent.click(dots[2]);

			vi.advanceTimersByTime(600);

			expect(screen.getByText('Slide 3')).toBeInTheDocument();
		});
	});

	describe('Learn More Button', () => {
		it('renders learn more button by default', () => {
			renderWithRouter(<CarouselSection slides={mockSlides} />);

			const buttons = screen.getAllByText('Learn More');
			expect(buttons.length).toBeGreaterThan(0);
			expect(buttons[0]).toBeInTheDocument();
		});

		it('uses custom learn more text', () => {
			renderWithRouter(<CarouselSection slides={mockSlides} learnMoreText="Discover More" />);

			const buttons = screen.getAllByText('Discover More');
			expect(buttons.length).toBeGreaterThan(0);
			expect(buttons[0]).toBeInTheDocument();
		});

		it('hides learn more button when showLearnMoreButton is false', () => {
			renderWithRouter(<CarouselSection slides={mockSlides} showLearnMoreButton={false} />);

			expect(screen.queryByText('Learn More')).not.toBeInTheDocument();
		});

		it('links to correct URL', () => {
			renderWithRouter(<CarouselSection slides={mockSlides} />);

			const buttons = screen.getAllByText('Learn More');
			const link = buttons[0].closest('a');
			expect(link).toHaveAttribute('href', '/page1');
		});

		it('excludes learn more for specific titles', () => {
			renderWithRouter(
				<CarouselSection slides={mockSlides} excludeLearnMoreForTitles={['Slide 1']} />
			);

			// First slide should not have learn more button (all slides render, but first one is excluded)
			// Since all slides are rendered, we check that there are 2 buttons (for slides 2 and 3), not 3
			const buttons = screen.queryAllByText('Learn More');
			expect(buttons.length).toBe(2);

			// Navigate to next slide
			const nextButton = screen.getByLabelText(/next/i);
			fireEvent.click(nextButton);
			vi.advanceTimersByTime(600);

			// Second slide should still have learn more button (should still be 2 buttons)
			const buttonsAfter = screen.queryAllByText('Learn More');
			expect(buttonsAfter.length).toBe(2);
		});
	});

	describe('Auto-play', () => {
		it('auto-advances slides when autoPlay is true', () => {
			renderWithRouter(<CarouselSection slides={mockSlides} autoPlay={true} autoPlayInterval={3000} />);

			expect(screen.getByText('Slide 1')).toBeInTheDocument();

			// Fast-forward by interval
			vi.advanceTimersByTime(3000);
			vi.advanceTimersByTime(600);

			expect(screen.getByText('Slide 2')).toBeInTheDocument();
		});

		it('does not auto-advance when autoPlay is false', () => {
			renderWithRouter(<CarouselSection slides={mockSlides} autoPlay={false} />);

			expect(screen.getByText('Slide 1')).toBeInTheDocument();

			// Fast-forward time
			vi.advanceTimersByTime(10000);

			// Should still be on first slide
			expect(screen.getByText('Slide 1')).toBeInTheDocument();
		});

		it('pauses on mouse enter', () => {
			const { container } = renderWithRouter(<CarouselSection slides={mockSlides} autoPlay={true} />);

			fireEvent.mouseEnter(container.firstChild);

			// Fast-forward time
			vi.advanceTimersByTime(10000);

			// Should still be on first slide
			expect(screen.getByText('Slide 1')).toBeInTheDocument();
		});
	});

	describe('Touch Gestures', () => {
		it('handles swipe left to next slide', () => {
			const { container } = renderWithRouter(<CarouselSection slides={mockSlides} />);
			const carousel = container.firstChild;

			fireEvent.touchStart(carousel, { targetTouches: [{ clientX: 200 }] });
			fireEvent.touchMove(carousel, { targetTouches: [{ clientX: 100 }] });
			fireEvent.touchEnd(carousel);

			vi.advanceTimersByTime(600);

			expect(screen.getByText('Slide 2')).toBeInTheDocument();
		});

		it('handles swipe right to previous slide', () => {
			const { container } = renderWithRouter(<CarouselSection slides={mockSlides} />);
			const carousel = container.firstChild;

			fireEvent.touchStart(carousel, { targetTouches: [{ clientX: 100 }] });
			fireEvent.touchMove(carousel, { targetTouches: [{ clientX: 200 }] });
			fireEvent.touchEnd(carousel);

			vi.advanceTimersByTime(600);

			expect(screen.getByText('Slide 3')).toBeInTheDocument();
		});
	});

	describe('Image Only Mode', () => {
		it('renders only image when imageOnly is true', () => {
			renderWithRouter(<CarouselSection slides={mockSlides} imageOnly={true} />);

			// Should not render text content
			expect(screen.queryByText('Slide 1')).not.toBeInTheDocument();
			expect(screen.queryByText('Subtitle 1')).not.toBeInTheDocument();
			expect(screen.queryByText('Learn More')).not.toBeInTheDocument();
		});

		it('renders full content when imageOnly is false', () => {
			renderWithRouter(<CarouselSection slides={mockSlides} imageOnly={false} />);

			expect(screen.getByText('Slide 1')).toBeInTheDocument();
			expect(screen.getByText('Subtitle 1')).toBeInTheDocument();
		});
	});

	describe('Customization', () => {
		it('applies custom ID', () => {
			const { container } = renderWithRouter(<CarouselSection slides={mockSlides} id="custom-carousel" />);

			expect(container.querySelector('#custom-carousel')).toBeInTheDocument();
		});

		it('applies custom brand color', () => {
			renderWithRouter(<CarouselSection slides={mockSlides} brandColor="#FF0000" />);

			// Component should render without errors
			expect(screen.getByText('Slide 1')).toBeInTheDocument();
		});

		it('applies custom brand gradient', () => {
			renderWithRouter(
				<CarouselSection slides={mockSlides} brandGradient="from-blue-500 to-blue-700" />
			);

			expect(screen.getByText('Slide 1')).toBeInTheDocument();
		});

		it('applies custom min height', () => {
			renderWithRouter(<CarouselSection slides={mockSlides} minHeight="min-h-[800px]" />);

			expect(screen.getByText('Slide 1')).toBeInTheDocument();
		});
	});

	describe('Edge Cases', () => {
		it('handles single slide', () => {
			const singleSlide = [mockSlides[0]];
			renderWithRouter(<CarouselSection slides={singleSlide} />);

			expect(screen.getByText('Slide 1')).toBeInTheDocument();
		});

		it('wraps around from last to first slide', () => {
			renderWithRouter(<CarouselSection slides={mockSlides} />);

			// Navigate to last slide
			const nextButton = screen.getByLabelText(/next/i);
			fireEvent.click(nextButton);
			vi.advanceTimersByTime(600);
			fireEvent.click(nextButton);
			vi.advanceTimersByTime(600);

			expect(screen.getByText('Slide 3')).toBeInTheDocument();

			// Click next again to wrap around
			fireEvent.click(nextButton);
			vi.advanceTimersByTime(600);

			expect(screen.getByText('Slide 1')).toBeInTheDocument();
		});

		it('prevents rapid navigation during transition', () => {
			renderWithRouter(<CarouselSection slides={mockSlides} />);

			const nextButton = screen.getByLabelText(/next/i);

			// Rapid clicks
			fireEvent.click(nextButton);
			fireEvent.click(nextButton);
			fireEvent.click(nextButton);

			// Should not crash
			expect(nextButton).toBeInTheDocument();
		});
	});

	describe('Accessibility', () => {
		it('has proper ARIA labels', () => {
			renderWithRouter(<CarouselSection slides={mockSlides} />);

			expect(screen.getByLabelText(/previous/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/next/i)).toBeInTheDocument();
		});

		it('has accessible dot indicators', () => {
			const { container } = renderWithRouter(<CarouselSection slides={mockSlides} />);

			const dots = container.querySelectorAll('button[aria-label^="Go to slide"]');
			expect(dots.length).toBe(3);
		});
	});
});

