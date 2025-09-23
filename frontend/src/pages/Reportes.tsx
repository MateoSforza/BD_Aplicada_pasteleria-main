import React from 'react';

const Reportes: React.FC = () => {
  return (
    <div>
      <h1 style={{ color: '#2c3e50', marginBottom: '2rem' }}>Reportes</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#34495e', marginBottom: '1rem' }}>Tortas Más Populares</h3>
          <p>Próximamente: Lista de tortas más vendidas</p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#34495e', marginBottom: '1rem' }}>Gastos y Ganancias</h3>
          <p>Próximamente: Análisis financiero</p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#34495e', marginBottom: '1rem' }}>Stock de Ingredientes</h3>
          <p>Próximamente: Control de inventario</p>
        </div>
      </div>
    </div>
  );
};

export default Reportes;