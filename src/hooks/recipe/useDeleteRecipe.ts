import { useMutation, useQueryClient } from '@tanstack/react-query';
import { recipeService } from '../../services/recipeService/recipeService';

export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => recipeService.delete(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
}
