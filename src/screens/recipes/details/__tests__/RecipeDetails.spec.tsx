import { screen, userEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native-paper';
import { renderWithProviders } from '../../../../testUtils/renderWithProviders';
import { createTestStack } from '../../../../testUtils/createTestStack';
import { recipeService } from '../../../../services/recipeService/recipeService';
import { categoryService } from '../../../../services/categoryService/categoryService';
import { buildRecipe } from '../../../../testUtils/factories/recipe';
import { buildCategory } from '../../../../testUtils/factories/category';
import RNPrint from 'react-native-print';
import RecipeDetails from '../RecipeDetails';

jest.mock('../../../../services/recipeService/recipeService');
jest.mock('../../../../services/categoryService/categoryService');
jest.mock('react-native-print', () => ({
  __esModule: true,
  default: { print: jest.fn() },
}));

const mockedRecipeService = jest.mocked(recipeService);
const mockedCategoryService = jest.mocked(categoryService);
const mockedRNPrint = jest.mocked(RNPrint);
const Stack = createTestStack();

function RecipesPlaceholder() {
  const navigation = useNavigation<any>();
  return (
    <Button onPress={() => navigation.navigate('RecipeDetails', { id: '10' })}>
      Abrir detalhes
    </Button>
  );
}

function RecipeEditPlaceholder() {
  return <Text>Tela de edição</Text>;
}

function renderScreen() {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Recipes">
        <Stack.Screen name="Recipes" component={RecipesPlaceholder} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
        <Stack.Screen name="RecipeEdit" component={RecipeEditPlaceholder} />
      </Stack.Navigator>
    </NavigationContainer>,
  );
}

async function openDetails(user: ReturnType<typeof userEvent.setup>) {
  await renderScreen();
  await user.press(screen.getByText('Abrir detalhes'));
  await screen.findByText('Bolo de Cenoura');
}

describe('RecipeDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedRecipeService.getById.mockResolvedValue(
      buildRecipe({
        id: 10,
        name: 'Bolo de Cenoura',
        categoryId: 1,
        ingredients: 'farinha, ovos',
        directions: 'misture e asse',
      }),
    );
    mockedRecipeService.delete.mockResolvedValue(buildRecipe());
    mockedCategoryService.getAll.mockResolvedValue([
      buildCategory({ id: 1, name: 'Doces' }),
    ]);
  });

  it('should render the recipe details once loaded', async () => {
    const user = userEvent.setup();
    await openDetails(user);

    expect(mockedRecipeService.getById).toHaveBeenCalledWith('10');
    expect(screen.getByText('Categoria: Doces')).toBeOnTheScreen();
    expect(screen.getByText('farinha, ovos')).toBeOnTheScreen();
    expect(screen.getByText('misture e asse')).toBeOnTheScreen();
  });

  it('should delete the recipe and go back when pressing Deletar', async () => {
    const user = userEvent.setup();
    await openDetails(user);

    await user.press(screen.getByRole('button'));
    await user.press(screen.getByText('Deletar'));

    await waitFor(() =>
      expect(mockedRecipeService.delete).toHaveBeenCalledWith('10'),
    );
    expect(await screen.findByText('Abrir detalhes')).toBeOnTheScreen();
  });

  it('should navigate to the edit screen when pressing Editar', async () => {
    const user = userEvent.setup();
    await openDetails(user);

    await user.press(screen.getByRole('button'));
    await user.press(screen.getByText('Editar'));

    expect(await screen.findByText('Tela de edição')).toBeOnTheScreen();
    expect(mockedRecipeService.delete).not.toHaveBeenCalled();
  });

  it('should print the recipe when pressing print button', async () => {
    const user = userEvent.setup();
    await openDetails(user);

    await user.press(screen.getByRole('button'));
    await user.press(screen.getByText('Imprimir'));

    await waitFor(() => expect(mockedRNPrint.print).toHaveBeenCalledTimes(1));
    expect(mockedRNPrint.print).toHaveBeenCalledWith({
      html: expect.stringContaining('Bolo de Cenoura'),
    });
  });
});
