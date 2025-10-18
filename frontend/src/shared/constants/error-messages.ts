/**
 * Error messages used throughout the application
 * Organized by domain/feature for better maintainability
 *
 * @property {Object} api - API-related error messages
 * @property {string} api.genericError - Generic API error
 * @property {string} api.noResponse - No response from server
 * @property {string} api.unexpectedError - Unexpected error occurred
 * @property {Object} user - User-related error messages
 * @property {string} user.fetchAllFailed - Failed to fetch all users
 * @property {string} user.fetchOneFailed - Failed to fetch a single user
 * @property {string} user.createFailed - Failed to create a new user
 * @property {string} user.updateFailed - Failed to update an existing user
 * @property {string} user.deleteFailed - Failed to delete a user
 * @property {Object} crypto - Cryptography-related error messages
 * @property {string} crypto.publicKeyFailed - Failed to retrieve the public key
 * @property {string} crypto.invalidSignature - Invalid DER signature format
 * @property {Object} stats - Statistics-related error messages
 * @property {string} stats.fetchFailed - Failed to fetch statistics
 * @property {Object} protobuf - Protocol Buffer-related error messages
 * @property {string} protobuf.exportFailed - Failed to export users data
 * @property {Object} validation - Form validation error messages
 * @property {string} validation.emailRequired - Email is required
 * @property {string} validation.emailInvalid - Email format is invalid
 * @property {string} validation.roleRequired - Role is required
 * @property {string} validation.statusRequired - Status is required
 */
export const errorMessages = {
  api: {
    genericError: 'An error occurred',
    noResponse: 'No response from server. Please check if backend is running.',
    unexpectedError: 'An unexpected error occurred',
  },
  user: {
    fetchAllFailed: 'Failed to fetch users',
    fetchOneFailed: 'Failed to fetch user',
    createFailed: 'Failed to create user',
    createSuccess: 'User created successfully',
    updateFailed: 'Failed to update user',
    updateSuccess: 'User updated successfully',
    deleteFailed: 'Failed to delete user',
    deleteSuccess: 'User deleted successfully',
  },
  crypto: {
    publicKeyFailed: 'Failed to fetch public key',
    invalidSignature: 'Invalid DER signature',
  },
  stats: {
    fetchFailed: 'Failed to fetch statistics',
  },
  protobuf: {
    exportFailed: 'Failed to export users data',
  },
  validation: {
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    roleRequired: 'Role is required',
    statusRequired: 'Status is required',
  },
} as const;