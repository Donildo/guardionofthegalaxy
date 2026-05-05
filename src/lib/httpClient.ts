import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL } from '@/shared/constants';

/**
 * HTTP Client Configuration
 * Central instance for all API requests
 */

const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 * Adds auth token from localStorage when available
 */
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/**
 * Response interceptor
 * Handles global error responses (401, network errors, etc.)
 */
httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem('auth_token');
      // TODO: redirect to login or dispatch logout action
    }

    // Standardized error logging
    console.error(
      `[HTTP Error] ${error.config?.method?.toUpperCase()} ${error.config?.url} → ${status ?? 'Network Error'}`,
      error.message
    );

    return Promise.reject(error);
  }
);

export default httpClient;
