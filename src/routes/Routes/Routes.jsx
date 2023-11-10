import { createBrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import MainLayout from '../../layout/MainLayout/MainLayout';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import Dashboard from '../../pages/Dashboard/Dashboard/Dashboard';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [{ path: '/', element: <Home /> }],
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
        ],
    },
]);
