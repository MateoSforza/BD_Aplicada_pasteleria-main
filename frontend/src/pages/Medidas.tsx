import React from 'react';
import { useMedidasCostoExtra } from '../hooks/useMedidas';

const Medidas: React.FC = () => {
  const { data, isLoading, error } = useMedidasCostoExtra();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar medidas</div>;

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#b45f06' }}>Medidas - Costos Extra</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 2px 8px #0001' }}>
        <thead>
          <tr style={{ background: '#f4e2d8' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>#</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID Medida</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID Costo Extra</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre Costo Extra</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cantidad</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Precio Unitario</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Costo Total</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(data) ? data : []).map((medida, idx) => (
            <tr key={medida.idMedidaCostoExtra ?? idx} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{medida.idMedidaCostoExtra}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{medida.idMedida}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{medida.idCostoExtra}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{medida.nombreCostoExtra}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{medida.cantidad}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{medida.precioUnitario.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{medida.costoTotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medidas;
