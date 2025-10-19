import { Response } from 'express';
import HttpStatus from 'http-status';

/**
 * API Response structure
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Sends a generic API response
 * @param {Response} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {boolean} success - Success flag
 * @param {T} data - Response data (optional)
 * @param {string} error - Error message (optional)
 * @returns {Response} Express response
 */
export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  data?: T,
  error?: string
): Response => {
  const response: ApiResponse<T> = { success, data, error };
  return res.status(statusCode).json(response);
};

/**
 * Sends a success response
 * @param {Response} res - Express response object
 * @param {T} data - Response data (optional)
 * @param {number} statusCode - HTTP status code (default: 200)
 * @returns {Response} Express response
 */
export const sendSuccess = <T>(res: Response, data?: T, statusCode: number = HttpStatus.OK): Response => {
  return sendResponse(res, statusCode, true, data);
};

/**
 * Sends an error response
 * @param {Response} res - Express response object
 * @param {string} error - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @returns {Response} Express response
 */
export const sendError = (res: Response, error: string, statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR): Response => {
  return sendResponse(res, statusCode, false, undefined, error);
};

