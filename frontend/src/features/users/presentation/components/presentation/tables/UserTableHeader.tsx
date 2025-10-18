import React from 'react';
import { IconPlus, IconSearch } from '../../../../../../shared/presentation/icons';
import { Button, Card } from '../../../../../../shared';

/**
 * User table header component props
 * @property {number} totalUsers - Total number of users
 * @property {string} searchQuery - Search query value
 * @property {Function} onSearchChange - Search change handler
 * @property {Function} onCreateClick - Create button click handler
 */
interface UserTableHeaderProps {
  totalUsers: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
}

/**
 * User table header with search and create button
 * @param {UserTableHeaderProps} props - Component props
 * @returns {JSX.Element} Table header component
 */
export const UserTableHeader: React.FC<UserTableHeaderProps> = ({
  totalUsers,
  searchQuery,
  onSearchChange,
  onCreateClick,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <Card.Title className="text-lg font-semibold dark:text-white">
        Users ({totalUsers})
      </Card.Title>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative w-full sm:w-auto">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <Button onClick={onCreateClick} size="sm" className="w-full sm:w-auto">
          <IconPlus className="h-4 w-4 mr-2" />
          Create User
        </Button>
      </div>
    </div>
  );
};
