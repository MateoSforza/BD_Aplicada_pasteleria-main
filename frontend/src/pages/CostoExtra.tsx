import React from 'react';
import { useCostoExtra } from '../hooks/useCostoExtra';

const CostoExtra: React.FC = () => {
  const { data, isLoading, error } = useCostoExtra();

  if (isLoading) return <div>Cargando costos extra...</div>;
  if (error) return <div>Error al cargar los costos extra: {error.message}</div>;

  return (
    <div>
      <h1 style={{ color: '#2c3e50', marginBottom: '2rem' }}>Costos Extra</h1>
      
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
            <th style={{ padding: '1rem', textAlign: 'left' }}>Precio Unitario</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Nota</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(data) ? data : []).map((costo) => (
            <tr key={costo.idCostoExtra} style={{
              borderBottom: '1px solid #ecf0f1'
            }}>
              <td style={{ padding: '1rem' }}>{costo.idCostoExtra}</td>
              <td style={{ padding: '1rem' }}>{costo.nombre}</td>
              <td style={{ padding: '1rem' }}>
                ${costo.precioUnitario?.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </td>
              <td style={{ padding: '1rem' }}>{costo.nota || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CostoExtra;
