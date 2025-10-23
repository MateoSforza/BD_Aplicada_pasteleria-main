import api from './http';
import { LoginCredentials, LoginResponse } from '../types/auth';

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  // usa la ruta que tenga Swagger:
  // si tu backend es POST /api/LogIn  -> '/LogIn'
  // si es POST /api/Auth/LogIn       -> '/Auth/LogIn'
  const { data } = await api.post('/LogIn', credentials);
  return data as LoginResponse;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem('usuario');
  localStorage.removeItem('token');
};

// opcional: también exporto default por si en algún lado importaron `default`
export default { login, logout };

