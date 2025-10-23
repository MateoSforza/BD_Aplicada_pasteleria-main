// src/api/tortas.ts
import api from '@/api/http';
import type { Medida, Torta } from '@/types/tortas';

const toNumber = (v: any, def = 0) => (typeof v === 'number' && !Number.isNaN(v) ? v : def);
const toString = (v: any, def = '') => (typeof v === 'string' ? v : def);

export const getTortas = async (): Promise<Torta[]> => {
  // ¡SIN /api! baseURL ya es '/api'
  const { data } = await api.get<any[]>('/Tortas');

  const arr = Array.isArray(data) ? data : [];

  const mapped: Torta[] = arr.map((torta: any) => {
    const medidasSrc: any[] = Array.isArray(torta?.Medidas ?? torta?.medidas) ? (torta.Medidas ?? torta.medidas) : [];

    const Medidas: Medida[] = medidasSrc.map((m: any) => ({
      IdMedida: toNumber(m?.IdMedida ?? m?.idMedida),
      IdTorta: toNumber(m?.IdTorta ?? m?.idTorta),
      Tamano: toString(m?.Tamano ?? m?.tamano),
      Estado: toString(m?.Estado ?? m?.estado),
      CostoIngredientes: toNumber(m?.CostoIngredientes ?? m?.costoIngredientes),
      CostoExtras: toNumber(m?.CostoExtras ?? m?.costoExtras),
      CostoTotal: toNumber(m?.CostoTotal ?? m?.costoTotal),
      PrecioVenta: toNumber(m?.PrecioVenta ?? m?.precioVenta),
      Ganancia: toNumber(m?.Ganancia ?? m?.ganancia),
    }));

    return {
      IdTorta: toNumber(torta?.IdTorta ?? torta?.idTorta),
      Nombre: toString(torta?.Nombre ?? torta?.nombre),
      Estado: toString(torta?.Estado ?? torta?.estado),
      PrecioPromedio: toNumber(torta?.PrecioPromedio ?? torta?.precioPromedio),
      CantidadMedidas: toNumber(torta?.CantidadMedidas ?? torta?.cantidadMedidas ?? Medidas.length),
      Medidas,
    };
  });

  return mapped;
};

export const getCantidadTortas = async (): Promise<number> => {
  const tortas = await getTortas();
  return tortas.length;
};

