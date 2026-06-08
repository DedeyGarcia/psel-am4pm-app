import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService/authService';
import type { SignUpCredentials } from '../../types/auth';
export function useSignUp() {
  return useMutation({
    mutationFn: (credentials: SignUpCredentials) =>
      authService.signUp(credentials),
  });
}
