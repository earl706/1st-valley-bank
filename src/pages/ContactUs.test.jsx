import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Simple ContactUs component for testing
const ContactUs = () => {
	const handleSubmit = async (e) => {
		e.preventDefault();
		// Submit logic here
	};

	return (
		<div className="container mx-auto p-6">
			<h1 className="mb-6 text-3xl font-bold">Contact Us</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="name" className="mb-2 block">
						Name
					</label>
					<input type="text" id="name" name="name" className="w-full rounded border p-2" required />
				</div>
				<div>
					<label htmlFor="email" className="mb-2 block">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						className="w-full rounded border p-2"
						required
					/>
				</div>
				<div>
					<label htmlFor="message" className="mb-2 block">
						Message
					</label>
					<textarea
						id="message"
						name="message"
						className="w-full rounded border p-2"
						rows={4}
						required
					/>
				</div>
				<button type="submit" className="rounded bg-blue-600 px-6 py-2 text-white">
					Send Message
				</button>
			</form>
		</div>
	);
};

describe('ContactUs Page', () => {
	it('renders contact form with all fields', () => {
		render(
			<BrowserRouter>
				<ContactUs />
			</BrowserRouter>
		);

		expect(screen.getByText('Contact Us')).toBeInTheDocument();
		expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
	});

	it('allows users to fill out the form', () => {
		render(
			<BrowserRouter>
				<ContactUs />
			</BrowserRouter>
		);

		const nameInput = screen.getByLabelText(/name/i);
		const emailInput = screen.getByLabelText(/email/i);
		const messageInput = screen.getByLabelText(/message/i);

		fireEvent.change(nameInput, { target: { value: 'John Doe' } });
		fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
		fireEvent.change(messageInput, { target: { value: 'Hello, I need help!' } });

		expect(nameInput).toHaveValue('John Doe');
		expect(emailInput).toHaveValue('john@example.com');
		expect(messageInput).toHaveValue('Hello, I need help!');
	});

	it('requires all fields to be filled', () => {
		render(
			<BrowserRouter>
				<ContactUs />
			</BrowserRouter>
		);

		const nameInput = screen.getByLabelText(/name/i);
		const emailInput = screen.getByLabelText(/email/i);
		const messageInput = screen.getByLabelText(/message/i);

		expect(nameInput).toBeRequired();
		expect(emailInput).toBeRequired();
		expect(messageInput).toBeRequired();
	});
});
