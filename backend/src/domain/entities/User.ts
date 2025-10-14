import { UserRole, UserStatus } from '../enums/UserEnums';

/**
 * User Entity - Domain Model
 * Represents a user in the system with core business rules
 */
export class User {
  /**
   * Creates a new User entity
   * @param {number} id - Unique identifier
   * @param {string} email - User email address
   * @param {UserRole} role - User role (admin, user, guest)
   * @param {UserStatus} status - User status (active, inactive)
   * @param {string} createdAt - ISO timestamp of creation
   * @param {string} signature - ECDSA signature of email
   */
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly role: UserRole,
    public readonly status: UserStatus,
    public readonly createdAt: string,
    public readonly signature: string
  ) {}

  /**
   * Checks if user is active
   * @returns {boolean} True if user status is active
   */
  isActive(): boolean {
    return this.status === UserStatus.ACTIVE;
  }

  /**
   * Checks if user has admin privileges
   * @returns {boolean} True if user role is admin
   */
  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }
}
