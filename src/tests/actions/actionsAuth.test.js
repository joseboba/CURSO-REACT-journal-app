import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/actionsAuth';
import { types } from '../../types/types';

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState)




describe('pruebas en el actionsAuth', () => {
    
    const stateTest = {
        type: types.login,
        payload: {
            uid: '123',
            displayName: 'Jose Enrique'
        }
    }

    beforeEach(() => {
        store = mockStore(initState)
    })


    test('login y logout debe de crear la acción respectiva', () => {
        
        const actionLogin = login( '123', 'Jose Enrique');
        expect( actionLogin ).toEqual(stateTest);

        const actionLogout = logout();
        expect( actionLogout ).toEqual({ type: types.logout });

    })

    test('debe de realizar el startLogout', async() => {
        
        await store.dispatch( startLogout() );
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({ type: types.logout });
        expect( actions[1] ).toEqual({ type: types.notesLogoutCleaning });
        
    })

    test('debe de realizar el startLoginEmailAndPassword', async() => {
        
        await store.dispatch( startLoginEmailPassword('test@testing.com', '123456') );
        const actions = store.getActions();
        
        expect(actions[1]).toEqual({ 
            type: types.login,
            payload: { 
                uid: expect.any(String),
                displayName: null
            }
         })

    })
    
    
    

})
