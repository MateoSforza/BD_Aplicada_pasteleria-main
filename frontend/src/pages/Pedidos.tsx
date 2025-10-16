import React, { useState } from "react";
import { ShoppingBag, Clock, CheckCircle, DollarSign, Plus } from "lucide-react";
import { motion } from "framer-motion";
import StatsCard from "@/components/general/StatsCard";
import PedidosTable from "@/components/pedidos/PedidosTable";
import PedidoDetallePopup from "@/components/pedidos/PedidoDetallePopup";
import { usePedidos } from "@/hooks/usePedidos";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics"; // 👈 nuevo import

const PedidosDashboard: React.FC = () => {
  const { data: pedidos, isLoading } = usePedidos();
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPedidoId, setSelectedPedidoId] = useState<number | null>(null);

  const { pedidosPendientes, gananciaMensual, loading: metricsLoading } = useDashboardMetrics();

  const list = pedidos ?? [];
  const totalPedidos = list.length;

  const pedidosEntregados = list.filter((p) =>
    ["entregado", "completado"].includes((p.estado ?? "").toLowerCase())
  ).length;

  const handleAddPedido = (nuevo: any) => {
    console.log("Nuevo pedido agregado:", nuevo);
  };

  const loading = isLoading || metricsLoading;

  return (
    <div className="p-8 space-y-8">
      {/* --- Métricas --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Pedidos totales" value={totalPedidos} icon={ShoppingBag} />
        <StatsCard label="Pendientes" value={pedidosPendientes} icon={Clock} />
        <StatsCard label="Entregados" value={pedidosEntregados} icon={CheckCircle} />
        <StatsCard
          label="Ganancia mensual"
          value={`$ ${Number(gananciaMensual).toLocaleString("es-AR", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          })}`}
          icon={DollarSign}
        />
      </div>

      {/* --- Encabezado + botón --- */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-primary-900">Pedidos</h2>
        <button
          onClick={() => setPopupOpen(true)}
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
