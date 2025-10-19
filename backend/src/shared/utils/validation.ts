import { UserRole, UserStatus } from "../../domain/enums/UserEnums";

/**
 * Validates if a role is valid
 * @param {string} role - Role to validate
 * @returns {boolean} True if role is valid (admin, user, or guest)
 */
export const isValidRole = (role: string): role is UserRole => {
  return Object.values(UserRole).includes(role as UserRole);
};

/**
 * Validates if a status is valid
 * @param {string} status - Status to validate
 * @returns {boolean} True if status is valid (active or inactive)
 */
export const isValidStatus = (status: string): status is UserStatus => {
  return Object.values(UserStatus).includes(status as UserStatus);
};

/**
 * Validates and parses a user ID from string
 * @param {string} id - ID string to parse
 * @returns {number | null} Parsed number ID or null if invalid
 */
export const isValidId = (id: string): number | null => {
  const parsedId = parseInt(id, 10);
  return isNaN(parsedId) ? null : parsedId;
};

/**
 * Validates email format using regex
 * @param {string} email - Email to validate
 * @returns {boolean} True if email format is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sanitizes and clamps timezone offset to valid range
 * @param {unknown} raw - Raw timezone offset value
 * @returns {number} Clamped timezone offset in minutes (between -840 and 840)
 */
export const sanitizeTzOffset = (raw: unknown): number => {
  const n = typeof raw === 'string' ? parseInt(raw, 10) : Number(raw);
  if (!Number.isFinite(n)) return 0;
  const t = Math.trunc(n);
  const MIN = -14 * 60; // UTC-14:00
  const MAX = 14 * 60;  // UTC+14:00
  return Math.min(MAX, Math.max(MIN, t));
};

