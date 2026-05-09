import { useCallback } from 'react';
import { useApi } from './useApi';
import { healthCheckService } from '@/services';
import type { HealthCheckResponse } from '@/shared/types';

/**
 * useHealthCheck — Hook for backend health monitoring
 *
 * Consumes the real FastAPI backend health endpoint.
 * Returns health status, loading state, error, and manual refetch.
 *
 * @example
 * const { data, loading, error, refetch } = useHealthCheck();
 *
 * if (loading) return <span>Checking...</span>
 * if (error)   return <span>Backend unreachable</span>
 * return <span>Status: {data?.status}</span>
 */
export function useHealthCheck() {
  const fetcher = useCallback(() => healthCheckService.checkHealth(), []);

  const { data, loading, error, refetch } =
    useApi<HealthCheckResponse>(fetcher);

  return {
    /** Full health check response (status + timestamp + optional version) */
    data,
    /** Whether the health check request is in progress */
    loading,
    /** Error message if the request failed */
    error,
    /** Manually trigger a new health check */
    refetch,
    /** Convenience: current status string ('healthy' | 'unhealthy' | null) */
    status: data?.status ?? null,
  };
}
