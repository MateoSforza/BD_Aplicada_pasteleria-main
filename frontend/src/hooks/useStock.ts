import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAllStock, 
  getStockByIngrediente,
  createStock,
  updateStock,
  ajustarStock,
  getStockAlertas,
  deleteStock
} from '../api/stock';
import { CreateStockDTO, UpdateStockDTO, AjusteStockDTO } from '../types/stock';

// Hook para obtener todo el stock
export const useStock = () => {
  return useQuery({
    queryKey: ['stock'],
    queryFn: getAllStock
  });
};

// Hook para obtener stock de un ingrediente específico
export const useStockByIngrediente = (idIngrediente: number) => {
  return useQuery({
    queryKey: ['stock', idIngrediente],
    queryFn: () => getStockByIngrediente(idIngrediente),
    enabled: !!idIngrediente // Solo ejecuta si hay un ID válido
  });
};

// Hook para obtener alertas de stock
export const useStockAlertas = () => {
  return useQuery({
    queryKey: ['stock-alertas'],
    queryFn: getStockAlertas
  });
};

// Hook para crear stock
export const useCreateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (stock: CreateStockDTO) => createStock(stock),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock'] });
    }
  });
};

// Hook para actualizar stock
export const useUpdateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ idIngrediente, stock }: { idIngrediente: number; stock: UpdateStockDTO }) => 
      updateStock(idIngrediente, stock),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock'] });
      queryClient.invalidateQueries({ queryKey: ['stock-alertas'] });
    }
  });
};

// Hook para ajustar stock (entrada/salida)
export const useAjustarStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ idIngrediente, ajuste }: { idIngrediente: number; ajuste: AjusteStockDTO }) => 
      ajustarStock(idIngrediente, ajuste),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock'] });
      queryClient.invalidateQueries({ queryKey: ['stock-alertas'] });
    }
  });
};

// Hook para eliminar stock
export const useDeleteStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (idIngrediente: number) => deleteStock(idIngrediente),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock'] });
      queryClient.invalidateQueries({ queryKey: ['stock-alertas'] });
    }
  });
};
