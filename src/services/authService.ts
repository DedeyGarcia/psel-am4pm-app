import { LoginCredentials, LoginResponse } from '../../types/auth';
import { apiClient } from '../api/client';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post<LoginResponse>('/auth/login', {
      login: credentials.login,
      senha: credentials.password,
    });
    return response.data.access_token;
  },
};
