import '@testing-library/jest-dom';
import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'; //ES6 mod
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/actionsNotes';
import { act } from 'react-dom/test-utils';

jest.mock('../../../actions/actionsNotes', () => {
    return {
        activeNote: jest.fn()
    }
})

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
            id: 1234,
            title: 'Hola',
            body: 'Mundo',
            date: 0
        },
        notes: []
    }
};
let store = mockStore(initState)
store.dispatch = jest.fn();

describe('Pruebas en NoteScreen', () => {
    
    const wrapper = mount(
        <Provider store={ store }>
            <NoteScreen />    
        </Provider>
    )

    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de disparar el activeNote', () => {
        
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola de nuevo'
            }
        })

        expect( activeNote ).toHaveBeenLastCalledWith(1234, { body:'Mundo', date: 0, id: 1234, title: 'Hola de nuevo'});

    })
    
    

})
