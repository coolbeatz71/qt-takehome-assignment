import React, { useEffect } from 'react';
import { IconCheckCircle, IconXCircle, IconAlertCircle, IconX } from '../../icons';

/**
 * Toast component props
 * @property {string} type - Toast type
 * @property {string} message - Toast message
 * @property {Function} onClose - Close handler
 * @property {number} duration - Auto-dismiss duration
 */
interface ToastProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose: () => void;
  duration?: number;
}

/**
 * Toast notification component
 * @param {ToastProps} props - Component props
 * @returns {JSX.Element} Toast component
 */
export const Toast: React.FC<ToastProps> = ({ type, message, onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const icons = {
    success: IconCheckCircle,
    error: IconXCircle,
    warning: IconAlertCircle,
  };

  const styles = {
    success: 'bg-success-50 dark:bg-success-900 border-success-200 dark:border-success-700 text-success-800 dark:text-success-100',
    error: 'bg-danger-50 dark:bg-danger-900 border-danger-200 dark:border-danger-700 text-danger-800 dark:text-danger-100',
    warning: 'bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-100',
  };

  const iconStyles = {
    success: 'text-success-400 dark:text-success-300',
    error: 'text-danger-400 dark:text-danger-300',
    warning: 'text-yellow-400 dark:text-yellow-300',
  };

  const Icon = icons[type];

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 border rounded-lg shadow-lg min-w-80 max-w-md ${styles[type]}`}>
      <Icon className={`h-5 w-5 flex-shrink-0 ${iconStyles[type]}`} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded"
      >
        <IconX className="h-4 w-4" />
      </button>
    </div>
  );
};
