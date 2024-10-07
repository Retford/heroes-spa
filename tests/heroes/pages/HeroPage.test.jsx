import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { getHeroById } from '../../../src/heroes/helpers';
import { HeroPage } from '../../../src/heroes/pages/HeroPage';

const mockNavigate = jest.fn();

jest.mock('../../../src/heroes/helpers', () => ({
  getHeroById: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Pruebas en <HeroPage />', () => {
  const heroMock = {
    id: 'dc-batman',
    superhero: 'Batman',
    publisher: 'DC Comics',
    alter_ego: 'Bruce Wayne',
    first_appearance: 'Detective Comics #27',
    characters: 'Bruce Wayne',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    getHeroById.mockReturnValue(heroMock);
  });

  it('debe de mostrar el héroe correctamente', () => {
    render(
      <MemoryRouter initialEntries={['/hero/dc-batman']}>
        <Routes>
          <Route path='/hero/:heroId' element={<HeroPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Batman')).toBeTruthy();
    expect(screen.getAllByText('Bruce Wayne')).toBeTruthy();
    expect(screen.getByText('Detective Comics #27')).toBeTruthy();
  });

  it('debe de llamar navigate cuando se presiona el botón de regresar', () => {
    render(
      <MemoryRouter initialEntries={['/hero/dc-batman']}>
        <Routes>
          <Route path='/hero/:heroId' element={<HeroPage />} />
        </Routes>
      </MemoryRouter>
    );

    const backButton = screen.getByText('Regresar');

    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
