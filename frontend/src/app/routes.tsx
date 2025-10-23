import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Productos from '../pages/Productos';
import Tortas from '../pages/Tortas';
import Ingredientes from '../pages/Ingredientes';
import CostoExtra from '../pages/CostoExtra';
import Reportes from '../pages/Reportes';
import Pedidos from '../pages/Pedidos'; 
import Login from '../pages/Login';
import ProtectedRoute from '../components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'productos', element: <Productos /> , children: [
        { path: 'tortas', element: <Tortas /> },
        { path: 'ingredientes', element: <Ingredientes /> },
        { path: 'costos-extra', element: <CostoExtra /> },
        { index: true, element: <Tortas /> }
      ]},
      // Rutas antiguas redirigidas a productos
      { path: 'tortas', element: <Productos /> },
      { path: 'ingredientes', element: <Productos /> },
      { path: 'costos-extra', element: <Productos /> },
      { path: 'reportes', element: <Reportes /> },
      { path: 'Pedidos', element: <Pedidos />  }
    ]
  }
]);
