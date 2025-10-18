import { useState, useEffect } from 'react';
import { GetDailyStatsUseCase } from '../../application/usecases/queries/GetDailyStatsUsecase';
import { statsRepository } from '../../infrastructure/repositories/StatsRepository';
import { errorMessages } from '../../../../shared/constants/error-messages';
import { DailyStatsDto } from '../../domain/dto/DailyStatsDto';

const getDailyStatsUseCase = new GetDailyStatsUseCase(statsRepository);

/**
 * Hook for fetching daily user creation statistics
 * @returns {Object} Stats data, loading state, and error
 * @returns {DailyStats[]} stats - Array of daily statistics
 * @returns {boolean} loading - Loading state
 * @returns {string | null} error - Error message if any
 * @returns {Function} refetch - Function to refetch stats
 */
export const useStats = () => {
  const [stats, setStats] = useState<DailyStatsDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDailyStatsUseCase.execute();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : errorMessages.stats.fetchFailed);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};
