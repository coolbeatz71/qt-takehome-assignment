import { UserRole } from '../../domain/enums/UserRole';
import { UserStatus } from '../../domain/enums/UserStatus';

/**
 * Data transfer object for updating an existing user
 * @property {string} email - User email address (optional)
 * @property {UserRole} role - User role (optional)
 * @property {UserStatus} status - User status (optional)
 */
export interface UpdateUserDTO {
  email?: string;
  role?: UserRole;
  status?: UserStatus;
}
