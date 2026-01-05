import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HeroSection from './HeroSection';

describe('HeroSection Component', () => {
	const defaultProps = {
		title: 'Welcome to First Valley Bank',
		subtitle: 'Your Trusted Financial Partner',
		description: 'Providing quality banking services since 1978',
		ctaLink: '/about'
	};

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	describe('Basic Rendering', () => {
		it('renders title correctly', () => {
			renderWithRouter(<HeroSection {...defaultProps} />);

			expect(screen.getByText('Welcome to First Valley Bank')).toBeInTheDocument();
		});

		it('renders subtitle correctly', () => {
			renderWithRouter(<HeroSection {...defaultProps} />);

			expect(screen.getByText('Your Trusted Financial Partner')).toBeInTheDocument();
		});

		it('renders description correctly', () => {
			renderWithRouter(<HeroSection {...defaultProps} />);

			expect(screen.getByText('Providing quality banking services since 1978')).toBeInTheDocument();
		});

		it('renders without subtitle', () => {
			const props = { ...defaultProps, subtitle: undefined };
			renderWithRouter(<HeroSection {...props} />);

			expect(screen.getByText('Welcome to First Valley Bank')).toBeInTheDocument();
			expect(screen.queryByText('Your Trusted Financial Partner')).not.toBeInTheDocument();
		});

		it('renders without description', () => {
			const props = { ...defaultProps, description: undefined };
			renderWithRouter(<HeroSection {...props} />);

			expect(screen.queryByText('Providing quality banking services since 1978')).not.toBeInTheDocument();
		});
	});

	describe('Features List', () => {
		it('renders features when provided', () => {
			const features = ['Feature 1', 'Feature 2', 'Feature 3'];
			renderWithRouter(<HeroSection {...defaultProps} features={features} />);

			features.forEach((feature) => {
				expect(screen.getByText(feature)).toBeInTheDocument();
			});
		});

		it('does not render features section when empty', () => {
			renderWithRouter(<HeroSection {...defaultProps} features={[]} />);

			// No features should be rendered
			expect(screen.queryByText('Feature 1')).not.toBeInTheDocument();
		});

		it('handles large number of features', () => {
			const features = Array.from({ length: 10 }, (_, i) => `Feature ${i + 1}`);
			renderWithRouter(<HeroSection {...defaultProps} features={features} />);

			features.forEach((feature) => {
				expect(screen.getByText(feature)).toBeInTheDocument();
			});
		});
	});

	describe('CTA Button', () => {
		it('renders CTA button with default text', () => {
			renderWithRouter(<HeroSection {...defaultProps} />);

			expect(screen.getByText('Learn More')).toBeInTheDocument();
		});

		it('renders CTA button with custom text', () => {
			renderWithRouter(<HeroSection {...defaultProps} ctaText="Get Started" />);

			expect(screen.getByText('Get Started')).toBeInTheDocument();
		});

		it('links to correct URL', () => {
			renderWithRouter(<HeroSection {...defaultProps} ctaLink="/contact" />);

			const link = screen.getByText('Learn More').closest('a');
			expect(link).toHaveAttribute('href', '/contact');
		});

		it('does not render CTA when showCta is false', () => {
			renderWithRouter(<HeroSection {...defaultProps} showCta={false} />);

			expect(screen.queryByText('Learn More')).not.toBeInTheDocument();
		});

		it('does not render CTA when ctaLink is not provided', () => {
			const props = { ...defaultProps };
			delete props.ctaLink;
			renderWithRouter(<HeroSection {...props} />);

			expect(screen.queryByText('Learn More')).not.toBeInTheDocument();
		});
	});

	describe('Styling and Customization', () => {
		it('applies custom background color', () => {
			const { container } = renderWithRouter(
				<HeroSection {...defaultProps} backgroundColor="from-blue-50 to-blue-100" />
			);

			const section = container.querySelector('section');
			expect(section).toHaveClass('from-blue-50', 'to-blue-100');
		});

		it('applies custom title color', () => {
			const { container } = renderWithRouter(
				<HeroSection {...defaultProps} titleColor="from-blue-500 to-blue-700" />
			);

			const titleSpan = container.querySelector('.text-transparent');
			expect(titleSpan).toHaveClass('from-blue-500', 'to-blue-700');
		});

		it('applies custom className', () => {
			const { container } = renderWithRouter(
				<HeroSection {...defaultProps} className="custom-class" />
			);

			const section = container.querySelector('section');
			expect(section).toHaveClass('custom-class');
		});

		it('shows background elements by default', () => {
			const { container } = renderWithRouter(<HeroSection {...defaultProps} />);

			const backgroundElements = container.querySelectorAll('.rounded-full.blur-3xl');
			expect(backgroundElements.length).toBeGreaterThan(0);
		});

		it('hides background elements when showBackground is false', () => {
			const { container } = renderWithRouter(<HeroSection {...defaultProps} showBackground={false} />);

			const backgroundElements = container.querySelectorAll('.rounded-full.blur-3xl');
			expect(backgroundElements.length).toBe(0);
		});
	});

	describe('Image Rendering', () => {
		it('renders image with alt text', () => {
			renderWithRouter(<HeroSection {...defaultProps} imageAlt="Hero Image" />);

			const image = screen.getByAltText('Hero Image');
			expect(image).toBeInTheDocument();
		});

		it('renders image with default empty alt text', () => {
			renderWithRouter(<HeroSection {...defaultProps} />);

			const image = screen.getByAltText('');
			expect(image).toBeInTheDocument();
		});
	});

	describe('Responsive Design', () => {
		it('applies responsive grid classes', () => {
			const { container } = renderWithRouter(<HeroSection {...defaultProps} />);

			const grid = container.querySelector('.grid');
			expect(grid).toHaveClass('lg:grid-cols-2');
		});

		it('applies responsive padding classes', () => {
			const { container } = renderWithRouter(<HeroSection {...defaultProps} />);

			const contentDiv = container.querySelector('.px-4');
			expect(contentDiv).toHaveClass('sm:px-6', 'lg:px-8');
		});

		it('applies responsive text size classes', () => {
			const { container } = renderWithRouter(<HeroSection {...defaultProps} />);

			const title = screen.getByText('Welcome to First Valley Bank');
			expect(title.closest('span')).toHaveClass('text-4xl', 'sm:text-5xl', 'lg:text-6xl', 'xl:text-7xl');
		});
	});

	describe('Edge Cases', () => {
		it('handles empty title', () => {
			renderWithRouter(<HeroSection {...defaultProps} title="" />);

			expect(screen.queryByText('Welcome to First Valley Bank')).not.toBeInTheDocument();
		});

		it('handles very long title', () => {
			const longTitle = 'This is a very long title that should still render correctly without breaking the layout';
			renderWithRouter(<HeroSection {...defaultProps} title={longTitle} />);

			expect(screen.getByText(longTitle)).toBeInTheDocument();
		});

		it('handles very long description', () => {
			const longDesc =
				'This is a very long description that contains a lot of text and should still render correctly without breaking the layout or causing any visual issues on the page.';
			renderWithRouter(<HeroSection {...defaultProps} description={longDesc} />);

			expect(screen.getByText(longDesc)).toBeInTheDocument();
		});

		it('handles special characters in text', () => {
			renderWithRouter(
				<HeroSection {...defaultProps} title="Welcome & Grow" subtitle="Your Partner" />
			);

			expect(screen.getByText('Welcome & Grow')).toBeInTheDocument();
		});
	});

	describe('Integration', () => {
		it('renders all elements together', () => {
			const features = ['Secure', 'Fast', 'Reliable'];
			renderWithRouter(
				<HeroSection
					title="Test Title"
					subtitle="Test Subtitle"
					description="Test Description"
					features={features}
					ctaText="Get Started"
					ctaLink="/signup"
				/>
			);

			expect(screen.getByText('Test Title')).toBeInTheDocument();
			expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
			expect(screen.getByText('Test Description')).toBeInTheDocument();
			expect(screen.getByText('Secure')).toBeInTheDocument();
			expect(screen.getByText('Fast')).toBeInTheDocument();
			expect(screen.getByText('Reliable')).toBeInTheDocument();
			expect(screen.getByText('Get Started')).toBeInTheDocument();
		});

		it('renders minimal configuration', () => {
			renderWithRouter(<HeroSection title="Simple Title" showCta={false} />);

			expect(screen.getByText('Simple Title')).toBeInTheDocument();
			expect(screen.queryByText('Learn More')).not.toBeInTheDocument();
		});
	});
});

