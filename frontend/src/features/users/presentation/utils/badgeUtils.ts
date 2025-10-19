import { UserRole, UserStatus } from "../../domain/enums";

export enum BadgeVariant {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  DEFAULT = 'default'
}

type UserRoleType = typeof UserRole[keyof typeof UserRole];
type UserStatusType = typeof UserStatus[keyof typeof UserStatus];
type BadgeVariantType = BadgeVariant;

/**
 * Utility class for determining badge variants based on user properties
 */
export class BadgeUtils {
  /**
   * Gets the badge variant for a given user role
   * @param {UserRoleType} role - The user role
   * @returns {BadgeVariantType} The corresponding badge variant
   */
  static getRoleVariant(role: UserRoleType): BadgeVariantType {
    switch (role) {
      case UserRole.ADMIN: return BadgeVariant.ERROR;
      case UserRole.USER: return BadgeVariant.INFO;
      case UserRole.GUEST: return BadgeVariant.DEFAULT;
      default: return BadgeVariant.DEFAULT;
    }
  }

  /**
   * Gets the badge variant for a given user status
   * @param {UserStatusType} status - The user status
   * @returns {BadgeVariantType} The corresponding badge variant
   */
  static getStatusVariant(status: UserStatusType): BadgeVariantType {
    return status === UserStatus.ACTIVE ? BadgeVariant.SUCCESS : BadgeVariant.DEFAULT;
  }
}
