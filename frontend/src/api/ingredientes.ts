import api from './http';
import { CreateIngredienteDTO, Ingrediente,  } from '../types/ingredientes';

export const getIngredientes = async (): Promise<Ingrediente[]> => {
  const response = await api.get('/api/Ingredientes');  
  // Mapear los datos del backend al frontend
  const ingredientesArray = Array.isArray(response.data) ? response.data : [];
  return ingredientesArray.map((ingrediente: any) => ({
    idIngrediente: ingrediente.IdIngrediente || ingrediente.idIngrediente,
    nombre: ingrediente.Nombre || ingrediente.nombre,
    unidadCompra: ingrediente.UnidadCompra || ingrediente.unidadCompra,
    precioUnitario: ingrediente.PrecioUnitario || ingrediente.precioUnitario
  }));
};

export const getIngredientesByID = async (id: number): Promise<Ingrediente[]> => {
  const response = await api.get(`/api/Ingredientes/${id}`);
  const ingredientesArray = Array.isArray(response.data) ? response.data : [];
  return ingredientesArray.map((ingrediente: any) => ({
    idIngrediente: ingrediente.IdIngrediente || ingrediente.idIngrediente,
    nombre: ingrediente.Nombre || ingrediente.nombre,
    unidadCompra: ingrediente.UnidadCompra || ingrediente.unidadCompra,
    precioUnitario: ingrediente.PrecioUnitario || ingrediente.precioUnitario
  }));
};

// crear ingrediente
export const createIngrediente = async (ingrediente : CreateIngredienteDTO): Promise<Ingrediente> =>{
  const response = await api.post(`/api/Ingredientes`, ingrediente);
  return response.data as Ingrediente;
}

//eliminar ingrediente
export const eliminarIngrediente = async (id: number): Promise<void> => {
  await api.delete(`api/Ingredientes/${id}`);
}


