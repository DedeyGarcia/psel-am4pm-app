import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateRecipe } from '../../../types/recipe';
import { recipeService } from '../../services/recipeService/recipeService';

export function useCreateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipe: CreateRecipe) => recipeService.create(recipe),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
}
