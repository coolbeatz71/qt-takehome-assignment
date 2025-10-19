import React from 'react';

type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

/**
 * Badge component props
 * @property {React.ReactNode} children - Badge content
 * @property {BadgeVariant} variant - Badge color variant
 * @property {string} className - Additional CSS classes
 */
interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-900 dark:bg-gray-500 dark:text-gray-900',
  success: 'bg-success-100 text-success-900 dark:bg-success-500 dark:text-success-900',
  error: 'bg-danger-100 text-danger-900 dark:bg-danger-500 dark:text-danger-900',
  warning: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-500 dark:text-yellow-900',
  info: 'bg-primary-100 text-primary-900 dark:bg-primary-500 dark:text-primary-900',
};

/**
 * Badge component for displaying status indicators
 * @param {BadgeProps} props - Component props
 * @returns {JSX.Element} Badge component
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
