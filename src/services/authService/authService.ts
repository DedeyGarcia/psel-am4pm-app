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
  GetUserResponseDTO,
} from './types';
import { User } from '../../../types/user';

const toUser = (dto: GetUserResponseDTO): User => ({
  id: dto.id,
  name: dto.nome,
  login: dto.login,
  createdAt: dto.criado_em,
  updatedAt: dto.alterado_em,
});

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
    return toUser(data);
  },

  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get<GetUserResponseDTO>('/usuarios/me');
    return toUser(data);
  },
};
