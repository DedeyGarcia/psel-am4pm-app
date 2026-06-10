import { screen, userEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AxiosError } from 'axios';
import { renderWithProviders } from '../../../../testUtils/renderWithProviders';
import { createTestStack } from '../../../../testUtils/createTestStack';
import { authService } from '../../../../services/authService/authService';
import { useAuthStore } from '../../../../store/authStore';
import { buildLoginResponseDTO } from '../../../../testUtils/factories/auth';
import LoginScreen from '../LoginScreen';
import SignUpScreen from '../../signup/SignUpScreen';

jest.mock('../../../../services/authService/authService');

const mockedAuthService = jest.mocked(authService);
const Stack = createTestStack();

const unauthorizedError = new AxiosError(
  'Unauthorized',
  'ERR',
  undefined,
  undefined,
  { status: 401 } as AxiosError['response'],
);

function renderScreen() {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>,
  );
}

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({ token: null });
  });

  it('should not call login and show validation errors when fields are empty', async () => {
    const user = userEvent.setup();
    await renderScreen();

    await user.press(screen.getByRole('button', { name: 'Entrar' }));

    expect(
      await screen.findAllByText('Este campo é obrigatório.'),
    ).not.toHaveLength(0);
    expect(mockedAuthService.login).not.toHaveBeenCalled();
  });

  it('should sign the user in when submitting valid credentials', async () => {
    const user = userEvent.setup();
    mockedAuthService.login.mockResolvedValue(
      buildLoginResponseDTO({ access_token: 'token-123' }),
    );
    await renderScreen();

    await user.type(screen.getByPlaceholderText('Digite seu login'), 'fulano');
    await user.type(screen.getByPlaceholderText('Digite sua senha'), 'secret');
    await user.press(screen.getByRole('button', { name: 'Entrar' }));

    await waitFor(() =>
      expect(mockedAuthService.login).toHaveBeenCalledWith({
        login: 'fulano',
        password: 'secret',
      }),
    );
    await waitFor(() =>
      expect(useAuthStore.getState().token).toBe('token-123'),
    );
  });

  it('should show an invalid credentials message on a 401 response', async () => {
    const user = userEvent.setup();
    mockedAuthService.login.mockRejectedValue(unauthorizedError);
    await renderScreen();

    await user.type(screen.getByPlaceholderText('Digite seu login'), 'fulano');
    await user.type(screen.getByPlaceholderText('Digite sua senha'), 'wrong');
    await user.press(screen.getByRole('button', { name: 'Entrar' }));

    expect(
      await screen.findByText('Login ou senha inválidos.'),
    ).toBeOnTheScreen();
  });

  it('should navigate to SignUp when pressing create account', async () => {
    const user = userEvent.setup();
    await renderScreen();

    await user.press(screen.getByRole('button', { name: 'Criar Conta' }));

    expect(await screen.findByPlaceholderText('Digite seu nome')).toBeVisible();
  });
});
