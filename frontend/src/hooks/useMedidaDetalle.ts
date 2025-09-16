import { useQuery } from '@tanstack/react-query';
import { getMedidaDetalle } from '../api/medidaDetalle';
import { Medida } from '../types/tortas';

export function useMedidaDetalle(medidaId: number) {
  return useQuery<Medida>({
    queryKey: ['medidaDetalle', medidaId],
    queryFn: () => getMedidaDetalle(medidaId),
    enabled: !!medidaId,
  });
}
