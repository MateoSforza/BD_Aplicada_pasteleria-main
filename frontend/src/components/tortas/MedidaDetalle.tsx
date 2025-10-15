import React from "react";
import { Medida } from "@/types/tortas";

interface MedidaDetalleProps {
  medida: Medida;
  tortaId: number;
}

const MedidaDetalle: React.FC<MedidaDetalleProps> = ({ medida }) => {
  return (
    <div className="text-left border-t pt-3 space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-primary-600">Costo Ingredientes:</span>
        <span className="font-semibold">${medida.CostoIngredientes.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-primary-600">Costos Extra:</span>
        <span className="font-semibold">${medida.CostoExtras.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm font-bold border-t pt-2">
        <span className="text-primary-700">Costo Total:</span>
        <span className="text-red-600">${medida.CostoTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm font-bold">
        <span className="text-primary-700">Precio Venta:</span>
        <span className="text-green-600">${medida.PrecioVenta.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm font-bold bg-primary-100 p-2 rounded">
        <span className="text-primary-800">Ganancia:</span>
        <span className="text-primary-800">${medida.Ganancia.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default MedidaDetalle;
