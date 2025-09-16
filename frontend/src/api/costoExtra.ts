import api from './http';
import { CostoExtra } from '../types/costoExtra';

export const getCostosExtra = async (): Promise<CostoExtra[]> => {
  const response = await api.get('/api/CostosExtra');
  return response.data.map((c: any) => ({
    idCostoExtra: c.IdCostoExtra,
    nombre: c.Nombre,
    precioUnitario: c.PrecioUnitario,
    nota: c.Nota,
  }));
};
