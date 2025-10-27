import React from "react";
import { Eye, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const estados = ["Pendiente", "Falta decorar", "Completado", "Entregado", "Cancelado"];
const metodos = ["Efectivo", "Brubank", "Uala", "Mercado Pago", "Definir"];

interface PedidosTableProps {
  data: any[];
  isLoading: boolean;
  onView: (pedido: any) => void;
  onUpdate: (pedido: any) => void;
}

const PedidosTable: React.FC<PedidosTableProps> = ({ data, isLoading, onView, onUpdate }) => {
  const navigate = useNavigate();
  
  const handleUpdate = (pedidoActualizado: any) => {
    onUpdate(pedidoActualizado);
  };

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
          {data.map((pedido: any) => (
            <tr key={pedido.idPedido} className="bg-primary-50 border-t hover:bg-primary-100 transition">
              <td className="px-6 py-2">{pedido.nombreCliente}</td>

              {/* Fecha editable */}
              <td className="px-6 py-2">
                <input
                  type="date"
                  value={
                    /^\d{2}\/\d{2}\/\d{4}$/.test(pedido.fecha)
                      ? pedido.fecha.split("/").reverse().join("-")
                      : pedido.fecha ?? ""
                  }
                  onChange={(e) => {
                    const [yyyy, mm, dd] = e.target.value.split("-");
                    const fechaFormateada = `${dd}/${mm}/${yyyy}`;

                    handleUpdate({
                      ...pedido,
                      fecha: fechaFormateada,
                      _cambioFecha: true,
                    });
                  }}
                  className="border rounded px-2 py-1 text-sm w-36 bg-primary-200"
                />
              </td>

              {/* Estado combobox */}
              <td className="px-6 py-2">
                <select
                  value={pedido.estado}
                  onChange={(e) =>
                    handleUpdate({
                      ...pedido,
                      estado: e.target.value,
                      _soloEstado: true,
                    })
                  }
                  className="border rounded px-2 py-1 text-sm bg-primary-200"
                >
                  {estados.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </td>

              {/* Método de pago combobox */}
              <td className="px-6 py-2">
                <select
                  value={pedido.metodoDePago}
                  onChange={(e) =>
                    handleUpdate({
                      ...pedido,
                      metodoDePago: e.target.value,
                      _cambioMetodo: true,
                    })
                  }
                  className="border rounded px-2 py-1 text-sm bg-primary-200"
                >
                  {metodos.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </td>

              {/* Total */}
              <td className="px-6 py-4 text-sm font-semibold text-green-600">
                $
                {pedido.total?.toLocaleString("es-AR", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </td>

              {/* Acciones */}
              <td className="px-6 py-2">
                <div className="flex items-center gap-8">
                  <button
                    onClick={() => onView(pedido)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                    title="Ver detalle"
                  >
                    <Eye size={16} /> 
                  </button>

                  
                  <button
                    onClick={() => navigate(`/pedidos/modificar/${pedido.idPedido}`)}
                    className="flex items-center gap-1 text-green-600 hover:text-green-800 transition-colors"
                    title="Modificar"
                  >
                    <Edit size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PedidosTable;
