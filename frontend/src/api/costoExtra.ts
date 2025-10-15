import api from './http';
import { CostoExtra, CreateCostoExtraDTO} from '../types/costoExtra';

export const getCostosExtra = async (): Promise<CostoExtra[]> => {
  const response = await api.get('/api/CostosExtra');
  // Mapear los datos del backend al frontend
  const data = Array.isArray(response.data) ? response.data : [];
  return data.map((costo: any) => ({
    idCostoExtra: costo.IdCostoExtra || costo.idCostoExtra,
    nombre: costo.Nombre || costo.nombre,
    precioUnitario: costo.PrecioUnitario || costo.precioUnitario,
    nota: costo.Nota || costo.nota
  }));
};

export const createCostoExtra = async (createCostoExtra : CreateCostoExtraDTO): Promise<CostoExtra> =>{
  const response = await api.post(`/api/CostosExtra`, createCostoExtra);
  return response.data as CostoExtra;
}

//eliminar ingrediente
export const eliminarCostoExtra = async (id: number): Promise<void> => {
  await api.delete(`/api/CostosExtra/${id}`);
}
