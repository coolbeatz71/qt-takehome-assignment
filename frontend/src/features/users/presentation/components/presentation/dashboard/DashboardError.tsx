import React from 'react';

/**
 * Dashboard error component props
 * @property {string} error - Error message
 */
interface DashboardErrorProps {
  error: string;
}

/**
 * Dashboard error state component
 * @param {DashboardErrorProps} props - Component props
 * @returns {JSX.Element} Error component
 */
export const DashboardError: React.FC<DashboardErrorProps> = ({ error }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-danger-600 dark:text-danger-400 text-lg font-medium mb-2">
          Error Loading Dashboard
        </div>
        <div className="text-gray-600 dark:text-gray-400">{error}</div>
      </div>
    </div>
  );
};
