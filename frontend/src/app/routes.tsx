import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Ingredientes from '../pages/Ingredientes';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />,
    },
    {
        path: '/ingredientes',
        element: <Ingredientes />,
    },
]);
