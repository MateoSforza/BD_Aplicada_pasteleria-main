import { useQuery } from '@tanstack/react-query';
import { getCostosExtra } from '../api/costoExtra';
import { CostoExtra } from '../types/costoExtra';

export function useCostoExtra() {
    return useQuery<CostoExtra[]>({
        queryKey: ['costosExtra'],
        queryFn: getCostosExtra,
    });
}
