import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Button } from '../../../../../../shared/presentation/components';
import { DateUtils } from '../../../../../../shared/utils/dateUtils';
import { DailyStatsDto } from '../../../../../stats/domain/dto/DailyStatsDto';

/**
 * UserChart component props
 * @property {DailyStats[]} stats - Daily statistics data
 * @property {boolean} loading - Loading state
 * @property {string | null} error - Error message
 * @property {Function} onRetry - Retry callback
 */
interface UserChartProps {
  stats: DailyStatsDto[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

/**
 * User chart component displaying users created over time
 * @param {UserChartProps} props - Component props
 * @returns {JSX.Element} User chart component
 */
export const UserChart: React.FC<UserChartProps> = ({ stats, loading, error, onRetry }) => {
  const validStats = stats.filter(stat => DateUtils.isValidDate(stat.date));

  const chartData = validStats.map(stat => ({
    date: DateUtils.formatChart(stat.date),
    count: stat.count,
    fullDate: stat.date,
  }));

  if (loading) {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Users Created (Last 7 Days)</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="h-80 flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400">Loading chart...</div>
          </div>
        </Card.Content>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Users Created (Last 7 Days)</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="text-danger-600 dark:text-danger-400 mb-2">Failed to load chart data</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-4">{error}</div>
              {onRetry && (
                <Button onClick={onRetry} size="sm">
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </Card.Content>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Users Created (Last 7 Days)</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="h-80 flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400">No data available</div>
          </div>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>Users Created (Last 7 Days)</Card.Title>
      </Card.Header>
      <Card.Content>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value: number) => [value, 'Users Created']}
                labelFormatter={(date: string) => {
                  const item = chartData.find(d => d.date === date);
                  return item ? DateUtils.formatTooltip(item.fullDate) : date;
                }}
              />
              <Bar
                dataKey="count"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
              />
          </BarChart>
        </ResponsiveContainer>
      </Card.Content>
    </Card>
  );
};
