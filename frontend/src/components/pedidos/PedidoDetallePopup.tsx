import React from "react";
import { usePedidoCompleto } from "@/hooks/usePedidos";

interface PedidoDetallePopupProps {
  id: number;
  onClose: () => void;
}

const PedidoDetallePopup: React.FC<PedidoDetallePopupProps> = ({ id, onClose }) => {
  const { data: pedido, isLoading, error } = usePedidoCompleto(id);
  

  if (isLoading)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 shadow-lg">Cargando pedido...</div>
      </div>
    );

  if (error || !pedido)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 shadow-lg text-red-500">
          Error al cargar el pedido.
          <button onClick={onClose} className="mt-4 bg-primary-500 text-white px-4 py-2 rounded-lg">
            Cerrar
          </button>
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl font-semibold mb-4">Detalle del Pedido ID: #{pedido.idPedido}</h2>
        <p><strong>Cliente:</strong> {pedido.nombreCliente}</p>
        <p><strong>Telefono:</strong> +{pedido.telefonoCliente}</p>
        <p> <strong>Fecha:</strong>{" "}
          {new Date(pedido.fecha).toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })} </p>
        <p><strong>Estado:</strong> {pedido.estado}</p>
        <p><strong>Estado de pago:</strong> {pedido.metodoDePago}</p>
        { /* <p><strong>Métodos de pago disponibles:</strong></p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Efectivo</strong></li>
            <li><strong>Alias:</strong> Camilamariaguinazu</li>
          </ul>
        <p><strong>Total:</strong> $ {pedido.total?.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </p> */}
        {pedido.detallePedidos?.map((detalle: any, idx: number) => (
          <div key={idx} className="mt-4 border rounded-lg p-3 bg-primary-50">
            <h3 className="font-semibold">{detalle.nombreTorta}, {detalle.tamanoMedida} </h3>
            <div className="flex justify-between items-center">
              <p>
                Cantidad: {detalle.cantidad}
              </p>
              <p className="font-semibold text-right">
               $ {detalle.totalProducto?.toLocaleString("es-AR", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      })}
              </p>
            </div>
            {detalle.extras?.length > 0 && (
              <ul className="list-disc list-inside text-sm text-primary-600">
                <p>Extras: </p>
                {detalle.extras.map((e: any, i: number) => (
                  <li key={i}>
                  {e.nombreCostoExtra} × {e.cantidad}
                  {e.nota ? `  "${e.nota}"` : ""}
                </li>
                ))}
              </ul>
            )}
            {detalle.ingredientesExtras?.length > 0 && (
              <ul className="list-disc list-inside text-sm text-primary-600">
                <p>Ingredientes extras: </p>
                {detalle.ingredientesExtras.map((e: any, i: number) => (
                  <li key={i}>
                  {e.nombreIngrediente} × {e.cantidad}
                  {e.nota ? `  "${e.nota}"` : ""}
                </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>

          <button
            onClick={onClose}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
          >
            Enviar
          </button>
        </div>

      </div>
    </div>
  );
};

export default PedidoDetallePopup;


