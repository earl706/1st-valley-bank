import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Leadership from './Leadership';
import landingService from '../../services/landingService';

// Mock services and components
vi.mock('../../services/landingService');
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
	)
}));
vi.mock('react-organizational-chart', () => ({
	Tree: ({ children, label }) => <div data-testid="org-tree">{label}{children}</div>,
	TreeNode: ({ children, label }) => <div data-testid="org-node">{label}{children}</div>
}));

// Leadership component uses its own LoadingSkeleton, not from PageSkeleton
// The component will render LoadingSkeleton directly when loading is true

describe('Leadership Page', () => {
	const mockOrgChart = {
		success: true,
		data: {
			id: 1,
			officer: {
				name: 'President Name',
				position: 'PRESIDENT',
				hierarchy_level: 0
			},
			children: [
				{
					id: 2,
					officer: {
						name: 'VP Name',
						position: 'VICE PRESIDENT',
						hierarchy_level: 1
					},
					children: []
				}
			]
		}
	};

	beforeEach(() => {
		vi.clearAllMocks();
		// Mock window.matchMedia for useMediaQuery hook
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: vi.fn().mockImplementation(query => ({
				matches: false,
				media: query,
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			})),
		});
		// Setup default mock returns
		landingService.getOfficerOrgChart = vi.fn();
		// Component expects results array - line 393: (officersResponse.data || []).filter
		landingService.getProductAreaManagementOfficers = vi.fn().mockResolvedValue({ 
			success: true, 
			data: [] // Component expects array directly
		});
	});

	const renderWithRouter = (component) => {
		return render(<BrowserRouter>{component}</BrowserRouter>);
	};

	it('renders loading state initially', () => {
		landingService.getOfficerOrgChart.mockImplementation(() => new Promise(() => {}));
		renderWithRouter(<Leadership />);

		// Component shows LoadingSkeleton component while loading
		// LoadingSkeleton is a local component that renders loading animation
		// It should render immediately when loading is true
		const loadingElements = document.querySelectorAll('.animate-pulse');
		expect(loadingElements.length).toBeGreaterThan(0);
	});

	it('renders org chart section after data loads', async () => {
		landingService.getOfficerOrgChart.mockResolvedValue({ 
			success: true, 
			data: { org_chart: mockOrgChart.data } 
		});
		renderWithRouter(<Leadership />);

		await waitFor(() => {
			expect(screen.getByTestId('dark-header')).toBeInTheDocument();
		}, { timeout: 2000 });

		// Wait for org chart to render
		await waitFor(() => {
			expect(screen.getByText('Senior Management')).toBeInTheDocument();
		}, { timeout: 2000 });
	});

	it('shows empty message when no org chart data', async () => {
		landingService.getOfficerOrgChart.mockResolvedValue({ 
			success: true, 
			data: { org_chart: null } 
		});
		renderWithRouter(<Leadership />);

		await waitFor(() => {
			expect(screen.getByText(/No senior management information available/i)).toBeInTheDocument();
		}, { timeout: 3000 });
	});

	it('handles API errors gracefully', async () => {
		landingService.getOfficerOrgChart.mockRejectedValue(new Error('API Error'));
		renderWithRouter(<Leadership />);

		await waitFor(() => {
			// Component shows error message
			expect(screen.getByText('Leadership')).toBeInTheDocument();
			expect(screen.getByText(/Failed to load|API Error/)).toBeInTheDocument();
		});
	});
});

