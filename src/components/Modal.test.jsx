import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Modal from './Modal';

describe('Modal Component', () => {
	beforeEach(() => {
		// Mock scrollTo
		window.scrollTo = vi.fn();
	});

	afterEach(() => {
		// Clean up body overflow style
		document.body.style.overflow = 'unset';
	});

	it('renders nothing when isOpen is false', () => {
		const { container } = render(
			<BrowserRouter>
				<Modal isOpen={false} onClose={() => {}} title="Test Modal" />
			</BrowserRouter>
		);

		expect(container.firstChild).toBeNull();
	});

	it('renders modal when isOpen is true', () => {
		render(
			<BrowserRouter>
				<Modal isOpen={true} onClose={() => {}} title="Test Modal" />
			</BrowserRouter>
		);

		expect(screen.getByText('Test Modal')).toBeInTheDocument();
	});

	it('displays modal title', () => {
		render(
			<BrowserRouter>
				<Modal isOpen={true} onClose={() => {}} title="Property Details" />
			</BrowserRouter>
		);

		expect(screen.getByText('Property Details')).toBeInTheDocument();
	});

	it('displays content text', () => {
		render(
			<BrowserRouter>
				<Modal 
					isOpen={true} 
					onClose={() => {}} 
					title="Test" 
					content="This is the modal content"
				/>
			</BrowserRouter>
		);

		expect(screen.getByText('This is the modal content')).toBeInTheDocument();
	});

	it('calls onClose when backdrop is clicked', () => {
		const onClose = vi.fn();
		
		render(
			<BrowserRouter>
				<Modal isOpen={true} onClose={onClose} title="Test" />
			</BrowserRouter>
		);

		const backdrop = document.querySelector('.cursor-pointer.bg-black\\/50');
		fireEvent.click(backdrop);

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('calls onClose when close button is clicked', () => {
		const onClose = vi.fn();
		
		render(
			<BrowserRouter>
				<Modal isOpen={true} onClose={onClose} title="Test" />
			</BrowserRouter>
		);

		const closeButton = screen.getByRole('button', { name: /close/i });
		fireEvent.click(closeButton);

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('calls onClose when Escape key is pressed', () => {
		const onClose = vi.fn();
		
		render(
			<BrowserRouter>
				<Modal isOpen={true} onClose={onClose} title="Test" />
			</BrowserRouter>
		);

		fireEvent.keyDown(document, { key: 'Escape' });

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('does not call onClose for other keys', () => {
		const onClose = vi.fn();
		
		render(
			<BrowserRouter>
				<Modal isOpen={true} onClose={onClose} title="Test" />
			</BrowserRouter>
		);

		fireEvent.keyDown(document, { key: 'Enter' });
		fireEvent.keyDown(document, { key: 'a' });

		expect(onClose).not.toHaveBeenCalled();
	});

	it('disables body scroll when open', () => {
		render(
			<BrowserRouter>
				<Modal isOpen={true} onClose={() => {}} title="Test" />
			</BrowserRouter>
		);

		expect(document.body.style.overflow).toBe('hidden');
	});

	it('displays single image', () => {
		render(
			<BrowserRouter>
				<Modal 
					isOpen={true} 
					onClose={() => {}} 
					title="Test" 
					image="/test-image.jpg"
				/>
			</BrowserRouter>
		);

		const image = screen.getByAltText('Test - Image 1');
		expect(image).toHaveAttribute('src', '/test-image.jpg');
	});

	it('displays price badge when price is provided', () => {
		render(
			<BrowserRouter>
				<Modal 
					isOpen={true} 
					onClose={() => {}} 
					title="Test" 
					price={250000}
				/>
			</BrowserRouter>
		);

		expect(screen.getByText('₱250,000')).toBeInTheDocument();
	});

	it('displays location information', () => {
		render(
			<BrowserRouter>
				<Modal 
					isOpen={true} 
					onClose={() => {}} 
					title="Test" 
					location="Manila, Philippines"
				/>
			</BrowserRouter>
		);

		expect(screen.getByText('Manila, Philippines')).toBeInTheDocument();
	});

	it('displays year information', () => {
		render(
			<BrowserRouter>
				<Modal 
					isOpen={true} 
					onClose={() => {}} 
					title="Test" 
					year={2020}
				/>
			</BrowserRouter>
		);

		expect(screen.getByText('2020')).toBeInTheDocument();
	});

	it('displays plate number', () => {
		render(
			<BrowserRouter>
				<Modal 
					isOpen={true} 
					onClose={() => {}} 
					title="Test" 
					plateNumber="ABC 1234"
				/>
			</BrowserRouter>
		);

		expect(screen.getByText('ABC 1234')).toBeInTheDocument();
	});

	it('displays additional details', () => {
		const details = [
			{ label: 'Make', value: 'Toyota' },
			{ label: 'Model', value: 'Corolla' }
		];

		render(
			<BrowserRouter>
				<Modal 
					isOpen={true} 
					onClose={() => {}} 
					title="Test" 
					details={details}
				/>
			</BrowserRouter>
		);

		expect(screen.getByText('Make:')).toBeInTheDocument();
		expect(screen.getByText('Toyota')).toBeInTheDocument();
		expect(screen.getByText('Model:')).toBeInTheDocument();
		expect(screen.getByText('Corolla')).toBeInTheDocument();
	});

	it('shows inquire button by default', () => {
		render(
			<BrowserRouter>
				<Modal isOpen={true} onClose={() => {}} title="Test" />
			</BrowserRouter>
		);

		expect(screen.getByText('Inquire Now')).toBeInTheDocument();
	});

	it('hides inquire button when showInquireButton is false', () => {
		render(
			<BrowserRouter>
				<Modal 
					isOpen={true} 
					onClose={() => {}} 
					title="Test" 
					showInquireButton={false}
				/>
			</BrowserRouter>
		);

		expect(screen.queryByText('Inquire Now')).not.toBeInTheDocument();
	});

	it('uses custom inquire button text', () => {
		render(
			<BrowserRouter>
				<Modal 
					isOpen={true} 
					onClose={() => {}} 
					title="Test" 
					inquireButtonText="Contact Us"
				/>
			</BrowserRouter>
		);

		expect(screen.getByText('Contact Us')).toBeInTheDocument();
	});

	describe('Image gallery', () => {
		const additionalImages = ['/img1.jpg', '/img2.jpg', '/img3.jpg'];

		it('shows navigation arrows when multiple images', () => {
			render(
				<BrowserRouter>
					<Modal 
						isOpen={true} 
						onClose={() => {}} 
						title="Test"
						image="/main.jpg"
						additionalImages={additionalImages}
					/>
				</BrowserRouter>
			);

			// Image counter should show
			expect(screen.getByText('1 / 4')).toBeInTheDocument();
		});

		it('shows thumbnails for multiple images', () => {
			render(
				<BrowserRouter>
					<Modal 
						isOpen={true} 
						onClose={() => {}} 
						title="Test"
						image="/main.jpg"
						additionalImages={additionalImages}
					/>
				</BrowserRouter>
			);

			const thumbnails = screen.getAllByAltText(/Thumbnail \d+/);
			expect(thumbnails).toHaveLength(4); // main image + 3 additional
		});

		it('does not show navigation arrows for single image', () => {
			render(
				<BrowserRouter>
					<Modal 
						isOpen={true} 
						onClose={() => {}} 
						title="Test"
						image="/main.jpg"
					/>
				</BrowserRouter>
			);

			// Should not show image counter
			expect(screen.queryByText(/\d+ \/ \d+/)).not.toBeInTheDocument();
		});
	});

	it('renders inquire button with correct link', () => {
		render(
			<BrowserRouter>
				<Modal 
					isOpen={true} 
					onClose={() => {}} 
					title="Test"
					inquireButtonLink="/custom-contact"
				/>
			</BrowserRouter>
		);

		const inquireLink = screen.getByText('Inquire Now').closest('a');
		expect(inquireLink).toHaveAttribute('href', '/custom-contact');
	});
});

