import { apiClient } from '../../api/client';
import { CategoryResponseDTO } from './types';
import type { Category } from '../../../types/category';

const toCategory = (dto: CategoryResponseDTO): Category => ({
  id: dto.id,
  name: dto.nome,
});

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<CategoryResponseDTO[]>('/categorias');
    return data.map(toCategory);
  },
};
