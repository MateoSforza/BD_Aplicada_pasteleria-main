import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Package, Search, Plus, ArrowUpLeft, DollarSignIcon } from 'lucide-react';
import { useIngredientes, useCreateIngrediente } from '../hooks/useIngredientes';
import StatsCard from '@/components/StatsCard';
import PopupForm from '@/components/PopUpCreate';

const Ingredientes: React.FC = () => {
  // Hooks para obtener y crear ingredientes
  const { data, isLoading, error: errorIngredientes } = useIngredientes();
  const { mutate, isPending, isSuccess, error: errorCreate } = useCreateIngrediente();

  // Estados locales
  const [searchTerm, setSearchTerm] = useState('');
  const [popupCreateOpen, setPopupCreateOpen] = useState(false);

  // Crear nuevo ingrediente
  const handleCreate = (formData: any) => {
    const dto = {
      Nombre: formData.Nombre || formData.nombre,
      UnidadCompra: formData.UnidadCompra || formData.unidadCompra,
      PrecioUnitario: parseFloat(formData.PrecioUnitario || formData.precioUnitario || formData.precio),
    };
  
    console.log("Datos enviados al backend:", dto);
  
    mutate(dto, {
      onSuccess: () => {
        setPopupCreateOpen(false);
      },
      onError: (err: any) => {
        console.error("Error al crear ingrediente:", err.response?.data || err);
      },
    });
  };

  // Filtrado por búsqueda
  const filteredData = data?.filter((ingrediente) =>
    ingrediente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Error state
  if (errorIngredientes) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        Error al cargar ingredientes
      </div>
    );
  }

  // Estadísticas
  const totalIngredientes = data?.length || 0;
  const costoTotal = data?.reduce((sum, ing) => sum + ing.precioUnitario, 0) || 0;
  const ingredienteMasCostoso = data?.reduce((max, ing) => 
    ing.precioUnitario > max.precioUnitario ? ing : max
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Ingredientes</h1>
        <p className="text-primary-600">Gestión de inventario y precios de ingredientes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          label="Total Ingredientes"
          value={totalIngredientes}
          icon={Package}
          iconColor="primary"
          delay={0}
          onClick={() => setSearchTerm("")}
        />

        <StatsCard
          label="Ingredientes mas costoso"
          value={ingredienteMasCostoso?.nombre ?? "N/A"}
          icon={DollarSignIcon}
          iconColor="primary"
          delay={0}
          onClick={() => setSearchTerm(ingredienteMasCostoso?.nombre ?? "")}
        />

        <StatsCard
          label="Reportes y estadisticas"
          value="Visitar"
          icon={ArrowUpLeft}
          iconColor="primary"
          delay={0}
          href="/reportes/ingredientes"
        />
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-primary-200 rounded-xl shadow-sm border border-primary-200 p-4 mb-8"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar ingrediente por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 
             bg-primary-100 text-primary-900 
             placeholder-primary-500
             border border-primary-300 
             rounded-lg 
             focus:ring-2 focus:ring-primary-400 focus:border-transparent 
             outline-none"/>
        </div>

        {/* Línea inferior: Mostrar / Agregar */}
        <div className="flex items-center justify-between mt-2 text-sm text-primary-600">
          {filteredData && filteredData.length > 0 ? (
            <p>
              Mostrando {filteredData.length} de {totalIngredientes} ingredientes
            </p>
          ) : (
            <p>&nbsp;</p>
          )}

          <button
            onClick={() => setPopupCreateOpen(true)}
            className="flex items-center gap-1 text-primary-500 hover:text-primary-700 transition-colors text-xs font-medium"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>
      </motion.div>

      {/* Tabla */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-primary-50 rounded-xl shadow-sm border border-primary-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary-50 border-b border-primary-200">
                <th className="bg-primary-200 px-6 py-4 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">#</th>
                <th className="bg-primary-200 px-6 py-4 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">Nombre</th>
                <th className="bg-primary-200 px-6 py-4 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">Unidad</th>
                <th className="bg-primary-200 px-6 py-4 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">Precio Unitario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-200">
              {(filteredData || []).map((ing, index) => (
                <motion.tr
                  key={ing.idIngrediente ?? index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="hover:bg-primary-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-primary-900 font-medium">
                    {ing.idIngrediente}
                  </td>
                  <td className="px-6 py-4 text-sm text-primary-900">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="font-medium">{ing.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-primary-600">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-200 text-primary-800">
                      {ing.unidadCompra}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">
                    {ing.precioUnitario.toLocaleString('es-AR', {
                      style: 'currency',
                      currency: 'ARS',
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Estado vacío */}
        {filteredData && filteredData.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <p className="text-primary-600 font-medium">
              No se encontraron ingredientes
            </p>
            <p className="text-primary-400 text-sm mt-1">
              Intenta con otro término de búsqueda
            </p>
          </div>
        )}
      </motion.div>

      {/* Popup de creación */}
      <PopupForm
        isOpen={popupCreateOpen}
        tipo="ingrediente"
        unidadesCompra={["kg", "g", "unidad", "litro", "ml"]}
        onClose={() => setPopupCreateOpen(false)}
        onSubmit={handleCreate}
      />

      {/* Mostrar error de creación si ocurre */}
      {errorCreate && (
        <p className="text-red-500 mt-4 text-sm">
          Error al crear ingrediente. Intenta nuevamente.
        </p>
      )}
    </div>
  );
};

export default Ingredientes;
