import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';

describe('Pruebas en el <PrivateRouter />', () => {
  it('debe de mostrar el children si está autenticado', () => {
    Storage.prototype.setItem = jest.fn();
    const contextValue = {
      logged: true,
      user: {
        id: 'ABC',
        name: 'Retford',
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/search?q=bat']}>
          <PrivateRoute>
            <h1>Ruta Privada</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Ruta Privada')).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'lastPath',
      '/search?q=bat'
    );
  });
});
