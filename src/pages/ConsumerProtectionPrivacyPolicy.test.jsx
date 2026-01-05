import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ConsumerProtectionPrivacyPolicy from './ConsumerProtectionPrivacyPolicy';
import consumerProtectionPrivacyPolicyPageService from '../services/consumerProtectionPrivacyPolicyPageService';

// Mock services and components
vi.mock('../services/consumerProtectionPrivacyPolicyPageService');
vi.mock('../components/HeroSection', () => ({
	default: ({ title }) => (
		<div data-testid="hero-section">
			<h1>{title}</h1>
		</div>
	)
}));
vi.mock('../components/PageHeroSection', () => ({
	default: () => <div data-testid="page-hero-section">Hero</div>
}));
vi.mock('../components/Header', () => ({
	LightHeader: ({ title }) => (
		<div data-testid="light-header">
			<h2>{title}</h2>
		</div>
	)
}));
vi.mock('../components/Card', () => ({
	LightCard: ({ children }) => <div data-testid="light-card">{children}</div>
}));
vi.mock('../components/Buttons', () => ({
	LightSecondaryButton: ({ children }) => <button>{children}</button>,
	LightPrimaryButton: ({ children }) => <button>{children}</button>
}));
vi.mock('../components/PageSkeleton', () => ({
	DetailPageSkeleton: () => <div data-testid="skeleton">Loading...</div>
}));

describe('ConsumerProtectionPrivacyPolicy Page', () => {
	const mockPageData = {
		success: true,
		data: {
			title: 'Privacy Policy',
			subtitle: 'Your privacy matters',
			content: 'Test content'
		}
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders loading skeleton initially', () => {
		consumerProtectionPrivacyPolicyPageService.getPrivacyPolicyPage.mockImplementation(() => new Promise(() => {}));
		renderWithRouter(<ConsumerProtectionPrivacyPolicy />);

		expect(screen.getByTestId('skeleton')).toBeInTheDocument();
	});

	it('renders page content after data loads', async () => {
		consumerProtectionPrivacyPolicyPageService.getPrivacyPolicyPage.mockResolvedValue(mockPageData);
		renderWithRouter(<ConsumerProtectionPrivacyPolicy />);

		await waitFor(() => {
			// Component uses PageHeroSection, not HeroSection
			expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
		}, { timeout: 2000 });
	});

	it('handles API errors gracefully', async () => {
		consumerProtectionPrivacyPolicyPageService.getPrivacyPolicyPage.mockRejectedValue(new Error('API Error'));
		renderWithRouter(<ConsumerProtectionPrivacyPolicy />);

		await waitFor(() => {
			// Should still render structure
			expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
		}, { timeout: 2000 });
	});
});

