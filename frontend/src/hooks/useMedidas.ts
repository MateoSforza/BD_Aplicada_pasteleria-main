import { useQuery } from '@tanstack/react-query';
import { getMedidasCostoExtra } from '../api/medidas';
import { MedidaCostoExtra } from '../types/medidas';

export function useMedidasCostoExtra() {
  return useQuery<MedidaCostoExtra[]>({
    queryKey: ['medidasCostoExtra'],
    queryFn: getMedidasCostoExtra,
  });
}
