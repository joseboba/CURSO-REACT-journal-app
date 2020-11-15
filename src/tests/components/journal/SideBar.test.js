import '@testing-library/jest-dom';
import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store' //ES6 modules
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/actionsAuth';
import { types } from '../../../types/types';
import { startNewNote } from '../../../actions/actionsNotes';



const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const initState = {
    auth: {
        name: 'Jose Enrique'
    },
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
// store.dispatch = jest.fn();

describe('Pruebas en el SideBar', () => {

    beforeEach(() => {
        store = mockStore(initState);    
    })

    const wrapper = mount(
        <Provider store={ store }>
            <Sidebar />
        </Provider>
    )
    
    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de llamar el startLogout', async() => {
        //debe de llamar la accion del logut
        wrapper.find('button').simulate('click');
        await store.dispatch(startLogout())
        const action = await store.getActions()
        
        expect(action[0]).toEqual({ type: types.logout })
        expect(action[1]).toEqual({ type: types.notesLogoutCleaning });
    })

    test('debe de llamar el startNewNote', async() => {
        //debe de llamar la accion del logut
        wrapper.find('.journal_new-entry').simulate('click');
        await store.dispatch(startNewNote())
        const action = await store.getActions()
        
        expect(action[0]).toEqual({ 
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: expect.any(String),
                body: expect.any(String),
                date: expect.any(Number)
            } 
        })
       
    })
    

})
