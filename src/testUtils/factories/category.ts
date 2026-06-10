import type { Category } from '../../../types/category';
import type { CategoryResponseDTO } from '../../services/categoryService/types';

export const buildCategoryResponseDTO = (
  overrides: Partial<CategoryResponseDTO> = {},
): CategoryResponseDTO => ({
  id: 1,
  nome: 'Doces',
  ...overrides,
});

export const buildCategory = (
  overrides: Partial<Category> = {},
): Category => ({
  id: 1,
  name: 'Doces',
  ...overrides,
});
