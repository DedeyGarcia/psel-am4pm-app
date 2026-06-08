import { CreateRecipe, Recipe, UpdateRecipe } from '../../../types/recipe';
import { apiClient } from '../../api/client';
import {
  CreateRecipeRequestDTO,
  RecipeResponseDTO,
  UpdateRecipeRequestDTO,
} from './types';

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

const toCreateRecipeRequestDTO = (
  dto: CreateRecipe,
): CreateRecipeRequestDTO => ({
  nome: dto.name,
  id_categorias: dto.categoryId,
  tempo_preparo_minutos: dto.preparationTimeMinutes,
  porcoes: dto.servings,
  modo_preparo: dto.directions,
  ingredientes: dto.ingredients,
});

const toUpdateRecipeRequestDTO = (
  dto: UpdateRecipe,
): UpdateRecipeRequestDTO => ({
  nome: dto.name,
  id_categorias: dto.categoryId,
  tempo_preparo_minutos: dto.preparationTimeMinutes,
  porcoes: dto.servings,
  modo_preparo: dto.directions,
  ingredientes: dto.ingredients,
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

  create: async (recipe: CreateRecipe) => {
    const { data } = await apiClient.post<RecipeResponseDTO>(`/receitas`, {
      ...toCreateRecipeRequestDTO(recipe),
    });
    return toRecipe(data);
  },

  update: async (id: string, recipe: UpdateRecipe) => {
    const { data } = await apiClient.patch<RecipeResponseDTO>(
      `/receitas/${id}`,
      {
        ...toUpdateRecipeRequestDTO(recipe),
      },
    );
    return toRecipe(data);
  },

  delete: async (id: string) => {
    const { data } = await apiClient.delete<RecipeResponseDTO>(
      `/receitas/${id}`,
    );
    return toRecipe(data);
  },
};
