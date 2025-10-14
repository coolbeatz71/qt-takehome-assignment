export const CONTENT_TYPES = {
  PROTOBUF: 'application/x-protobuf',
} as const;

export const CACHE_CONTROL = {
  NO_STORE: 'no-store',
} as const;

export const ERROR_MESSAGES = {
  INVALID_USER_ID: 'Invalid user ID',
  USER_NOT_FOUND: 'User not found',
  DUPLICATE_EMAIL: 'Email already exists',
  MISSING_REQUIRED_FIELDS: 'Missing required fields: email, role, status',
  INVALID_ROLE: 'Invalid role. Must be: admin, user, or guest',
  INVALID_STATUS: 'Invalid status. Must be: active or inactive',
  FAILED_TO_FETCH_USERS: 'Failed to fetch users',
  FAILED_TO_FETCH_USER: 'Failed to fetch user',
  FAILED_TO_CREATE_USER: 'Failed to create user',
  FAILED_TO_UPDATE_USER: 'Failed to update user',
  FAILED_TO_DELETE_USER: 'Failed to delete user',
  FAILED_TO_EXPORT_USERS: 'Failed to export users',
  FAILED_TO_FETCH_STATISTICS: 'Failed to fetch statistics',
  FAILED_TO_RETRIEVE_PUBLIC_KEY: 'Failed to retrieve public key',
} as const;
