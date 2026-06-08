export interface Recipe {
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
