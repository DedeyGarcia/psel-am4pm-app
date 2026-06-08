import { LoginCredentials, SignUpCredentials } from '../../../types/auth';
import { apiClient } from '../../api/client';
import {
  LoginResponseDTO,
  LoginRequestDTO,
  SignUpRequestDTO,
  SignUpResponseDTO,
} from './types';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await apiClient.post<LoginResponseDTO>('/auth/login', {
      login: credentials.login,
      senha: credentials.password,
    } satisfies LoginRequestDTO);
    return data.access_token;
  },

  signUp: async (credentials: SignUpCredentials) => {
    const { data } = await apiClient.post<SignUpResponseDTO>('/usuarios', {
      nome: credentials.name,
      login: credentials.login,
      senha: credentials.password,
    } satisfies SignUpRequestDTO);
    return data;
  },
};
