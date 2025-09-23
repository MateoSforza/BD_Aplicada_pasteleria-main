import api from './http';
import { CostoExtra } from '../types/costoExtra';

export const getCostosExtra = async (): Promise<CostoExtra[]> => {
  const response = await api.get('/api/CostosExtra');
  console.log('CostosExtra response:', response.data); // Para debug
  
  // Mapear los datos del backend al frontend
  return (response.data || []).map((costo: any) => ({
    idCostoExtra: costo.IdCostoExtra || costo.idCostoExtra,
    nombre: costo.Nombre || costo.nombre,
    precioUnitario: costo.PrecioUnitario || costo.precioUnitario,
    nota: costo.Nota || costo.nota
  }));
};
