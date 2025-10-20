import { useQuery } from "@tanstack/react-query";
import { getCantidadTortas } from "../api/tortas";
import {
  getPedidosPendientesHoy,
  getGananciaMensual,
} from "../api/pedidos";

// 🔹 Hook unificado usando React Query
export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ["dashboardMetrics"], 
    queryFn: async () => {
      const [tortasResult, pedidosResult, gananciaResult] = await Promise.all([
        getCantidadTortas(),
        getPedidosPendientesHoy(),
        getGananciaMensual(),
      ]);

      return {
        tortasCount: tortasResult.toString(),
        pedidosPendientes: pedidosResult.toString(),
        gananciaMensual: gananciaResult.toString(),
      };
    },
  });
};
