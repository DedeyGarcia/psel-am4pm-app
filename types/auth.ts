export interface LoginCredentials {
  login: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  name: string;
}

export interface Session {
  access_token: string;
}
