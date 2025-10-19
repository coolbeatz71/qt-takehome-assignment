/**
 * Email Value Object
 * Ensures email validity as a domain rule
 */
export class Email {
  private readonly value: string;

  /**
   * Creates a validated Email value object
   * @param {string} email - Email address to validate
   * @throws {Error} If email format is invalid
   */
  constructor(email: string) {
    if (!Email.isValid(email)) {
      throw new Error('Invalid email format');
    }
    this.value = email.toLowerCase().trim();
  }

  /**
   * Validates email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if email format is valid
   */
  static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Gets the email string value
   * @returns {string} The email address
   */
  toString(): string {
    return this.value;
  }
}
