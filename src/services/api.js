/**
 * API Service Configuration
 * Base configuration for all API calls to the Django backend
 */

import axios from 'axios';

// API Base URL - Change this based on environment
let API_BASE_URL =
	import.meta.env.VITE_APP_ENV == 'production'
		? import.meta.env.VITE_API_BASE_URL
		: 'http://127.0.0.1:8000/api';

// Enforce HTTPS in production
if (import.meta.env.VITE_APP_ENV === 'production') {
	if (!API_BASE_URL || !API_BASE_URL.startsWith('https://')) {
		console.error('Production API must use HTTPS. Current URL:', API_BASE_URL);
		throw new Error('Production API must use HTTPS. Please set VITE_API_BASE_URL to an HTTPS URL.');
	}
}

// Create axios instance with default config
const api = axios.create({
	baseURL: API_BASE_URL,
	timeout: 30000, // 30 seconds
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	}
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('access_token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor - Handle token refresh and errors
api.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		// If error is 401 and we haven't retried yet, try to refresh token
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = localStorage.getItem('refresh_token');
				if (refreshToken) {
					const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
						refresh: refreshToken
					});

					const { access } = response.data;
					localStorage.setItem('access_token', access);

					// Retry original request with new token
					originalRequest.headers.Authorization = `Bearer ${access}`;
					return api(originalRequest);
				}
			} catch (refreshError) {
				// Refresh failed, logout user
				localStorage.removeItem('access_token');
				localStorage.removeItem('refresh_token');
				localStorage.removeItem('user');
				window.location.href = '/login';
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

// Helper function to handle API errors
export const handleApiError = (error) => {
	if (error.response) {
		// Server responded with error
		const { status, data } = error.response;

		switch (status) {
			case 400:
				return {
					error: 'Validation Error',
					message: data.error || 'Invalid data provided',
					details: data.details || {}
				};
			case 401:
				return {
					error: 'Authentication Error',
					message: 'Please login to continue'
				};
			case 403:
				return {
					error: 'Permission Denied',
					message: 'You do not have permission to perform this action'
				};
			case 404:
				return {
					error: 'Not Found',
					message: 'The requested resource was not found'
				};
			case 429:
				return {
					error: 'Rate Limit Exceeded',
					message: data.detail || 'Too many requests. Please try again later.'
				};
			case 500:
				return {
					error: 'Server Error',
					message: 'Something went wrong on our end. Please try again later.'
				};
			default:
				return {
					error: 'Error',
					message: data.error || data.detail || 'An error occurred'
				};
		}
	} else if (error.request) {
		// Request made but no response
		return {
			error: 'Network Error',
			message: 'Unable to connect to server. Please check your internet connection.'
		};
	} else {
		// Something else happened
		return {
			error: 'Error',
			message: error.message || 'An unexpected error occurred'
		};
	}
};

export default api;
