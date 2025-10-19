import React from 'react';
import { Card } from '../Card';
import { SkeletonLoader } from '../SkeletonLoader';

/**
 * StatCard component props
 * @property {string} title - Card title
 * @property {string | number} value - Stat value
 * @property {React.ReactNode} icon - Icon component
 * @property {string} color - Icon background color
 * @property {boolean} loading - Loading state
 */
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  loading?: boolean;
}

/**
 * Stat card component with icon and value
 * @param {StatCardProps} props - Component props
 * @returns {JSX.Element} Stat card component
 */
export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, loading = false }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <Card.Content className="p-6">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-xl ${color}`}>
            {icon}
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {title}
            </p>
            {loading ? (
              <SkeletonLoader className="h-9 w-16 mt-1 ml-auto" />
            ) : (
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </p>
            )}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};
