import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import chatbotService from './chatbotService';
import api, { handleApiError } from './api';

// Mock api but keep handleApiError real
vi.mock('./api', async () => {
	const actual = await vi.importActual('./api');
	return {
		...actual,
		default: {
			post: vi.fn(),
			get: vi.fn(),
			put: vi.fn(),
			delete: vi.fn()
		}
	};
});

describe('chatbotService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		// Mock localStorage
		global.localStorage = {
			getItem: vi.fn(),
			setItem: vi.fn(),
			removeItem: vi.fn(),
			clear: vi.fn()
		};
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('startSession', () => {
		it('starts a new session successfully', async () => {
			const mockResponse = {
				session_id: 'session-123',
				initial_message: 'Hello! How can I help you today?',
				created_at: '2024-01-01T00:00:00Z'
			};

			api.post.mockResolvedValue({ data: mockResponse });

			const result = await chatbotService.startSession();

			expect(api.post).toHaveBeenCalledWith('/chatbot/sessions/start/', {
				user_ip: null
			});
			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockResponse);
		});

		it('starts a session with user IP', async () => {
			const mockResponse = { session_id: 'session-456' };
			api.post.mockResolvedValue({ data: mockResponse });

			await chatbotService.startSession('192.168.1.1');

			expect(api.post).toHaveBeenCalledWith('/chatbot/sessions/start/', {
				user_ip: '192.168.1.1'
			});
		});

		it('handles session start errors', async () => {
			api.post.mockRejectedValue({
				response: { status: 500, data: {} }
			});

			const result = await chatbotService.startSession();

			expect(result.success).toBe(false);
			expect(result.error).toBe('Server Error');
		});

		it('handles network errors', async () => {
			api.post.mockRejectedValue({
				request: {},
				message: 'Network Error'
			});

			const result = await chatbotService.startSession();

			expect(result.success).toBe(false);
			expect(result.error).toBe('Network Error');
		});
	});

	describe('sendMessage', () => {
		it('sends a message successfully', async () => {
			const mockResponse = {
				user_message: {
					id: 1,
					message: 'What are your loan products?',
					timestamp: '2024-01-01T00:00:00Z'
				},
				ai_response: {
					id: 2,
					message: 'We offer various loan products...',
					timestamp: '2024-01-01T00:00:01Z'
				}
			};

			api.post.mockResolvedValue({ data: mockResponse });

			const result = await chatbotService.sendMessage('session-123', 'What are your loan products?');

			expect(api.post).toHaveBeenCalledWith('/chatbot/messages/', {
				session_id: 'session-123',
				message: 'What are your loan products?'
			});
			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockResponse);
		});

		it('handles validation errors', async () => {
			api.post.mockRejectedValue({
				response: { status: 400, data: { message: 'Message cannot be empty' } }
			});

			const result = await chatbotService.sendMessage('session-123', '');

			expect(result.success).toBe(false);
			expect(result.error).toBe('Validation Error');
		});

		it('handles session not found errors', async () => {
			api.post.mockRejectedValue({
				response: { status: 404, data: {} }
			});

			const result = await chatbotService.sendMessage('invalid-session', 'Hello');

			expect(result.success).toBe(false);
			expect(result.error).toBe('Not Found');
		});

		it('handles rate limiting', async () => {
			api.post.mockRejectedValue({
				response: { status: 429, data: { error: 'Too many requests' } }
			});

			const result = await chatbotService.sendMessage('session-123', 'Hello');

			expect(result.success).toBe(false);
			expect(result.error).toBe('Rate Limit Exceeded');
		});
	});

	describe('getHistory', () => {
		it('retrieves chat history successfully', async () => {
			const mockHistory = {
				messages: [
					{ id: 1, role: 'user', message: 'Hello', timestamp: '2024-01-01T00:00:00Z' },
					{ id: 2, role: 'assistant', message: 'Hi there!', timestamp: '2024-01-01T00:00:01Z' }
				]
			};

			api.get.mockResolvedValue({ data: mockHistory });

			const result = await chatbotService.getHistory('session-123');

			expect(api.get).toHaveBeenCalledWith('/chatbot/sessions/session-123/messages/');
			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockHistory);
		});

		it('handles empty history', async () => {
			api.get.mockResolvedValue({ data: { messages: [] } });

			const result = await chatbotService.getHistory('session-123');

			expect(result.success).toBe(true);
			expect(result.data.messages).toHaveLength(0);
		});

		it('handles session not found', async () => {
			api.get.mockRejectedValue({
				response: { status: 404, data: {} }
			});

			const result = await chatbotService.getHistory('invalid-session');

			expect(result.success).toBe(false);
			expect(result.error).toBe('Not Found');
		});
	});

	describe('endSession', () => {
		it('ends a session successfully', async () => {
			const mockResponse = {
				message: 'Session ended successfully',
				session_id: 'session-123'
			};

			api.post.mockResolvedValue({ data: mockResponse });

			const result = await chatbotService.endSession('session-123');

			expect(api.post).toHaveBeenCalledWith('/chatbot/sessions/session-123/end/');
			expect(result.success).toBe(true);
			expect(result.data).toEqual(mockResponse);
		});

		it('handles session not found', async () => {
			api.post.mockRejectedValue({
				response: { status: 404, data: {} }
			});

			const result = await chatbotService.endSession('invalid-session');

			expect(result.success).toBe(false);
			expect(result.error).toBe('Not Found');
		});

		it('handles server errors', async () => {
			api.post.mockRejectedValue({
				response: { status: 500, data: {} }
			});

			const result = await chatbotService.endSession('session-123');

			expect(result.success).toBe(false);
			expect(result.error).toBe('Server Error');
		});
	});

	describe('localStorage methods', () => {
		describe('getSessionId', () => {
			it('retrieves session ID from localStorage', () => {
				localStorage.getItem.mockReturnValue('session-123');

				const sessionId = chatbotService.getSessionId();

				expect(localStorage.getItem).toHaveBeenCalledWith('chat_session_id');
				expect(sessionId).toBe('session-123');
			});

			it('returns null when no session ID exists', () => {
				localStorage.getItem.mockReturnValue(null);

				const sessionId = chatbotService.getSessionId();

				expect(sessionId).toBeNull();
			});
		});

		describe('saveSessionId', () => {
			it('saves session ID to localStorage', () => {
				chatbotService.saveSessionId('session-456');

				expect(localStorage.setItem).toHaveBeenCalledWith('chat_session_id', 'session-456');
			});

			it('overwrites existing session ID', () => {
				chatbotService.saveSessionId('session-old');
				chatbotService.saveSessionId('session-new');

				expect(localStorage.setItem).toHaveBeenCalledWith('chat_session_id', 'session-new');
			});
		});

		describe('clearSessionId', () => {
			it('removes session ID from localStorage', () => {
				chatbotService.clearSessionId();

				expect(localStorage.removeItem).toHaveBeenCalledWith('chat_session_id');
			});
		});
	});

	describe('integration scenarios', () => {
		it('handles complete chat flow', async () => {
			// Start session
			api.post.mockResolvedValueOnce({ data: { session_id: 'session-123' } });
			const startResult = await chatbotService.startSession();
			expect(startResult.success).toBe(true);

			// Send message
			api.post.mockResolvedValueOnce({
				data: {
					user_message: { message: 'Hello' },
					ai_response: { message: 'Hi!' }
				}
			});
			const messageResult = await chatbotService.sendMessage('session-123', 'Hello');
			expect(messageResult.success).toBe(true);

			// Get history
			api.get.mockResolvedValueOnce({ data: { messages: [] } });
			const historyResult = await chatbotService.getHistory('session-123');
			expect(historyResult.success).toBe(true);

			// End session
			api.post.mockResolvedValueOnce({ data: { message: 'Session ended' } });
			const endResult = await chatbotService.endSession('session-123');
			expect(endResult.success).toBe(true);
		});

		it('handles session persistence with localStorage', () => {
			localStorage.getItem.mockReturnValue(null);
			expect(chatbotService.getSessionId()).toBeNull();

			chatbotService.saveSessionId('session-789');
			localStorage.getItem.mockReturnValue('session-789');
			expect(chatbotService.getSessionId()).toBe('session-789');

			chatbotService.clearSessionId();
			localStorage.getItem.mockReturnValue(null);
			expect(chatbotService.getSessionId()).toBeNull();
		});
	});
});

