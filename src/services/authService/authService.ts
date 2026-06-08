import { LoginCredentials } from '../../../types/auth';
import { apiClient } from '../../api/client';
import { LoginResponseDTO, LoginRequestDTO } from './types';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await apiClient.post<LoginResponseDTO>('/auth/login', {
      login: credentials.login,
      senha: credentials.password,
    } satisfies LoginRequestDTO);
    return data.access_token;
  },
};
