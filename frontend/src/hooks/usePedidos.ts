import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/pedidos';
import * as types from '../types/pedidos';

export function usePedidos() {
    return useQuery<types.PedidoResumen[]>({
        queryKey: ['pedidos'],
        queryFn: api.getPedidos,
    });
}

export function usePedidoCompleto(id: number) {
    return useQuery<types.Pedido>({
      queryKey: ['pedido', id],
      queryFn: () => api.getPedidoById(id),
      enabled: !!id,
    });
  }