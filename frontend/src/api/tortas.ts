import api from './http';
import { Torta } from '../types/tortas';

export const getTortas = async (): Promise<Torta[]> => {
  const response = await api.get('/api/Tortas');
  // Mapeo directo, asumiendo que los nombres de campos coinciden
  return response.data.map((t: any) => ({
    idTorta: t.IdTorta,
    nombre: t.Nombre,
    medidas: t.Medidas,
    precioPromedio: t.PrecioPromedio,
    cantidadMedidas: t.CantidadMedidas,
  }));
};
