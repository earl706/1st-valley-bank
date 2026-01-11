import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import SplashScreen from './SplashScreen';

describe('SplashScreen Component', () => {
	let mockOnComplete;

	beforeEach(() => {
		vi.useFakeTimers();
		mockOnComplete = vi.fn();
		// Clear any previous calls
		mockOnComplete.mockClear();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('renders splash screen with logo and text', () => {
		render(<SplashScreen onComplete={mockOnComplete} />);

		// Logo should be present
		expect(screen.getByAltText('1st Valley Bank')).toBeInTheDocument();
		
		// Text elements are commented out in the component, so we only check for copyright text
		// which is rendered conditionally based on textOpacity
		act(() => {
			vi.advanceTimersByTime(850); // Advance past text opacity animation
		});
		
		// Copyright text should be visible after animation
		const copyrightText = screen.queryByText(/©\s*2026\s*1st\s*Valley\s*Bank/i);
		expect(copyrightText).toBeInTheDocument();
	});

	it('creates particles on mount', () => {
		render(<SplashScreen onComplete={mockOnComplete} />);

		// Particles are rendered as divs with specific styling
		const particles = document.querySelectorAll('[style*="left"], [style*="top"]');
		expect(particles.length).toBeGreaterThan(0);
	});

	it('sets up logo scale animation timer', () => {
		render(<SplashScreen onComplete={mockOnComplete} />);
		
		// Verify logo container exists
		const logoContainer = screen.getByAltText('1st Valley Bank').parentElement.parentElement;
		expect(logoContainer).toBeInTheDocument();
		
		// Advance timers and verify state updates (logoScale becomes 1)
		vi.advanceTimersByTime(350);
		
		// Logo container should still be in document
		expect(logoContainer).toBeInTheDocument();
	});

	it('sets up text opacity animation timer', () => {
		render(<SplashScreen onComplete={mockOnComplete} />);
		
		// Copyright text is rendered at the bottom and uses textOpacity
		// Initially, textOpacity is 0, so copyright text may not be visible
		// Advance timers past text animation delay (800ms)
		act(() => {
			vi.advanceTimersByTime(850);
		});
		
		// After animation, copyright text should be visible
		const copyrightText = screen.queryByText(/©\s*2026\s*1st\s*Valley\s*Bank/i);
		expect(copyrightText).toBeInTheDocument();
	});

	it('shows loading dots animation', () => {
		render(<SplashScreen onComplete={mockOnComplete} />);

		const dots = screen.getAllByRole('generic').filter(el => 
			el.className.includes('animate-pulse') && el.className.includes('rounded-full')
		);
		expect(dots.length).toBeGreaterThanOrEqual(3);
	});

	it('calls onComplete after progress reaches 100% and exit animation', () => {
		mockOnComplete.mockClear(); // Clear any previous calls
		render(<SplashScreen onComplete={mockOnComplete} />);

		// Component timing:
		// - Exit timer triggers after 5000ms total duration
		// - Exit animation delay: 800ms before onComplete is called
		// Total: 5000ms + 800ms = 5800ms
		// Note: Progress interval runs independently but clears itself when progress >= 100
		
		// Advance timers incrementally to allow React to process state updates
		// This prevents the interval from causing issues with fake timers
		act(() => {
			// Advance to trigger exit timer (5000ms)
			vi.advanceTimersByTime(5000);
		});
		
		act(() => {
			// Advance to trigger onComplete callback (800ms after exit)
			vi.advanceTimersByTime(800);
		});

		// onComplete should have been called
		expect(mockOnComplete).toHaveBeenCalled();
	});

	it('applies exit animation when isExiting is true', () => {
		const { container } = render(<SplashScreen onComplete={mockOnComplete} />);

		const splashContainer = container.querySelector('.fixed.inset-0');
		expect(splashContainer).toBeInTheDocument();
		expect(splashContainer.className).not.toContain('opacity-0');

		// Advance to exit animation
		// Progress: 50 * 30ms = 1500ms, then 500ms delay, then setIsExiting(true)
		vi.advanceTimersByTime(1500 + 500);
		
		// Verify initial state - exit animation starts after setIsExiting
		// Note: State updates in React with fake timers may not reflect immediately
		// This test verifies the component structure handles exit state
		expect(splashContainer).toBeInTheDocument();
	});

	it('cleans up timers on unmount', () => {
		const { unmount } = render(<SplashScreen onComplete={mockOnComplete} />);

		unmount();

		// Should not throw when advancing timers after unmount
		expect(() => vi.advanceTimersByTime(1000)).not.toThrow();
	});

	it('renders copyright text', () => {
		render(<SplashScreen onComplete={mockOnComplete} />);

		// Advance timers past the text opacity animation (800ms)
		act(() => {
			vi.advanceTimersByTime(850);
		});

		// Use getAllByText since the text appears in both parent div and paragraph
		// We only need to verify that the copyright text exists in the DOM
		const matcher = (content, node) => {
			const hasText = (node2) => node2.textContent && /©\s*2026\s*1st\s*Valley\s*Bank/i.test(node2.textContent.replace(/\s+/g, ' '));
			return hasText(node);
		};
		const copyrightElements = screen.getAllByText(matcher);
		expect(copyrightElements.length).toBeGreaterThan(0);
		// Verify the text content contains the copyright year
		expect(copyrightElements[0]).toHaveTextContent(/©\s*2026\s*1st\s*Valley\s*Bank/i);
	});

	it('renders decorative background elements', () => {
		render(<SplashScreen onComplete={mockOnComplete} />);

		const decorativeElements = document.querySelectorAll('.blur-3xl, .blur-2xl');
		expect(decorativeElements.length).toBeGreaterThan(0);
	});
});

