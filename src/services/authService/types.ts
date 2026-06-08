import { User } from '../../../types/user';

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

export interface SignUpResponseDTO extends User {}
