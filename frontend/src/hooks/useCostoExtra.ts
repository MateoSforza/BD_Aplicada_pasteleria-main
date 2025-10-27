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

export function useUpdateCostoExtra() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => 
      import('../api/costoExtra').then(api => api.updateCostoExtra(id, data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['costosExtra'] });
    },
  });
}

export function useDeleteCostoExtra() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => 
      import('../api/costoExtra').then(api => api.eliminarCostoExtra(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['costosExtra'] });
    },
  });
}
