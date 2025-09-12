import api from './http';

import { Ingrediente } from '../types/ingredientes';

export const getIngredientes = async (): Promise<Ingrediente[]> => {
  const response = await api.get('/api/Ingredientes');
  // Mapear los campos a minúscula para que coincidan con la interfaz
  return response.data.map((ing: any) => ({
    idIngrediente: ing.IdIngrediente,
    nombre: ing.Nombre,
    unidadCompra: ing.UnidadCompra,
    precioUnitario: ing.PrecioUnitario,
  }));
};
