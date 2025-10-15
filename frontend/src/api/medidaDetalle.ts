import api from './http';
import { Medida } from '../types/tortas';

export const getMedidaDetalle = async (medidaId: number): Promise<Medida> => {
  const response = await api.get(`/api/Tortas/medidas/${medidaId}`);
  return response.data as Medida;
}
