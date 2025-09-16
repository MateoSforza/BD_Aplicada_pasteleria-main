import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const sidebarStyle: React.CSSProperties = {
  width: 220,
  background: '#f4e2d8',
  padding: '2rem 1rem',
  minHeight: '100vh',
  boxShadow: '2px 0 8px #0001',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
};

const linkStyle: React.CSSProperties = {
  display: 'block',
  padding: '12px 18px',
  margin: '4px 0',
  borderRadius: 8,
  color: '#b45f06',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: 18,
  background: 'transparent',
  transition: 'background 0.2s',
};

const activeLinkStyle: React.CSSProperties = {
  ...linkStyle,
  background: '#fff7e6',
  color: '#00704a',
};

const DashboardLayout: React.FC = () => {
  // TODO: highlight active link if needed
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9f6f2' }}>
      <aside style={sidebarStyle}>
        <h2 style={{ color: '#b45f06', marginBottom: 32, textAlign: 'center' }}>Pastelería</h2>
        <Link to="/tortas" style={linkStyle}>Tortas</Link>
        <Link to="/medidas" style={linkStyle}>Medidas</Link>
        <Link to="/ingredientes" style={linkStyle}>Ingredientes</Link>
        <Link to="/costos-extra" style={linkStyle}>Costos Extra</Link>
        <Link to="/reportes" style={linkStyle}>Reportes</Link>
      </aside>
      <main style={{ flex: 1, padding: '2rem 3vw', minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
