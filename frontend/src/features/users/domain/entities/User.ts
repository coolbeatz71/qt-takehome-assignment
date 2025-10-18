import { UserRole } from '../enums/UserRole';
import { UserStatus } from '../enums/UserStatus';

/**
 * User entity representing a user in the system
 * @property {number} id - Unique user identifier
 * @property {string} email - User email address
 * @property {UserRole} role - User role
 * @property {UserStatus} status - User status
 * @property {string} createdAt - User creation timestamp
 * @property {string} signature - ECDSA signature of user email
 */
export interface User {
  id: number;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  signature: string;
}