import type { Session } from '../../../../types/auth';
import { apiClient } from '../../../api/client';
import { axiosResponse } from '../../../testUtils/axiosResponse';
import {
  buildLoginResponseDTO,
  buildSignUpResponseDTO,
  buildUser,
} from '../../../testUtils/factories/auth';
import { authService } from '../authService';
import type { LoginRequestDTO, SignUpRequestDTO } from '../types';

jest.mock('../../../api/client');

const mockedApiClient = jest.mocked(apiClient);

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should call the login endpoint with the correct payload', async () => {
      mockedApiClient.post.mockResolvedValue(
        axiosResponse(buildLoginResponseDTO()),
      );

      await authService.login({ login: 'user', password: 'secret' });

      expect(mockedApiClient.post).toHaveBeenCalledWith('/auth/login', {
        login: 'user',
        senha: 'secret',
      } satisfies LoginRequestDTO);
    });

    it('should return the session payload', async () => {
      mockedApiClient.post.mockResolvedValue(
        axiosResponse(buildLoginResponseDTO()),
      );

      const session = await authService.login({
        login: 'user',
        password: 'secret',
      });

      expect(session).toEqual<Session>(buildLoginResponseDTO());
    });
  });

  describe('signUp', () => {
    it('should call the create account endpoint with the correct payload', async () => {
      mockedApiClient.post.mockResolvedValue(
        axiosResponse(buildSignUpResponseDTO()),
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

    it('should call the sign up endpoint and return the correct payload', async () => {
      mockedApiClient.post.mockResolvedValue(
        axiosResponse(buildSignUpResponseDTO()),
      );

      const user = await authService.signUp({
        name: 'Fulano',
        login: 'fulano',
        password: 'secret',
      });

      expect(user).toEqual(buildUser());
    });
  });
});
