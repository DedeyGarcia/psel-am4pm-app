import { screen, userEvent, waitFor } from '@testing-library/react-native';
import { renderWithProviders } from '../../../testUtils/renderWithProviders';
import { buildCategory } from '../../../testUtils/factories/category';
import RecipeForm, { RecipeFormProps } from '../RecipeForm';

const setup = (props: Partial<RecipeFormProps> = {}) =>
  renderWithProviders(
    <RecipeForm
      submitLabel="Salvar"
      onSubmit={jest.fn()}
      categories={[buildCategory({ id: 1, name: 'Doces' })]}
      {...props}
    />,
  );

const fillTextFields = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByPlaceholderText('Digite o nome da receita'), 'Bolo');
  await user.type(
    screen.getByPlaceholderText('Digite o tempo de preparo em minutos'),
    '45',
  );
  await user.type(
    screen.getByPlaceholderText('Digite a quantidade de porções'),
    '8',
  );
  await user.type(screen.getByPlaceholderText('Digite os ingredientes'), 'farinha');
  await user.type(screen.getByPlaceholderText('Digite o modo de preparo'), 'misturar');
};

describe('RecipeForm', () => {
  it('should submit the form with numeric fields coerced to numbers', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    await setup({ onSubmit, initialValues: { categoryId: '1' } });

    await fillTextFields(user);
    await user.press(screen.getByRole('button', { name: 'Salvar' }));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(
        {
          name: 'Bolo',
          categoryId: 1,
          preparationTimeMinutes: 45,
          servings: 8,
          ingredients: 'farinha',
          directions: 'misturar',
        },
        expect.anything(),
      ),
    );
  });

  it('should not submit and should show validation errors when fields are empty', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    await setup({ onSubmit });

    await user.press(screen.getByRole('button', { name: 'Salvar' }));

    expect(await screen.findAllByText('Este campo é obrigatório.')).not.toHaveLength(0);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should show the general error message when an error is provided', async () => {
    await setup({ error: new Error('Falha ao salvar receita.') });

    expect(screen.getByText('Falha ao salvar receita.')).toBeOnTheScreen();
  });

  it('should disable the submit button while pending', async () => {
    await setup({ isPending: true });

    expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled();
  });
});
