// src/api/costoExtra.ts
import api from './http'
import { CostoExtra, CreateCostoExtraDTO } from '../types/costoExtra'

const mapCosto = (c: any): CostoExtra => ({
  idCostoExtra:  c.IdCostoExtra ?? c.idCostoExtra,
  nombre:        c.Nombre ?? c.nombre ?? '',
  precioUnitario:Number(c.PrecioUnitario ?? c.precioUnitario ?? 0),
  nota:          c.Nota ?? c.nota ?? ''
})

export const getCostosExtra = async (): Promise<CostoExtra[]> => {
  const { data } = await api.get('/CostosExtra')
  const arr = Array.isArray(data) ? data : []
  return arr.map(mapCosto)
}

export const createCostoExtra = async (payload: CreateCostoExtraDTO): Promise<CostoExtra> => {
  const { data } = await api.post('/CostosExtra', payload)
  return mapCosto(data)
}

export const eliminarCostoExtra = async (id: number): Promise<void> => {
  await api.delete(`/CostosExtra/${id}`)
}
