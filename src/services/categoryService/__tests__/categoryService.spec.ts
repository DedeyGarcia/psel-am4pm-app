import type { Category } from '../../../../types/category';
import { apiClient } from '../../../api/client';
import { axiosResponse } from '../../../test-utils/axiosResponse';
import { categoryService } from '../categoryService';
import type { CategoryResponseDTO } from '../types';

jest.mock('../../../api/client', () => ({
  apiClient: { get: jest.fn() },
}));

const mockedApiClient = jest.mocked(apiClient);

const categoriesResponse: CategoryResponseDTO[] = [
  { id: 1, nome: 'Doces' },
  { id: 2, nome: 'Salgados' },
];

describe('categoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should request the categories endpoint and map the response', async () => {
      mockedApiClient.get.mockResolvedValue(
        axiosResponse<CategoryResponseDTO[]>(categoriesResponse),
      );

      const categories = await categoryService.getAll();

      expect(mockedApiClient.get).toHaveBeenCalledWith('/categorias');
      expect(categories).toEqual<Category[]>([
        { id: 1, name: 'Doces' },
        { id: 2, name: 'Salgados' },
      ]);
    });
  });
});
