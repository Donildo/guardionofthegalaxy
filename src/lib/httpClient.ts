import axios from 'axios';
import type { AxiosInstance } from 'axios';
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
 */
httpClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor
 */
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global error responses
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      // Redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);

export default httpClient;
