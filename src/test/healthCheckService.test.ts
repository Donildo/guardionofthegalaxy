import { describe, it, expect, vi, beforeEach } from 'vitest';
import httpClient from '@/lib/httpClient';
import healthCheckService from '@/services/healthCheckService';
import type { ApiResponse, HealthCheckResponse } from '@/shared/types';

// Mock the HTTP client module
vi.mock('@/lib/httpClient', () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockedGet = vi.mocked(httpClient.get);

describe('HealthCheckService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('checkHealth()', () => {
    it('should return healthy status when backend responds with data wrapper', async () => {
      const mockPayload: ApiResponse<HealthCheckResponse> = {
        success: true,
        data: {
          status: 'healthy',
          timestamp: '2026-05-05T00:00:00.000Z',
          version: '1.0.0',
        },
      };
      mockedGet.mockResolvedValueOnce({ data: mockPayload });

      const result = await healthCheckService.checkHealth();

      expect(result.status).toBe('healthy');
      expect(result.timestamp).toBe('2026-05-05T00:00:00.000Z');
      expect(result.version).toBe('1.0.0');
    });

    it('should return fallback healthy status when backend responds without data wrapper', async () => {
      // Backend returns 200 but without the expected { success, data } wrapper
      mockedGet.mockResolvedValueOnce({ data: {} });

      const result = await healthCheckService.checkHealth();

      expect(result.status).toBe('healthy');
      expect(result.timestamp).toBeDefined();
    });

    it('should return unhealthy status when backend is unreachable (network error)', async () => {
      mockedGet.mockRejectedValueOnce(new Error('Network Error'));

      const result = await healthCheckService.checkHealth();

      expect(result.status).toBe('unhealthy');
      expect(result.timestamp).toBeDefined();
    });

    it('should return unhealthy status on 500 server error', async () => {
      const serverError = Object.assign(new Error('Internal Server Error'), {
        response: { status: 500 },
      });
      mockedGet.mockRejectedValueOnce(serverError);

      const result = await healthCheckService.checkHealth();

      expect(result.status).toBe('unhealthy');
    });

    it('response should always have status and timestamp properties', async () => {
      mockedGet.mockRejectedValueOnce(new Error('Connection refused'));

      const result = await healthCheckService.checkHealth();

      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('timestamp');
      expect(['healthy', 'unhealthy']).toContain(result.status);
    });
  });

  describe('pollHealth()', () => {
    it('should return a cleanup function', () => {
      const cleanup = healthCheckService.pollHealth(999999);
      expect(typeof cleanup).toBe('function');
      cleanup(); // stop polling
    });

    it('should call onStatusChange when status changes', async () => {
      vi.useFakeTimers();

      // First call: healthy, second call: unhealthy
      mockedGet
        .mockResolvedValueOnce({
          data: {
            success: true,
            data: { status: 'healthy', timestamp: '2026-01-01T00:00:00Z' },
          },
        })
        .mockRejectedValueOnce(new Error('Timeout'));

      const onStatusChange = vi.fn();
      const cleanup = healthCheckService.pollHealth(1000, onStatusChange);

      await vi.advanceTimersByTimeAsync(1000);
      await vi.advanceTimersByTimeAsync(1000);

      expect(onStatusChange).toHaveBeenCalled();

      cleanup();
      vi.useRealTimers();
    });
  });
});
