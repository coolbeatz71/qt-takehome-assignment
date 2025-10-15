/**
 * Utility class for date formatting and validation
 */
export class DateUtils {
  /**
   * Formats a date string for chart display (e.g., "Jan 15")
   * @param {string} dateStr - The date string to format
   * @returns {string} Formatted date for charts
   */
  static formatChart(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Formats a date string for table display (e.g., "Jan 15, 2024")
   * @param {string} dateStr - The date string to format
   * @returns {string} Formatted date for tables
   */
  static formatTable(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  /**
   * Formats a date string for tooltip display (e.g., "Monday, January 15, 2024")
   * @param {string} dateStr - The date string to format
   * @returns {string} Formatted date for tooltips
   */
  static formatTooltip(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  /**
   * Validates whether a string represents a valid date
   * @param {string} dateStr - The date string to validate
   * @returns {boolean} True if the date is valid, false otherwise
   */
  static isValidDate(dateStr: string): boolean {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  }
}
