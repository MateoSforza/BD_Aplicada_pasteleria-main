import React from "react";
import { Medida } from "@/types/tortas";
import MedidaDetalle from "./MedidaDetalle";

interface MedidaButtonProps {
  medida: Medida;
  tortaId: number;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const MedidaButton: React.FC<MedidaButtonProps> = ({
  medida,
  tortaId,
  isSelected,
  onClick,
}) => {
  return (
    <div className="space-y-2">
      <div
        onClick={onClick}
        className={`w-full text-center py-2 rounded-xl font-semibold tracking-wide cursor-pointer border select-none ${
          isSelected
            ? "border-primary-400 bg-primary-200 text-primary-900"
            : "border-primary-300 bg-primary-200 hover:bg-primary-100 text-primary-800"
        }`}
      >
        {medida.Tamano}
      </div>

      {isSelected && <MedidaDetalle medida={medida} tortaId={tortaId} />}
    </div>
  );
};

export default MedidaButton;
