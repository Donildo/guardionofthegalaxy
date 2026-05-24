import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useHealthCheck } from '@/hooks/useHealthCheck';

// Mock the entire services module
vi.mock('@/services', () => ({
  healthCheckService: {
    checkHealth: vi.fn(),
  },
}));

// Import after mocking so we get the mocked version
import { healthCheckService } from '@/services';

const mockedCheckHealth = vi.mocked(healthCheckService.checkHealth);

describe('useHealthCheck', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should start with loading state', async () => {
    mockedCheckHealth.mockResolvedValue({
      status: 'healthy',
      timestamp: '2026-05-05T00:00:00Z',
    });

    const { result } = renderHook(() => useHealthCheck());

    // Immediately after mount, before the promise resolves → loading
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.status).toBeNull();

    // Drain pending state updates to avoid act() warnings
    await waitFor(() => expect(result.current.loading).toBe(false));
  });

  it('should resolve to healthy status on success', async () => {
    mockedCheckHealth.mockResolvedValue({
      status: 'healthy',
      timestamp: '2026-05-05T00:00:00Z',
      version: '1.0.0',
    });

    const { result } = renderHook(() => useHealthCheck());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.status).toBe('healthy');
    expect(result.current.data?.version).toBe('1.0.0');
    expect(result.current.error).toBeNull();
  });

  it('should resolve to unhealthy status when service returns unhealthy', async () => {
    mockedCheckHealth.mockResolvedValue({
      status: 'unhealthy',
      timestamp: '2026-05-05T00:00:00Z',
    });

    const { result } = renderHook(() => useHealthCheck());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.status).toBe('unhealthy');
    expect(result.current.error).toBeNull();
  });

  it('should set error message when fetch throws', async () => {
    mockedCheckHealth.mockRejectedValue(new Error('Backend unreachable'));

    const { result } = renderHook(() => useHealthCheck());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Backend unreachable');
    expect(result.current.data).toBeNull();
    expect(result.current.status).toBeNull();
  });

  it('should refetch when refetch() is called', async () => {
    mockedCheckHealth
      .mockResolvedValueOnce({
        status: 'unhealthy',
        timestamp: '2026-05-05T00:00:00Z',
      })
      .mockResolvedValueOnce({
        status: 'healthy',
        timestamp: '2026-05-05T00:01:00Z',
      });

    const { result } = renderHook(() => useHealthCheck());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.status).toBe('unhealthy');

    // Trigger refetch
    act(() => {
      result.current.refetch();
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.status).toBe('healthy');
    expect(mockedCheckHealth).toHaveBeenCalledTimes(2);
  });

  it('should expose data, loading, error, status, and refetch', async () => {
    mockedCheckHealth.mockResolvedValue({
      status: 'healthy',
      timestamp: '2026-05-05T00:00:00Z',
    });

    const { result } = renderHook(() => useHealthCheck());

    expect(result.current).toHaveProperty('data');
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('status');
    expect(result.current).toHaveProperty('refetch');
    expect(typeof result.current.refetch).toBe('function');

    // Drain pending updates
    await waitFor(() => expect(result.current.loading).toBe(false));
  });
});
