import * as z from 'zod';

export const createAccountSchema = z.object({
  name: z.string().min(1, 'Este campo é obrigatório.'),
  login: z.string().min(1, 'Este campo é obrigatório.'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres.'),
});

export type CreateAccountFormData = z.infer<typeof createAccountSchema>;
