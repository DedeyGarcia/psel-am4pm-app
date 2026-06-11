export interface LoginRequestDTO {
  login: string;
  senha: string;
}

export interface SignUpRequestDTO {
  nome: string;
  login: string;
  senha: string;
}

export interface LoginResponseDTO {
  access_token: string;
}

export interface SignUpResponseDTO {
  id: number;
  nome: string;
  login: string;
  criado_em: string;
  alterado_em: string;
}

export type GetUserResponseDTO = SignUpResponseDTO;
