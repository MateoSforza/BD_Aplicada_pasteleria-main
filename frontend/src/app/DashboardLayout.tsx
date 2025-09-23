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
  X,
  User
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
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 bg-primary-500">
            <h1 className="text-xl font-bold text-white">Pastelería Camila</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-primary-600 p-1 rounded"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User info */}
          {usuario && (
            <div className="p-6 bg-gray-50 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {(usuario as any).username || (usuario as any).nombreUsuario || 'Usuario'}
                  </p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`sidebar-item ${isActive(item.href) ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
            >
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              Pastelería Camila
            </h1>
            <div className="w-6"></div> {/* Spacer */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;