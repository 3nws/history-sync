import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// entry routing
const Entries = Loadable(lazy(() => import('views/entries')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Navigate to="/entries" replace />
    },
    {
      path: 'entries',
      element: <Entries />
    }
  ]
};

export default MainRoutes;
