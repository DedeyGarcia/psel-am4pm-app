import { fireEvent, screen, userEvent } from '@testing-library/react-native';
import { renderWithProviders } from '../../../testUtils/renderWithProviders';
import PasswordInput, { PasswordInputProps } from '../PasswordInput';

const setup = (props: Partial<PasswordInputProps> = {}) =>
  renderWithProviders(
    <PasswordInput
      label="Senha"
      placeholder="Digite sua senha"
      value=""
      onBlur={jest.fn()}
      onChangeText={jest.fn()}
      error={false}
      {...props}
    />,
  );

const getInput = () => screen.getByPlaceholderText('Digite sua senha');

describe('PasswordInput', () => {
  it('should hide the password by default', async () => {
    await setup();

    expect(getInput()).toHaveProp('secureTextEntry', true);
  });

  it('should reveal the password when the eye icon is pressed', async () => {
    const user = userEvent.setup();
    await setup();

    await user.press(screen.getByRole('button'));

    expect(getInput()).toHaveProp('secureTextEntry', false);
  });

  it('should hide the password again when the eye icon is pressed twice', async () => {
    const user = userEvent.setup();
    await setup();
    const eyeIcon = screen.getByRole('button');

    await user.press(eyeIcon);
    await user.press(eyeIcon);

    expect(getInput()).toHaveProp('secureTextEntry', true);
  });

  it('should forward typed text through onChangeText', async () => {
    const onChangeText = jest.fn();
    await setup({ onChangeText });

    await fireEvent.changeText(getInput(), 'minha-senha');

    expect(onChangeText).toHaveBeenCalledWith('minha-senha');
  });

  it('should show the error message when provided', async () => {
    await setup({ error: true, errorMessage: 'Senha obrigatória.' });

    expect(screen.getByText('Senha obrigatória.')).toBeOnTheScreen();
  });
});
