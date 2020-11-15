import '@testing-library/jest-dom' 
import { authReducer } from '../../reducers/authReducer'
import { types } from '../../types/types'

describe('Pruebas en el authReducer', () => {
    
    test('Debe de regresar el uid con el displayName ', () => {

        const action = {
            type: types.login,
            payload: {
                uid: 1,
                displayName: 'Jose Enrique'
            }
        }

        const state = authReducer({}, action)
        expect(state).toEqual({
            uid: 1,
            name: 'Jose Enrique'
        })
    })

    test('Debe de regresar un objeto vacio', () => {
        let action = { type: types.logout }
        const state = authReducer({uid: 1, displayName: 'Jose Enrique'}, action)

        expect( state ).toEqual({});
    })
    

    test('Debe de regresar el estado inicial', () => {
        
        const initialState = {
            uid: 1,
            displayName: 'Jose Enrique'
        }

        const action = { 
            type: 'Prueba Falsa'
        }

        const state = authReducer(initialState, action);

        expect(state).toEqual(initialState);
    })
    
    


})
