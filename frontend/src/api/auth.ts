import api from './http';
import { LoginCredentials, LoginResponse } from '../types/auth';

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post('/api/LogIn', credentials);
  return response.data as LoginResponse;
};

export const logout = async (): Promise<void> => {
  // Opcional: endpoint para logout en el backend
  // await api.post('/api/Auth/logout');
  localStorage.removeItem('usuario');
  localStorage.removeItem('token');
};