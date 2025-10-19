import type { IStatsRepository } from '../../application/repositories/IStatsRepository';
import { httpClient } from '../../../../shared/infrastructure/http/HttpClient';
import type { ApiResponse } from '../../../../shared/infrastructure/http/types/ApiResponse';
import { DailyStatsDto } from '../../domain/dto/DailyStatsDto';

/**
 * Statistics repository implementation for HTTP-based stats data access
 * Implements IStatsRepository interface using REST API calls
 */
export class StatsRepository implements IStatsRepository {
  /**
   * Fetch daily user creation statistics for the last 7 days
   * @returns {Promise<DailyStatsDto[]>} Array of daily statistics
   */
  async getDailyStats(): Promise<DailyStatsDto[]> {
    const response = await httpClient.get<ApiResponse<DailyStatsDto[]>>('/api/users/stats');
    return response.data.data!;
  }
}

/**
 * Default stats repository instance
 */
export const statsRepository = new StatsRepository();
