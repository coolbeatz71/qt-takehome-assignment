import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import type { User } from '../../../../domain/entities/User.entity';
import { Badge, Button, Avatar } from '../../../../../../shared/presentation/components';
import { DateUtils } from '../../../../../../shared/utils/dateUtils';
import { BadgeUtils } from '../../../utils/badgeUtils';
import { truncateEmail } from '../../../utils/emailUtils';

/**
 * User table row component props
 * @property {User} user - User entity
 * @property {Function} onEdit - Edit button click handler
 * @property {Function} onDelete - Delete button click handler
 */
interface UserTableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

/**
 * User table row for desktop view
 * @param {UserTableRowProps} props - Component props
 * @returns {JSX.Element} Table row component
 */
export const UserTableRow: React.FC<UserTableRowProps> = ({ user, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
      <td className="py-3 px-3">
        <div className="flex items-center gap-3">
          <Avatar email={user.email} verified={true} />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate" title={user.email}>
              {truncateEmail(user.email, 25)}
            </div>
          </div>
        </div>
      </td>
      <td className="py-3 px-3">
        <Badge variant={BadgeUtils.getRoleVariant(user.role)}>
          {user.role}
        </Badge>
      </td>
      <td className="py-3 px-3">
        <Badge variant={BadgeUtils.getStatusVariant(user.status)}>
          {user.status}
        </Badge>
      </td>
      <td className="py-3 px-3 text-xs text-gray-600 dark:text-gray-400">
        {DateUtils.formatTable(user.createdAt)}
      </td>
      <td className="py-3 px-3">
        <div className="flex justify-end gap-1">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(user)}
            className="h-9 w-9 p-0"
          >
            <Edit className="h-5 w-5" />
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(user.id)}
            className="h-9 w-9 p-0 text-danger-600 hover:text-danger-700 hover:bg-danger-50 dark:hover:bg-danger-900/20"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </td>
    </tr>
  );
};
