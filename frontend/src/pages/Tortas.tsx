
import React, { useState } from 'react';
import { useTortas } from '../hooks/useTortas';
import { useMedidaDetalle } from '../hooks/useMedidaDetalle';
import { TortaIngrediente, MedidaCostoExtra } from '../types/medidas';

const Tortas: React.FC = () => {
    const { data, isLoading, error } = useTortas();
    const [selectedMedidaId, setSelectedMedidaId] = useState<number | null>(null);

    const medidas = (Array.isArray(data) ? data : []).flatMap(t => t.medidas.map(m => ({ ...m, tortaNombre: t.nombre })));
    const { data: medidaDetalle, isLoading: loadingDetalle } = useMedidaDetalle(selectedMedidaId ?? 0);

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar tortas</div>;

    return (
        <div style={{ maxWidth: 900, margin: '2rem auto', fontFamily: 'sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#b45f06' }}>Tortas</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 2px 8px #0001' }}>
                <thead>
                    <tr style={{ background: '#f4e2d8' }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>#</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Medidas</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Precio Promedio</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Ver medidas</th>
                    </tr>
                </thead>
                <tbody>
                    {(Array.isArray(data) ? data : []).map((torta, idx) => (
                        <tr key={torta.idTorta ?? idx} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{torta.idTorta}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{torta.nombre}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{torta.cantidadMedidas}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{torta.precioPromedio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                                                {torta.medidas && torta.medidas.length > 0 ? (
                                                    torta.medidas.map(medida => (
                                                        (medida.idMedida && medida.tamano) ? (
                                                            <button
                                                                key={medida.idMedida}
                                                                style={{ margin: 2, background: '#00704a', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', minWidth: 60 }}
                                                                onClick={() => setSelectedMedidaId(medida.idMedida)}
                                                                disabled={!medida.idMedida}
                                                                title={`Ver detalle de ${medida.tamano}`}
                                                            >
                                                                {medida.tamano} <span style={{ fontSize: 12, opacity: 0.7 }}>({medida.precioVenta ? medida.precioVenta.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }) : ''})</span>
                                                            </button>
                                                        ) : null
                                                    ))
                                                ) : (
                                                    <span style={{ color: '#888' }}>Sin medidas</span>
                                                )}
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
