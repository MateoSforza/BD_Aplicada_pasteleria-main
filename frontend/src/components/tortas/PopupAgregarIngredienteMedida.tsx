import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIngredientes } from '@/hooks/useIngredientes';
import Select from 'react-select';

interface IngredienteSeleccionado {
  idIngrediente: number;
  nombreIngrediente: string;
  cantidad: number;
  unidad: string;
}

interface PopupAgregarIngredienteMedidaProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ingrediente: IngredienteSeleccionado) => void;
}

const PopupAgregarIngredienteMedida: React.FC<PopupAgregarIngredienteMedidaProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const { data: ingredientes, isLoading } = useIngredientes();
  const [ingredienteSeleccionado, setIngredienteSeleccionado] = useState<any>(null);
  const [cantidad, setCantidad] = useState<string>('');
  const [unidad, setUnidad] = useState<string>('');

  const handleAgregar = () => {
    if (!ingredienteSeleccionado || !cantidad || !unidad) return;

    const cantidadNum = parseFloat(cantidad) || 0;

    const nuevoIngrediente: IngredienteSeleccionado = {
      idIngrediente: ingredienteSeleccionado.value,
      nombreIngrediente: ingredienteSeleccionado.label.split(' (')[0], // Obtener solo el nombre
      cantidad: cantidadNum,
      unidad: unidad,
    };

    onSave(nuevoIngrediente);
    handleClose();
  };

  const handleClose = () => {
    setIngredienteSeleccionado(null);
    setCantidad('');
    setUnidad('');
    onClose();
  };

  // Opciones para el selector de ingredientes
  const opciones = ingredientes?.map((i: any) => ({
    value: i.idIngrediente,
    label: `${i.nombre} (${i.unidadCompra}) - $${i.precioUnitario?.toLocaleString('es-AR')}`,
    unidadCompra: i.unidadCompra,
  })) || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fondo oscurecido */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Contenedor del popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Agregar Ingrediente a Medida</h3>
              <button onClick={handleClose} className="text-white/80 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cuerpo */}
            <div className="p-6 space-y-4">
              {/* Selector de ingrediente */}
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Ingrediente
                </label>
                <Select
                  isLoading={isLoading}
                  options={opciones}
                  value={ingredienteSeleccionado}
                  onChange={(selected) => {
                    setIngredienteSeleccionado(selected);
                    // Auto-completar la unidad si está disponible
                    if (selected?.unidadCompra) {
                      setUnidad(selected.unidadCompra);
                    }
                  }}
                  placeholder="Buscar ingrediente..."
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: '0.5rem',
                      borderColor: '#d1d5db',
                      padding: '2px',
                      boxShadow: 'none',
                      '&:hover': { borderColor: '#7c3aed' }
                    }),
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Input cantidad */}
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    placeholder="Ej: 0.5, 1, 2.5..."
                    className="w-full px-4 py-2.5 bg-white text-primary-900 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                {/* Input unidad */}
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Unidad
                  </label>
                  <input
                    type="text"
                    value={unidad}
                    disabled
                    placeholder="Se selecciona automáticamente"
                    className="w-full px-4 py-2.5 bg-primary-100 text-primary-500 border border-primary-300 rounded-lg cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-primary-50 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-white text-primary-700 border border-primary-300 rounded-lg hover:bg-primary-100 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleAgregar}
                disabled={!ingredienteSeleccionado || !cantidad || !unidad}
                className="px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-primary-300 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Agregar Ingrediente
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PopupAgregarIngredienteMedida;