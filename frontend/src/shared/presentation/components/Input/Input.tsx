import React from 'react';

/**
 * Input component props
 * @property {string} id - Input ID
 * @property {string} label - Input label
 * @property {string} type - Input type
 * @property {string} value - Input value
 * @property {Function} onChange - Change handler
 * @property {Function} onBlur - Blur handler
 * @property {string} placeholder - Input placeholder
 * @property {string} error - Error message
 * @property {boolean} disabled - Disabled state
 */
interface InputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

/**
 * Input component with label and error display
 * @param {InputProps} props - Component props
 * @returns {JSX.Element} Input component
 */
export const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  disabled,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
          error ? 'border-danger-300 bg-danger-50 dark:bg-danger-900/20 dark:border-danger-600' : 'border-gray-300 dark:border-gray-600'
        }`}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && (
        <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{error}</p>
      )}
    </div>
  );
};
