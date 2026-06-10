import { createAccountSchema } from '../schema';

describe('createAccountSchema', () => {
  const valid = { name: 'Fulano', login: 'fulano', password: 'senha123' };

  it('should accept valid data', () => {
    expect(createAccountSchema.safeParse(valid).success).toBe(true);
  });

  it('should reject empty name', () => {
    const result = createAccountSchema.safeParse({ ...valid, name: '' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Este campo é obrigatório.');
    }
  });

  it('should reject empty login', () => {
    expect(
      createAccountSchema.safeParse({ ...valid, login: '' }).success,
    ).toBe(false);
  });

  it('should reject password shorter than 6 characters', () => {
    const result = createAccountSchema.safeParse({ ...valid, password: '12345' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Senha deve ter pelo menos 6 caracteres.',
      );
    }
  });

  it('should accept password with exactly 6 characters', () => {
    expect(
      createAccountSchema.safeParse({ ...valid, password: '123456' }).success,
    ).toBe(true);
  });
});
