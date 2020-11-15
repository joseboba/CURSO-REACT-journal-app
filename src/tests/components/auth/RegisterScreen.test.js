import '@testing-library/jest-dom'
import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'; //ES6 modules
import { mount } from 'enzyme'
import { RegisterScreen } from '../../../components/auth/RegisterScreen'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { types } from '../../../types/types';



const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState)


describe('Pruebas en RegisterScreen', () => {

    const wrapper = mount(
        <Provider store={ store }>
            <MemoryRouter>
                <RegisterScreen />
            </MemoryRouter>
        </Provider>
    )

    test('debe de hacer el snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('debe de hacer el dispatch de la acción respectiva', () => {
        const emailField = wrapper.find('input[name="email"]')
        
        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        })

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload: 'Email es incorrecto o no se ha escrito'
        })

    })
    

})
