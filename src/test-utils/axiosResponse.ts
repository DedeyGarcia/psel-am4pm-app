import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

/**
 * Builds a fully-typed AxiosResponse around `data` so mocked apiClient calls
 * keep the same payload shape the services expect at runtime.
 */
export const axiosResponse = <T>(data: T): AxiosResponse<T> => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: { headers: {} } as InternalAxiosRequestConfig,
});
