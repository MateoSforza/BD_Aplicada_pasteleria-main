// src/app/DashboardLayout.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from '../components/general/Sidebar';
import { ThemeToggle } from '../components/general/ThemeToggle';

import logoSrc from '/assets/tortas/logo.png';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-primary-50 text-primary-900 font-sans">
      {/* Overlay en móvil */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Contenido */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-primary-100 shadow-md border-b border-primary-300 sticky top-0 z-10">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-primary-600 hover:text-primary-700 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop hover trigger: three lines icon - opens sidebar on hover */}
            <div className="hidden lg:block" onMouseEnter={() => setSidebarOpen(true)}>
              <div className="p-2 rounded hover:bg-primary-200 cursor-pointer">
                <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="1" width="20" height="2" rx="1" fill="#6B3B07" />
                  <rect y="6" width="20" height="2" rx="1" fill="#6B3B07" />
                  <rect y="11" width="20" height="2" rx="1" fill="#6B3B07" />
                </svg>
              </div>
            </div>

            {/* Contenedor para centrar el logo sin romper el layout */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    navigate('/');
                  }, 800);
                }}
                className="flex items-center gap-3 bg-transparent border-none p-0"
                aria-label="Ir al inicio"
              >
                <img src={logoSrc} alt="CamilasBakery" className="w-10 h-10 rounded-full" />
              </button>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <ThemeToggle />
            </div>
          </div>
        </header>

  {/* Page content */}
  <main className="flex-1 overflow-y-auto bg-primary-50">
          <div className="p-6 space-y-6">
            <Outlet />
          </div>
        </main>
        {/* Capa de carga con logo girando */}
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-lg">
              <img src={logoSrc} alt="Cargando" className="w-20 h-20 animate-spin-slow" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;