import { renderHook, waitFor } from '@testing-library/react-native';
import { createQueryClientWrapper } from '../../../testUtils/createQueryClientWrapper';
import {
  buildCreateRecipe,
  buildRecipe,
} from '../../../testUtils/factories/recipe';
import { recipeService } from '../../../services/recipeService/recipeService';
import { useEditRecipe } from '../useEditRecipe';

jest.mock('../../../services/recipeService/recipeService');

const mockedRecipeService = jest.mocked(recipeService);

describe('useEditRecipe', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call recipeService.update with the given id and recipe', async () => {
    mockedRecipeService.update.mockResolvedValue(buildRecipe());
    const recipe = buildCreateRecipe();
    const { wrapper } = createQueryClientWrapper();
    const { result } = await renderHook(() => useEditRecipe(), { wrapper });

    result.current.mutate({ id: '10', recipe });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockedRecipeService.update).toHaveBeenCalledWith('10', recipe);
  });

  it('should invalidate the recipes query on success', async () => {
    mockedRecipeService.update.mockResolvedValue(buildRecipe());
    const { wrapper, queryClient } = createQueryClientWrapper();
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');
    const { result } = await renderHook(() => useEditRecipe(), { wrapper });

    result.current.mutate({ id: '10', recipe: buildCreateRecipe() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['recipes'] });
  });
});
