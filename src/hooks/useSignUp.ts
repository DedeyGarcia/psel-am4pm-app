import { useMutation } from '@tanstack/react-query';
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
  const signIn = useAuthStore(store => store.signIn);

  return useMutation({
    mutationFn: async (credentials: SignUpCredentials) => {
      await authService.signUp(credentials);

      try {
        const data = await authService.login({
          login: credentials.login,
          password: credentials.password,
        });

        return data;
      } catch {
        throw new AutoLoginError();
      }
    },
    onSuccess(data) {
      signIn(data.access_token);
    },
  });
}
