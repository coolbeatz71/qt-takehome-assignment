import { DailyStatsDto } from "../../domain/dto/DailyStatsDto";

/**
 * Statistics repository interface defining contract for stats data access operations
 * Provides abstraction layer for retrieving user creation statistics
 */
export interface IStatsRepository {
  /**
   * Fetch daily user creation statistics for the last 7 days
   * @returns {Promise<DailyStatsDto[]>} Array of daily statistics
   */
  getDailyStats(): Promise<DailyStatsDto[]>;
}
