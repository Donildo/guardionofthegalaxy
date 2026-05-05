import httpClient from '@/lib/httpClient';
import type { AxiosError } from 'axios';
import { ENDPOINTS } from '@/shared/constants';
import type { ApiResponse, HealthCheckResponse } from '@/shared/types';

/**
 * Health Check Service
 * Service for monitoring backend API health status
 */

class HealthCheckService {
  /**
   * Check backend health status
   * Connects to the real FastAPI backend at GET /health
   */
  async checkHealth(): Promise<HealthCheckResponse> {
    try {
      const response = await httpClient.get<ApiResponse<HealthCheckResponse>>(
        ENDPOINTS.HEALTH
      );

      if (response.data?.data) {
        return response.data.data;
      }

      // Fallback: backend returned 200 but with a different structure
      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        '[HealthCheckService] Health check failed:',
        axiosError.message
      );
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Poll health status at regular intervals
   * @param interval - polling interval in ms (default: 30s)
   * @param onStatusChange - callback when status changes
   * @returns cleanup function to stop polling
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

    // Return cleanup function to stop polling
    return () => clearInterval(pollInterval);
  }
}

export default new HealthCheckService();
