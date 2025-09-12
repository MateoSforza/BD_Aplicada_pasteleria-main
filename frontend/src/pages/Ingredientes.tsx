
import React from 'react';
import { useIngredientes } from '../hooks/useIngredientes';

const Ingredientes: React.FC = () => {
    const { data, isLoading, error } = useIngredientes();

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar ingredientes</div>;

    return (
        <div style={{ maxWidth: 800, margin: '2rem auto', fontFamily: 'sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#b45f06' }}>Ingredientes</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 2px 8px #0001' }}>
                <thead>
                    <tr style={{ background: '#f4e2d8' }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>#</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Unidad</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Precio Unitario</th>
                    </tr>
                </thead>
                <tbody>
                    {(Array.isArray(data) ? data : []).map((ing, idx) => (
                        <tr key={ing.idIngrediente ?? idx} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{ing.idIngrediente}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ing.nombre}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ing.unidadCompra}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>
                                {ing.precioUnitario.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Ingredientes;
