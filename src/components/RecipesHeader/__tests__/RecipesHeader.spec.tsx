import { screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import type { UseQueryResult } from '@tanstack/react-query';
import { renderWithProviders } from '../../../testUtils/renderWithProviders';
import { buildUser } from '../../../testUtils/factories/auth';
import { useUser } from '../../../hooks/user/useUser';
import type { User } from '../../../../types/user';
import RecipesHeader from '../RecipesHeader';

jest.mock('../../../hooks/user/useUser');

const mockedUseUser = jest.mocked(useUser);

const initialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

function mockUser(user: User | undefined) {
  mockedUseUser.mockReturnValue({
    data: user,
  } as UseQueryResult<User>);
}

function renderHeader() {
  return renderWithProviders(
    <SafeAreaProvider initialMetrics={initialMetrics}>
      <RecipesHeader {...({} as NativeStackHeaderProps)} />
    </SafeAreaProvider>,
  );
}

describe('RecipesHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should always render the static title', async () => {
    mockUser(undefined);

    await renderHeader();

    expect(screen.getByText('Suas Receitas')).toBeOnTheScreen();
  });

  it('should greet the user by name when the user is loaded', async () => {
    mockUser(buildUser({ name: 'Fulano' }));

    await renderHeader();

    expect(screen.getByText('Olá Fulano, aqui estão')).toBeOnTheScreen();
  });

  it('should not render the greeting when there is no user', async () => {
    mockUser(undefined);

    await renderHeader();

    expect(screen.queryByText(/aqui estão/)).not.toBeOnTheScreen();
  });
});
