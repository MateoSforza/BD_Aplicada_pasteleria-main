import api from './http';
import { Ingrediente } from '../types/ingredientes';

export const getIngredientes = async (): Promise<Ingrediente[]> => {
  const response = await api.get('/api/Ingredientes');
  console.log('Ingredientes response:', response.data); // Para debug
  
  // Mapear los datos del backend al frontend
  return (response.data || []).map((ingrediente: any) => ({
    idIngrediente: ingrediente.IdIngrediente || ingrediente.idIngrediente,
    nombre: ingrediente.Nombre || ingrediente.nombre,
    unidadCompra: ingrediente.UnidadCompra || ingrediente.unidadCompra,
    precioUnitario: ingrediente.PrecioUnitario || ingrediente.precioUnitario
  }));
};
