import { renderHook, waitFor } from '@testing-library/react-native';
import { createQueryClientWrapper } from '../../testUtils/createQueryClientWrapper';
import {
  buildLoginResponseDTO,
  buildUser,
} from '../../testUtils/factories/auth';
import { authService } from '../../services/authService/authService';
import { useAuthStore } from '../../store/authStore';
import { AutoLoginError, useSignUp } from '../useSignUp';

jest.mock('../../services/authService/authService');

const mockedAuthService = jest.mocked(authService);
const initialAuthState = useAuthStore.getState();

const credentials = { name: 'Fulano', login: 'fulano', password: 'secret' };

describe('useSignUp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState(initialAuthState);
  });

  it('should create the account and then auto login with the same credentials', async () => {
    mockedAuthService.signUp.mockResolvedValue(buildUser());
    mockedAuthService.login.mockResolvedValue(buildLoginResponseDTO());
    const { wrapper } = createQueryClientWrapper();
    const { result } = await renderHook(() => useSignUp(), { wrapper });

    result.current.mutate(credentials);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockedAuthService.signUp).toHaveBeenCalledWith(credentials);
    expect(mockedAuthService.login).toHaveBeenCalledWith({
      login: 'fulano',
      password: 'secret',
    });
  });

  it('should sign in with the access token from the auto login', async () => {
    mockedAuthService.signUp.mockResolvedValue(buildUser());
    mockedAuthService.login.mockResolvedValue(
      buildLoginResponseDTO({ access_token: 'fresh-token' }),
    );
    const { wrapper } = createQueryClientWrapper();
    const { result } = await renderHook(() => useSignUp(), { wrapper });

    result.current.mutate(credentials);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(useAuthStore.getState().token).toBe('fresh-token');
  });

  it('should fail with AutoLoginError and stay signed out when the auto login fails', async () => {
    mockedAuthService.signUp.mockResolvedValue(buildUser());
    mockedAuthService.login.mockRejectedValue(new Error('login failed'));
    const { wrapper } = createQueryClientWrapper();
    const { result } = await renderHook(() => useSignUp(), { wrapper });

    result.current.mutate(credentials);

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(AutoLoginError);
    expect(useAuthStore.getState().token).toBeNull();
  });
});
