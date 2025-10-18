import React from 'react';
import { IconAlertTriangle } from '../../icons';
import { Modal } from '../Modal';
import { Button } from '../Button';

/**
 * ConfirmModal component props
 * @property {boolean} isOpen - Modal open state
 * @property {Function} onClose - Close handler
 * @property {Function} onConfirm - Confirm handler
 * @property {string} title - Modal title
 * @property {React.ReactNode} message - Confirmation message
 * @property {string} confirmText - Confirm button text
 * @property {string} cancelText - Cancel button text
 * @property {string} variant - Modal variant
 */
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning';
}

/**
 * Confirmation modal component
 * @param {ConfirmModalProps} props - Component props
 * @returns {JSX.Element} Confirm modal component
 */
export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const iconColor = variant === 'danger' ? 'text-danger-600 dark:text-danger-400' : 'text-yellow-600 dark:text-yellow-400';
  const bgColor = variant === 'danger' ? 'bg-danger-50 dark:bg-danger-900' : 'bg-yellow-50 dark:bg-yellow-900';

  const footer = (
    <div className="flex justify-end gap-3">
      <Button variant="secondary" onClick={onClose}>
        {cancelText}
      </Button>
      <Button
        variant={variant === 'danger' ? "outline-danger" : 'primary'}
        onClick={handleConfirm}
      >
        {confirmText}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      size="sm"
    >
      <div className="flex gap-4">
        <div className={`h-12 w-12 rounded-full ${bgColor} flex-shrink-0 flex items-center justify-center`}>
          <IconAlertTriangle className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-600 dark:text-gray-300">{message}</div>
        </div>
      </div>
    </Modal>
  );
};
