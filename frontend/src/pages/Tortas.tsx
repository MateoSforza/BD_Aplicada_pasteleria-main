import React, { useState } from "react";
import { useTortas } from "../hooks/useTortas";
import { TortaCard } from "@/components/tortas/TortaCard";
import { ShinyText } from "@/components/reactbits/shiny-text";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const Tortas: React.FC = () => {
  const { data, isLoading, error } = useTortas();
  const [tortaSeleccionada, setTortaSeleccionada] = useState<number | null>(null);
  const [medidasSeleccionadas, setMedidasSeleccionadas] = useState<Record<number, number | null>>({});
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading)
    return <div className="text-center py-10 text-gray-600">Cargando tortas...</div>;

  if (error)
    return (
      <div className="text-center text-red-600">
        Error al cargar las tortas: {error.message}
      </div>
    );

  if (!data?.length)
    return <div className="text-center text-primary-500">No hay tortas disponibles</div>;

  // Filtrar tortas por nombre
  const filteredData = data.filter((torta) =>
    torta.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary-900 mb-2">Catálogo de Tortas</h1>
        <p className="text-primary-600">Gestión de tortas y precios</p>
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
            placeholder="Buscar torta por nombre..."
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
      </motion.div>

      {/* Resultados */}
      {filteredData.length === 0 ? (
        <div className="text-center py-10 text-primary-500">
          No se encontraron tortas con "{searchTerm}"
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {filteredData.map((torta) => (
            <TortaCard
              key={torta.IdTorta}
              torta={torta}
              isExpanded={tortaSeleccionada === torta.IdTorta}
              onToggle={() => {
                setTortaSeleccionada((prev) =>
                  prev === torta.IdTorta ? null : torta.IdTorta
                );
                setMedidasSeleccionadas((prev) => ({
                  ...prev,
                  [torta.IdTorta]: null
                }));
              }}
              medidaSeleccionada={medidasSeleccionadas[torta.IdTorta] || null}
              onMedidaSelect={(medidaId) => {
                setMedidasSeleccionadas((prev) => ({
                  ...prev,
                  [torta.IdTorta]: medidaId
                }));
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tortas;