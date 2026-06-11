import * as z from 'zod';

const numericField = (msg: string) =>
  z
    .string()
    .min(1, 'Este campo é obrigatório.')
    .transform(Number)
    .pipe(z.number({ error: 'Informe apenas números.' }).int(msg).positive(msg));

export const recipeSchema = z.object({
  name: z.string().min(1, 'Este campo é obrigatório.'),
  categoryId: numericField('Selecione uma categoria.'),
  preparationTimeMinutes: numericField('Informe um tempo válido.'),
  servings: numericField('Informe as porções.'),
  ingredients: z.string().min(1, 'Este campo é obrigatório.'),
  directions: z.string().min(1, 'Este campo é obrigatório.'),
});

export type RecipeFormDataInput = z.input<typeof recipeSchema>;
export type RecipeFormDataOutput = z.output<typeof recipeSchema>;
