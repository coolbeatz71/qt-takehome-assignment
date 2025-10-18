import React from 'react';
import { UserTableHead } from './UserTableHead';
import { UserTableRow } from './UserTableRow';
import { User } from '../../../../domain/entities';

/**
 * Desktop table component props
 * @property {User[]} users - Array of users
 * @property {Function} onEdit - Edit user handler
 * @property {Function} onDelete - Delete user handler
 */
interface UserDesktopTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

/**
 * Desktop table view for users
 * @param {UserDesktopTableProps} props - Component props
 * @returns {JSX.Element} Desktop table component
 */
export const UserDesktopTable: React.FC<UserDesktopTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="hidden md:block">
      <div className="overflow-x-auto">
        <table className="w-full">
          <UserTableHead />
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {users.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
