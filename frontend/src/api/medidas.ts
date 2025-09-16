import api from './http';
import { MedidaCostoExtra, TortaIngrediente } from '../types/medidas';

// Ejemplo para obtener MedidaCostoExtra (ajusta la URL según tu backend)
export const getMedidasCostoExtra = async (): Promise<MedidaCostoExtra[]> => {
  const response = await api.get('/api/MedidaCostoExtra');
  return response.data.map((m: any) => ({
    idMedidaCostoExtra: m.IdMedidaCostoExtra,
    idMedida: m.IdMedida,
    idCostoExtra: m.IdCostoExtra,
    nombreCostoExtra: m.NombreCostoExtra,
    cantidad: m.Cantidad,
    precioUnitario: m.PrecioUnitario,
    costoTotal: m.CostoTotal,
  }));
};

// Ejemplo para obtener TortaIngrediente (ajusta la URL según tu backend)
export const getTortaIngredientes = async (): Promise<TortaIngrediente[]> => {
  const response = await api.get('/api/TortaIngrediente');
  return response.data.map((t: any) => ({
    idTortaIngrediente: t.IdTortaIngrediente,
    medidaId: t.MedidaId,
    ingredienteId: t.IngredienteId,
    nombreIngrediente: t.NombreIngrediente,
    cantidadUsada: t.CantidadUsada,
    unidadUsada: t.UnidadUsada,
    precioUnitario: t.PrecioUnitario,
    costoTotal: t.CostoTotal,
  }));
};
