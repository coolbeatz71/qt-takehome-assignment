import { errorMessages } from '../../../../shared/constants/error-messages';
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
      errors.push(errorMessages.user.missingRequiredFields);
      return { isValid: false, errors };
    }

    // Validate role
    if (!isValidRole(command.role)) {
      errors.push(errorMessages.user.invalidRole);
    }

    // Validate status
    if (!isValidStatus(command.status)) {
      errors.push(errorMessages.user.invalidStatus);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
