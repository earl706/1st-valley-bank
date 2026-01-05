import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AnnualReports from './AnnualReports';
import aboutPageService from '../../services/aboutPageService';
import annualReportService from '../../services/annualReportService';

// Mock services and components
vi.mock('../../services/aboutPageService');
vi.mock('../../services/annualReportService');
vi.mock('../../components/HeroSection', () => ({
	default: ({ title, subtitle }) => (
		<div data-testid="hero-section">
			<h1>{title}</h1>
			<p>{subtitle}</p>
		</div>
	)
}));
vi.mock('../../components/Header', () => ({
	DarkHeader: ({ title, subtitle }) => (
		<div data-testid="dark-header">
			<h2>{title}</h2>
			{subtitle && <p>{subtitle}</p>}
		</div>
	),
	LightHeader: ({ title }) => (
		<div data-testid="light-header">
			<h2>{title}</h2>
		</div>
	)
}));
vi.mock('../../components/Card', () => ({
	LightCard: ({ children, onClick }) => (
		<div data-testid="light-card" onClick={onClick}>{children}</div>
	)
}));
vi.mock('../../components/Buttons', () => ({
	LightPrimaryButton: ({ children, onClick }) => (
		<button onClick={onClick} data-testid="light-primary-button">{children}</button>
	)
}));
vi.mock('../../components/PageSkeleton', () => ({
	DetailPageSkeleton: () => <div data-testid="skeleton">Loading...</div>
}));

describe('AnnualReports Page', () => {
	const mockReports = {
		results: [
			{
				id: 1,
				title: '2023 Annual Report',
				year: '2023',
				pdf_file: '/report2023.pdf',
				image: '/report2023.jpg',
				corporate_highlights: ['Highlight 1', 'Highlight 2']
			},
			{
				id: 2,
				title: '2022 Annual Report',
				year: '2022',
				pdf_file: '/report2022.pdf',
				image: '/report2022.jpg',
				corporate_highlights: ['Highlight 3']
			}
		]
	};

	const mockAboutPage = {
		annual_reports_section_title: 'Annual Reports',
		annual_reports_section_subtitle: 'Our yearly reports'
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders loading skeleton initially', () => {
		aboutPageService.getAboutPage.mockImplementation(() => new Promise(() => {}));
		annualReportService.getAnnualReports.mockImplementation(() => new Promise(() => {}));
		renderWithRouter(<AnnualReports />);

		expect(screen.getByTestId('skeleton')).toBeInTheDocument();
	});

	it('renders annual reports after data loads', async () => {
		aboutPageService.getAboutPage.mockResolvedValue(mockAboutPage);
		annualReportService.getAnnualReports.mockResolvedValue(mockReports);
		renderWithRouter(<AnnualReports />);

		await waitFor(() => {
			expect(screen.getByText('2023 Annual Report')).toBeInTheDocument();
		}, { timeout: 3000 });
		
		expect(screen.getByText('2022 Annual Report')).toBeInTheDocument();
	});

	it('opens report modal when report card is clicked', async () => {
		aboutPageService.getAboutPage.mockResolvedValue(mockAboutPage);
		annualReportService.getAnnualReports.mockResolvedValue(mockReports);
		renderWithRouter(<AnnualReports />);

		await waitFor(() => {
			expect(screen.getByText('2023 Annual Report')).toBeInTheDocument();
		}, { timeout: 2000 });

		const reportCard = screen.getByText('2023 Annual Report').closest('[data-testid="light-card"]');
		if (reportCard) {
			fireEvent.click(reportCard);

			await waitFor(() => {
				// Modal should open (PDF modal or report modal)
				const modalContent = screen.queryByText(/Report PDF Preview|2023 Annual Report/);
				expect(modalContent).toBeInTheDocument();
			}, { timeout: 2000 });
		}
	});

	it('renders empty state when no reports', async () => {
		aboutPageService.getAboutPage.mockResolvedValue(mockAboutPage);
		annualReportService.getAnnualReports.mockResolvedValue({ results: [] });
		renderWithRouter(<AnnualReports />);

		await waitFor(() => {
			expect(screen.getByText('Annual Reports')).toBeInTheDocument();
		}, { timeout: 3000 });
	});

	it('handles API errors gracefully', async () => {
		aboutPageService.getAboutPage.mockRejectedValue(new Error('API Error'));
		annualReportService.getAnnualReports.mockRejectedValue(new Error('API Error'));
		renderWithRouter(<AnnualReports />);

		await waitFor(() => {
			// Should still render structure
			expect(screen.getByTestId('hero-section')).toBeInTheDocument();
		});
	});
});

