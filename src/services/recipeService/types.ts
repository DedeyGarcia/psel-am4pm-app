export interface RecipeResponseDTO {
  id: number;
  id_categorias: number;
  id_usuarios: number;
  nome: string;
  tempo_preparo_minutos: number;
  porcoes: number;
  modo_preparo: string;
  ingredientes: string;
  criado_em: string;
  alterado_em: string;
}

export type CreateRecipeRequestDTO = Pick<
  RecipeResponseDTO,
  | 'nome'
  | 'id_categorias'
  | 'tempo_preparo_minutos'
  | 'porcoes'
  | 'ingredientes'
  | 'modo_preparo'
>;

export type UpdateRecipeRequestDTO = Partial<CreateRecipeRequestDTO>;
