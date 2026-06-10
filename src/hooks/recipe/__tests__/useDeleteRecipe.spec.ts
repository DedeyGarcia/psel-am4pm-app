import { renderHook, waitFor } from '@testing-library/react-native';
import { createQueryClientWrapper } from '../../../testUtils/createQueryClientWrapper';
import { buildRecipe } from '../../../testUtils/factories/recipe';
import { recipeService } from '../../../services/recipeService/recipeService';
import { useDeleteRecipe } from '../useDeleteRecipe';

jest.mock('../../../services/recipeService/recipeService');

const mockedRecipeService = jest.mocked(recipeService);

describe('useDeleteRecipe', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call recipeService.delete with the given id', async () => {
    mockedRecipeService.delete.mockResolvedValue(buildRecipe());
    const { wrapper } = createQueryClientWrapper();
    const { result } = await renderHook(() => useDeleteRecipe(), { wrapper });

    result.current.mutate('10');

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockedRecipeService.delete).toHaveBeenCalledWith('10');
  });

  it('should invalidate the recipes query on success', async () => {
    mockedRecipeService.delete.mockResolvedValue(buildRecipe());
    const { wrapper, queryClient } = createQueryClientWrapper();
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');
    const { result } = await renderHook(() => useDeleteRecipe(), { wrapper });

    result.current.mutate('10');

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['recipes'] });
  });
});
