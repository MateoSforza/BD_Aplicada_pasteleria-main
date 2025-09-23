import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  LayoutDashboard, 
  Cake, 
  ChefHat, 
  DollarSign, 
  BarChart3, 
  LogOut, 
  Menu, 
  X
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const { logout, getStoredUser } = useAuth();
  const usuario = getStoredUser();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tortas', href: '/tortas', icon: Cake },
    { name: 'Ingredientes', href: '/ingredientes', icon: ChefHat },
    { name: 'Costos Extra', href: '/costos-extra', icon: DollarSign },
    { name: 'Reportes', href: '/reportes', icon: BarChart3 },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Overlay en móvil */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary-800 text-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo / Header */}
          <div className="flex items-center justify-between h-16 px-6 bg-primary-600">
            <h1 className="text-xl font-bold tracking-wide">CamilasBakery</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-primary-700 p-1 rounded"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Usuario / Marca */}
          <div className="p-6 bg-primary-700 border-b border-primary-600">
            <div className="flex items-center space-x-3">
              {/* Logo con iniciales CB */}
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center font-bold text-white text-sm">
                CB
              </div>
              <div>
                <p className="text-sm font-semibold">
                  {usuario ? (usuario as any).username || (usuario as any).nombreUsuario : "Administrador"}
                </p>
                <p className="text-xs text-primary-200">CamilasBakery</p>
              </div>
            </div>
          </div>

          {/* Menú navegación */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                    ${isActive(item.href)
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-primary-100 hover:bg-primary-700 hover:text-white'}
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-primary-600">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Contenido */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-primary-600 hover:text-primary-700 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-bold text-gray-800 tracking-wide">
              Panel de Control
            </h2>
            <div className="w-6"></div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6 space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
