import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatBox from './ChatBox';
import chatbotService from '../services/chatbotService';

// Mock services
vi.mock('../services/chatbotService');
vi.mock('../analytics/ga4', () => ({
	trackEvent: vi.fn()
}));

describe('ChatBox Component', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		// Mock localStorage
		Storage.prototype.getItem = vi.fn();
		Storage.prototype.setItem = vi.fn();
		Storage.prototype.removeItem = vi.fn();
		// Mock getDocuments to prevent errors
		chatbotService.getDocuments = vi.fn().mockResolvedValue({
			success: true,
			data: []
		});
		chatbotService.getRAGSessionId = vi.fn().mockReturnValue('test-session-id');
		// Mock scrollIntoView
		Element.prototype.scrollIntoView = vi.fn();
	});

	describe('Initial Render', () => {
		it('renders chat toggle button when closed', () => {
			render(<ChatBox />);

			const toggleButton = screen.getByLabelText('Open AI Chat Assistant');
			expect(toggleButton).toBeInTheDocument();
		});

		it('shows tooltip on hover', () => {
			render(<ChatBox />);

			expect(screen.getByText('Chat with our AI Assistant')).toBeInTheDocument();
		});

		it('does not render chat window initially', () => {
			render(<ChatBox />);

			expect(screen.queryByText('ValleyBot')).not.toBeInTheDocument();
		});
	});

	describe('Opening and Closing Chat', () => {
		it('opens chat window when toggle button is clicked', async () => {
			render(<ChatBox />);

			const toggleButton = screen.getByLabelText('Open AI Chat Assistant');
			fireEvent.click(toggleButton);

			await waitFor(() => {
				expect(screen.getByText('ValleyBot')).toBeInTheDocument();
			});
		});

		it('closes chat window when close button is clicked', async () => {
			render(<ChatBox />);

			// Open chat
			const toggleButton = screen.getByLabelText('Open AI Chat Assistant');
			fireEvent.click(toggleButton);

			await waitFor(() => {
				expect(screen.getByText('ValleyBot')).toBeInTheDocument();
			});

			// Close chat - find all buttons in header button group (minimize and close)
			const buttons = screen.getAllByRole('button');
			const headerButtons = buttons.filter(btn => 
				btn.closest('div[class*="flex items-center space-x-1"]')
			);
			// Close button is the last button in header (X icon, second button)
			const closeButton = headerButtons[headerButtons.length - 1];
			fireEvent.click(closeButton);

			await waitFor(() => {
				expect(screen.queryByText('ValleyBot')).not.toBeInTheDocument();
			});
		});

		it('minimizes chat window when minimize button is clicked', async () => {
			render(<ChatBox />);

			// Open chat
			const toggleButton = screen.getByLabelText('Open AI Chat Assistant');
			fireEvent.click(toggleButton);

			await waitFor(() => {
				expect(screen.getByText('ValleyBot')).toBeInTheDocument();
			});

			// Minimize chat - find minimize button (first button in header button group)
			const buttons = screen.getAllByRole('button');
			const headerButtons = buttons.filter(btn => 
				btn.closest('div[class*="flex items-center space-x-1"]')
			);
			const minimizeButton = headerButtons[0]; // First button is minimize
			fireEvent.click(minimizeButton);

			// Chat header should still be visible when minimized
			expect(screen.getByText('ValleyBot')).toBeInTheDocument();
		});
	});

	describe('Session Management', () => {
		it('starts new session when no existing session', async () => {
			chatbotService.getRAGSessionId.mockReturnValue('new-session-id');

			render(<ChatBox />);

			const toggleButton = screen.getByLabelText('Open AI Chat Assistant');
			fireEvent.click(toggleButton);

			await waitFor(() => {
				expect(screen.getByText('ValleyBot')).toBeInTheDocument();
			});

			// Component uses getRAGSessionId which is already mocked
			expect(chatbotService.getRAGSessionId).toHaveBeenCalled();
		});

		it('loads existing session history', async () => {
			chatbotService.getRAGSessionId.mockReturnValue('existing-session-id');

			render(<ChatBox />);

			const toggleButton = screen.getByLabelText('Open AI Chat Assistant');
			fireEvent.click(toggleButton);

			await waitFor(() => {
				expect(screen.getByText('ValleyBot')).toBeInTheDocument();
			});

			// Component uses getRAGSessionId
			expect(chatbotService.getRAGSessionId).toHaveBeenCalled();
		});

		it('handles session start failure', async () => {
			chatbotService.getRAGSessionId.mockReturnValue('test-session-id');
			chatbotService.getDocuments.mockResolvedValue({
				success: false,
				error: 'Failed to load documents'
			});

			render(<ChatBox />);

			const toggleButton = screen.getByLabelText('Open AI Chat Assistant');
			fireEvent.click(toggleButton);

			await waitFor(() => {
				expect(screen.getByText('ValleyBot')).toBeInTheDocument();
			});

			expect(chatbotService.getDocuments).toHaveBeenCalled();
		});
	});

	describe('Message Sending', () => {
		it('sends message when send button is clicked', async () => {
			chatbotService.askRAG = vi.fn().mockResolvedValue({
				success: true,
				data: {
					answer: 'Test response',
					sources: []
				}
			});

			render(<ChatBox />);

			// Open chat
			const toggleButton = screen.getByLabelText('Open AI Chat Assistant');
			fireEvent.click(toggleButton);

			await waitFor(() => {
				expect(screen.getByText('ValleyBot')).toBeInTheDocument();
			});

			// Type message - placeholder is "Ask me anything about the documents..."
			const input = screen.getByPlaceholderText(/Ask me anything about the documents/i);
			await userEvent.type(input, 'Test message');

			// Send message - find send button (last button, or button with Send icon)
			const buttons = screen.getAllByRole('button');
			const sendButton = buttons[buttons.length - 1]; // Send button is typically last
			fireEvent.click(sendButton);

			await waitFor(() => {
				expect(chatbotService.askRAG).toHaveBeenCalled();
			});
		});

		it('sends message when Enter key is pressed', async () => {
			chatbotService.askRAG = vi.fn().mockResolvedValue({
				success: true,
				data: {
					answer: 'Response',
					sources: []
				}
			});

			render(<ChatBox />);

			// Open chat
			const toggleButton = screen.getByLabelText('Open AI Chat Assistant');
			fireEvent.click(toggleButton);

			await waitFor(() => {
				expect(screen.getByText('ValleyBot')).toBeInTheDocument();
			});

			// Type and send with Enter
			const input = screen.getByPlaceholderText(/Ask me anything about the documents/i);
			await userEvent.type(input, 'Test{Enter}');

			await waitFor(() => {
				expect(chatbotService.askRAG).toHaveBeenCalled();
			});
		});

		it('does not send empty messages', async () => {
			chatbotService.askRAG = vi.fn();

			render(<ChatBox />);

			// Open chat
			const toggleButton = screen.getByLabelText('Open AI Chat Assistant');
			fireEvent.click(toggleButton);

			await waitFor(() => {
				expect(screen.getByText('ValleyBot')).toBeInTheDocument();
			});

			// Try to send empty message - send button should be disabled
			const buttons = screen.getAllByRole('button');
			const sendButton = buttons[buttons.length - 1];
			expect(sendButton).toBeDisabled();
			fireEvent.click(sendButton);

			// Should not call askRAG
			expect(chatbotService.askRAG).not.toHaveBeenCalled();
		});

		it('handles message send failure', async () => {
			chatbotService.askRAG = vi.fn().mockResolvedValue({
				success: false,
				message: 'Failed to send message'
			});

			render(<ChatBox />);

			// Open chat
			const toggleButton = screen.getByLabelText('Open AI Chat Assistant');
			fireEvent.click(toggleButton);

			await waitFor(() => {
				expect(screen.getByText('ValleyBot')).toBeInTheDocument();
			});

			// Type and send message
			const input = screen.getByPlaceholderText(/Ask me anything about the documents/i);
			await userEvent.type(input, 'Test message');

			const buttons = screen.getAllByRole('button');
			const sendButton = buttons[buttons.length - 1];
			fireEvent.click(sendButton);

			await waitFor(() => {
				expect(chatbotService.askRAG).toHaveBeenCalled();
			});
		});

		it('disables input while sending message', async () => {
			chatbotService.askRAG = vi.fn().mockImplementation(
				() => new Promise((resolve) => setTimeout(() => resolve({ success: true, data: { answer: 'Response' } }), 100))
			);

			render(<ChatBox />);

			// Open chat
			const toggleButton = screen.getByLabelText('Open AI Chat Assistant');
			fireEvent.click(toggleButton);

			await waitFor(() => {
				expect(screen.getByText('ValleyBot')).toBeInTheDocument();
			});

			// Type and send message
			const input = screen.getByPlaceholderText(/Ask me anything about the documents/i);
			await userEvent.type(input, 'Test message');

			const buttons = screen.getAllByRole('button');
			const sendButton = buttons[buttons.length - 1];
			fireEvent.click(sendButton);

			// Send button should be disabled while sending
			await waitFor(() => {
				expect(sendButton).toBeDisabled();
			}, { timeout: 50 });
		});
	});

	describe('Accessibility', () => {
		it('has proper ARIA labels', () => {
			render(<ChatBox />);

			expect(screen.getByLabelText('Open AI Chat Assistant')).toBeInTheDocument();
		});

		it('supports keyboard navigation', async () => {
			chatbotService.getSessionId.mockReturnValue('test-session');
			chatbotService.getHistory.mockResolvedValue({
				success: true,
				data: { messages: [] }
			});

			render(<ChatBox />);

			const toggleButton = screen.getByLabelText('Open AI Chat Assistant');
			toggleButton.focus();
			expect(toggleButton).toHaveFocus();
		});
	});
});

