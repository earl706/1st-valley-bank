import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import SearchResults from './SearchResults';
import searchService from '../services/searchService';

// Mock services
vi.mock('../services/searchService');
// Don't mock useLocation - let MemoryRouter handle it

describe('SearchResults Page', () => {
	const mockSearchResults = {
		success: true,
		data: {
			loans: [{ id: 1, title: 'Loan 1', category: 'loans' }],
			deposits: [{ id: 1, title: 'Deposit 1', category: 'deposits' }],
			locations: [{ id: 1, name: 'Branch 1', category: 'locations' }],
			faqs: [{ id: 1, question: 'FAQ 1?', category: 'faqs' }],
			newsletters: [{ id: 1, title: 'Newsletter 1', category: 'newsletters' }]
		}
	};

	beforeEach(() => {
		vi.clearAllMocks();
		searchService.search = vi.fn().mockResolvedValue(mockSearchResults);
	});

	const renderWithRouter = (component, initialEntries = ['/search?q=test']) => {
		return render(
			<MemoryRouter initialEntries={initialEntries}>
				{component}
			</MemoryRouter>
		);
	};

	it('renders search results after data loads', async () => {
		renderWithRouter(<SearchResults />);

		await waitFor(() => {
			expect(searchService.search).toHaveBeenCalled();
		}, { timeout: 2000 });
	});

	it('handles empty search results', async () => {
		searchService.search.mockResolvedValue({
			success: true,
			data: {
				loans: [],
				deposits: [],
				properties: [],
				branches: [],
				atms: [],
				faqs: [],
				newsletters: [],
				pages: []
			}
		});
		// Use a search term that won't match any static pages
		renderWithRouter(<SearchResults />, ['/search?q=xyz123nonexistent']);

		await waitFor(() => {
			// Component renders "No results found for" with search term (line 782-783)
			// Text is split: "No results found for " + "\"xyz123nonexistent\"."
			const pageContent = document.body.textContent || '';
			expect(pageContent).toMatch(/No results found for/i);
		}, { timeout: 3000 });
	});

	it('handles API errors gracefully', async () => {
		searchService.search.mockRejectedValue(new Error('API Error'));
		renderWithRouter(<SearchResults />);

		await waitFor(() => {
			// Should handle error
			expect(searchService.search).toHaveBeenCalled();
		}, { timeout: 2000 });
	});
});

