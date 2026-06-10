import { recipeSchema } from '../schema';

describe('recipeSchema', () => {
  const valid = {
    name: 'Bolo de cenoura',
    categoryId: '1',
    preparationTimeMinutes: '45',
    servings: '8',
    ingredients: 'cenoura, ovos, farinha',
    directions: 'misture tudo e asse',
  };

  it('should accept valid data', () => {
    expect(recipeSchema.safeParse(valid).success).toBe(true);
  });

  it('should coerce numeric fields from string to number', () => {
    const result = recipeSchema.parse(valid);

    expect(result.categoryId).toBe(1);
    expect(result.preparationTimeMinutes).toBe(45);
    expect(result.servings).toBe(8);
    expect(typeof result.categoryId).toBe('number');
    expect(typeof result.preparationTimeMinutes).toBe('number');
    expect(typeof result.servings).toBe('number');
  });

  it('should reject empty numeric field with required-field message', () => {
    const result = recipeSchema.safeParse({ ...valid, servings: '' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Este campo é obrigatório.');
    }
  });

  it.each([
    ['negative', '-5'],
    ['zero', '0'],
    ['decimal', '2.5'],
    ['non-numeric', 'abc'],
  ])('should reject %s preparation time', (_label, value) => {
    expect(
      recipeSchema.safeParse({ ...valid, preparationTimeMinutes: value })
        .success,
    ).toBe(false);
  });

  it('should use the category-specific message for invalid category', () => {
    const result = recipeSchema.safeParse({ ...valid, categoryId: '0' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Selecione uma categoria.');
    }
  });

  it('should reject empty text fields', () => {
    expect(recipeSchema.safeParse({ ...valid, name: '' }).success).toBe(false);
    expect(recipeSchema.safeParse({ ...valid, ingredients: '' }).success).toBe(
      false,
    );
    expect(recipeSchema.safeParse({ ...valid, directions: '' }).success).toBe(
      false,
    );
  });
});
