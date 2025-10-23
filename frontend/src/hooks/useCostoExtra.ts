import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCostoExtra, getCostosExtra } from '../api/costoExtra';
import { CostoExtra } from '../types/costoExtra';

export function useCostoExtra() {
    return useQuery<CostoExtra[]>({
        queryKey: ['costosExtra'],
        queryFn: getCostosExtra,
    });
}

export function useCreateCostoExtra() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: createCostoExtra,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['costosExtra'] });
      },
    });
  }
