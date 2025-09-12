import React, { useState } from 'react';
import { getIngredientes } from './api/api';

function App() {
  const [mensaje, setMensaje] = useState('¡Bienvenido al panel de control de la pastelería!');
  const [ingredientes, setIngredientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState(''); // 👈 nuevo estado para éxito

  const probarApi = async () => {
    setCargando(true);
    setError('');
    setExito('');
    try {
      const data = await getIngredientes();
      setIngredientes(data);
      setExito('✅ Conectado correctamente con la API.'); // 👈 mensaje de éxito
    } catch (e) {
      setError('❌ No se pudo conectar con la API.');
      setIngredientes([]);
    }
    setCargando(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8, fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#b45f06' }}>Pastelería</h1>
      <p style={{ textAlign: 'center' }}>{mensaje}</p>
      <button
        onClick={probarApi}
        style={{
          display: 'block',
          margin: '1rem auto',
          padding: '0.5rem 1rem',
          background: '#b45f06',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer'
        }}
      >
        Probar conexión con API
      </button>

      {cargando && <p style={{ color: '#b45f06', textAlign: 'center' }}>Cargando...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {exito && <p style={{ color: 'green', textAlign: 'center' }}>{exito}</p>} {/* 👈 muestra éxito */}

      {ingredientes.length > 0 && (
        <div>
          <h2 style={{ textAlign: 'center' }}>Ingredientes</h2>
          <ul>
            {ingredientes.map((ing, idx) => (
              <li key={ing.id || idx}>{ing.nombre || JSON.stringify(ing)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
