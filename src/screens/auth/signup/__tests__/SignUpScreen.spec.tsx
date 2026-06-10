import { screen, userEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { renderWithProviders } from '../../../../testUtils/renderWithProviders';
import { createTestStack } from '../../../../testUtils/createTestStack';
import { authService } from '../../../../services/authService/authService';
import { useAuthStore } from '../../../../store/authStore';
import {
  buildLoginResponseDTO,
  buildUser,
} from '../../../../testUtils/factories/auth';
import SignUpScreen from '../SignUpScreen';
import LoginScreen from '../../login/LoginScreen';

jest.mock('../../../../services/authService/authService');

const mockedAuthService = jest.mocked(authService);
const Stack = createTestStack();

const fillForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByPlaceholderText('Digite seu nome'), 'Fulano');
  await user.type(screen.getByPlaceholderText('Digite seu login'), 'fulano');
  await user.type(screen.getByPlaceholderText('Digite sua senha'), 'secret123');
};

function renderScreen() {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>,
  );
}

describe('SignUpScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({ token: null });
  });

  it('should not call signUp and show validation errors when fields are empty', async () => {
    const user = userEvent.setup();
    await renderScreen();

    await user.press(screen.getByRole('button', { name: 'Criar Conta' }));

    expect(
      await screen.findAllByText('Este campo é obrigatório.'),
    ).not.toHaveLength(0);
    expect(mockedAuthService.signUp).not.toHaveBeenCalled();
  });

  it('should create the account and navigate to Login on success', async () => {
    const user = userEvent.setup();
    mockedAuthService.signUp.mockResolvedValue(buildUser());
    mockedAuthService.login.mockResolvedValue(buildLoginResponseDTO());
    await renderScreen();

    await fillForm(user);
    await user.press(screen.getByRole('button', { name: 'Criar Conta' }));

    await waitFor(() =>
      expect(mockedAuthService.signUp).toHaveBeenCalledWith({
        name: 'Fulano',
        login: 'fulano',
        password: 'secret123',
      }),
    );
    expect(
      await screen.findByPlaceholderText('Digite sua senha'),
    ).toBeVisible();
    expect(screen.queryByPlaceholderText('Digite seu nome')).toBeNull();
  });

  it('should show the auto-login error and stay on the screen when login fails after signup', async () => {
    const user = userEvent.setup();
    mockedAuthService.signUp.mockResolvedValue(buildUser());
    mockedAuthService.login.mockRejectedValue(new Error('login failed'));
    await renderScreen();

    await fillForm(user);
    await user.press(screen.getByRole('button', { name: 'Criar Conta' }));

    expect(
      await screen.findByText(
        'Conta criada, mas não foi possível entrar automaticamente.',
      ),
    ).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Digite seu nome')).toBeVisible();
  });

  it('should navigate to Login when pressing the sign in button', async () => {
    const user = userEvent.setup();
    await renderScreen();

    await user.press(screen.getByRole('button', { name: 'Entrar' }));

    expect(
      await screen.findByPlaceholderText('Digite sua senha'),
    ).toBeVisible();
    expect(screen.queryByPlaceholderText('Digite seu nome')).toBeNull();
  });
});
