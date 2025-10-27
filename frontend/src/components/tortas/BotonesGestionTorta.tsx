import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import PopupConfirm from '@/components/general/PopupConfirm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTorta, deleteTorta } from '@/api/tortas';
import { toast } from 'react-hot-toast';

interface BotonesGestionTortaProps {
  tortaSeleccionadaId: number | null;
  tortaSeleccionadaNombre?: string;
}

export const BotonesGestionTorta: React.FC<BotonesGestionTortaProps> = ({
  tortaSeleccionadaId,
  tortaSeleccionadaNombre,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const queryClient = useQueryClient();

  // Mutation para crear torta
  const createMutation = useMutation({
    mutationFn: createTorta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tortas'] });
      toast.success('Torta creada exitosamente');
      setShowCreateModal(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al crear la torta');
    },
  });

  // Mutation para eliminar torta
  const deleteMutation = useMutation({
    mutationFn: deleteTorta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tortas'] });
      toast.success('Torta eliminada exitosamente');
      setShowDeleteModal(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al eliminar la torta');
    },
  });

  const handleCreate = (values: { nombre: string }) => {
    createMutation.mutate(values.nombre);
  };

  const handleDelete = () => {
    if (tortaSeleccionadaId) {
      deleteMutation.mutate(tortaSeleccionadaId);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1 px-3 py-1.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Agregar
        </button>

        <button
          onClick={() => setShowDeleteModal(true)}
          disabled={!tortaSeleccionadaId}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors text-sm ${
            tortaSeleccionadaId
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Trash2 className="w-4 h-4" />
          Eliminar
        </button>
      </div>

      {/* Modal para crear torta */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h3 className="text-xl font-bold text-primary-900 mb-4">Nueva Torta</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleCreate({ nombre: formData.get('nombre') as string });
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Nombre de la Torta
                </label>
                <input
                  name="nombre"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-primary-300 rounded-lg"
                  placeholder="Ej: Torta de Chocolate"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-primary-700 hover:bg-primary-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-gray-300"
                >
                  {createMutation.isPending ? 'Creando...' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para confirmar eliminación */}
      {tortaSeleccionadaId && (
        <PopupConfirm
          isOpen={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          title="Eliminar Torta"
          message="¿Estás seguro de que deseas eliminar esta torta? Esta acción marcará la torta como inactiva."
          itemName={tortaSeleccionadaNombre}
        />
      )}
    </>
  );
};