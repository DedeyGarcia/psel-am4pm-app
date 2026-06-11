import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService/authService';
import type { SignUpCredentials } from '../../types/auth';
import { useAuthStore } from '../store/authStore';

export class AutoLoginError extends Error {
  constructor() {
    super('Conta criada, mas não foi possível entrar automaticamente.');
    this.name = 'AutoLoginError';
  }
}

export function useSignUp() {
  const queryClient = useQueryClient();
  const signIn = useAuthStore(store => store.signIn);

  return useMutation({
    mutationFn: async (credentials: SignUpCredentials) => {
      const user = await authService.signUp(credentials);

      try {
        const session = await authService.login({
          login: credentials.login,
          password: credentials.password,
        });

        return { user, session };
      } catch {
        throw new AutoLoginError();
      }
    },
    onSuccess({ user, session }) {
      signIn(session.access_token);
      queryClient.setQueryData(['user', 'me'], user);
    },
  });
}
