import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import FAQPage from './FAQPage';
import landingService from '../services/landingService';

vi.mock('../services/landingService');
vi.mock('../components/PageHeroSection', () => ({
    default: () => <div data-testid="page-hero-section">Hero Section</div>
}));
vi.mock('../components/PageSkeleton', () => ({
    DetailPageSkeleton: () => <div data-testid="loading-skeleton">Loading...</div>
}));

describe('FAQPage', () => {
    const mockFAQs = [
        {
            id: 1,
            question: 'How do I open an account?',
            answer: 'Visit any branch with valid ID.',
            is_active: true
        },
        {
            id: 2,
            question: 'What are your operating hours?',
            answer: 'Monday to Friday, 9 AM to 5 PM.',
            is_active: true
        },
        {
            id: 3,
            question: 'How do I apply for a loan?',
            answer: 'You can apply online or visit our branch.',
            is_active: true
        }
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderWithRouter = (component) => render(<BrowserRouter>{component}</BrowserRouter>);

    describe('Loading State', () => {
        it('shows loading skeleton initially', async () => {
            landingService.getFaqs.mockImplementation(() => new Promise(() => {}));
            renderWithRouter(<FAQPage />);
            expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
        });
    });

    describe('Successful Data Loading', () => {
        it('fetches and displays FAQs', async () => {
            landingService.getFaqs.mockResolvedValue({ data: mockFAQs });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('How do I open an account?')).toBeInTheDocument();
                expect(screen.getByText('What are your operating hours?')).toBeInTheDocument();
                expect(screen.getByText('How do I apply for a loan?')).toBeInTheDocument();
            });
        });

        it('renders page hero section', async () => {
            landingService.getFaqs.mockResolvedValue({ data: mockFAQs });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByTestId('page-hero-section')).toBeInTheDocument();
            });
        });

        it('renders FAQ header', async () => {
            landingService.getFaqs.mockResolvedValue({ data: mockFAQs });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
            });
        });

        it('renders contact CTA section', async () => {
            landingService.getFaqs.mockResolvedValue({ data: mockFAQs });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('Still Have Questions?')).toBeInTheDocument();
            });
            expect(screen.getByText('Contact Us')).toBeInTheDocument();
            expect(screen.getByText('Find a Branch')).toBeInTheDocument();
        });

        it('filters out inactive FAQs', async () => {
            const faqsWithInactive = [
                ...mockFAQs,
                {
                    id: 4,
                    question: 'Inactive FAQ',
                    answer: 'This should not appear',
                    is_active: false
                }
            ];
            landingService.getFaqs.mockResolvedValue({ data: faqsWithInactive });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('How do I open an account?')).toBeInTheDocument();
            });
            expect(screen.queryByText('Inactive FAQ')).not.toBeInTheDocument();
        });
    });

    describe('FAQ Accordion Functionality', () => {
        it('all FAQs are initially closed', async () => {
            landingService.getFaqs.mockResolvedValue({ data: mockFAQs });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('How do I open an account?')).toBeInTheDocument();
            });
            const answer = screen.queryByText('Visit any branch with valid ID.');
            // Check aria-hidden attribute instead of visibility (more reliable in jsdom)
            expect(answer?.closest('[aria-hidden]')).toHaveAttribute('aria-hidden', 'true');
        });

        it('opens FAQ when clicked', async () => {
            landingService.getFaqs.mockResolvedValue({ data: mockFAQs });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('How do I open an account?')).toBeInTheDocument();
            });
            const faqButton = screen.getByText('How do I open an account?');
            fireEvent.click(faqButton);
            await waitFor(() => {
                expect(screen.getByText('Visit any branch with valid ID.')).toBeInTheDocument();
            });
        });

        it('closes FAQ when clicked again', async () => {
            landingService.getFaqs.mockResolvedValue({ data: mockFAQs });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('How do I open an account?')).toBeInTheDocument();
            });
            const faqButton = screen.getByText('How do I open an account?');
            fireEvent.click(faqButton); // open
            await waitFor(() => {
                expect(screen.getByText('Visit any branch with valid ID.')).toBeInTheDocument();
            });
            fireEvent.click(faqButton); // close
            await waitFor(() => {
                // Check aria-hidden attribute instead of visibility (more reliable in jsdom)
                const answer = screen.queryByText('Visit any branch with valid ID.');
                expect(answer?.closest('[aria-hidden]')).toHaveAttribute('aria-hidden', 'true');
            });
        });

        it('closes previous FAQ when opening a new one', async () => {
            landingService.getFaqs.mockResolvedValue({ data: mockFAQs });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('How do I open an account?')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText('How do I open an account?'));
            await waitFor(() => {
                expect(screen.getByText('Visit any branch with valid ID.')).toBeInTheDocument();
            });
            fireEvent.click(screen.getByText('What are your operating hours?'));
            await waitFor(() => {
                expect(screen.getByText('Monday to Friday, 9 AM to 5 PM.')).toBeInTheDocument();
            });
            // Check aria-hidden attribute instead of visibility (more reliable in jsdom)
            const firstAnswer = screen.queryByText('Visit any branch with valid ID.');
            expect(firstAnswer?.closest('[aria-hidden]')).toHaveAttribute('aria-hidden', 'true');
        });

        it('has correct ARIA attributes', async () => {
            landingService.getFaqs.mockResolvedValue({ data: mockFAQs });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('How do I open an account?')).toBeInTheDocument();
            });
            const faqButton = screen.getByText('How do I open an account?').closest('button');
            expect(faqButton).toHaveAttribute('aria-expanded', 'false');
            expect(faqButton).toHaveAttribute('aria-controls');
            fireEvent.click(faqButton);
            await waitFor(() => {
                expect(faqButton).toHaveAttribute('aria-expanded', 'true');
            });
        });
    });

    describe('Answer Rendering', () => {
        it('renders plain text answers', async () => {
            landingService.getFaqs.mockResolvedValue({ data: mockFAQs });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('How do I open an account?')).toBeInTheDocument();
            });
            fireEvent.click(screen.getByText('How do I open an account?'));
            await waitFor(() => {
                expect(screen.getByText('Visit any branch with valid ID.')).toBeInTheDocument();
            });
        });

        it('renders URLs as clickable links', async () => {
            const faqWithURL = [
                {
                    id: 1,
                    question: 'Where is your website?',
                    answer: 'Visit us at https://example.com for more information.',
                    is_active: true
                }
            ];
            landingService.getFaqs.mockResolvedValue({ data: faqWithURL });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('Where is your website?')).toBeInTheDocument();
            });
            fireEvent.click(screen.getByText('Where is your website?'));
            await waitFor(() => {
                const link = screen.getByRole('link', { name: /https:\/\/example\.com/ });
                expect(link).toHaveAttribute('href', 'https://example.com');
                expect(link).toHaveAttribute('target', '_blank');
                expect(link).toHaveAttribute('rel', 'noopener noreferrer');
            });
        });

        it('renders multi-line answers with line breaks', async () => {
            const faqWithMultiline = [
                {
                    id: 1,
                    question: 'What documents do I need?',
                    answer: 'Line 1\nLine 2\nLine 3',
                    is_active: true
                }
            ];
            landingService.getFaqs.mockResolvedValue({ data: faqWithMultiline });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('What documents do I need?')).toBeInTheDocument();
            });
            fireEvent.click(screen.getByText('What documents do I need?'));
            await waitFor(() => {
                // Multi-line text is split by <br /> elements, so use a text matcher function
                const answerContainer = screen.getByText('What documents do I need?').closest('div').querySelector('[id="faq-body-0"]');
                expect(answerContainer).toBeInTheDocument();
                expect(answerContainer?.textContent).toContain('Line 1');
                expect(answerContainer?.textContent).toContain('Line 2');
                expect(answerContainer?.textContent).toContain('Line 3');
            });
        });
    });

    describe('Error Handling', () => {
        it('displays error message on fetch failure', async () => {
            landingService.getFaqs.mockRejectedValue(new Error('Network error'));
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('Failed to load FAQs. Please try again later.')).toBeInTheDocument();
            });
        });

        it('logs error to console', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const testError = new Error('Test error');
            landingService.getFaqs.mockRejectedValue(testError);
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching FAQs:', testError);
            });
            consoleErrorSpy.mockRestore();
        });

        it('sets empty FAQs array on error', async () => {
            landingService.getFaqs.mockRejectedValue(new Error('Network error'));
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('Failed to load FAQs. Please try again later.')).toBeInTheDocument();
            });
            expect(screen.queryByRole('button', { name: /How do I/ })).not.toBeInTheDocument();
        });
    });

    describe('Empty State', () => {
        it('displays empty state when no FAQs', async () => {
            landingService.getFaqs.mockResolvedValue({ data: [] });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('No FAQs available at this time.')).toBeInTheDocument();
            });
            expect(screen.getByText('Please check back later or contact us if you have questions.')).toBeInTheDocument();
        });

        it('shows help circle icon in empty state', async () => {
            landingService.getFaqs.mockResolvedValue({ data: [] });
            const { container } = renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('No FAQs available at this time.')).toBeInTheDocument();
            });
            const icon = container.querySelector('svg');
            expect(icon).toBeInTheDocument();
        });
    });

    describe('Data Format Handling', () => {
        it('handles array response format', async () => {
            landingService.getFaqs.mockResolvedValue({ data: mockFAQs });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('How do I open an account?')).toBeInTheDocument();
            });
        });

        it('handles paginated response format with results', async () => {
            landingService.getFaqs.mockResolvedValue({
                data: {
                    results: mockFAQs,
                    count: 3,
                    next: null,
                    previous: null
                }
            });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('How do I open an account?')).toBeInTheDocument();
            });
        });

        it('handles response format with faqs property', async () => {
            landingService.getFaqs.mockResolvedValue({
                data: {
                    faqs: mockFAQs
                }
            });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('How do I open an account?')).toBeInTheDocument();
            });
        });
    });

    describe('Navigation Links', () => {
        it('renders contact us link', async () => {
            landingService.getFaqs.mockResolvedValue({ data: mockFAQs });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                const contactLink = screen.getByRole('link', { name: 'Contact Us' });
                expect(contactLink).toHaveAttribute('href', '/contact-us');
            });
        });

        it('renders find a branch link', async () => {
            landingService.getFaqs.mockResolvedValue({ data: mockFAQs });
            renderWithRouter(<FAQPage />);
            await waitFor(() => {
                const branchLink = screen.getByRole('link', { name: 'Find a Branch' });
                expect(branchLink).toHaveAttribute('href', '/branches');
            });
        });
    });

    describe('Chevron Icons', () => {
        it('shows chevron down when FAQ is closed', async () => {
            landingService.getFaqs.mockResolvedValue({ data: mockFAQs });
            const { container } = renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('How do I open an account?')).toBeInTheDocument();
            });
            const faqButton = screen.getByText('How do I open an account?').closest('button');
            expect(faqButton).toBeInTheDocument();
            // ChevronDown renders as SVG with class 'lucide-chevron-down'
            const chevronDown = faqButton.querySelector('.lucide-chevron-down');
            expect(chevronDown).toBeInTheDocument();
            const chevronUp = faqButton.querySelector('.lucide-chevron-up');
            expect(chevronUp).not.toBeInTheDocument();
        });

        it('shows chevron up when FAQ is open', async () => {
            landingService.getFaqs.mockResolvedValue({ data: mockFAQs });
            const { container } = renderWithRouter(<FAQPage />);
            await waitFor(() => {
                expect(screen.getByText('How do I open an account?')).toBeInTheDocument();
            });
            const faqButton = screen.getByText('How do I open an account?');
            fireEvent.click(faqButton);
            await waitFor(() => {
                expect(screen.getByText('Visit any branch with valid ID.')).toBeInTheDocument();
            });
            const button = faqButton.closest('button');
            expect(button).toBeInTheDocument();
            // ChevronUp renders as SVG with class 'lucide-chevron-up'
            const chevronUp = button.querySelector('.lucide-chevron-up');
            expect(chevronUp).toBeInTheDocument();
            const chevronDown = button.querySelector('.lucide-chevron-down');
            expect(chevronDown).not.toBeInTheDocument();
        });
    });
});
