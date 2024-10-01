import { fireEvent, render, screen } from '@testing-library/react';
import { Navbar } from '../../../src/ui/components';
import { AuthContext } from '../../../src/auth';
import { MemoryRouter } from 'react-router-dom';

const mockedUseNavigate = jest.fn();

// Se utiliza para mockear solo reescribir una parte específica en este caso sería el "navigate"
// const navigate = useNavigate()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <Navbar />', () => {
  const contextValue = {
    logged: true,
    user: {
      id: 'ABC',
      name: 'Retford',
    },
    logout: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());
  test('debe de mostrar el nombre del usuario', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Retford').innerHTML).toBeTruthy();
  });

  test('debe de llamar al logout y navigate cuando se hace click en el botón', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const buttonLogout = screen.getByRole('button');
    fireEvent.click(buttonLogout);

    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });
});
