import { renderHook, waitFor } from '@testing-library/react-native';
import { createQueryClientWrapper } from '../../testUtils/createQueryClientWrapper';
import { buildLoginResponseDTO } from '../../testUtils/factories/auth';
import { authService } from '../../services/authService/authService';
import { useAuthStore } from '../../store/authStore';
import { useLogin } from '../useLogin';

jest.mock('../../services/authService/authService');

const mockedAuthService = jest.mocked(authService);
const initialAuthState = useAuthStore.getState();

describe('useLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState(initialAuthState);
  });

  it('should call authService.login with the given credentials', async () => {
    mockedAuthService.login.mockResolvedValue(buildLoginResponseDTO());
    const credentials = { login: 'user', password: 'secret' };
    const { wrapper } = createQueryClientWrapper();
    const { result } = await renderHook(() => useLogin(), { wrapper });

    result.current.mutate(credentials);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockedAuthService.login).toHaveBeenCalledWith(credentials);
  });

  it('should sign in with the returned access token on success', async () => {
    mockedAuthService.login.mockResolvedValue(
      buildLoginResponseDTO({ access_token: 'fresh-token' }),
    );
    const { wrapper } = createQueryClientWrapper();
    const { result } = await renderHook(() => useLogin(), { wrapper });

    result.current.mutate({ login: 'user', password: 'secret' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(useAuthStore.getState().token).toBe('fresh-token');
  });

  it('should not sign in when login fails', async () => {
    mockedAuthService.login.mockRejectedValue(new Error('invalid credentials'));
    const { wrapper } = createQueryClientWrapper();
    const { result } = await renderHook(() => useLogin(), { wrapper });

    result.current.mutate({ login: 'user', password: 'wrong' });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(useAuthStore.getState().token).toBeNull();
  });
});
