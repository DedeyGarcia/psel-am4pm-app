import axios from 'axios';
import { RECEIPES_API } from '@env';
import { useAuthStore } from '../store/authStore';

export const api = axios.create({
  baseURL: RECEIPES_API,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      useAuthStore.getState().signOut();
    }
    return Promise.reject(error);
  },
);
