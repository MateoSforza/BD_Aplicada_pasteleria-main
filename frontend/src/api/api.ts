import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getIngredientes = async () => {
  const response = await api.get('/api/Ingredientes');
  return response.data;
};