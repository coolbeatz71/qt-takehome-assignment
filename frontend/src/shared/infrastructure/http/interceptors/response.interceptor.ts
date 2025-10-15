import type { AxiosResponse, AxiosError } from 'axios';
import { errorMessages } from '../../../constants/error-messages';
import type { ApiResponse } from '../types/ApiResponse';

/**
 * Response interceptor to handle successful responses
 * @param {AxiosResponse} response - Axios response
 * @returns {AxiosResponse} Response object
 */
export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

/**
 * Response error interceptor to handle API errors
 * @param {AxiosError} error - Axios error
 * @returns {Promise<never>} Rejected promise with transformed error
 */
export const responseErrorInterceptor = (error: AxiosError): Promise<never> => {
  if (error.response) {
    const apiError = error.response.data as ApiResponse<never>;
    return Promise.reject(new Error(apiError.error || errorMessages.api.genericError));
  } else if (error.request) {
    return Promise.reject(new Error(errorMessages.api.noResponse));
  } else {
    return Promise.reject(new Error(error.message || errorMessages.api.unexpectedError));
  }
};
