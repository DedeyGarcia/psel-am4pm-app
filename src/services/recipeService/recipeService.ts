import { Recipe } from '../../../types/recipe';
import { apiClient } from '../../api/client';
import { RecipeResponseDTO } from './types';

export const recipeService = {
  getUserRecipes: async (): Promise<Recipe[]> => {
    const { data } = await apiClient.get<RecipeResponseDTO[]>('/receitas');
    return data;
  },
  getById: async (id: string): Promise<Recipe> => {
    const { data } = await apiClient.get<RecipeResponseDTO>(`/receitas/${id}`);
    return data;
  },
};
