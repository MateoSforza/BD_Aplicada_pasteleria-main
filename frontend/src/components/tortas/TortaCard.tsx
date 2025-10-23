import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Torta } from "@/types/tortas";
import MedidaButton from "./MedidaButton";

interface TortaCardProps {
  torta: Torta;
  isExpanded: boolean;
  onToggle: () => void;
  medidaSeleccionada: number | null;
  onMedidaSelect: (id: number | null) => void;
}

export const TortaCard: React.FC<TortaCardProps> = ({
  torta,
  isExpanded,
  onToggle,
  medidaSeleccionada,
  onMedidaSelect,
}) => {
  const disponible = torta.CantidadMedidas > 0;

  return (
    <motion.div
      onClick={disponible ? onToggle : undefined}
      whileHover={disponible ? {
        scale: 1.02,
        transition: { duration: 0.2 },
      } : {}}
      className={`rounded-xl border-2 transition-all ${
        disponible 
          ? "cursor-pointer border-primary-200 bg-primary-200 hover:border-primary-400" 
          : "cursor-not-allowed border-primary-200 bg-primary-50 opacity-50"
      } ${isExpanded ? "shadow-lg" : "shadow-sm"}`}
    >
      {/* Header simple */}
      <div className="p-6 text-center">
        <h2 className={`text-2xl font-bold mb-2 ${
          disponible ? "text-primary-900" : "text-primary-400"
        }`}>
          {torta.Nombre}
        </h2>
        
        <p className={`text-sm ${disponible ? "text-primary-600" : "text-primary-400"}`}>
          {disponible 
            ? `${torta.CantidadMedidas} ${torta.CantidadMedidas === 1 ? "tamaño disponible" : "tamaños disponibles"}`
            : "No disponible"
          }
        </p>
      </div>

      {/* Contenido expandible */}
      <AnimatePresence initial={false}>
        {isExpanded && disponible && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            className="overflow-hidden border-t border-primary-100"
          >
            <div className="p-5 space-y-2 bg-primary-50 rounded-b-xl">
              {torta.Medidas.map((medida) => (
                <MedidaButton
                  key={medida.IdMedida}
                  medida={medida}
                  tortaId={torta.IdTorta}
                  isSelected={medidaSeleccionada === medida.IdMedida}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMedidaSelect(
                      medidaSeleccionada === medida.IdMedida ? null : medida.IdMedida
                    );
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};