import { useQuery } from '@tanstack/react-query';
import { getTortasSimple, getMedidasPorTorta } from '../api/pedidoSeleccion';
import { TortaSimple, MedidaSimple } from '../types/pedidoSeleccion';

// Hook para obtener todas las tortas (solo id y nombre)
export function useTortasSimple() {
  return useQuery<TortaSimple[]>({
    queryKey: ['tortasSimple'],
    queryFn: getTortasSimple,
  });
}

// Hook para obtener medidas de una torta específica
export function useMedidasPorTorta(idTorta: number | null) {
  return useQuery<MedidaSimple[]>({
    queryKey: ['medidasPorTorta', idTorta],
    queryFn: () => getMedidasPorTorta(idTorta!),
    enabled: !!idTorta, // Solo ejecuta si hay un idTorta válido
  });
}
