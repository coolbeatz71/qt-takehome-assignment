import React from 'react';
import { ThemeToggle } from '../../../../../../shared';

/**
 * Dashboard header with title and create button
 * @param {DashboardHeaderProps} props - Component props
 * @returns {JSX.Element} Dashboard header component
 */
export const DashboardHeader: React.FC = () => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            User Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage user roles, status, and analytics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};
