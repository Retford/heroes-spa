import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <SearchPage />', () => {
  beforeEach(() => jest.clearAllMocks());

  test('debe de mostrar los valores iniciales', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('debe de mostrar los resultados de la búsqueda', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Batman')).toBeTruthy();

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('batman');

    const img = screen.getByRole('img');
    expect(img.src).toContain('/heroes/dc-batman.jpg');

    const alert = screen.getByLabelText('alert-danger');
    expect(alert.style.display).toBe('none');
  });

  test('debe de mostrar un error si no se encuentra el hero', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=pepito']}>
        <SearchPage />
      </MemoryRouter>
    );

    const alertNoHero = screen.getByLabelText('alert-no-hero');
    expect(alertNoHero.style.display).toBe('');
  });

  test('debe de llamar el navigate a la pantalla nueva', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'batman' } });

    const form = screen.getByRole('form');

    fireEvent.submit(form);

    expect(mockedUseNavigate).toHaveBeenCalledWith('?q=batman');
  });
});
