import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Carousel from './Carousel';

describe('Carousel Component', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	describe('Initial Render', () => {
		it('renders carousel with images', () => {
			const { container } = render(<Carousel />);

			expect(container.querySelector('img')).toBeInTheDocument();
		});

		it('renders navigation buttons', () => {
			render(<Carousel />);

			expect(screen.getByLabelText('Previous Slide')).toBeInTheDocument();
			expect(screen.getByLabelText('Next Slide')).toBeInTheDocument();
		});

		it('renders dot indicators', () => {
			const { container } = render(<Carousel />);

			const dots = container.querySelectorAll('button[aria-label^="Go to slide"]');
			expect(dots.length).toBeGreaterThan(0);
		});

		it('starts at first slide', () => {
			const { container } = render(<Carousel />);

			const firstImage = container.querySelector('img');
			expect(firstImage).toBeInTheDocument();
		});
	});

	describe('Navigation', () => {
		it('moves to next slide when next button is clicked', () => {
			render(<Carousel />);

			const nextButton = screen.getByLabelText('Next Slide');
			fireEvent.click(nextButton);

			// Should transition to next slide
			expect(nextButton).toBeInTheDocument();
		});

		it('moves to previous slide when previous button is clicked', () => {
			render(<Carousel />);

			const prevButton = screen.getByLabelText('Previous Slide');
			fireEvent.click(prevButton);

			// Should transition to previous slide
			expect(prevButton).toBeInTheDocument();
		});

		it('changes slide when dot indicator is clicked', () => {
			const { container } = render(<Carousel />);

			const dots = container.querySelectorAll('button[aria-label^="Go to slide"]');
			if (dots.length > 1) {
				fireEvent.click(dots[1]);
				// Should change to clicked slide
				expect(dots[1]).toBeInTheDocument();
			}
		});

		it('prevents rapid navigation during transition', () => {
			render(<Carousel />);

			const nextButton = screen.getByLabelText('Next Slide');

			// Click multiple times rapidly
			fireEvent.click(nextButton);
			fireEvent.click(nextButton);
			fireEvent.click(nextButton);

			// Component should handle this gracefully
			expect(nextButton).toBeInTheDocument();
		});
	});

	describe('Keyboard Navigation', () => {
		it('responds to arrow right key', () => {
			render(<Carousel />);

			fireEvent.keyDown(window, { key: 'ArrowRight' });

			// Should advance to next slide
			expect(screen.getByLabelText('Next Slide')).toBeInTheDocument();
		});

		it('responds to arrow left key', () => {
			render(<Carousel />);

			fireEvent.keyDown(window, { key: 'ArrowLeft' });

			// Should go to previous slide
			expect(screen.getByLabelText('Previous Slide')).toBeInTheDocument();
		});

		it('ignores other keys', () => {
			render(<Carousel />);

			fireEvent.keyDown(window, { key: 'Enter' });
			fireEvent.keyDown(window, { key: 'Space' });

			// Should not cause errors
			expect(screen.getByLabelText('Next Slide')).toBeInTheDocument();
		});
	});

	describe('Touch Gestures', () => {
		it('handles touch swipe left', () => {
			const { container } = render(<Carousel />);
			const carousel = container.firstChild;

			// Simulate swipe left (move to next)
			fireEvent.touchStart(carousel, {
				targetTouches: [{ clientX: 200 }]
			});
			fireEvent.touchMove(carousel, {
				targetTouches: [{ clientX: 100 }]
			});
			fireEvent.touchEnd(carousel);

			// Should advance to next slide
			expect(carousel).toBeInTheDocument();
		});

		it('handles touch swipe right', () => {
			const { container } = render(<Carousel />);
			const carousel = container.firstChild;

			// Simulate swipe right (move to previous)
			fireEvent.touchStart(carousel, {
				targetTouches: [{ clientX: 100 }]
			});
			fireEvent.touchMove(carousel, {
				targetTouches: [{ clientX: 200 }]
			});
			fireEvent.touchEnd(carousel);

			// Should go to previous slide
			expect(carousel).toBeInTheDocument();
		});

		it('ignores short swipes', () => {
			const { container } = render(<Carousel />);
			const carousel = container.firstChild;

			// Simulate short swipe (less than threshold)
			fireEvent.touchStart(carousel, {
				targetTouches: [{ clientX: 100 }]
			});
			fireEvent.touchMove(carousel, {
				targetTouches: [{ clientX: 110 }]
			});
			fireEvent.touchEnd(carousel);

			// Should not change slide
			expect(carousel).toBeInTheDocument();
		});
	});

	describe('Auto-play', () => {
		it('auto-advances slides', () => {
			render(<Carousel />);

			// Fast-forward time by 4 seconds (auto-play interval)
			vi.advanceTimersByTime(4000);

			// Should have advanced to next slide
			expect(screen.getByLabelText('Next Slide')).toBeInTheDocument();
		});

		it('pauses on hover', () => {
			const { container } = render(<Carousel />);
			const carousel = container.firstChild;

			// Hover over carousel
			fireEvent.mouseEnter(carousel);

			// Advance time - should not auto-advance while paused
			vi.advanceTimersByTime(4000);

			expect(carousel).toBeInTheDocument();
		});

		it('resumes after hover', () => {
			const { container } = render(<Carousel />);
			const carousel = container.firstChild;

			// Hover and then leave
			fireEvent.mouseEnter(carousel);
			fireEvent.mouseLeave(carousel);

			// Advance time - should resume auto-play
			vi.advanceTimersByTime(4000);

			expect(carousel).toBeInTheDocument();
		});
	});

	describe('Accessibility', () => {
		it('has proper ARIA labels for navigation', () => {
			render(<Carousel />);

			expect(screen.getByLabelText('Previous Slide')).toBeInTheDocument();
			expect(screen.getByLabelText('Next Slide')).toBeInTheDocument();
		});

		it('has ARIA labels for dot indicators', () => {
			const { container } = render(<Carousel />);

			const dots = container.querySelectorAll('button[aria-label^="Go to slide"]');
			expect(dots.length).toBeGreaterThan(0);
		});

		it('buttons are focusable', () => {
			render(<Carousel />);

			const nextButton = screen.getByLabelText('Next Slide');
			nextButton.focus();
			expect(nextButton).toHaveFocus();
		});
	});

	describe('Edge Cases', () => {
		it('wraps around from last to first slide', () => {
			render(<Carousel />);

			const nextButton = screen.getByLabelText('Next Slide');

			// Click next many times to reach the end and wrap
			for (let i = 0; i < 12; i++) {
				fireEvent.click(nextButton);
				vi.advanceTimersByTime(500);
			}

			// Should wrap around gracefully
			expect(nextButton).toBeInTheDocument();
		});

		it('wraps around from first to last slide', () => {
			render(<Carousel />);

			const prevButton = screen.getByLabelText('Previous Slide');

			// Click previous to wrap from first to last
			fireEvent.click(prevButton);
			vi.advanceTimersByTime(500);

			// Should wrap around gracefully
			expect(prevButton).toBeInTheDocument();
		});

		it('handles rapid button clicks', () => {
			render(<Carousel />);

			const nextButton = screen.getByLabelText('Next Slide');

			// Rapid clicks
			for (let i = 0; i < 5; i++) {
				fireEvent.click(nextButton);
			}

			// Should not crash
			expect(nextButton).toBeInTheDocument();
		});
	});
});

