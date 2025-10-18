import React from 'react';
import { UserMobileCard } from './UserMobileCard';
import { User } from '../../../../domain/entities';

/**
 * Mobile list component props
 * @property {User[]} users - Array of users
 * @property {Function} onEdit - Edit user handler
 * @property {Function} onDelete - Delete user handler
 */
interface UserMobileListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

/**
 * Mobile list view for users
 * @param {UserMobileListProps} props - Component props
 * @returns {JSX.Element} Mobile list component
 */
export const UserMobileList: React.FC<UserMobileListProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="md:hidden space-y-4">
      {users.map((user) => (
        <UserMobileCard
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
