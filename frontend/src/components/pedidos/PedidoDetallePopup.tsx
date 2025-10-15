import React from "react";

interface PedidoDetallePopupProps {
  pedido: any;
  onClose: () => void;
}

const PedidoDetallePopup: React.FC<PedidoDetallePopupProps> = ({ pedido, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg overflow-y-auto max-h-[80vh]">
      <h2 className="text-xl font-semibold mb-4">Detalle del Pedido</h2>
      <p className="text-gray-700 mb-2"><strong>Cliente:</strong> {pedido.NombreCliente}</p>
      <p className="text-gray-700 mb-2"><strong>Fecha:</strong> {pedido.Fecha}</p>
      <p className="text-gray-700 mb-4"><strong>Estado:</strong> {pedido.Estado}</p>
      {pedido.DetallePedidos?.map((detalle: any, idx: number) => (
        <div key={idx} className="mb-4 border rounded-lg p-3 bg-gray-50">
          <h3 className="font-semibold text-gray-800">{detalle.Torta}</h3>
          <p className="text-sm text-gray-600 mb-2">Cantidad: {detalle.Cantidad}</p>
          {detalle.Extras?.length > 0 && (
            <div className="ml-3">
              <p className="font-medium text-gray-700">Extras:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {detalle.Extras.map((extra: any, i: number) => (
                  <li key={i}>{extra.Nombre} × {extra.Cantidad}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
      <button onClick={onClose} className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600">
        Cerrar
      </button>
    </div>
  </div>
);

export default PedidoDetallePopup;
