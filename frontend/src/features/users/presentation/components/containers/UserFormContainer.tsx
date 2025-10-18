import React from 'react';
import type { User } from '../../../domain/entities/User';
import type { CreateUserDTO } from '../../../domain/dto/CreateUserDTO';
import type { UpdateUserDTO } from '../../../domain/dto/UpdateUserDTO';
import { Modal } from '../../../../../shared/presentation/components';
import { UserFormFields, UserFormFooter } from '../presentation/forms';
import { useUserForm } from '../../hooks/useUserForm';

/**
 * User form container component props
 * @property {boolean} isOpen - Modal open state
 * @property {Function} onClose - Close handler
 * @property {Function} onSubmit - Submit handler
 * @property {User} user - User to edit (optional)
 * @property {string} mode - Form mode (create or edit)
 */
interface UserFormContainerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: CreateUserDTO | UpdateUserDTO) => Promise<void>;
  user?: User | null;
  mode: 'create' | 'edit';
}

/**
 * User form container with modal wrapper
 * @param {UserFormContainerProps} props - Component props
 * @returns {JSX.Element} User form container
 */
export const UserFormContainer: React.FC<UserFormContainerProps> = ({
  isOpen,
  onClose,
  onSubmit,
  user,
  mode,
}) => {
  const {
    formData,
    loading,
    errors,
    setFormData,
    handleSubmit,
    handleBlur,
  } = useUserForm({ mode, user, isOpen });

  const handleFormSubmit = async (e: React.FormEvent) => {
    await handleSubmit(e, async (data) => {
      await onSubmit(data);
      onClose();
    });
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === 'create' ? 'New User' : 'Edit User'}
      footer={<UserFormFooter mode={mode} loading={loading} onCancel={handleClose} />}
      size="sm"
    >
      <form id="user-form" onSubmit={handleFormSubmit}>
        <UserFormFields
          formData={formData}
          onChange={setFormData}
          onBlur={handleBlur}
          errors={errors}
          disabled={loading}
        />
      </form>
    </Modal>
  );
};
