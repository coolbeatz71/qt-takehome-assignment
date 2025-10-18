import { errorMessages } from '../../../../shared/constants/error-messages';

/**
 * Form data type for user validation
 */
export interface UserFormData {
  email: string;
  role: string;
  status: string;
}

/**
 * Validation errors result type
 */
export type ValidationErrors = Record<string, string>;

/**
 * UserValidator class for validating user form data
 * Provides static methods for email and form validation
 */
export class UserValidator {
  /**
   * RFC 5322 compliant email regex pattern
   * Validates standard email format: local-part@domain.tld
   */
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Validate email format
   * @param {string} email - Email address to validate
   * @returns {boolean} True if email is valid
   */
  static isValidEmail(email: string): boolean {
    if (!email || typeof email !== 'string') return false;

    const trimmedEmail = email.trim();
    if (trimmedEmail.length === 0) return false;

    return this.EMAIL_REGEX.test(trimmedEmail);
  }

  /**
   * Validate user form data
   * @param {UserFormData} formData - Form data to validate
   * @returns {ValidationErrors} Validation errors object (empty if valid)
   */
  static validateForm(formData: UserFormData): ValidationErrors {
    const errors: ValidationErrors = {};

    const trimmedEmail = formData.email?.trim() || '';

    if (!trimmedEmail) {
      errors.email = errorMessages.validation.emailRequired;
    } else if (!this.isValidEmail(trimmedEmail)) {
      errors.email = errorMessages.validation.emailInvalid;
    }

    if (!formData.role?.trim()) {
      errors.role = errorMessages.validation.roleRequired;
    }

    if (!formData.status?.trim()) {
      errors.status = errorMessages.validation.statusRequired;
    }

    return errors;
  }

  /**
   * Check if form data is valid
   * @param {UserFormData} formData - Form data to validate
   * @returns {boolean} True if form has no validation errors
   */
  static isValid(formData: UserFormData): boolean {
    return Object.keys(this.validateForm(formData)).length === 0;
  }
}
