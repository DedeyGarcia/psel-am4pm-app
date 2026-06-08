import * as z from 'zod';

export const loginSchema = z.object({
  login: z.string().min(1, 'Este campo é obrigatório.'),
  password: z.string().min(1, 'Este campo é obrigatório.'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
