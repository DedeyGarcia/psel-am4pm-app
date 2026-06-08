import { useQuery } from '@tanstack/react-query';
import { recipeService } from '../../services/recipeService/recipeService';

export function useRecipe(id: string) {
  return useQuery({
    queryKey: ['recipes', id],
    queryFn: () => recipeService.getById(id),
    enabled: !!id,
  });
}
