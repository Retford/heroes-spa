import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth/context/AuthContext';
import { PublicRouter } from '../../src/router/PublicRouter';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Pruebas en <PublicRouter />', () => {
  it('debe de mostrar el children si no está autenticado', () => {
    const contextValue = {
      logged: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRouter>
          <h1>Ruta Pública</h1>
        </PublicRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Ruta Pública')).toBeTruthy();
  });

  it('debe de navegar si está autenticado', () => {
    const contextValue = {
      logged: true,
      user: {
        name: 'Pepito',
        id: 'ABC',
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route
              path='login'
              element={
                <PublicRouter>
                  <h1>Ruta Pública</h1>
                </PublicRouter>
              }
            />
            <Route path='marvel' element={<h1>Página Marvel</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText('Página Marvel')).toBeTruthy();
  });
});
