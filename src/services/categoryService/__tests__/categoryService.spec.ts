import type { Category } from '../../../../types/category';
import { apiClient } from '../../../api/client';
import { axiosResponse } from '../../../testUtils/axiosResponse';
import {
  buildCategory,
  buildCategoryResponseDTO,
} from '../../../testUtils/factories/category';
import { categoryService } from '../categoryService';

jest.mock('../../../api/client');

const mockedApiClient = jest.mocked(apiClient);

describe('categoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should call the categories endpoint with the correct payload', async () => {
      mockedApiClient.get.mockResolvedValue(
        axiosResponse([
          buildCategoryResponseDTO(),
          buildCategoryResponseDTO({ id: 2, nome: 'Salgados' }),
        ]),
      );

      const categories = await categoryService.getAll();

      expect(mockedApiClient.get).toHaveBeenCalledWith('/categorias');
      expect(categories).toEqual<Category[]>([
        buildCategory(),
        buildCategory({ id: 2, name: 'Salgados' }),
      ]);
    });
  });
});
