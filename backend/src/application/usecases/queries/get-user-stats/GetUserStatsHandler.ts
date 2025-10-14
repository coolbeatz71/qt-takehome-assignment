import { IUserRepository } from '../../../repositories/IUserRepository';
import { GetUserStatsQuery } from './GetUserStatsQuery';

/**
 * Daily Stats DTO
 */
export interface DailyStats {
  date: string;
  count: number;
}

/**
 * Get User Stats Query Handler
 * Retrieves user creation statistics for last 7 days (CQRS Query)
 */
export class GetUserStatsHandler {
  /**
   * Creates a new GetUserStatsHandler
   * @param {IUserRepository} userRepository - User repository for data access
   */
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Executes the get user stats query
   * @param {GetUserStatsQuery} _query - Query (no parameters)
   * @returns {Promise<DailyStats[]>} Array of daily statistics for last 7 days
   */
  async handle(_query: GetUserStatsQuery): Promise<DailyStats[]> {
    return await this.userRepository.getStats();
  }
}
