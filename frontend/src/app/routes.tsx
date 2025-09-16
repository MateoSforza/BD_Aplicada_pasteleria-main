import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Ingredientes from '../pages/Ingredientes';
import Tortas from '../pages/Tortas';
import CostoExtra from '../pages/CostoExtra';
import Medidas from '../pages/Medidas';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'tortas', element: <Tortas /> },
            { path: 'medidas', element: <Medidas /> },
            { path: 'ingredientes', element: <Ingredientes /> },
            { path: 'costos-extra', element: <CostoExtra /> },
            { path: 'reportes', element: <div>Reportes (en construcción)</div> },
        ],
    },
]);
