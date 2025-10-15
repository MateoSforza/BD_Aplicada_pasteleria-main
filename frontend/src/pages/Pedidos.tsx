import React, { useState } from "react";
import { ShoppingBag, Clock, CheckCircle, DollarSign, Plus } from "lucide-react";
import { motion } from "framer-motion";
import StatsCard from "@/components/general/StatsCard";
import PedidosTable from "@/components/pedidos/PedidosTable";
import PedidoDetallePopup from "@/components/pedidos/PedidoDetallePopup";
import { usePedidos } from "@/hooks/usePedidos"; // <-- tu hook real

const PedidosDashboard: React.FC = () => {
  const { data: pedidos, isLoading } = usePedidos();
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<any>(null);

  const list = pedidos ?? [];
  const totalPedidos = list.length;

  const pedidosEntregados = list.filter(
    (p) =>
      ["entregado", "completado"].includes((p.estado ?? "").toLowerCase())
  ).length;
    const pedidosPendientes = list.filter(
        (p) =>
          ["pendiente", "pagado"].includes((p.estado ?? "").toLowerCase())
      ).length;
      
  const gananciaTotal = list.reduce((acc, p) => acc + (p.total ?? 0), 0);

  const handleAddPedido = (nuevo: any) => {
    // Idealmente usarías un mutation y luego invalidarías el queryx`
    console.log("Nuevo pedido agregado:", nuevo);
  };

    console.log("pedidos", list.length, list)

  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Pedidos totales" value={totalPedidos} icon={ShoppingBag} />
        <StatsCard label="Pendientes" value={pedidosPendientes} icon={Clock} />
        <StatsCard label="Entregados" value={pedidosEntregados} icon={CheckCircle} />
        <StatsCard label="Ganancia total" value={`$${gananciaTotal.toLocaleString()}`} icon={DollarSign} />
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-primary-900">Pedidos</h2>
        <button
          onClick={() => setPopupOpen(true)}
          className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-600 transition"
        >
          <Plus size={18} /> Nuevo Pedido
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-primary-50 rounded-xl shadow-sm border border-primary-200 overflow-hidden"
      >
        <PedidosTable data={list} isLoading={isLoading} onView={setSelectedPedido} />
      </motion.div>

      
      {selectedPedido && <PedidoDetallePopup pedido={selectedPedido} onClose={() => setSelectedPedido(null)} />}
    </div>
  );
};

export default PedidosDashboard;
