import React, { useState } from "react";
import { ShoppingBag, Clock, CheckCircle, DollarSign, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StatsCard from "@/components/general/StatsCard";
import PedidosTable from "@/components/pedidos/PedidosTable";
import PedidoDetallePopup from "@/components/pedidos/PedidoDetallePopup";
import { usePedidos } from "@/hooks/usePedidos";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { useUpdatePedido } from "@/hooks/useUpdatePedido"; 

const PedidosDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: pedidos, isLoading } = usePedidos();
  const { data: metrics, isLoading: metricsLoading } = useDashboardMetrics();
  const { mutate: updatePedido } = useUpdatePedido();

  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPedidoId, setSelectedPedidoId] = useState<number | null>(null);

  const list = pedidos ?? [];
  const totalPedidos = list.length;

  const pedidosEntregados = list.filter((p) =>
    ["entregado"].includes((p.estado ?? "").toLowerCase())
  ).length;

  const loading = isLoading || metricsLoading;

  const handleUpdatePedido = (pedidoActualizado: any) => {
    updatePedido(pedidoActualizado);
  };

  return (
    <div className="p-8 space-y-8">
      {/* --- Métricas --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total de pedidos" value={totalPedidos} icon={ShoppingBag} />
        <StatsCard
          label="Pendientes estas dos semanas"
          value={metrics?.pedidosPendientes ?? "0"}
          icon={Clock}
        />
        <StatsCard
          label="Pedidos entregados"
          value={pedidosEntregados}
          icon={CheckCircle}
        />
        <StatsCard
          label="Ganancia mensual"
          value={`$ ${Number(metrics?.gananciaMensual ?? 0).toLocaleString("es-AR", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}`}
          icon={DollarSign}
        />
      </div>

      {/* --- Encabezado + botón --- */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-primary-900">Pedidos</h2>
        <button
          onClick={() => navigate('/pedidos/crear')}
          className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-600 transition"
        >
          <Plus size={18} /> Nuevo Pedido
        </button>
      </div>

      {/* --- Tabla --- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-primary-50 rounded-xl shadow-sm border border-primary-200 overflow-hidden"
      >
        <PedidosTable
          data={list}
          isLoading={loading}
          onView={(pedido) => setSelectedPedidoId(pedido.idPedido)}
          onUpdate={handleUpdatePedido}
        />
      </motion.div>

      {/* --- Popup de detalle --- */}
      {selectedPedidoId && (
        <PedidoDetallePopup
          id={selectedPedidoId}
          onClose={() => setSelectedPedidoId(null)}
        />
      )}
    </div>
  );
};

export default PedidosDashboard;
