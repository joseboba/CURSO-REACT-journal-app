import '@testing-library/jest-dom';
import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store' //ES6 modules
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/actionsAuth';

jest.mock('../../../actions/actionsAuth', () => {
    return {
        startGoogleLogin: jest.fn(),
        startLoginEmailPassword: jest.fn()
    }
})



const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const initState = {
    auth: {},
    ui: {
        lodgin: false,
        msgError: null
    }
};
let store = mockStore(initState)
store.dispatch = jest.fn();


describe('Pruebas en el LoginScreen', () => {

    beforeEach(() => {
        store = mockStore(initState)
        jest.clearAllMocks();
    })

    const wrapper = mount(
        <Provider store={ store } >
            <MemoryRouter>
                <LoginScreen />
            </MemoryRouter>
        </Provider>
    )
    
    test('debe de crear un snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    })

    test('debe de disparar la accion de startGoogleLogin', () => {
        wrapper.find('.google-btn').simulate('click');

        expect( startGoogleLogin ).toHaveBeenCalled();
    })
    
    test('debe de disparar startLogin con sus respectivos argumentos', () => {

        wrapper.find('form').simulate('submit');

        expect( startLoginEmailPassword ).toHaveBeenCalledWith('joseboba18@gmail.com', '123456')
        
    })
    
    

})
