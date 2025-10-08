import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTortas } from "../hooks/useTortas";
import { useMedidaDetalle } from "../hooks/useMedidaDetalle";
import { TortaIngrediente, MedidaCostoExtra } from "../types/medidas";

// Mapeo global de medidas simuladas
const medidasGlobal: Record<
  string,
  { nombre: string; diametro: number; peso: number }
> = {
  "22 cm": { nombre: "Pequeña", diametro: 22, peso: 1.2 },
  "24 cm": { nombre: "Mediana", diametro: 24, peso: 1.6 },
  "26 cm": { nombre: "Grande", diametro: 26, peso: 2.1 },
};

// Alturas simuladas según torta
const alturasPorTorta: Record<number, number> = {
  12: 5,
  13: 6,
  14: 7,
  15: 8,
  16: 7,
  17: 5,
  18: 5,
  19: 6,
  20: 6,
  21: 7,
  22: 7,
};

const Tortas: React.FC = () => {
    const { data, isLoading, error } = useTortas();
    const [tortaSeleccionada, setTortaSeleccionada] = useState<number | null>(
    null
    );
    const [medidaSeleccionada, setMedidaSeleccionada] = useState<number | null>(
    null
    );
    const { data: medidaDetalle, isLoading: loadingDetalle } = useMedidaDetalle(
    medidaSeleccionada ?? 0
    );

    if (isLoading)
    return (
        <div className="text-center py-10 text-gray-600">Cargando tortas...</div>
    );
    if (error)
    return (
        <div className="text-center text-red-600">
        Error al cargar las tortas: {error.message}
        </div>
    );
    if (!data?.length)
    return (
        <div className="text-center text-gray-500">No hay tortas disponibles</div>
    );

    return (
    <div className="max-w-6xl mx-auto py-10 px-6 font-sans">
        <h1 className="text-3xl font-bold text-primary-700 mb-10 text-center">
        Catálogo de Tortas 🍰
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((torta) => (
            <motion.div
            key={torta.idTorta}
            layout
            onClick={() => {
                setTortaSeleccionada(
                tortaSeleccionada === torta.idTorta ? null : torta.idTorta
                );
                setMedidaSeleccionada(null);
            }}
            className={`rounded-2xl border-2 border-primary-300 overflow-hidden cursor-pointer bg-white transition-transform hover:-translate-y-1 ${
                tortaSeleccionada === torta.idTorta
                ? "ring-2 ring-primary-500"
                : ""
            }`}
            >
            {/* Imagen con overlay */}
            <div className="relative w-full h-48">
                <img
                src={`/assets/tortas/${torta.nombre
                    .toLowerCase()
                    .replace(/\s/g, "")}.jpg`}
                alt={torta.nombre}
                className="w-full h-full object-cover"
                onError={(e) => {
                    (e.target as HTMLImageElement).src =
                    "/assets/default-cake.jpg";
                }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-4">
                <h2 className="text-xl font-semibold text-white drop-shadow-md">
                    {torta.nombre}
                </h2>
                <p className="text-sm text-gray-200">
                    {torta.cantidadMedidas || 0} tamaños disponibles
                </p>
                </div>
            </div>

            {/* Info (solo visible si la torta está seleccionada) */}
            {tortaSeleccionada === torta.idTorta && (
            <div className="p-5 text-center">
                <AnimatePresence>
                <motion.div
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                >
                    {torta.medidas.map((m) => {
                    const keyTamano = m.tamano.trim();
                    const medidaInfo =
                        medidasGlobal[keyTamano as keyof typeof medidasGlobal];
                    const altura = alturasPorTorta[torta.idTorta] ?? 7;
                    const isSelected = medidaSeleccionada === m.idMedida;

                    return (
                        <div key={m.idMedida} className="space-y-2">
                        {/* Botón de medida */}
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                setMedidaSeleccionada(isSelected ? null : m.idMedida);
                            }}
                            className={`w-full text-center py-2 rounded-xl font-semibold tracking-wide cursor-pointer transition-all duration-200 border select-none
                                ${
                                isSelected
                                    ? "border-primary-500 bg-primary-100 text-primary-900 shadow-sm"
                                    : "border-primary-200 bg-white hover:shadow-md hover:bg-primary-50 text-primary-700"
                                }`}
                            >
                            {medidaInfo ? medidaInfo.nombre : keyTamano}
                            </div>




                        {/* Detalle */}
                        <AnimatePresence>
                            {isSelected && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                                className="bg-white text-gray-700 border border-primary-200 rounded-lg shadow-md p-4 text-sm"
                            >
                                {loadingDetalle ? (
                                <p className="text-center text-primary-600">
                                    Cargando detalle...
                                </p>
                                ) : (
                                <div className="space-y-4">
                                    {/* Medidas físicas */}
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p className="text-xs uppercase font-bold text-primary-700">
                                        Altura
                                        </p>
                                        <p className="text-base font-semibold mt-1">
                                        {altura} cm
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-bold text-primary-700">
                                        Diámetro
                                        </p>
                                        <p className="text-base font-semibold mt-1">
                                        {medidaInfo?.diametro ?? "—"} cm
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-bold text-primary-700">
                                        Peso
                                        </p>
                                        <p className="text-base font-semibold mt-1">
                                        {medidaInfo?.peso ?? "—"} kg
                                        </p>
                                    </div>
                                    </div>
                                </div>
                                )}
                            </motion.div>
                            )}
                        </AnimatePresence>
                        </div>
                    );
                    })}
                </motion.div>
                </AnimatePresence>
            </div>
)}

            </motion.div>
        ))}
        </div>
    </div>
    );
};

export default Tortas;
