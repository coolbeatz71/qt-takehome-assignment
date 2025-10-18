import React from 'react';
import { Badge, Button, Avatar } from '../../../../../../shared/presentation/components';
import { DateUtils } from '../../../../../../shared/utils/date.utils';
import { BadgeUtils } from '../../../utils/badge.utils';
import { truncateEmail } from '../../../utils/email.utils';
import { User } from '../../../../domain/entities';
import { IconEdit, IconTrash } from '../../../../../../shared/presentation/icons';

/**
 * User mobile card component props
 * @property {User} user - User entity
 * @property {Function} onEdit - Edit button click handler
 * @property {Function} onDelete - Delete button click handler
 */
interface UserMobileCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

/**
 * User card for mobile view
 * @param {UserMobileCardProps} props - Component props
 * @returns {JSX.Element} Mobile card component
 */
export const UserMobileCard: React.FC<UserMobileCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <Avatar email={user.email} verified={!!user.signature} />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate" title={user.email}>
            {truncateEmail(user.email, 20)}
          </div>
          <div className="flex gap-2 mt-1">
            <Badge variant={BadgeUtils.getRoleVariant(user.role)}>
              {user.role}
            </Badge>
            <Badge variant={BadgeUtils.getStatusVariant(user.status)}>
              {user.status}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-600 dark:text-gray-400">
          Created {DateUtils.formatTable(user.createdAt)}
        </div>
        <div className="flex gap-1">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(user)}
            className="h-9 w-9 p-0"
          >
            <IconEdit />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(user.id)}
            className="h-9 w-9 p-0 text-danger-600 hover:text-danger-700 hover:bg-danger-50 dark:hover:bg-danger-900/20"
          >
            <IconTrash />
          </Button>
        </div>
      </div>
    </div>
  );
};
