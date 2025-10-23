// src/api/ingredientes.ts
import api from './http'
import { CreateIngredienteDTO, Ingrediente } from '../types/ingredientes'

// Normaliza las claves que vienen del backend (PascalCase) o del front (camelCase)
const mapIngrediente = (raw: any): Ingrediente => ({
  idIngrediente: raw.IdIngrediente ?? raw.idIngrediente,
  nombre:        raw.Nombre        ?? raw.nombre        ?? '',
  unidadCompra:  raw.UnidadCompra  ?? raw.unidadCompra  ?? '',
  precioUnitario: Number(raw.PrecioUnitario ?? raw.precioUnitario ?? 0),
})

export const getIngredientes = async (): Promise<Ingrediente[]> => {
  const { data } = await api.get('/Ingredientes') // <- sin /api al inicio
  const arr = Array.isArray(data) ? data : []
  return arr.map(mapIngrediente)
}

export const getIngredienteByID = async (id: number): Promise<Ingrediente> => {
  const { data } = await api.get(`/Ingredientes/${id}`) // <- sin /api
  return mapIngrediente(data)
}

// Crear ingrediente
export const createIngrediente = async (ingrediente: CreateIngredienteDTO): Promise<Ingrediente> => {
  const { data } = await api.post('/Ingredientes', ingrediente) // <- sin /api
  return mapIngrediente(data)
}

// Eliminar ingrediente
export const eliminarIngrediente = async (id: number): Promise<void> => {
  await api.delete(`/Ingredientes/${id}`) // <- agrega la / faltante y sin /api
}
