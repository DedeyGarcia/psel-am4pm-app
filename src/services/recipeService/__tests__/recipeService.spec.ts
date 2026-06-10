import type { CreateRecipe, Recipe } from '../../../../types/recipe';
import { apiClient } from '../../../api/client';
import { axiosResponse } from '../../../test-utils/axiosResponse';
import { recipeService } from '../recipeService';
import type { CreateRecipeRequestDTO, RecipeResponseDTO } from '../types';

jest.mock('../../../api/client', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockedApiClient = jest.mocked(apiClient);

const recipeResponse: RecipeResponseDTO = {
  id: 10,
  id_categorias: 2,
  id_usuarios: 5,
  nome: 'Bolo',
  tempo_preparo_minutos: 45,
  porcoes: 8,
  modo_preparo: 'misture e asse',
  ingredientes: 'farinha, ovos',
  criado_em: '2026-01-01',
  alterado_em: '2026-01-02',
};

const expectedRecipe: Recipe = {
  id: 10,
  categoryId: 2,
  userId: 5,
  name: 'Bolo',
  preparationTimeMinutes: 45,
  servings: 8,
  directions: 'misture e asse',
  ingredients: 'farinha, ovos',
  createdAt: '2026-01-01',
  updatedAt: '2026-01-02',
};

const newRecipe: CreateRecipe = {
  name: 'Bolo',
  categoryId: 2,
  preparationTimeMinutes: 45,
  servings: 8,
  directions: 'misture e asse',
  ingredients: 'farinha, ovos',
};

const expectedRequestDTO: CreateRecipeRequestDTO = {
  nome: 'Bolo',
  id_categorias: 2,
  tempo_preparo_minutos: 45,
  porcoes: 8,
  modo_preparo: 'misture e asse',
  ingredientes: 'farinha, ovos',
};

describe('recipeService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserRecipes', () => {
    it('should request the recipes endpoint and map every item', async () => {
      mockedApiClient.get.mockResolvedValue(
        axiosResponse<RecipeResponseDTO[]>([recipeResponse]),
      );

      const recipes = await recipeService.getUserRecipes();

      expect(mockedApiClient.get).toHaveBeenCalledWith('/receitas');
      expect(recipes).toEqual<Recipe[]>([expectedRecipe]);
    });
  });

  describe('getById', () => {
    it('should request a single recipe by id and map the response', async () => {
      mockedApiClient.get.mockResolvedValue(
        axiosResponse<RecipeResponseDTO>(recipeResponse),
      );

      const recipe = await recipeService.getById('10');

      expect(mockedApiClient.get).toHaveBeenCalledWith('/receitas/10');
      expect(recipe).toEqual<Recipe>(expectedRecipe);
    });
  });

  describe('create', () => {
    it('should post the mapped request DTO and map the response back', async () => {
      mockedApiClient.post.mockResolvedValue(
        axiosResponse<RecipeResponseDTO>(recipeResponse),
      );

      const recipe = await recipeService.create(newRecipe);

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        '/receitas',
        expectedRequestDTO,
      );
      expect(recipe).toEqual<Recipe>(expectedRecipe);
    });
  });

  describe('update', () => {
    it('should patch the recipe by id with the mapped request DTO', async () => {
      mockedApiClient.patch.mockResolvedValue(
        axiosResponse<RecipeResponseDTO>(recipeResponse),
      );

      const recipe = await recipeService.update('10', newRecipe);

      expect(mockedApiClient.patch).toHaveBeenCalledWith(
        '/receitas/10',
        expectedRequestDTO,
      );
      expect(recipe).toEqual<Recipe>(expectedRecipe);
    });
  });

  describe('delete', () => {
    it('should delete the recipe by id and map the response', async () => {
      mockedApiClient.delete.mockResolvedValue(
        axiosResponse<RecipeResponseDTO>(recipeResponse),
      );

      const recipe = await recipeService.delete('10');

      expect(mockedApiClient.delete).toHaveBeenCalledWith('/receitas/10');
      expect(recipe).toEqual<Recipe>(expectedRecipe);
    });
  });
});
