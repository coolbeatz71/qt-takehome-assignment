import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * @param {ClassValue[]} inputs - CSS class values
 * @returns {string} Merged class string
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};