import { isAxiosError } from 'axios';

const DEFAULT_MESSAGES: Record<number, string> = {
  400: 'Dados inválidos. Verifique os campos.',
  401: 'Sessão expirada. Faça login novamente.',
  500: 'Erro no servidor. Tente novamente mais tarde.',
};

export function getErrorMessage(
  error: unknown,
  custom?: Record<number, string>,
): string {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    if (status) {
      return custom?.[status] ?? DEFAULT_MESSAGES[status] ?? 'Algo deu errado.';
    }
  }
  if (error instanceof Error) return error.message;
  return 'Ocorreu um erro inesperado.';
}
