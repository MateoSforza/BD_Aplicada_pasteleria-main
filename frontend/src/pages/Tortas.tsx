import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTortas } from "../hooks/useTortas";
import { useMedidaDetalle } from "../hooks/useMedidaDetalle";
import { TortaIngrediente, MedidaCostoExtra } from "../types/medidas";

// Mapeo global de medidas simuladas
const medidasGlobal: Record<string, { nombre: string; diametro: number; peso: number }> = {
    "22 cm": { nombre: "Pequeña", diametro: 22, peso: 1.2 },
    "24 cm": { nombre: "Mediana", diametro: 24, peso: 1.6 },
    "26 cm": { nombre: "Grande", diametro: 26, peso: 2.1 },
};

// Alturas simuladas según la torta
const alturasPorTorta: Record<number, number> = {
    12: 5, 13: 6, 14: 7, 15: 8, 16: 7, 17: 5,
    18: 5, 19: 6, 20: 6, 21: 7, 22: 7,
};

const Tortas: React.FC = () => {
    const { data, isLoading, error } = useTortas();
    const [tortaSeleccionada, setTortaSeleccionada] = useState<number | null>(null);
    const [medidaSeleccionada, setMedidaSeleccionada] = useState<number | null>(null);
    const { data: medidaDetalle, isLoading: loadingDetalle } = useMedidaDetalle(medidaSeleccionada ?? 0);

    if (isLoading) return <div className="text-center py-10 text-gray-600">Cargando tortas...</div>;
    if (error) return <div className="text-center text-red-600">Error al cargar las tortas: {error.message}</div>;
    if (!data?.length) return <div className="text-center text-gray-500">No hay tortas disponibles</div>;

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
                setTortaSeleccionada(tortaSeleccionada === torta.idTorta ? null : torta.idTorta);
                setMedidaSeleccionada(null);
            }}
            className={`rounded-2xl border-2 border-primary-300 overflow-hidden cursor-pointer bg-white transition-transform hover:-translate-y-1 ${
                tortaSeleccionada === torta.idTorta ? "ring-2 ring-primary-500" : ""
            }`}
            >
            {/* Imagen con overlay */}
            <div className="relative w-full h-48">
                <img
                src={`/assets/tortas/${torta.nombre.toLowerCase().replace(/\s/g, "")}.jpg`}
                alt={torta.nombre}
                className="w-full h-full object-cover"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/default-cake.jpg";
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

            {/* Info (solo visible cuando la torta está abierta) */}
            {tortaSeleccionada === torta.idTorta && (
                <AnimatePresence mode="wait">
                <motion.div
                    key={torta.idTorta}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-5 text-center bg-white shadow-inner rounded-b-2xl border-t border-primary-200"
                >
                    <motion.div
                    className="mt-2 space-y-3"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                        transition: { staggerChildren: 0.07 },
                        },
                    }}
                    >
                    {torta.medidas.map((m) => {
                        const keyTamano = m.tamano.trim();
                        const medidaInfo = medidasGlobal[keyTamano];
                        const altura = alturasPorTorta[torta.idTorta] ?? 7;

                        return (
                        <motion.div
                            key={m.idMedida}
                            variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0 },
                            }}
                            onClick={(e) => {
                            e.stopPropagation();
                            setMedidaSeleccionada(
                                medidaSeleccionada === m.idMedida ? null : m.idMedida
                            );
                            }}
                            className={`bg-primary-100 hover:bg-primary-200 text-primary-800 font-medium px-4 py-3 h-12 rounded-lg flex items-center justify-center text-base transition-all cursor-pointer shadow-sm ${
                            medidaSeleccionada === m.idMedida
                                ? "ring-2 ring-primary-500 scale-[1.02]"
                                : ""
                            }`}
                        >
                            {medidaInfo ? `${medidaInfo.nombre}` : keyTamano}

                            {/* Nivel 3: Detalle */}
                            <AnimatePresence>
                            {medidaSeleccionada === m.idMedida && (
                                <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                                className="mt-3 bg-primary-50 text-gray-700 p-4 rounded-md text-sm border border-primary-100 shadow-md"
                                >
                                {loadingDetalle ? (
                                    <div>Cargando detalle...</div>
                                ) : (
                                    <div className="space-y-4">
                                    {/* Info física */}
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                        <p className="text-xs uppercase font-bold text-primary-700 tracking-wide">
                                            Altura
                                        </p>
                                        <p className="text-sm font-medium mt-1">
                                            {altura} cm
                                        </p>
                                        </div>
                                        <div>
                                        <p className="text-xs uppercase font-bold text-primary-700 tracking-wide">
                                            Diámetro
                                        </p>
                                        <p className="text-sm font-medium mt-1">
                                            {medidaInfo?.diametro ?? "—"} cm
                                        </p>
                                        </div>
                                        <div>
                                        <p className="text-xs uppercase font-bold text-primary-700 tracking-wide">
                                            Peso
                                        </p>
                                        <p className="text-sm font-medium mt-1">
                                            {medidaInfo?.peso ?? "—"} kg
                                        </p>
                                        </div>
                                    </div>

                                    <hr className="border-primary-200 my-2" />

                                    {/* Costos */}
                                    <div className="text-left space-y-1 text-sm">
                                        <p>
                                        <b>Precio venta:</b>{" "}
                                        {m.precioVenta.toLocaleString("es-AR", {
                                            style: "currency",
                                            currency: "ARS",
                                        })}
                                        </p>
                                        <p>
                                        <b>Ganancia:</b>{" "}
                                        {m.ganancia.toLocaleString("es-AR", {
                                            style: "currency",
                                            currency: "ARS",
                                        })}
                                        </p>
                                        <p>
                                        <b>Costo total:</b>{" "}
                                        {m.costoTotal.toLocaleString("es-AR", {
                                            style: "currency",
                                            currency: "ARS",
                                        })}
                                        </p>
                                    </div>
                                    </div>
                                )}
                                </motion.div>
                            )}
                            </AnimatePresence>
                        </motion.div>
                        );
                    })}
                    </motion.div>
                </motion.div>
                </AnimatePresence>
            )}
            </motion.div>
        ))}
        </div>
    </div>
    );
};

export default Tortas;
