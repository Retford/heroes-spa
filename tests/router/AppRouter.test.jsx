import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en <AppRouter />', () => {
  it('debe de mostrar el login si no está autenticado', () => {
    const contextValue = {
      logged: false,
    };
    const { container } = render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByRole('button').innerHTML).toBe('Login');
    expect(screen.getAllByText('Login').length).toBe(2);
  });

  it('debe de mostrar el componente de Marvel si está autenticado', () => {
    const contextValue = {
      logged: true,
      user: {
        id: 'ABC',
        name: 'Retford',
      },
    };
    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Silver Surfer')).toBeTruthy();
  });
});
