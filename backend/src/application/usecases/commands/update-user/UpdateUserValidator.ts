import { errorMessages } from '../../../../shared/constants/error-messages';
import { isValidRole, isValidStatus } from '../../../../shared/utils/validation';
import { UpdateUserCommand } from './UpdateUserCommand';

/**
 * Validation result
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Update User Command Validator
 * Validates UpdateUserCommand before execution
 */
export class UpdateUserValidator {
  /**
   * Validates an UpdateUserCommand
   * @param {UpdateUserCommand} command - Command to validate
   * @returns {ValidationResult} Validation result with errors if any
   */
  validate(command: UpdateUserCommand): ValidationResult {
    const errors: string[] = [];

    // Validate role if provided
    if (command.role && !isValidRole(command.role)) {
      errors.push(errorMessages.user.invalidRole);
    }

    // Validate status if provided
    if (command.status && !isValidStatus(command.status)) {
      errors.push(errorMessages.user.invalidStatus);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
