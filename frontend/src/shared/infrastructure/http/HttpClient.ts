import axios, { AxiosInstance } from 'axios';
import { requestInterceptor, requestErrorInterceptor } from './interceptors/request.interceptor';
import { responseInterceptor, responseErrorInterceptor } from './interceptors/response.interceptor';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * HTTP client instance for API communication
 */
export const httpClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

httpClient.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
httpClient.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
