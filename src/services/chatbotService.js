/**
 * Chatbot Service
 * Handles AI chatbot interactions
 */

import api, { handleApiError } from './api';

const chatbotService = {
	/**
	 * Start a new chat session
	 * @param {string} userIp - User's IP address (optional)
	 * @returns {Promise<Object>} Session data with initial message
	 */
	async startSession(userIp = null) {
		try {
			const response = await api.post('/chatbot/session/start/', {
				user_ip: userIp
			});
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Send a message to the chatbot
	 * @param {string} sessionId - Chat session ID
	 * @param {string} message - User's message
	 * @returns {Promise<Object>} User message and AI response
	 */
	async sendMessage(sessionId, message) {
		try {
			const response = await api.post('/chatbot/message/', {
				session_id: sessionId,
				message: message
			});
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get chat history for a session
	 * @param {string} sessionId - Chat session ID
	 * @returns {Promise<Object>} Chat messages
	 */
	async getHistory(sessionId) {
		try {
			const response = await api.get(`/chatbot/session/${sessionId}/history/`);
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * End a chat session
	 * @param {string} sessionId - Chat session ID
	 * @returns {Promise<Object>} Success status
	 */
	async endSession(sessionId) {
		try {
			const response = await api.post(`/chatbot/session/${sessionId}/end/`);
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get or create session ID from local storage
	 * @returns {string|null} Session ID
	 */
	getSessionId() {
		return localStorage.getItem('chat_session_id');
	},

	/**
	 * Save session ID to local storage
	 * @param {string} sessionId - Session ID to save
	 */
	saveSessionId(sessionId) {
		localStorage.setItem('chat_session_id', sessionId);
	},

	/**
	 * Clear session ID from local storage
	 */
	clearSessionId() {
		localStorage.removeItem('chat_session_id');
	},

	// ===== RAG (Document-based) Chat Functions =====

	/**
	 * Get all available documents for RAG queries
	 * @returns {Promise<Object>} List of documents
	 */
	async getDocuments() {
		try {
			const response = await api.get('/chatbot/documents/');
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get a specific document by ID
	 * @param {string} documentId - Document UUID
	 * @returns {Promise<Object>} Document details
	 */
	async getDocument(documentId) {
		try {
			const response = await api.get(`/chatbot/documents/${documentId}/`);
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Ask a question using RAG (Retrieval-Augmented Generation)
	 * @param {string} question - The user's question
	 * @param {string} documentId - Optional: specific document UUID to query
	 * @param {string} sessionId - Optional: session ID for conversation tracking
	 * @returns {Promise<Object>} AI response with sources
	 */
	async askRAG(question, documentId = null, sessionId = null) {
		try {
			const payload = {
				question: question
			};
			
			if (documentId) {
				payload.document_id = documentId;
			}
			
			if (sessionId) {
				payload.session_id = sessionId;
			}

			const response = await api.post('/chatbot/rag/ask/', payload);
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get RAG query history
	 * @returns {Promise<Object>} Query history
	 */
	async getRAGHistory() {
		try {
			const response = await api.get('/chatbot/rag/history/');
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get RAG statistics
	 * @returns {Promise<Object>} RAG usage stats
	 */
	async getRAGStats() {
		try {
			const response = await api.get('/chatbot/rag/stats/');
			return { success: true, data: response.data };
		} catch (error) {
			const apiError = handleApiError(error);
			return { success: false, ...apiError };
		}
	},

	/**
	 * Get or create RAG session ID from local storage
	 * @returns {string} Session ID (creates new UUID if not exists)
	 */
	getRAGSessionId() {
		let sessionId = localStorage.getItem('rag_session_id');
		if (!sessionId) {
			// Generate a simple UUID-like ID
			sessionId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				const r = Math.random() * 16 | 0;
				const v = c === 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
			localStorage.setItem('rag_session_id', sessionId);
		}
		return sessionId;
	},

	/**
	 * Get selected document ID from local storage
	 * @returns {string|null} Document ID
	 */
	getSelectedDocumentId() {
		return localStorage.getItem('selected_document_id');
	},

	/**
	 * Save selected document ID to local storage
	 * @param {string} documentId - Document ID to save
	 */
	saveSelectedDocumentId(documentId) {
		localStorage.setItem('selected_document_id', documentId);
	},

	/**
	 * Clear selected document ID from local storage
	 */
	clearSelectedDocumentId() {
		localStorage.removeItem('selected_document_id');
	}
};

export default chatbotService;
