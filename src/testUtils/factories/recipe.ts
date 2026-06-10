import type { CreateRecipe, Recipe } from '../../../types/recipe';
import type {
  CreateRecipeRequestDTO,
  RecipeResponseDTO,
} from '../../services/recipeService/types';

export const buildRecipeResponseDTO = (
  overrides: Partial<RecipeResponseDTO> = {},
): RecipeResponseDTO => ({
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
  ...overrides,
});

export const buildRecipe = (overrides: Partial<Recipe> = {}): Recipe => ({
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
  ...overrides,
});

export const buildCreateRecipe = (
  overrides: Partial<CreateRecipe> = {},
): CreateRecipe => ({
  name: 'Bolo',
  categoryId: 2,
  preparationTimeMinutes: 45,
  servings: 8,
  directions: 'misture e asse',
  ingredients: 'farinha, ovos',
  ...overrides,
});

export const buildCreateRecipeRequestDTO = (
  overrides: Partial<CreateRecipeRequestDTO> = {},
): CreateRecipeRequestDTO => ({
  nome: 'Bolo',
  id_categorias: 2,
  tempo_preparo_minutos: 45,
  porcoes: 8,
  modo_preparo: 'misture e asse',
  ingredientes: 'farinha, ovos',
  ...overrides,
});
