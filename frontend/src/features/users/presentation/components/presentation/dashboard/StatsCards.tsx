import React from 'react';
import { Users, UserCheck, Calendar } from 'lucide-react';
import { StatCard } from '../../../../../../shared/presentation/components';
import type { User } from '../../../../domain/entities/User.entity';
import { DailyStatsDto } from '../../../../../stats/domain/dto/DailyStatsDto';

/**
 * StatsCards component props
 * @property {User[]} users - Array of users
 * @property {DailyStatsDto[]} stats - Daily statistics
 * @property {boolean} loading - Loading state
 */
interface StatsCardsProps {
  users: User[];
  loading: boolean;
  stats: DailyStatsDto[];
}

/**
 * Stats cards component displaying user statistics
 * @param {StatsCardsProps} props - Component props
 * @returns {JSX.Element} Stats cards component
 */
export const StatsCards: React.FC<StatsCardsProps> = ({ users, stats, loading }) => {
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;

  const thisWeekCount = stats.reduce((sum, day) => sum + day.count, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total Users"
        value={totalUsers}
        icon={<Users className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
        color="bg-primary-50 dark:bg-primary-900/20"
        loading={loading}
      />
      <StatCard
        title="Active Users"
        value={activeUsers}
        icon={<UserCheck className="h-6 w-6 text-success-600 dark:text-success-400" />}
        color="bg-success-50 dark:bg-success-900/20"
        loading={loading}
      />
      <StatCard
        title="New This Week"
        value={thisWeekCount}
        icon={<Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
        color="bg-purple-50 dark:bg-purple-900/20"
        loading={loading}
      />
    </div>
  );
};
