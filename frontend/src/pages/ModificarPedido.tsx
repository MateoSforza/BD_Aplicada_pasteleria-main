import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import { usePedidoCompleto } from '@/hooks/usePedidos';

const ModificarPedido: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: pedido, isLoading, error } = usePedidoCompleto(Number(id));

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Error state
  if (error || !pedido) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Error al cargar el pedido
        </div>
        <button
          onClick={() => navigate('/pedidos')}
          className="mt-4 flex items-center gap-2 text-primary-600 hover:text-primary-800"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a pedidos
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/pedidos')}
            className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-primary-700" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-primary-900">
              Modificar Pedido #{pedido.idPedido}
            </h1>
            <p className="text-primary-600">
              Cliente: {pedido.nombreCliente}
            </p>
          </div>
        </div>
        <button
          className="flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg shadow hover:bg-primary-600 transition"
        >
          <Save className="w-5 h-5" />
          Guardar Cambios
        </button>
      </div>

      {/* Contenido del formulario */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-primary-200 p-6"
      >
        <h2 className="text-xl font-semibold text-primary-900 mb-4">
          Información del Pedido
        </h2>
        
        <div className="space-y-4">
          {/* Aquí irá el formulario de edición */}
          <p className="text-primary-600">
            Formulario de edición en desarrollo...
          </p>
          
          {/* Datos básicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                Cliente
              </label>
              <p className="text-primary-900">{pedido.nombreCliente}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                Teléfono
              </label>
              <p className="text-primary-900">+{pedido.telefonoCliente}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                Estado
              </label>
              <p className="text-primary-900">{pedido.estado}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                Método de Pago
              </label>
              <p className="text-primary-900">{pedido.metodoDePago}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-2">
              Total
            </label>
            <p className="text-2xl font-bold text-green-600">
              ${pedido.total?.toLocaleString('es-AR')}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModificarPedido;
