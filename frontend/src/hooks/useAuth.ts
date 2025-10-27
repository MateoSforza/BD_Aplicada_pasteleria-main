import { useState } from 'react';
import api from '../api/http';

interface LoginResponse {
  success?: boolean;
  Success?: boolean;  // Backend usa mayúscula
  token?: string;
  Token?: string;     // Backend usa mayúscula
  username?: string;
  Username?: string;
  message?: string;
  Message?: string;
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginTraditional = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post<LoginResponse>('/api/Auth/Login', {
        username,
        password
      });
      
      const success = response.data.success || response.data.Success;
      const token = response.data.token || response.data.Token;
      
      if (success && token) {
        const user = response.data.username || response.data.Username || username;
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        setLoading(false);
        return true;
      } else {
        const errorMsg = response.data.message || response.data.Message || 'Error desconocido';
        setError(errorMsg);
        setLoading(false);
        return false;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
      setLoading(false);
      return false;
    }
  };

  const loginWithGoogle = async (googleToken: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post<LoginResponse>('/api/Auth/GoogleLogin', {
        GoogleToken: googleToken
      });
      
      const success = response.data.success || response.data.Success;
      const token = response.data.token || response.data.Token;
      
      if (success && token) {
        const username = response.data.username || response.data.Username || '';
        localStorage.setItem('token', token);
        localStorage.setItem('user', username);
        setLoading(false);
        return true;
      } else {
        const errorMsg = response.data.message || response.data.Message || 'Error desconocido';
        setError(errorMsg);
        setLoading(false);
        return false;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión con Google');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const isAuthenticated = (): boolean => {
    return localStorage.getItem('token') !== null;
  };

  const getToken = (): string | null => {
    return localStorage.getItem('token');
  };

  const getUser = (): string | null => {
    return localStorage.getItem('user');
  };

  return {
    loginTraditional,
    loginWithGoogle,
    logout,
    isAuthenticated,
    getToken,
    getUser,
    loading,
    error
  };
}
