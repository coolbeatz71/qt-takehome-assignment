import { useState, useCallback } from 'react';

/**
 * Toast notification object
 * @property {string} id - Unique identifier for the toast
 * @property {'success' | 'error' | 'warning'} type - Toast type/variant
 * @property {string} message - Toast message content
 */
interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning';
  message: string;
}

/**
 * Custom hook for managing toast notifications
 * @returns {Object} Toast state and methods
 * @returns {Toast[]} toasts - Array of active toast notifications
 * @returns {Function} showToast - Display a toast notification
 * @returns {Function} hideToast - Hide/dismiss a toast notification
 * @returns {Function} success - Display a success toast
 * @returns {Function} error - Display an error toast
 * @returns {Function} warning - Display a warning toast
 */
export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * Show a toast notification
   * @param {Toast['type']} type - Type of toast (success, error, warning)
   * @param {string} message - Message to display
   */
  const showToast = useCallback((type: Toast['type'], message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
  }, []);

  /**
   * Hide/dismiss a toast notification
   * @param {string} id - ID of the toast to hide
   */
  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  /**
   * Display a success toast notification
   * @param {string} message - Success message to display
   */
  const success = useCallback((message: string) => showToast('success', message), [showToast]);

  /**
   * Display an error toast notification
   * @param {string} message - Error message to display
   */
  const error = useCallback((message: string) => showToast('error', message), [showToast]);

  /**
   * Display a warning toast notification
   * @param {string} message - Warning message to display
   */
  const warning = useCallback((message: string) => showToast('warning', message), [showToast]);

  return {
    toasts,
    showToast,
    hideToast,
    success,
    error,
    warning,
  };
};