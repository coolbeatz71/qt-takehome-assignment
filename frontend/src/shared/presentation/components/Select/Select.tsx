import React from 'react';

/**
 * Select option interface
 * @property {string} value - Option value
 * @property {string} label - Option label
 */
export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Select component props
 * @property {string} id - Select ID
 * @property {string} label - Select label
 * @property {string} value - Selected value
 * @property {Function} onChange - Change handler
 * @property {SelectOption[]} options - Select options
 * @property {string} error - Error message
 * @property {boolean} disabled - Disabled state
 */
interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  disabled?: boolean;
}

/**
 * Select component with label and error display
 * @param {SelectProps} props - Component props
 * @returns {JSX.Element} Select component
 */
export const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  error,
  disabled,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 pr-8 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
          error ? 'border-danger-300 dark:border-danger-600' : 'border-gray-300 dark:border-gray-600'
        }`}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{error}</p>
      )}
    </div>
  );
};
