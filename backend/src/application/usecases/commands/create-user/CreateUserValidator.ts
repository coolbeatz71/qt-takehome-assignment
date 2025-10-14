import { ERROR_MESSAGES } from '../../../../constants';
import { isValidRole, isValidStatus } from '../../../../shared/utils/validation';
import { CreateUserCommand } from './CreateUserCommand';

/**
 * Validation result
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Create User Command Validator
 * Validates CreateUserCommand before execution
 */
export class CreateUserValidator {
  /**
   * Validates a CreateUserCommand
   * @param {CreateUserCommand} command - Command to validate
   * @returns {ValidationResult} Validation result with errors if any
   */
  validate(command: CreateUserCommand): ValidationResult {
    const errors: string[] = [];

    // Check required fields
    if (!command.email || !command.role || !command.status) {
      errors.push(ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
      return { isValid: false, errors };
    }

    // Validate role
    if (!isValidRole(command.role)) {
      errors.push(ERROR_MESSAGES.INVALID_ROLE);
    }

    // Validate status
    if (!isValidStatus(command.status)) {
      errors.push(ERROR_MESSAGES.INVALID_STATUS);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
