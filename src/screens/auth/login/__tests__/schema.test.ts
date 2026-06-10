import { loginSchema } from '../schema';

describe('loginSchema', () => {
  const valid = { login: 'usuario', password: 'senha123' };

  it('should accept valid data', () => {
    expect(loginSchema.safeParse(valid).success).toBe(true);
  });

  it('should reject empty login with required-field message', () => {
    const result = loginSchema.safeParse({ ...valid, login: '' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Este campo é obrigatório.');
    }
  });

  it('should reject empty password', () => {
    const result = loginSchema.safeParse({ ...valid, password: '' });

    expect(result.success).toBe(false);
  });
});
