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
	}
};

export default chatbotService;
