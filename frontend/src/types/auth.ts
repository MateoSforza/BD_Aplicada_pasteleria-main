export interface Usuario {
  idUsuario?: number;
  username?: string;
  nombreUsuario?: string;
  email?: string;
  rol?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  success: boolean;
  usuario?: Usuario;
  token?: string;
}