import React from "react";
import { Eye } from "lucide-react";

interface PedidosTableProps {
  data: any[];
  isLoading: boolean;
  onView: (pedido: any) => void;
}

const PedidosTable: React.FC<PedidosTableProps> = ({ data, isLoading, onView }) => {
  if (isLoading) return <div className="p-6 text-center">Cargando pedidos...</div>;
  if (!data?.length) return <div className="p-6 text-center text-primary-500">No hay pedidos.</div>;

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-primary-200">
          <tr>
            <th className="px-6 py-3">Cliente</th>
            <th className="px-6 py-3">Fecha</th>
            <th className="px-6 py-3">Estado</th>
            <th className="px-6 py-3">Método de Pago</th>
            <th className="px-6 py-3">Total</th>
            <th className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((pedido, index) => (
            <tr
              key={index}
              className="bg-primary-50 border-t hover:bg-primary-100 transition"
            >
              <td className="px-6 py-2">{pedido.nombreCliente}</td>
              <td className="px-6 py-2"> {pedido.fecha
              ? new Date(pedido.fecha).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : ""} </td>
              <td className="px-6 py-2">{pedido.estado}</td>
              <td className="px-6 py-2">{pedido.metodoDePago}</td>
              <td className="px-6 py-4 text-sm font-semibold text-green-600">
                $
                {pedido.total?.toLocaleString("es-AR", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </td>
              <td className="px-6 py-2">
                <button
                  onClick={() => onView(pedido)}
                  className="flex items-center gap-1 text-primary-600 hover:text-primary-800"
                >
                  <Eye size={16} /> Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PedidosTable;
