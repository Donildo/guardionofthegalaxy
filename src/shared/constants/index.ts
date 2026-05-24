/**
 * Shared Constants
 * Centralize all application constants here
 */

// Vite exposes env variables via import.meta.env (not process.env)
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
export const APP_NAME =
  import.meta.env.VITE_APP_NAME ?? 'Guardian of the Galaxy';
export const APP_VERSION = '0.0.1';

// Re-export endpoints for convenience
export * from './endpoints';
