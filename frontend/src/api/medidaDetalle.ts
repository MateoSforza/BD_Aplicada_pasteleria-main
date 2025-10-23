// src/api/medidaDetalle.ts
import api from './http'
import { Medida } from '../types/tortas'

export const getMedidaDetalle = async (medidaId: number): Promise<Medida> => {
  const { data } = await api.get(`/Tortas/medidas/${medidaId}`)
  return data as Medida
}

