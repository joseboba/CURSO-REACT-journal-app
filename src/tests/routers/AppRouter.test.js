import '@testing-library/jest-dom';
import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store' //ES6 modules
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { firebase } from '../../firebase/firebase-config'
import { login } from '../../actions/actionsAuth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';


jest.mock('../../actions/actionsAuth', () => {
    return {
        login: jest.fn()
    }
})



const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const initState = {
    auth: {},
    ui: {
        lodgin: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'ABC'
        },
        notes: []
    }
};
let store = mockStore(initState)
store.dispatch = jest.fn();



describe('Pruebas en AppRouter', () => {
    
    test('debe de llamar el login si estoy autenticado', async() => {

        let user;
        
       await act( async () => {

            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCred.user;
            
            const wrapper = mount(
                <Provider store={ store } >
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            )
        })

        expect( login ).toHaveBeenCalledWith(user.uid, null);
    })
    


})
