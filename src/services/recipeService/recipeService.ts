import { Recipe } from '../../../types/recipe';
import { apiClient } from '../../api/client';
import { RecipeResponseDTO } from './types';

const toRecipe = (dto: RecipeResponseDTO): Recipe => ({
  id: dto.id,
  categoryId: dto.id_categorias,
  userId: dto.id_usuarios,
  name: dto.nome,
  preparationTimeMinutes: dto.tempo_preparo_minutos,
  servings: dto.porcoes,
  directions: dto.modo_preparo,
  ingredients: dto.ingredientes,
  createdAt: dto.criado_em,
  updatedAt: dto.alterado_em,
});

export const recipeService = {
  getUserRecipes: async (): Promise<Recipe[]> => {
    const { data } = await apiClient.get<RecipeResponseDTO[]>('/receitas');
    return data.map(toRecipe);
  },
  getById: async (id: string): Promise<Recipe> => {
    const { data } = await apiClient.get<RecipeResponseDTO>(`/receitas/${id}`);
    return toRecipe(data);
  },
};
