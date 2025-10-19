import { UserRole } from '../../domain/enums/UserRole';
import { UserStatus } from '../../domain/enums/UserStatus';

/**
 * Data transfer object for creating a new user
 * @property {string} email - User email address
 * @property {UserRole} role - User role
 * @property {UserStatus} status - User status
 */
export interface CreateUserDTO {
  email: string;
  role: UserRole;
  status: UserStatus;
}