import { useQuery } from '@tanstack/react-query';
import { authService } from '../../services/authService/authService';
import { useAuthStore } from '../../store/authStore';

export function useUser() {
  const token = useAuthStore(state => state.token);

  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => authService.getMe(),
    enabled: !!token,
    staleTime: Infinity,
  });
}
