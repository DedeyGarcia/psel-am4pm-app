import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';
import type { LoginCredentials } from '../../types/auth';
import { useAuthStore } from '../store/authStore';

export function useLogin() {
  const signIn = useAuthStore(store => store.signIn);
  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess(data) {
      signIn(data);
    },
  });
}
