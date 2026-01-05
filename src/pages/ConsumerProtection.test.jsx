import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ConsumerProtection from './ConsumerProtection';

// Mock ConsumerProtectionPrivacyPolicy since ConsumerProtection is a wrapper
vi.mock('./ConsumerProtectionPrivacyPolicy', () => ({
	default: () => <div data-testid="privacy-policy-page">Privacy Policy Page</div>
}));

describe('ConsumerProtection Page', () => {
	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders ConsumerProtectionPrivacyPolicy component', () => {
		renderWithRouter(<ConsumerProtection />);

		expect(screen.getByTestId('privacy-policy-page')).toBeInTheDocument();
	});
});

