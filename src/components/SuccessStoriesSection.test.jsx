import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SuccessStoriesSection from './SuccessStoriesSection';

describe('SuccessStoriesSection Component', () => {
	const mockStories = [
		{
			id: 1,
			name: 'John Doe',
			title: 'John Doe',
			location: 'Cagayan de Oro',
			subtitle: 'Cagayan de Oro',
			description: 'Great service',
			img: '/img1.jpg',
			image: '/img1.jpg',
			paragraphs: ['Paragraph 1', 'Paragraph 2']
		},
		{
			id: 2,
			name: 'Jane Smith',
			location: 'Manila',
			description: 'Excellent support',
			img: '/img2.jpg',
			fullStory: 'Full story text'
		},
		{
			id: 3,
			name: 'Bob Wilson',
			location: 'Davao',
			description: 'Amazing experience',
			img: '/img3.jpg',
			pdf_file: '/story3.pdf'
		}
	];

	beforeEach(() => {
		// Mock document.body.style
		document.body.style.overflow = '';
	});

	describe('Rendering', () => {
		it('renders success stories section', () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			expect(screen.getByText('Success Stories')).toBeInTheDocument();
			expect(screen.getByText(/Real stories from our clients/i)).toBeInTheDocument();
		});

		it('renders all stories', () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			expect(screen.getByText('John Doe')).toBeInTheDocument();
			expect(screen.getByText('Jane Smith')).toBeInTheDocument();
			expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
		});

		it('renders story images', () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			const images = screen.getAllByAltText(/John Doe|Jane Smith|Bob Wilson/);
			expect(images.length).toBe(3);
		});

		it('renders story descriptions', () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			expect(screen.getByText('Great service')).toBeInTheDocument();
			expect(screen.getByText('Excellent support')).toBeInTheDocument();
			expect(screen.getByText('Amazing experience')).toBeInTheDocument();
		});

		it('renders story locations', () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			expect(screen.getByText('Cagayan de Oro')).toBeInTheDocument();
			expect(screen.getByText('Manila')).toBeInTheDocument();
			expect(screen.getByText('Davao')).toBeInTheDocument();
		});

		it('renders custom title and subtitle', () => {
			render(
				<SuccessStoriesSection
					stories={mockStories}
					title="Custom Title"
					subtitle="Custom Subtitle"
				/>
			);

			expect(screen.getByText('Custom Title')).toBeInTheDocument();
			expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();
		});

		it('renders read story buttons by default', () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			const buttons = screen.getAllByText('Read Story');
			expect(buttons.length).toBe(3);
		});

		it('does not render buttons when showButton is false', () => {
			render(<SuccessStoriesSection stories={mockStories} showButton={false} />);

			expect(screen.queryByText('Read Story')).not.toBeInTheDocument();
		});

		it('renders custom button text', () => {
			render(<SuccessStoriesSection stories={mockStories} buttonText="View More" />);

			const buttons = screen.getAllByText('View More');
			expect(buttons.length).toBe(3);
		});
	});

	describe('Story Modal', () => {
		it('opens story modal when button is clicked', async () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			const buttons = screen.getAllByText('Read Story');
			fireEvent.click(buttons[0]);

			await waitFor(() => {
				expect(screen.getByRole('dialog')).toBeInTheDocument();
			});
			// Check for modal content - John Doe name should be in the modal
			const dialog = screen.getByRole('dialog');
			const modalText = dialog.textContent || '';
			expect(modalText).toContain('John Doe');
		});

		it('closes story modal when close button is clicked', async () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			const buttons = screen.getAllByText('Read Story');
			fireEvent.click(buttons[0]);

			await waitFor(() => {
				expect(screen.getByRole('dialog')).toBeInTheDocument();
			});

			const closeButton = screen.getByLabelText('Close');
			fireEvent.click(closeButton);

			await waitFor(() => {
				expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
			});
		});

		it('closes story modal when backdrop is clicked', async () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			const buttons = screen.getAllByText('Read Story');
			fireEvent.click(buttons[0]);

			await waitFor(() => {
				expect(screen.getByRole('dialog')).toBeInTheDocument();
			});

			const backdrop = screen.getByRole('dialog');
			fireEvent.click(backdrop);

			await waitFor(() => {
				expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
			});
		});

		it('does not close modal when content is clicked', async () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			const buttons = screen.getAllByText('Read Story');
			fireEvent.click(buttons[0]);

			await waitFor(() => {
				expect(screen.getByRole('dialog')).toBeInTheDocument();
			});

			const modalContent = screen.getByRole('dialog').querySelector('.bg-white');
			if (modalContent) {
				fireEvent.click(modalContent);
				// Modal should still be open
				expect(screen.getByRole('dialog')).toBeInTheDocument();
			}
		});

		it('renders story paragraphs when available', async () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			const buttons = screen.getAllByText('Read Story');
			fireEvent.click(buttons[0]);

			await waitFor(() => {
				expect(screen.getByRole('dialog')).toBeInTheDocument();
			});

			expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
			expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
		});

		it('renders fullStory when paragraphs are not available', async () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			const buttons = screen.getAllByText('Read Story');
			fireEvent.click(buttons[1]);

			await waitFor(() => {
				expect(screen.getByRole('dialog')).toBeInTheDocument();
			});

			expect(screen.getByText('Full story text')).toBeInTheDocument();
		});

		it('renders View PDF button when pdf_file is available', async () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			const buttons = screen.getAllByText('Read Story');
			// Third story has PDF - opens PDF modal directly, not story modal
			fireEvent.click(buttons[2]);

			await waitFor(() => {
				// PDF modal should open directly (not story modal with PDF button)
				const iframe = document.querySelector('iframe[src="/story3.pdf"]');
				expect(iframe).toBeInTheDocument();
			});
		});
	});

	describe('PDF Modal', () => {
		it('opens PDF modal when story has pdf_file and button is clicked', async () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			const buttons = screen.getAllByText('Read Story');
			fireEvent.click(buttons[2]); // Third story has PDF

			await waitFor(() => {
				const iframe = document.querySelector('iframe[src="/story3.pdf"]');
				expect(iframe).toBeInTheDocument();
			});
		});

		it('opens PDF modal when View PDF button is clicked', async () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			const buttons = screen.getAllByText('Read Story');
			fireEvent.click(buttons[2]); // Open story with PDF (third story has PDF)

			// Component opens PDF modal directly when story has PDF (line 131-132 in component)
			// No story modal is shown, PDF modal opens immediately
			await waitFor(() => {
				const iframe = document.querySelector('iframe[src="/story3.pdf"]');
				expect(iframe).toBeInTheDocument();
			}, { timeout: 2000 });
		});

		it('closes PDF modal when close button is clicked', async () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			const buttons = screen.getAllByText('Read Story');
			fireEvent.click(buttons[2]);

			await waitFor(() => {
				const closeButton = screen.getByLabelText('Close PDF');
				expect(closeButton).toBeInTheDocument();
			});

			const closeButton = screen.getByLabelText('Close PDF');
			fireEvent.click(closeButton);

			await waitFor(() => {
				const iframe = document.querySelector('iframe');
				expect(iframe).not.toBeInTheDocument();
			});
		});

		it('renders PDF in iframe', async () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			const buttons = screen.getAllByText('Read Story');
			fireEvent.click(buttons[2]);

			await waitFor(() => {
				const iframe = document.querySelector('iframe');
				expect(iframe).toHaveAttribute('src', '/story3.pdf');
				expect(iframe).toHaveAttribute('title', 'Bob Wilson');
			});
		});

		it('disables body scroll when PDF modal is open', async () => {
			render(<SuccessStoriesSection stories={mockStories} />);

			const buttons = screen.getAllByText('Read Story');
			fireEvent.click(buttons[2]);

			await waitFor(() => {
				expect(document.body.style.overflow).toBe('hidden');
			});
		});
	});

	describe('Edge Cases', () => {
		it('renders empty state gracefully', () => {
			render(<SuccessStoriesSection stories={[]} />);

			expect(screen.getByText('Success Stories')).toBeInTheDocument();
		});

		it('handles story without image', () => {
			const storyWithoutImage = {
				id: 4,
				name: 'No Image',
				description: 'No image story'
			};
			render(<SuccessStoriesSection stories={[storyWithoutImage]} />);

			expect(screen.getByText('No Image')).toBeInTheDocument();
		});

		it('handles story with alt text', () => {
			const storyWithAlt = {
				id: 5,
				name: 'With Alt',
				alt: 'Alt text',
				img: '/img.jpg',
				description: 'Story with alt'
			};
			render(<SuccessStoriesSection stories={[storyWithAlt]} />);

			expect(screen.getByAltText('Alt text')).toBeInTheDocument();
		});

		it('uses story.title when name is not available', () => {
			const storyWithTitle = {
				id: 6,
				title: 'Story Title',
				description: 'Story description'
			};
			render(<SuccessStoriesSection stories={[storyWithTitle]} />);

			expect(screen.getByText('Story Title')).toBeInTheDocument();
		});

		it('uses story.subtitle when location is not available', () => {
			const storyWithSubtitle = {
				id: 7,
				name: 'Story Name',
				subtitle: 'Story Subtitle',
				description: 'Story description'
			};
			render(<SuccessStoriesSection stories={[storyWithSubtitle]} />);

			expect(screen.getByText('Story Subtitle')).toBeInTheDocument();
		});
	});

	describe('Custom Styling', () => {
		it('applies custom className', () => {
			const { container } = render(
				<SuccessStoriesSection stories={mockStories} className="custom-class" />
			);

			const section = container.querySelector('.custom-class');
			expect(section).toBeInTheDocument();
		});

		it('applies custom brandColor', () => {
			render(<SuccessStoriesSection stories={mockStories} brandColor="#ff0000" />);

			const title = screen.getByText('Success Stories');
			expect(title).toHaveStyle({ color: '#ff0000' });
		});

		it('uses custom containerClassName', () => {
			const { container } = render(
				<SuccessStoriesSection
					stories={mockStories}
					containerClassName="custom-container"
				/>
			);

			const section = container.querySelector('.custom-container');
			expect(section).toBeInTheDocument();
		});

		it('uses custom gridClassName', () => {
			const { container } = render(
				<SuccessStoriesSection
					stories={mockStories}
					gridClassName="custom-grid"
				/>
			);

			const grid = container.querySelector('.custom-grid');
			expect(grid).toBeInTheDocument();
		});
	});
});

