const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

/**
 * Validate user form data
 * @param {Object} formData - Form data to validate
 * @param {string} formData.email - User email
 * @param {string} formData.role - User role
 * @param {string} formData.status - User status
 * @returns {Record<string, string>} Validation errors
 */
export const validateUserForm = (formData: {
  email: string;
  role: string;
  status: string;
}): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.role) {
    errors.role = 'Role is required';
  }

  if (!formData.status) {
    errors.status = 'Status is required';
  }

  return errors;
};