import React from 'react';

/**
 * Form error component props
 * @property {string} message - Error message
 */
interface FormErrorProps {
  message: string;
}

/**
 * Form error banner component
 * @param {FormErrorProps} props - Component props
 * @returns {JSX.Element} Form error component
 */
export const FormError: React.FC<FormErrorProps> = ({ message }) => {
  return (
    <div className="p-3 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-600 rounded-md">
      <p className="text-sm text-danger-600 dark:text-danger-400">{message}</p>
    </div>
  );
};
