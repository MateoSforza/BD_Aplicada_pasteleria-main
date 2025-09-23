import api from './http';
import { Torta } from '../types/tortas';

export const getTortas = async (): Promise<Torta[]> => {
  const response = await api.get('/api/Tortas');
  console.log('Tortas response:', response.data); // Para debug
  
  // Mapear los datos del backend al frontend
  return (response.data || []).map((torta: any) => ({
    idTorta: torta.IdTorta || torta.idTorta,
    nombre: torta.Nombre || torta.nombre,
    medidas: torta.Medidas || torta.medidas || [],
    precioPromedio: torta.PrecioPromedio || torta.precioPromedio || 0,
    cantidadMedidas: torta.CantidadMedidas || torta.cantidadMedidas || 0
  }));
};
