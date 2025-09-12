import { useQuery } from '@tanstack/react-query';
import { getIngredientes } from '../api/ingredientes';
import { Ingrediente } from '../types/ingredientes';

export function useIngredientes() {
    return useQuery<Ingrediente[]>({
        queryKey: ['ingredientes'],
        queryFn: getIngredientes,
    });
}
