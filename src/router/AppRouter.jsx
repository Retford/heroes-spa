import { Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { HeroesRoutes } from '../heroes/routers';
import { PrivateRoute } from './PrivateRoute';
import { PublicRouter } from './PublicRouter';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path='login'
          element={
            <PublicRouter>
              <LoginPage />
            </PublicRouter>
          }
        />

        <Route
          path='/*'
          element={
            <PrivateRoute>
              <HeroesRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
