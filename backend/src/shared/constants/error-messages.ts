/**
 * Error messages used throughout the application
 * Organized by domain/feature for better maintainability
 *
 * @property {Object} user - User-related error messages
 * @property {string} user.invalidId - Invalid user ID format or value
 * @property {string} user.notFound - User not found in the database
 * @property {string} user.duplicateEmail - Email already exists in the system
 * @property {string} user.missingRequiredFields - Required fields are missing from the request
 * @property {string} user.invalidRole - Invalid role value provided
 * @property {string} user.invalidStatus - Invalid status value provided
 * @property {string} user.fetchAllFailed - Failed to fetch all users
 * @property {string} user.fetchOneFailed - Failed to fetch a single user
 * @property {string} user.createFailed - Failed to create a new user
 * @property {string} user.updateFailed - Failed to update an existing user
 * @property {string} user.deleteFailed - Failed to delete a user
 * @property {string} user.exportFailed - Failed to export users data
 * @property {string} user.statsFailed - Failed to fetch user statistics
 * @property {Object} crypto - Cryptography-related error messages
 * @property {string} crypto.publicKeyFailed - Failed to retrieve the public key
 * @property {string} crypto.signEmailFailed - Failed to sign email with ECDSA
 * @property {Object} protobuf - Protocol Buffer-related error messages
 * @property {string} protobuf.schemaLoadFailed - Failed to load Protocol Buffer schema
 * @property {string} protobuf.encodeFailed - Failed to encode users to Protocol Buffer format
 * @property {string} protobuf.decodeFailed - Failed to decode Protocol Buffer data
 * @property {string} protobuf.payloadVerificationFailed - Payload verification failed
 * @property {Object} validation - Validation-related error messages
 * @property {string} validation.invalidEmailFormat - Invalid email format
 * @property {Object} server - Server-related error messages
 * @property {string} server.unhandledRejection - Unhandled promise rejection
 * @property {string} server.uncaughtException - Uncaught exception
 * @property {string} server.startupFailed - Failed to start application
 */
export const errorMessages = {
  user: {
    invalidId: 'The provided user ID is invalid or malformed',
    notFound: 'The requested user could not be found in the system',
    duplicateEmail: 'A user with this email address already exists',
    missingRequiredFields: 'Required fields are missing: email, role, and status must be provided',
    invalidRole: 'Invalid user role specified. Allowed values are: admin, user, or guest',
    invalidStatus: 'Invalid user status specified. Allowed values are: active or inactive',
    fetchAllFailed: 'Unable to retrieve users from the database',
    fetchOneFailed: 'Unable to retrieve the requested user from the database',
    createFailed: 'Unable to create user due to a database error',
    updateFailed: 'Unable to update user due to a database error',
    deleteFailed: 'Unable to delete user from the database',
    exportFailed: 'Unable to export users data',
    statsFailed: 'Unable to retrieve user statistics from the database',
  },
  crypto: {
    publicKeyFailed: 'Unable to retrieve the cryptographic public key',
    signEmailFailed: 'Unable to generate cryptographic signature for the email address',
  },
  protobuf: {
    schemaLoadFailed: 'Unable to load the Protocol Buffer schema definition',
    encodeFailed: 'Unable to serialize users data to Protocol Buffer format',
    decodeFailed: 'Unable to deserialize Protocol Buffer data',
    payloadVerificationFailed: 'Protocol Buffer payload validation failed',
  },
  validation: {
    invalidEmailFormat: 'The provided email address format is invalid',
  },
  server: {
    unhandledRejection: 'Unhandled Promise Rejection',
    uncaughtException: 'Uncaught Exception',
    startupFailed: 'Application failed to start due to an initialization error',
  },
} as const;
