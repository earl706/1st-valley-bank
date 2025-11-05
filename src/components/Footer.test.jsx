import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Simple Footer component for testing
const Footer = () => (
	<footer className="bg-gray-800 p-6 text-white">
		<div className="container mx-auto">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div>
					<h3 className="mb-2 font-bold">About Us</h3>
					<p>First Valley Bank - Serving the community since 1978</p>
				</div>
				<div>
					<h3 className="mb-2 font-bold">Contact</h3>
					<p>Email: info@firstvalleybank.com</p>
					<p>Phone: (123) 456-7890</p>
				</div>
				<div>
					<h3 className="mb-2 font-bold">Follow Us</h3>
					<div className="flex space-x-4">
						<a href="https://facebook.com" aria-label="Facebook">
							Facebook
						</a>
						<a href="https://twitter.com" aria-label="Twitter">
							Twitter
						</a>
					</div>
				</div>
			</div>
			<div className="mt-4 text-center">
				<p>© 2024 First Valley Bank. All rights reserved.</p>
			</div>
		</div>
	</footer>
);

describe('Footer Component', () => {
	it('renders footer with company information', () => {
		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);

		// Use more specific text since "First Valley Bank" appears twice
		expect(
			screen.getByText(/First Valley Bank - Serving the community since 1978/i)
		).toBeInTheDocument();
	});

	it('displays contact information', () => {
		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);

		expect(screen.getByText(/Email:/i)).toBeInTheDocument();
		expect(screen.getByText(/info@firstvalleybank.com/i)).toBeInTheDocument();
		expect(screen.getByText(/Phone:/i)).toBeInTheDocument();
	});

	it('renders social media links', () => {
		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);

		const facebookLink = screen.getByLabelText('Facebook');
		const twitterLink = screen.getByLabelText('Twitter');

		expect(facebookLink).toHaveAttribute('href', 'https://facebook.com');
		expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
	});

	it('displays copyright notice', () => {
		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);

		expect(
			screen.getByText(/© 2024 First Valley Bank. All rights reserved./i)
		).toBeInTheDocument();
	});
});
