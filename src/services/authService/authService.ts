import {
  LoginCredentials,
  Session,
  SignUpCredentials,
} from '../../../types/auth';
import { apiClient } from '../../api/client';
import {
  LoginResponseDTO,
  LoginRequestDTO,
  SignUpRequestDTO,
  SignUpResponseDTO,
} from './types';
import { User } from '../../../types/user';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<Session> => {
    const { data } = await apiClient.post<LoginResponseDTO>('/auth/login', {
      login: credentials.login,
      senha: credentials.password,
    } satisfies LoginRequestDTO);
    return data;
  },

  signUp: async (credentials: SignUpCredentials): Promise<User> => {
    const { data } = await apiClient.post<SignUpResponseDTO>('/usuarios', {
      nome: credentials.name,
      login: credentials.login,
      senha: credentials.password,
    } satisfies SignUpRequestDTO);
    return data;
  },
};
