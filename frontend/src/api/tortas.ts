import api from './http';
import { Medida, Torta } from '../types/tortas';

export const getTortas = async (): Promise<Torta[]> => {
  const response = await api.get('/api/Tortas');
  const tortasArray = Array.isArray(response.data) ? response.data : [];

  const mapped = tortasArray.map((torta: any): Torta => ({
    IdTorta: torta.IdTorta ?? torta.idTorta,
    Nombre: torta.Nombre ?? torta.nombre,
    Estado: torta.Estado ?? torta.estado ?? '',
    PrecioPromedio: torta.PrecioPromedio ?? torta.precioPromedio ?? 0,
    CantidadMedidas: torta.CantidadMedidas ?? torta.cantidadMedidas ?? 0,
    Medidas: (torta.Medidas ?? torta.medidas ?? []).map((m: any): Medida => ({
      IdMedida: m.IdMedida ?? m.idMedida,
      IdTorta: m.IdTorta ?? m.idTorta,
      Tamano: m.Tamano ?? m.tamano,
      Estado: m.Estado ?? m.estado ?? '',
      CostoIngredientes: m.CostoIngredientes ?? m.costoIngredientes ?? 0,
      CostoExtras: m.CostoExtras ?? m.costoExtras ?? 0,
      CostoTotal: m.CostoTotal ?? m.costoTotal ?? 0,
      PrecioVenta: m.PrecioVenta ?? m.precioVenta ?? 0,
      Ganancia: m.Ganancia ?? m.ganancia ?? 0,
    })),
  }));

  return mapped;
};

export const getCantidadTortas = async (): Promise<number> => {
  const tortas = await getTortas();
  return tortas.length;
};
