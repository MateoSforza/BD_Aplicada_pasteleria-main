import { useQuery } from '@tanstack/react-query';
import { getTortas } from '../api/tortas';
import { Torta } from '../types/tortas';

export function useTortas() {
  return useQuery<Torta[]>({
    queryKey: ['tortas'],
    queryFn: getTortas,
  });
}
