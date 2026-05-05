/**
 * API Endpoints
 * Single source of truth for all backend API endpoints
 */

export const ENDPOINTS = {
  /** Health check - GET /health */
  HEALTH: '/health',
} as const;

export type EndpointKey = keyof typeof ENDPOINTS;
