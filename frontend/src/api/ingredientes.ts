import api from './http';

export const getIngredientes = async () => {
  const response = await api.get('/api/Ingredientes');
  return response.data;
};
