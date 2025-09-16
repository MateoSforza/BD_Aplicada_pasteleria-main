
import React from 'react';
import { useCostoExtra } from '../hooks/useCostoExtra';

const CostoExtra: React.FC = () => {
    const { data, isLoading, error } = useCostoExtra();

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar costos extra</div>;

    return (
        <div style={{ maxWidth: 800, margin: '2rem auto', fontFamily: 'sans-serif' }}>
        <h1 style={{ textAlign: 'center', color: '#b45f06' }}>Costos Extra</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 2px 8px #0001' }}>
            <thead>
            <tr style={{ background: '#f4e2d8' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>#</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Precio Unitario</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nota</th>
            </tr>
            </thead>
            <tbody>
            {(Array.isArray(data) ? data : []).map((costo, idx) => (
                <tr key={costo.idCostoExtra ?? idx} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{costo.idCostoExtra}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{costo.nombre}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{costo.precioUnitario.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{costo.nota || '-'}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default CostoExtra;
