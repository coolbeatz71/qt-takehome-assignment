/**
 * API response wrapper interface
 * @property {boolean} success - Indicates if the request was successful
 * @property {T} data - Response data
 * @property {string} error - Error message if request failed
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}