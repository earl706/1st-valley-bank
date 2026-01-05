import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PageHeroSection from './PageHeroSection';
import { usePageHeroSections } from '../hooks/usePageHeroSections';

// Mock the custom hook
vi.mock('../hooks/usePageHeroSections');

// Mock child components
vi.mock('./CarouselSection', () => ({
	default: ({ slides, id }) => (
		<div data-testid="carousel-section">
			<div data-testid="carousel-id">{id}</div>
			<div data-testid="carousel-slides">{slides.length} slides</div>
		</div>
	)
}));

vi.mock('./HeroSection', () => ({
	default: ({ title, subtitle, description }) => (
		<div data-testid="hero-section">
			<h1>{title}</h1>
			{subtitle && <h2>{subtitle}</h2>}
			{description && <p>{description}</p>}
		</div>
	)
}));

describe('PageHeroSection Component', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	describe('Loading State', () => {
		it('shows loading spinner when loading', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [],
				loading: true,
				error: null
			});

			renderWithRouter(<PageHeroSection />);

			expect(screen.getByText('Loading...')).toBeInTheDocument();
		});

		it('shows spinner with correct styling', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [],
				loading: true,
				error: null
			});

			const { container } = renderWithRouter(<PageHeroSection />);

			const spinner = container.querySelector('.animate-spin');
			expect(spinner).toBeInTheDocument();
		});
	});

	describe('Error State', () => {
		it('returns null when there is an error', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [],
				loading: false,
				error: 'Failed to load'
			});

			const { container } = renderWithRouter(<PageHeroSection />);

			expect(container.firstChild).toBeNull();
		});

		it('logs warning to console on error', () => {
			const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
			
			usePageHeroSections.mockReturnValue({
				heroSections: [],
				loading: false,
				error: 'Test error message'
			});

			renderWithRouter(<PageHeroSection />);

			expect(consoleWarnSpy).toHaveBeenCalledWith('Hero sections error:', 'Test error message');
			
			consoleWarnSpy.mockRestore();
		});
	});

	describe('Empty State', () => {
		it('returns null when no hero sections', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [],
				loading: false,
				error: null
			});

			const { container } = renderWithRouter(<PageHeroSection />);

			expect(container.firstChild).toBeNull();
		});

		it('returns null when heroSections is null', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: null,
				loading: false,
				error: null
			});

			const { container } = renderWithRouter(<PageHeroSection />);

			expect(container.firstChild).toBeNull();
		});
	});

	describe('Single Hero Section', () => {
		it('renders HeroSection component for single section', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [
					{
						title: 'Welcome',
						subtitle: 'To Our Bank',
						description: 'Banking made easy',
						image: '/hero.jpg',
						route: '/about'
					}
				],
				loading: false,
				error: null
			});

			renderWithRouter(<PageHeroSection />);

			expect(screen.getByTestId('hero-section')).toBeInTheDocument();
			expect(screen.getByText('Welcome')).toBeInTheDocument();
			expect(screen.getByText('To Our Bank')).toBeInTheDocument();
			expect(screen.getByText('Banking made easy')).toBeInTheDocument();
		});

		it('passes correct props to HeroSection', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [
					{
						title: 'Test Title',
						subtitle: 'Test Subtitle',
						description: 'Test Description',
						image: '/test.jpg',
						imageAlt: 'Test Image',
						button_text: 'Get Started',
						route: '/start'
					}
				],
				loading: false,
				error: null
			});

			renderWithRouter(<PageHeroSection />);

			expect(screen.getByTestId('hero-section')).toBeInTheDocument();
		});

		it('handles section without subtitle', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [
					{
						title: 'Just Title',
						image: '/hero.jpg'
					}
				],
				loading: false,
				error: null
			});

			renderWithRouter(<PageHeroSection />);

			expect(screen.getByText('Just Title')).toBeInTheDocument();
			expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
		});
	});

	describe('Multiple Hero Sections', () => {
		it('renders CarouselSection for multiple sections', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [
					{ title: 'Slide 1', image: '/img1.jpg', route: '/page1' },
					{ title: 'Slide 2', image: '/img2.jpg', route: '/page2' },
					{ title: 'Slide 3', image: '/img3.jpg', route: '/page3' }
				],
				loading: false,
				error: null
			});

			renderWithRouter(<PageHeroSection />);

			expect(screen.getByTestId('carousel-section')).toBeInTheDocument();
			expect(screen.getByTestId('carousel-slides')).toHaveTextContent('3 slides');
		});

		it('generates correct carousel ID with pageSlug', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [
					{ title: 'Slide 1', image: '/img1.jpg' },
					{ title: 'Slide 2', image: '/img2.jpg' }
				],
				loading: false,
				error: null
			});

			renderWithRouter(<PageHeroSection pageSlug="about-us" />);

			expect(screen.getByTestId('carousel-id')).toHaveTextContent('page-hero-carousel-about-us');
		});

		it('uses default carousel ID when no pageSlug', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [
					{ title: 'Slide 1', image: '/img1.jpg' },
					{ title: 'Slide 2', image: '/img2.jpg' }
				],
				loading: false,
				error: null
			});

			renderWithRouter(<PageHeroSection />);

			expect(screen.getByTestId('carousel-id')).toHaveTextContent('page-hero-carousel-default');
		});
	});

	describe('Props Passing', () => {
		it('passes pageSlug to usePageHeroSections hook', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [{ title: 'Test', image: '/test.jpg' }],
				loading: false,
				error: null
			});

			renderWithRouter(<PageHeroSection pageSlug="custom-page" />);

			expect(usePageHeroSections).toHaveBeenCalledWith('custom-page');
		});

		it('passes custom props to CarouselSection', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [
					{ title: 'Slide 1', image: '/img1.jpg' },
					{ title: 'Slide 2', image: '/img2.jpg' }
				],
				loading: false,
				error: null
			});

			renderWithRouter(
				<PageHeroSection
					autoPlay={false}
					autoPlayInterval={3000}
					brandColor="#FF0000"
				/>
			);

			expect(screen.getByTestId('carousel-section')).toBeInTheDocument();
		});

		it('handles custom backgroundColor prop', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [{ title: 'Test', image: '/test.jpg' }],
				loading: false,
				error: null
			});

			renderWithRouter(
				<PageHeroSection backgroundColor="from-blue-50 to-blue-100" />
			);

			expect(screen.getByTestId('hero-section')).toBeInTheDocument();
		});

		it('handles custom titleColor prop', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [{ title: 'Test', image: '/test.jpg' }],
				loading: false,
				error: null
			});

			renderWithRouter(
				<PageHeroSection titleColor="from-red-500 to-red-700" />
			);

			expect(screen.getByTestId('hero-section')).toBeInTheDocument();
		});
	});

	describe('Integration with usePageHeroSections', () => {
		it('uses hook without pageSlug', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [],
				loading: false,
				error: null
			});

			renderWithRouter(<PageHeroSection />);

			expect(usePageHeroSections).toHaveBeenCalledWith(null);
		});

		it('uses hook with pageSlug', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [],
				loading: false,
				error: null
			});

			renderWithRouter(<PageHeroSection pageSlug="loans" />);

			expect(usePageHeroSections).toHaveBeenCalledWith('loans');
		});

		it('waits for loading to complete', async () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [],
				loading: true,
				error: null
			});

			const { rerender } = renderWithRouter(<PageHeroSection />);

			expect(screen.getByText('Loading...')).toBeInTheDocument();

			usePageHeroSections.mockReturnValue({
				heroSections: [{ title: 'Loaded', image: '/img.jpg' }],
				loading: false,
				error: null
			});

			rerender(
				<BrowserRouter>
					<PageHeroSection />
				</BrowserRouter>
			);

			await waitFor(() => {
				expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
			});

			expect(screen.getByTestId('hero-section')).toBeInTheDocument();
		});
	});

	describe('Edge Cases', () => {
		it('handles features array in single section', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [
					{
						title: 'Features Test',
						features: ['Feature 1', 'Feature 2', 'Feature 3'],
						image: '/test.jpg'
					}
				],
				loading: false,
				error: null
			});

			renderWithRouter(<PageHeroSection />);

			expect(screen.getByTestId('hero-section')).toBeInTheDocument();
		});

		it('handles missing image alt text', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [
					{
						title: 'No Alt Text',
						image: '/test.jpg'
					}
				],
				loading: false,
				error: null
			});

			renderWithRouter(<PageHeroSection />);

			expect(screen.getByTestId('hero-section')).toBeInTheDocument();
		});

		it('handles button_route vs route fallback', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [
					{
						title: 'Test',
						button_route: '/button-route',
						image: '/test.jpg'
					}
				],
				loading: false,
				error: null
			});

			renderWithRouter(<PageHeroSection />);

			expect(screen.getByTestId('hero-section')).toBeInTheDocument();
		});

		it('handles buttonText vs button_text fallback', () => {
			usePageHeroSections.mockReturnValue({
				heroSections: [
					{
						title: 'Test',
						buttonText: 'Custom Button',
						image: '/test.jpg'
					}
				],
				loading: false,
				error: null
			});

			renderWithRouter(<PageHeroSection />);

			expect(screen.getByTestId('hero-section')).toBeInTheDocument();
		});
	});
});

