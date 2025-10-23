import { createBrowserRouter, Navigate } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import Dashboard from '../pages/Dashboard'
import Productos from '../pages/Productos'
import Tortas from '../pages/Tortas'
import Ingredientes from '../pages/Ingredientes'
import CostoExtra from '../pages/CostoExtra'
import Pedidos from '../pages/Pedidos'
import Login from '../pages/Login'
import ProtectedRoute from '../components/ProtectedRoute'

// Reportes (layout + subpáginas)
import ReportesLayout from '../pages/reportes/ReportesLayout'
import ReportesMenu from '../pages/reportes/ReportesMenu'
import ReportesTortas from '../pages/reportes/ReportesTortas'
import ReportesIngredientes from '../pages/reportes/ReportesIngredientes'
import ReportesCostosExtras from '../pages/reportes/ReportesCostosExtras'
import ReportesPedidos from '../pages/reportes/ReportesPedidos'

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
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

      // Productos (tu panel con estado interno)
      {
        path: 'productos',
        element: <Productos />,
        children: [
          { path: 'tortas', element: <Tortas /> },
          { path: 'ingredientes', element: <Ingredientes /> },
          { path: 'costos-extra', element: <CostoExtra /> },
          { index: true, element: <Tortas /> },
        ],
      },
      // Rutas antiguas -> redirecciones limpias al panel de productos
      { path: 'tortas', element: <Navigate to="/productos" replace /> },
      { path: 'ingredientes', element: <Navigate to="/productos" replace /> },
      { path: 'costos-extra', element: <Navigate to="/productos" replace /> },

      // Reportes (menú + subrutas dedicadas)
      {
        path: 'reportes',
        element: <ReportesLayout />,
        children: [
          { index: true, element: <ReportesMenu /> },                 // /reportes
          { path: 'tortas', element: <ReportesTortas /> },            // /reportes/tortas
          { path: 'ingredientes', element: <ReportesIngredientes /> },// /reportes/ingredientes
          { path: 'costosExtras', element: <ReportesCostosExtras /> },// /reportes/costosExtras
          { path: 'pedidos', element: <ReportesPedidos /> },          // /reportes/pedidos
        ],
      },

      { path: 'pedidos', element: <Pedidos /> }, // en minúsculas
    ],
  },
])
