import React, { useState } from 'react';
import { useTortas } from '../hooks/useTortas';
import { useMedidaDetalle } from '../hooks/useMedidaDetalle';
import { TortaIngrediente, MedidaCostoExtra } from '../types/medidas';

const Tortas: React.FC = () => {
    const { data, isLoading, error } = useTortas();
    const [selectedMedidaId, setSelectedMedidaId] = useState<number | null>(null);

    const medidas = (Array.isArray(data) ? data : []).flatMap(t => t.medidas.map(m => ({ ...m, tortaNombre: t.nombre })));
    const { data: medidaDetalle, isLoading: loadingDetalle } = useMedidaDetalle(selectedMedidaId ?? 0);

    if (isLoading) return <div>Cargando tortas...</div>;
    if (error) return <div>Error al cargar las tortas: {error.message}</div>;
    if (!data || !Array.isArray(data) || data.length === 0) return <div>No hay tortas disponibles</div>;

    return (
        <div style={{ maxWidth: 900, margin: '2rem auto', fontFamily: 'sans-serif' }}>
            <h1 style={{ color: '#2c3e50', marginBottom: '2rem' }}>Tortas</h1>
            
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <thead>
                    <tr style={{ backgroundColor: '#34495e', color: 'white' }}>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>ID</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Nombre</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Cantidad de Medidas</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Precio Promedio</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((torta) => (
                        <tr key={torta.idTorta} style={{
                            borderBottom: '1px solid #ecf0f1'
                        }}>
                            <td style={{ padding: '1rem' }}>{torta.idTorta}</td>
                            <td style={{ padding: '1rem' }}>{torta.nombre}</td>
                            <td style={{ padding: '1rem' }}>{torta.cantidadMedidas || 0}</td>
                            <td style={{ padding: '1rem' }}>
                                ${(torta.precioPromedio || 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedMedidaId && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, maxWidth: 500, boxShadow: '0 2px 16px #0004', position: 'relative' }}>
                        <button onClick={() => setSelectedMedidaId(null)} style={{ position: 'absolute', top: 8, right: 8, background: 'transparent', border: 'none', fontSize: 22, cursor: 'pointer', color: '#b45f06' }}>×</button>
                        {loadingDetalle ? (
                            <div>Cargando detalle...</div>
                        ) : medidaDetalle ? (
                            <div>
                                <h2 style={{ color: '#00704a' }}>Detalle de medida</h2>
                                <div><b>Tamaño:</b> {medidaDetalle.tamano}</div>
                                <div><b>Precio venta:</b> {medidaDetalle.precioVenta.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}</div>
                                <div><b>Ganancia:</b> {medidaDetalle.ganancia.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}</div>
                                <div><b>Costo total:</b> {medidaDetalle.costoTotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}</div>
                                                <div><b>Ingredientes:</b>
                                                    <ul>
                                                        {(medidaDetalle.ingredientes as TortaIngrediente[] | undefined)?.map((ing, idx) => (
                                                            <li key={ing.idTortaIngrediente ?? idx}>{ing.nombreIngrediente} - {ing.cantidadUsada} {ing.unidadUsada} - {ing.costoTotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div><b>Costos extra:</b>
                                                    <ul>
                                                        {(medidaDetalle.costosExtra as MedidaCostoExtra[] | undefined)?.map((c, idx) => (
                                                            <li key={c.idMedidaCostoExtra ?? idx}>{c.nombreCostoExtra} - {c.cantidad} x {c.precioUnitario.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })} = {c.costoTotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                            </div>
                        ) : (
                            <div>No se encontró el detalle.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tortas;
