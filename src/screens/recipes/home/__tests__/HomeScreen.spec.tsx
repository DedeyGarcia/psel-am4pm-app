import { screen, userEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { renderWithProviders } from '../../../../testUtils/renderWithProviders';
import { createTestStack } from '../../../../testUtils/createTestStack';
import { recipeService } from '../../../../services/recipeService/recipeService';
import { categoryService } from '../../../../services/categoryService/categoryService';
import { buildRecipe } from '../../../../testUtils/factories/recipe';
import { buildCategory } from '../../../../testUtils/factories/category';
import { useRecipeFiltersStore } from '../../../../store/recipeFiltersStore';
import HomeScreen from '../HomeScreen';

jest.mock('../../../../services/recipeService/recipeService');
jest.mock('../../../../services/categoryService/categoryService');

const mockedRecipeService = jest.mocked(recipeService);
const mockedCategoryService = jest.mocked(categoryService);
const Stack = createTestStack();
const initialFiltersState = useRecipeFiltersStore.getState();

const recipes = [
  buildRecipe({ id: 1, name: 'Bolo de Cenoura', categoryId: 1 }),
  buildRecipe({ id: 2, name: 'Torta de Frango', categoryId: 2 }),
  buildRecipe({ id: 3, name: 'Pudim', categoryId: 1 }),
];

const categories = [
  buildCategory({ id: 1, name: 'Doces' }),
  buildCategory({ id: 2, name: 'Salgados' }),
];

function renderScreen() {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Recipes">
        <Stack.Screen name="Recipes" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>,
  );
}

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useRecipeFiltersStore.setState(initialFiltersState);
    mockedRecipeService.getUserRecipes.mockResolvedValue(recipes);
    mockedCategoryService.getAll.mockResolvedValue(categories);
  });

  it('should render all recipes once loaded', async () => {
    await renderScreen();

    expect(await screen.findByText('Bolo de Cenoura')).toBeOnTheScreen();
    expect(screen.getByText('Torta de Frango')).toBeOnTheScreen();
    expect(screen.getByText('Pudim')).toBeOnTheScreen();
  });

  it('should show an error message when the recipes request fails', async () => {
    mockedRecipeService.getUserRecipes.mockRejectedValue(new Error('boom'));
    await renderScreen();

    expect(
      await screen.findByText('Erro ao carregar receitas'),
    ).toBeOnTheScreen();
  });

  it('should filter recipes by the search query', async () => {
    const user = userEvent.setup();
    await renderScreen();
    await screen.findByText('Bolo de Cenoura');

    await user.type(
      screen.getByPlaceholderText('Digite o nome da receita'),
      'torta',
    );

    await waitFor(() =>
      expect(screen.queryByText('Bolo de Cenoura')).not.toBeOnTheScreen(),
    );
    expect(screen.getByText('Torta de Frango')).toBeOnTheScreen();
    expect(screen.queryByText('Pudim')).not.toBeOnTheScreen();
  });

  it('should filter recipes by the selected category', async () => {
    const user = userEvent.setup();
    await renderScreen();
    await screen.findByText('Bolo de Cenoura');

    await user.press(screen.getByText('Doces'));

    await waitFor(() =>
      expect(screen.queryByText('Torta de Frango')).not.toBeOnTheScreen(),
    );
    expect(screen.getByText('Bolo de Cenoura')).toBeOnTheScreen();
    expect(screen.getByText('Pudim')).toBeOnTheScreen();
  });

  it('should show the empty state when no recipe matches the filters', async () => {
    const user = userEvent.setup();
    await renderScreen();
    await screen.findByText('Bolo de Cenoura');

    await user.type(
      screen.getByPlaceholderText('Digite o nome da receita'),
      'inexistente',
    );

    expect(
      await screen.findByText('Nenhuma receita encontrada.'),
    ).toBeOnTheScreen();
  });
});
