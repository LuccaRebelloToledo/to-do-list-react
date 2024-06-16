import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

import PageScaffold from '../components/page-scaffold/page-scaffold';

import HomePage from '../pages/home/home';

const routes = [
  {
    element: <Navigate to="/" />,
    path: '*',
  },
  {
    element: <HomePage />,
    path: '/',
  },
];

const LoggedRoutes = () => {
  const loggedRoutes = routes.map((route) => {
    return <Route key={route.path} path={route.path} element={route.element} />;
  });

  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<PageScaffold />}>{loggedRoutes}</Route>,
    ),
  );
};

export default LoggedRoutes;
