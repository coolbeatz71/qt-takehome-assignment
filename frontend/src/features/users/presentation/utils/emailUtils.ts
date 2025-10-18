/**
 * Truncate email to specified length
 * @param {string} email - Email address
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated email
 */
export const truncateEmail = (email: string, maxLength: number = 20): string => {
  if (email.length <= maxLength) return email;
  const [name, domain] = email.split('@');
  if (name.length > maxLength - domain.length - 3) {
    return `${name.slice(0, maxLength - domain.length - 6)}...@${domain}`;
  }
  return email;
};