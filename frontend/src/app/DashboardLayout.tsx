import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const DashboardLayout: React.FC = () => {
  const { logout, getStoredUser } = useAuth();
  const usuario = getStoredUser();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <nav style={{
        width: '250px',
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '1rem'
      }}>
        <h2 style={{ 
          marginBottom: '2rem', 
          color: '#ecf0f1',
          textAlign: 'center' 
        }}>
          Pastelería Camila
        </h2>

        {/* Info del usuario */}
        {usuario && (
          <div style={{
            backgroundColor: '#34495e',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '2rem'
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              Bienvenido, <strong>{(usuario as any).username || (usuario as any).nombreUsuario || 'Usuario'}</strong>
            </p>
          </div>
        )}

        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '1rem' }}>
            <Link to="/dashboard" style={{
              color: 'white',
              textDecoration: 'none',
              display: 'block',
              padding: '0.75rem',
              borderRadius: '4px',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}>
              📊 Dashboard
            </Link>
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <Link to="/tortas" style={{
              color: 'white',
              textDecoration: 'none',
              display: 'block',
              padding: '0.75rem',
              borderRadius: '4px',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}>
              🎂 Tortas
            </Link>
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <Link to="/ingredientes" style={{
              color: 'white',
              textDecoration: 'none',
              display: 'block',
              padding: '0.75rem',
              borderRadius: '4px',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}>
              🥄 Ingredientes
            </Link>
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <Link to="/costos-extra" style={{
              color: 'white',
              textDecoration: 'none',
              display: 'block',
              padding: '0.75rem',
              borderRadius: '4px',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}>
              💰 Costos Extra
            </Link>
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <Link to="/reportes" style={{
              color: 'white',
              textDecoration: 'none',
              display: 'block',
              padding: '0.75rem',
              borderRadius: '4px',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}>
              📈 Reportes
            </Link>
          </li>
        </ul>

        {/* Botón de logout */}
        <button
          onClick={logout}
          style={{
            marginTop: '2rem',
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cerrar Sesión
        </button>
      </nav>

      {/* Main content */}
      <main style={{ 
        flex: 1, 
        padding: '2rem',
        backgroundColor: '#ecf0f1' 
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;