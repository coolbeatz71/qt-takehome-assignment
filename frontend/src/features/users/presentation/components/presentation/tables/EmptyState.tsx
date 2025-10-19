import React from 'react';
import { IconUsers } from '../../../../../../shared/presentation/icons';

/**
 * Empty state component props
 * @property {boolean} isSearching - Whether user is searching
 */
interface EmptyStateProps {
  isSearching: boolean;
}

/**
 * Empty state component for when no users are found
 * @param {EmptyStateProps} props - Component props
 * @returns {JSX.Element} Empty state component
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ isSearching }) => {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <IconUsers className="h-44 w-44 text-gray-300 dark:text-gray-600" />
      </div>
      <div className="text-gray-500 dark:text-gray-400">
        {isSearching ? 'No users found matching your search.' : 'No users found.'}
      </div>
    </div>
  );
};
