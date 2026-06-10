import type { User } from '../../../types/user';
import type {
  LoginResponseDTO,
  SignUpResponseDTO,
} from '../../services/authService/types';

export const buildLoginResponseDTO = (
  overrides: Partial<LoginResponseDTO> = {},
): LoginResponseDTO => ({
  access_token: 'token-123',
  ...overrides,
});

export const buildSignUpResponseDTO = (
  overrides: Partial<SignUpResponseDTO> = {},
): SignUpResponseDTO => ({
  id: 1,
  nome: 'Fulano',
  login: 'fulano',
  criado_em: '2026-01-01',
  alterado_em: '2026-01-02',
  ...overrides,
});

export const buildUser = (overrides: Partial<User> = {}): User => ({
  id: 1,
  name: 'Fulano',
  login: 'fulano',
  createdAt: '2026-01-01',
  updatedAt: '2026-01-02',
  ...overrides,
});
