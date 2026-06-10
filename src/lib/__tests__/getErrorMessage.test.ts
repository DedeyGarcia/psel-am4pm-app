import { AxiosError } from 'axios';
import { getErrorMessage } from '../getErrorMessage';

const axiosErrorWithStatus = (status?: number): AxiosError =>
  new AxiosError(
    'request failed',
    'ERR',
    undefined,
    undefined,
    status ? ({ status } as AxiosError['response']) : undefined,
  );

describe('getErrorMessage', () => {
  it('should return the default message for a mapped status code', () => {
    expect(getErrorMessage(axiosErrorWithStatus(400))).toBe(
      'Dados inválidos. Verifique os campos.',
    );
    expect(getErrorMessage(axiosErrorWithStatus(401))).toBe(
      'Sessão expirada. Faça login novamente.',
    );
    expect(getErrorMessage(axiosErrorWithStatus(500))).toBe(
      'Erro no servidor. Tente novamente mais tarde.',
    );
  });

  it('should use the custom message over the default for a given status', () => {
    expect(
      getErrorMessage(axiosErrorWithStatus(401), {
        401: 'Credenciais inválidas.',
      }),
    ).toBe('Credenciais inválidas.');
  });

  it('should fall back to a generic message for an unmapped status', () => {
    expect(getErrorMessage(axiosErrorWithStatus(418))).toBe('Algo deu errado.');
  });

  it('should return the error message for a plain Error', () => {
    expect(getErrorMessage(new Error('test'))).toBe('test');
  });

  it('should return the unexpected error message for a non-error value', () => {
    expect(getErrorMessage('just a string')).toBe(
      'Ocorreu um erro inesperado.',
    );
    expect(getErrorMessage(null)).toBe('Ocorreu um erro inesperado.');
  });
});
