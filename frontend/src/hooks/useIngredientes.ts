import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getIngredientes, createIngrediente } from '../api/ingredientes';
import { Ingrediente } from '../types/ingredientes';

export function useIngredientes() {
    return useQuery<Ingrediente[]>({
        queryKey: ['ingredientes'],
        queryFn: getIngredientes,
    });
}

export function useCreateIngrediente() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: createIngrediente,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ingredientes'] });
      },
    });
  }
export function useUpdateIngrediente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => 
      import('../api/ingredientes').then(api => api.updateIngrediente(id, data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredientes'] });
    },
  });
}

export function useDeleteIngrediente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => 
      import('../api/ingredientes').then(api => api.eliminarIngrediente(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredientes'] });
    },
  });
}
