import httpClient from '@/lib/httpClient';
import { ApiResponse, HealthCheckResponse } from '@/shared/types';

/**
 * Health Check Service
 * Service for monitoring backend API health
 */

class HealthCheckService {
  /**
   * Check backend health status
   */
  async checkHealth(): Promise<HealthCheckResponse> {
    try {
      const response =
        await httpClient.get<ApiResponse<HealthCheckResponse>>('/health');

      if (response.data?.data) {
        return response.data.data;
      }

      // Fallback response if backend returns different structure
      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Health check failed:', error);
      // Return unhealthy status on error
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Poll health status at intervals
   */
  pollHealth(
    interval: number = 30000,
    onStatusChange?: (status: HealthCheckResponse) => void
  ): () => void {
    let lastStatus: HealthCheckResponse | null = null;

    const pollInterval = setInterval(async () => {
      const currentStatus = await this.checkHealth();

      if (lastStatus?.status !== currentStatus.status && onStatusChange) {
        onStatusChange(currentStatus);
      }

      lastStatus = currentStatus;
    }, interval);

    // Return function to stop polling
    return () => clearInterval(pollInterval);
  }
}

export default new HealthCheckService();
