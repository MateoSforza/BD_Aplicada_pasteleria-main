import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  actualizarEstadoPedido,
  actualizarPedidoEncabezado,
} from "../api/pedidos";

export const useUpdatePedido = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pedido: any) => {
      const id = pedido.idPedido;
      const body: Record<string, any> = {};

      if (pedido._soloEstado) {
        await actualizarEstadoPedido(id, pedido.estado);
        return;
      }

      if (pedido._cambioFecha) {
        let fechaNormalizada = "";

        if (/^\d{2}\/\d{2}\/\d{4}$/.test(pedido.fecha)) {
          const [dd, mm, yyyy] = pedido.fecha.split("/");
          fechaNormalizada = `${yyyy}-${mm}-${dd}`;
        } else {
          fechaNormalizada = pedido.fecha;
        }

        body.Fecha = fechaNormalizada;
      }

      if (pedido._cambioMetodo) body.MetodoDePago = pedido.metodoDePago;
      if (pedido._cambioNota) body.Nota = pedido.nota;
      if (pedido._cambioEstado) body.Estado = pedido.estado;

      if (Object.keys(body).length === 0) return;

      await actualizarPedidoEncabezado(id, body);
    },

    // 🔄 Refresca pedidos y métricas del dashboard
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pedidos"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardMetrics"] });
    },

    onError: (error) => {
      console.error("❌ Error al actualizar pedido:", error);
    },
  });
};
