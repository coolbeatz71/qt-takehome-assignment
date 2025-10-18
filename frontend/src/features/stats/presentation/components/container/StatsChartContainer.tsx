import React from 'react';
import { Card } from '../../../../../shared/presentation/components';
import { DateUtils } from '../../../../../shared/utils/date.utils';
import { DailyStatsDto } from '../../../domain/dto/DailyStatsDto';
import { ChartLoading } from '../presentation/ChartLoading';
import { ChartError } from '../presentation/ChartError';
import { ChartEmpty } from '../presentation/ChartEmpty';
import { StatsBarChart, ChartDataPoint } from '../presentation/StatsBarChart';

/**
 * Stats chart container component props
 * @property {DailyStatsDto[]} stats - Daily statistics data
 * @property {boolean} loading - Loading state
 * @property {string | null} error - Error message
 * @property {Function} onRetry - Retry callback
 */
interface StatsChartContainerProps {
  stats: DailyStatsDto[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

/**
 * Stats chart container component
 * Manages chart states and data transformation
 * @param {StatsChartContainerProps} props - Component props
 * @returns {JSX.Element} Stats chart container component
 */
export const StatsChartContainer: React.FC<StatsChartContainerProps> = ({
  stats,
  loading,
  error,
  onRetry,
}) => {
  // Filter valid stats
  const validStats = stats.filter(stat => DateUtils.isValidDate(stat.date));

  // Transform data for chart
  const chartData: ChartDataPoint[] = validStats.map(stat => ({
    date: DateUtils.formatChart(stat.date),
    count: stat.count,
    fullDate: stat.date,
  }));

  // Loading state
  if (loading) {
    return <ChartLoading />;
  }

  // Error state
  if (error) {
    return <ChartError error={error} onRetry={onRetry} />;
  }

  // Empty state
  if (chartData.length === 0) {
    return <ChartEmpty />;
  }

  // Chart with data
  return (
    <Card>
      <Card.Header>
        <Card.Title>Users Created (Last 7 Days)</Card.Title>
      </Card.Header>
      <Card.Content>
        <StatsBarChart data={chartData} />
      </Card.Content>
    </Card>
  );
};
