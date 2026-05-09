import { useState, useEffect, useCallback } from 'react';

/**
 * API State
 * Generic state shape for async API calls
 */
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * useApi — Generic reusable API hook
 *
 * Wraps any async fetcher function and manages loading/data/error state.
 * Supports manual refetch.
 *
 * @example
 * const { data, loading, error, refetch } = useApi(() => healthCheckService.checkHealth());
 */
export function useApi<T>(
  fetcher: () => Promise<T>,
  options: { immediate?: boolean } = { immediate: true }
) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await fetcher();
      setState({ data, loading: false, error: null });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setState((prev) => ({ ...prev, loading: false, error: message }));
    }
  }, [fetcher]);

  useEffect(() => {
    if (options.immediate !== false) {
      execute();
    }
  }, [execute, options.immediate]);

  return {
    ...state,
    refetch: execute,
  };
}
