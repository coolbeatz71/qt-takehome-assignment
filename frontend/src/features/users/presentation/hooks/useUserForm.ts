import { useState, useEffect, useCallback, useMemo } from 'react';
import type { User } from '../../domain/entities/User';
import { UserRole } from '../../domain/enums/UserRole';
import { UserStatus } from '../../domain/enums/UserStatus';
import type { UserFormData } from '../components/presentation/forms/UserFormFields';
import { UserValidator } from '../utils/validation';
import { errorMessages } from '../../../../shared/constants/error-messages';

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
 * @property {Record<string, boolean>} touched - Touched fields
 * @property {boolean} isValid - Form validity status
 * @property {Function} setFormData - Set form data
 * @property {Function} handleSubmit - Form submit handler
 * @property {Function} handleBlur - Field blur handler
 * @property {Function} resetForm - Reset form to initial state
 */
interface UseUserFormReturn {
  formData: UserFormData;
  loading: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isValid: boolean;
  setFormData: (data: UserFormData) => void;
  handleSubmit: (e: React.FormEvent, onSubmit: (data: UserFormData) => Promise<void>) => Promise<void>;
  handleBlur: (field: string) => void;
  resetForm: () => void;
}

/**
 * Default initial form data
 */
const DEFAULT_FORM_DATA: UserFormData = {
  email: '',
  role: UserRole.USER,
  status: UserStatus.ACTIVE,
};

/**
 * Get initial form data based on mode and user
 */
const getInitialFormData = (mode: 'create' | 'edit', user?: User | null): UserFormData => {
  if (mode === 'edit' && user) {
    return {
      email: user.email,
      role: user.role,
      status: user.status,
    };
  }
  return DEFAULT_FORM_DATA;
};

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
  const [formData, setFormData] = useState<UserFormData>(() => getInitialFormData(mode, user));
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Memoize form validity check
  const isValid = useMemo(() => {
    return UserValidator.isValid(formData) && Object.keys(errors).length === 0;
  }, [formData, errors]);

  // Reset form when mode, user, or isOpen changes
  useEffect(() => {
    setFormData(getInitialFormData(mode, user));
    setErrors({});
    setTouched({});
  }, [mode, user, isOpen]);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setFormData(getInitialFormData(mode, user));
    setErrors({});
    setTouched({});
    setLoading(false);
  }, [mode, user]);

  /**
   * Handle form submission with validation
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent, onSubmit: (data: UserFormData) => Promise<void>) => {
      e.preventDefault();

      // Validate form data
      const validationErrors = UserValidator.validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // Submit form
      try {
        setLoading(true);
        setErrors({});
        await onSubmit(formData);
      } catch (error) {
        setErrors({
          submit: error instanceof Error ? error.message : errorMessages.api.genericError,
        });
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  /**
   * Mark field as touched on blur
   */
  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  return {
    formData,
    loading,
    errors,
    touched,
    isValid,
    setFormData,
    handleSubmit,
    handleBlur,
    resetForm,
  };
};
