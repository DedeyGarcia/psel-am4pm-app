import type { Session } from '../../../../types/auth';
import type { User } from '../../../../types/user';
import { apiClient } from '../../../api/client';
import { axiosResponse } from '../../../test-utils/axiosResponse';
import { authService } from '../authService';
import type {
  LoginRequestDTO,
  LoginResponseDTO,
  SignUpRequestDTO,
  SignUpResponseDTO,
} from '../types';

jest.mock('../../../api/client', () => ({
  apiClient: { post: jest.fn() },
}));

const mockedApiClient = jest.mocked(apiClient);

const signUpResponse: SignUpResponseDTO = {
  id: 1,
  nome: 'Fulano',
  login: 'fulano',
  criado_em: '2026-01-01',
  alterado_em: '2026-01-02',
};

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should post credentials to the login endpoint with the API field names', async () => {
      mockedApiClient.post.mockResolvedValue(
        axiosResponse<LoginResponseDTO>({ access_token: 'token-123' }),
      );

      await authService.login({ login: 'user', password: 'secret' });

      expect(mockedApiClient.post).toHaveBeenCalledWith('/auth/login', {
        login: 'user',
        senha: 'secret',
      } satisfies LoginRequestDTO);
    });

    it('should return the session payload', async () => {
      mockedApiClient.post.mockResolvedValue(
        axiosResponse<LoginResponseDTO>({ access_token: 'token-123' }),
      );

      const session = await authService.login({
        login: 'user',
        password: 'secret',
      });

      expect(session).toEqual<Session>({ access_token: 'token-123' });
    });
  });

  describe('signUp', () => {
    it('should post the account data with the API field names', async () => {
      mockedApiClient.post.mockResolvedValue(
        axiosResponse<SignUpResponseDTO>(signUpResponse),
      );

      await authService.signUp({
        name: 'Fulano',
        login: 'fulano',
        password: 'secret',
      });

      expect(mockedApiClient.post).toHaveBeenCalledWith('/usuarios', {
        nome: 'Fulano',
        login: 'fulano',
        senha: 'secret',
      } satisfies SignUpRequestDTO);
    });

    it('should map the response DTO to a domain user', async () => {
      mockedApiClient.post.mockResolvedValue(
        axiosResponse<SignUpResponseDTO>(signUpResponse),
      );

      const user = await authService.signUp({
        name: 'Fulano',
        login: 'fulano',
        password: 'secret',
      });

      expect(user).toEqual<User>({
        id: 1,
        name: 'Fulano',
        login: 'fulano',
        createdAt: '2026-01-01',
        updatedAt: '2026-01-02',
      });
    });
  });
});
