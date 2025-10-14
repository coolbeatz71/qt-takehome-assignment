import { UserRole, UserStatus } from '../../../../domain/enums/UserEnums';

/**
 * Create User Command
 * Represents the intent to create a new user
 */
export class CreateUserCommand {
  /**
   * Creates a new CreateUserCommand
   * @param {string} email - User email address
   * @param {UserRole} role - User role (admin, user, guest)
   * @param {UserStatus} status - User status (active, inactive)
   */
  constructor(
    public readonly email: string,
    public readonly role: UserRole,
    public readonly status: UserStatus
  ) {}
}
