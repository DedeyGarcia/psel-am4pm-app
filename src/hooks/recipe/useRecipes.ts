import { useQuery } from '@tanstack/react-query';
import { recipeService } from '../../services/recipeService/recipeService';

export function useRecipes() {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: () => recipeService.getUserRecipes(),
  });
}
