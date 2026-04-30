import { describe, it, expect, vi, beforeEach } from 'vitest';
import healthCheckService from '@/services/healthCheckService';

// Mock the HTTP client
vi.mock('@/lib/httpClient', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('HealthCheckService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should have checkHealth method', () => {
    expect(typeof healthCheckService.checkHealth).toBe('function');
  });

  it('should have pollHealth method', () => {
    expect(typeof healthCheckService.pollHealth).toBe('function');
  });

  it('should return a HealthCheckResponse object', async () => {
    const health = await healthCheckService.checkHealth();

    expect(health).toHaveProperty('status');
    expect(health).toHaveProperty('timestamp');
    expect(['healthy', 'unhealthy']).toContain(health.status);
  });
});
