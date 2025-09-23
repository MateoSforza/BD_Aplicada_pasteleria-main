import { useState } from 'react';
import { login as loginApi, logout as logoutApi } from '../api/auth';
import { Usuario, LoginCredentials } from '../types/auth';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStoredUser = (): Usuario | null => {
    const stored = localStorage.getItem('usuario');
    return stored ? JSON.parse(stored) : null;
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await loginApi(credentials);
      console.log('Login response:', response);
      
      // Como el backend solo devuelve success y message, guardamos el username
      const userData = {
        username: credentials.username,
        message: response.message,
        success: response.success
      };
      
      localStorage.setItem('usuario', JSON.stringify(userData));
      
      setLoading(false);
      return response.success === true;
    } catch (err: any) {
      console.log('Login error:', err.response?.data);
      setError(err.response?.data?.message || err.message || 'Error al iniciar sesión');
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    await logoutApi();
    window.location.href = '/login';
  };

  const isAuthenticated = (): boolean => {
    return getStoredUser() !== null;
  };

  return {
    login,
    logout,
    isAuthenticated,
    getStoredUser,
    loading,
    error
  };
}