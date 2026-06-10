import type { AxiosAdapter, InternalAxiosRequestConfig } from 'axios';
import { apiClient } from '../client';
import { useAuthStore } from '../../store/authStore';
import { axiosResponse } from '../../testUtils/axiosResponse';

const initialAuthState = useAuthStore.getState();
const originalAdapter = apiClient.defaults.adapter;

describe('apiClient interceptors', () => {
  beforeEach(() => {
    useAuthStore.setState(initialAuthState);
  });

  afterEach(() => {
    apiClient.defaults.adapter = originalAdapter;
  });

  describe('request interceptor', () => {
    it('should attach auth headers when there is a token', async () => {
      useAuthStore.getState().signIn('my-token');

      let sentConfig: InternalAxiosRequestConfig | undefined;
      apiClient.defaults.adapter = (async config => {
        sentConfig = config;
        return axiosResponse({});
      }) as AxiosAdapter;

      await apiClient.get('/receitas');

      expect(sentConfig?.headers.Authorization).toBe('Bearer my-token');
      expect(sentConfig?.headers['x-api-key']).toBeTruthy();
    });

    it('should not attach auth headers when signed out', async () => {
      let sentConfig: InternalAxiosRequestConfig | undefined;
      apiClient.defaults.adapter = (async config => {
        sentConfig = config;
        return axiosResponse({});
      }) as AxiosAdapter;

      await apiClient.get('/receitas');

      expect(sentConfig?.headers.Authorization).toBeUndefined();
      expect(sentConfig?.headers['x-api-key']).toBeUndefined();
    });
  });

  describe('response interceptor', () => {
    const rejectWithStatus = (status: number): AxiosAdapter =>
      (async config => {
        const error = new Error(`Request failed with status code ${status}`);
        Object.assign(error, {
          config,
          response: { ...axiosResponse({}), status },
        });
        return Promise.reject(error);
      }) as AxiosAdapter;

    it('should sign out on a 401 response', async () => {
      useAuthStore.getState().signIn('my-token');
      apiClient.defaults.adapter = rejectWithStatus(401);

      await expect(apiClient.get('/receitas')).rejects.toBeDefined();

      expect(useAuthStore.getState().token).toBeNull();
    });

    it('should keep the session on other error statuses', async () => {
      useAuthStore.getState().signIn('my-token');
      apiClient.defaults.adapter = rejectWithStatus(500);

      await expect(apiClient.get('/receitas')).rejects.toBeDefined();

      expect(useAuthStore.getState().token).toBe('my-token');
    });
  });
});
