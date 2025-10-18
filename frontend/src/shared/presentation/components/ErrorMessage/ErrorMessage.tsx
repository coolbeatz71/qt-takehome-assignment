import React from 'react';

/**
 * Error message component props
 * @property {string} message - Error message
 */
interface ErrorMessageProps {
  message: string;
}

/**
 * Error message banner component
 * @param {ErrorMessageProps} props - Component props
 * @returns {JSX.Element} Error message component
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="p-3 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-600 rounded-md">
      <p className="text-sm text-danger-600 dark:text-danger-400">{message}</p>
    </div>
  );
};
