import { RouterProvider } from 'react-router-dom';

import LoggedRoutes from './logged/routes/logged-routes';

const App = () => {
  return (
    <RouterProvider
      router={LoggedRoutes()}
    />
  );
}

export default App;
