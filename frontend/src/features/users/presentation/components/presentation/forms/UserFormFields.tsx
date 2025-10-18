import React from 'react';
import { Input, Select, ErrorMessage } from '../../../../../../shared/presentation/components';
import { UserRole, UserStatus } from '../../../../domain/enums';

/**
 * User form data interface
 * @property {string} email - User email
 * @property {UserRole} role - User role
 * @property {UserStatus} status - User status
 */
export interface UserFormData {
  email: string;
  role: UserRole;
  status: UserStatus;
}

/**
 * User form fields component props
 * @property {UserFormData} formData - Form data
 * @property {Function} onChange - Form data change handler
 * @property {Function} onBlur - Field blur handler
 * @property {Record<string, string>} errors - Form errors
 * @property {boolean} disabled - Disabled state
 */
interface UserFormFieldsProps {
  formData: UserFormData;
  onChange: (data: UserFormData) => void;
  onBlur: (field: string) => void;
  errors: Record<string, string>;
  disabled: boolean;
}

const ROLE_OPTIONS = [
  { value: UserRole.USER, label: 'User' },
  { value: UserRole.ADMIN, label: 'Admin' },
  { value: UserRole.GUEST, label: 'Guest' },
];

const STATUS_OPTIONS = [
  { value: UserStatus.ACTIVE, label: 'Active' },
  { value: UserStatus.INACTIVE, label: 'Inactive' },
];

/**
 * User form fields component
 * @param {UserFormFieldsProps} props - Component props
 * @returns {JSX.Element} Form fields component
 */
export const UserFormFields: React.FC<UserFormFieldsProps> = ({
  formData,
  onChange,
  onBlur,
  errors,
  disabled,
}) => {
  return (
    <div className="space-y-4">
      {errors.submit && <ErrorMessage message={errors.submit} />}

      <Input
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={(email) => onChange({ ...formData, email })}
        onBlur={() => onBlur('email')}
        placeholder="user@example.com"
        error={errors.email}
        disabled={disabled}
      />

      <Select
        id="role"
        label="Role"
        value={formData.role}
        onChange={(role) => onChange({ ...formData, role: role as UserRole })}
        options={ROLE_OPTIONS}
        error={errors.role}
        disabled={disabled}
      />

      <Select
        id="status"
        label="Status"
        value={formData.status}
        onChange={(status) => onChange({ ...formData, status: status as UserStatus })}
        options={STATUS_OPTIONS}
        error={errors.status}
        disabled={disabled}
      />
    </div>
  );
};
