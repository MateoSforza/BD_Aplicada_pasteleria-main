import React, { useState } from 'react';
import { useIngredientes } from '../hooks/useIngredientes';

const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useIngredientes();
  const [selected, setSelected] = useState<number | null>(null);

  if (isLoading) return <div style={{textAlign:'center'}}>Cargando...</div>;
  if (error) return <div style={{textAlign:'center', color:'red'}}>Error al cargar datos</div>;

  // Resumen
  const total = data?.length || 0;
  const totalValor = data?.reduce((acc, ing) => acc + ing.precioUnitario, 0) || 0;
  const topCaros = (data || []).slice().sort((a, b) => b.precioUnitario - a.precioUnitario).slice(0, 5);
  const selectedIng = data?.find(i => i.idIngrediente === selected);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', fontFamily: 'sans-serif', background: '#f6f5ef', borderRadius: 16, boxShadow: '0 2px 16px #0002', padding: 32 }}>
      <h1 style={{ textAlign: 'center', color: '#00704a', fontWeight: 900, letterSpacing: 1 }}>Dashboard Pastelería</h1>
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', margin: '2rem 0' }}>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px #0001', padding: 24, minWidth: 160, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#00704a' }}>{total}</div>
          <div style={{ color: '#555', fontWeight: 500 }}>Ingredientes</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px #0001', padding: 24, minWidth: 160, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#b45f06' }}>{totalValor.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}</div>
          <div style={{ color: '#555', fontWeight: 500 }}>Valor total</div>
        </div>
      </div>
      <h2 style={{ color: '#00704a', marginTop: 32 }}>Top 5 ingredientes más caros</h2>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px #0001', padding: 24, marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#e6e1d9' }}>
              <th style={{ padding: 8, borderRadius: '8px 0 0 8px' }}>Nombre</th>
              <th style={{ padding: 8 }}>Unidad</th>
              <th style={{ padding: 8 }}>Precio</th>
              <th style={{ padding: 8, borderRadius: '0 8px 8px 0' }}>Ver detalle</th>
            </tr>
          </thead>
          <tbody>
            {topCaros.map(ing => (
              <tr key={ing.idIngrediente} style={{ borderBottom: '1px solid #eee', cursor: 'pointer', background: selected === ing.idIngrediente ? '#f4e2d8' : undefined }}>
                <td style={{ padding: 8 }}>{ing.nombre}</td>
                <td style={{ padding: 8 }}>{ing.unidadCompra}</td>
                <td style={{ padding: 8, textAlign: 'right' }}>{ing.precioUnitario.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}</td>
                <td style={{ padding: 8, textAlign: 'center' }}>
                  <button onClick={() => setSelected(ing.idIngrediente)} style={{ background: '#00704a', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedIng && (
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px #0001', padding: 24, margin: '0 auto', maxWidth: 400 }}>
          <h3 style={{ color: '#b45f06', marginTop: 0 }}>Detalle de ingrediente</h3>
          <div><b>Nombre:</b> {selectedIng.nombre}</div>
          <div><b>Unidad de compra:</b> {selectedIng.unidadCompra}</div>
          <div><b>Precio unitario:</b> {selectedIng.precioUnitario.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}</div>
          <button onClick={() => setSelected(null)} style={{ marginTop: 16, background: '#00704a', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 18px', cursor: 'pointer' }}>Volver</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
