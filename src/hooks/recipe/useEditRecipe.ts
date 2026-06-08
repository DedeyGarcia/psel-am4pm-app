import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateRecipe } from '../../../types/recipe';
import { recipeService } from '../../services/recipeService/recipeService';

export function useEditRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, recipe }: { id: string; recipe: UpdateRecipe }) =>
      recipeService.update(id, recipe),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
}
