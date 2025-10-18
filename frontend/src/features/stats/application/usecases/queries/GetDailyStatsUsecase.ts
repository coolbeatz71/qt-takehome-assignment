import { DailyStatsDto } from '../../../domain/dto/DailyStatsDto';
import { IStatsRepository } from '../../repositories/IStatsRepository';

/**
 * Get daily stats use case for retrieving user creation statistics
 */
export class GetDailyStatsUseCase {
  /**
   * Creates a new GetDailyStatsUseCase instance
   * @param {IStatsRepository} statsRepository - Stats repository instance
   */
  constructor(private readonly statsRepository: IStatsRepository) {}

  /**
   * Execute the use case to fetch daily statistics
   * @returns {Promise<DailyStats[]>} Array of daily statistics
   */
  async execute(): Promise<DailyStatsDto[]> {
    return await this.statsRepository.getDailyStats();
  }
}
