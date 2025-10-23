// src/components/Sidebar.tsx
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, X } from 'lucide-react';
import { navigationItems } from '../../config/navigation';
import NavItem from './NavItem';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { logout, getStoredUser } = useAuth();
  const usuario = getStoredUser();

  return (
    <aside
      onMouseLeave={() => onClose()}
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-primary-100 text-priamry-800 shadow-xl transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-primary-200 border-b border-primary-300">
          <h1 className="text-xl font-bold tracking-wide text-primary-700" style={{ textTransform: 'uppercase', fontFamily: 'Arial Black, Arial, sans-serif' }}>
            CamilasBakery
          </h1>
          <div className="flex items-center gap-2">
            {/* Botón cerrar (móvil) */}
            <button
              onClick={onClose}
              className="lg:hidden text-primary-600 hover:bg-primary-300 p-2 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Usuario */}
        <div className="p-6 bg-primary-100 border-b border-primary-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-400 rounded-full flex items-center justify-center font-bold text-white text-sm">
              CB
            </div>
            <div>
              <p className="text-sm font-semibold">
                {usuario
                  ? (usuario as any).username || (usuario as any).nombreUsuario || 'Usuario'
                  : 'Administrador'}
              </p>
              <p className="text-xs text-primary-500">CamilasBakery</p>
            </div>
          </div>
        </div>

        {/* Menú: centrado vertical y horizontalmente */}
        <div className="flex-1 flex items-center justify-center">
          <nav className="px-4 py-6 space-y-2 overflow-y-auto flex flex-col items-center" style={{ textTransform: 'uppercase', fontFamily: 'Arial Black, Arial, sans-serif' }}>
            {navigationItems.map((item) => (
              <NavItem
                key={item.name}
                name={item.name}
                href={item.href}
                icon={item.icon}
                children={item.children}
                onClick={onClose}
                showIcon={!['Inicio','Productos','Pedidos','Reportes'].includes(item.name)}
                large={['Inicio','Productos','Pedidos','Reportes'].includes(item.name)}
                noUnderline={item.name === 'Reportes'}
              />
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-primary-200">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-primary-300 hover:bg-primary-500 text-primary-800 hover:text-white rounded-lg font-semibold transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;