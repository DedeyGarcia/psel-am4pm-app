import { renderHook, waitFor } from '@testing-library/react-native';
import { createQueryClientWrapper } from '../../../testUtils/createQueryClientWrapper';
import {
  buildCreateRecipe,
  buildRecipe,
} from '../../../testUtils/factories/recipe';
import { recipeService } from '../../../services/recipeService/recipeService';
import { useCreateRecipe } from '../useCreateRecipe';

jest.mock('../../../services/recipeService/recipeService');

const mockedRecipeService = jest.mocked(recipeService);

describe('useCreateRecipe', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call recipeService.create with the given recipe', async () => {
    mockedRecipeService.create.mockResolvedValue(buildRecipe());
    const recipe = buildCreateRecipe();
    const { wrapper } = createQueryClientWrapper();
    const { result } = await renderHook(() => useCreateRecipe(), { wrapper });

    result.current.mutate(recipe);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockedRecipeService.create).toHaveBeenCalledWith(recipe);
  });

  it('should invalidate the recipes query on success', async () => {
    mockedRecipeService.create.mockResolvedValue(buildRecipe());
    const { wrapper, queryClient } = createQueryClientWrapper();
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');
    const { result } = await renderHook(() => useCreateRecipe(), { wrapper });

    result.current.mutate(buildCreateRecipe());

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['recipes'] });
  });
});
