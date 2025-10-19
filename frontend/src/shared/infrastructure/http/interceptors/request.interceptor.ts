import type { InternalAxiosRequestConfig } from 'axios';

/**
 * Request interceptor to add headers or modify request before sending
 * @param {InternalAxiosRequestConfig} config - Axios request configuration
 * @returns {InternalAxiosRequestConfig} Modified request configuration
 */
export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  return config;
};

/**
 * Request error interceptor
 * @param {unknown} error - Request error
 * @returns {Promise<never>} Rejected promise with error
 */
export const requestErrorInterceptor = (error: unknown): Promise<never> => {
  return Promise.reject(error);
};