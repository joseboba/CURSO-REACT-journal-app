import '@testing-library/jest-dom';
import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'; //ES6 mod
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/actionsNotes';

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState)
store.dispatch = jest.fn();

const nota = {
    id: 10,
    date: 0,
    title: 'Hola',
    body: 'Mundo',
    url: 'https://algunlugar.com/foto.jpg'

}

const wrapper = mount(
    <Provider store={ store }>
        <JournalEntry { ...nota }/>
    </Provider>
)

describe('Pruebas en JournalEntry', () => {
    
    test('debe de mostrarse correctamente ', () => {
        expect( wrapper ).toMatchSnapshot();
    })

    test('debe de activar la nota', () => {
        
        wrapper.find('.journal__entry').simulate('click');

        expect(store.dispatch).toHaveBeenCalledWith(activeNote(nota.id, { ...nota }));

    })
    
    
})
