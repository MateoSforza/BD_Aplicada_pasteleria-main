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