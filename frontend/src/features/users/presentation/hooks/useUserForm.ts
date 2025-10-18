import { useState, useEffect } from 'react';
import type { User } from '../../domain/entities/User.entity';
import { UserRole } from '../../domain/enums/UserRole';
import { UserStatus } from '../../domain/enums/UserStatus';
import type { UserFormData } from '../components/presentation/forms/UserFormFields';
import { validateUserForm } from '../utils/validation';

/**
 * User form hook props
 * @property {string} mode - Form mode (create or edit)
 * @property {User} user - User to edit (optional)
 * @property {boolean} isOpen - Modal open state
 */
interface UseUserFormProps {
  mode: 'create' | 'edit';
  user?: User | null;
  isOpen: boolean;
}

/**
 * User form hook return value
 * @property {UserFormData} formData - Form data
 * @property {boolean} loading - Loading state
 * @property {Record<string, string>} errors - Form errors
 * @property {Function} setFormData - Set form data
 * @property {Function} handleSubmit - Form submit handler
 * @property {Function} handleBlur - Field blur handler
 */
interface UseUserFormReturn {
  formData: UserFormData;
  loading: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setFormData: (data: UserFormData) => void;
  handleSubmit: (e: React.FormEvent, onSubmit: (data: UserFormData) => Promise<void>) => Promise<void>;
  handleBlur: (field: string) => void;
}

/**
 * Hook for managing user form state and validation
 * @param {UseUserFormProps} props - Hook props
 * @returns {UseUserFormReturn} Form state and handlers
 */
export const useUserForm = ({
  mode,
  user,
  isOpen,
}: UseUserFormProps): UseUserFormReturn => {
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (mode === 'edit' && user) {
      setFormData({
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      setFormData({
        email: '',
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
      });
    }
    setErrors({});
    setTouched({});
  }, [mode, user, isOpen]);

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (data: UserFormData) => Promise<void>
  ) => {
    e.preventDefault();

    const validationErrors = validateUserForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      await onSubmit(formData);
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'An error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  return {
    formData,
    loading,
    errors,
    touched,
    setFormData,
    handleSubmit,
    handleBlur,
  };
};