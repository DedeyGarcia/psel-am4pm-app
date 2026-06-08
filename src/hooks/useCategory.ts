import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../services/categoryService/categoryService';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
