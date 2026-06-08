import axios from 'axios';
import { RECEIPES_API, API_KEY } from '@env';
import { useAuthStore } from '../store/authStore';

export const apiClient = axios.create({
  baseURL: RECEIPES_API,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['x-api-key'] = API_KEY;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      useAuthStore.getState().signOut();
    }
    return Promise.reject(error);
  },
);
