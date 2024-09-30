import { authReducer } from '../../../src/auth/context/authReducer';
import { types } from '../../../src/auth/types/types';

describe('Pruebas en authReducer', () => {
  const initialState = {
    logged: false,
  };
  it('Debe de retornar el estado por defecto', () => {
    const newState = authReducer(initialState, {});

    expect(newState).toBe(initialState);
  });

  it('Debe de (login) llamar el login autenticar y establecer el user', () => {
    const user = {
      id: 'ABC',
      name: 'Juan',
    };
    const action = {
      type: types.login,
      payload: user,
    };

    const newState = authReducer(initialState, action);

    expect(newState.user).toBe(action.payload);
    expect(newState).toEqual({ logged: true, user: action.payload });
  });

  it('Debe de (logout) borrar el name del usuario y logged en false', () => {
    const state = {
      logged: true,
      user: {
        id: 'ABC',
        name: 'Pepe',
      },
    };
    const action = {
      type: types.logout,
    };

    const newState = authReducer(state, action);
    expect(newState).toEqual({ logged: false });
  });
});
