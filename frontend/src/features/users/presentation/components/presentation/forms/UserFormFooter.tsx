import React from 'react';
import { Button } from '../../../../../../shared';

/**
 * User form footer component props
 * @property {string} mode - Form mode (create or edit)
 * @property {boolean} loading - Loading state
 * @property {Function} onCancel - Cancel handler
 */
interface UserFormFooterProps {
  mode: 'create' | 'edit';
  loading: boolean;
  onCancel: () => void;
}

/**
 * User form footer with action buttons
 * @param {UserFormFooterProps} props - Component props
 * @returns {JSX.Element} Form footer component
 */
export const UserFormFooter: React.FC<UserFormFooterProps> = ({
  mode,
  loading,
  onCancel,
}) => {
  return (
    <div className="flex justify-end gap-3">
      <Button
        variant="outline-danger"
        onClick={onCancel}
        disabled={loading}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        form="user-form"
        isLoading={loading}
        disabled={loading}
      >
        {mode === 'create' ? 'Create' : 'Update'}
      </Button>
    </div>
  );
};
