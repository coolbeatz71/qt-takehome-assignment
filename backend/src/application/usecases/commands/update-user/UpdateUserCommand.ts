import { UserRole, UserStatus } from '../../../../domain/enums/UserEnums';

/**
 * Update User Command
 * Represents the intent to update an existing user
 */
export class UpdateUserCommand {
  /**
   * Creates a new UpdateUserCommand
   * @param {number} id - User ID to update
   * @param {string} email - New email (optional)
   * @param {UserRole} role - New role (optional)
   * @param {UserStatus} status - New status (optional)
   */
  constructor(
    public readonly id: number,
    public readonly email?: string,
    public readonly role?: UserRole,
    public readonly status?: UserStatus
  ) {}
}
