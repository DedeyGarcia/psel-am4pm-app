import type { Recipe } from '../../../../types/recipe';
import { apiClient } from '../../../api/client';
import { axiosResponse } from '../../../testUtils/axiosResponse';
import {
  buildCreateRecipe,
  buildCreateRecipeRequestDTO,
  buildRecipe,
  buildRecipeResponseDTO,
} from '../../../testUtils/factories/recipe';
import { recipeService } from '../recipeService';

jest.mock('../../../api/client');

const mockedApiClient = jest.mocked(apiClient);

describe('recipeService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserRecipes', () => {
    it('should call the recipes endpoint and return the correct payload', async () => {
      mockedApiClient.get.mockResolvedValue(
        axiosResponse([buildRecipeResponseDTO()]),
      );

      const recipes = await recipeService.getUserRecipes();

      expect(mockedApiClient.get).toHaveBeenCalledWith('/receitas');
      expect(recipes).toEqual<Recipe[]>([buildRecipe()]);
    });
  });

  describe('getById', () => {
    it('should call the recipe by id endpoint and return the correct payload', async () => {
      mockedApiClient.get.mockResolvedValue(
        axiosResponse(buildRecipeResponseDTO()),
      );

      const recipe = await recipeService.getById('10');

      expect(mockedApiClient.get).toHaveBeenCalledWith('/receitas/10');
      expect(recipe).toEqual<Recipe>(buildRecipe());
    });
  });

  describe('create', () => {
    it('should call the create recipe endpoint with the correct payload', async () => {
      mockedApiClient.post.mockResolvedValue(
        axiosResponse(buildRecipeResponseDTO()),
      );

      const recipe = await recipeService.create(buildCreateRecipe());

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        '/receitas',
        buildCreateRecipeRequestDTO(),
      );
      expect(recipe).toEqual<Recipe>(buildRecipe());
    });
  });

  describe('update', () => {
    it('should call the recipe patch endpoint with the correct payload', async () => {
      mockedApiClient.patch.mockResolvedValue(
        axiosResponse(buildRecipeResponseDTO()),
      );

      const recipe = await recipeService.update('10', buildCreateRecipe());

      expect(mockedApiClient.patch).toHaveBeenCalledWith(
        '/receitas/10',
        buildCreateRecipeRequestDTO(),
      );
      expect(recipe).toEqual<Recipe>(buildRecipe());
    });
  });

  describe('delete', () => {
    it('should call the delete recipe endpoint and return the correct payload', async () => {
      mockedApiClient.delete.mockResolvedValue(
        axiosResponse(buildRecipeResponseDTO()),
      );

      const recipe = await recipeService.delete('10');

      expect(mockedApiClient.delete).toHaveBeenCalledWith('/receitas/10');
      expect(recipe).toEqual<Recipe>(buildRecipe());
    });
  });
});
