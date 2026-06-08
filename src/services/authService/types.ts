export interface LoginRequestDTO {
  login: string;
  senha: string;
}

export interface LoginResponseDTO {
  access_token: string;
}
